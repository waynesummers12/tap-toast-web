import Image from 'next/image';

export default function TrailerSection() {
  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Image */}
        <div className="flex justify-center">
          <Image
            src="/trailer.jpg"
            alt="Tap & Toast Mobile Bar Trailer"
            width={640}
            height={427}
            className="w-full max-w-lg rounded-xl shadow-2xl"
            priority
          />
        </div>

        {/* Text */}
        <div>
          <h2 className="text-5xl font-light tracking-[0.2em] text-[#9C7A2C] mb-6 uppercase">
            About The Trailer
          </h2>

          <div className="w-16 h-[2px] bg-white mb-8" />

          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Our custom Tap & Toast mobile bar trailer brings a luxury bar
            experience directly to your event. Designed with style and
            functionality in mind, it features a multi‑tap system perfect
            for serving craft cocktails, beer, wine, prosecco, and more.
          </p>

          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Whether you&#39;re hosting a wedding, corporate event, birthday
            party, or backyard celebration, our trailer creates an
            unforgettable focal point that elevates the entire atmosphere.
          </p>

          <ul className="space-y-3 text-gray-300 mb-10">
            <li>• 4‑Tap Beverage System</li>
            <li>• Custom Cocktail & Drink Options</li>
            <li>• Professional Bartending Service</li>
            <li>• Beautiful Mobile Bar Setup</li>
          </ul>

          <a
            href="/book"
            className="inline-block bg-[#9C7A2C] hover:bg-[#b3913b] text-white px-10 py-4 rounded-full tracking-[0.25em] uppercase text-sm transition"
          >
            Check Availability
          </a>
        </div>
      </div>
    </section>
  )
}