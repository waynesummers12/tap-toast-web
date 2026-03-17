

import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json([
    {
      id: "1",
      event_date: "2026-03-21",
      location: "3333 west angus ave",
      hours: 4,
      bartenders_needed: 2,
      assigned_bartenders_count: 0,
      total_price: 920,
      deposit_amount: 460,
      balance_due: 460,
      deposit_paid: false,
      customers: {
        name: "wayne summers",
        email: "waynesummers12@gmail.com"
      }
    }
  ])
}