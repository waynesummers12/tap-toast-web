

export const metadata = {
  title: "Wedding Mobile Bar Service | Tap & Toast",
  description:
    "Tap & Toast provides luxury mobile bar service for weddings across Colorado. Professional bartenders, custom drink menus, and an unforgettable bar experience for your big day.",
}

export default function WeddingsPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="px-8 py-24 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Wedding Mobile Bar Service
        </h1>

        <p className="text-xl max-w-3xl opacity-80 leading-relaxed">
          Tap & Toast brings a luxury mobile bar experience to weddings across
          Colorado. Our professional bartenders, elegant bar trailer, and
          customizable drink menus help make your wedding celebration truly
          unforgettable.
        </p>

        <div className="mt-10">
          <a
            href="/book"
            className="bg-[#c7a45a] text-black px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition"
          >
            Get a Wedding Quote
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-8 pb-24 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        <div className="bg-zinc-900 p-8 rounded-xl">
          <h3 className="text-xl font-semibold mb-3">Custom Cocktail Menus</h3>
          <p className="opacity-70">
            Work with our bartenders to create signature cocktails for your
            wedding that reflect your style and story.
          </p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-xl">
          <h3 className="text-xl font-semibold mb-3">Professional Bartenders</h3>
          <p className="opacity-70">
            Our experienced bartenders provide friendly, professional service
            so you and your guests can relax and celebrate.
          </p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-xl">
          <h3 className="text-xl font-semibold mb-3">Beautiful Mobile Bar</h3>
          <p className="opacity-70">
            Our stylish mobile bar trailer becomes a centerpiece of your
            reception while serving drinks efficiently for guests.
          </p>
        </div>

      </section>

      {/* WHY COUPLES CHOOSE US */}
      <section className="px-8 pb-24 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Why Couples Choose Tap & Toast</h2>

        <ul className="grid md:grid-cols-2 gap-6 text-lg opacity-80">
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
        <div className="bg-[#c7a45a] text-black p-12 rounded-2xl">

          <h2 className="text-3xl font-bold mb-4">
            Make Your Wedding Bar Unforgettable
          </h2>

          <p className="mb-8 text-lg">
            Tap & Toast handles everything from setup to service so you can
            focus on enjoying your wedding day with family and friends.
          </p>

          <a
            href="/book"
            className="bg-black text-white px-8 py-4 rounded-lg font-semibold"
          >
            Reserve Your Wedding Date
          </a>

        </div>
      </section>

    </main>
  )
}