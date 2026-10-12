import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Dirty Soda Bar Catering in Parker | Tap & Toast",
  description: "Mobile dirty soda bar catering for birthdays, weddings, and celebrations in Parker, Colorado. Custom nonalcoholic drinks and staff. Get a soda party quote.",
  alternates: { canonical: "https://www.coloradotapandtoast.com/dirty-soda-bar-parker" },
}

export default function ParkerLayout({ children }: { children: ReactNode }) {
  return children
}
