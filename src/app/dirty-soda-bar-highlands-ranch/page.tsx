import Breadcrumbs from "../components/Breadcrumbs"


import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Dirty Soda Bar Catering in Highlands Ranch | Tap & Toast",
  description: "Plan your Highlands Ranch soda party: packages from $780, hosts and ingredients included. Explore drink ideas, venue planning tips, and event quotes.",
  alternates: { canonical: "https://www.coloradotapandtoast.com/dirty-soda-bar-highlands-ranch" },
}

export default function DirtySodaBarHighlandsRanchPage() {
  return (
    <main className="min-h-screen bg-[#fff8fa] text-[#54283c] selection:bg-[#f5c6d8] selection:text-[#54283c]">
      <Breadcrumbs items={[{"name": "Dirty Soda Bar", "path": "/dirty-soda-bar"}, {"name": "Highlands Ranch", "path": "/dirty-soda-bar-highlands-ranch"}]} />

      {/* SEO SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Dirty Soda Bar Catering Highlands Ranch",
            "areaServed": "Highlands Ranch",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Tap & Toast Mobile Bar",
              "url": "https://www.coloradotapandtoast.com"
            },
            "serviceType": "Dirty Soda Bar Catering",
            "description": "Mobile dirty soda bar catering for events across Highlands Ranch, Colorado.",
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
            Dirty Soda Bar Catering in Highlands Ranch
          </h1>

          <p className="text-xl max-w-xl text-[#704659] leading-relaxed">
            From backyard birthdays and bridal showers to graduations and company celebrations, bring a mobile dirty soda bar to your Highlands Ranch event. We supply the soda hosts, drinks, and ingredients—you bring your favorite people.
          </p>

          <div className="mt-10">
            <Link
              href="/book?service=soda"
              prefetch
              className="inline-block bg-[#99365c] text-white px-8 py-4 rounded-full hover:bg-[#772443] font-semibold text-lg transition-colors duration-300 shadow-sm"
            >
              Book Your Highlands Ranch Soda Bar
            </Link>

            <p className="text-sm text-[#99365c] mt-6">
              Starting at $780 · One soda host · Three hours of service
            </p>

            <p className="text-xs text-[#704659] mt-2">
              ✔ Custom drinks  ✔ Nonalcoholic  ✔ Mobile bar and staff
            </p>
          </div>
        </div>

        <div>
          <Image
            src="/dirty-soda-bar.jpg"
            alt="A celebration around the Tap & Toast mobile soda bar"
            width={1200}
            height={700}
            className="w-full rounded-t-[5rem] rounded-b-3xl object-cover border-8 border-white shadow-sm"
            priority
            quality={80}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-8" aria-labelledby="highlands-occasions">
        <h2 id="highlands-occasions" className="mb-5 text-3xl md:text-4xl">A soda bar for the way you celebrate.</h2>
        <p className="mb-8 max-w-3xl leading-relaxed text-[#704659]">Planning at home, at work, or in a rented event space in Highlands Ranch? Here are a few ways to make custom nonalcoholic drinks part of the gathering.</p>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Backyard birthdays & family parties", "Give guests a place to gather between games, food, and cake. Share the access route to your yard and your outdoor backup plan when you inquire."],
            ["Showers, weddings & girls’ nights", "Build a drink menu around the celebration. Start with a few flavor ideas, then confirm your selections and any dietary preferences with Jen."],
            ["School, neighborhood & team events", "Bring a soda station to a graduation party, neighborhood gathering, or company celebration. Share the guest count and serving schedule so we can plan staffing."],
          ].map(([title, body]) => <div key={title} className="rounded-3xl border border-[#efcfda] bg-white p-7"><h3 className="mb-3 text-2xl">{title}</h3><p className="leading-relaxed text-[#704659]">{body}</p></div>)}
        </div>
      </section>

      <section className="border-y border-[#efcfda] bg-[#fce8ef] px-6 py-16 md:px-8" aria-labelledby="highlands-package">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#99365c]">Your starting point</p>
            <h2 id="highlands-package" className="mb-5 text-3xl md:text-4xl">Soda catering starting at $780</h2>
            <p className="mb-6 leading-relaxed text-[#704659]">The starter package includes one soda host and three hours of service. Choose additional hosts or a different package for your guest count and plans.</p>
            <Link href="/book?service=soda&tier=taste" className="inline-block rounded-full bg-[#99365c] px-7 py-4 text-center font-semibold text-white hover:bg-[#772443]">Explore the Starter Package</Link>
            <p className="mt-5 text-sm leading-relaxed text-[#704659]">Travel within 40 miles of Golden is included. Share your exact Highlands Ranch venue address so we can confirm travel and access details. Final pricing depends on your package, service time, staffing, and travel.</p>
          </div>
          <div className="rounded-3xl border border-[#efcfda] bg-white p-7">
            <h3 className="mb-5 text-2xl">We bring the ingredients.</h3>
            <ul className="list-disc space-y-3 pl-5 leading-relaxed text-[#704659]">
              <li>Mobile soda bar setup, with your selected hosts and service hours</li>
              <li>Soda, flavored syrups, cream, fruit, and ice</li>
              <li>Clear cups and napkins</li>
              <li>Personalized bar menu and trailer signage</li>
              <li>Initial planning consultation and final details call</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8" aria-labelledby="highlands-flavors">
        <h2 id="highlands-flavors" className="mb-5 text-3xl md:text-4xl">A few ideas for your party menu</h2>
        <p className="mb-8 max-w-3xl leading-relaxed text-[#704659]">Try a cherry-vanilla cola with cream, lemon-lime soda with strawberry and fresh lime, or orange soda with vanilla and cream. These are sample combinations; confirm final flavors and ingredients with Jen.</p>
        <Link href="/dirty-soda-bar#soda-menu-heading" className="font-semibold text-[#99365c] underline underline-offset-4">Explore more soda menu inspiration</Link>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-8" aria-labelledby="highlands-venue">
        <div className="rounded-3xl border border-[#efcfda] bg-white p-7 sm:p-10">
          <h2 id="highlands-venue" className="mb-5 text-3xl md:text-4xl">Before you book your Highlands Ranch venue</h2>
          <p className="mb-6 max-w-3xl leading-relaxed text-[#704659]">A home party and a rented community space can have different access arrangements. This checklist helps us plan the setup with you.</p>
          <ul className="list-disc space-y-4 pl-5 leading-relaxed text-[#704659]">
            <li><strong>Confirm permission:</strong> If you’re using a community room, school, workplace, or HOA-managed space, ask the organizer about outside catering and where the bar can be placed.</li>
            <li><strong>Share access details:</strong> Send the venue address and let us know about gates, stairs, narrow entrances, parking, or delivery restrictions.</li>
            <li><strong>Coordinate the schedule:</strong> Share your venue’s setup and pickup windows along with the time you’d like drink service to begin.</li>
            <li><strong>Plan for outdoors:</strong> Discuss shelter and a weather backup with Jen and your venue. Specific space, electricity, and water needs are confirmed for your chosen setup.</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16 md:px-8" aria-labelledby="highlands-questions">
        <h2 id="highlands-questions" className="mb-8 text-3xl md:text-4xl">Highlands Ranch booking questions</h2>
        <div className="space-y-3">
          {[
            ["Is this a soda shop we can visit?", "We’re a mobile event catering service, not a walk-in soda shop. Book us to bring the soda bar and hosts to your celebration."],
            ["Do I need to buy soda, ice, or cups?", "No. We provide soda, syrups, cream, fruit, ice, clear cups, and napkins. We’ll confirm your menu with you during planning."],
            ["Can I book a school or neighborhood event?", "Yes—share the event date, location, guest count, and serving schedule. Confirm venue permission and access with your organizer so we can plan the setup together."],
            ["Can you accommodate dietary preferences?", "Tell Jen about allergies or dietary preferences before booking. Specific ingredients, alternatives, and allergen accommodations need to be confirmed in advance."],
            ["How do I check my date and price?", "Open the soda quote, choose your package, and enter your event details. For venue or setup questions, call Jen at 720-643-9690."],
          ].map(([question, answer]) => <details key={question} className="rounded-2xl border border-[#efcfda] bg-white p-6"><summary className="cursor-pointer font-semibold">{question}</summary><p className="mt-4 leading-relaxed text-[#704659]">{answer}</p></details>)}
        </div>
      </section>

      <section className="px-8 pb-12 max-w-6xl mx-auto">
        <h2 className="text-2xl mb-4">Plan your soda bar experience</h2>
        <p className="text-[#704659] leading-relaxed">Explore our <Link href="/dirty-soda-bar" className="underline underline-offset-4">dirty soda bar catering</Link> or read <Link href="/what-is-dirty-soda-bar" className="underline underline-offset-4">how a dirty soda bar works</Link>. Ready to plan? Tell us your event date, location, and guest count to start your quote.</p>
      </section>

      {/* CTA */}
      <section className="px-8 pb-32 max-w-6xl mx-auto">
        <div className="bg-[#fce8ef] text-[#54283c] p-8 md:p-16 rounded-3xl border border-[#efcfda] text-center">

          <h2 className="text-3xl font-bold mb-4">
            Book Your Highlands Ranch Dirty Soda Bar
          </h2>

          <p className="mb-8 text-lg">
            Share your Highlands Ranch venue, date, and guest count. We’ll help you plan the drinks and setup.
          </p>

          <Link
            href="/book?service=soda"
            prefetch
            className="inline-block bg-[#99365c] text-white px-8 py-4 rounded-full hover:bg-[#772443] font-semibold text-lg transition-colors duration-300"
          >
            Plan Your Soda Party
          </Link>
          <a href="tel:7206439690" className="mx-auto mt-5 block w-fit text-[#99365c] underline underline-offset-4">Questions about your venue? Call Jen · 720-643-9690</a>

        </div>
      </section>

      <section aria-labelledby="nearby-cities" className="mx-auto max-w-6xl px-8 pb-28 text-center">
        <h2 id="nearby-cities" className="mb-4 text-2xl">Planning an event in another city?</h2>
        <nav aria-label="Other dirty soda service areas" className="flex flex-wrap justify-center gap-4 text-[#99365c]">
          {[["Denver", "denver"], ["Littleton", "littleton"], ["Lakewood", "lakewood"], ["Parker", "parker"], ["Centennial", "centennial"]].map(([city, slug]) => <Link key={slug} href={`/dirty-soda-bar-${slug}`} className="underline underline-offset-4">{city}</Link>)}
        </nav>
      </section>

    </main>
  )
}
