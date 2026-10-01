import DepositSuccess from "./DepositSuccess"

export const dynamic = "force-dynamic"

type SuccessPageProps = {
  searchParams: Promise<{
    session_id?: string
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
      <DepositSuccess key={`${eventId}-${isUpgrade}-${paymentType}-${params.session_id}`} eventId={eventId} paymentType={isUpgrade ? "upgrade" : paymentType} sessionId={params.session_id} />


    </div>
  )
}