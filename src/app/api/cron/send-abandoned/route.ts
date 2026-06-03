import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET() {
  try {
    // ⏱ Find quotes older than 2 hours AND not emailed
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()

    const { data: quotes, error } = await supabase
      .from("quotes")
      .select("*")
      .eq("email_sent", false)
      .eq("status", "abandoned")
      .lt("created_at", twoHoursAgo)

    if (error) {
      console.error("Fetch error:", error)
      return NextResponse.json({ error: "Fetch failed" }, { status: 500 })
    }

    if (!quotes || quotes.length === 0) {
      return NextResponse.json({ success: true, message: "No quotes to process" })
    }

    for (const quote of quotes) {
      try {
        await resend.emails.send({
          from: "Tap & Toast <events@tapandtoast.com>",
          to: quote.email,
          subject: "Your Tap & Toast event is almost booked 🍸",
          html: `
            <div style="font-family: Arial, sans-serif;">
              <h2>Hey ${quote.name || "there"},</h2>

              <p>We saved your event — you were just one step away.</p>

              <ul>
                <li>Date: ${quote.event_date}</li>
                <li>Guests: ${quote.guests}</li>
                <li>Hours: ${quote.hours}</li>
              </ul>

              <a href="https://tapandtoast.com/book?cid=${quote.id}"
                 style="display:inline-block;padding:12px 20px;background:#c6a25a;color:black;border-radius:6px;">
                Finish Booking
              </a>

              <p style="margin-top:20px;">— Tap & Toast 🍸</p>
            </div>
          `
        })

        // ✅ Mark as sent
        await supabase
          .from("quotes")
          .update({ email_sent: true })
          .eq("id", quote.id)

        console.log("Email sent + marked:", quote.email)

      } catch (err) {
        console.error("Email error for:", quote.email, err)
      }
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error("Cron error:", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}