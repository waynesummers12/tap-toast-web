import Link from "next/link";

export default function BartendingPage() {
  return (
    <>
      {/* PACKAGES */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Bartending Packages
        </h2>
        <p className="text-center text-gray-400 mb-12">
          Choose the perfect experience for your event
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          {/* THE TASTE */}
          <div className="bg-neutral-900/80 p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-semibold mb-2">The Taste</h3>
            <p className="text-gray-400 text-sm mb-3">Mobile bar starter experience</p>
            <p className="text-[#c6a25a] font-medium mb-4">Impressive</p>

            <ul className="space-y-2 text-gray-300 text-sm mb-6">
              <li>✔ 1 professional bartender</li>
              <li>✔ 3 hour service</li>
              <li>✔ Basic setup</li>
              <li className="text-[#c6a25a]">✔ Signature cocktails</li>
              <li className="text-[#c6a25a]">✔ Premium garnishes</li>
            </ul>

            <Link
              href="/book?tier=taste"
              className="inline-block w-full text-center bg-[#c6a25a] text-black py-3 rounded-lg font-semibold"
            >
              Book Now
            </Link>
          </div>

          {/* THE TIPSY */}
          <div className="relative bg-black p-6 rounded-2xl border border-[#c6a25a]">
            <span className="absolute top-3 right-3 text-xs bg-[#c6a25a] text-black px-3 py-1 rounded-full font-semibold">
              MOST POPULAR
            </span>

            <h3 className="text-xl font-semibold mb-2">The Tipsy</h3>
            <p className="text-gray-400 text-sm mb-3">Most popular experience</p>
            <p className="text-white font-medium mb-4">Best value</p>

            <ul className="space-y-2 text-gray-300 text-sm mb-6">
              <li>✔ 2 professional bartenders</li>
              <li>✔ 4 hour service</li>
              <li className="text-[#c6a25a]">✔ Signature cocktails</li>
              <li className="text-[#c6a25a]">✔ Premium garnishes</li>
            </ul>

            <Link
              href="/book?tier=signature"
              className="inline-block w-full text-center bg-[#c6a25a] text-black py-3 rounded-lg font-semibold"
            >
              Book Now
            </Link>
          </div>

          {/* THE TOASTED */}
          <div className="bg-neutral-900/80 p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-semibold mb-2">The Toasted</h3>
            <p className="text-gray-400 text-sm mb-3">Premium full-service experience</p>
            <p className="text-[#c6a25a] font-medium mb-4">Elevated events</p>

            <ul className="space-y-2 text-gray-300 text-sm mb-6">
              <li>✔ 3+ professional bartenders</li>
              <li>✔ 5 hour service</li>
              <li>✔ Full cocktail experience</li>
              <li className="text-[#c6a25a]">✔ Premium garnishes</li>
              <li>✔ Extended setup time</li>
            </ul>

            <Link
              href="/book?tier=premium"
              className="inline-block w-full text-center bg-[#c6a25a] text-black py-3 rounded-lg font-semibold"
            >
              Book Now
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
