import Link from "next/link"
import DepositSuccess from "./DepositSuccess"

export const dynamic = "force-dynamic"

type SuccessPageProps = {
  searchParams: Promise<{
    upgrade?: string
    event_id?: string
    payment_type?: string
  }>
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams
  const isUpgrade = params.upgrade === "true"
  const eventId = params.event_id
  const paymentType = params.payment_type === "balance" ? "balance" : "deposit"

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
      {isUpgrade ? (
        <>
          <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
            ✨ Upgrade Successful!
          </h1>
        <p style={{ fontSize: "18px", marginBottom: "10px", textAlign: "center" }}>
          Your upgrade has been added to your event.
          <br />
          Everything is updated on our end — you&apos;re all set 🍸
        </p>
        </>
      ) : (
        <DepositSuccess eventId={eventId} paymentType={paymentType} />
      )}

      {isUpgrade && eventId && (
        <p style={{ marginTop: "10px", fontSize: "12px", opacity: 0.5 }}>
          Event ID: {eventId}
        </p>
      )}

      {isUpgrade && <div style={{ display: "flex", gap: "12px", marginTop: "30px" }}>
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
      </div>}
    </div>
  )
}