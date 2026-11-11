import type { Metadata } from "next"
import HomePageContent from "./home/HomePageContent"

export const metadata: Metadata = {
  title: "Colorado Mobile Bar & Trailer Rentals | Tap & Toast",
  description: "Mobile bar service, professional bartenders, and DIY trailer rentals for weddings and parties in Golden, Denver, Boulder, and across Colorado’s Front Range.",
  alternates: { canonical: "https://www.coloradotapandtoast.com/" },
}

export default function HomePage() {
  return <HomePageContent />
}
