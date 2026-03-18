"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="w-full bg-[#9C7A2C] text-white border-b border-[#bfa35a] relative z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 text-xl font-semibold tracking-wide hover:opacity-80"
        >
          <Image
            src="/web-app-manifest-192x192.png"
            alt="Tap & Toast Logo"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span>Colorado Tap & Toast</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 text-sm tracking-[0.25em] uppercase">
          <Link href="/dirty-soda-bar" className="hover:opacity-80">
            Dirty Soda Bar
          </Link>
          <Link href="/weddings" className="hover:opacity-80">
            Weddings
          </Link>
          <Link href="/corporate-events" className="hover:opacity-80">
            Corporate
          </Link>
          <Link href="/birthday-parties" className="hover:opacity-80">
            Birthdays
          </Link>
          <Link href="/#packages" className="hover:opacity-80">
            Packages
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Desktop CTA */}
          <Link
            href="/book"
            className="hidden md:inline-block bg-white text-black px-5 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
          >
            Book Now
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center space-y-8 text-xl z-50">

          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-3xl"
          >
            ✕
          </button>

          <Link href="/dirty-soda-bar" onClick={() => setMenuOpen(false)}>
            Dirty Soda Bar
          </Link>

          <Link href="/weddings" onClick={() => setMenuOpen(false)}>
            Weddings
          </Link>

          <Link href="/corporate-events" onClick={() => setMenuOpen(false)}>
            Corporate
          </Link>

          <Link href="/birthday-parties" onClick={() => setMenuOpen(false)}>
            Birthdays
          </Link>

          <Link href="/#packages" onClick={() => setMenuOpen(false)}>
            Packages
          </Link>

          <Link
            href="/book"
            onClick={() => setMenuOpen(false)}
            className="bg-[#c7a45a] text-black px-6 py-3 rounded-lg font-semibold"
          >
            Book Now
          </Link>

        </div>
      )}
    </div>
  )
}