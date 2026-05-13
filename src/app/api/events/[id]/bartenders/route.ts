import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: eventId } = await context.params

  const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://tap-toast-api-cayk.onrender.com"

  try {
    const res = await fetch(`${API}/api/events/${eventId}/bartenders`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    })

    if (!res.ok) {
      console.error("Bartender GET failed:", res.status)
      return NextResponse.json(
        { event_id: eventId, bartenders: [] },
        { status: 200 }
      )
    }

    const data = await res.json()

    return NextResponse.json(data)
  } catch (err) {
    console.error("Bartender proxy error:", err)

    return NextResponse.json(
      { event_id: eventId, bartenders: [] },
      { status: 200 }
    )
  }
}