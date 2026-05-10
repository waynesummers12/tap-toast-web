

import Image from "next/image";

export default function FounderSection() {
  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden border border-white/10">
          <Image
            src="/jen-bartending-1.jpg"
            alt="Jen bartending for Tap & Toast"
            width={800}
            height={900}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a14a] mb-4">
            Behind Tap & Toast
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight">
            Built with Experience. Designed for Unforgettable Events.
          </h2>

          <p className="text-gray-300 mb-4">
            Tap & Toast is built on the belief that great events should feel effortless — for you and your guests.
          </p>

          <p className="text-gray-300 mb-4">
            Jen leads the experience, bringing a warm, polished bartending style that elevates everything from weddings to private celebrations.
          </p>

          <p className="text-gray-300 mb-6">
            Behind the scenes, Wayne brings a background in building high-performing systems and client experiences — ensuring every detail is handled seamlessly from booking to last call.
          </p>

          {/* Subtle credibility row */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-400">
            <span>✔ Professional Bartending</span>
            <span>✔ Seamless Booking</span>
            <span>✔ Colorado-Based</span>
          </div>
        </div>
      </div>
    </section>
  );
}