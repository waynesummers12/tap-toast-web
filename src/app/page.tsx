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
              Built for Effortless Events.
              <br />
              Engineered to Feel Premium.
            </h2>

            <p className="text-gray-300 mb-5 text-lg">
              Tap & Toast is more than a mobile bar — it’s a carefully designed experience.
            </p>

            <p className="text-gray-300 mb-5">
              Jen brings the energy, hospitality, and attention to detail that guests remember long after the event ends.
            </p>

            <p className="text-gray-300 mb-6">
              Behind the scenes, Wayne ensures everything runs seamlessly — from instant booking and pricing to flawless execution on event day.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-400 mb-6">
              <p>✓ Seamless Booking Experience</p>
              <p>✓ Professional Bartending</p>
              <p>✓ Premium Mobile Setup</p>
              <p>✓ Colorado-Based & Local</p>
            </div>

            <a
              href="/book"
              className="inline-block bg-[#c9a14a] text-black px-6 py-3 rounded-md font-semibold hover:opacity-90 transition"
            >
              Get Your Quote
            </a>
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

      <TrailerSection />
      <PackagesSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
