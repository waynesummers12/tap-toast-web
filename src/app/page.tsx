import Image from "next/image"
import HeroSection from "./home/HeroSection"
import StorySection from "./home/StorySection"
import TrailerSection from "./home/TrailerSection"
import PackagesSection from "./home/PackagesSection"
import FAQSection from "./home/FAQSection"
import CTASection from "./home/CTASection"
import Footer from "./home/Footer"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StorySection />

      {/* PREMIUM FOUNDER SECTION */}
      <section className="bg-black text-white py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">

          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-[#c9a14a] mb-4">
              Behind the Business
            </p>

            <h2 className="text-3xl md:text-5xl font-semibold mb-6 leading-tight">
              Effortless for You.
              <br />
              Unforgettable for Your Guests.
            </h2>

            <p className="text-gray-300 mb-5 text-lg">
              Tap & Toast is designed for hosts who want a seamless, elevated event — without the stress of managing the details.
            </p>

            <p className="text-gray-300 mb-5">
              Jen brings the energy, hospitality, and attention to detail that turns a great event into something guests talk about long after it ends.
            </p>

            <p className="text-gray-300 mb-6">
              Behind the scenes, Wayne ensures everything runs seamlessly — from instant booking and transparent pricing to flawless execution on event day.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300 mb-6">
              <p>✓ Fast & Easy Booking</p>
              <p>✓ Professional, Experienced Bartenders</p>
              <p>✓ Premium Mobile Bar Experience</p>
              <p>✓ Trusted Across Colorado Events</p>
            </div>

            <p className="text-sm text-gray-400 mb-4">
              Limited dates available — most weekends book out in advance.
            </p>

            <a
              href="/book"
              className="inline-block bg-[#c9a14a] text-black px-6 py-3 rounded-md font-semibold hover:opacity-90 transition"
            >
              Check Availability & Pricing
            </a>

            <p className="text-sm text-gray-400 mt-4">
              &quot;Everything was seamless — our guests loved it.&quot; ⭐⭐⭐⭐⭐
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/jen-wayne-main.jpg"
              alt="Jen and Wayne – Colorado Tap & Toast founders"
              width={900}
              height={900}
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-neutral-950 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.35em] uppercase text-[#c9a14a] mb-3">
              What Clients Are Saying
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold">
              Trusted by Events Across Colorado
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-black p-6 rounded-xl border border-white/10">
              <p className="text-gray-300 mb-4">
                &quot;Tap & Toast made our wedding feel effortless. The bartending was incredible and our guests are still talking about it.&quot;
              </p>
              <p className="text-sm text-gray-400">— Wedding Client</p>
            </div>

            <div className="bg-black p-6 rounded-xl border border-white/10">
              <p className="text-gray-300 mb-4">
                &quot;Super professional, easy to work with, and everything ran smoothly from start to finish. Highly recommend.&quot;
              </p>
              <p className="text-sm text-gray-400">— Corporate Event</p>
            </div>

            <div className="bg-black p-6 rounded-xl border border-white/10">
              <p className="text-gray-300 mb-4">
                &quot;Best decision we made for our party. The setup, the drinks, the service — all top tier.&quot;
              </p>
              <p className="text-sm text-gray-400">— Private Party</p>
            </div>

          </div>

        </div>
      </section>

      <TrailerSection />
      <PackagesSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
