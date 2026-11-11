type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void
  dataLayer?: unknown[]
}
const sent = new Set<string>()

export function trackEvent(name: string, parameters: Record<string, string | number> = {}, onceKey?: string) {
  if (typeof window === "undefined" || /^\/(admin|dashboard)(\/|$)/.test(window.location.pathname)) return
  const key = onceKey ? `tap_toast_analytics_v1:${name}:${onceKey}` : undefined
  try {
    if (key && (sent.has(key) || window.localStorage.getItem(key))) return
  } catch { /* Storage restrictions must never block booking. */ }
  try {
    const browser = window as AnalyticsWindow
    // Queue events even when the Google script has not finished loading.
    if (browser.gtag) browser.gtag("event", name, { ...parameters, transport_type: "beacon", page_path: window.location.pathname })
    else {
      browser.dataLayer = browser.dataLayer || []
      browser.dataLayer.push(["event", name, { ...parameters, transport_type: "beacon", page_path: window.location.pathname }])
    }
    if (key) {
      sent.add(key)
      try { window.localStorage.setItem(key, "1") } catch { /* In-memory deduplication still applies. */ }
    }
  } catch { /* Analytics must never interrupt a customer's booking. */ }
}

export function classifyLink(href: string, origin: string): { name: string; parameters: Record<string, string> } | null {
  try {
    const url = new URL(href, origin)
    if (url.protocol === "tel:") return { name: "contact_click", parameters: { contact_method: "phone" } }
    if (url.protocol === "mailto:") return { name: "contact_click", parameters: { contact_method: "email" } }
    if (url.origin === origin && /^\/book\/?$/.test(url.pathname)) {
      const soda = url.searchParams.get("service") === "soda"
      const rental = url.searchParams.get("type") === "rental" || ["trailer", "taste"].includes(url.searchParams.get("tier") || "")
      return { name: "book_click", parameters: { booking_service: soda ? "soda" : rental ? "rental" : "bar" } }
    }
  } catch { /* Ignore malformed links. */ }
  return null
}
