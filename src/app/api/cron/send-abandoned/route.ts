import { createHash, randomUUID, timingSafeEqual } from "crypto"
import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { Resend } from "resend"
import { abandonedEmail1 } from "@/lib/emails/abandonedEmail1"
import { abandonedEmail2 } from "@/lib/emails/abandonedEmail2"
import { abandonedEmail3 } from "@/lib/emails/abandonedEmail3"

const resend = new Resend(process.env.RESEND_API_KEY)
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LEASE_MINUTES = 10
const RECOVERY_DAYS = 30
const MAX_QUOTES_PER_RUN = 100
const QUOTE_FIELDS = "id,cid,name,email,event_date,guests,status,converted,email_stage,created_at,updated_at,last_emailed_at,abandoned_email_claimed_at,abandoned_email_claim_token"
const BASE_URL =
  process.env.FRONTEND_URL && process.env.FRONTEND_URL.startsWith("http")
    ? process.env.FRONTEND_URL
    : "https://coloradotapandtoast.com"

type RecoveryQuote = {
  id: string
  cid: string | null
  name: string | null
  email: string | null
  event_date: string | null
  guests: number | null
  status: string | null
  converted: boolean | null
  email_stage: number | null
  created_at: string
  updated_at: string
  last_emailed_at: string | null
  abandoned_email_claimed_at: string | null
  abandoned_email_claim_token: string | null
}

function secureEqual(left: string, right: string): boolean {
  const leftHash = createHash("sha256").update(left).digest()
  const rightHash = createHash("sha256").update(right).digest()
  return timingSafeEqual(leftHash, rightHash)
}

function getStageCutoff(stage: number, now: Date): Date | null {
  const hours = stage === 0 ? 2 : stage === 1 ? 24 : stage === 2 ? 48 : null
  return hours === null ? null : new Date(now.getTime() - hours * 60 * 60 * 1000)
}

function isValidRecipient(email: unknown): email is string {
  return typeof email === "string" && email.length <= 254 && EMAIL_PATTERN.test(email)
}

function isValidCandidate(quote: RecoveryQuote, now: Date): boolean {
  const stage = Number(quote.email_stage)
  const cutoff = getStageCutoff(stage, now)
  if (!cutoff || !quote.cid || !UUID_PATTERN.test(quote.cid) || !isValidRecipient(quote.email)) return false
  if (quote.converted === true || !["pending", "abandoned"].includes(String(quote.status))) return false

  const createdAt = new Date(quote.created_at)
  if (!Number.isFinite(createdAt.getTime()) || createdAt < new Date(now.getTime() - RECOVERY_DAYS * 86400000)) return false

  const eligibilityDate = stage === 0 ? new Date(quote.updated_at) : new Date(String(quote.last_emailed_at))
  return Number.isFinite(eligibilityDate.getTime()) && eligibilityDate <= cutoff
}

async function claimQuote(quote: RecoveryQuote, now: Date): Promise<RecoveryQuote | null> {
  const stage = Number(quote.email_stage)
  const stageCutoff = getStageCutoff(stage, now)
  if (!stageCutoff) return null

  const claimToken = randomUUID()
  const leaseCutoff = new Date(now.getTime() - LEASE_MINUTES * 60 * 1000).toISOString()
  let query = supabase
    .from("quotes")
    .update({
      abandoned_email_claimed_at: now.toISOString(),
      abandoned_email_claim_token: claimToken,
    })
    .eq("id", quote.id)
    .eq("email_stage", stage)
    .in("status", ["pending", "abandoned"])
    .or("converted.is.null,converted.eq.false")
    .gte("created_at", new Date(now.getTime() - RECOVERY_DAYS * 86400000).toISOString())
    .or(`abandoned_email_claimed_at.is.null,abandoned_email_claimed_at.lt.${leaseCutoff}`)

  query = stage === 0
    ? query.lte("updated_at", stageCutoff.toISOString())
    : query.not("last_emailed_at", "is", null).lte("last_emailed_at", stageCutoff.toISOString())

  const { data, error } = await query.select(QUOTE_FIELDS).maybeSingle()
  if (error) throw error
  return data as RecoveryQuote | null
}

async function releaseClaim(quoteId: string, claimToken: string) {
  const { error } = await supabase
    .from("quotes")
    .update({ abandoned_email_claimed_at: null, abandoned_email_claim_token: null })
    .eq("id", quoteId)
    .eq("abandoned_email_claim_token", claimToken)

  if (error) throw error
}

async function verifyClaim(quoteId: string, claimToken: string): Promise<RecoveryQuote | null> {
  const { data, error } = await supabase
    .from("quotes")
    .select(QUOTE_FIELDS)
    .eq("id", quoteId)
    .eq("abandoned_email_claim_token", claimToken)
    .in("status", ["pending", "abandoned"])
    .or("converted.is.null,converted.eq.false")
    .maybeSingle()

  if (error) throw error
  return data as RecoveryQuote | null
}

async function completeClaim(quote: RecoveryQuote, claimToken: string, sentAt: Date) {
  const { data, error } = await supabase
    .from("quotes")
    .update({
      email_stage: Number(quote.email_stage) + 1,
      last_emailed_at: sentAt.toISOString(),
      abandoned_email_claimed_at: null,
      abandoned_email_claim_token: null,
    })
    .eq("id", quote.id)
    .eq("email_stage", Number(quote.email_stage))
    .eq("abandoned_email_claim_token", claimToken)
    .select("id")
    .maybeSingle()

  if (error) throw error
  if (!data) throw new Error("Recovery claim ownership was lost before completion")
}

export async function GET(req: NextRequest) {
  const configuredSecret = process.env.ABANDONED_QUOTE_CRON_SECRET
  if (!configuredSecret) {
    console.error("Abandoned quote cron secret is not configured")
    return NextResponse.json({ error: "Cron unavailable" }, { status: 503 })
  }

  const authorization = req.headers.get("authorization")
  const match = authorization?.match(/^Bearer ([^\s]+)$/i)
  if (!match || !secureEqual(match[1], configuredSecret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const now = new Date()
    const staleCutoff = new Date(now.getTime() - RECOVERY_DAYS * 86400000).toISOString()
    const outcome = { examined: 0, claimed: 0, sent: 0, skipped: 0, failed: 0 }

    const { data: quotes, error } = await supabase
      .from("quotes")
      .select(QUOTE_FIELDS)
      .in("status", ["pending", "abandoned"])
      .or("converted.is.null,converted.eq.false")
      .lt("email_stage", 3)
      .gte("created_at", staleCutoff)
      .order("updated_at", { ascending: true })
      .limit(MAX_QUOTES_PER_RUN)

    if (error) {
      console.error("Fetch error:", error)
      return NextResponse.json({ error: "Fetch failed" }, { status: 500 })
    }

    if (!quotes || quotes.length === 0) {
      return NextResponse.json({ success: true, ...outcome })
    }

    outcome.examined = quotes.length

    for (const candidate of quotes as RecoveryQuote[]) {
      if (!isValidCandidate(candidate, now)) {
        outcome.skipped += 1
        continue
      }

      let claimed: RecoveryQuote | null = null
      try {
        claimed = await claimQuote(candidate, now)
        if (!claimed?.abandoned_email_claim_token) {
          outcome.skipped += 1
          continue
        }
        outcome.claimed += 1

        const ownedQuote = await verifyClaim(claimed.id, claimed.abandoned_email_claim_token)
        if (!ownedQuote || !isValidCandidate(ownedQuote, now)) {
          await releaseClaim(claimed.id, claimed.abandoned_email_claim_token)
          outcome.skipped += 1
          continue
        }

        const stage = Number(ownedQuote.email_stage)
        const templateQuote = {
          cid: ownedQuote.cid as string,
          name: ownedQuote.name || undefined,
          event_date: ownedQuote.event_date || "",
          guests: ownedQuote.guests || undefined,
        }
        const template = stage === 0
          ? abandonedEmail1(templateQuote)
          : stage === 1
            ? abandonedEmail2(templateQuote)
            : abandonedEmail3(templateQuote)
        const recoveryUrl = new URL("/book", BASE_URL)
        recoveryUrl.searchParams.set("cid", ownedQuote.cid as string)
        const legacyUrl = `https://tapandtoast.com/book?cid=${ownedQuote.cid}`
        const result = await resend.emails.send({
          from: "Tap & Toast <events@tapandtoast.com>",
          to: ownedQuote.email as string,
          subject: template.subject,
          html: template.html.replace(legacyUrl, recoveryUrl.toString()),
        }, {
          idempotencyKey: `abandoned-quote-${ownedQuote.cid}-stage-${stage}`,
        })

        if (result.error) throw new Error(result.error.message)

        await completeClaim(ownedQuote, claimed.abandoned_email_claim_token, new Date())
        outcome.sent += 1
      } catch (err) {
        outcome.failed += 1
        console.error("Abandoned recovery attempt failed", err)
        if (claimed?.abandoned_email_claim_token) {
          try {
            await releaseClaim(claimed.id, claimed.abandoned_email_claim_token)
          } catch (releaseError) {
            console.error("Failed to release abandoned recovery claim", releaseError)
          }
        }
      }
    }

    return NextResponse.json(
      { success: outcome.failed === 0, ...outcome },
      { status: outcome.failed === 0 ? 200 : 207 }
    )

  } catch (err) {
    console.error("Cron error:", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}