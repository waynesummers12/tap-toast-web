import Link from "next/link"

export default function SuccessPage() {
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
        🎉 Booking Confirmed!
      </h1>

      <p style={{ fontSize: "18px", marginBottom: "10px" }}>
        Your Tap & Toast event deposit has been received.
      </p>

      <p style={{ opacity: 0.7 }}>
        A confirmation email will be sent shortly.
      </p>

      <Link
        href="/"
        style={{
          marginTop: "30px",
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
  )
}