import SodaCityPage from "../components/SodaCityPage"

const content = {
  "city": "Denver",
  "slug": "denver",
  "tag": "A bright spot in your event plans.",
  "intro": "From an office celebration to a wedding reception, bring a custom nonalcoholic drink experience to your Denver gathering. We supply the mobile soda bar, hosts, and ingredients. You choose the occasion and your favorite people.",
  "heading": "Make the drinks part of the occasion.",
  "events": [
    [
      "Office celebrations",
      "Plan a soda break for an employee appreciation day, team milestone, or company party. Tell us whether guests will arrive together or visit the bar throughout the event."
    ],
    [
      "Showers & wedding receptions",
      "Offer a playful nonalcoholic option alongside the celebration. Choose your final soda combinations with Jen and coordinate service with the rest of your event."
    ],
    [
      "Birthdays & private parties",
      "Make a home or rented event space feel like your own. Share the layout and guest count so we can discuss the serving location and staffing."
    ]
  ],
  "planheading": "Planning a Denver venue setup",
  "planintro": "For a building, courtyard, or rented event room, access matters as much as the address. These details help us confirm the right setup before event day.",
  "steps": [
    [
      "Check the delivery route",
      "Ask your venue about unloading, parking, doors, elevators, and stairs. Describe the path to the serving area before choosing your setup."
    ],
    [
      "Connect us with your venue",
      "Confirm outside catering permission and identify the person handling arrival and pickup. Share the venue’s setup windows and any access restrictions."
    ],
    [
      "Plan service around your schedule",
      "Tell us about speeches, meals, or scheduled breaks. Jen will confirm staffing, space, and utility needs; outdoor plans also need a weather backup."
    ]
  ],
  "question": "Can the soda bar come to an office or indoor Denver venue?",
  "answer": "Share the venue address, entrance and loading details, and the intended serving area. Jen will confirm whether the selected setup can access the space and what venue arrangements are needed.",
  "description": "Denver dirty soda catering from $780. Explore included ingredients, drink ideas, and practical venue planning for birthdays, showers, weddings, and group events."
}

export const metadata = {
  title: `Dirty Soda Bar Catering in ${content.city} | Tap & Toast`,
  description: content.description,
  alternates: { canonical: `https://www.coloradotapandtoast.com/dirty-soda-bar-${content.slug}` },
}

export default function Page() {
  return <SodaCityPage content={content} />
}
