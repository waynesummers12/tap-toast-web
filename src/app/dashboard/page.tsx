"use client"

import { useEffect, useState } from "react"

interface EventItem {
  // Event status is derived from deposit_paid and balance_due
  id: string
  event_date: string
  location: string
  hours: number
  bartenders_needed: number
  assigned_bartenders_count?: number
  total_price: number
  deposit_amount: number
  balance_due: number
  deposit_paid: boolean
  balance_remaining?: number
  profit_estimate?: number
  customers?: {
    name: string
    email: string
  }
  cid?: string
  landing_page?: string
}

export default function DashboardPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [availableBartenders, setAvailableBartenders] = useState<string[]>([])
  const [assignedBartenders, setAssignedBartenders] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table")
  const [search, setSearch] = useState("")
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [viewStartDate, setViewStartDate] = useState<string>("")
  const [viewEndDate, setViewEndDate] = useState<string>("")

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

useEffect(() => {
  const loadEvents = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events`
      )

      if (!res.ok) {
        throw new Error(`Failed to fetch events: ${res.status}`)
      }

      const data = await res.json()

      console.log("✅ REAL EVENTS FROM API:", data)

      setEvents(Array.isArray(data) ? data : [])

    } catch (err) {
      console.error("❌ Events API failed:", err)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  loadEvents()
}, [])


// Load assigned bartenders for selected event
useEffect(() => {
  if (!selectedEvent?.id) return

  const loadAssigned = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${selectedEvent.id}/bartenders`
      )

      if (!res.ok) {
        throw new Error("Failed to fetch assigned bartenders")
      }

      const data = await res.json()

      if (Array.isArray(data)) {
        const names = data.map((b: { name: string }) => b.name)
        setAssignedBartenders(names)
      }

    } catch (err) {
      console.error("❌ Failed to load assigned bartenders", err)
      setAssignedBartenders([])
    }
  }

  loadAssigned()
}, [selectedEvent])


// Load available bartenders
useEffect(() => {
  const loadBartenders = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bartenders`
      )

      if (!res.ok) {
        throw new Error("Failed to fetch bartenders")
      }

      const data = await res.json()

      if (Array.isArray(data)) {
        const names = data
          .map((b: unknown) => {
            if (typeof b === "string") return b

            if (typeof b === "object" && b !== null) {
              const obj = b as { name?: string; bartender_name?: string }
              return obj.name || obj.bartender_name || null
            }

            return null
          })
          .filter((n): n is string => Boolean(n))

        setAvailableBartenders(
          names.length > 0
            ? names
            : ["Wayne", "Jen", "Jessica", "Jeff"]
        )
      }

    } catch (err) {
      console.error("❌ Failed to load bartenders", err)
      setAvailableBartenders(["Wayne", "Jen", "Jessica", "Jeff"])
    }
  }

  loadBartenders()
}, [])


interface GtagFn {
  (...args: unknown[]): void
}

function getGtag(): GtagFn | undefined {
  if (typeof window === "undefined") return undefined
  return (window as unknown as { gtag?: GtagFn }).gtag
}

const sendPaymentLink = async (
  eventId: string,
  type: "deposit" | "balance"
) => {
  try {
    const res = await fetch(
      `/api/stripe/send-${type}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ eventId })
      }
    )

    let data: { success?: boolean } = {}
    const contentType = res.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      data = await res.json()
    }

    if (data?.success) {
      alert(
        type === "deposit"
          ? "Deposit invoice sent to customer"
          : "Balance invoice sent to customer"
      )

      // Enhanced tracking for revenue and booking events
      // Find the event object for value tracking
      const event = events.find(e => e.id === eventId)
      if (event) {
        {
          const gtag = getGtag()
          if (gtag) {
            gtag('event', 'payment_link_sent', {
              event_category: 'revenue',
              event_label: type,
              value: type === 'deposit' ? event.deposit_amount : event.balance_due,
              currency: 'USD'
            })
          }
        }
        // Simulate booking value event when deposit is sent
        if (type === "deposit") {
          const gtag = getGtag()
          if (gtag) {
            gtag('event', 'begin_checkout', {
              currency: 'USD',
              value: event.deposit_amount,
              items: [
                {
                  item_name: 'Tap & Toast Event Booking',
                  price: event.deposit_amount
                }
              ]
            })
          }
        }
      }

      // Auto update event status locally
      if (type === "balance") {
        setEvents(prev =>
          prev.map(e =>
            e.id === eventId
              ? { ...e, balance_due: 0, deposit_paid: true }
              : e
          )
        )
        // Send a FULL revenue event when balance is paid
        if (event) {
          const gtag = getGtag()
          if (gtag) {
            gtag('event', 'purchase', {
              transaction_id: eventId,
              value: event.total_price,
              currency: 'USD'
            })
          }
        }
      }

    } else {
      alert("Failed to send payment link")
    }
  } catch (err) {
    console.error(err)
    alert("Server error sending payment link")
  }
}

// Send Reminder Email (Deposit or Balance)
const sendReminder = async (event: EventItem) => {
  try {
    console.log("SENDING REMINDER FOR EVENT:", event)

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

    const res = await fetch(
      "/api/email/reminder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event.id,
          type,
        }),
      }
    )

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

// Save bartender assignments to backend via API
async function saveBartenderAssignments(event: EventItem) {
  try {
    const payload = {
      event_id: event.id,
      bartenders: assignedBartenders.map(name => ({
        name,
        hours: event.hours,
        pay: event.hours * 25
      }))
    }

    const res = await fetch("/api/events/assign-bartenders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })

    const data = await res.json()

    if (!data?.success) {
      alert("Failed to save bartender assignments")
      return
    }

    alert("Bartenders assigned successfully")

    // Optimistically update staffing indicator locally
    setEvents(prev =>
      prev.map(e =>
        e.id === event.id
          ? { ...e, assigned_bartenders_count: assignedBartenders.length }
          : e
      )
    )

    setSelectedEvent(null)
  } catch (err) {
    console.error(err)
    alert("Server error saving assignments")
  }
}
  const filteredEvents = events.filter((e) => {
    const name = e.customers?.name?.toLowerCase() || ""
    const location = e.location?.toLowerCase() || ""
    const q = search.toLowerCase()

    const eventDate = new Date(e.event_date)

    if (viewStartDate) {
      const start = new Date(viewStartDate)
      start.setHours(0,0,0,0)
      if (eventDate < start) return false
    }

    if (viewEndDate) {
      const end = new Date(viewEndDate)
      end.setHours(23,59,59,999)
      if (eventDate > end) return false
    }

    return name.includes(q) || location.includes(q)
  })

  if (loading) {
    return (
      <div style={{ padding: 40 }}>
        Loading events...
      </div>
    )
  }

  const totalEvents = events.length

  const upcomingEvents = events.filter(e => new Date(e.event_date) >= new Date()).length

  const revenueCollected = events.reduce((sum, e) => {
    if (e.deposit_paid) {
      const paid = e.total_price - e.balance_due
      return sum + paid
    }
    return sum
  }, 0)

  const pendingBalances = events.reduce((sum, e) => sum + (e.balance_due || 0), 0)
  const totalProfit = events.reduce((sum, e) => {
    const profit = e.profit_estimate ?? Math.max((e.total_price || 0) - ((e.hours || 0) * (e.bartenders_needed || 0) * 25), 0)
    return sum + profit
  }, 0)

  const bartenderPayroll = events.reduce((sum, e) => {
    const bartenders = e.assigned_bartenders_count ?? e.bartenders_needed ?? 0
    const hours = e.hours ?? 0
    return sum + bartenders * hours * 25
  }, 0)

  const staffingAlerts = events.filter(e => {
    const assigned = e.assigned_bartenders_count ?? 0
    const needed = e.bartenders_needed ?? 0
    const upcoming = new Date(e.event_date) >= new Date()
    return upcoming && assigned < needed
  }).length

  const now = new Date()
  const day = now.getDay()

  const saturday = new Date(now)
  saturday.setDate(now.getDate() + (6 - day))
  saturday.setHours(0,0,0,0)

  const sunday = new Date(saturday)
  sunday.setDate(saturday.getDate() + 1)
  sunday.setHours(23,59,59,999)

  const weekendEventsList = events.filter(e => {
    const d = new Date(e.event_date)
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
    const eventDate = new Date(event.event_date)
    const daysUntil = Math.ceil(
      (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    )

    const needsDeposit = !event.deposit_paid
    const balanceDueSoon = event.deposit_paid && event.balance_due > 0 && daysUntil <= 10
    const needsStaffing = (event.assigned_bartenders_count ?? 0) < event.bartenders_needed

    return needsDeposit || balanceDueSoon || needsStaffing
  })

  const prioritizedEvents: EventItem[] = [...events]
    .filter((event: EventItem) => new Date(event.event_date) >= today)
    .sort((a: EventItem, b: EventItem) => {
      const score = (e: EventItem) => {
        let s = 0

        if (!e.deposit_paid) s += 100
        else if (e.balance_due > 0) s += 80

        const assigned = e.assigned_bartenders_count ?? 0
        if (assigned < e.bartenders_needed) s += 60

        const days = Math.ceil(
          (new Date(e.event_date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        )

        if (days <= 3) s += 50
        else if (days <= 7) s += 30

        return s
      }

      return score(b) - score(a)
    })

  return (
    <div className="min-h-screen bg-gray-50 p-10 text-gray-800">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-semibold mb-8 text-[#9C7A2C]">
          Tap & Toast Admin
        </h1>
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
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-8 gap-6 mb-10">

              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-gray-600 text-sm mb-2">Total Events</div>
                <div className="text-2xl font-semibold">
                  {totalEvents}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-gray-600 text-sm mb-2">Upcoming Events</div>
                <div className="text-2xl font-semibold">
                  {upcomingEvents}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-gray-600 text-sm mb-2">Revenue Collected</div>
                <div className="text-2xl font-semibold">
                  ${revenueCollected}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-gray-600 text-sm mb-2">Pending Balances</div>
                <div className="text-2xl font-semibold">
                  ${pendingBalances}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-gray-600 text-sm mb-2">Total Profit</div>
                <div className="text-2xl font-semibold">
                  ${totalProfit}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-gray-600 text-sm mb-2">Bartender Payroll</div>
                <div className="text-2xl font-semibold">
                  ${bartenderPayroll}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-gray-600 text-sm mb-2">Staffing Needed</div>
                <div className="text-2xl font-semibold text-red-600">
                  {staffingAlerts}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Upcoming events missing bartenders
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-gray-600 text-sm mb-2">This Weekend</div>
                <div className="text-sm text-gray-700">
                  <div>{weekendEvents} events</div>
                  <div>${weekendRevenue} revenue</div>
                </div>
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
                  <>
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
                  </>
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

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

              <table className="w-full text-sm">

                <thead className="bg-gray-50">
                  <tr className="text-left text-gray-800">
                    <th className="p-4">Customer</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Hours</th>
                    <th className="p-4">Bartenders</th>
                    <th className="p-4">Staffing</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Deposit</th>
                    <th className="p-4">Balance</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Profit</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredEvents.map((event) => (

                    <tr
                      key={event.id}
                      className={`border-t hover:bg-gray-50 ${
                        (event.assigned_bartenders_count ?? 0) >= event.bartenders_needed
                          ? "bg-green-50"
                          : ""
                      }`}
                    >

                      <td className="p-4 font-medium">
                        {event.customers?.name || "Customer"}
                      </td>

                      <td className="p-4">
                        {new Date(event.event_date).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        {event.location}
                      </td>

                      <td className="p-4">
                        {event.hours} hrs
                      </td>

                      <td className="p-4">
                        {event.bartenders_needed}
                      </td>
                      <td className="p-4">
                        {(() => {
                          const assigned = event.assigned_bartenders_count ?? 0
                          const needed = event.bartenders_needed

                          let color = "bg-red-100 text-red-700"

                          if (assigned === 0) color = "bg-red-100 text-red-700"
                          else if (assigned < needed) color = "bg-yellow-100 text-yellow-700"
                          else color = "bg-green-100 text-green-700"

                          return (
                            <span className={`px-2 py-1 text-xs rounded font-medium ${color}`}>
                              {assigned} / {needed}
                            </span>
                          )
                        })()}
                      </td>

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
                        {event.deposit_paid && event.balance_due === 0 && (
                          <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700 font-medium">
                            Paid
                          </span>
                        )}

                        {event.deposit_paid && event.balance_due > 0 && (
                          <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700 font-medium">
                            Deposit Paid
                          </span>
                        )}

                        {!event.deposit_paid && (
  <button
    onClick={() => sendPaymentLink(event.id, "deposit")}
    className="px-3 py-1 text-xs rounded bg-amber-500 text-white hover:bg-amber-600"
  >
    Send Deposit
  </button>
)}

{event.deposit_paid && event.balance_due > 0 && (
  <button
    onClick={() => sendPaymentLink(event.id, "balance")}
    className="px-3 py-1 text-xs rounded bg-purple-600 text-white hover:bg-purple-700"
  >
    Send Balance
  </button>
)}
                      </td>

                      <td className="p-4 font-semibold text-gray-800">
                        ${event.profit_estimate ?? Math.max((event.total_price || 0) - ((event.hours || 0) * (event.bartenders_needed || 0) * 25), 0)}
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                            setSelectedEvent(event)
                            }}
                            className="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700"
                          >
                            View
                          </button>

                          <button
                            onClick={() => {
                              setSelectedEvent(event)
                              setAssignedBartenders([])
                            }}
                            className="px-3 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300"
                          >
                            Assign
                          </button>

                          {!event.deposit_paid && (
                            <button
                              onClick={() => sendPaymentLink(event.id, "balance")}
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
                    const d = new Date(e.event_date)
                    return day && d.getDate() === day && d.getMonth() === month
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
        const eventDate = new Date(event.event_date)
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
        } else if ((event.assigned_bartenders_count ?? 0) < event.bartenders_needed) {
          label = "Staffing Needed"
          color = "bg-orange-100 text-orange-700"
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
              {new Date(event.event_date).toLocaleDateString()}
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
              {new Date(event.event_date).toLocaleDateString()}
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
                  {new Date(selectedEvent.event_date).toLocaleDateString()}
                </div>
                <div className="text-gray-500">{selectedEvent.location}</div>
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
                  {!selectedEvent.deposit_paid && (
                    <button
                      onClick={() => sendPaymentLink(selectedEvent.id, "deposit")}
                      className="flex-1 bg-amber-500 text-white text-xs py-2 rounded"
                    >
                      Send Deposit
                    </button>
                  )}

                  {selectedEvent.deposit_paid && selectedEvent.balance_due > 0 && (
                    <button
                      onClick={() => sendPaymentLink(selectedEvent.id, "balance")}
                      className="flex-1 bg-purple-600 text-white text-xs py-2 rounded"
                    >
                      Send Balance
                    </button>
                  )}
                </div>
                <button
                  onClick={() => selectedEvent && sendReminder(selectedEvent)}
                  className="w-full mt-2 bg-gray-800 text-white text-xs py-2 rounded"
                >
                  Send Reminder
                </button>
              </div>


              {/* Staffing */}
              <div className="mb-6 border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Staffing</h3>

                  <select
                    onChange={(e) => {
                      const name = e.target.value
                      if (name && !assignedBartenders.includes(name)) {
                        setAssignedBartenders([...assignedBartenders, name])
                      }
                    }}
                    className="text-xs border rounded px-2 py-1"
                  >
                    <option value="">+ Add</option>
                    {availableBartenders.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {assignedBartenders.length === 0 && (
                  <div className="text-xs text-gray-500">
                    No bartenders assigned
                  </div>
                )}

                {assignedBartenders.map((b, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{b}</span>
                    <button
                      onClick={() =>
                        setAssignedBartenders(prev =>
                          prev.filter((_, idx) => idx !== i)
                        )
                      }
                      className="text-xs text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Profit */}
              <div className="mb-6 border rounded-lg p-4 text-sm">
                <div className="flex justify-between">
                  <span>Bartender Cost</span>
                  <span>
                    ${assignedBartenders.length * (selectedEvent.hours * 25)}
                  </span>
                </div>

                <div className="flex justify-between font-semibold mt-1">
                  <span>Profit</span>
                  <span>
                    ${Math.max(
                      selectedEvent.total_price -
                      assignedBartenders.length * selectedEvent.hours * 25,
                      0
                    )}
                  </span>
                </div>
              </div>

              {/* Save */}
              <button
                onClick={() => saveBartenderAssignments(selectedEvent)}
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                Save Changes
              </button>

            </div>
          </div>
        )}

      </div>

    </div>
  )
}