"use client"

import { useEffect, useRef, useState } from "react"
import { SERVICE_LABELS } from "@/lib/service-types"
import AgreementImport from "./AgreementImport"
import DrinksAndAgreement from "./DrinksAndAgreement"
import { dashboardFetch } from "@/lib/dashboard-fetch"
import { getSupabaseBrowser } from "@/lib/supabase-browser"

const API = (process.env.NEXT_PUBLIC_API_URL || "https://tap-toast-api-cayk.onrender.com").replace(/\/+$/, "")

const eventDateLocal = (value: string) => value ? new Date(`${value.slice(0, 10)}T00:00:00`) : new Date(NaN)

const formatCurrency = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value)

interface EventItem {
  id: string
  event_date: string
  location: string
  city?: string | null
  service_type?: string | null
  hours: number
  bartenders_needed: number
  total_price: number
  deposit_amount: number
  balance_due: number
  deposit_paid: boolean
  balance_remaining?: number
  customers?: {
    name: string
    email: string
  }
  cid?: string
  landing_page?: string
  drinks_serving?: string | null
  event_status?: string
}

export default function DashboardPage() {
  const cancelledEventIds = useRef(new Set<string>())
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [viewMode, setViewMode] = useState<"table" | "calendar">("calendar")
  const [sendingPayment, setSendingPayment] = useState(false)
  const paymentSending = useRef(false)
  const paymentRequestIds = useRef(new Map<string, string>())
  const [paymentNotice, setPaymentNotice] = useState("")
  const [paymentError, setPaymentError] = useState("")
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState("")
  const [customPrice, setCustomPrice] = useState<number | "">("")
  const saveCustomPricing = async () => {
    if (!selectedEvent) return

    try {

      const res = await dashboardFetch(`${API}/api/events/update-price`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: selectedEvent.id,
          custom_total_price: customPrice,
        }),
      })

      const data = await res.json()

      if (!data?.success) {
        alert("Failed to update price")
        return
      }

      alert("Custom price saved")

      // 🔥 Refresh events immediately
      try {
        const res = await dashboardFetch(`${API}/api/events`)
        const refreshed = await res.json()
        if (Array.isArray(refreshed)) {
          setEvents(refreshed.filter((event: EventItem) => event.event_status !== "cancelled" && !cancelledEventIds.current.has(event.id)))

          // also update selected event so side panel reflects new price
          const updated = refreshed.find((e: EventItem) => e.id === selectedEvent.id)
          if (updated) {
            setSelectedEvent(updated)
          }
        }
      } catch (err) {
        console.error("Failed to refresh events", err)
      }

    } catch (err) {
      console.error(err)
      alert("Server error saving price")
    }
  }
  // Auto-switch view based on screen size (mobile = calendar, desktop = table)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode("calendar")
      } else {
        setViewMode("table")
      }
    }

    // Run once on mount
    handleResize()

    // Listen for resize
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  const [search, setSearch] = useState("")
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [viewStartDate, setViewStartDate] = useState<string>("")
  const [viewEndDate, setViewEndDate] = useState<string>("")

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

useEffect(() => {

  const loadEvents = async () => {

    try {

      const res = await dashboardFetch(

        `${API}/api/events`

      )

      if (!res.ok) {

        throw new Error(`Failed to fetch events: ${res.status}`)

      }

      const data = await res.json()


      setEvents(Array.isArray(data) ? data.filter((event: EventItem) => event.event_status !== "cancelled" && !cancelledEventIds.current.has(event.id)) : [])

    } catch (err) {

      console.error("❌ Events API failed:", err)

    } finally {

      setLoading(false)

    }

  }

  // initial load

  loadEvents()

  // 🔥 auto refresh every 15 seconds (Stripe webhook updates will show)

  const interval = setInterval(loadEvents, 15000)

  return () => clearInterval(interval)

}, [])


const deleteSelectedEvent = async () => {
  if (!selectedEvent || deleting) return
  const event = selectedEvent
  if (!confirm(`Delete the event for ${event.customers?.name || "this customer"} on ${event.event_date}? This removes it from the dashboard and marks it cancelled. Payment history is kept. No refund or email will be sent.`)) return
  setDeleting(true)
  setDeleteError("")
  try {
    const res = await dashboardFetch(`${API}/api/events/cancel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId: event.id }),
    })
    const data = await res.json()
    if (!res.ok || !data.success) throw new Error("Delete failed")
    cancelledEventIds.current.add(event.id)
    setEvents(prev => prev.filter(item => item.id !== event.id))
    setSelectedEvent(current => current?.id === event.id ? null : current)
  } catch {
    setDeleteError("The event could not be deleted. Please try again.")
  } finally {
    setDeleting(false)
  }
}

const sendPaymentLink = async (eventId: string, type: "deposit" | "balance" | "invoice") => {
  if (paymentSending.current) return
  paymentSending.current = true
  setSendingPayment(true)
  setPaymentNotice("")
  setPaymentError("")
  const key = `${eventId}:${type}`
  try {
    const requestId = paymentRequestIds.current.get(key) || crypto.randomUUID()
    paymentRequestIds.current.set(key, requestId)
    const res = await dashboardFetch(`${API}/api/stripe/send-${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: eventId, request_id: requestId }),
    })
    const data: { success?: boolean; recipient?: string; error?: string } = await res.json()
    if (!res.ok || !data.success) throw new Error(data.error || "Unable to send the payment email.")
    paymentRequestIds.current.delete(key)
    setPaymentNotice(`${type === "invoice" ? "Invoice" : type === "deposit" ? "Deposit request" : "Balance request"} sent to ${data.recipient}. Payment status will update after payment is confirmed.`)
  } catch (error) {
    setPaymentError(error instanceof Error ? error.message : "Unable to send the payment email. Please retry.")
  } finally {
    paymentSending.current = false
    setSendingPayment(false)
  }
}

// Send Reminder Email (Deposit or Balance)
const sendReminder = async (event: EventItem) => {
  try {
    console.log("📨 Sending reminder", {
  id: event.id, type: !event.deposit_paid ? "deposit_reminder" : "balance_reminder",

  customer: event.customers?.email

})
console.log("Sending reminder for eventId:", event.id)

    if (!event?.id) {
      alert("Missing event ID")
      return
    }

    if (!event.id || event.id.length < 10) {
      alert("Invalid event ID — refresh dashboard")
      return
    }

    const type =
      !event.deposit_paid
        ? "deposit_reminder"
        : "balance_reminder"


const res = await dashboardFetch(`${API}/api/email/reminder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: event.id,
        type,
      }),
    })

    const text = await res.text()
    console.log("REMINDER RESPONSE:", res.status, text)

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`)
    }

    alert("Reminder sent successfully")
  } catch (err) {
    console.error("REMINDER ERROR:", err)
    alert("Failed to send reminder")
  }
}

const cancelEvent = async (eventId: string) => {
  const confirmCancel = confirm("Are you sure you want to cancel this event?")
  if (!confirmCancel) return

  try {

    const res = await dashboardFetch(`${API}/api/events/cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventId }),
    })

    const data = await res.json()

    if (!res.ok || !data?.success) {
      throw new Error("Cancellation failed")
    }

    // Keep an older in-flight refresh from restoring a cancelled event.
    cancelledEventIds.current.add(eventId)
    setEvents(prev => prev.filter(event => event.id !== eventId))
    setSelectedEvent(current => current?.id === eventId ? null : current)

  } catch (err) {
    console.error(err)
    alert("Server error cancelling event")
  }
}
  const filteredEvents = events.filter((e) => {
    const name = e.customers?.name?.toLowerCase() || ""
    const location = e.location?.toLowerCase() || ""
    const q = search.toLowerCase()

    const eventDate = eventDateLocal(e.event_date)

    if (viewStartDate) {
      const start = eventDateLocal(viewStartDate)
      start.setHours(0,0,0,0)
      if (eventDate < start) return false
    }

    if (viewEndDate) {
      const end = eventDateLocal(viewEndDate)
      end.setHours(23,59,59,999)
      if (eventDate > end) return false
    }

    return name.includes(q) || location.includes(q) || (e.city || "").toLowerCase().includes(q)
  })

  if (loading) {
    return (
      <div style={{ padding: 40 }}>
        Loading events...
      </div>
    )
  }

  const totalEvents = events.length

  const upcomingEvents = events.filter(e => eventDateLocal(e.event_date) >= new Date()).length

  const revenueCollected = events.reduce((sum, e) => {
    if (e.deposit_paid) {
      const paid = e.total_price - e.balance_due
      return sum + paid
    }
    return sum
  }, 0)

  const pendingBalances = events.reduce((sum, e) => sum + (e.balance_due || 0), 0)
  const now = new Date()
  const day = now.getDay()

  const saturday = new Date(now)
  saturday.setDate(now.getDate() + (6 - day))
  saturday.setHours(0,0,0,0)

  const sunday = new Date(saturday)
  sunday.setDate(saturday.getDate() + 1)
  sunday.setHours(23,59,59,999)

  const weekendEventsList = events.filter(e => {
    const d = eventDateLocal(e.event_date)
    return d >= saturday && d <= sunday
  })

  const weekendEvents = weekendEventsList.length

  const weekendRevenue = weekendEventsList.reduce((sum, e) => sum + (e.total_price || 0), 0)

  // Revenue Attribution by Landing Page (FINAL FORM)
  const revenueByPage: Record<string, number> = {}

  let totalRevenueTracked = 0

  events.forEach(e => {
    if (!e.deposit_paid) return

    const page = e.landing_page || "Direct / Unknown"
    const paid = e.total_price - e.balance_due

    revenueByPage[page] = (revenueByPage[page] || 0) + paid
    totalRevenueTracked += paid
  })

  const sortedRevenue = Object.entries(revenueByPage).sort((a, b) => b[1] - a[1])

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const calendarCells: (number | null)[] = []

  for (let i = 0; i < firstDay; i++) calendarCells.push(null)
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d)

  // --- DERIVED STATE FOR ACTION REQUIRED + PRIORITIZATION ---
  const today = new Date()

  const actionRequiredEvents: EventItem[] = events.filter((event: EventItem) => {
    const eventDate = eventDateLocal(event.event_date)
    const daysUntil = Math.ceil(
      (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    )

    const needsDeposit = !event.deposit_paid
    const balanceDueSoon = event.deposit_paid && event.balance_due > 0 && daysUntil <= 10

    return needsDeposit || balanceDueSoon
  })

  const prioritizedEvents: EventItem[] = [...events]
    .filter((event: EventItem) => eventDateLocal(event.event_date) >= today)
    .sort((a: EventItem, b: EventItem) => {
      const score = (e: EventItem) => {
        let s = 0

        if (!e.deposit_paid) s += 100
        else if (e.balance_due > 0) s += 80


        const days = Math.ceil(
          (eventDateLocal(e.event_date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        )

        if (days <= 3) s += 50
        else if (days <= 7) s += 30

        return s
      }

      return score(b) - score(a)
    })

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8 text-gray-800">

      <div className="max-w-[1600px] mx-auto">
        {(paymentNotice || paymentError || sendingPayment) && (
          <div role={paymentError ? "alert" : "status"} className={`fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-xl rounded-lg border bg-white p-4 shadow-lg ${paymentError ? "text-red-700" : "text-gray-800"}`}>
            {sendingPayment ? "Sending payment email…" : paymentError || paymentNotice}
            {!sendingPayment && <button type="button" onClick={() => { setPaymentNotice(""); setPaymentError("") }} className="ml-3 underline">Dismiss</button>}
          </div>
        )}

        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-[#9C7A2C]">
            Tap & Toast Admin
          </h1>
          <button
            type="button"
            onClick={async () => {
              await getSupabaseBrowser().auth.signOut()
              window.location.href = "/admin/login"
            }}
            className="rounded border px-3 py-2 text-sm hover:bg-gray-100"
          >
            Log out
          </button>
        </div>
<AgreementImport api={API} onImported={async (eventId) => {
          const response = await dashboardFetch(`${API}/api/events`)
          if (!response.ok) throw new Error("Refresh failed")
          const data: EventItem[] = await response.json()
          setEvents(data.filter(event => event.event_status !== "cancelled" && !cancelledEventIds.current.has(event.id)))
          const imported = data.find(event => event.id === eventId)
          if (imported) setSelectedEvent(imported)
          setSearch("")
          setViewStartDate("")
          setViewEndDate("")
          setViewMode("table")
        }} />
<div className="mb-6">
  <input
    type="text"
    placeholder="Search customer or location..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full max-w-md px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setViewMode("table")}
            className={`px-3 py-1 rounded ${viewMode === "table" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Table
          </button>

          <button
            onClick={() => setViewMode("calendar")}
            className={`px-3 py-1 rounded ${viewMode === "calendar" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Calendar
          </button>
        </div>

        {viewMode === "table" && (
          <>
            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr mb-10">

              <div className="min-w-0 bg-white p-5 rounded-xl shadow-sm border">
                <div className="min-h-10 text-gray-600 text-sm leading-5 mb-2">Total Events</div>
                <div className="text-2xl leading-8 font-semibold tabular-nums break-words">
                  {totalEvents}
                </div>
              </div>

              <div className="min-w-0 bg-white p-5 rounded-xl shadow-sm border">
                <div className="min-h-10 text-gray-600 text-sm leading-5 mb-2">Upcoming Events</div>
                <div className="text-2xl leading-8 font-semibold tabular-nums break-words">
                  {upcomingEvents}
                </div>
              </div>

              <div className="min-w-0 bg-white p-5 rounded-xl shadow-sm border">
                <div className="min-h-10 text-gray-600 text-sm leading-5 mb-2">Revenue Collected</div>
                <div className="text-2xl leading-8 font-semibold tabular-nums break-words">
                  {formatCurrency(revenueCollected)}
                </div>
              </div>

              <div className="min-w-0 bg-white p-5 rounded-xl shadow-sm border">
                <div className="min-h-10 text-gray-600 text-sm leading-5 mb-2">Pending Balances</div>
                <div className="text-2xl leading-8 font-semibold tabular-nums break-words">
                  {formatCurrency(pendingBalances)}
                </div>
              </div>

              <div className="min-w-0 bg-white p-5 rounded-xl shadow-sm border">
                <div className="min-h-10 text-gray-600 text-sm leading-5 mb-2">This Weekend</div>
                <div className="text-2xl leading-8 font-semibold tabular-nums">{weekendEvents}</div>
                <div className="mt-1 text-xs text-gray-500">Events · {formatCurrency(weekendRevenue)} revenue</div>
              </div>

            </div>

            {/* Top 3 Revenue Attribution Summary Cards */}
            {sortedRevenue.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {sortedRevenue.slice(0,3).map(([page, value], idx) => {
                  const percent = totalRevenueTracked ? ((value / totalRevenueTracked) * 100).toFixed(1) : "0"
                  return (
                    <div key={page} className="bg-white p-4 rounded-xl border shadow-sm">
                      <div className="text-xs text-gray-500 mb-1">Top {idx+1}</div>
                      <div className="text-sm font-medium truncate">{page}</div>
                      <div className="text-xl font-semibold mt-1">${value}</div>
                      <div className="text-xs text-gray-400">{percent}% of revenue</div>
                    </div>
                  )
                })}
              </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-sm border mb-10">
              <h2 className="text-lg font-semibold mb-4 text-[#9C7A2C]">
                Revenue Attribution (by Landing Page)
              </h2>

              {Object.keys(revenueByPage).length === 0 && (
                <div className="text-sm text-gray-500">
                  No revenue data yet — complete a booking to populate.
                </div>
              )}

              {sortedRevenue.map(([page, value], index) => {
                const percent = totalRevenueTracked ? ((value / totalRevenueTracked) * 100).toFixed(1) : "0"

                return (
                  <div key={page} className="py-2 border-b last:border-none">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex flex-col max-w-[70%]">
                        <span className="text-gray-700 truncate">
                          {page}
                        </span>
                        <span className="text-xs text-gray-400">
                          {percent}% of revenue
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {index === 0 && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                            Top
                          </span>
                        )}
                        <span className="font-semibold">
                          ${value}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 h-2 bg-gray-100 rounded">
                      <div
                        className="h-2 bg-[#c9a14a] rounded"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Date Range Filter */}
            <div className="flex gap-4 mb-6">

              <input
                type="date"
                value={viewStartDate}
                onChange={(e) => {
                  setViewStartDate(e.target.value)
                }}
                className="px-3 py-2 border rounded text-sm"
              />

              <input
                type="date"
                value={viewEndDate}
                onChange={(e) => {
                  setViewEndDate(e.target.value)
                }}
                className="px-3 py-2 border rounded text-sm"
              />

              <button
                onClick={() => {
                  setViewStartDate("")
                  setViewEndDate("")
                }}
                className="px-3 py-2 border rounded text-sm bg-gray-100 hover:bg-gray-200"
              >
                Clear
              </button>
            </div>

            {/* Events Table */}

            <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">

              <table className="w-full min-w-[1100px] text-sm">

                <thead className="bg-gray-50">
                  <tr className="text-left text-gray-800">
                    <th className="p-4">Customer</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Hours</th>
                    <th className="p-4">Bartenders Needed</th>
                    <th className="p-4">Drinks Serving</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Deposit</th>
                    <th className="p-4">Balance</th>
                    <th className="p-4">Status</th>
                    <th className="sticky right-0 z-10 min-w-40 bg-gray-50 p-4 border-l">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEvents.map((event) => (
                    <tr
                      key={event.id}
                      className={`border-t hover:bg-gray-50 ${event.event_status === "cancelled" ? "opacity-50" : ""}`}
                    >

                      <td className="p-4 font-medium">
                        {event.customers?.name || "Customer"}
                      </td>

                      <td className="p-4">
                        {eventDateLocal(event.event_date).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        {event.location}
                        {event.city && <div className="text-xs text-gray-500">{event.city}</div>}
                      </td>

                      <td className="p-4">
                        {event.hours} hrs
                      </td>

                      <td className="p-4">
                        {event.bartenders_needed}
                      </td>
                      <td className="p-4 min-w-40 max-w-64 whitespace-pre-wrap break-words">{event.drinks_serving || <span className="text-gray-500">Not specified</span>}</td>
                      <td className="p-4 font-medium">
                        ${event.total_price}
                      </td>

                      <td className="p-4">
                        {event.deposit_paid ? (
                          <span className="text-green-600 font-medium">Paid</span>
                        ) : (
                          <span className="text-red-600 font-medium">Unpaid</span>
                        )}
                      </td>

                      <td className="p-4">
                        ${event.balance_remaining ?? event.balance_due}
                      </td>

                      <td className="p-4">
  {event.event_status === "cancelled" ? (
    <span className="px-2 py-1 text-xs rounded bg-gray-200 text-gray-700 font-semibold">
      Cancelled
    </span>
  ) : event.deposit_paid && event.balance_due === 0 ? (
    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700 font-semibold">
      ✔ Fully Paid
    </span>
  ) : event.deposit_paid ? (
    <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700 font-semibold">
      ⏳ Balance Due
    </span>
  ) : (
    <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700 font-semibold">
      ⚠ Unpaid
    </span>
  )}

  <div className="mt-2 flex gap-1">
    {!event.deposit_paid && event.event_status !== "cancelled" && (
      <button
        disabled={sendingPayment}
        onClick={() => sendPaymentLink(event.id, "deposit")}
        className="whitespace-nowrap px-3 py-1 text-xs rounded bg-amber-500 text-white hover:bg-amber-600"
      >
        Send Deposit
      </button>
    )}
    {event.deposit_paid && event.balance_due > 0 && event.event_status !== "cancelled" && (
      <button
        disabled={sendingPayment}
        onClick={() => sendPaymentLink(event.id, "balance")}
        className="px-2 py-1 text-xs rounded bg-purple-600 text-white hover:bg-purple-700"
      >
        Send Balance
      </button>
    )}
  </div>
                      </td>


                      <td className="sticky right-0 z-10 min-w-40 bg-white p-4 border-l">
                        <div className="flex w-32 flex-wrap gap-2">
                          <button
                            onClick={() => {
                            setSelectedEvent(event)
                            }}
                            className="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700"
                          >
                            View
                          </button>

                          {event.event_status !== "cancelled" && (
                            <button
                              onClick={() => cancelEvent(event.id)}
                              className="px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700"
                            >
                              Cancel
                            </button>
                          )}

                          {!event.deposit_paid && event.event_status !== "cancelled" && (
                            <button
                              disabled={sendingPayment}
        onClick={() => sendPaymentLink(event.id, "invoice")}
                              className="px-3 py-1 text-xs rounded bg-amber-500 text-white hover:bg-amber-600"
                            >
                              Send Invoice
                            </button>
                          )}
                        </div>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          </>
        )}

        {viewMode === "calendar" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT: Calendar */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">

              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => {
                    const d = new Date(currentMonth)
                    d.setMonth(d.getMonth() - 1)
                    setCurrentMonth(d)
                  }}
                  className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
                >
                  ◀ Prev
                </button>

                <h2 className="font-semibold text-lg">
                  {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>

                <button
                  onClick={() => {
                    const d = new Date(currentMonth)
                    d.setMonth(d.getMonth() + 1)
                    setCurrentMonth(d)
                  }}
                  className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
                >
                  Next ▶
                </button>
              </div>

              <div className="grid grid-cols-7 text-xs text-gray-500 mb-2">
                {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                  <div key={d} className="p-2 font-medium">{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {calendarCells.map((day, idx) => {
                  const dayEvents = filteredEvents.filter(e => {
                    const d = eventDateLocal(e.event_date)
                    return (

  day &&

  d.getDate() === day &&

  d.getMonth() === month &&

  d.getFullYear() === year

)
                  })

                  const hasUnpaid = dayEvents.some(e => !e.deposit_paid)
                  const hasPartial = dayEvents.some(e => e.deposit_paid && e.balance_due > 0)
                  const hasPaid = dayEvents.some(e => e.deposit_paid && e.balance_due === 0)

                  let bg = "bg-gray-50"
                  if (hasUnpaid) bg = "bg-red-50"
                  else if (hasPartial) bg = "bg-yellow-50"
                  else if (hasPaid) bg = "bg-green-50"

                  return (
                    <div
                      key={idx}
                      className={`min-h-24 border rounded p-2 ${bg} hover:shadow cursor-pointer`}
                    >
                      {day && (
                        <div className="text-xs font-semibold mb-1">{day}</div>
                      )}

                      {dayEvents.slice(0,2).map(event => (
                        <div
                          key={event.id}
                          onClick={() => setSelectedEvent(event)}
                          className="text-[11px] bg-white border rounded px-1 py-0.5 mb-1 truncate"
                        >
                          {event.customers?.name}
                        </div>
                      ))}

                      {dayEvents.length > 2 && (
                        <div className="text-[10px] text-gray-500">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* RIGHT SIDE */}
<div className="space-y-6">

  {/* ACTION REQUIRED */}
  <div className="bg-white rounded-xl shadow-sm border p-4">
    <h3 className="font-semibold mb-3 text-red-600">
      Action Required
    </h3>

    {actionRequiredEvents.length === 0 && (
      <div className="text-xs text-gray-500">
        No urgent actions 🎉
      </div>
    )}

    <div className="space-y-2">
      {actionRequiredEvents.slice(0,5).map(event => {
        const eventDate = eventDateLocal(event.event_date)
        const daysUntil = Math.ceil(
          (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        )

        let label = "Needs attention"
        let color = "bg-red-100 text-red-700"

        if (!event.deposit_paid) {
          label = "Deposit Needed"
        } else if (event.balance_due > 0 && daysUntil <= 10) {
          label = "Balance Due Soon"
          color = "bg-yellow-100 text-yellow-700"
        }

        return (
          <div
            key={event.id}
            onClick={() => setSelectedEvent(event)}
            className="border rounded-lg p-3 cursor-pointer hover:shadow transition"
          >
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">
                {event.customers?.name}
              </div>
              <span className={`text-xs px-2 py-0.5 rounded ${color}`}>
                {label}
              </span>
            </div>

            <div className="text-xs text-gray-500">
              {eventDateLocal(event.event_date).toLocaleDateString()}
            </div>
          </div>
        )
      })}
    </div>
  </div>

  {/* UPCOMING EVENTS */}
  <div className="bg-white rounded-xl shadow-sm border p-4 h-fit">
    <h3 className="font-semibold mb-4 text-[#9C7A2C]">
      Upcoming Events
    </h3>

    <div className="space-y-3 max-h-125 overflow-y-auto">
      {prioritizedEvents.map(event => {

        const isPaid = event.deposit_paid && event.balance_due === 0
        const isPartial = event.deposit_paid && event.balance_due > 0

        let statusColor = "bg-red-100 text-red-700"
        if (isPartial) statusColor = "bg-yellow-100 text-yellow-700"
        if (isPaid) statusColor = "bg-green-100 text-green-700"

        return (
          <div
            key={event.id}
            onClick={() => setSelectedEvent(event)}
            className="border rounded-lg p-3 cursor-pointer hover:shadow transition"
          >
            <div className="flex justify-between items-center">
              <div className="font-medium text-sm">
                {event.customers?.name}
              </div>
              <span className={`text-xs px-2 py-0.5 rounded ${statusColor}`}>
                {isPaid ? "Paid" : isPartial ? "Deposit" : "Unpaid"}
              </span>
            </div>

            <div className="text-xs text-gray-500 mt-1">
              {eventDateLocal(event.event_date).toLocaleDateString()}
            </div>

            <div className="text-xs text-gray-500">
              ${event.total_price}
            </div>
          </div>
        )
      })}
    </div>
  </div>

</div>


          </div>
        )}

        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex">

            {/* Overlay */}
            <div
              className="flex-1 bg-black/40"
              onClick={() => setSelectedEvent(null)}
            />

            {/* Side Panel */}
            <div className="w-105 bg-white shadow-xl h-full overflow-y-auto p-6">

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Event Details</h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>

              {/* Customer Info */}
              <div className="mb-6 space-y-2 text-sm">
                <div><strong>{selectedEvent.customers?.name}</strong></div>
                <div className="text-gray-500">{selectedEvent.customers?.email}</div>
                <div className="text-gray-500">
                  {eventDateLocal(selectedEvent.event_date).toLocaleDateString()}
                </div>
                <div className="text-gray-500">{selectedEvent.location}</div>
                {selectedEvent.city && <div className="text-gray-500">City: {selectedEvent.city}</div>}
                {selectedEvent.service_type && <div className="text-gray-500">Service: {SERVICE_LABELS[selectedEvent.service_type] || selectedEvent.service_type}</div>}
              </div>

              {/* Payment Section */}
              <div className="mb-6 border rounded-lg p-4">
                <h3 className="font-medium mb-2">Payments</h3>

                <div className="flex justify-between text-sm">
                  <span>Total</span>
                  <span>${selectedEvent.total_price}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Deposit</span>
                  <span>
                    {selectedEvent.deposit_paid ? "Paid" : "Unpaid"}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-semibold">
                  <span>Remaining</span>
                  <span>${selectedEvent.balance_due}</span>
                </div>

                <div className="mt-3 flex gap-2">
                  {!selectedEvent.deposit_paid && selectedEvent.event_status !== "cancelled" && (
                    <button
                      disabled={sendingPayment}
        onClick={() => sendPaymentLink(selectedEvent.id, "deposit")}
                      className="flex-1 text-white text-xs py-2 rounded bg-amber-500"
                    >
                      Send Deposit
                    </button>
                  )}

                  {selectedEvent.deposit_paid && selectedEvent.balance_due > 0 && selectedEvent.event_status !== "cancelled" && (
                    <button
                      disabled={sendingPayment}
        onClick={() => sendPaymentLink(selectedEvent.id, "balance")}
                      className="flex-1 text-white text-xs py-2 rounded bg-purple-600"
                    >
                      Send Balance
                    </button>
                  )}
                </div>
                {selectedEvent.event_status !== "cancelled" && (
                  <button
                    onClick={() => sendReminder(selectedEvent)}
                    className="w-full mt-2 text-white text-xs py-2 rounded bg-gray-800"
                  >
                    Send Reminder
                  </button>
                )}
                <div className="mt-4">
                  <label className="text-xs text-gray-500">Custom Price Override</label>
                  <input
                    type="number"
                    placeholder="Enter custom total"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(Number(e.target.value))}
                    className="w-full mt-1 px-2 py-1 border rounded text-sm"
                  />
                  <button
                    onClick={saveCustomPricing}
                    className="w-full mt-2 bg-green-600 text-white text-xs py-2 rounded"
                  >
                    Save Custom Price
                  </button>
                </div>
              </div>


              <DrinksAndAgreement key={selectedEvent.id} api={API} eventId={selectedEvent.id} drinks={selectedEvent.drinks_serving || ""} onSaved={(value) => {
                setEvents(previous => previous.map(event => event.id === selectedEvent.id ? { ...event, drinks_serving: value } : event))
                setSelectedEvent(current => current?.id === selectedEvent.id ? { ...current, drinks_serving: value } : current)
              }} />
              <div className="mb-6 rounded-lg border p-4 text-sm flex justify-between">
                <span>Bartenders Needed</span>
                <strong>{selectedEvent.bartenders_needed ?? 0}</strong>
              </div>
              <div className="mt-6 border-t pt-4">
                <p className="mb-3 text-xs text-gray-600">Deleting removes this event from the dashboard and marks it cancelled. Payment history is kept.</p>
                {deleteError && <p role="alert" className="mb-3 text-sm text-red-700">{deleteError}</p>}
                <button type="button" disabled={deleting} onClick={deleteSelectedEvent} className="w-full rounded border border-red-700 py-3 text-red-700 hover:bg-red-50 disabled:opacity-50">
                  {deleting ? "Deleting…" : "Delete Event"}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  )
}
