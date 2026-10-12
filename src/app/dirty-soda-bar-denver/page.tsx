import Breadcrumbs from "../components/Breadcrumbs"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Dirty Soda Bar Catering in Denver | Tap & Toast",
  description: "Mobile dirty soda bar catering for birthdays, weddings, and celebrations in Denver, Colorado. Custom nonalcoholic drinks and staff. Get a soda party quote.",
  alternates: { canonical: "https://www.coloradotapandtoast.com/dirty-soda-bar-denver" },
}

export default function DirtySodaBarDenverPage() {
  return (
    <main className="min-h-screen bg-[#fff8fa] text-[#54283c] selection:bg-[#f5c6d8] selection:text-[#54283c]">
      <Breadcrumbs items={[{"name": "Dirty Soda Bar", "path": "/dirty-soda-bar"}, {"name": "Denver", "path": "/dirty-soda-bar-denver"}]} />

      {/* SEO SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Dirty Soda Bar Catering Denver",
            "areaServed": "Denver",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Tap & Toast Mobile Bar",
              "url": "https://coloradotapandtoast.com"
            },
            "serviceType": "Dirty Soda Bar Catering",
            "description": "Mobile dirty soda bar catering for events across Denver, Colorado.",
            "offers": {
              "@type": "Offer",
              "url": "https://www.coloradotapandtoast.com/book?service=soda",
              "priceCurrency": "USD"
            }
          })
        }}
      />

      {/* HERO */}
      <section className="px-6 py-14 md:px-8 md:py-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-normal mb-6">
            Dirty Soda Bar Catering in Denver
          </h1>

          <p className="text-xl max-w-xl text-[#704659] leading-relaxed">
            Planning a birthday, wedding, or celebration in Denver? Our mobile dirty soda bar
            brings custom nonalcoholic drinks and staff to your event. Guests can choose
            combinations of soda, flavored syrups, cream, fruit, and garnishes.
          </p>

          <div className="mt-10">
            <Link
              href="/book?service=soda"
              prefetch
              className="inline-block bg-[#99365c] text-white px-8 py-4 rounded-full hover:bg-[#772443] font-semibold text-lg transition-colors duration-300 shadow-sm"
            >
              Book Your Denver Soda Bar
            </Link>

            <p className="text-sm text-[#99365c] mt-6">
              Mobile dirty soda catering for Denver events
            </p>

            <p className="text-xs text-[#704659] mt-2">
              ✔ Custom drinks  ✔ Nonalcoholic  ✔ Mobile bar and staff
            </p>
          </div>
        </div>

        <div>
          <Image
            src="/dirty-soda-bar.jpg"
            alt="Dirty Soda Bar Denver Event"
            width={1200}
            height={700}
            className="w-full rounded-t-[5rem] rounded-b-3xl object-cover border-8 border-white shadow-sm"
            priority
            quality={80}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-8 pb-24 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {[
          ["Custom Soda Creations", "Mix soda with flavored syrups, cream, fruit, and garnishes to create a drink that suits your taste."],
          ["Nonalcoholic Celebrations", "Bring friends and family together over custom soda drinks at birthdays, weddings, and graduations."],
          ["Mobile Bar and Staff", "Our mobile bar and staff come to your event. Start a quote with your date, location, and guest count."]
        ].map(([title, description]) => (
          <div key={title} className="bg-white p-8 rounded-3xl border border-[#efcfda] hover:border-[#99365c] transition">
            <h3 className="text-xl font-semibold mb-3">{title}</h3>
            <p className="text-[#704659] leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </section>

      <section className="px-8 pb-12 max-w-6xl mx-auto">
        <h2 className="text-2xl mb-4">Plan your soda bar experience</h2>
        <p className="text-[#704659] leading-relaxed">Explore our <Link href="/dirty-soda-bar" className="underline underline-offset-4">dirty soda bar catering</Link> or read <Link href="/what-is-dirty-soda-bar" className="underline underline-offset-4">how a dirty soda bar works</Link>. Ready to plan? Tell us your event date, location, and guest count to start your quote.</p>
      </section>

      {/* INTERNAL LINKS */}
      <section className="px-8 pb-16 max-w-6xl mx-auto">
        <p className="text-[#704659]">
          Serving Denver and surrounding areas including
          <Link href="/dirty-soda-bar-denver" className="text-[#99365c] underline ml-1">Denver</Link>,
          <Link href="/dirty-soda-bar-littleton" className="text-[#99365c] underline ml-1">Littleton</Link>,
          <Link href="/dirty-soda-bar-lakewood" className="text-[#99365c] underline ml-1">Lakewood</Link>,
          <Link href="/dirty-soda-bar-parker" className="text-[#99365c] underline ml-1">Parker</Link>,
          <Link href="/dirty-soda-bar-highlands-ranch" className="text-[#99365c] underline ml-1">Highlands Ranch</Link>, and
          <Link href="/dirty-soda-bar-centennial" className="text-[#99365c] underline ml-1">Centennial</Link>.
        </p>
      </section>

      {/* CTA */}
      <section className="px-8 pb-32 max-w-6xl mx-auto">
        <div className="bg-[#fce8ef] text-[#54283c] p-8 md:p-16 rounded-3xl border border-[#efcfda] text-center">

          <h2 className="text-3xl font-bold mb-4">
            Book Your Denver Dirty Soda Bar
          </h2>

          <p className="mb-8 text-lg">
            Create a fun and memorable experience your guests will love.
          </p>

          <Link
            href="/book?service=soda"
            prefetch
            className="inline-block bg-[#99365c] text-white px-8 py-4 rounded-full hover:bg-[#772443] font-semibold text-lg transition-colors duration-300"
          >
            Check Availability
          </Link>

        </div>
      </section>

    </main>
  )
}
