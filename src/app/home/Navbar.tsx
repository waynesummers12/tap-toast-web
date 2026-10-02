"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

const links = [
  ["Weddings", "/weddings"],
  ["Bartending", "/bartending"],
  ["Parties", "/birthday-parties"],
  ["Dirty Soda Bar", "/dirty-soda-bar"],
  ["Corporate", "/corporate-events"],
  ["Packages", "/#packages"],
] as const

export default function Navbar() {
  const pathname = usePathname()
  // Remount the disclosure when navigation changes the current page.
  return <Navigation key={pathname} pathname={pathname} />
}

function Navigation({ pathname }: { pathname: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const quoteHref = pathname === "/dirty-soda-bar" ? "/book?service=soda" : "/book"
  if (pathname === "/mountain-view") return null
  const showQuoteBar = !["/book", "/success", "/upgrade", "/dashboard", "/admin"].some(
    path => pathname === path || pathname.startsWith(`${path}/`)
  )

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white text-neutral-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex min-w-0 items-center gap-3 font-semibold">
            <Image src="/web-app-manifest-192x192.png" alt="" width={48} height={48} className="shrink-0 rounded-full bg-black p-1" />
            <span className="brand-wordmark text-2xl leading-none sm:text-3xl">Colorado Tap & Toast</span>
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-5 text-sm xl:flex">
            {links.map(([label, href]) => (
              <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} className="py-3 hover:underline underline-offset-4">{label}</Link>
            ))}
            <a href="mailto:jen@coloradotapandtoast.com" className="py-3 hover:underline underline-offset-4">Contact Us</a>
            <Link href={quoteHref} className="border border-black bg-black px-5 py-3 text-white">Get Quote</Link>
          </nav>
          <button type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
            onKeyDown={event => { if (event.key === "Escape") setMenuOpen(false) }}
            className="min-h-11 shrink-0 rounded-lg border border-black/30 px-3 text-sm font-semibold xl:hidden">
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
        <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!menuOpen}
          onKeyDown={event => {
            if (event.key === "Escape") {
              setMenuOpen(false)
              document.querySelector<HTMLButtonElement>('[aria-controls="mobile-navigation"]')?.focus()
            }
          }}
          className="max-h-[calc(100dvh-80px)] overflow-y-auto border-t border-white/30 bg-white px-4 py-4 xl:hidden">
          <div className="mx-auto grid max-w-7xl gap-1 sm:grid-cols-2">
            {links.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} aria-current={pathname === href ? "page" : undefined} className="rounded-lg px-4 py-3 hover:bg-neutral-100">{label}</Link>
            ))}
            <a href="mailto:jen@coloradotapandtoast.com" className="rounded-lg px-4 py-3 hover:bg-neutral-100">Contact Us</a>
            <Link href={quoteHref} onClick={() => setMenuOpen(false)} className="rounded-lg bg-black px-4 py-3 font-semibold text-white">Get Your Quote</Link>
          </div>
        </nav>
      </header>
      {showQuoteBar && <div className="mobile-quote-bar fixed bottom-0 left-0 z-40 w-full border-t border-white/20 bg-black p-3 text-black xl:hidden">
        <div className="mx-auto flex max-w-xl gap-3">
          <a href="tel:7206439690" className="flex-1 rounded-lg bg-white px-4 py-3 text-center font-semibold">Call Now</a>
          <Link href={quoteHref} className="flex-1 rounded-lg bg-white px-4 py-3 text-center font-semibold">Get Quote</Link>
        </div>
      </div>}
    </>
  )
}
