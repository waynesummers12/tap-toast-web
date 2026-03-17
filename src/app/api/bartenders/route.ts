import { NextResponse } from "next/server"

export async function GET() {
  const bartenders = [
    { id: "1", name: "Jen" },
    { id: "2", name: "Jessica" },
    { id: "3", name: "Jeff" },
    { id: "4", name: "Wayne" }
  ]

  return NextResponse.json(bartenders)
}
