"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Packages() {
  type Tier = "taste" | "signature" | "premium";
  const router = useRouter();

  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const handleClick = (tier: Tier, href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setSelected(tier);
    setLoading(tier);
    // brief micro-delay for visual feedback (selected + shimmer)
    setTimeout(() => {
      router.push(href);
    }, 250);
  };

  const baseCard =
    "group relative overflow-hidden p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.03]";

  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Choose Your Bartending Experience
      </h2>
      <p className="text-center text-gray-400 mb-12">
        Start simple or go all-out — everything is customizable
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {/* THE TASTE */}
        <div
          className={`${baseCard} bg-neutral-900/80 ${
            selected === "taste"
              ? "border-[#d4af37] shadow-[0_0_40px_rgba(198,162,90,0.4)] scale-[1.02]"
              : "border-white/10 hover:border-[#c6a25a] hover:shadow-[0_0_30px_rgba(198,162,90,0.2)]"
          }`}
        >
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
            onClick={handleClick("taste", "/book?tier=taste")}
            className="block w-full text-center bg-[#c6a25a] text-black py-3 rounded-lg font-semibold transition-all duration-300 group-hover:bg-[#d4af37] group-hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#c6a25a]/60 active:scale-[0.99]"
          >
            Book This Experience
          </Link>
        </div>

        {/* THE TIPSY (Most Popular) */}
        <div
          className={`${baseCard} bg-black ${
            selected === "signature"
              ? "border-[#d4af37] shadow-[0_0_50px_rgba(198,162,90,0.5)] scale-[1.02]"
              : "border-[#c6a25a] hover:border-[#d4af37] hover:shadow-[0_0_40px_rgba(198,162,90,0.3)]"
          }`}
        >
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
            onClick={handleClick("signature", "/book?tier=signature")}
            className="block w-full text-center bg-[#c6a25a] text-black py-3 rounded-lg font-semibold transition-all duration-300 group-hover:bg-[#d4af37] group-hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#c6a25a]/60 active:scale-[0.99]"
          >
            Book Most Popular
          </Link>
        </div>

        {/* THE TOASTED */}
        <div
          className={`${baseCard} bg-neutral-900/80 ${
            selected === "premium"
              ? "border-[#d4af37] shadow-[0_0_40px_rgba(198,162,90,0.4)] scale-[1.02]"
              : "border-white/10 hover:border-[#c6a25a] hover:shadow-[0_0_30px_rgba(198,162,90,0.2)]"
          }`}
        >
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
            onClick={handleClick("premium", "/book?tier=premium")}
            className="block w-full text-center bg-[#c6a25a] text-black py-3 rounded-lg font-semibold transition-all duration-300 group-hover:bg-[#d4af37] group-hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#c6a25a]/60 active:scale-[0.99]"
          >
            Get Premium Experience
          </Link>
        </div>
      </div>
    </section>
  );
}