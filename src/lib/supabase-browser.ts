"use client"

import { createBrowserClient } from "@supabase/ssr"

let browserClient: ReturnType<typeof createBrowserClient> | undefined

export function getSupabaseBrowser() {
  if (browserClient) return browserClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase browser configuration is missing")
  }

  browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey)
  return browserClient
}