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
      <div className="absolute inset-0 bg-black/55" />

      {/* content */}
      <div className="relative z-10 px-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-light tracking-[0.25em] uppercase mb-6">
          Let’s Toast To
        </h1>

        <h2 className="text-5xl md:text-7xl font-semibold tracking-widest mb-10">
          Slow Sips and Sweet Memories
        </h2>

        <p className="text-lg md:text-xl mb-10 opacity-90">
          Luxury mobile bar experiences for weddings, parties, and unforgettable celebrations.
        </p>

        <Link
          href="/book"
          className="inline-block bg-[#9C7A2C] hover:bg-[#b3913b] transition px-10 py-4 rounded-full text-white tracking-[0.25em] uppercase text-sm"
        >
          Book Instantly with Real Quote
        </Link>
      </div>
    </section>
  )
}