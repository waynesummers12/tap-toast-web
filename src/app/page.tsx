import HeroSection from "./home/HeroSection"
import StorySection from "./home/StorySection"
import FounderSection from "./home/FounderSection"
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
      <FounderSection />
      <TrailerSection />
      <PackagesSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
