import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <>
      <section className="grid lg:grid-cols-2 bg-white text-neutral-950">
        <div className="flex flex-col justify-center px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
          <p className="text-xs tracking-[0.22em] uppercase mb-7">Premium Mobile Bar Experience</p>
          <h1 className="hero-title mb-7">Colorado’s Most Loved Mobile Bar for Weddings &amp; Events</h1>
          <p className="max-w-lg text-base leading-relaxed text-neutral-600 mb-8">We bring the bar, the bartenders, and the experience — so you can relax and enjoy every moment. Fully customized for your event.</p>
          <Link href="/book" className="w-fit border border-black bg-black text-white px-7 py-4 text-sm">Check Availability &amp; Get Instant Quote</Link>
          <a href="#experiences" className="w-fit mt-4 py-3 text-sm underline underline-offset-4">Compare service options ↓</a>
          <p className="mt-8 max-w-md border-t border-neutral-200 pt-6 text-sm italic text-neutral-600">“We received so many compliments — the bartenders were amazing!” — Lopez Wedding</p>
          <p className="mt-4 text-xs text-neutral-600">Fully Insured — General &amp; Liquor Liability Included</p>
        </div>
        <div className="relative min-h-[360px] sm:min-h-[500px] lg:min-h-[740px]">
          <Image src="/trailer-wedding.jpg" alt="Colorado Tap & Toast mobile bar trailer at an event" fill priority quality={85} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-center" />
        </div>
      </section>

      <section id="experiences" className="py-16 px-6 bg-neutral-50 text-black text-center">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-base md:text-lg tracking-[0.35em] uppercase text-neutral-900 mb-3">
              Two Ways to Book
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold md:font-bold mb-4 tracking-tight text-black">
              Choose Your Experience
            </h2>
            <p className="text-base md:text-lg text-gray-500">
              Full service or DIY — we’ve got you covered
            </p>
          </div>

          <p className="mx-auto max-w-2xl mb-8 text-gray-700 leading-relaxed">Choose full service with bartenders or a DIY trailer rental. For events serving alcohol, you supply the alcohol. Looking for a nonalcoholic option? <Link href="/dirty-soda-bar" className="font-semibold underline underline-offset-4">Explore the Dirty Soda Bar</Link>.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Full Service */}
            <div className="bg-white rounded-sm p-6 shadow-md border border-[#c9a14a]/20 ring-1 ring-[#c9a14a]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <h4 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
                🍸 Full-Service Experience
                <span className="group relative overflow-hidden text-[10px] bg-neutral-950 text-white px-2 py-1 rounded-sm ring-1 ring-[#9C7A2C]/40">
                  <span className="relative z-10">Most Popular</span>
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_2.5s]" />
                </span>
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                We handle everything — bartenders, setup, and service — so you can enjoy your event stress-free.
              </p>
              <p className="text-neutral-900 font-semibold mt-4 text-lg">Starting at $900</p>
              <p className="mt-2 inline-block text-xs px-2 py-1 rounded-md bg-[#c9a14a]/10 border border-[#c9a14a]/20 text-black font-medium">
                ✔ Full setup, bartenders & service included
              </p>
              <p className="text-xs text-gray-500 mb-4 mt-2">
                🥂 Best for weddings, corporate events & large gatherings
              </p>
              <Link
                href="/book?type=full"
                className="inline-block mt-2 px-6 py-3 bg-neutral-950 text-white rounded-sm text-xs tracking-[0.2em] uppercase shadow-lg hover:bg-neutral-800 hover:shadow-xl transition"
              >
                Book Full Service
              </Link>
            </div>

            {/* Trailer Rental */}
            <div className="bg-white rounded-sm p-6 shadow-md border border-black/5 ring-1 ring-[#c9a14a]/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h4 className="text-lg font-semibold mb-2">🚐 Trailer Rental (DIY)</h4>
              <p className="text-sm text-gray-600 mb-4">
                Rent our tap trailer or pop-up bar and create your own experience — perfect for DIY events, private parties, and budget-friendly setups.
              </p>
              <p className="text-neutral-900 font-semibold mt-4 text-lg">Starting at $600</p>
              <p className="mt-2 inline-block text-xs px-2 py-1 rounded-md bg-[#c9a14a]/10 border border-[#c9a14a]/20 text-black font-medium">
                ✔ Includes setup + delivery within 40 miles of Golden
              </p>
              <p className="text-xs text-gray-500 mb-4 mt-2">
                🎉 Perfect for backyard parties, DIY weddings & private events
              </p>
              <Link
                href="/book?type=rental"
                className="inline-block mt-2 px-6 py-3 border border-neutral-300 text-neutral-900 rounded-sm text-xs tracking-[0.2em] uppercase hover:bg-neutral-950 hover:text-white transition"
              >
                Rent the Trailer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}