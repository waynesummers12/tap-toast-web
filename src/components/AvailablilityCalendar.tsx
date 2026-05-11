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
    fetch("/api/availability")
      .then((res) => res.json())
      .then((data) => setBookedDates(data.bookedDates))
  }, [])

  const isBooked = (date: Date) => {
    const formatted = date.toISOString().split("T")[0]
    return bookedDates.includes(formatted)
  }

  return (
    <div className="bg-black text-white p-6 rounded-xl">
      <h2 className="text-xl mb-4 font-bold">Check Availability</h2>

      <Calendar
        tileDisabled={({ date }) => isBooked(date)}
        onClickDay={(date) => onDateSelect(date)}
      />

      <p className="mt-4 text-sm opacity-70">
        ❌ Booked dates are unavailable
      </p>
    </div>
  )
}