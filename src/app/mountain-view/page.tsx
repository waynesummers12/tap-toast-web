import Image from "next/image"
import Link from "next/link"

const packages = [
  {
    name: "Classic",
    price: "$1,195",
    href: "/book?venue=mountain-view&package=classic",
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
    name: "Signature",
    price: "$1,495",
    href: "/book?venue=mountain-view&package=signature",
    description:
      "Our most chosen package for a personalized bar experience.",
    popular: true,
    features: [
      "Everything in Classic",
      "Two signature cocktails",
      "Cocktail recipe planning",
      "Custom cocktail/bar menu",
      "Signature drink shopping guidance",
    ],
  },
]

const venueDetails = [
  "Packages include 1 bartender for up to 100 guests.",
  "101+ guests: additional bartender required — $250.",
  "Package pricing reflects bartending service; client-provided consumables are not included.",
]

export default function MountainViewPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f5ee] text-[#14263d]">
      <style>{`
        body > header,
        body > nav {
          display: none !important;
        }

        .mountain-view-serif {
          font-family: Georgia, "Times New Roman", serif;
        }
      `}</style>

      <header className="absolute inset-x-0 top-0 z-30 border-b border-white/25 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <div className="min-w-0">
            <p className="mountain-view-serif truncate text-base sm:text-xl">
              Mountain View Menagerie
            </p>
            <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#f0d59c] sm:text-[11px]">
              Preferred Bartending Experience
            </p>
          </div>
          <Link
            href="#packages"
            className="shrink-0 border border-[#ddc18b] bg-[#f8f5ee]/95 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#14263d] transition hover:bg-white sm:px-6 sm:text-xs"
          >
            Plan Your Bar
          </Link>
        </div>
      </header>

      <section className="relative flex min-h-170 items-end sm:min-h-190 lg:min-h-205">
        <Image
          src="/Mountain View Bartending Service.jpg"
          alt="Colorado Tap & Toast bars in front of Mountain View Menagerie at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_center] sm:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,27,47,0.92)_0%,rgba(10,27,47,0.64)_48%,rgba(10,27,47,0.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(9,22,38,0.75)_0%,transparent_48%,rgba(9,22,38,0.42)_100%)]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-36 text-white sm:px-10 sm:pb-20 lg:px-12 lg:pb-24">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#f0d59c] sm:text-sm">
              Mountain View Menagerie
            </p>
            <h1 className="mountain-view-serif mt-4 text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
              Preferred Bartending Experience
            </h1>
            <div className="my-7 flex max-w-xl items-center gap-4 text-[#f0d59c]">
              <span className="h-px flex-1 bg-current/60" />
              <span className="mountain-view-serif text-xl italic">in partnership with</span>
              <span className="h-px flex-1 bg-current/60" />
            </div>
            <p className="mountain-view-serif text-2xl sm:text-3xl">
              Colorado Tap &amp; Toast
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 sm:text-sm">
              Premium Bar Service
            </p>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20 text-center sm:py-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-16 w-px bg-[#c9a96a]" />
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#477ca5]">
            Exclusively for Mountain View weddings
          </p>
          <h2 className="mountain-view-serif mt-6 text-4xl uppercase leading-tight sm:text-6xl lg:text-7xl">
            You Bring the Drinks.
          </h2>
          <p className="mountain-view-serif mt-2 text-3xl italic text-[#477ca5] sm:text-5xl">
            We bring the experience.
          </p>
          <div className="mx-auto my-8 h-px max-w-32 bg-[#c9a96a]" />
          <p className="mx-auto max-w-2xl text-lg leading-8 text-[#425064]">
            Flat-rate professional bartending created exclusively for Mountain
            View Menagerie weddings.
          </p>
          <p className="mt-3 font-semibold text-[#244f72]">
            You bring the drinks — we bring the expertise, service and celebration.
          </p>
        </div>
      </section>

      <section id="packages" className="bg-[#eee9df] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#477ca5]">
              Flat-Rate Service
            </p>
            <h2 className="mountain-view-serif mt-4 text-4xl sm:text-6xl">
              Two Ways to Celebrate
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            {packages.map((pkg) => (
              <article
                key={pkg.name}
                className={`relative flex flex-col border bg-[#fcfaf5] px-6 pb-8 pt-10 sm:px-10 sm:pb-10 ${
                  pkg.popular
                    ? "border-[#477ca5] shadow-[0_18px_50px_rgba(20,38,61,0.12)]"
                    : "border-[#cfbb91]"
                }`}
              >
                {pkg.popular && (
                  <p className="absolute inset-x-0 top-0 bg-[#477ca5] py-2 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white">
                    Most Popular
                  </p>
                )}
                <div className={`text-center ${pkg.popular ? "pt-6" : ""}`}>
                  <h3 className="mountain-view-serif text-4xl uppercase tracking-[0.08em] sm:text-5xl">
                    {pkg.name}
                  </h3>
                  <p className="mountain-view-serif mt-4 text-5xl text-[#477ca5] sm:text-6xl">
                    {pkg.price}
                  </p>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.26em] text-[#6f624d]">
                    Flat-Rate Service
                  </p>
                </div>
                <div className="my-8 flex items-center gap-3 text-[#c9a96a]">
                  <span className="h-px flex-1 bg-current/60" />
                  <span className="text-xs">◆</span>
                  <span className="h-px flex-1 bg-current/60" />
                </div>
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#477ca5]">
                  Includes
                </p>
                <ul className="flex-1 space-y-3.5 text-[#34445a]">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 leading-6">
                      <span aria-hidden="true" className="mt-0.5 text-[#b4904f]">◆</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="mountain-view-serif mt-8 border-t border-[#ddcfb4] pt-6 text-center text-lg italic leading-7 text-[#365f80]">
                  {pkg.description}
                </p>
                <Link
                  href={pkg.href}
                  className={`mt-7 block border px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] transition ${
                    pkg.popular
                      ? "border-[#315f84] bg-[#315f84] text-white hover:bg-[#244b6b]"
                      : "border-[#14263d] text-[#14263d] hover:bg-[#14263d] hover:text-white"
                  }`}
                >
                  Select {pkg.name}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-105 lg:min-h-155">
          <Image
            src="/wedding-bar.jpg"
            alt="A bride and wedding guests enjoying drinks from Colorado Tap & Toast"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex items-center bg-[#f8f5ee] px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#477ca5]">
              Your celebration, your way
            </p>
            <h2 className="mountain-view-serif mt-5 text-4xl uppercase leading-tight sm:text-5xl">
              Your Bar. Your Drinks. Your Budget.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#425064]">
              You supply the alcohol, mixers, ice, garnishes, cups, napkins and
              straws. We&apos;ll provide a customized shopping list so you know
              exactly what to purchase.
            </p>
            <div className="mt-10 border-l-2 border-[#c9a96a] pl-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#315f84]">
                Includes Setup &amp; Cleanup
              </h3>
              <p className="mountain-view-serif mt-3 text-2xl leading-9">
                We handle the setup and breakdown so you can enjoy every moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#ddcfb4] px-6 py-20 sm:px-10 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#477ca5]">
              Before the toast
            </p>
            <h2 className="mountain-view-serif mt-4 text-4xl sm:text-5xl">
              Mountain View Details
            </h2>
            <ul className="mt-8 divide-y divide-[#ddcfb4] border-y border-[#ddcfb4]">
              {venueDetails.map((detail) => (
                <li key={detail} className="flex gap-4 py-5 leading-7 text-[#425064]">
                  <span aria-hidden="true" className="text-[#b4904f]">◆</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="border border-[#cfbb91] bg-white/60 p-7 sm:p-10 lg:self-center">
            <p className="text-xs font-bold uppercase leading-6 tracking-[0.24em] text-[#477ca5]">
              Professional. TIPS-Certified. Fully Insured.
            </p>
            <div className="my-6 h-px w-20 bg-[#c9a96a]" />
            <p className="mountain-view-serif text-3xl leading-10 text-[#14263d]">
              Thoughtful service for an unforgettable venue.
            </p>
            <p className="mt-5 leading-7 text-[#566173]">
              Alcohol service and timing are subject to Mountain View
              Menagerie&apos;s venue policies.
            </p>
          </aside>
        </div>
      </section>

      <section className="relative isolate px-6 py-24 text-center text-white sm:py-32">
        <Image
          src="/trailer-wedding.jpg"
          alt="Colorado Tap & Toast serving guests at an elegant outdoor wedding"
          fill
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[#10243c]/85" />
        <div className="mx-auto max-w-3xl">
          <p className="mountain-view-serif text-4xl italic text-[#f0d59c] sm:text-5xl">
            Ready to Celebrate?
          </p>
          <h2 className="mountain-view-serif mt-5 text-4xl leading-tight sm:text-6xl">
            Your Mountain View bar experience starts here.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
            We can&apos;t wait to be part of your unforgettable day at Mountain
            View Menagerie.
          </p>
          <Link
            href="#packages"
            className="mt-9 inline-block border border-[#e1c68d] bg-[#e1c68d] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#14263d] transition hover:bg-[#f2dda9] sm:px-10"
          >
            Let&apos;s Plan Your Bar Experience
          </Link>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 text-sm tracking-[0.08em] text-white/80 sm:flex-row sm:gap-6">
            <a href="tel:7206439690" className="transition hover:text-white">
              720-643-9690
            </a>
            <span aria-hidden="true" className="hidden text-[#e1c68d] sm:inline">◆</span>
            <a
              href="mailto:jen@coloradotapandtoast.com"
              className="transition hover:text-white"
            >
              jen@coloradotapandtoast.com
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0c1b2d] px-6 py-6 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
        Mountain View Menagerie × Colorado Tap &amp; Toast
      </footer>
    </main>
  )
}