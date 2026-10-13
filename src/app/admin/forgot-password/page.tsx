"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { getSupabaseBrowser } from "@/lib/supabase-browser"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  async function sendReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError("")
    try {
      const { error } = await getSupabaseBrowser().auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      })
      if (error) {
        if (error.code === "over_email_send_rate_limit") {
          setError("The site has reached its password-reset email limit. Please wait up to an hour before requesting another link, or return to sign in if you know your password.")
        } else if (error.status === 429) {
          setError("Too many reset requests. Please wait a few minutes before trying again.")
        } else {
          setError("We couldn’t send the reset email. Please try again later. If this continues, the site administrator needs to check email delivery settings.")
        }
      } else {
        setSent(true)
      }
    } catch (error) {
      setError(error instanceof Error && error.message === "Supabase browser configuration is missing"
        ? "Password recovery is not configured on this site yet. Please contact the site administrator."
        : "Unable to reach the sign-in service. Please try again shortly.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16 text-gray-800">
      <div className="mx-auto max-w-md rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-3xl">Reset your password</h1>
        {sent ? (
          <div role="status" className="space-y-3 text-sm leading-relaxed">
            <p>If an account exists for that email, you’ll receive a password reset link.</p>
            <p>Check your inbox and spam folder. Open the latest link in this same browser to choose a new password.</p>
            <button type="button" onClick={() => setSent(false)} className="min-h-11 underline underline-offset-4">Try another email</button>
          </div>
        ) : (
          <form onSubmit={sendReset}>
            <p className="mb-6 text-sm leading-relaxed">Enter the email used for your admin account. We’ll send a link to choose a new password.</p>
            <label className="mb-4 block text-sm font-medium">Email
              <input type="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} className="mt-1 w-full rounded border px-3 py-3" />
            </label>
            {error && <p role="alert" className="mb-4 text-sm text-red-700">{error}</p>}
            <button disabled={submitting} className="min-h-12 w-full rounded bg-black px-4 py-3 font-medium text-white disabled:opacity-60">{submitting ? "Sending…" : "Send reset link"}</button>
          </form>
        )}
        <details className="mt-6 border-t pt-4 text-sm leading-relaxed">
          <summary className="cursor-pointer py-2 font-medium">Forgot which email you used?</summary>
          <p className="mt-2">Check your password manager or search your inboxes for previous Supabase account emails. The project owner can look up the registered email in Supabase under Authentication → Users.</p>
        </details>
        <Link href="/admin/login" className="mt-5 inline-block py-2 text-sm underline underline-offset-4">Back to sign in</Link>
      </div>
    </main>
  )
}
