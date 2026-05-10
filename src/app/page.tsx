import Image from "next/image"
import Link from "next/link"
import HeroSection from "./home/HeroSection"
import StorySection from "./home/StorySection"
import TrailerSection from "./home/TrailerSection"
import PackagesSection from "./home/PackagesSection"
import FAQSection from "./home/FAQSection"
import CTASection from "./home/CTASection"
import Footer from "./home/Footer"

export default function HomePage() {
  return (
    <main className="bg-black text-white selection:bg-[#c9a14a] selection:text-black">
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
            <p className="text-sm text-gray-400 mb-4">
              Serving areas across Colorado including 
              <Link href="/dirty-soda-bar-denver" className="text-[#c9a14a] underline ml-1">Denver</Link>,
              <Link href="/dirty-soda-bar-lakewood" className="text-[#c9a14a] underline ml-1">Lakewood</Link>,
              <Link href="/dirty-soda-bar-parker" className="text-[#c9a14a] underline ml-1">Parker</Link>,
              <Link href="/dirty-soda-bar-highlands-ranch" className="text-[#c9a14a] underline ml-1">Highlands Ranch</Link>, and
              <Link href="/dirty-soda-bar-centennial" className="text-[#c9a14a] underline ml-1">Centennial</Link>.
            </p>

            <Link
              href="/book"
              prefetch
              className="inline-block bg-[#c9a14a] text-black px-6 py-3 rounded-md font-semibold hover:opacity-90 transition"
            >
              Check Availability & Pricing
            </Link>

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
              quality={80}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-neutral-950 text-white py-20 px-6 will-change-transform">
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

            {/* Featured Testimonial */}
            <div className="md:col-span-2 bg-black p-8 rounded-2xl border border-white/10 shadow-xl">
              <div className="flex mb-4 text-[#c9a14a]">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="text-lg text-gray-200 mb-6">
                &quot;Tap &amp; Toast made our wedding feel completely effortless. The bartending was incredible, the setup looked amazing, and our guests are still talking about it weeks later.&quot;
              </p>
              <p className="text-sm text-gray-400">— Sarah & Michael, Denver Wedding</p>
            </div>

            {/* Side Testimonials */}
            <div className="flex flex-col gap-6">

              <div className="bg-black p-6 rounded-xl border border-white/10">
                <div className="text-[#c9a14a] mb-3">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-300 mb-4 text-sm">
                  &quot;Super professional, easy to work with, and everything ran smoothly from start to finish.&quot;
                </p>
                <p className="text-xs text-gray-400">— Corporate Event, Boulder</p>
              </div>

              <div className="bg-black p-6 rounded-xl border border-white/10">
                <div className="text-[#c9a14a] mb-3">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-300 mb-4 text-sm">
                  &quot;Best decision we made for our party. The setup, drinks, and service were all top tier.&quot;
                </p>
                <p className="text-xs text-gray-400">— Private Party, Littleton</p>
              </div>

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
