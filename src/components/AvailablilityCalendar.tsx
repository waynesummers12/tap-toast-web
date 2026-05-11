"use client"

import { useEffect, useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

type AvailabilityCalendarProps = {
  onDateSelect: (date: Date) => void
}

export default function AvailabilityCalendar({ onDateSelect }: AvailabilityCalendarProps) {
  const [bookedDates, setBookedDates] = useState<string[]>([])

  useEffect(() => {
    fetch("https://tap-toast-api-cayk.onrender.com/api/events/booked-dates")
      .then((res) => res.json())
      .then((data) => setBookedDates(data.bookedDates || data))
  }, [])

  const isBooked = (date: Date) => {
    const formatted = date.toISOString().split("T")[0]
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

      <div className="bg-white text-black rounded-xl p-4">
        <Calendar
          tileDisabled={({ date }) => isBooked(date)}
          tileClassName={({ date }) => {
            const formatted = date.toISOString().split("T")[0]
            if (bookedDates.includes(formatted)) {
              return "bg-red-200 text-red-800 rounded-lg"
            }
            return "hover:bg-gray-200 rounded-lg"
          }}
          onClickDay={(date) => onDateSelect(date)}
        />
      </div>

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