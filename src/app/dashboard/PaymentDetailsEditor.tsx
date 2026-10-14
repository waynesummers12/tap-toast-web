"use client"
import { useState } from "react"
import { dashboardFetch } from "@/lib/dashboard-fetch"

type PaymentEvent = {
  id: string; total_price: number; deposit_amount: number; deposit_paid: boolean;
  balance_paid?: boolean; balance_due: number; balance_remaining?: number
}
export default function PaymentDetailsEditor({api, event, onSaved}: {
  api: string; event: PaymentEvent; onSaved: (value: PaymentEvent) => void
}) {
  const [total, setTotal] = useState(String(event.total_price))
  const [deposit, setDeposit] = useState(String(event.deposit_amount ?? 0))
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const locked = event.deposit_paid || event.balance_paid
  async function save() {
    if (saving) return
    const amount = Number(total), requested = Number(deposit)
    if (!total.trim() || !deposit.trim() || !Number.isFinite(amount) || amount <= 0 || !Number.isFinite(requested) || requested < 0 || requested > amount) {
      setMessage("Enter a positive total and a deposit between $0 and that total."); return
    }
    setSaving(true); setMessage("")
    try {
      const response = await dashboardFetch(`${api}/api/events/update-price`, {
        method: "POST", headers: {"Content-Type":"application/json"},
        body: JSON.stringify({eventId:event.id, custom_total_price:amount, deposit_amount:requested})
      })
      const data = await response.json()
      if (!response.ok || !data.success) throw new Error(data.error || "Could not save payment details.")
      const updated = data.event as PaymentEvent
      onSaved({...updated, balance_remaining:updated.balance_paid ? 0 : updated.deposit_paid ? updated.balance_due : updated.total_price})
      setMessage("Payment details saved. You can now send the invoice or payment request.")
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not save payment details.") }
    finally { setSaving(false) }
  }
  return <div className="mt-4 border-t pt-4 space-y-3">
    <h4 className="font-semibold text-sm">Edit payment details</h4>
    <label className="block text-sm">Agreed total ($)
      <input type="number" min="0.01" max="1000000" step="0.01" value={total} onChange={e=>setTotal(e.target.value)} className="mt-1 w-full border rounded px-2 py-2" />
    </label>
    <label className="block text-sm">{locked ? "Deposit already received ($)" : "Deposit to request ($)"}
      <input type="number" min="0" max={total} step="0.01" disabled={!!locked} value={deposit} onChange={e=>setDeposit(e.target.value)} className="mt-1 w-full border rounded px-2 py-2 disabled:bg-gray-100" />
    </label>
    <p className="text-xs text-gray-600">{locked ? "Payments already received are preserved when you change the total." : "This is the deposit you want to collect, not an amount already paid. Enter $0 to invoice the full balance."} Saving does not send an email or mark a payment as received.</p>
    <button type="button" onClick={save} disabled={saving} className="w-full rounded bg-green-700 text-white py-2 disabled:opacity-50">{saving ? "Saving…" : "Save Payment Details"}</button>
    {message && <p role="status" className="text-sm">{message}</p>}
  </div>
}
