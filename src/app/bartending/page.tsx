import Image from "next/image";
import Link from "next/link";
import Packages from "./packages";


export default function BartendingPage() {
  return (
    <main className="bg-black text-white selection:bg-[#c6a25a] selection:text-black">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs tracking-[0.3em] text-white/60 mb-4">
            PREMIUM BARTENDING EXPERIENCE
          </p>

          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
            Professional Bartenders for
            <br />
            Weddings & Events
          </h1>

          <p className="text-lg text-gray-300 mb-6 max-w-lg">
            We bring the bartenders, the experience, and the energy — so you can relax and enjoy your event without worrying about service.
          </p>

          <p className="text-sm text-[#c6a25a] mb-6">
            ⚡ Limited availability — most weekends book out 2–4 weeks in advance
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/book"
              className="bg-[#c6a25a] text-black px-8 py-4 rounded-xl font-semibold text-lg text-center transition-transform duration-200 hover:scale-[1.03]"
            >
              Check Availability
            </Link>

            <a
              href="tel:7206439690"
              className="border border-white/20 px-6 py-3 rounded-lg font-semibold text-center transition-transform duration-200 hover:scale-[1.03]"
            >
              Call Now
            </a>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10">
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
        <p className="text-white/70 text-sm mb-2">
          ✔ Fast responses · ✔ Instant pricing · ✔ Trusted by Colorado couples & venues
        </p>
        <p className="text-white/50 text-xs">
          Fully insured · General & Liquor Liability included
        </p>
      </section>

      <Packages />

      {/* SOCIAL PROOF */}
      <section className="text-center px-6 pb-20 max-w-3xl mx-auto">
        <p className="italic text-lg text-white/80 mb-3">
          “We received so many compliments — the bartenders were amazing!”
        </p>
        <p className="text-sm text-white/60">— Lopez Wedding</p>
      </section>

      {/* FINAL CTA */}
      <section className="text-center px-6 pb-24">
        <h3 className="text-2xl font-semibold mb-4">
          Ready to lock in your date?
        </h3>

        <p className="text-gray-400 mb-6">
          Check availability and get instant pricing in under 60 seconds.
        </p>

        <Link
          href="/book"
          className="inline-block bg-[#c6a25a] text-black px-10 py-4 rounded-xl font-semibold text-lg transition-transform duration-200 hover:scale-[1.03]"
        >
          Check Availability & Get Quote
        </Link>
      </section>

    </main>
  );
}
