"use client"

import Image from "next/image"
import Link from "next/link"

function getClientId() {
  if (typeof document === "undefined") return ""
  const match = document.cookie.match(/_ga=GA1\.\d\.(\d+\.\d+)/)
  return match ? match[1] : ""
}

export const metadata = {
  title: "Dirty Soda Bar Parker | Tap & Toast",
  description:
    "Mobile dirty soda bar catering in Parker, Colorado. Perfect for weddings, parties, and corporate events. Book Tap & Toast today.",
}

export default function DirtySodaBarParkerPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#c7a45a] selection:text-black">

      {/* SEO SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Dirty Soda Bar Catering Parker",
            "areaServed": "Parker",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Tap & Toast Mobile Bar",
              "url": "https://coloradotapandtoast.com"
            },
            "serviceType": "Dirty Soda Bar Catering",
            "description": "Mobile dirty soda bar catering for events across Parker, Colorado.",
            "offers": {
              "@type": "Offer",
              "url": "https://coloradotapandtoast.com/book",
              "priceCurrency": "USD"
            }
          })
        }}
      />

      {/* HERO */}
      <section className="px-8 py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Dirty Soda Bar Catering in Parker
          </h1>

          <p className="text-xl max-w-xl opacity-80 leading-relaxed">
            Looking for a dirty soda bar in Parker? Tap & Toast delivers a fun,
            interactive soda bar experience for weddings, birthday parties, and
            corporate events across the Parker area.
          </p>

          <div className="mt-10">
            <button
              onClick={() => {
                const cid = getClientId()
                window.location.href = cid ? `/book?cid=${cid}` : "/book"
              }}
              className="inline-block bg-[#c7a45a] text-black px-10 py-5 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(199,164,90,0.4)]"
            >
              Book Your Parker Soda Bar
            </button>

            <p className="text-sm text-[#c7a45a] mt-6">
              Serving Parker events — limited availability on weekends
            </p>

            <p className="text-xs text-white/60 mt-2">
              ✔ Custom drinks  ✔ Perfect for all ages  ✔ Fast setup
            </p>
          </div>
        </div>

        <div>
          <Image
            src="/dirty-soda-bar.jpg"
            alt="Dirty Soda Bar Parker Event"
            width={1200}
            height={700}
            className="rounded-2xl object-cover border border-white/10 shadow-2xl"
            priority
            quality={80}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-8 pb-24 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {[
          "Custom Soda Creations",
          "Perfect for All Ages",
          "Mobile Setup"
        ].map((title, i) => (
          <div key={i} className="bg-neutral-900/70 backdrop-blur p-8 rounded-2xl border border-white/10 hover:border-[#c7a45a] transition">
            <h3 className="text-xl font-semibold mb-3">{title}</h3>
            <p className="opacity-70">
              Tap & Toast delivers premium soda bar experiences tailored to your event.
            </p>
          </div>
        ))}
      </section>

      {/* INTERNAL LINKS */}
      <section className="px-8 pb-16 max-w-6xl mx-auto">
        <p className="text-gray-400">
          Serving Parker and surrounding areas including 
          <Link href="/dirty-soda-bar-parker" className="text-[#c7a45a] underline ml-1">Parker</Link>,
          <Link href="/dirty-soda-bar-denver" className="text-[#c7a45a] underline ml-1">Denver</Link>, 
          <Link href="/dirty-soda-bar-littleton" className="text-[#c7a45a] underline ml-1">Littleton</Link>, 
          <Link href="/dirty-soda-bar-lakewood" className="text-[#c7a45a] underline ml-1">Lakewood</Link>, 
          <Link href="/dirty-soda-bar-highlands-ranch" className="text-[#c7a45a] underline ml-1">Highlands Ranch</Link>, and 
          <Link href="/dirty-soda-bar-centennial" className="text-[#c7a45a] underline ml-1">Centennial</Link>.
        </p>
      </section>

      {/* CTA */}
      <section className="px-8 pb-32 max-w-6xl mx-auto">
        <div className="bg-[#c7a45a] text-black p-12 md:p-16 rounded-3xl shadow-[0_20px_60px_rgba(199,164,90,0.3)] text-center">

          <h2 className="text-3xl font-bold mb-4">
            Book Your Parker Dirty Soda Bar
          </h2>

          <p className="mb-8 text-lg">
            Create a fun and memorable experience your guests will love.
          </p>

          <button
            onClick={() => {
              const cid = getClientId()
              window.location.href = cid ? `/book?cid=${cid}` : "/book"
            }}
            className="inline-block bg-black text-white px-10 py-5 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300"
          >
            Check Availability
          </button>

        </div>
      </section>

    </main>
  )
}