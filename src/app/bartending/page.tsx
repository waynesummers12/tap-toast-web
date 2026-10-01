import Image from "next/image";
import Link from "next/link";
import Packages from "./packages";


export default function BartendingPage() {
  return (
    <main className="bg-white text-neutral-950 selection:bg-neutral-200 selection:text-black">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs tracking-[0.3em] text-neutral-600 mb-4">
            PREMIUM BARTENDING EXPERIENCE
          </p>

          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
            Professional Bartenders for
            <br />
            Weddings & Events
          </h1>

          <p className="text-lg text-neutral-600 mb-6 max-w-lg">
            We bring the bartenders, the experience, and the energy — so you can relax and enjoy your event without worrying about service.
          </p>

          <p className="text-sm text-neutral-600 mb-6">
            ⚡ Limited availability — most weekends book out 2–4 weeks in advance
          </p>

          <div className="relative group flex flex-col sm:flex-row gap-4">
            <Link
              href="/book"
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
            alt="Bartending Service"
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="text-center px-6 pb-12">
        <p className="text-neutral-600 text-sm mb-2">
          ✔ Fast responses · ✔ Instant pricing · ✔ Trusted by Colorado couples & venues
        </p>
        <p className="text-neutral-500 text-xs">
          Fully insured · General & Liquor Liability included
        </p>
      </section>

      <Packages />

      {/* SOCIAL PROOF */}
      <section className="text-center px-6 pb-20 max-w-3xl mx-auto">
        <p className="italic text-lg text-neutral-700 mb-3">
          “We received so many compliments — the bartenders were amazing!”
        </p>
        <p className="text-sm text-neutral-600">— Lopez Wedding</p>
      </section>

      {/* FINAL CTA */}
      <section className="bg-black text-white text-center px-6 py-24">
        <h3 className="text-2xl font-semibold mb-4">
          Ready to lock in your date?
        </h3>

        <p className="text-gray-400 mb-6">
          Check availability and get instant pricing in under 60 seconds.
        </p>

        <Link
          href="/book"
          className="inline-block bg-white text-black px-10 py-4 rounded-sm font-semibold text-lg transition-transform duration-200 hover:scale-[1.03]"
        >
          Check Availability & Get Quote
        </Link>
      </section>

    </main>
  );
}
