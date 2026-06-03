"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`w-full text-white border-b border-[#bfa35a] sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#9C7A2C]/95 backdrop-blur shadow-lg py-2"
          : "bg-[#9C7A2C] py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-4 text-2xl md:text-3xl font-semibold tracking-wide hover:opacity-80"
        >
          <Image
            src="/web-app-manifest-192x192.png"
            alt="Tap & Toast Logo"
            width={64}
            height={64}
            className="rounded-full bg-black p-1 md:w-20 md:h-20"
          />
          <span>Colorado Tap & Toast</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 text-xs tracking-[0.2em] uppercase whitespace-nowrap">
          <Link
            href="/weddings"
            className={`relative group ${
              pathname === "/weddings" ? "text-white" : "opacity-80"
            }`}
          >
            <span className="flex items-center gap-4">
              Weddings
              <span className="opacity-40">|</span>
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/bartending"
            className={`relative group ${
              pathname === "/bartending" ? "text-white" : "opacity-80"
            }`}
          >
            <span className="flex items-center gap-4">
              Bartending
              <span className="opacity-40">|</span>
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/birthday-parties"
            className={`relative group ${
              pathname === "/birthday-parties" ? "text-white" : "opacity-80"
            }`}
          >
            <span className="flex items-center gap-4">
              Parties
              <span className="opacity-40">|</span>
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/dirty-soda-bar"
            className={`relative group ${
              pathname === "/dirty-soda-bar" ? "text-white" : "opacity-80"
            }`}
          >
            <span className="flex items-center gap-4">
              Dirty Soda Bar
              <span className="opacity-40">|</span>
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/corporate-events"
            className={`relative group ${
              pathname === "/corporate-events" ? "text-white" : "opacity-80"
            }`}
          >
            <span className="flex items-center gap-4">
              Corporate
              <span className="opacity-40">|</span>
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/#packages"
            className="relative group opacity-80"
          >
            <span>Packages</span>
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Desktop CTA */}
          <Link
            href="/book"
            className="hidden md:inline-block bg-white text-black px-5 py-2 rounded-md text-sm font-semibold hover:opacity-90 hover:scale-105 transition"
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

          <Link
            href="/dirty-soda-bar"
            onClick={() => setMenuOpen(false)}
            className="hover:scale-105 transition"
          >
            Dirty Soda Bar
          </Link>

          <Link
            href="/weddings"
            onClick={() => setMenuOpen(false)}
            className="hover:scale-105 transition"
          >
            Weddings
          </Link>

          <Link
            href="/corporate-events"
            onClick={() => setMenuOpen(false)}
            className="hover:scale-105 transition"
          >
            Corporate
          </Link>

          <Link
            href="/birthday-parties"
            onClick={() => setMenuOpen(false)}
            className="hover:scale-105 transition"
          >
            Parties
          </Link>

          <Link
            href="/bartending"
            onClick={() => setMenuOpen(false)}
            className="hover:scale-105 transition"
          >
            Bartending
          </Link>


          <Link
            href="/#packages"
            onClick={() => setMenuOpen(false)}
            className="hover:scale-105 transition"
          >
            Packages
          </Link>

          <Link
            href="/book"
            onClick={() => setMenuOpen(false)}
            className="bg-[#c7a45a] text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            Book Now
          </Link>

        </div>
      )}

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-[#9C7A2C] p-4 md:hidden z-40">
        <div className="flex gap-3">

          <a
            href="tel:7206439690"
            className="w-1/2 text-center bg-white text-black px-4 py-3 rounded-lg font-semibold"
          >
            Call Now
          </a>

          <Link
            href="/book"
            className="w-1/2 text-center bg-[#c7a45a] text-black px-4 py-3 rounded-lg font-semibold"
          >
            Get Quote
          </Link>

        </div>
      </div>
    </div>
  )
}
