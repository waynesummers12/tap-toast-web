"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const API_URL = "https://tap-toast-api-cayk.onrender.com"
const BOOKING_CID_KEY = "tap_toast_booking_cid"
const MAX_ATTEMPTS = 9
const RETRY_DELAY_MS = 1500

type VerificationState = "verifying" | "verified" | "unverified"

export default function DepositSuccess({
  eventId,
  paymentType
}: {
  eventId?: string
  paymentType: "deposit" | "balance"
}) {
  const [state, setState] = useState<VerificationState>(
    eventId ? "verifying" : "unverified"
  )

  useEffect(() => {
    if (!eventId) return

    let cancelled = false
    let attempts = 0
    let retryTimer: ReturnType<typeof setTimeout> | undefined

    const verifyDeposit = async () => {
      attempts += 1

      try {
        const response = await fetch(
          `${API_URL}/api/events/${encodeURIComponent(eventId)}/payment-status?type=${paymentType}`,
          { cache: "no-store" }
        )
        const result = await response.json()

        if (cancelled) return
        if (response.ok && result?.payment_confirmed === true) {
          if (paymentType === "deposit") {
            localStorage.removeItem(BOOKING_CID_KEY)
          }
          setState("verified")
          return
        }
      } catch (error) {
        console.error("Payment verification failed", error)
      }

      if (cancelled) return
      if (attempts < MAX_ATTEMPTS) {
        retryTimer = setTimeout(verifyDeposit, RETRY_DELAY_MS)
      } else {
        setState("unverified")
      }
    }

    void verifyDeposit()

    return () => {
      cancelled = true
      if (retryTimer) clearTimeout(retryTimer)
    }
  }, [eventId, paymentType])

  if (state === "verifying") {
    return (
      <>
        <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
          Confirming your payment…
        </h1>
        <p style={{ fontSize: "18px", opacity: 0.7 }}>
          This may take a few moments. Please keep this page open.
        </p>
      </>
    )
  }

  if (state === "unverified") {
    return (
      <>
        <h1 style={{ fontSize: "32px", marginBottom: "20px", textAlign: "center" }}>
          We’re still confirming your payment
        </h1>
        <p style={{ fontSize: "18px", opacity: 0.7, textAlign: "center", maxWidth: "560px" }}>
          Please wait a moment and refresh this page. Your booking is not shown as confirmed until payment processing is complete.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            marginTop: "30px",
            background: "white",
            color: "black",
            border: 0,
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Refresh Status
        </button>
      </>
    )
  }

  return (
    <>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
        {paymentType === "deposit" ? "🎉 Booking Confirmed!" : "✅ Payment Complete!"}
      </h1>
      <p style={{ fontSize: "18px", marginBottom: "10px" }}>
        {paymentType === "deposit"
          ? "Your Tap & Toast event deposit has been received."
          : "Your Tap & Toast event balance has been received."}
      </p>
      <p style={{ opacity: 0.7 }}>A confirmation email will be sent shortly.</p>
      {paymentType === "deposit" && eventId && (
        <div style={{ marginTop: "20px" }}>
          <Link
            href={`/upgrade?eventId=${eventId}`}
            style={{
              background: "#facc15",
              color: "black",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: "bold",
              textDecoration: "none"
            }}
          >
            ✨ Upgrade Your Event Experience
          </Link>
        </div>
      )}
      <p style={{ marginTop: "10px", fontSize: "12px", opacity: 0.5 }}>
        Event ID: {eventId}
      </p>
      <div style={{ marginTop: "30px" }}>
        <Link
          href="/"
          style={{
            background: "#22c55e",
            padding: "12px 24px",
            borderRadius: "8px",
            textDecoration: "none",
            color: "black",
            fontWeight: "bold"
          }}
        >
          Back to Home
        </Link>
      </div>
    </>
  )
}