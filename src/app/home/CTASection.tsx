export default function CTASection() {
  return (
    <section className="bg-black text-white py-28 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-light tracking-[0.25em] uppercase mb-8">
          Let&apos;s Get This Party Started
        </h2>

        <p className="text-lg text-gray-300 mb-10 leading-relaxed">
          Whether you&apos;re planning a wedding, private party, or corporate
          celebration, Tap & Toast Mobile Bar brings an unforgettable
          experience to your event.
        </p>

        <a
          href="/book"
          className="inline-block bg-[#9C7A2C] hover:bg-[#b3913b] transition px-12 py-4 rounded-full text-white tracking-[0.25em] uppercase text-sm"
        >
          Book Instantly with Real Quote
        </a>
      </div>
    </section>
  )
}