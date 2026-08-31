import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const RECOVERY_FIELDS = "cid,name,email,phone,location,event_date,start_time,hours,guests,bartenders,event_type,upgrades"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const cid = searchParams.get("cid")

    if (!cid || !UUID_PATTERN.test(cid)) {
      return NextResponse.json(
        { error: "Invalid cid" },
        { status: 400 }
      )
    }

    const { data: quote, error } = await supabase
      .from("quotes")
      .select(RECOVERY_FIELDS)
      .eq("cid", cid)
      .in("status", ["pending", "abandoned"])
      .or("converted.is.null,converted.eq.false")
      .maybeSingle()

    if (error) {
      console.error("Get quote lookup failed")
      return NextResponse.json(
        { error: "Failed to retrieve quote" },
        { status: 500 }
      )
    }

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