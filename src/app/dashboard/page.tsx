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
  fetch("/api/events")
    .then(async (res) => {
      const contentType = res.headers.get("content-type")

      if (!contentType || !contentType.includes("application/json")) {
        return []
      }

      return res.json()
    })
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        setEvents(data)
      } else {
        // fallback demo data so dashboard is usable
        setEvents([
          {
            id: "1",
            event_date: "2026-03-22",
            location: "3333 west angus ave",
            hours: 4,
            bartenders_needed: 2,
            assigned_bartenders_count: 0,
            total_price: 920,
            deposit_amount: 460,
            balance_due: 460,
            deposit_paid: false,
            customers: { name: "wayne summers", email: "waynesummers12@gmail.com" }
          }
        ])
      }

      setLoading(false)
    })
    .catch((err) => {
      console.error("Events API failed — using demo data", err)

      setEvents([
        {
          id: "1",
          event_date: "2026-03-22",
          location: "3333 west angus ave",
          hours: 4,
          bartenders_needed: 2,
          assigned_bartenders_count: 0,
          total_price: 920,
          deposit_amount: 460,
          balance_due: 460,
          deposit_paid: false,
          customers: { name: "wayne summers", email: "waynesummers12@gmail.com" }
        }
      ])

      setLoading(false)
    })
}, [])
useEffect(() => {
  if (!selectedEvent) return

  fetch(`/api/events/${selectedEvent.id}/bartenders`)
    .then(async (res) => {
      const contentType = res.headers.get("content-type")

      if (!contentType || !contentType.includes("application/json")) {
        return []
      }

      return res.json()
    })
    .then(data => {
      if (Array.isArray(data)) {
        const names = data.map((b: { name: string }) => b.name)
        setAssignedBartenders(names)
      }
    })
    .catch(err => {
      console.error("Failed to load assigned bartenders", err)
    })
}, [selectedEvent])
  useEffect(() => {
    fetch("/api/bartenders")
      .then(async (res) => {
        const contentType = res.headers.get("content-type")

        if (!contentType || !contentType.includes("application/json")) {
          return []
        }

        return res.json()
      })
      .then(data => {
        if (Array.isArray(data)) {
          const names = data.map((b: unknown) => {
            if (typeof b === "string") return b

            if (typeof b === "object" && b !== null) {
              const obj = b as { name?: string; bartender_name?: string }
              if (obj.name) return obj.name
              if (obj.bartender_name) return obj.bartender_name
            }

            return null
          }).filter((n): n is string => Boolean(n))

          if (names.length > 0) {
            setAvailableBartenders(names)
          } else {
            setAvailableBartenders(["Wayne", "Jen", "Jessica", "Jeff"])
          }
        } else {
          setAvailableBartenders(["Wayne", "Jen", "Jessica", "Jeff"])
        }
      })
      .catch(err => {
        console.error("Failed to load bartenders", err)
      })
  }, [])
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

      // Auto update event status locally
      if (type === "balance") {
        setEvents(prev =>
          prev.map(e =>
            e.id === eventId
              ? { ...e, balance_due: 0, deposit_paid: true }
              : e
          )
        )
      }

    } else {
      alert("Failed to send payment link")
    }
  } catch (err) {
    console.error(err)
    alert("Server error sending payment link")
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

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const calendarCells: (number | null)[] = []

  for (let i = 0; i < firstDay; i++) calendarCells.push(null)
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d)

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
          <div className="bg-white rounded-xl shadow-sm border p-6">

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

                return (
                  <div
                    key={idx}
                    className="min-h-22.5 border rounded p-2 bg-gray-50"
                  >
                    {day && (
                      <div className="text-xs font-semibold mb-1">{day}</div>
                    )}

                    {dayEvents.map(event => (
                      <div
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className={`text-[11px] border rounded px-1 py-0.5 mb-1 cursor-pointer
                          ${event.deposit_paid ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}
                          hover:bg-gray-100`
                        }
                      >
                        <div className="flex items-center justify-between">
                          <span>{event.customers?.name}</span>
                          <span className={`w-2 h-2 rounded-full ${event.deposit_paid ? "bg-green-500" : "bg-red-500"}`}></span>
                        </div>
                      </div>
                    ))}

                  </div>
                )
              })}

            </div>

          </div>
        )}

        {selectedEvent && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-125 rounded-xl shadow-lg p-6">

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Event Details</h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>

              <div className="space-y-3 text-sm">

                <div>
                  <strong>Customer:</strong> {selectedEvent.customers?.name}
                </div>

                <div>
                  <strong>Email:</strong> {selectedEvent.customers?.email}
                </div>

                <div>
                  <strong>Date:</strong> {new Date(selectedEvent.event_date).toLocaleDateString()}
                </div>

                <div>
                  <strong>Location:</strong> {selectedEvent.location}
                </div>

                <div>
                  <strong>Hours:</strong> {selectedEvent.hours}
                </div>

                <div>
                  <strong>Bartenders Needed:</strong> {selectedEvent.bartenders_needed}
                </div>

                <div>
                  <strong>Total Price:</strong> ${selectedEvent.total_price}
                </div>

                <div>
                  <strong>Deposit Paid:</strong> {selectedEvent.deposit_paid ? "Yes" : "No"}
                </div>

                <div>
                  <strong>Balance Due:</strong> ${selectedEvent.balance_due}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <strong>Assigned Bartenders</strong>
                    <select
                      onChange={(e) => {
                        const name = e.target.value
                        if (name && !assignedBartenders.includes(name)) {
                          setAssignedBartenders([...assignedBartenders, name])
                        }
                      }}
                      className="text-xs px-2 py-1 border rounded bg-white"
                    >
                      <option value="">+ Add Bartender</option>
                      {availableBartenders.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  {assignedBartenders.length === 0 && (
                    <div className="text-gray-500 text-xs">No bartenders assigned</div>
                  )}

                  {assignedBartenders.map((b, i) => (
                    <div key={i} className="text-sm flex justify-between items-center">
                      <span>{b}</span>

                      <div className="flex items-center gap-3">
                        <span className="text-gray-500">
                          {selectedEvent.hours} hrs · ${selectedEvent.hours * 25}
                        </span>

                        <button
                          onClick={() => {
                            const updated = assignedBartenders.filter((_, idx) => idx !== i)
                            setAssignedBartenders(updated)
                          }}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t mt-4 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Bartender Cost</span>
                    <span>
                      ${assignedBartenders.length * (selectedEvent.hours * 25)}
                    </span>
                  </div>

                  <div className="flex justify-between font-medium">
                    <span>Event Profit</span>
                    <span>
                      ${Math.max(
                        selectedEvent.total_price - (assignedBartenders.length * (selectedEvent.hours * 25)),
                        0
                      )}
                    </span>
                  </div>
                </div>

                {/* Modal Footer: Save/Cancel buttons */}
                <div className="pt-4 flex justify-end gap-2">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => selectedEvent && saveBartenderAssignments(selectedEvent)}
                    className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Save Staffing
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  )
}