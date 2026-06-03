import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia"
})

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const sig = req.headers.get("stripe-signature")

    if (!sig) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

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