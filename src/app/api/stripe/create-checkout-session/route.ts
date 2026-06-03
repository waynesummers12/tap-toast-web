import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia"
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { amount, email, cid } = body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Tap & Toast Booking Deposit"
            },
            unit_amount: Math.round(amount * 100)
          },
          quantity: 1
        }
      ],
      success_url: `https://tapandtoast.com/success?cid=${cid}`,
      cancel_url: `https://tapandtoast.com/book?cid=${cid}`,
      metadata: {
        cid
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