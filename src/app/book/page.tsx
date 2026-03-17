"use client"

import { useState } from "react"

export default function BookEventPage() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")

  const [date, setDate] = useState("")
  const [hours, setHours] = useState(3)
  const [bartenders, setBartenders] = useState(1)
  const [guests, setGuests] = useState(50)
  const [eventType, setEventType] = useState("")

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

  const deposit = Math.round(total * 0.5)

  const handleBooking = async () => {
    if (!name || !email || !phone || !location || !date) {
      alert("Please complete all required fields before reserving your event.")
      return
    }
    try {
      const res = await fetch("https://tap-toast-api-cayk.onrender.com", {
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
          hours,
          bartenders,
          guests,
          event_type: eventType
        })
      })

      if (!res.ok) {
        const text = await res.text()
        console.error("Book event request failed", res.status, text)
        alert("Failed to create booking. Check backend server or API logs.")
        return
      }

      const data = await res.json()

      if (!data?.event?.id) {
        console.error("Unexpected booking response", data)
        alert("Booking created but event id missing. Check API response.")
        return
      }

      const checkout = await fetch("https://tap-toast-api-cayk.onrender.com/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          event_id: data.event.id
        })
      })

      if (!checkout.ok) {
        console.error("Stripe session creation failed", checkout.status)
        alert("Failed to create Stripe checkout session.")
        return
      }

      const session = await checkout.json()

      console.log("Stripe session response:", session)

      if (session?.url) {
        window.location.href = session.url
      } else {
        alert("Stripe session did not return a checkout URL. Check backend logs.")
      }

    } catch (error) {
      console.error("Booking error", error)
      alert("Something went wrong while reserving the event. Check console.")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <div
        className="w-full h-105 flex items-start justify-center text-center pt-20"
        style={{
          backgroundImage: "url('/trailer.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="bg-black/60 p-10 rounded-xl">
          <h1 className="text-4xl font-bold mb-3">Book Tap & Toast</h1>
          <p className="text-lg">We&apos;ll just need a few quick details</p>
        </div>
      </div>

      {/* Booking Form */}
      <div className="max-w-3xl mx-auto -mt-32 bg-white text-black p-10 rounded-xl shadow-xl">

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
              className="w-full border p-2 rounded"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Email</label>
            <input
              className="w-full border p-2 rounded"
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Phone</label>
            <input
              className="w-full border p-2 rounded"
              type="text"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Event Location</label>
            <input
              className="w-full border p-2 rounded"
              type="text"
              value={location}
              onChange={(e)=>setLocation(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Event Type</label>
            <select
              className="w-full border p-2 rounded"
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

          <div>
            <label className="text-sm">Event Date</label>
            <input
              className="w-full border p-2 rounded bg-white"
              type="date"
              value={date}
              onChange={(e)=>setDate(e.target.value)}
            />
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

        <div className="mt-8 bg-gray-50 p-6 rounded-xl border sticky bottom-0 md:bottom-auto md:top-24 z-20 shadow-lg">

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
              <span>${bartenders * 40 * hours}</span>
            </div>

            <div className="flex justify-between font-semibold text-lg pt-2">
              <span>Total</span>
              <span>${total}</span>
            </div>

            <div className="flex justify-between text-green-700 font-semibold">
              <span>Deposit Due Today</span>
              <span>${deposit}</span>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Remaining balance automatically charged 10 days before your event.
            </p>

          </div>

        </div>

        <button
          onClick={handleBooking}
          className="mt-6 w-full bg-black text-white py-4 text-lg rounded-xl hover:bg-gray-800 transition"
        >
          Reserve Event
        </button>

      </div>

    </div>
  )
}