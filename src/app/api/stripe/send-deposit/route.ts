import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { eventId } = body

    console.log("Deposit request for event:", eventId)

    // Temporary success response (Stripe will be added later)
    return NextResponse.json({
      success: true,
      message: "Deposit link generated"
    })

  } catch (error) {
    console.error("Error generating deposit link:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Server error generating deposit link"
      },
      { status: 500 }
    )
  }
}