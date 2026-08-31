import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

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

    const { data: quote, error } = await supabase
      .from("quotes")
      .select("*")
      .eq("cid", cid)
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