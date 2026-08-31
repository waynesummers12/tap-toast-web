import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { Resend } from "resend"
import { abandonedEmail1 } from "@/lib/emails/abandonedEmail1"
import { abandonedEmail2 } from "@/lib/emails/abandonedEmail2"
import { abandonedEmail3 } from "@/lib/emails/abandonedEmail3"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET() {
  try {
    const now = new Date()

    const { data: quotes, error } = await supabase
      .from("quotes")
      .select("*")
      .eq("status", "abandoned")
      .eq("converted", false)
      .lt("email_stage", 3)

    if (error) {
      console.error("Fetch error:", error)
      return NextResponse.json({ error: "Fetch failed" }, { status: 500 })
    }

    if (!quotes || quotes.length === 0) {
      return NextResponse.json({ success: true, message: "No quotes to process" })
    }

    for (const quote of quotes) {
      try {
        if (!quote.cid) {
          console.warn("Skipping quote with no booking cid", quote.id)
          continue
        }

        const created = new Date(quote.created_at)
        const lastSent = quote.last_emailed_at ? new Date(quote.last_emailed_at) : null

        const hoursSinceCreated = (now.getTime() - created.getTime()) / (1000 * 60 * 60)
        const hoursSinceLast = lastSent
          ? (now.getTime() - lastSent.getTime()) / (1000 * 60 * 60)
          : null

        let template: { subject: string; html: string } | null = null

        // 🟢 EMAIL 1 — after 2 hours
        if (quote.email_stage === 0 && hoursSinceCreated >= 2) {
          template = abandonedEmail1(quote)
        }
        // 🟡 EMAIL 2 — 24 hours later
        else if (quote.email_stage === 1 && hoursSinceLast && hoursSinceLast >= 24) {
          template = abandonedEmail2(quote)
        }
        // 🔴 EMAIL 3 — 72 hours later
        else if (quote.email_stage === 2 && hoursSinceLast && hoursSinceLast >= 48) {
          template = abandonedEmail3(quote)
        }

        if (!template) continue

        if (!quote.email) {
          console.warn("Skipping quote with no email", quote.id)
          continue
        }

        await resend.emails.send({
          from: "Tap & Toast <events@tapandtoast.com>",
          to: quote.email,
          subject: template.subject,
          html: template.html.replace(
            `href="https://tapandtoast.com/book?cid=${quote.cid}"`,
            `href="https://tapandtoast.com/book?cid=${quote.cid}&src=email_stage_${quote.email_stage}"`
          )
        })

        // ✅ Update stage + timestamp
        await supabase
          .from("quotes")
          .update({
            email_stage: Math.min((quote.email_stage || 0) + 1, 3),
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