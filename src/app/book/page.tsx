"use client"
export const dynamic = "force-dynamic"

import { useState, Suspense, useEffect, useRef, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import AvailabilityCalendar from "@/components/AvailablilityCalendar"

type UpgradeKey = 'garnishes' | 'cocktails' | 'setupHour'

function BookEventPageContent() {

  const searchParams = useSearchParams()
  const cid = searchParams.get("cid") || ""

  const bookingType = searchParams.get("type") || "full"
  const tierParam = searchParams.get("tier")
  const isRentalInit = bookingType === "rental"

  const [mode, setMode] = useState<"full" | "rental">(isRentalInit ? "rental" : "full")
  const isRental = mode === "rental"

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [tier, setTier] = useState<"essentials" | "signature" | "premium" | "custom">(
    () => {
      if (tierParam === "essentials" || tierParam === "signature" || tierParam === "premium") {
        return tierParam
      }
      return isRental ? "custom" : "signature"
    }
  )

  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("18:00")
  const [hours, setHours] = useState(4)
  const [bartenders, setBartenders] = useState(
    () => (isRental ? 0 : 2)
  )
  const [guests, setGuests] = useState(100)
  const [eventType, setEventType] = useState("")
  const [selectedUpgrades, setSelectedUpgrades] = useState<Record<UpgradeKey, boolean>>({
    garnishes: true,
    cocktails: true,
    setupHour: false
  })

  const [submitting, setSubmitting] = useState(false)
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([])
  // UX Micro-interactions and personalization
  const [saved, setSaved] = useState(false)
  const completion = [name, email, location, date, eventType].filter(Boolean).length / 5

  // Recommended bartenders based on guest count
  const getRecommendedBartenders = (guestCount: number) => {
    if (guestCount <= 40) return 1
    if (guestCount <= 100) return 2
    if (guestCount <= 180) return 3
    return 4
  }
const applyTier = useCallback((t: "essentials" | "signature" | "premium") => {
  setTier(t)

  if (t === "essentials") {
    setHours(3)
    setGuests(50)
    setBartenders(1)
    setSelectedUpgrades({
      garnishes: false,
      cocktails: false,
      setupHour: false
    })
  }

  if (t === "signature") {
    setHours(4)
    setGuests(100)
    setBartenders(2)
    setSelectedUpgrades({
      garnishes: true,
      cocktails: true,
      setupHour: false
    })
  }

  if (t === "premium") {
    setHours(5)
    setGuests(150)
    setBartenders(3)
    setSelectedUpgrades({
      garnishes: true,
      cocktails: true,
      setupHour: true
    })
  }
}, [])

  const recommendedBartenders = getRecommendedBartenders(guests)

  const basePrice = isRental ? 600 : 900
  const bartenderRate = isRental ? 0 : 60
  const tierPriceMap = {
    essentials: 0,
    signature: 150,
    premium: 300,
    custom: 0
  }

  const total = isRental
    ? basePrice
    : basePrice + bartenders * bartenderRate * hours + tierPriceMap[tier]
  const tierExtra = tierPriceMap[tier]

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

  // Animated price change feedback state
  const [delta, setDelta] = useState(0)
  const prevTotalRef = useRef(grandTotal)
const prevTierRef = useRef(tier)
const [highlightKeys, setHighlightKeys] = useState<Set<string>>(new Set())

  useEffect(() => {
    const saved = localStorage.getItem("tap_toast_quote")
    if (!saved) return

    try {
      const data = JSON.parse(saved)

      const t = setTimeout(() => {
        setName(data.name || "")
        setEmail(data.email || "")
        setPhone(data.phone || "")
        setLocation(data.location || "")
        setDate(data.date || "")
        setStartTime(data.startTime || "18:00")
        setHours(data.hours || 4)
        setGuests(data.guests || 100)
        setBartenders(data.bartenders || 2)
        setEventType(data.eventType || "")
        setSelectedUpgrades(data.selectedUpgrades || {
          garnishes: true,
          cocktails: true,
          setupHour: false
        })
        setTier(data.tier || "signature")
        setMode(data.mode || "full")

        console.log("Recovered saved quote")
      }, 0)

      return () => clearTimeout(t)

    } catch (err) {
      console.error("Failed to restore quote", err)
    }
  }, [])

  useEffect(() => {

  if (!cid) return

  fetch(`/api/events/get-quote?cid=${cid}`)

    .then(res => res.json())

    .then(data => {

      if (!data) return

      setName(data.name || "")

      setEmail(data.email || "")

      setPhone(data.phone || "")

      setLocation(data.location || "")

      setDate(data.event_date || "")

      setStartTime(data.start_time || "18:00")

      setHours(data.hours || 4)

      setGuests(data.guests || 100)

      setBartenders(data.bartenders || 2)

      setEventType(data.event_type || "")

      setTier(data.tier || "signature")

      setMode(data.mode || "full")

    })

}, [cid])

useEffect(() => {
  if (!tierParam) return

  const t = setTimeout(() => {
    if (tierParam === "taste") applyTier("essentials")
    if (tierParam === "signature") applyTier("signature")
    if (tierParam === "premium") applyTier("premium")
  }, 0)

  return () => clearTimeout(t)

}, [tierParam, applyTier])
  useEffect(() => {
  fetch("https://tap-toast-api-cayk.onrender.com/api/events/booked-slots")
    .then(res => res.json())
    .then((data: BookedSlot[]) => setBookedSlots(data))
}, [])

// 🔥 Auto-save quote if user doesn't complete booking
useEffect(() => {
  // Only run if they’ve entered key info
  if (!name || !email || !date) return

  // Save to localStorage
  const quote = {
    name,
    email,
    phone,
    location,
    date,
    startTime,
    hours,
    guests,
    bartenders,
    eventType,
    selectedUpgrades,
    tier,
    mode
  }

  localStorage.setItem("tap_toast_quote", JSON.stringify(quote))

  const timeout = setTimeout(async () => {
    try {
      console.log("AUTO-SAVING QUOTE...")

      const res = await fetch("https://tap-toast-api-cayk.onrender.com/api/events/save-quote", {
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
          bartenders,
          event_type: eventType,
          upgrades: Object.keys(selectedUpgrades).filter(
            k => selectedUpgrades[k as UpgradeKey]
          ),
          estimated_total: grandTotal,
          deposit
        })
      })

      const data = await res.json()

      if (data?.cid) {
        localStorage.setItem("quote_cid", data.cid)
      }

      console.log("QUOTE SAVED")
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error("Quote auto-save failed", err)
    }
  }, 10000) // ⏱ waits 10 seconds of inactivity

  return () => clearTimeout(timeout)

}, [
  name,
  email,
  phone,
  location,
  date,
  startTime,
  hours,
  guests,
  bartenders,
  eventType,
  selectedUpgrades,
  grandTotal,
  deposit,
  tier,
  mode
])

// Animated price change feedback effect
useEffect(() => {
  const prev = prevTotalRef.current
  const diff = grandTotal - prev

  // update ref immediately (no re-render)
  prevTotalRef.current = grandTotal
  if (prev !== 0 && diff !== 0) {
    // defer updates to avoid lint error
    const t1 = setTimeout(() => setDelta(diff), 0)
    const t2 = setTimeout(() => setDelta(0), 1500)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }
}, [grandTotal])

// 🔄 Reset state intelligently when switching modes
useEffect(() => {
  const t = setTimeout(() => {
    if (mode === "rental") {
      setTier("custom")
      setBartenders(0)

      setSelectedUpgrades(prev => ({
        ...prev,
        cocktails: false,
      }))
    } else {
      setTier("signature")
      setBartenders(2)

      setSelectedUpgrades({
        garnishes: true,
        cocktails: true,
        setupHour: false
      })
    }
  }, 0)

  return () => clearTimeout(t)
}, [mode])

// Highlight gained features when tier changes
useEffect(() => {
  const prev = prevTierRef.current
  const next = tier
  prevTierRef.current = next

  const features: Record<string, Set<string>> = {
    essentials: new Set(["bartender1", "hours3", "basic"]),
    signature: new Set(["bartender2", "hours4", "cocktails", "garnishes"]),
    premium: new Set(["bartender3", "hours5", "full", "garnishes", "setup"]),
    custom: new Set()
  }

  const prevSet = features[prev] || new Set()
  const nextSet = features[next] || new Set()

  const gained = new Set<string>()
  nextSet.forEach(k => {
    if (!prevSet.has(k)) gained.add(k)
  })

  if (gained.size > 0) {
    const t1 = setTimeout(() => setHighlightKeys(gained), 0)
    const t2 = setTimeout(() => setHighlightKeys(new Set()), 900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }
}, [tier])

// 🎯 Auto-recommend upgrades based on event type
useEffect(() => {
  if (!eventType) return

  const t = setTimeout(() => {
    setSelectedUpgrades(prev => {
      const next = { ...prev }

      if (eventType === "Wedding") {
        next.garnishes = true
        next.cocktails = true
      }

      if (eventType === "Corporate Event") {
        next.cocktails = true
      }

      if (eventType === "Private Party" || eventType === "Birthday") {
        next.garnishes = true
      }

      return next
    })
  }, 0)

  return () => clearTimeout(t)
}, [eventType])
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
        localStorage.removeItem("tap_toast_quote")
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

      {/* Toggle UI for Full Service / Rental - moved below hero */}
      <div className="mt-8 text-center">
        <div className="relative flex justify-center">
          <div className="bg-white/90 backdrop-blur rounded-full p-1 flex shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group">
            <div
              className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-black transition-all duration-300 ease-out shadow-md group-hover:shadow-[0_0_12px_rgba(198,162,90,0.6)] ${
                mode === "full" ? "left-1" : "left-1/2"
              }`}
            />
            <button
              type="button"
              onClick={() => setMode("full")}
              className={`relative z-10 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 active:scale-95 hover:-translate-y-px ${
                mode === "full"
                  ? "text-white scale-105 drop-shadow-[0_0_6px_rgba(198,162,90,0.8)] group-hover:drop-shadow-[0_0_10px_rgba(198,162,90,0.9)]"
                  : "text-black/70 hover:text-black hover:scale-105"
              }`}
            >
              Full Service
            </button>
            <button
              type="button"
              onClick={() => setMode("rental")}
              className={`relative z-10 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 active:scale-95 hover:-translate-y-px ${
                mode === "rental"
                  ? "text-white scale-105 drop-shadow-[0_0_6px_rgba(198,162,90,0.8)] group-hover:drop-shadow-[0_0_10px_rgba(198,162,90,0.9)]"
                  : "text-black/70 hover:text-black hover:scale-105"
              }`}
            >
              Trailer Rental
            </button>
          </div>
        </div>
        {isRental && (
          <p className="text-center text-sm mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/80 border border-[#c6a25a]/30 border-l-4 border-l-[#c6a25a] text-[#9C7A2C] font-semibold animate-[fadeIn_0.4s_ease-out] shadow-[0_0_8px_rgba(198,162,90,0.15)]">
            <span className="animate-pulse">✨</span>
            <span>
              Prefer a stress-free experience? Switch to Full Service and we’ll handle everything for you.
            </span>
          </p>
        )}
      </div>

      {/* Booking Form */}
      <div className="max-w-3xl mx-auto mt-16 mb-20 bg-white text-black p-12 rounded-2xl shadow-2xl">

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-1">Simple Event Pricing</h2>

<p className="text-gray-600 text-sm">
  Base event service starts at $900. Trailer rental starts at $600.
  Customize your event below and see pricing update instantly.
</p>

<p className="text-xs text-[#8a6a1f] mt-2 font-medium">
  Staffing is automatically recommended based on guest count to ensure fast service and no long lines.
</p>
          {/* Progress + Personalization */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>{name ? `Planning for ${name.split(" ")[0]}` : "Start your event plan"}</span>
              <span>{Math.round(completion * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-[#c6a25a] to-yellow-400 transition-all duration-500"
                style={{ width: `${completion * 100}%` }}
              />
            </div>
          </div>
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
        {!isRental && (
          <div className="col-span-1 md:col-span-2 mt-6">

  <h2 className="text-2xl font-semibold mb-2">
    {isRental ? "Full Service Packages (Disabled for Rental)" : "Choose Your Experience"}
  </h2>
  <p className="text-sm text-gray-600 mb-4">
    Start with a curated package or customize your own below.
  </p>

  <div className="grid md:grid-cols-3 gap-4">

    {/* Essentials */}
    <button
      type="button"
      onClick={() => applyTier("essentials")}
      className={`p-5 rounded-xl border text-left transition transform duration-300 ${
  tier === "essentials"
    ? "border-black bg-black text-white scale-105 shadow-2xl ring-2 ring-yellow-400"
    : "bg-white hover:border-black hover:scale-[1.02] hover:shadow-xl"
}`}
    >
      <h3 className="font-semibold mb-1">The Taste</h3>
      <p className="text-xs opacity-70">Mobile bar starter experience</p>
      <p className="text-sm mt-3">Impressive</p>
      <ul className="mt-3 text-xs space-y-1 opacity-80">
        <li>✔ 1 professional bartender</li>
        <li>✔ 3 hour service</li>
        <li>✔ Basic setup</li>
        <li className={`transition-all duration-300 ${tier !== "essentials" ? "text-yellow-600 font-semibold" : ""} ${highlightKeys.has("cocktails") ? "bg-yellow-100 rounded px-1" : ""}`}>
  ✔ Signature cocktails
</li>

<li className={`transition-all duration-300 ${tier !== "essentials" ? "text-yellow-600 font-semibold" : ""} ${highlightKeys.has("garnishes") ? "bg-yellow-100 rounded px-1" : ""}`}>
  ✔ Premium garnishes
</li>
      </ul>
    </button>

    {/* Signature */}
    <button
      type="button"
      onClick={() => applyTier("signature")}
      className={`p-5 rounded-xl border text-left transition transform duration-300 ${
  tier === "signature"
    ? "border-black bg-black text-white scale-105 shadow-2xl ring-2 ring-yellow-400"
    : "bg-white hover:border-black hover:scale-[1.02] hover:shadow-xl"
}`}
    >
      <h3 className="font-semibold mb-1">The Tipsy</h3>
      <p className="text-xs opacity-70">Most popular experience</p>
      <p className="text-sm mt-3">Best value</p>
      <div className="mt-3 flex items-center gap-2">
        <span className="text-[10px] bg-[#c6a25a] text-white px-2 py-0.5 rounded-full uppercase tracking-wide">Most Popular</span>
      </div>
      <ul className="mt-2 text-xs space-y-1 opacity-90">
        <li>✔ 2 professional bartenders</li>
        <li>✔ 4 hour service</li>
        <li className={`transition-all duration-300 ${tier !== "essentials" ? "text-yellow-600 font-semibold" : ""}`}>✔ Signature cocktails</li>
        <li className={`transition-all duration-300 ${tier !== "essentials" ? "text-yellow-600 font-semibold" : ""}`}>✔ Premium garnishes</li>
      </ul>
    </button>

    {/* Premium */}
    <button
      type="button"
      onClick={() => applyTier("premium")}
      className={`p-5 rounded-xl border text-left transition transform duration-300 ${
  tier === "premium"
    ? "border-black bg-black text-white scale-105 shadow-2xl ring-2 ring-yellow-400"
    : "bg-white hover:border-black hover:scale-[1.02] hover:shadow-xl"
}`}
    >
      <h3 className="font-semibold mb-1">The Toasted</h3>
      <p className="text-xs opacity-70">Premium full-service experience</p>
      <p className="text-sm mt-3">Elevated events</p>
      <ul className="mt-3 text-xs space-y-1 opacity-90">
        <li className={`transition-all duration-300 ${tier === "premium" ? "text-yellow-600 font-semibold" : ""} ${highlightKeys.has("bartender3") ? "bg-yellow-100 rounded px-1" : ""}`}>
  ✔ 3+ professional bartenders
</li>

<li className={`transition-all duration-300 ${tier === "premium" ? "text-yellow-600 font-semibold" : ""} ${highlightKeys.has("hours5") ? "bg-yellow-100 rounded px-1" : ""}`}>
  ✔ 5 hour service
</li>

<li className={`transition-all duration-300 ${tier === "premium" ? "text-yellow-600 font-semibold" : ""} ${highlightKeys.has("full") ? "bg-yellow-100 rounded px-1" : ""}`}>
  ✔ Full cocktail experience
</li>

<li className={`transition-all duration-300 ${tier === "premium" ? "text-yellow-600 font-semibold" : ""} ${highlightKeys.has("garnishes") ? "bg-yellow-100 rounded px-1" : ""}`}>
  ✔ Premium garnishes
</li>

<li className={`transition-all duration-300 ${tier === "premium" ? "text-yellow-600 font-semibold" : ""} ${highlightKeys.has("setup") ? "bg-yellow-100 rounded px-1" : ""}`}>
  ✔ Extended setup time
</li>
      </ul>
    </button>

  </div>
          </div>
        )}
          {isRental && (
            <div className="col-span-1 md:col-span-2 mb-6 rounded-2xl overflow-hidden border border-[#c6a25a]/40 shadow-2xl animate-[fadeIn_0.4s_ease-out]">

              {/* Image Header */}
              <div
                className="h-48 md:h-64 bg-cover bg-center relative"
                style={{ backgroundImage: "url('/trailer-wedding.jpg')" }}
              >
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4">
                  <span className="text-[10px] bg-[#c6a25a] text-black px-2 py-0.5 rounded-full uppercase tracking-wide mb-2">
                    Viral Favorite
                  </span>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-wide">
                    Tap Trailer Experience
                  </h3>
                  <p className="text-xs text-white/80 mt-1">
                    The centerpiece your guests will photograph all night
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="bg-black text-white p-6 text-center">

                <p className="text-sm text-white/80 max-w-xl mx-auto">
                  A fully designed, event-ready mobile bar that transforms your event into a high-end experience — no staffing required.
                </p>

                {/* Social Proof */}
                <p className="text-xs text-[#c6a25a] mt-4 font-semibold">
                  Used by weddings, influencers, and luxury backyard events
                </p>

                {/* Features */}
                <div className="mt-4 text-xs text-white/70 space-y-1">
                  <p>✔ Instagram-worthy tap trailer setup</p>
                  <p>✔ Custom signage + premium visual styling</p>
                  <p>✔ Effortless guest experience</p>
                </div>

                {/* CTA */}
                <p className="mt-5 text-xs text-white/60">
                  Pair with add-ons below to elevate your experience
                </p>

              </div>

            </div>
          )}
          {/* Planner Instructions */}
          <div className="col-span-1 md:col-span-2 mt-4 mb-2">
            <h2 className="text-2xl font-semibold mb-1">Customize Your Event</h2>
            {isRental && (
  <p className="text-gray-600 text-sm">
    Select add-ons below to personalize your trailer experience.
  </p>
)}
            {/* 🔥 AI Recommendation Banner */}
            {!isRental && eventType && guests > 0 && (
              <div className="mt-4 p-4 rounded-xl bg-black text-white shadow-md border border-[#c6a25a]/30 animate-[fadeIn_0.4s_ease-out]">
                <p className="text-xs uppercase tracking-widest text-[#c6a25a] mb-1">
                  Smart Recommendation
                </p>
                <p className="text-sm font-semibold">
                  {eventType === "Wedding" && (
                    <>For weddings with {guests} guests, most clients choose Signature or Premium for smoother service and elevated presentation.</>
                  )}
                  {eventType === "Corporate Event" && (
                    <>Corporate events with {guests}+ guests benefit from additional bartenders to reduce wait times and keep service efficient.</>
                  )}
                  {(eventType === "Private Party" || eventType === "Birthday") && (
                    <>For parties of {guests}, adding premium garnishes and cocktails creates a more memorable guest experience.</>
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (eventType === "Wedding") applyTier("signature")
                    if (eventType === "Corporate Event") setBartenders(getRecommendedBartenders(guests) + 1)
                    if (eventType === "Private Party" || eventType === "Birthday") {
                      setSelectedUpgrades(prev => ({ ...prev, garnishes: true, cocktails: true }))
                    }
                  }}
                  className="mt-3 text-xs text-[#c6a25a] underline hover:text-white hover:scale-105 active:scale-95 transition-transform"
                >
                  Apply recommendation →
                </button>
              </div>
            )}
          </div>

          {!isRental && (
            <div>
              <label className="text-sm">Hours: {hours}</label>
              <input
                className="w-full"
                type="range"
                min={1}
                max={10}
                value={hours}
                onChange={(e)=>{
                  setHours(Number(e.target.value))
                  setTier("custom")
                }}
              />
            </div>
          )}

          {!isRental && (
            <div className={`transition-all duration-300 ${bartenders < recommendedBartenders ? "ring-1 ring-[#c6a25a]/40 rounded-lg p-2" : ""}`}>
              <label className="text-sm">
                Bartenders: {bartenders}
                <span className="text-xs text-gray-500 ml-2">
  (recommended: {recommendedBartenders} based on {guests} guests)
</span>
<span className="ml-1 text-gray-400 cursor-help" title="We recommend 1 bartender per ~50 guests to keep lines short and service fast.">
  ⓘ
</span>
                {bartenders < recommendedBartenders && (
                  <span className="ml-2 inline-flex items-center gap-2">
                    <span className="text-[10px] text-[#c6a25a] font-semibold">
                      ⚠ Consider adding staff for faster service (avoid long lines)
                    </span>
                    <button
                      type="button"
                      onClick={() => setBartenders(recommendedBartenders)}
                      className="text-[10px] underline text-[#c6a25a] hover:text-black transition"
                    >
                      Apply recommendation
                    </button>
                  </span>
                )}
              </label>
              <input
                className="w-full"
                type="range"
                min={1}
                max={5}
                value={bartenders}
                onChange={(e)=>{
  setBartenders(Number(e.target.value))
  setTier("custom")
}}
              />
            </div>
          )}

          {!isRental && (
            <div>
              Guest Count: {guests}
<span className="text-xs text-gray-500 ml-2">(approximate)</span>
              {guests > 0 && (
                <>
                  <p className="text-xs text-[#c6a25a] mt-2">
                    Based on {guests} guests, we recommend {recommendedBartenders} bartender{recommendedBartenders > 1 ? "s" : ""} for smooth service.
                  </p>

                  {bartenders === recommendedBartenders && (
                    <p className="text-xs text-green-600 mt-1 font-medium animate-[fadeIn_0.3s_ease-out]">
                      ✔ Perfect staffing level for smooth service
                    </p>
                  )}
                </>
              )}
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
                  setTier("custom")

                  const recommended = getRecommendedBartenders(value)

                  if (!isRental) {
  setBartenders(recommended)
}
                }}
              />
            </div>
          )}

        </div>


  <div className={`mt-10 p-8 rounded-2xl bg-linear-to-br from-[#f8f5ef] to-[#ffffff] border border-black/10 shadow-xl transition-all duration-500 ${
    isRental ? "ring-2 ring-[#c6a25a]/40 scale-[1.01]" : ""
  }`}>

    <div className="flex items-center justify-between mb-6">
      <h3 className="text-2xl font-semibold tracking-wide">Add-Ons</h3>
      <span className="text-xs uppercase tracking-widest text-gray-500">Enhance Your Event</span>
    </div>

    <div className="space-y-6">

      {isRental && (
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">Rental Add-Ons</p>
          <p className="text-xs text-gray-500 mb-3">
            Delivery available within 40 miles of Golden — designed for seamless DIY events.
          </p>

          <div className="space-y-3">

            <label className="flex items-center justify-between p-3 rounded-lg hover:bg-black/5 transition">
              <div className="flex items-center gap-2">
                <span>🚚 Delivery & Pickup (within 40 miles of Golden)</span>
                <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full uppercase tracking-wide">Popular</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium w-24 text-right">$150</span>
                <input
                  type="checkbox"
                  onChange={() => setSelectedUpgrades(prev => ({ ...prev, setupHour: !prev.setupHour }))}
                />
              </div>
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg hover:bg-black/5 transition">
              <div className="flex items-center gap-2">
                <span>🧼 Cleaning Service</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium w-24 text-right">$75</span>
                <input
                  type="checkbox"
                  onChange={() => setSelectedUpgrades(prev => ({ ...prev, garnishes: !prev.garnishes }))}
                />
              </div>
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg hover:bg-black/5 transition">
              <div className="flex items-center gap-2">
                <span>🧊 Ice & Cooler Package</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium w-24 text-right">$50</span>
                <input
                  type="checkbox"
                  onChange={() => setSelectedUpgrades(prev => ({ ...prev, cocktails: !prev.cocktails }))}
                />
              </div>
            </label>

          </div>
        </div>
      )}

      {/* Service Enhancements */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">Service Enhancements</p>

        <div className="space-y-3">

          <label className="flex items-center justify-between p-3 rounded-lg hover:bg-black/5 transition">
            <div className="flex items-center gap-2">
              <span>👨‍🍳 Additional Bartender</span>
              <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full uppercase tracking-wide">Popular</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-24 text-right">$60 / hour</span>
              <input
                type="checkbox"
                onChange={() => setBartenders(prev => Math.min(prev + 1, 5))}
              />
            </div>
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg hover:bg-black/5 transition">
            <div className="flex items-center gap-2">
              <span>🍸 Cocktail / Mocktail Additions</span>
              <span className="text-[10px] bg-[#c6a25a] text-white px-2 py-0.5 rounded-full uppercase tracking-wide">High Impact</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-24 text-right">$125 / tap</span>
              <input
                type="checkbox"
                onChange={() => setSelectedUpgrades(prev => ({ ...prev, cocktails: true }))}
              />
            </div>
          </label>

        </div>
      </div>

      {/* Experience Upgrades */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">Experience Upgrades</p>

        <div className="space-y-3">

          <label className="flex items-center justify-between p-3 rounded-lg hover:bg-black/5 transition">
            <div className="flex items-center gap-2">
              <span>✨ Premium Garnishes Package</span>
              <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full uppercase tracking-wide">Luxury</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-24 text-right">$75</span>
              <input
                type="checkbox"
                checked={selectedUpgrades.garnishes}
                onChange={() => setSelectedUpgrades(prev => ({ ...prev, garnishes: !prev.garnishes }))}
              />
            </div>
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg hover:bg-black/5 transition">
            <div className="flex items-center gap-2">
              <span>🍹 Signature Cocktail Menu</span>
              <span className="text-[10px] bg-[#c6a25a] text-white px-2 py-0.5 rounded-full uppercase tracking-wide">Upgrade</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-24 text-right">$100</span>
              <input
                type="checkbox"
                checked={selectedUpgrades.cocktails}
                onChange={() => setSelectedUpgrades(prev => ({ ...prev, cocktails: !prev.cocktails }))}
              />
            </div>
          </label>

        </div>
      </div>

      {/* Travel */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">Travel</p>

        <div className="space-y-3">

          <div className="flex items-center justify-between p-3 rounded-lg bg-black/5">
            <span>🚗 Travel Fee (40+ miles from 80401)</span>
            <span className="text-sm font-medium">$2 / mile</span>
          </div>

        </div>
      </div>

    </div>

    <p className="text-xs text-gray-500 mt-6 text-center">
      Custom packages available — we’ll tailor everything to your event.
    </p>

  </div>

        {/* What's Included Section */}
        <div className="mt-10 border-t pt-10">

          <h2 className="text-3xl font-serif mb-6 text-center tracking-wide">
            Standard With Every Booking
          </h2>

          {/* Planning & Prep */}
          <div className="text-center mb-8">
            <p className="font-semibold text-lg mb-2 underline">Planning & Preparation</p>
            <p className="text-sm text-gray-700">Two Consultations: Initial vision + final execution call</p>
            <p className="text-sm text-gray-700">Custom Shopping Guide: Exactly what to buy and how much</p>
            <p className="text-sm text-gray-700">Travel Included: Up to 40 miles from 80401</p>
            <p className="text-sm text-gray-700">Fully Insured: General & Liquor Liability coverage</p>
          </div>

          {/* Essentials */}
          <div className="text-center">
            <p className="font-semibold text-lg mb-2 underline">The Essentials</p>
            <p className="text-sm text-gray-700">Clear cups, napkins</p>
            <p className="text-sm text-gray-700">Personalized bar menu + trailer signage</p>
          </div>

        </div>

        <div className="mt-8 bg-gray-50 p-6 rounded-xl border md:sticky md:top-24 shadow-lg">

          <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>

          <div className="flex justify-between text-sm mb-2">
            <span>Booking Type</span>
            <span className="font-semibold">
              {isRental ? "Trailer Rental Experience" : "Full Service Experience"}
            </span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Event Type</span>
            <span>{eventType}</span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Guests</span>
            <span>{guests}</span>
          </div>

          {!isRental && (
            <div className="flex justify-between text-sm mb-2">
              <span>Bartenders</span>
              <span>{bartenders}</span>
            </div>
          )}

          <div className="flex justify-between text-sm mb-2">
            <span>Hours</span>
            <span>{hours}</span>
          </div>

          {tier !== "custom" && (
            <div className="flex justify-between text-sm mb-2">
              <span>{tier.charAt(0).toUpperCase() + tier.slice(1)} Experience</span>
              <span>${tierExtra}</span>
            </div>
          )}

            <div className="border-t mt-4 pt-4 space-y-2">

            <div className="flex justify-between">
              <span>{isRental ? "Trailer Rental" : "Base Event"}</span>
              <span>${basePrice}</span>
            </div>

            {/* Hide Staffing for rental */}
            {!isRental && (
              <div className="flex justify-between">
                <span>Staffing</span>
                <span>{new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(bartenders * 40 * hours)}</span>
              </div>
            )}

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
            {isRental && (
              <>
                <p className="text-xs text-gray-500 mt-1">
                  Premium trailer rental experience — includes equipment setup guidance. Delivery available within 40 miles of Golden.
                </p>
                <p className="text-xs text-[#c6a25a] font-semibold mt-2">
                  Perfect for backyard parties, DIY weddings, & private events
                </p>
              </>
            )}

          </div>

        </div>
            <p className="text-sm text-[#c6a25a] font-semibold mb-3 text-center">
  Most weekends book 2–4 weeks in advance — secure your date early
</p>

<p className="text-xs text-gray-500 mb-4 text-center">
  ✔ 50% deposit to reserve  ✔ Secure checkout  ✔ Instant confirmation
</p>
  <div className={`mt-6 bg-black text-white p-5 rounded-xl text-center shadow-lg border border-white/10 transition-all duration-500 ${
    isRental ? "ring-2 ring-[#c6a25a]/50" : ""
  }`}>
    <p className="text-sm opacity-70">Estimated Total</p>

    <div
      className={`flex items-center justify-center gap-2 mt-1 transition-all duration-300 ${delta !== 0 ? 'animate-pulse' : ''}`}
    >
      <p
        className={`text-3xl font-bold transition-all duration-300 ${delta !== 0 ? 'scale-110 drop-shadow-[0_0_12px_rgba(255,215,0,0.7)]' : 'scale-100'}`}
      >
        {new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(grandTotal)}
      </p>
      {delta !== 0 && (
        <span className={`text-sm font-semibold animate-pulse ${delta > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {delta > 0 ? `+${new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(delta)}` : new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(delta)}
        </span>
      )}
    </div>

  <p className="text-sm text-green-400 font-semibold mt-2">
    ${deposit} due today
  </p>

  <p className="text-xs opacity-60 mt-1">
    Remaining balance charged 10 days before event
  </p>
      <p className="text-xs text-white/70 mt-2">
    ✔ Fully Insured (General + Liquor Liability)
  </p>
  {!isRental ? (
  <p className="text-xs text-white/70 mt-2">
    Optimized for {guests} guests • {bartenders} bartenders • {hours} hours
  </p>
) : (
  <p className="text-xs text-white/60 mt-2 text-center">
    Add bartenders below if you want full-service support
  </p>
)}
</div>

{/* Human CTA */}
<div className="mt-6 p-5 rounded-xl border border-black/10 bg-[#f8f5ef] text-center shadow-sm">
  <p className="text-sm text-gray-700">
    Prefer to talk it through first?
  </p>
  <p className="text-lg font-semibold mt-1">
    Call or Text Jen — <a href="tel:7206439690" className="underline hover:text-black">720-643-9690</a>
  </p>
  <p className="text-xs text-gray-500 mt-1">
    We&apos;ll walk you through everything and build the perfect event together.
  </p>
</div>

<p className="text-[10px] text-gray-500 mb-4 text-center">
  By booking, you agree to our{" "}
  <a href="/legal/terms" className="underline hover:text-black">Terms</a>,{" "}
  <a href="/legal/refund-policy" className="underline hover:text-black">Refund Policy</a>, and{" "}
  <a href="/legal/privacy" className="underline hover:text-black">Privacy Policy</a>.
</p>

<div className="mt-4 mb-2 p-4 rounded-xl bg-[#f8f5ef] border border-black/10 text-center">
  <p className="text-sm font-semibold text-black">
    Secure your date in under 2 minutes
  </p>
  <p className="text-xs text-gray-600 mt-1">
    ✔ Instant confirmation &nbsp;&nbsp;✔ No hidden fees &nbsp;&nbsp;✔ Fully insured & venue-ready
  </p>
</div>

        {saved && (
          <p className="text-center text-xs text-green-600 mb-2 animate-fade-in">
            ✔ Quote saved
          </p>
        )}
        <button
          onClick={handleBooking}
          disabled={submitting}
          className={`mt-4 w-full py-5 text-lg rounded-xl transition-transform font-semibold shadow-lg ${submitting ? 'bg-gray-300 text-gray-600' : 'bg-linear-to-r from-yellow-400 to-yellow-500 text-black hover:scale-[1.02] active:scale-[0.99] hover:shadow-[0_0_20px_rgba(255,215,0,0.6)]'}`}
        >
          {submitting 
  ? 'Processing…' 
  : `Reserve Your Date — $${deposit} Today`}
        </button>

        <p className="text-xs text-center text-gray-600 mt-3">
          ⚡ Dates fill quickly — secure now with a 50% deposit
        </p>
        <p className="text-xs text-center text-gray-500 mt-1">
          Need help first? Call or text Jen anytime
        </p>

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