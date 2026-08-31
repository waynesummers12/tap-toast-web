"use client"

import { useEffect, useMemo, useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import "./calendar-overrides.css"

type AvailabilityCalendarProps = {
  onDateSelect: (date: Date) => void
  hours: number
}

type BookedSlot = {
  date: string
  start: string
  end: string
}

export default function AvailabilityCalendar({ onDateSelect, hours }: AvailabilityCalendarProps) {
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch("https://tap-toast-api-cayk.onrender.com/api/events/booked-slots", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        const slots = Array.isArray(data) ? data : []
        setBookedSlots(slots)
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

  const isDateFullyBlocked = (date: Date) => {
    const dateStr = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
      .toISOString()
      .split("T")[0]

    const slotsForDay = bookedSlots.filter(s => s.date === dateStr)

    if (slotsForDay.length === 0) return false

    // Generate all possible time options (same as booking page)
    const generateTimeOptions = () => {
      const options: string[] = []
      for (let h = 10; h <= 23; h++) {
        options.push(`${String(h).padStart(2, "0")}:00`)
        options.push(`${String(h).padStart(2, "0")}:30`)
      }
      return options
    }

    const BUFFER_HOURS = 1

    const isTimeBlocked = (time: string) => {
      const newStart = new Date(`${dateStr}T${time}`)
      const newEnd = new Date(newStart.getTime() + hours * 60 * 60 * 1000)

      const bufferedStart = new Date(newStart.getTime() - BUFFER_HOURS * 60 * 60 * 1000)
      const bufferedEnd = new Date(newEnd.getTime() + BUFFER_HOURS * 60 * 60 * 1000)

      return slotsForDay.some(slot => {
        const existingStart = new Date(slot.start)
        const existingEnd = new Date(slot.end)

        return bufferedStart < existingEnd && bufferedEnd > existingStart
      })
    }

    // If NO valid time options exist → fully blocked
    const availableTimes = generateTimeOptions().filter(t => !isTimeBlocked(t))

    return availableTimes.length === 0
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
          tileDisabled={({ date }) => isDateFullyBlocked(date)}
          tileClassName={({ date, view }) => {
            if (view !== 'month') return ''

            const dateStr = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
              .toISOString()
              .split("T")[0]

            if (isDateFullyBlocked(date)) {
              return "bg-red-200 text-red-800 rounded-lg opacity-80"
            }

            if (bookedSlots.some(s => s.date === dateStr)) {
              return "bg-yellow-100 text-black rounded-lg"
            }

            if (selectedDate) {
              const sel = new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()))
                .toISOString()
                .split("T")[0]
              if (dateStr === sel) {
                return "bg-yellow-400 text-black rounded-lg font-semibold"
              }
            }

            return "hover:bg-gray-200 rounded-lg"
          }}
          value={selectedDate}
          onChange={(val) => {
            const d = Array.isArray(val) ? val[0] : val
            setSelectedDate(d)
            if (d && !isDateFullyBlocked(d)) onDateSelect(d)
          }}
        />
      </div>

      <p className="mt-3 text-xs text-gray-500">
        Select an available date to continue booking. Booked dates are disabled.
      </p>

      <div className="mt-6 flex items-center gap-3 text-sm text-gray-400">
        <div className="w-3 h-3 bg-red-400 rounded-sm" />
        <span>Fully booked dates are unavailable</span>
      </div>

      <div className="mt-2 flex items-center gap-3 text-sm text-gray-400">
        <div className="w-3 h-3 bg-yellow-200 rounded-sm" />
        <span>Partially booked (limited times available)</span>
      </div>

      <div className="mt-2 flex items-center gap-3 text-sm text-gray-400">
        <div className="w-3 h-3 bg-gray-200 rounded-sm" />
        <span>Available for booking</span>
      </div>
    </div>
  )
}