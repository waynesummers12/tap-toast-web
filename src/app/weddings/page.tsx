import Breadcrumbs from "../components/Breadcrumbs"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Colorado Wedding Bar Rentals & Bartenders | Tap & Toast",
  alternates: { canonical: "https://www.coloradotapandtoast.com/weddings" },
  description:
    "Plan your Colorado wedding bar with trailer rentals from $600 or staffed packages from $1,230. Compare service options, supplies, and venue planning details.",
}

export default function WeddingsPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-200 selection:text-black">
      <Breadcrumbs items={[{"name": "Weddings", "path": "/weddings"}]} />

      {/* HERO */}
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold mb-6 leading-tight">
            Colorado Wedding Bars & Trailer Rentals
          </h1>

          <p className="text-lg md:text-xl max-w-xl text-neutral-600 leading-relaxed">
            From a Golden reception to a Front Range wedding celebration, choose the support your day needs: a trailer rental for service you already have arranged, or a staffed mobile bar with our bartenders. Plan the menu, timing, and setup with Jen before your big day.
          </p>

          <div className="mt-10">
            <Link
              href="/book?service=bartending&tier=signature"
              prefetch
              className="bg-black text-white px-8 py-5 rounded-sm font-semibold text-lg hover:scale-105 transition-all duration-300 inline-block"
            >
              Get a Wedding Quote
            </Link>
          </div>
        </div>

        <div>
          <Image
            src="/wedding-bar.jpg"
            alt="Tap & Toast Wedding Mobile Bar Experience"
            width={700}
            height={500}
            className="w-full rounded-sm object-cover border border-neutral-200"
            priority
            quality={80}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

      </section>

      {/* FEATURES */}
      <section className="px-8 pb-28 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

        <div className="bg-neutral-950 text-white p-8 rounded-sm border border-neutral-800 hover:border-neutral-500 transition">
          <h3 className="text-xl font-semibold mb-3">Custom Cocktail Menus</h3>
          <p className="opacity-70">
            Work with our bartenders to create signature cocktails for your
            wedding that reflect your style and story.
          </p>
        </div>

        <div className="bg-neutral-950 text-white p-8 rounded-sm border border-neutral-800 hover:border-neutral-500 transition">
          <h3 className="text-xl font-semibold mb-3">Professional Bartenders</h3>
          <p className="opacity-70">
            Our experienced bartenders provide friendly, professional service
            so you and your guests can relax and celebrate.
          </p>
        </div>

        <div className="bg-neutral-950 text-white p-8 rounded-sm border border-neutral-800 hover:border-neutral-500 transition">
          <h3 className="text-xl font-semibold mb-3">Beautiful Mobile Bar</h3>
          <p className="opacity-70">
            Our stylish mobile bar trailer becomes a centerpiece of your
            reception while serving drinks efficiently for guests.
          </p>
        </div>

      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20" aria-labelledby="wedding-options">
        <h2 id="wedding-options" className="mb-8 text-3xl md:text-4xl">Start with the right wedding bar option</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-[#e7dfcf] bg-[#faf8f3] p-8"><h3 className="mb-4 text-2xl">You have service arranged</h3><p className="mb-4 text-2xl font-semibold">Trailer rental from $600</p><p className="mb-6 leading-relaxed text-neutral-600">If your caterer or venue already handles drinks, ask whether our four-tap trailer can be part of the setup. No bartenders are included; delivery within 20 miles of Golden is included.</p><Link href="/trailer-rental" className="font-semibold underline underline-offset-4">Explore the rental and access checklist</Link></article>
          <article className="rounded-2xl border border-neutral-700 bg-black p-8 text-white"><h3 className="mb-4 text-2xl !text-white">You want our bartenders</h3><p className="mb-4 text-2xl font-semibold">The Tipsy from $1,230</p><p className="mb-6 leading-relaxed text-neutral-300">Start with two bartenders and four service hours, with travel within 40 miles of Golden included. Adjust your quote for your guests, menu, and serving schedule.</p><Link href="/book?service=bartending&tier=signature" className="inline-block rounded-lg bg-white px-6 py-4 font-semibold text-black">Get My Wedding Bar Quote</Link></article>
        </div><p className="mt-5 text-sm text-neutral-600">Final pricing depends on selections and location. Venue-specific agreements may differ. <Link href="/mobile-bar-pricing" className="underline underline-offset-4">Compare standard starting prices.</Link></p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20" aria-labelledby="wedding-timeline"><h2 id="wedding-timeline" className="mb-8 text-3xl md:text-4xl">Plan the bar around your wedding timeline</h2><div className="grid gap-7 md:grid-cols-3">{[
        ["Before guests arrive", "Confirm the venue’s outside-vendor policy, parking, setup access, and placement. Share the coordinator’s timing requirements and discuss a weather backup."],
        ["Cocktail hour", "A lot of guests may reach the bar at once. Share guest count and signature drink ideas so Jen can help plan staffing and a menu that fits your service window."],
        ["Reception and close", "Coordinate dinner, speeches, and the last service time with your venue. Confirm cleanup and pickup arrangements before the day, especially if vendor access is restricted."],
      ].map(([title,copy])=><article key={title}><h3 className="mb-4 text-2xl">{title}</h3><p className="leading-relaxed text-neutral-600">{copy}</p></article>)}</div></section>

      <section className="mx-auto max-w-4xl px-6 pb-20"><h2 className="mb-8 text-3xl md:text-4xl">Wedding bar questions to settle early</h2><div className="space-y-3">{[
        ["Who supplies the alcohol?", "Clients supply alcohol. Jen helps with the shopping plan; confirm mixers, ice, garnishes, and other supplies for your particular package before purchasing. Your venue may have its own requirements."],
        ["Can we use the trailer with our venue’s bartenders?", "Trailer-only rental is available. Confirm with the venue or caterer that they can work with an outside trailer, and discuss tap compatibility, equipment, access, and responsibilities with Jen."],
        ["Can we have signature cocktails?", "Yes—discuss your favorites and ideas during planning. Your final menu, ingredients, purchases, and preparation should be confirmed together."],
        ["Can the trailer go indoors?", "Do not assume an indoor space or entrance can accommodate it. Share the venue’s access details and proposed placement with Jen to confirm the right setup."],
        ["What if we booked a Mountain View package?", "Use your Mountain View booking link and agreement. Those packages have venue-specific pricing and inclusions that differ from the standard options on this page."],
      ].map(([q,a])=><details key={q} className="rounded-xl border border-neutral-200 p-6"><summary className="cursor-pointer font-semibold">{q}</summary><p className="mt-4 leading-relaxed text-neutral-600">{a}</p></details>)}</div></section>

      {/* WHY COUPLES CHOOSE US */}
      <section className="px-8 pb-28 max-w-7xl mx-auto will-change-transform">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12">Why Couples Choose Tap & Toast</h2>

        <ul className="grid md:grid-cols-2 gap-6 text-lg text-neutral-600">
          <li>• Elegant mobile bar trailer</li>
          <li>• Professional bartenders in staffed packages</li>
          <li>• Custom cocktail menus</li>
          <li>• Fast guest service</li>
          <li>• Venue access and placement planned with you</li>
          <li>• Staff and service hours selected for your guest count</li>
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-[#efcfda] bg-[#fce8ef] p-7 text-[#54283c] sm:p-10">
          <h2 className="mb-4 text-3xl">A nonalcoholic option for your wedding</h2>
          <p className="mb-6 max-w-3xl leading-relaxed text-[#704659]">Give guests a custom soda experience for a shower, reception, or wedding celebration. Our dirty soda catering includes hosts, ingredients, and a menu you plan with Jen.</p>
          <a href="/dirty-soda-bar" className="inline-block rounded-full bg-[#99365c] px-7 py-4 font-semibold text-white hover:bg-[#772443]">Explore Dirty Soda Catering</a>
          <a href="/what-is-dirty-soda-bar" className="mt-4 block w-fit underline underline-offset-4">New to dirty soda? Read the planning guide</a>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 pb-32 max-w-6xl mx-auto">
        <div className="bg-black text-white p-6 sm:p-12 md:p-16 rounded-sm">

          <h2 className="text-3xl font-bold mb-4">
            Make Your Wedding Bar Unforgettable
          </h2>

          <p className="mb-8 text-lg">
            Choose your bar option and share your date, venue, and guest count. We’ll help you plan the service details so you can enjoy the celebration.
          </p>

          <Link
            href="/book?service=bartending&tier=signature"
            prefetch
            className="block w-full md:w-auto text-center bg-white text-black px-6 py-5 rounded-sm font-semibold text-lg hover:scale-105 transition-all duration-300"
          >
            Reserve Your Wedding Date
          </Link>

        </div>
      </section>

    </main>
  )
}