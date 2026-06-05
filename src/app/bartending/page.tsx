import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function BartendingPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

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

      {/* PACKAGES */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Choose Your Bartending Experience
        </h2>
        <p className="text-center text-gray-400 mb-12">
          Start simple or go all-out — everything is customizable
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          {/* THE TASTE */}
          <div className={`group relative overflow-hidden bg-neutral-900/80 p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(198,162,90,0.2)] ${selected === "taste" ? "border-[#d4af37] shadow-[0_0_40px_rgba(198,162,90,0.4)] scale-[1.02]" : "border-white/10 hover:border-[#c6a25a]"}`}>
            {loading === "taste" && (
              <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-transparent via-white/10 to-transparent animate-pulse" />
            )}
            <h3 className="text-xl font-semibold mb-2">The Taste</h3>
            <p className="text-gray-400 text-sm mb-2">Mobile bar starter experience</p>
            <p className="text-[#c6a25a] mb-4">Impressive</p>

            <ul className="space-y-2 text-gray-300 text-sm mb-6">
              <li>✔ 1 professional bartender</li>
              <li>✔ 3 hour service</li>
              <li>✔ Basic setup</li>
              <li className="text-[#c6a25a]">✔ Signature cocktails</li>
              <li className="text-[#c6a25a]">✔ Premium garnishes</li>
            </ul>

            <Link
              href="/book?tier=taste"
              onClick={(e) => {
                e.preventDefault();
                setSelected("taste");
                setLoading("taste");
                setTimeout(() => {
                  window.location.href = "/book?tier=taste";
                }, 250);
              }}
              className="block w-full text-center bg-[#c6a25a] text-black py-3 rounded-lg font-semibold transition-all duration-300 group-hover:bg-[#d4af37] group-hover:scale-[1.02]"
            >
              Book This Experience
            </Link>
          </div>

          {/* THE TIPSY */}
          <div className={`group relative overflow-hidden bg-black p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(198,162,90,0.3)] ${selected === "signature" ? "border-[#d4af37] shadow-[0_0_50px_rgba(198,162,90,0.5)] scale-[1.02]" : "border-[#c6a25a] hover:border-[#d4af37]"}`}>
            {loading === "signature" && (
              <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-transparent via-white/10 to-transparent animate-pulse" />
            )}
            <span className="absolute top-3 right-3 text-xs bg-[#c6a25a] text-black px-3 py-1 rounded-full font-semibold">
              MOST POPULAR
            </span>

            <h3 className="text-xl font-semibold mb-2">The Tipsy</h3>
            <p className="text-gray-400 text-sm mb-2">Best value for most events</p>
            <p className="text-white mb-4">Best value</p>

            <ul className="space-y-2 text-gray-300 text-sm mb-6">
              <li>✔ 2 professional bartenders</li>
              <li>✔ 4 hour service</li>
              <li className="text-[#c6a25a]">✔ Signature cocktails</li>
              <li className="text-[#c6a25a]">✔ Premium garnishes</li>
            </ul>

            <Link
              href="/book?tier=signature"
              onClick={(e) => {
                e.preventDefault();
                setSelected("signature");
                setLoading("signature");
                setTimeout(() => {
                  window.location.href = "/book?tier=signature";
                }, 250);
              }}
              className="block w-full text-center bg-[#c6a25a] text-black py-3 rounded-lg font-semibold transition-all duration-300 group-hover:bg-[#d4af37] group-hover:scale-[1.02]"
            >
              Book Most Popular
            </Link>
          </div>

          {/* THE TOASTED */}
          <div className={`group relative overflow-hidden bg-neutral-900/80 p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(198,162,90,0.2)] ${selected === "premium" ? "border-[#d4af37] shadow-[0_0_40px_rgba(198,162,90,0.4)] scale-[1.02]" : "border-white/10 hover:border-[#c6a25a]"}`}>
            {loading === "premium" && (
              <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-transparent via-white/10 to-transparent animate-pulse" />
            )}
            <h3 className="text-xl font-semibold mb-2">The Toasted</h3>
            <p className="text-gray-400 text-sm mb-2">Premium full-service experience</p>
            <p className="text-[#c6a25a] mb-4">Elevated events</p>

            <ul className="space-y-2 text-gray-300 text-sm mb-6">
              <li>✔ 3+ professional bartenders</li>
              <li>✔ 5 hour service</li>
              <li>✔ Full cocktail experience</li>
              <li className="text-[#c6a25a]">✔ Premium garnishes</li>
              <li>✔ Extended setup time</li>
            </ul>

            <Link
              href="/book?tier=premium"
              onClick={(e) => {
                e.preventDefault();
                setSelected("premium");
                setLoading("premium");
                setTimeout(() => {
                  window.location.href = "/book?tier=premium";
                }, 250);
              }}
              className="block w-full text-center bg-[#c6a25a] text-black py-3 rounded-lg font-semibold transition-all duration-300 group-hover:bg-[#d4af37] group-hover:scale-[1.02]"
            >
              Get Premium Experience
            </Link>
          </div>

        </div>
      </section>

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
