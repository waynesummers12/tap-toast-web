"use client"

import { useEffect } from "react"
import { classifyLink, trackEvent } from "@/lib/analytics"

export default function AnalyticsClicks() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null
      const control = target?.closest("a[href], button[data-book]")
      if (!control) return
      if (control instanceof HTMLAnchorElement) {
        const result = classifyLink(control.href, window.location.origin)
        if (result) trackEvent(result.name, result.parameters)
      } else if (control.getAttribute("data-book") === "true") {
        trackEvent("book_click")
      }
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])
  return null
}
