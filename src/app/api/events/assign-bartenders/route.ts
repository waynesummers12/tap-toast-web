

import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { event_id, bartenders } = body

    console.log("Assign bartenders request:", {
      event_id,
      bartenders
    })

    // In a real system this would save to a database.
    // For now we just return success so the dashboard works.

    return NextResponse.json({
      success: true,
      assigned: bartenders ?? []
    })

  } catch (error) {
    console.error("Error assigning bartenders:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to assign bartenders"
      },
      { status: 500 }
    )
  }
}