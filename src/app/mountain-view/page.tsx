import Link from "next/link"
import Image from "next/image"

const packages = [
  {
    name: "CLASSIC",
    price: "$1,195",
    description: "Perfect for couples who want great service and the basics.",
    features: [
      "Up to 5 hours of bar service",
      "TIPS-certified bartender",
      "Beer & Wine",
      "Simple mixed drinks (two ingredients max)",
      "Two different kinds of mixed drinks",
      "Custom alcohol & supply shopping list",
      "Professional bar setup & cleanup",
      "General & liquor liability insurance",
    ],
  },
  {
    name: "SIGNATURE",
    price: "$1,495",
    popular: true,
    description:
      "Our most chosen package for a personalized bar experience.",
    features: [
      "Everything in Classic",
      "Two signature cocktails",
      "Cocktail recipe planning",
      "Custom cocktail/bar menu",
      "Signature drink shopping guidance",
      "Elevated wedding bar experience",
    ],
  },
  {
    name: "TAP & TOAST EXPERIENCE",
    price: "$1,895",
    description: "Elevated style. Unforgettable from start to finish.",
    features: [
      "Everything in Signature",
      "Choose your mobile bar experience",
      "Premium bar presentation",
      "Two signature cocktails",
      "Custom cocktail/bar menu",
      "Our most memorable experience",
    ],
  },
]

export default function MountainViewPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#17253a]">

      <style>{`
        body > header,
        body > nav {
          display: none !important;
        }
      `}</style>

      {/* DEDICATED MOUNTAIN VIEW HEADER */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#17253a]/95 text-white backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div className="min-w-0">
            <p className="truncate font-serif text-lg font-semibold sm:text-xl">
              Mountain View Menagerie
            </p>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d5b369] sm:text-xs">
              × Colorado Tap & Toast
            </p>
          </div>

          <Link
            href="/book?venue=mountain-view"
            className="shrink-0 rounded-full bg-[#b28b38] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#c0973d] sm:px-6 sm:py-3"
          >
            Check Your Date
          </Link>
        </div>
      </div>

      {/* HERO */}
      <section className="relative min-h-155 overflow-hidden border-b border-[#d9d0c3] md:min-h-180">
        <Image
          src="/Mountain View Bartending Service.jpg"
          alt="Mountain View Menagerie with Colorado Tap & Toast mobile bar experiences"
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-linear-to-r from-[#0f1d30]/90 via-[#0f1d30]/62 to-[#0f1d30]/20" />
        <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-black/10" />

        <div className="relative z-10 mx-auto flex min-h-155 max-w-6xl items-center px-6 py-16 md:min-h-180 md:py-20">
          <div className="max-w-2xl text-left text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#d9bc7d]">
              Mountain View Menagerie
            </p>

            <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight md:text-7xl">
              Preferred Bartending Experience
            </h1>

            <div className="my-6 flex max-w-md items-center gap-4 text-[#d9bc7d]">
              <div className="h-px flex-1 bg-[#d9bc7d]/70" />
              <span className="text-lg">×</span>
              <div className="h-px flex-1 bg-[#d9bc7d]/70" />
            </div>

            <p className="text-sm uppercase tracking-[0.3em] text-white/80">
              Colorado Tap & Toast
            </p>

            <h2 className="mt-2 font-serif text-4xl font-bold uppercase md:text-5xl">
              Premium Bar Service
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/88">
              Exclusive flat-rate bartending packages created specifically for Mountain View Menagerie weddings.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#packages"
                className="rounded-full bg-[#315d87] px-8 py-4 text-center text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:-translate-y-1 hover:bg-[#274d70]"
              >
                Explore Packages
              </a>

              <Link
                href="/book?venue=mountain-view"
                className="rounded-full bg-[#b28b38] px-8 py-4 text-center text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:-translate-y-1 hover:bg-[#c0973d]"
              >
                Check Your Date
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN MESSAGE */}
      <section className="px-6 py-16 text-center md:py-20">
        <div className="mx-auto max-w-4xl">

          <h2 className="font-serif text-4xl font-bold uppercase tracking-wide md:text-6xl">
            You Bring the Drinks.
          </h2>

          <p className="mt-2 font-serif text-3xl italic text-[#315d87] md:text-4xl">
            We bring the experience.
          </p>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8">
            Flat-rate professional bartending created exclusively for
            Mountain View Menagerie weddings.
          </p>

          <p className="mt-2 font-semibold text-[#315d87]">
            You bring the drinks — we bring the expertise, service and celebration.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#packages"
              className="rounded-full bg-[#315d87] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:-translate-y-1 hover:bg-[#274d70]"
            >
              Explore Packages
            </a>

            <Link
              href="/book?venue=mountain-view"
              className="rounded-full border border-[#b28b38] bg-[#b28b38] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:-translate-y-1"
            >
              Check Your Date
            </Link>
          </div>

        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#315d87]">
              Exclusive Wedding Packages
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold">
              Choose Your Bar Experience
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">

            {packages.map((pkg) => (
              <article
                key={pkg.name}
                className={`relative flex h-full flex-col rounded-3xl border bg-white p-8 shadow-lg ${
                  pkg.popular
                    ? "border-[#315d87] ring-2 ring-[#315d87]/10"
                    : "border-[#ded6c9]"
                }`}
              >

                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#315d87] px-7 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white">
                    Most Popular
                  </div>
                )}

                <div className="text-center">

                  <h3 className="font-serif text-3xl font-bold">
                    {pkg.name}
                  </h3>

                  <p className="mt-4 font-serif text-5xl text-[#315d87]">
                    {pkg.price}
                  </p>

                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em]">
                    Flat-Rate Service
                  </p>

                </div>

                <div className="my-7 h-px bg-[#ded6c9]" />

                <ul className="flex-1 space-y-3">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 leading-6"
                    >
                      <span className="mt-0.5 text-[#315d87]">♥</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 text-center font-serif italic leading-6 text-[#315d87]">
                  {pkg.description}
                </p>

                <Link
                  href="/book?venue=mountain-view"
                  className={`mt-7 block rounded-xl px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.12em] transition ${
                    pkg.popular
                      ? "bg-[#315d87] text-white hover:bg-[#274d70]"
                      : "bg-[#efe7da] hover:bg-[#e5d9c7]"
                  }`}
                >
                  Select {pkg.name}
                </Link>

              </article>
            ))}

          </div>
        </div>
      </section>

      {/* BYOB */}
      <section className="border-y border-[#ded6c9] bg-white px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#315d87]">
              ♡ Your Bar. Your Drinks. Your Budget.
            </p>

            <h2 className="mt-4 font-serif text-4xl font-semibold">
              You supply the drinks.
              <br />
              We handle the experience.
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#4d596b]">
              You supply the alcohol, mixers, ice, garnishes, cups,
              napkins and straws. We&apos;ll provide a customized shopping
              list so you know exactly what to purchase.
            </p>
          </div>

          <div className="rounded-3xl bg-[#f2ede5] p-9">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#315d87]">
              ✓ Includes Setup & Cleanup
            </p>

            <h3 className="mt-4 font-serif text-3xl font-semibold">
              Enjoy your celebration.
            </h3>

            <p className="mt-4 text-lg leading-8 text-[#4d596b]">
              We handle the setup and breakdown so you can enjoy every moment.
            </p>

          </div>

        </div>
      </section>

      {/* VENUE DETAILS */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">

          <div className="rounded-3xl border border-[#ded6c9] bg-white p-8">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#315d87]">
              Mountain View Details
            </p>

            <ul className="mt-6 space-y-4 leading-7">
              <li>♥ Packages include 1 bartender for up to 100 guests.</li>
              <li>♥ 101+ guests: additional bartender required — $250.</li>
              <li>
                ♥ Additional service hour — $150, subject to venue
                alcohol-service cutoff.
              </li>
              <li>♥ Alcohol-service cutoff — hard stop at 10PM.</li>
              <li>
                ♥ Mobile Bar Experience upgrade — $495 when not included
                in package.
              </li>
            </ul>

          </div>

          <div className="rounded-3xl border border-[#ded6c9] bg-white p-8">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#315d87]">
              Professional. TIPS-Certified. Fully Insured.
            </p>

            <h3 className="mt-5 font-serif text-3xl font-semibold">
              Celebrate with confidence.
            </h3>

            <p className="mt-5 leading-7 text-[#4d596b]">
              Alcohol service and timing are subject to Mountain View
              Menagerie&apos;s venue policies.
            </p>

            <p className="mt-4 leading-7 text-[#4d596b]">
              Package pricing reflects bartending service;
              client-provided consumables are not included.
            </p>

          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#17253a] px-6 py-20 text-center text-white">

        <div className="mx-auto max-w-3xl">

          <p className="font-serif text-4xl italic text-[#d5b369]">
            Ready to Celebrate?
          </p>

          <h2 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">
            Let&apos;s plan your bar experience.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/75">
            We can&apos;t wait to be part of your unforgettable day at
            Mountain View Menagerie.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/book?venue=mountain-view"
              className="rounded-full bg-[#b28b38] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:-translate-y-1"
            >
              Start Your Booking
            </Link>

            <a
              href="tel:7206439690"
              className="rounded-full border border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] transition hover:bg-white/10"
            >
              Call 720-643-9690
            </a>

          </div>

          <p className="mt-7 text-sm text-white/65">
            jen@coloradotapandtoast.com
          </p>

        </div>

      </section>

    </main>
  )
}
