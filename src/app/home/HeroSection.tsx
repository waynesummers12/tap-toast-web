import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section
      className="relative w-full h-[90vh] flex items-center justify-center text-center text-white"
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

        <h2 className="text-3xl md:text-5xl font-semibold tracking-[0.08em] mb-6 leading-tight">
          Colorado’s Most Loved Mobile Bar for Weddings & Events
        </h2>
        <div className="mx-auto mb-8 h-px w-16 bg-[#9C7A2C]/70" />

        <p className="text-base md:text-lg mb-10 text-white/80 leading-relaxed">
          We bring the bar, the bartenders, and the experience — so you can relax and enjoy every moment. Fully customized for your event.
        </p>

        <Link
          href="/book"
          prefetch
          aria-label="Book mobile bar service and get instant quote"
          className="inline-block border border-[#9C7A2C] bg-[#9C7A2C]/90 hover:bg-[#b3913b] hover:border-[#b3913b] transition-all duration-300 px-10 py-4 rounded-full text-white tracking-[0.35em] uppercase text-xs shadow-lg hover:shadow-xl"
        >
          Check Availability & Get Instant Quote
        </Link>

        <p className="text-xs text-white/70 mt-4">
          No hidden fees · Transparent pricing · 5-star experience
        </p>

        <p className="text-sm text-white font-semibold mt-6">
          ⚡ Limited availability — most weekends book out 2–4 weeks in advance
        </p>

        <p className="text-xs md:text-sm text-white font-semibold bg-black/60 backdrop-blur-sm px-4 py-2 rounded-md inline-block mt-2">
          ✔ Fast responses &nbsp;&nbsp;✔ Instant pricing &nbsp;&nbsp;✔ Trusted by Colorado couples & venues
        </p>
        <p className="text-xs md:text-sm text-white/90 mt-3 font-medium">
          ✔ Fully Insured — General & Liquor Liability Included
        </p>
      </div>
    </section>
  )
}