

import Image from 'next/image';

export default function StorySection() {
  return (
    <section className="bg-white text-black py-24 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <h2 className="text-5xl font-light tracking-[0.2em] text-[#9C7A2C] mb-6 uppercase">
            Our Story
          </h2>

          <div className="w-16 h-0.5 bg-black mb-8" />

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Hi, I&apos;m Jen! With over 15 years in the hospitality industry,
            I bring a deep passion for bartending and crafting unique cocktails
            right to your doorstep.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            My mission is to create memorable experiences for every event,
            ensuring each moment is special and enjoyable.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            I&apos;m excited to bring the party to you with our mobile bar,
            turning any gathering into an unforgettable celebration.
          </p>

          <a
            href="#packages"
            className="inline-block bg-[#9C7A2C] hover:bg-[#b3913b] text-white px-10 py-4 rounded-full tracking-[0.25em] uppercase text-sm transition"
          >
            Check Out Our Packages
          </a>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <Image
            src="/wayneandjen.jpg"
            alt="Wayne and Jen - Tap & Toast Mobile Bar"
            width={320}
            height={320}
            className="object-cover rounded-full border-8 border-[#9C7A2C]"
            style={{ width: '320px', height: '320px' }}
          />
        </div>
      </div>
    </section>
  )
}