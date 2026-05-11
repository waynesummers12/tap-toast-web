"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export default function UpgradePage() {
  const searchParams = useSearchParams()
  const eventId = searchParams.get("eventId")

  const [loading, setLoading] = useState<string | null>(null)

  const handleUpgrade = async (upgradeType: string) => {
    if (!eventId) {
      alert("Missing event ID")
      return
    }

    setLoading(upgradeType)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upgrade`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          upgradeType,
        }),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Failed to create checkout session")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Upgrade Your Event 🍸
      </h1>

      <p className="mb-8 text-center max-w-md text-gray-300">
        Choose an upgrade to enhance your experience.
      </p>

      <div className="space-y-4 w-full max-w-sm">

        <button
          onClick={() => handleUpgrade("extra_hour")}
          className="w-full bg-white text-black py-3 rounded font-semibold hover:bg-gray-200 transition"
        >
          {loading === "extra_hour" ? "Loading..." : "Add Extra Hour — $100"}
        </button>

        <button
          onClick={() => handleUpgrade("premium_drinks")}
          className="w-full bg-white text-black py-3 rounded font-semibold hover:bg-gray-200 transition"
        >
          {loading === "premium_drinks" ? "Loading..." : "Premium Bar Setup — $150"}
        </button>

        <button
          onClick={() => handleUpgrade("extra_bartender")}
          className="w-full bg-white text-black py-3 rounded font-semibold hover:bg-gray-200 transition"
        >
          {loading === "extra_bartender" ? "Loading..." : "Additional Bartender — $200"}
        </button>

      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="text-gray-400 underline hover:text-white"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}