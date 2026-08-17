import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia"
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log(
      "STRIPE KEY TYPE:",
      process.env.STRIPE_SECRET_KEY?.startsWith("sk_live_") ? "LIVE" : "TEST",
      "PREFIX:",
      process.env.STRIPE_SECRET_KEY?.slice(0, 8)
    )
    const { amount, email, cid, venue, package: packageKey } = body
    const mountainViewPackageNames: Record<string, string> = {
      classic: "Mountain View Menagerie — Classic Bartending Package",
      signature: "Mountain View Menagerie — Signature Bartending Package",
      "tap-toast-experience": "Mountain View Menagerie — Tap & Toast Experience"
    }
    const isMountainView = venue === "mountain-view"
    const productName = isMountainView && mountainViewPackageNames[packageKey]
      ? mountainViewPackageNames[packageKey]
      : "Tap & Toast Booking Deposit"
    const cancelUrl = isMountainView
      ? `https://tapandtoast.com/book?cid=${encodeURIComponent(cid)}&venue=${encodeURIComponent(venue)}${packageKey ? `&package=${encodeURIComponent(packageKey)}` : ""}`
      : `https://tapandtoast.com/book?cid=${cid}`

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productName
            },
            unit_amount: Math.round(amount * 100)
          },
          quantity: 1
        }
      ],
      success_url: `https://tapandtoast.com/success?cid=${cid}`,
      cancel_url: cancelUrl,
      metadata: {
        cid,
        ...(venue ? { venue } : {}),
        ...(packageKey ? { package: packageKey } : {})
      }
    })

    return NextResponse.json({ url: session.url })

  } catch (err) {
    console.error("Stripe error:", err)

    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}