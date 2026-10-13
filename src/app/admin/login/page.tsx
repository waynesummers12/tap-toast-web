"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getSupabaseBrowser } from "@/lib/supabase-browser"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const { error: signInError } = await getSupabaseBrowser().auth.signInWithPassword({
        email: email.trim(),
        password,
      })
      if (signInError) {
        setError("Unable to sign in. Check your account email and password, or use Forgot password below.")
        return
      }
      router.replace("/dashboard")
      router.refresh()
    } catch {
      setError("Unable to connect. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16 text-gray-800">
      <form
        onSubmit={signIn}
        className="mx-auto max-w-sm rounded-lg border bg-white p-6 shadow-sm"
      >
        <h1 className="mb-6 text-2xl font-semibold text-[#9C7A2C]">Admin sign in</h1>
        <label className="mb-4 block text-sm font-medium">
          Email
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </label>
        <label className="mb-4 block text-sm font-medium">
          Password
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </label>
        {error && <p role="alert" className="mb-4 text-sm text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded bg-[#9C7A2C] px-4 py-2 font-medium text-white disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>
        <Link href="/admin/forgot-password" className="mt-4 block py-3 text-center text-sm underline underline-offset-4">Forgot password?</Link>
        <details className="mt-2 border-t pt-3 text-sm leading-relaxed">
          <summary className="cursor-pointer py-2">Forgot your sign-in email?</summary>
          <p className="mt-2">Check your saved passwords or ask the project owner to look up your account in Supabase → Authentication → Users.</p>
        </details>
      </form>
    </main>
  )
}