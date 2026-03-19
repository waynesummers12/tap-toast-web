export default function CTASection() {
  return (
    <section className="bg-black text-white py-28 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase mb-6">
          Turn Your Event Into the One Everyone Talks About
        </h2>

        <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed">
          Book a premium mobile bar experience with professional bartenders, curated menus,
          and a setup your guests will rave about. Get instant pricing in seconds.
        </p>

        <a
          href="/book"
          className="block w-full md:w-auto text-center bg-[#9C7A2C] hover:bg-[#b3913b] transition-all duration-300 px-8 md:px-12 py-4 rounded-full text-white tracking-[0.12em] uppercase text-sm whitespace-normal wrap-break-word shadow-lg hover:shadow-xl hover:scale-[1.02]"
        >
          Get Your Instant Quote →
        </a>
        <p className="mt-4 text-xs text-gray-400 tracking-[0.12em] uppercase">
          No commitment • Transparent pricing • 60-second quote
        </p>
      </div>
    </section>
  )
}