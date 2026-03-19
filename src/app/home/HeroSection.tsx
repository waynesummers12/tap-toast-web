import Link from "next/link"

export default function HeroSection() {
  return (
    <section
      className="relative w-full h-[90vh] flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: "url('/hero-trailer.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70 backdrop-blur-[2px]" />

      {/* content */}
      <div className="relative z-10 px-6 max-w-2xl">
        <h1 className="text-sm md:text-base font-light tracking-[0.45em] uppercase mb-6 text-white/80">
          Let’s Toast To
        </h1>

        <h2 className="text-3xl md:text-5xl font-semibold tracking-[0.08em] mb-6 leading-tight">
          Slow Sips and Sweet Memories
        </h2>
        <div className="mx-auto mb-8 h-px w-16 bg-[#9C7A2C]/70" />

        <p className="text-base md:text-lg mb-10 text-white/80 leading-relaxed">
          Luxury mobile bar experiences for weddings, parties, and unforgettable celebrations.
        </p>

        <Link
          href="/book"
          className="inline-block border border-[#9C7A2C] bg-[#9C7A2C]/90 hover:bg-[#b3913b] hover:border-[#b3913b] transition-all duration-300 px-10 py-4 rounded-full text-white tracking-[0.35em] uppercase text-xs shadow-lg hover:shadow-xl"
        >
          Book Instantly with Real Quote
        </Link>
      </div>
    </section>
  )
}