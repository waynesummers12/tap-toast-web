'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function TrailerSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = ref.current;

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section className="bg-black text-white py-24 px-6">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center transition-opacity duration-700 ease-out ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >

        {/* Image */}
        <div className={`flex justify-center transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
        }`}>
          <Image
            src="/trailer-wedding.jpg"
            alt="Tap & Toast Mobile Bar Trailer"
            width={640}
            height={427}
            className="w-full max-w-lg rounded-xl shadow-2xl transition-transform duration-500 ease-out hover:scale-[1.02]"
            priority
          />
        </div>

        {/* Text */}
        <div className={`transition-all duration-700 ease-out delay-200 will-change-transform ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl font-light tracking-[0.2em] text-[#9C7A2C] mb-6 uppercase">
            About The Trailer
          </h2>

          <div className="w-32 h-0.5 mb-8 bg-linear-to-r from-transparent via-[#9C7A2C] to-transparent shadow-[0_0_12px_rgba(156,122,44,0.5)]" />

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
            className={`inline-block bg-[#9C7A2C] hover:bg-[#b3913b] text-white px-10 py-4 rounded-full tracking-[0.25em] uppercase text-sm transition-all duration-300 hover:scale-105 shadow-[0_0_10px_rgba(156,122,44,0.4)] ${
              visible ? 'animate-[pulse_2.5s_ease-in-out_infinite] delay-500' : ''
            }`}
          >
            Check Availability
          </a>
        </div>
      </div>
    </section>
  )
}