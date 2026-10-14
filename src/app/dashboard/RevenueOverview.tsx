const currency = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)

type RevenueEvent = {
  total_price: number
  balance_due: number
  deposit_paid: boolean
  balance_paid?: boolean
  landing_page?: string | null
  event_status?: string
}

export function collectedAmount(event: RevenueEvent) {
  if (event.event_status === "cancelled") return 0
  const total = Number(event.total_price)
  const paid = event.balance_paid ? total : event.deposit_paid ? total - Number(event.balance_due) : 0
  return Number.isFinite(paid) ? Math.max(0, Math.min(total, paid)) : 0
}

export default function RevenueOverview({ events }: { events: RevenueEvent[] }) {
  const groups = new Map<string, { amount: number; count: number }>()
  let collected = 0
  let paidEvents = 0
  let untracked = 0
  for (const event of events) {
    const amount = collectedAmount(event)
    if (!amount) continue
    collected += amount
    paidEvents++
    const page = event.landing_page?.trim()
    const key = page || (event.event_status === "imported" ? "Imported agreements" : "Source not recorded")
    if (!page) untracked += amount
    const group = groups.get(key) || { amount: 0, count: 0 }
    groups.set(key, { amount: group.amount + amount, count: group.count + 1 })
  }
  const tracked = collected - untracked
  const coverage = collected ? tracked / collected * 100 : 0
  const rows = [...groups].sort((a, b) => b[1].amount - a[1].amount)

  return (
    <section aria-labelledby="revenue-overview-title" className="mb-10 overflow-hidden rounded-2xl border border-[#e7dfcf] bg-white shadow-sm">
      <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
        <div className="relative overflow-hidden bg-[#202b29] p-6 text-white sm:p-8">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border-[32px] border-white/5" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e6c67c]">The business behind the celebrations</p>
            <h2 id="revenue-overview-title" className="mt-4 text-3xl !text-white">Your revenue, at a glance</h2>
            <p className="mt-6 text-sm text-white/70">Collected across active events</p>
            <p className="mt-2 break-words text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">{currency(collected)}</p>
            <p className="mt-3 text-sm text-white/70">{paidEvents} {paidEvents === 1 ? "event with a recorded payment" : "events with recorded payments"}</p>
            <div className="mt-8 border-t border-white/15 pt-5">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-white/80">Revenue with a recorded landing page</span>
                <span className="font-semibold text-[#e6c67c]">{coverage.toFixed(0)}%</span>
              </div>
              <div aria-hidden="true" className="mt-3 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-[#e6c67c]" style={{ width: `${coverage}%` }} /></div>
              <p className="mt-3 text-xs leading-relaxed text-white/65">Based on payment amounts recorded in your event list, including payments verified during agreement imports.</p>
            </div>
          </div>
        </div>
        <div className="min-w-0 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-2xl !text-[#202b29]">Where bookings began</h3>
            <span className="rounded-full bg-[#f5f1e7] px-3 py-1 text-xs font-medium text-[#765a20]">All active events</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">Recorded landing pages for events with payments. This shows the page captured when booking, not the customer’s referral source.</p>
          {rows.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-[#ded6c7] bg-[#faf8f3] p-6">
              <p className="font-medium text-slate-800">Your first payment starts the story.</p>
              <p className="mt-2 text-sm text-slate-600">Once an event has a recorded payment, its amount and available source details will appear here.</p>
            </div>
          ) : (
            <ul className="mt-6 space-y-5">
              {rows.map(([page, group]) => (
                <li key={page}>
                  <div className="flex flex-wrap items-start justify-between gap-2 text-sm">
                    <div className="min-w-0 flex-1"><p className="break-words font-semibold text-slate-800">{page === "/" ? "Homepage" : page}</p><p className="mt-1 text-xs text-slate-500">{group.count} {group.count === 1 ? "event" : "events"} · {(group.amount / collected * 100).toFixed(1)}% of collected revenue</p></div>
                    <p className="font-semibold tabular-nums text-slate-800">{currency(group.amount)}</p>
                  </div>
                  <div aria-hidden="true" className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#f1eee7]"><div className="h-full rounded-full bg-[#b59451]" style={{ width: `${group.amount / collected * 100}%` }} /></div>
                </li>
              ))}
            </ul>
          )}
          {untracked > 0 && (
            <div className="mt-6 rounded-xl border border-[#e9dfc9] bg-[#faf7ef] p-4">
              <p className="text-sm font-semibold text-[#765a20]">{currency(untracked)} has no recorded landing page</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">Uploaded agreements and older bookings may not include this detail. That does not mean these customers came directly to the website.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
