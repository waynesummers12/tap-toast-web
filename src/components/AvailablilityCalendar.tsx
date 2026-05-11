"use client"

import { useEffect, useMemo, useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

type AvailabilityCalendarProps = {
  onDateSelect: (date: Date) => void
}

export default function AvailabilityCalendar({ onDateSelect }: AvailabilityCalendarProps) {
  const [bookedDates, setBookedDates] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch("https://tap-toast-api-cayk.onrender.com/api/events/booked-dates", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        const dates = Array.isArray(data?.bookedDates) ? data.bookedDates : (Array.isArray(data) ? data : [])
        setBookedDates(dates)
        setError(null)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error("Failed to load booked dates", err)
          setError("Failed to load availability")
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  const today = useMemo(() => new Date(), [])

  const isBooked = (date: Date) => {
    const formatted = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
      .toISOString()
      .split("T")[0]
    return bookedDates.includes(formatted)
  }

  return (
    <div className="bg-linear-to-b from-black to-gray-900 text-white p-8 rounded-2xl border border-gray-800 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          Check Availability
        </h2>
        <span className="text-xs uppercase tracking-widest text-gray-400">
          Live Calendar
        </span>
      </div>

      {loading && (
        <div className="mb-4 text-sm text-gray-400">Loading availability…</div>
      )}
      {error && (
        <div className="mb-4 text-sm text-red-400">{error}</div>
      )}

      <div className="bg-white text-black rounded-xl p-4">
        <Calendar
          minDate={today}
          tileDisabled={({ date }) => isBooked(date)}
          tileClassName={({ date, view }) => {
            if (view !== 'month') return ''
            const formatted = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
              .toISOString()
              .split("T")[0]

            if (bookedDates.includes(formatted)) {
              return "bg-red-200 text-red-800 rounded-lg line-through opacity-80"
            }

            if (selectedDate) {
              const sel = new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()))
                .toISOString()
                .split("T")[0]
              if (formatted === sel) {
                return "bg-yellow-400 text-black rounded-lg font-semibold"
              }
            }

            return "hover:bg-gray-200 rounded-lg"
          }}
          value={selectedDate}
          onChange={(val) => {
            const d = Array.isArray(val) ? val[0] : val
            setSelectedDate(d)
            if (d && !isBooked(d)) onDateSelect(d)
          }}
        />
      </div>

      <p className="mt-3 text-xs text-gray-500">
        Select an available date to continue booking. Booked dates are disabled.
      </p>

      <div className="mt-6 flex items-center gap-3 text-sm text-gray-400">
        <div className="w-3 h-3 bg-red-400 rounded-sm" />
        <span>Booked dates are unavailable</span>
      </div>

      <div className="mt-2 flex items-center gap-3 text-sm text-gray-400">
        <div className="w-3 h-3 bg-gray-200 rounded-sm" />
        <span>Available for booking</span>
      </div>
    </div>
  )
}