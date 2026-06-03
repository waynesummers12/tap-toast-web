import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

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

    const { error } = await supabase
      .from("quotes")
      .upsert({
        ...quote
      })

    if (error) {
      console.error("Supabase insert error:", error)

      return NextResponse.json(
        { error: "Failed to save quote" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, cid: quote.id })
  } catch (err) {
    console.error("Save quote error:", err)

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}