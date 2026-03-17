import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { eventId } = body

    console.log("Balance invoice request for event:", eventId)

    // Temporary success response (Stripe integration will be added later)
    return NextResponse.json({
      success: true,
      message: "Balance invoice link generated"
    })

  } catch (error) {
    console.error("Error generating balance invoice:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Server error generating balance invoice"
      },
      { status: 500 }
    )
  }
}
