import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isStringInRange(value: unknown, min: number, max: number): value is string {
  return typeof value === "string" && value.trim().length >= min && value.trim().length <= max
}

function isIntegerInRange(value: unknown, min: number, max: number): boolean {
  return Number.isInteger(value) && Number(value) >= min && Number(value) <= max
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      cid,
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

    const validUpgrades = Array.isArray(upgrades) && upgrades.length <= 20 &&
      upgrades.every((value) => isStringInRange(value, 1, 50))
    const validPayload =
      typeof cid === "string" && UUID_PATTERN.test(cid) &&
      isStringInRange(name, 1, 100) &&
      isStringInRange(email, 3, 254) && EMAIL_PATTERN.test(email) &&
      (phone === undefined || phone === null || isStringInRange(phone, 0, 30)) &&
      isStringInRange(location, 1, 300) &&
      typeof event_date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(event_date) &&
      typeof start_time === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(start_time) &&
      isIntegerInRange(hours, 1, 10) &&
      isIntegerInRange(guests, 1, 300) &&
      isIntegerInRange(bartenders, 0, 5) &&
      (event_type === undefined || event_type === null || isStringInRange(event_type, 0, 100)) &&
      validUpgrades &&
      Number.isFinite(estimated_total) && estimated_total >= 0 && estimated_total <= 1000000 &&
      Number.isFinite(deposit) && deposit >= 0 && deposit <= 1000000

    if (!validPayload) {
      return NextResponse.json(
        { error: "Invalid quote payload" },
        { status: 400 }
      )
    }

    const { data: existingQuote, error: lookupError } = await supabase
      .from("quotes")
      .select("status,converted,email")
      .eq("cid", cid)
      .maybeSingle()

    if (lookupError) {
      console.error("Quote lookup failed")
      return NextResponse.json({ error: "Failed to save quote" }, { status: 500 })
    }

    if (existingQuote?.converted === true || existingQuote?.status === "converted") {
      return NextResponse.json({ success: true, cid, converted: true })
    }

    if (existingQuote?.email && existingQuote.email.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json({ error: "Quote email cannot be changed" }, { status: 409 })
    }

    const quote = {
      cid,
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
      status: "pending",
      updated_at: new Date().toISOString(),
    }

    const { error } = await supabase
      .from("quotes")
      .upsert({
        ...quote
      }, { onConflict: "cid" })

    if (error) {
      console.error("Supabase insert error:", error)

      return NextResponse.json(
        { error: "Failed to save quote" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, cid })
  } catch (err) {
    console.error("Save quote error:", err)

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}