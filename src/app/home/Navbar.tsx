import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  return (
    <div className="w-full bg-[#9C7A2C] text-white border-b border-[#bfa35a]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo + Brand */}
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

        {/* Navigation */}
        <div className="flex md:flex gap-4 md:gap-8 text-sm tracking-[0.25em] uppercase overflow-x-auto no-scrollbar whitespace-nowrap">
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

          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/#packages" className="hover:opacity-80">
            Packages
          </a>
        </div>

        {/* CTA Button */}
        <Link
          href="/book"
          className="bg-white text-black px-5 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
        >
          Book Now
        </Link>

      </div>
    </div>
  )
}