import { NextResponse } from "next/server"

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/events`,
      {
        cache: "no-store",
      }
    )

    const data = await res.json()

    // DO NOT modify IDs — pass through exactly as backend returns
    return NextResponse.json(data)

  } catch (err) {
    console.error("Events API failed", err)
    return NextResponse.json([], { status: 500 })
  }
}