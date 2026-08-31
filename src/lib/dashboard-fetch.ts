"use client"

import { getSupabaseBrowser } from "@/lib/supabase-browser"

export async function dashboardFetch(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<Response> {
  const supabaseBrowser = getSupabaseBrowser()
  const { data, error } = await supabaseBrowser.auth.getSession()
  const accessToken = data.session?.access_token

  if (error || !accessToken) {
    window.location.assign("/admin/login")
    throw new Error("Authentication required")
  }

  const headers = new Headers(init.headers)
  headers.set("Authorization", `Bearer ${accessToken}`)

  const response = await fetch(input, { ...init, headers })

  if (response.status === 401) {
    await supabaseBrowser.auth.signOut({ scope: "local" })
    window.location.assign("/admin/login")
    throw new Error("Session expired")
  }

  if (response.status === 403) {
    window.alert("This account is not authorized for the admin dashboard.")
    await supabaseBrowser.auth.signOut({ scope: "local" })
    window.location.assign("/admin/login")
    throw new Error("This account is not authorized for the admin dashboard")
  }

  return response
}