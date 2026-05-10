import Image from "next/image"

export const metadata = {
  title: "Wedding Mobile Bar Service | Tap & Toast",
  description:
    "Tap & Toast provides luxury mobile bar service for weddings across Colorado. Professional bartenders, custom drink menus, and an unforgettable bar experience for your big day.",
}

export default function WeddingsPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#c7a45a] selection:text-black">

      {/* HERO */}
      <section className="px-8 py-28 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        <div>
          <h1 className="text-5xl md:text-7xl font-semibold mb-6 leading-tight">
            Wedding Mobile Bar Service
          </h1>

          <p className="text-lg md:text-xl max-w-xl text-gray-300 leading-relaxed">
            Tap & Toast brings a luxury mobile bar experience to weddings across
            Colorado. Our professional bartenders, elegant bar trailer, and
            customizable drink menus help make your wedding celebration truly
            unforgettable.
          </p>

          <div className="mt-10">
            <a
              href="/book"
              className="bg-[#c7a45a] text-black px-10 py-5 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(199,164,90,0.4)]"
            >
              Get a Wedding Quote
            </a>
          </div>
        </div>

        <div>
          <Image
            src="/wedding-bar.jpg"
            alt="Tap & Toast Wedding Mobile Bar Experience"
            width={700}
            height={500}
            className="rounded-2xl object-cover shadow-2xl border border-white/10"
            priority
          />
        </div>

      </section>

      {/* FEATURES */}
      <section className="px-8 pb-28 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

        <div className="bg-neutral-900/70 backdrop-blur p-8 rounded-2xl border border-white/10 hover:border-[#c7a45a] transition">
          <h3 className="text-xl font-semibold mb-3">Custom Cocktail Menus</h3>
          <p className="opacity-70">
            Work with our bartenders to create signature cocktails for your
            wedding that reflect your style and story.
          </p>
        </div>

        <div className="bg-neutral-900/70 backdrop-blur p-8 rounded-2xl border border-white/10 hover:border-[#c7a45a] transition">
          <h3 className="text-xl font-semibold mb-3">Professional Bartenders</h3>
          <p className="opacity-70">
            Our experienced bartenders provide friendly, professional service
            so you and your guests can relax and celebrate.
          </p>
        </div>

        <div className="bg-neutral-900/70 backdrop-blur p-8 rounded-2xl border border-white/10 hover:border-[#c7a45a] transition">
          <h3 className="text-xl font-semibold mb-3">Beautiful Mobile Bar</h3>
          <p className="opacity-70">
            Our stylish mobile bar trailer becomes a centerpiece of your
            reception while serving drinks efficiently for guests.
          </p>
        </div>

      </section>

      {/* WHY COUPLES CHOOSE US */}
      <section className="px-8 pb-28 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12">Why Couples Choose Tap & Toast</h2>

        <ul className="grid md:grid-cols-2 gap-6 text-lg text-gray-300">
          <li>• Elegant mobile bar trailer</li>
          <li>• Professional licensed bartenders</li>
          <li>• Custom cocktail menus</li>
          <li>• Fast guest service</li>
          <li>• Perfect for indoor or outdoor venues</li>
          <li>• Flexible packages for any wedding size</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="px-8 pb-32 max-w-6xl mx-auto">
        <div className="bg-[#c7a45a] text-black p-12 md:p-16 rounded-3xl shadow-[0_20px_60px_rgba(199,164,90,0.3)]">

          <h2 className="text-3xl font-bold mb-4">
            Make Your Wedding Bar Unforgettable
          </h2>

          <p className="mb-8 text-lg">
            Tap & Toast handles everything from setup to service so you can
            focus on enjoying your wedding day with family and friends.
          </p>

          <a
            href="/book"
            className="block w-full md:w-auto text-center bg-black text-white px-10 py-5 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300"
          >
            Reserve Your Wedding Date
          </a>

        </div>
      </section>

    </main>
  )
}