import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <>
      <section
        className="relative w-full min-h-[85vh] md:h-[90vh] flex items-center justify-center text-center text-white"
      >
        <Image
          src="/trailer-wedding.jpg"
          alt="Luxury mobile bar trailer at wedding event"
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover"
        />
        {/* dark overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70 backdrop-blur-[1px]" />

        {/* content */}
        <div className="relative z-10 px-6 max-w-2xl will-change-transform animate-[fadeIn_0.8s_ease-out]">
          <h1 className="text-sm md:text-base font-light tracking-[0.45em] uppercase mb-6 text-white/80">
            Premium Mobile Bar Experience
          </h1>

          <h2 className="text-2xl md:text-5xl font-semibold tracking-[0.05em] md:tracking-[0.08em] mb-4 md:mb-6 leading-tight">
            Colorado’s Most Loved Mobile Bar for Weddings & Events
          </h2>
          <div className="mx-auto mb-8 h-px w-16 bg-[#9C7A2C]/70" />

          <p className="text-sm md:text-lg mb-6 md:mb-10 text-white/80 leading-relaxed">
            We bring the bar, the bartenders, and the experience — so you can relax and enjoy every moment. Fully customized for your event.
          </p>

          <Link
            href="/book"
            prefetch
            aria-label="Book mobile bar service and get instant quote"
            className="inline-block border border-[#9C7A2C] bg-[#9C7A2C]/90 hover:bg-[#b3913b] hover:border-[#b3913b] transition-all duration-300 px-8 md:px-10 py-4 rounded-full text-white tracking-[0.2em] md:tracking-[0.35em] uppercase text-xs md:text-xs shadow-lg hover:shadow-xl"
          >
            Check Availability & Get Instant Quote
          </Link>
          <p className="text-sm text-white/80 mt-4 md:mt-6 italic">
            “We received so many compliments — the bartenders were amazing!” — Lopez Wedding
          </p>

          <p className="text-xs text-white/70 mt-4">
            No hidden fees · Transparent pricing · 5-star experience
          </p>

          <p className="text-sm text-white font-semibold mt-4 md:mt-6">
            ⚡ Limited availability — most weekends book out 2–4 weeks in advance
          </p>

          <p className="text-xs md:text-sm text-white font-semibold bg-black/60 backdrop-blur-sm px-3 md:px-4 py-2 rounded-md inline-block mt-2">
            ✔ Fast responses &nbsp;&nbsp;✔ Instant pricing &nbsp;&nbsp;✔ Trusted by Colorado couples & venues
          </p>
          <p className="text-xs md:text-sm text-white/90 mt-2 md:mt-3 font-medium">
            ✔ Fully Insured — General & Liquor Liability Included
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-neutral-50 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.35em] uppercase text-[#9C7A2C] mb-3">
              Two Ways to Book
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold mb-4">
              Choose Your Experience
            </h2>
            <p className="text-base md:text-lg text-gray-500">
              Full service or DIY — we’ve got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Full Service */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-black/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h4 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
                🍸 Full-Service Experience
                <span className="text-[10px] bg-[#9C7A2C] text-white px-2 py-1 rounded-full ring-1 ring-[#9C7A2C]/40 shadow-[0_0_0px_rgba(156,122,44,0.0)] animate-[pulse_3s_ease-in-out_infinite]">
                  Most Popular
                </span>
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                We handle everything — bartenders, setup, and service — so you can enjoy your event stress-free.
              </p>
              <p className="text-[#9C7A2C] font-semibold mt-4 text-lg">Starting at $900</p>
              <p className="text-xs text-gray-500 mb-4">Best for weddings & large events</p>
              <Link
                href="/book?type=full"
                className="inline-block mt-2 px-6 py-3 bg-[#9C7A2C] text-white rounded-full text-xs tracking-[0.2em] uppercase hover:bg-[#b3913b] transition"
              >
                Book Full Service
              </Link>
            </div>

            {/* Trailer Rental */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-black/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h4 className="text-lg font-semibold mb-2">🚐 Trailer Rental (DIY)</h4>
              <p className="text-sm text-gray-600 mb-4">
                Rent our tap trailer or pop-up bar and create your own experience — perfect for DIY events, private parties, and budget-friendly setups.
              </p>
              <p className="text-[#9C7A2C] font-semibold mt-4 text-lg">Starting at $600</p>
              <p className="text-xs text-gray-500 mb-4">Great for backyard parties & DIY setups</p>
              <Link
                href="/book?type=rental"
                className="inline-block mt-2 px-6 py-3 border border-[#9C7A2C] text-[#9C7A2C] rounded-full text-xs tracking-[0.2em] uppercase hover:bg-[#9C7A2C] hover:text-white transition"
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