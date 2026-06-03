import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET() {
  try {
    const now = new Date()

    const { data: quotes, error } = await supabase
      .from("quotes")
      .select("*")
      .eq("status", "abandoned")

    if (error) {
      console.error("Fetch error:", error)
      return NextResponse.json({ error: "Fetch failed" }, { status: 500 })
    }

    if (!quotes || quotes.length === 0) {
      return NextResponse.json({ success: true, message: "No quotes to process" })
    }

    for (const quote of quotes) {
      try {
        const created = new Date(quote.created_at)
        const lastSent = quote.last_emailed_at ? new Date(quote.last_emailed_at) : null

        const hoursSinceCreated = (now.getTime() - created.getTime()) / (1000 * 60 * 60)
        const hoursSinceLast = lastSent
          ? (now.getTime() - lastSent.getTime()) / (1000 * 60 * 60)
          : null

        let subject = ""

        // 🟢 EMAIL 1 — after 2 hours
        if (quote.email_stage === 0 && hoursSinceCreated >= 2) {
          subject = "You’re almost booked 🍸"
        }
        // 🟡 EMAIL 2 — 24 hours later
        else if (quote.email_stage === 1 && hoursSinceLast && hoursSinceLast >= 24) {
          subject = "Your date is still open — but not for long"
        }
        // 🔴 EMAIL 3 — 72 hours later
        else if (quote.email_stage === 2 && hoursSinceLast && hoursSinceLast >= 48) {
          subject = "Last chance before your date fills up"
        } else {
          continue
        }

        await resend.emails.send({
          from: "Tap & Toast <events@tapandtoast.com>",
          to: quote.email,
          subject,
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

        // ✅ Update stage + timestamp
        await supabase
          .from("quotes")
          .update({
            email_stage: (quote.email_stage || 0) + 1,
            last_emailed_at: new Date().toISOString()
          })
          .eq("id", quote.id)

        console.log("Email sent stage", quote.email_stage, quote.email)

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