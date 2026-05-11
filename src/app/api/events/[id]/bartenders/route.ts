import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: eventId } = await context.params

  console.log("Fetching bartenders for event:", eventId)

  // Mock data for now so dashboard works
  const assignedBartenders: Record<string, string[]> = {
    "1": []
  }

  return NextResponse.json({
    event_id: eventId,
    bartenders: assignedBartenders[eventId] ?? []
  })
}