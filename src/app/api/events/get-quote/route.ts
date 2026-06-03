import { NextRequest, NextResponse } from "next/server"

// 🔥 Properly type global storage (temporary until Supabase)
declare global {
  var quotes: Record<string, unknown> | undefined
}

const quotes: Record<string, unknown> = globalThis.quotes ?? {}
globalThis.quotes = quotes

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const cid = searchParams.get("cid")

    if (!cid) {
      return NextResponse.json(
        { error: "Missing cid" },
        { status: 400 }
      )
    }

    const quote = quotes[cid]

    if (!quote) {
      return NextResponse.json(
        { error: "Quote not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(quote)

  } catch (err) {
    console.error("Get quote error:", err)

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}