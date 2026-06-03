import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const body = await req.text()

    const event = JSON.parse(body)

    // ⚠️ For now (no signature validation yet)
    if (event.type === "checkout.session.completed") {
      const session = event.data.object

      const cid = session.metadata?.cid

      if (cid) {
        await supabase
          .from("quotes")
          .update({
            status: "converted",
            converted: true,
            converted_at: new Date().toISOString()
          })
          .eq("id", cid)

        console.log("✅ Converted quote:", cid)
      }
    }

    return NextResponse.json({ received: true })

  } catch (err) {
    console.error("Webhook error:", err)

    return NextResponse.json(
      { error: "Webhook failed" },
      { status: 500 }
    )
  }
}