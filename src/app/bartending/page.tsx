import Breadcrumbs from "../components/Breadcrumbs"
import Image from "next/image";
import Link from "next/link";
import Packages from "./packages";


export const metadata = {
  title: "Colorado Bartending & Mobile Bar Packages | Tap & Toast",
  description: "Compare staffed mobile bar packages and trailer rentals for Denver, Golden, and Colorado celebrations. See starting prices, planning details, and get a quote.",
  alternates: { canonical: "https://www.coloradotapandtoast.com/bartending" },
};

export default function BartendingPage() {
  return (
    <main className="bg-white text-neutral-950 selection:bg-neutral-200 selection:text-black">
      <Breadcrumbs items={[{"name": "Bartending", "path": "/bartending"}]} />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs tracking-[0.3em] text-neutral-600 mb-4">
            PREMIUM BARTENDING EXPERIENCE
          </p>

          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
            Colorado Bartenders for
            <br />
            Your Kind of Celebration
          </h1>

          <p className="text-lg text-neutral-600 mb-6 max-w-lg">
            From girls’ nights and birthdays to weddings and company celebrations, choose a staffed mobile bar or a trailer rental. Based in Golden, we help you plan events in Denver and the Front Range around your guests, drinks, and venue.
          </p>

          <p className="text-sm text-neutral-600 mb-6">
            Staffed packages from $1,230 · Trailer-only rentals from $600
          </p>

          <div className="relative group flex flex-col sm:flex-row gap-4">
            <Link
              href="/book?service=bartending&tier=signature"
              className="relative z-10 bg-black text-white px-8 py-4 rounded-sm font-semibold text-lg leading-none text-center transition-all duration-200 hover:scale-[1.03]"
            >
              Check Availability
            </Link>

            <a
              href="tel:7206439690"
              className="relative z-10 border border-neutral-300 px-8 py-4 rounded-sm font-semibold text-lg leading-none text-center flex items-center justify-center transition-all duration-200 hover:scale-[1.03] hover:border-black"
            >
              Call Now
            </a>
          </div>
        </div>

        <div className="rounded-sm overflow-hidden border border-neutral-200">
          <Image
            src="/Bartending-service.png"
            alt="Mobile bartending setup for a Colorado event"
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="text-center px-6 pb-12">
        <p className="text-neutral-600 text-sm mb-2">
          Plan your menu · Choose your service hours · Review your quote
        </p>
        <p className="text-neutral-500 text-xs">
          Fully insured · General & Liquor Liability included
        </p>
      </section>

      <Packages />

      <section className="mx-auto max-w-7xl px-6 pb-20" aria-labelledby="planning-heading">
        <h2 id="planning-heading" className="mb-8 text-3xl md:text-4xl">A little planning makes hosting easier</h2>
        <div className="grid gap-6 md:grid-cols-3">{[
          ["Start with your celebration", "Share your date, venue address, guest count, and serving window. Tell us whether you want a staffed bar or just the trailer."],
          ["Build your drink plan", "Work with Jen on the menu and shopping guide. Confirm who supplies each ingredient and any dietary needs before buying supplies."],
          ["Confirm access and timing", "Check your venue’s outside-vendor rules, bar placement, delivery access, and setup window. For outdoor events, discuss shelter and a weather backup."],
        ].map(([title, copy], index) => <article key={title} className="rounded-2xl border border-[#e7dfcf] bg-[#faf8f3] p-7"><p className="mb-4 text-sm font-semibold text-[#806321]">0{index + 1}</p><h3 className="mb-4 text-2xl">{title}</h3><p className="leading-relaxed text-neutral-600">{copy}</p></article>)}</div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20" aria-labelledby="bartending-faq">
        <h2 id="bartending-faq" className="mb-8 text-3xl md:text-4xl">Before you book your bar</h2>
        <div className="space-y-3">{[
          ["Does every package include a bartender?", "No. The Trailer is a rental without bartenders. The Tipsy starts with two bartenders and four hours; The Toasted starts with three bartenders and five hours. Review your selected staff and hours in the quote."],
          ["What is included in planning?", "Our standard booking includes an initial consultation, a final details call, a custom shopping guide, clear cups and napkins, and personalized bar menu and trailer signage. Venue-specific packages may have different inclusions; review your quote."],
          ["Who buys the alcohol and other supplies?", "We help you plan purchases with a custom shopping guide. Confirm the alcohol, mixers, ice, garnishes, and other supplies with Jen for your particular package before shopping. Do not assume a staffed package includes alcohol purchases."],
          ["How far do you travel?", "Standard staffed packages include travel within 40 miles of Golden (80401). The Trailer rental includes delivery within 20 miles of Golden. Share the exact address so we can confirm any additional travel charges."],
          ["How many bartenders will I need?", "Guest count, drink complexity, and busy periods all affect staffing. The quote lets you adjust staff and hours; talk with Jen about a wedding cocktail hour or a large group arriving at once."],
          ["Can I book something other than a wedding?", "Yes. We help with birthdays, girls’ nights, bridal showers, bachelorette parties, wine nights, corporate gatherings, and other private celebrations."],
        ].map(([question, answer]) => <details key={question} className="rounded-xl border border-neutral-200 p-6"><summary className="cursor-pointer font-semibold">{question}</summary><p className="mt-4 leading-relaxed text-neutral-600">{answer}</p></details>)}</div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-2xl border border-[#efcfda] bg-[#fce8ef] p-8 text-[#54283c]">
          <h2 className="mb-4 text-3xl">Planning a nonalcoholic celebration?</h2>
          <p className="mb-6 max-w-3xl leading-relaxed">Our dirty soda catering brings soda, syrups, cream, fruit, ice, and hosts to your event. Explore sample drinks and packages for all kinds of gatherings.</p>
          <Link href="/dirty-soda-bar" className="inline-block rounded-full bg-[#99365c] px-7 py-4 font-semibold text-white">Explore Dirty Soda Catering</Link>
        </div>
        <nav aria-label="Event planning pages" className="mt-8 flex flex-wrap gap-6 text-sm underline underline-offset-4"><Link href="/weddings">Wedding bar service</Link><Link href="/birthday-parties">Parties and birthdays</Link><Link href="/corporate-events">Corporate events</Link></nav>
      </section>

      {/* FINAL CTA */}
      <section className="bg-black text-white text-center px-6 py-24">
        <h2 className="text-3xl font-semibold mb-4 !text-white">
          Ready to plan your celebration?
        </h2>

        <p className="text-gray-400 mb-6">
          Choose your package, enter your event details, and review your quote.
        </p>

        <Link
          href="/book?service=bartending&tier=signature"
          className="inline-block bg-white text-black px-10 py-4 rounded-sm font-semibold text-lg transition-transform duration-200 hover:scale-[1.03]"
        >
          Check Availability & Get Quote
        </Link>
      </section>

    </main>
  );
}
