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

      {/* WAYNE STORY */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a14a] mb-4">
              Behind the Business
            </p>

            <h2 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight">
              Built to Run Smoothly — From First Click to Last Call
            </h2>

            <p className="text-gray-300 mb-4">
              While Jen creates the experience guests remember, Wayne focuses on making sure everything behind the scenes runs effortlessly.
            </p>

            <p className="text-gray-300 mb-4">
              With a background in building systems, managing operations, and delivering high-quality customer experiences at scale, Wayne ensures every Tap & Toast event is seamless from booking to execution.
            </p>

            <p className="text-gray-300">
              The result is a mobile bar experience that feels personal, polished, and completely stress-free for every client.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10">
            <Image
              src="/jen-wayne-main.jpg"
              alt="Tap & Toast team"
              width={800}
              height={800}
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
