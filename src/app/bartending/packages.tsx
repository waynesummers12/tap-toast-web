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
    "group relative overflow-hidden p-6 rounded-sm border transition-all duration-300 hover:scale-[1.03]";

  return (
    <>
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Choose Your Bartending Experience
      </h2>
      <p className="text-center text-neutral-600 mb-12">
        Start simple or go all-out — everything is customizable
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {/* THE TASTE */}
        <div
          className={`${baseCard} bg-neutral-950 text-white ${
            selected === "taste"
              ? "border-white scale-[1.02]"
              : "border-neutral-500 hover:border-neutral-400"
          }`}
        >
          {loading === "taste" && (
            <div className="absolute inset-0 z-10 pointer-events-none rounded-sm bg-linear-to-r from-transparent via-white/40 to-transparent opacity-80 animate-[glassShimmer_1.6s_ease-in-out]" />
          )}
          <div className="absolute inset-0 z-0 pointer-events-none rounded-sm opacity-0 group-hover:opacity-60 bg-linear-to-r from-transparent via-white/20 to-transparent transition-opacity duration-500 animate-[glassShimmer_1.6s_ease-in-out]" />

          <h3 className="text-xl font-semibold mb-2">The Taste</h3>
          <p className="text-gray-400 text-sm mb-2">Mobile bar starter experience</p>
          <p className="text-neutral-200 mb-4">Impressive</p>

          <ul className="space-y-2 text-gray-300 text-sm mb-6">
            <li>✔ 1 professional bartender</li>
            <li>✔ 3 hour service</li>
            <li>✔ Basic setup</li>
            <li className="text-neutral-200">✔ Signature cocktails</li>
            <li className="text-neutral-200">✔ Premium garnishes</li>
          </ul>

          <Link
            href="/book?tier=taste"
            onClick={handleClick("taste", "/book?tier=taste")}
            className="block w-full text-center bg-white text-black py-3 rounded-sm font-semibold transition-all duration-300 group-hover:bg-neutral-200 group-hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/60 active:scale-[0.99]"
          >
            Book This Experience
          </Link>
        </div>

        {/* THE TIPSY (Most Popular) */}
        <div
          className={`${baseCard} bg-black text-white ${
            selected === "signature"
              ? "border-white scale-[1.02]"
              : "border-neutral-400 hover:border-white"
          }`}
        >
          {loading === "signature" && (
            <div className="absolute inset-0 z-10 pointer-events-none rounded-sm bg-linear-to-r from-transparent via-white/40 to-transparent opacity-80 animate-[glassShimmer_1.6s_ease-in-out]" />
          )}
          <div className="absolute inset-0 z-0 pointer-events-none rounded-sm opacity-0 group-hover:opacity-60 bg-linear-to-r from-transparent via-white/20 to-transparent transition-opacity duration-500 animate-[glassShimmer_1.6s_ease-in-out]" />

          <span className="inline-block mb-4 text-xs bg-white text-black px-3 py-1 rounded-full font-semibold">
            MOST POPULAR
          </span>

          <h3 className="text-xl font-semibold mb-2">The Tipsy</h3>
          <p className="text-gray-400 text-sm mb-2">Best value for most events</p>
          <p className="text-white mb-4">Best value</p>

          <ul className="space-y-2 text-gray-300 text-sm mb-6">
            <li>✔ 2 professional bartenders</li>
            <li>✔ 4 hour service</li>
            <li className="text-neutral-200">✔ Signature cocktails</li>
            <li className="text-neutral-200">✔ Premium garnishes</li>
          </ul>

          <Link
            href="/book?tier=signature"
            onClick={handleClick("signature", "/book?tier=signature")}
            className="block w-full text-center bg-white text-black py-3 rounded-sm font-semibold transition-all duration-300 group-hover:bg-neutral-200 group-hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/60 active:scale-[0.99]"
          >
            Book Most Popular
          </Link>
        </div>

        {/* THE TOASTED */}
        <div
          className={`${baseCard} bg-neutral-950 text-white ${
            selected === "premium"
              ? "border-white scale-[1.02]"
              : "border-neutral-500 hover:border-neutral-400"
          }`}
        >
          {loading === "premium" && (
            <div className="absolute inset-0 z-10 pointer-events-none rounded-sm bg-linear-to-r from-transparent via-white/40 to-transparent opacity-80 animate-[glassShimmer_1.6s_ease-in-out]" />
          )}
          <div className="absolute inset-0 z-0 pointer-events-none rounded-sm opacity-0 group-hover:opacity-60 bg-linear-to-r from-transparent via-white/20 to-transparent transition-opacity duration-500 animate-[glassShimmer_1.6s_ease-in-out]" />

          <h3 className="text-xl font-semibold mb-2">The Toasted</h3>
          <p className="text-gray-400 text-sm mb-2">Premium full-service experience</p>
          <p className="text-neutral-200 mb-4">Elevated events</p>

          <ul className="space-y-2 text-gray-300 text-sm mb-6">
            <li>✔ 3+ professional bartenders</li>
            <li>✔ 5 hour service</li>
            <li>✔ Full cocktail experience</li>
            <li className="text-neutral-200">✔ Premium garnishes</li>
            <li>✔ Extended setup time</li>
          </ul>

          <Link
            href="/book?tier=premium"
            onClick={handleClick("premium", "/book?tier=premium")}
            className="block w-full text-center bg-white text-black py-3 rounded-sm font-semibold transition-all duration-300 group-hover:bg-neutral-200 group-hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/60 active:scale-[0.99]"
          >
            Get Premium Experience
          </Link>
        </div>
      </div>
    </section>

    <style jsx global>{`
    @keyframes glassShimmer {
      0% {
        transform: translateX(-120%) skewX(-20deg);
        opacity: 0;
      }
      20% {
        opacity: 0.6;
      }
      50% {
        opacity: 0.9;
      }
      80% {
        opacity: 0.6;
      }
      100% {
        transform: translateX(120%) skewX(-20deg);
        opacity: 0;
      }
    }
    `}</style>
  </>
  );
}