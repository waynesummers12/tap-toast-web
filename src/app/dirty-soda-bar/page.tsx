import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Dirty Soda Bar Catering | Tap & Toast",
  description:
    "Tap & Toast offers a Dirty Soda Bar experience for weddings, corporate events, and birthday parties across Colorado. Custom soda mixes, fun flavors, and a unique event experience.",
}

export default function DirtySodaBarPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#c7a45a] selection:text-black">

      {/* SEO SCHEMA MARKUP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Tap & Toast Mobile Bar",
            "image": "https://coloradotapandtoast.com/dirty-soda-bar.jpg",
            "url": "https://coloradotapandtoast.com/dirty-soda-bar",
            "telephone": "720-643-9690",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Denver",
              "addressRegion": "CO",
              "addressCountry": "US"
            },
            "areaServed": ["Denver", "Littleton", "Lakewood", "Parker", "Highlands Ranch", "Centennial", "Colorado"],
            "priceRange": "$$",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "10"
            },
            "review": {
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": "Event Client"
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5"
              },
              "reviewBody": "The dirty soda bar was the highlight of our event — guests loved it and couldn’t stop talking about it."
            },
            "description": "Mobile dirty soda bar catering for weddings, parties, and corporate events in Colorado.",
            "makesOffer": {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Dirty Soda Bar Catering"
              }
            }
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is a dirty soda bar?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A dirty soda bar is a customizable drink station where guests create soda combinations with syrups, cream, fruit, and garnishes."
                }
              },
              {
                "@type": "Question",
                "name": "Do you provide dirty soda bar catering near me?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Tap & Toast provides mobile dirty soda bar catering throughout Denver, Littleton, Lakewood, and surrounding Colorado areas."
                }
              },
              {
                "@type": "Question",
                "name": "What events are best for a dirty soda bar?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Dirty soda bars are perfect for weddings, birthday parties, corporate events, school functions, and family gatherings."
                }
              }
            ]
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://coloradotapandtoast.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Dirty Soda Bar",
                "item": "https://coloradotapandtoast.com/dirty-soda-bar"
              }
            ]
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Dirty Soda Bar Catering",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Tap & Toast Mobile Bar",
              "url": "https://coloradotapandtoast.com"
            },
            "areaServed": {
              "@type": "State",
              "name": "Colorado"
            },
            "serviceType": "Mobile Dirty Soda Bar Catering",
            "description": "Mobile dirty soda bar catering for weddings, birthday parties, and corporate events across Denver, Littleton, Lakewood, and surrounding Colorado areas.",
            "offers": {
              "@type": "Offer",
              "url": "https://coloradotapandtoast.com/book",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            }
          })
        }}
      />

      {/* HERO */}
      <section className="px-8 py-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE (TEXT) */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Dirty Soda Bar Catering in Colorado
            </h1>

            <p className="text-xl max-w-xl opacity-80 leading-relaxed">
              Tap & Toast now offers a fun and interactive <strong>Dirty Soda Bar</strong>
              experience for events across Colorado. Inspired by the viral soda trend,
              our mobile soda bar brings custom soda creations, flavored syrups,
              creams, and garnishes that guests absolutely love.
            </p>

            <p className="text-lg text-gray-400 mt-6 max-w-xl">
              Looking for a dirty soda bar near you? Tap & Toast provides mobile dirty soda catering across Denver, Littleton, Lakewood, and surrounding Colorado areas.
            </p>

            <div className="mt-10">
              <Link
                href="/book?service=soda"
                prefetch
                className="block w-full md:w-auto text-center bg-[#c7a45a] text-black px-8 py-5 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(199,164,90,0.4)]"
              >
                Book a Dirty Soda Bar
              </Link>
              <p className="text-sm text-[#c7a45a] mt-6">
                Perfect for parties — dates fill up quickly during peak weekends
              </p>
              <p className="text-xs text-white/60 mt-2">
                ✔ Huge hit for all ages  ✔ Fast setup  ✔ Fully customizable flavors
              </p>
              <p className="text-sm text-gray-400 mt-4">
                Serving Colorado areas including 
                <Link href="/dirty-soda-bar-denver" className="text-[#c7a45a] underline ml-1">Denver</Link>,
                <Link href="/dirty-soda-bar-littleton" className="text-[#c7a45a] underline ml-1">Littleton</Link>,
                <Link href="/dirty-soda-bar-lakewood" className="text-[#c7a45a] underline ml-1">Lakewood</Link>,
                <Link href="/dirty-soda-bar-parker" className="text-[#c7a45a] underline ml-1">Parker</Link>,
                <Link href="/dirty-soda-bar-highlands-ranch" className="text-[#c7a45a] underline ml-1">Highlands Ranch</Link>, and
                <Link href="/dirty-soda-bar-centennial" className="text-[#c7a45a] underline ml-1">Centennial</Link>
              </p>
            </div>
          </div>

          {/* RIGHT SIDE (IMAGE) */}
          <div>
            <Image
              src="/dirty-soda-bar.jpg"
              alt="Dirty Soda Bar Birthday Party Experience"
              width={1200}
              height={700}
              className="rounded-2xl shadow-2xl object-cover border border-white/10"
              priority
              quality={80}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="px-8 pb-24 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        <div className="bg-neutral-900/70 backdrop-blur p-8 rounded-2xl border border-white/10 hover:border-[#c7a45a] transition">
          <h3 className="text-xl font-semibold mb-3">Custom Soda Creations</h3>
          <p className="opacity-70">
            Guests can mix and match flavors, syrups, fruit garnishes and cream
            toppers to create their own custom soda combinations.
          </p>
        </div>

        <div className="bg-neutral-900/70 backdrop-blur p-8 rounded-2xl border border-white/10 hover:border-[#c7a45a] transition">
          <h3 className="text-xl font-semibold mb-3">Perfect for All Ages</h3>
          <p className="opacity-70">
            A dirty soda bar is a huge hit at weddings, corporate events,
            birthday parties, and family celebrations.
          </p>
        </div>

        <div className="bg-neutral-900/70 backdrop-blur p-8 rounded-2xl border border-white/10 hover:border-[#c7a45a] transition">
          <h3 className="text-xl font-semibold mb-3">Mobile Setup</h3>
          <p className="opacity-70">
            Our mobile bar trailer and staff bring everything needed to serve
            delicious sodas anywhere in Colorado.
          </p>
        </div>

      </section>

      {/* LEARN MORE LINK */}
      <section className="px-8 pb-16 max-w-4xl mx-auto text-center">
        <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-8">
          <p className="text-sm tracking-[0.3em] uppercase text-[#c7a45a] mb-3">
            New to Dirty Soda?
          </p>

          <h3 className="text-2xl font-semibold mb-4">
            Learn How a Dirty Soda Bar Works
          </h3>

          <p className="text-gray-400 mb-6">
            Not sure what a dirty soda is or how it works at events? We break it down simply — flavors, combinations, and why guests love it.
          </p>

          <Link
            href="/what-is-dirty-soda-bar"
            className="inline-block border border-[#c7a45a] text-[#c7a45a] px-6 py-3 rounded-full text-xs tracking-[0.2em] uppercase hover:bg-[#c7a45a] hover:text-black transition"
          >
            Read the Dirty Soda Guide
          </Link>
        </div>
      </section>

      {/* EVENT TYPES */}
      <section className="px-8 pb-24 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Dirty Soda Bar for Weddings, Parties & Corporate Events</h2>

        <ul className="grid md:grid-cols-2 gap-6 text-lg text-gray-300">
          <li>• Weddings</li>
          <li>• Corporate Events</li>
          <li>• Birthday Parties</li>
          <li>• Graduation Parties</li>
          <li>• School Events</li>
          <li>• Company Celebrations</li>
        </ul>
        <p className="text-gray-400 mt-8">
          Also explore our <Link href="/bartending" className="text-[#c7a45a] underline">bartending services</Link> and <Link href="/weddings" className="text-[#c7a45a] underline">wedding bar packages</Link>.
        </p>
      </section>

      <section className="px-8 pb-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Dirty Soda Bar Catering in Colorado</h2>
        <p className="text-gray-400 max-w-3xl">
          Tap & Toast provides premium mobile dirty soda bar catering across Colorado including Denver, Littleton, Lakewood, and surrounding areas. Whether you&apos;re planning a wedding, birthday party, or corporate event, our soda bar experience delivers something unique that guests remember.
        </p>
      </section>

      {/* FAQ */}
      <section className="px-8 pb-24 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Dirty Soda Bar FAQs</h2>

        <div className="space-y-6 text-gray-300">

          <div>
            <h3 className="font-semibold text-lg mb-2">What is a dirty soda bar?</h3>
            <p className="opacity-80">A dirty soda bar is a customizable drink station where guests create unique soda combinations using flavored syrups, cream, fruit, and garnishes.</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Do you provide dirty soda bar catering near me?</h3>
            <p className="opacity-80">Yes — Tap & Toast provides mobile dirty soda bar catering throughout Colorado including Denver, Littleton, and surrounding areas.</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">What events are best for a dirty soda bar?</h3>
            <p className="opacity-80">Dirty soda bars are perfect for birthday parties, weddings, corporate events, school functions, and family gatherings.</p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-8 pb-32 max-w-6xl mx-auto">
        <div className="bg-[#c7a45a] text-black p-12 md:p-16 rounded-3xl shadow-[0_20px_60px_rgba(199,164,90,0.3)]">

          <h2 className="text-3xl font-bold mb-4">
            Ready to Add a Dirty Soda Bar to Your Event?
          </h2>

          <p className="mb-8 text-lg">
            Tap & Toast makes event planning easy with professional staff,
            a beautiful mobile setup, and a soda bar experience guests
            will remember.
          </p>

          <div className="mb-8">
            <Image
              src="/dirty-soda-drinks.jpg"
              alt="Dirty Soda Drink Options"
              width={1200}
              height={700}
              className="rounded-xl shadow-lg object-cover"
              quality={75}
              sizes="100vw"
            />
          </div>

          <Link
            href="/book?service=soda"
            prefetch
            className="block w-full md:w-auto text-center bg-black text-white px-10 py-5 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300"
          >
            Get Your Event Quote
          </Link>

        </div>
      </section>

    </main>
  )
}