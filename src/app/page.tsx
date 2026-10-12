import type { Metadata } from "next"
import HomePageContent from "./home/HomePageContent"

export const metadata: Metadata = {
  alternates: { canonical: "https://www.coloradotapandtoast.com/" },
}

export default function HomePage() {
  return <HomePageContent />
}
