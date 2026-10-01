import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Wedding Mobile Bar Service | Tap & Toast",
  description:
    "Tap & Toast provides luxury mobile bar service for weddings across Colorado. Professional bartenders, custom drink menus, and an unforgettable bar experience for your big day.",
}

export default function WeddingsPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-200 selection:text-black">

      {/* HERO */}
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold mb-6 leading-tight">
            Wedding Mobile Bar Service
          </h1>

          <p className="text-lg md:text-xl max-w-xl text-neutral-600 leading-relaxed">
            Tap & Toast brings a luxury mobile bar experience to weddings across
            Colorado. Our professional bartenders, elegant bar trailer, and
            customizable drink menus help make your wedding celebration truly
            unforgettable.
          </p>

          <div className="mt-10">
            <Link
              href="/book"
              prefetch
              className="bg-black text-white px-8 py-5 rounded-sm font-semibold text-lg hover:scale-105 transition-all duration-300 inline-block"
            >
              Get a Wedding Quote
            </Link>
          </div>
        </div>

        <div>
          <Image
            src="/wedding-bar.jpg"
            alt="Tap & Toast Wedding Mobile Bar Experience"
            width={700}
            height={500}
            className="w-full rounded-sm object-cover border border-neutral-200"
            priority
            quality={80}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

      </section>

      {/* FEATURES */}
      <section className="px-8 pb-28 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

        <div className="bg-neutral-950 text-white p-8 rounded-sm border border-neutral-800 hover:border-neutral-500 transition">
          <h3 className="text-xl font-semibold mb-3">Custom Cocktail Menus</h3>
          <p className="opacity-70">
            Work with our bartenders to create signature cocktails for your
            wedding that reflect your style and story.
          </p>
        </div>

        <div className="bg-neutral-950 text-white p-8 rounded-sm border border-neutral-800 hover:border-neutral-500 transition">
          <h3 className="text-xl font-semibold mb-3">Professional Bartenders</h3>
          <p className="opacity-70">
            Our experienced bartenders provide friendly, professional service
            so you and your guests can relax and celebrate.
          </p>
        </div>

        <div className="bg-neutral-950 text-white p-8 rounded-sm border border-neutral-800 hover:border-neutral-500 transition">
          <h3 className="text-xl font-semibold mb-3">Beautiful Mobile Bar</h3>
          <p className="opacity-70">
            Our stylish mobile bar trailer becomes a centerpiece of your
            reception while serving drinks efficiently for guests.
          </p>
        </div>

      </section>

      {/* WHY COUPLES CHOOSE US */}
      <section className="px-8 pb-28 max-w-7xl mx-auto will-change-transform">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12">Why Couples Choose Tap & Toast</h2>

        <ul className="grid md:grid-cols-2 gap-6 text-lg text-neutral-600">
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
        <div className="bg-black text-white p-6 sm:p-12 md:p-16 rounded-sm">

          <h2 className="text-3xl font-bold mb-4">
            Make Your Wedding Bar Unforgettable
          </h2>

          <p className="mb-8 text-lg">
            Tap & Toast handles everything from setup to service so you can
            focus on enjoying your wedding day with family and friends.
          </p>

          <Link
            href="/book"
            prefetch
            className="block w-full md:w-auto text-center bg-white text-black px-6 py-5 rounded-sm font-semibold text-lg hover:scale-105 transition-all duration-300"
          >
            Reserve Your Wedding Date
          </Link>

        </div>
      </section>

    </main>
  )
}