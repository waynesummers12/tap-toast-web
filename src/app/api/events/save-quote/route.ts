

import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      name,
      email,
      phone,
      location,
      event_date,
      start_time,
      hours,
      guests,
      bartenders,
      event_type,
      upgrades,
      estimated_total,
      deposit
    } = body

    // Basic validation
    if (!email || !event_date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const quote = {
      id: crypto.randomUUID(),
      name: name || "",
      email,
      phone: phone || "",
      location: location || "",
      event_date,
      start_time: start_time || "",
      hours: hours || 0,
      guests: guests || 0,
      bartenders: bartenders || 0,
      event_type: event_type || "",
      upgrades: upgrades || [],
      estimated_total: estimated_total || 0,
      deposit: deposit || 0,
      status: "abandoned",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      email_sent: false
    }

    // 🔥 TEMP STORAGE (replace later with DB)
    // For now, just log so we can confirm flow works
    console.log("Saved quote:", quote)

    return NextResponse.json({ success: true, cid: quote.id })
  } catch (err) {
    console.error("Save quote error:", err)

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}