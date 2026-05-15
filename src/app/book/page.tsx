"use client"
export const dynamic = "force-dynamic"

import { useState, Suspense, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import AvailabilityCalendar from "@/components/AvailablilityCalendar"

type UpgradeKey = 'garnishes' | 'cocktails' | 'setupHour'

function BookEventPageContent() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")

  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("18:00")
  const [hours, setHours] = useState(3)
  const [bartenders, setBartenders] = useState(1)
  const [guests, setGuests] = useState(50)
  const [eventType, setEventType] = useState("")
  const [selectedUpgrades, setSelectedUpgrades] = useState<Record<UpgradeKey, boolean>>({
    garnishes: false,
    cocktails: false,
    setupHour: false
  })

  const [submitting, setSubmitting] = useState(false)
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([])

  const searchParams = useSearchParams()
  const cid = searchParams.get("cid") || ""

  // Recommended bartenders based on guest count
  const getRecommendedBartenders = (guestCount: number) => {
    if (guestCount <= 40) return 1
    if (guestCount <= 100) return 2
    if (guestCount <= 180) return 3
    return 4
  }

  const recommendedBartenders = getRecommendedBartenders(guests)

  const basePrice = 600
  const bartenderRate = 40

  const total =
    basePrice + bartenders * bartenderRate * hours

  const upgradePrices: Record<UpgradeKey, number> = {
    garnishes: 75,
    cocktails: 100,
    setupHour: 50
  }

  const upgradesTotal = Object.entries(selectedUpgrades)
    .filter(([, v]) => v)
    .reduce((sum, [k]) => sum + upgradePrices[k as UpgradeKey], 0)

  const grandTotal = total + upgradesTotal
  const deposit = Math.round(grandTotal * 0.5)

  useEffect(() => {
  fetch("https://tap-toast-api-cayk.onrender.com/api/events/booked-slots")
    .then(res => res.json())
    .then((data: BookedSlot[]) => setBookedSlots(data))
}, [])

  function isTimeBlocked(date: string, startTime: string, hours: number) {
    if (!date || !startTime) return false

    const BUFFER_HOURS = 1 // 1 hour buffer before/after events
    const newStart = new Date(`${date}T${startTime}`)
    const newEnd = new Date(newStart.getTime() + hours * 60 * 60 * 1000)

    const bufferedStart = new Date(newStart.getTime() - BUFFER_HOURS * 60 * 60 * 1000)
    const bufferedEnd = new Date(newEnd.getTime() + BUFFER_HOURS * 60 * 60 * 1000)

    return bookedSlots.some(slot => {
      const existingStart = new Date(slot.start)
      const existingEnd = new Date(slot.end)

      return bufferedStart < existingEnd && bufferedEnd > existingStart
    })
  }
type BookedSlot = {

  date: string

  start: string

  end: string

}
  // Generate time slot options for the selector
  function generateTimeOptions() {
    const options: string[] = []
    for (let h = 10; h <= 23; h++) {
      options.push(`${String(h).padStart(2, "0")}:00`)
      options.push(`${String(h).padStart(2, "0")}:30`)
    }
    return options
  }

  // Format time for visual display
  function formatTimeUI(time: string) {
    if (!time) return ""
    const [h, m] = time.split(":")
    let hour = parseInt(h, 10)
    const ampm = hour >= 12 ? "PM" : "AM"
    hour = hour % 12 || 12
    return `${hour}:${m} ${ampm}`
  }

  const handleBooking = async () => {
    setSubmitting(true)
    if (!name || !email || !location || !date || !eventType) {

  alert("Please complete all required fields before reserving your event.")

  setSubmitting(false)

  return

}
    try {
      console.log("BOOKING PAYLOAD", {
  name,
  email,
  phone,
  location,
  date,
  startTime,
  hours,
  guests,
  bartenders,
  eventType
})
      const res = await fetch("https://tap-toast-api-cayk.onrender.com/api/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({

  name,

  email,

  phone,

  location,

  event_date: date,

  start_time: startTime,

  hours,

  guests,

  bartenders, // 🔥 ADD THIS

  bartenders_needed: bartenders, // 🔥 SAFE MATCH

  event_type: eventType,

  cid,

  upgrades: (Object.keys(selectedUpgrades) as UpgradeKey[])

    .filter(k => selectedUpgrades[k])

})
      })

      if (!res.ok) {
        const text = await res.text()
        console.error("Book event request failed", res.status, text)
        alert("Failed to create booking. Check backend server or API logs.")
        setSubmitting(false)
        return
      }

      const data = await res.json()

      if (!data?.event?.id) {
        console.error("Unexpected booking response", data)
        alert("Booking created but event id missing. Check API response.")
        setSubmitting(false)
        return
      }

      const checkout = await fetch("https://tap-toast-api-cayk.onrender.com/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          event_id: data.event.id,
          type: "deposit",
          cid
        })
      })

      if (!checkout.ok) {
        console.error("Stripe session creation failed", checkout.status)
        alert("Failed to create Stripe checkout session.")
        setSubmitting(false)
        return
      }

      const session = await checkout.json()

      console.log("Stripe session response:", session)

      if (session?.url) {
        window.location.href = session.url
      } else {
        alert("Stripe session did not return a checkout URL. Check backend logs.")
        setSubmitting(false)
      }

    } catch (error) {
      console.error("Booking error", error)
      alert("Something went wrong while reserving the event. Check console.")
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <div
        className="w-full h-105 flex items-start justify-center text-center pt-20 relative"
        style={{
          backgroundImage: "url('/trailer-wedding.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative bg-black/60 p-10 rounded-xl">
          <h1 className="text-4xl font-bold mb-3">Book Tap & Toast</h1>
          <p className="text-lg">We&apos;ll just need a few quick details</p>
        </div>
      </div>

      {/* Booking Form */}
      <div className="max-w-3xl mx-auto mt-16 mb-20 bg-white text-black p-12 rounded-2xl shadow-2xl">

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-1">Simple Event Pricing</h2>
          <p className="text-gray-600 text-sm">
            Base event service starts at $600 plus $40 per hour for each bartender.
            Use the planner below to customize your event and see your quote update instantly using the sliders. Reserve only if it aligns with your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm">Name</label>
            <input
              className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 p-3 rounded-lg"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Email</label>
            <input
              className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 p-3 rounded-lg"
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Phone</label>
            <input
              className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 p-3 rounded-lg"
              type="text"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Event Location</label>
            <input
              className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 p-3 rounded-lg"
              type="text"
              value={location}
              onChange={(e)=>setLocation(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Event Type</label>
            <select
              className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 p-3 rounded-lg bg-white"
              value={eventType}
              onChange={(e)=>setEventType(e.target.value)}
            >
              <option value="" disabled>Select Event Type</option>
              <option>Wedding</option>
              <option>Corporate Event</option>
              <option>Private Party</option>
              <option>Birthday</option>
              <option>Other</option>
            </select>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="text-sm mb-2 block">Event Date</label>
            <AvailabilityCalendar
              onDateSelect={(selected: Date) => {
                const formatted = selected.toISOString().split("T")[0]
                setDate(formatted)
              }}
            />
            {date && (
              <p className="text-sm mt-2 text-green-600">
                {new Date(`${date}T${startTime}`).toLocaleString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit"
})}
              </p>
            )}
            <div className="mt-4">
              <label className="text-sm block mb-2">Select Start Time</label>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {generateTimeOptions()
                  .filter((t) => !isTimeBlocked(date, t, hours))
                  .map((t) => {
                    const selected = startTime === t
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setStartTime(t)}
                        className={`p-2 rounded-lg border text-sm transition \
              ${selected ? 'bg-black text-white border-black' : 'bg-white hover:border-black'}`}
                      >
                        {formatTimeUI(t)}
                      </button>
                    )
                  })}
              </div>
              {date && generateTimeOptions().filter((t) => !isTimeBlocked(date, t, hours)).length === 0 && (
                <p className="text-red-500 text-sm mt-2">
                  No available time slots for this date. Please choose another date.
                </p>
              )}
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 text-xs text-gray-500">
            Dates already reserved will be blocked after selection (calendar UI upgrade coming next)
          </div>

          {/* Planner Instructions */}
          <div className="col-span-1 md:col-span-2 mt-4 mb-2">
            <h2 className="text-2xl font-semibold mb-1">Plan Your Event</h2>
            <p className="text-gray-600 text-sm">
              Use the sliders below to customize your event details. Your quote
              will update automatically in real time so you can instantly see
              pricing and reserve your event when ready.
            </p>
          </div>

          <div>
            <label className="text-sm">Hours: {hours}</label>
            <input
              className="w-full"
              type="range"
              min={1}
              max={10}
              value={hours}
              onChange={(e)=>setHours(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm">
              Bartenders: {bartenders}
              <span className="text-xs text-gray-500 ml-2">
                (recommended: {recommendedBartenders})
              </span>
            </label>
            <input
              className="w-full"
              type="range"
              min={1}
              max={5}
              value={bartenders}
              onChange={(e)=>setBartenders(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm">Guest Count: {guests}</label>
            <input
              className="w-full"
              type="range"
              min={10}
              max={300}
              step={10}
              value={guests}
              onChange={(e)=>{
                const value = Number(e.target.value)
                setGuests(value)
                setBartenders(getRecommendedBartenders(value))
              }}
            />
          </div>

        </div>

  <div className="mt-8 p-6 border rounded-xl bg-white">
    <h3 className="text-lg font-semibold mb-3">Enhance Your Event (Optional)</h3>

    <div className="space-y-3">

      <label className="flex items-center justify-between">
        <span>✨ Premium Garnishes Package</span>
        <span className="text-sm">$75</span>
        <input
          type="checkbox"
          checked={selectedUpgrades.garnishes}
          onChange={() => setSelectedUpgrades(prev => ({...prev, garnishes: !prev.garnishes}))}
        />
      </label>

      <label className="flex items-center justify-between">
        <span>🍹 Signature Cocktail Menu</span>
        <span className="text-sm">$100</span>
        <input
          type="checkbox"
          checked={selectedUpgrades.cocktails}
          onChange={() => setSelectedUpgrades(prev => ({...prev, cocktails: !prev.cocktails}))}
        />
      </label>

      <label className="flex items-center justify-between">
        <span>⏱ Extra Setup Hour</span>
        <span className="text-sm">$50</span>
        <input
          type="checkbox"
          checked={selectedUpgrades.setupHour}
          onChange={() => setSelectedUpgrades(prev => ({...prev, setupHour: !prev.setupHour}))}
        />
      </label>

    </div>

    <p className="text-xs text-gray-500 mt-2">
      Optional add-ons can also be selected later after booking.
    </p>
  </div>

        <div className="mt-8 bg-gray-50 p-6 rounded-xl border md:sticky md:top-24 shadow-lg">

          <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>

          <div className="flex justify-between text-sm mb-2">
            <span>Event Type</span>
            <span>{eventType}</span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Guests</span>
            <span>{guests}</span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Bartenders</span>
            <span>{bartenders}</span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Hours</span>
            <span>{hours}</span>
          </div>

          <div className="border-t mt-4 pt-4 space-y-2">

            <div className="flex justify-between">
              <span>Base Event</span>
              <span>$600</span>
            </div>

            <div className="flex justify-between">
              <span>Staffing</span>
              <span>{new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(bartenders * 40 * hours)}</span>
            </div>

            <div className="flex justify-between font-semibold text-lg pt-2">
              <span>Total</span>
              <span>{new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(grandTotal)}</span>
            </div>

            <div className="flex justify-between text-green-700 font-semibold">
              <span>Deposit Due Today</span>
              <span>{new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(deposit)}</span>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Remaining balance automatically charged 10 days before your event.
            </p>

          </div>

        </div>
            <p className="text-sm text-[#c6a25a] font-semibold mb-3 text-center">
  Most weekends book 2–4 weeks in advance — secure your date early
</p>

<p className="text-xs text-gray-500 mb-4 text-center">
  ✔ 50% deposit to reserve  ✔ Secure checkout  ✔ Instant confirmation
</p>
<div className="mt-6 bg-black text-white p-5 rounded-xl text-center shadow-lg border border-white/10">
  <p className="text-sm opacity-70">Estimated Total</p>

  <p className="text-3xl font-bold mt-1 transition-all duration-300">
    {new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(grandTotal)}
  </p>

  <p className="text-sm text-green-400 font-semibold mt-2">
    ${deposit} due today
  </p>

  <p className="text-xs opacity-60 mt-1">
    Remaining balance charged 10 days before event
  </p>
</div>
<p className="text-xs text-gray-500 mb-4 text-center">
  By booking, you agree to our{" "}
  <a href="/legal/terms" className="underline hover:text-black">Terms</a>,{" "}
  <a href="/legal/refund-policy" className="underline hover:text-black">Refund Policy</a>, and{" "}
  <a href="/legal/privacy" className="underline hover:text-black">Privacy Policy</a>.
</p>

        <button
          onClick={handleBooking}
          disabled={submitting}
          className={`mt-6 w-full py-4 text-lg rounded-xl transition font-semibold ${submitting ? 'bg-gray-300 text-gray-600' : 'bg-linear-to-r from-yellow-400 to-yellow-500 text-black hover:opacity-90'}`}
        >
          {submitting 
  ? 'Processing…' 
  : `Reserve Event — $${deposit} Today`}
        </button>

      </div>

    </div>
  )
}

export default function BookEventPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <BookEventPageContent />
    </Suspense>
  )
}