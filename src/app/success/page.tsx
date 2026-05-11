"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function SuccessPage() {
  const searchParams = useSearchParams()

  const isUpgrade = searchParams.get("upgrade") === "true"
  const eventId = searchParams.get("event_id")

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: "sans-serif"
      }}
    >
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
        {isUpgrade ? "✨ Upgrade Successful!" : "🎉 Booking Confirmed!"}
      </h1>

      {isUpgrade ? (
        <p style={{ fontSize: "18px", marginBottom: "10px", textAlign: "center" }}>
          Your upgrade has been added to your event.
          <br />
          Everything is updated on our end — you&apos;re all set 🍸
        </p>
      ) : (
        <p style={{ fontSize: "18px", marginBottom: "10px" }}>
          Your Tap & Toast event deposit has been received.
        </p>
      )}

      {!isUpgrade && (
        <p style={{ opacity: 0.7 }}>
          A confirmation email will be sent shortly.
        </p>
      )}

      {!isUpgrade && eventId && (
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

      {eventId && (
        <p style={{ marginTop: "10px", fontSize: "12px", opacity: 0.5 }}>
          Event ID: {eventId}
        </p>
      )}

      <div style={{ display: "flex", gap: "12px", marginTop: "30px" }}>
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

        {isUpgrade && eventId && (
          <Link
            href={`/upgrade?eventId=${eventId}`}
            style={{
              border: "1px solid white",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              color: "white",
              fontWeight: "bold"
            }}
          >
            Add Another Upgrade
          </Link>
        )}
      </div>
    </div>
  )
}