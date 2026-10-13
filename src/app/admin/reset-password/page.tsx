"use client"

import { FormEvent, useEffect, useState } from "react"
import Link from "next/link"
import { getSupabaseBrowser } from "@/lib/supabase-browser"

export default function ResetPasswordPage() {
  const [status, setStatus] = useState<"checking" | "ready" | "invalid" | "saved">("checking")
  const [password, setPassword] = useState("")
  const [confirmation, setConfirmation] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true
    async function checkRecovery() {
      try {
        const url = new URL(window.location.href)
        const fragment = new URLSearchParams(url.hash.slice(1))
        if (url.searchParams.has("error") || fragment.has("error")) {
          if (active) setStatus("invalid")
          return
        }
        // The browser client exchanges the PKCE code once during initialization.
        const auth = getSupabaseBrowser().auth
        const { error: initError } = await auth.initialize()
        if (initError) {
          if (active) setStatus("invalid")
          return
        }
        const { data, error } = await auth.getUser()
        if (active) setStatus(!error && data.user ? "ready" : "invalid")
      } catch {
        if (active) setStatus("invalid")
      }
    }
    void checkRecovery()
    return () => { active = false }
  }, [])

  async function savePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    if (password.length < 9) {
      setError("Use at least 9 characters for your new password.")
      return
    }
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9\s]/.test(password)) {
      setError("Include a capital letter, a number, and a symbol such as ! or @.")
      return
    }
    if (password !== confirmation) {
      setError("The passwords don’t match. Please enter them again.")
      return
    }
    setSubmitting(true)
    try {
      const auth = getSupabaseBrowser().auth
      const { data, error: userError } = await auth.getUser()
      if (userError || !data.user) {
        setStatus("invalid")
        return
      }
      const { error: updateError } = await auth.updateUser({ password })
      if (updateError) {
        if (updateError.code === "same_password") {
          setError("That is already your current password. You can sign in with it, or choose a different password here.")
        } else if (updateError.code === "weak_password") {
          setError(updateError.message)
        } else if (updateError.status === 429) {
          setError("Too many attempts. Please wait a minute before trying again.")
        } else if (["session_not_found", "session_expired", "refresh_token_not_found", "bad_jwt"].includes(updateError.code ?? "")) {
          setStatus("invalid")
        } else {
          setError("Your password could not be saved. Please try again. If this continues, request a new reset link.")
        }
        return
      }
      setPassword("")
      setConfirmation("")
      // Require a fresh sign-in after the change. Admin authorization stays server-side.
      // A sign-out network failure must not report a successfully changed password as failed.
      try {
        await auth.signOut({ scope: "local" })
      } catch {
        // The password update succeeded; the user can still return to sign-in.
      }
      setStatus("saved")
    } catch {
      setError("Unable to connect. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16 text-gray-800">
      <div className="mx-auto max-w-md rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="mb-5 text-3xl">Choose a new password</h1>
        {status === "checking" && <p role="status">Checking your reset link…</p>}
        {status === "invalid" && <div role="alert" className="space-y-4 text-sm leading-relaxed">
          <p>This reset link is missing, expired, or couldn’t be verified. Request a new link and open it in the same browser where you requested it.</p>
          <Link href="/admin/forgot-password" className="inline-block py-3 font-semibold underline underline-offset-4">Request a new reset link</Link>
        </div>}
        {status === "saved" && <div role="status" className="space-y-4">
          <p>Your password has been updated. Sign in with your account email and new password.</p>
          <Link href="/admin/login" className="inline-block rounded bg-black px-6 py-3 text-white">Sign in</Link>
        </div>}
        {status === "ready" && <form onSubmit={savePassword}>
          <p className="mb-5 text-sm text-gray-600">Use at least 9 characters, including a capital letter, a number, and a symbol such as ! or @.</p>
          <label className="mb-4 block text-sm font-medium">New password
            <input type="password" autoComplete="new-password" minLength={9} required value={password} onChange={event => setPassword(event.target.value)} className="mt-1 w-full rounded border px-3 py-3" />
          </label>
          <label className="mb-4 block text-sm font-medium">Confirm new password
            <input type="password" autoComplete="new-password" minLength={9} required value={confirmation} onChange={event => setConfirmation(event.target.value)} className="mt-1 w-full rounded border px-3 py-3" />
          </label>
          {error && <p role="alert" className="mb-4 text-sm text-red-700">{error}</p>}
          <button disabled={submitting} className="min-h-12 w-full rounded bg-black px-4 py-3 font-medium text-white disabled:opacity-60">{submitting ? "Saving…" : "Save new password"}</button>
          <Link href="/admin/login" className="mt-4 inline-block py-2 text-sm underline underline-offset-4">Back to sign in</Link>
        </form>}
      </div>
    </main>
  )
}
