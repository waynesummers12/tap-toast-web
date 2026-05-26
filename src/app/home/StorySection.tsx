import Image from 'next/image';

export default function StorySection() {
  return (
    <section className="bg-white text-black py-28 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="flex justify-center">
          <Image
            src="/wayneandjen.jpg"
            alt="Wayne and Jen - Tap & Toast Mobile Bar"
            width={320}
            height={320}
            className="object-cover rounded-full border-10 border-[#9C7A2C] shadow-2xl"
            style={{ width: '320px', height: '320px' }}
          />
        </div>

        {/* Text */}
        <div>
          <h2 className="text-4xl md:text-5xl font-light tracking-[0.35em] text-[#9C7A2C] mb-6 uppercase">
            Our Story
          </h2>

          <div className="w-16 h-px bg-[#9C7A2C]/70 mb-10" />

          <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-6 tracking-[0.02em]">
            Hi, I&apos;m Jen! As a business owner in the beauty industry, I&apos;ve spent years creating personalized, high-touch experiences for my clients — something I now bring into every Tap & Toast event.
          </p>

          <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-6 tracking-[0.02em]">
            My background includes working weddings and events as a server, where I learned firsthand how important the details, timing, and guest experience are to making an event feel seamless and unforgettable.
          </p>

          <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-10 tracking-[0.02em]">
            Tap & Toast is about more than drinks — it&apos;s about creating an elevated, fun, and memorable atmosphere your guests will talk about long after the event is over.
          </p>

          <p className="text-sm text-gray-500 italic mb-8">
            Thoughtfully crafted experiences. Effortlessly unforgettable events.
          </p>

          <a
            href="#packages"
            className="inline-block border border-[#9C7A2C] bg-[#9C7A2C]/90 hover:bg-[#b3913b] hover:border-[#b3913b] text-white px-10 py-4 rounded-full tracking-[0.3em] uppercase text-xs transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Check Out Our Packages
          </a>
        </div>
      </div>
    </section>
  )
}