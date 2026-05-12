"use client"

import { useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"
import Link from "next/link"

function UpgradePageContent() {
  const searchParams = useSearchParams()
  const rawEventId = searchParams.get("eventId")

  // Normalize eventId (handles legacy numeric IDs and UUIDs)
  const eventId =
    rawEventId && rawEventId !== "undefined" && rawEventId !== "null"
      ? rawEventId
      : null

  const [loading, setLoading] = useState<string | null>(null)

  const handleUpgrade = async (upgradeType: string) => {
    if (!eventId) {
      console.error("❌ Missing eventId from URL")
      alert("Something went wrong — please return to your booking link.")
      return
    }

    setLoading(upgradeType)

    try {
      console.log("🚀 UPGRADE REQUEST:", { eventId, upgradeType })
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
      console.log("📦 UPGRADE RESPONSE:", data)

      if (data?.url) {
        window.location.href = data.url
      } else {
        console.error("❌ No checkout URL returned", data)
        alert("Unable to start checkout. Please try again.")
      }
    } catch (err) {
      console.error("❌ Upgrade error:", err)
      alert("Something went wrong — please try again.")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      <div className="max-w-md w-full text-center">

        <h1 className="text-4xl font-bold mb-4">
          Elevate Your Event ✨
        </h1>

        <p className="mb-6 text-gray-400">
          Most clients upgrade their experience — choose an option below to make your event unforgettable.
        </p>

        <div className="space-y-4">

          <button
            onClick={() => handleUpgrade("extra_hour")}
            className="w-full border border-white p-4 rounded-xl hover:bg-white hover:text-black transition text-left"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">Extra Hour of Service</span>
              <span>{loading === "extra_hour" ? "Loading..." : "$100"}</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Keep the party going longer</p>
          </button>

          <button
            onClick={() => handleUpgrade("premium_drinks")}
            className="w-full border border-yellow-400 p-4 rounded-xl hover:bg-yellow-400 hover:text-black transition text-left"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">Premium Bar Experience</span>
              <span>{loading === "premium_drinks" ? "Loading..." : "$150"}</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Top-tier presentation + elevated feel</p>
          </button>

          <button
            onClick={() => handleUpgrade("extra_bartender")}
            className="w-full border border-white p-4 rounded-xl hover:bg-white hover:text-black transition text-left"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">Additional Bartender</span>
              <span>{loading === "extra_bartender" ? "Loading..." : "$200"}</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Faster service for larger groups</p>
          </button>

        </div>

        <p className="text-xs text-gray-500 mt-6">
          Secure checkout powered by Stripe 🔒
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="text-gray-500 underline hover:text-white"
          >
            Back to Home
          </Link>
        </div>

      </div>

    </div>
  )
}

export default function UpgradePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <UpgradePageContent />
    </Suspense>
  )
}