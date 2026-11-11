import SodaCityPage from "../components/SodaCityPage"

const content = {
  "city": "Lakewood",
  "slug": "lakewood",
  "tag": "Bring a little fizz to your favorite gathering.",
  "intro": "From a backyard birthday to a school celebration or family reunion in Lakewood, give guests a place to gather over custom soda drinks. Our hosts bring the bar and ingredients so you can focus on enjoying the occasion.",
  "heading": "Small moments. Big reasons to celebrate.",
  "events": [
    [
      "Family reunions & birthdays",
      "Give family and friends a drink stop between food, games, and catching up. Start with a few flavor ideas, then confirm your menu with Jen."
    ],
    [
      "School & team celebrations",
      "Celebrate a graduation, a season, or a group milestone. Share the expected guest count and serving window, and confirm the space with your organizer."
    ],
    [
      "Showers & neighborhood parties",
      "Make a bridal shower or neighborhood get-together feel special. For a shared space, arrange venue permission and clear access for setup."
    ]
  ],
  "planheading": "A little planning for your Lakewood gathering",
  "planintro": "Hosting outside or in a shared space? A clear location, schedule, and backup plan help us prepare for your day.",
  "steps": [
    [
      "Confirm the site",
      "Send the exact address and your preferred bar location. If you’re considering a park or shared facility, confirm outside catering and access with the site manager first."
    ],
    [
      "Share the ground and access details",
      "Let us know about gates, steps, narrow paths, or an uneven serving area. Jen will confirm whether your chosen setup is suitable and discuss space and utility needs."
    ],
    [
      "Arrange timing and shelter",
      "Coordinate setup and pickup times with the organizer. For an outdoor gathering, discuss suitable shelter and a weather backup before event day."
    ]
  ],
  "question": "Can I plan soda catering for an outdoor Lakewood gathering?",
  "answer": "Tell us the proposed location and access details. For a park or shared space, confirm permission with the site manager. Jen will review suitability, setup requirements, and your weather backup with you.",
  "description": "Lakewood dirty soda catering from $780. Explore included ingredients, drink ideas, and practical venue planning for birthdays, showers, weddings, and group events."
}

export const metadata = {
  title: `Dirty Soda Bar Catering in ${content.city} | Tap & Toast`,
  description: content.description,
  alternates: { canonical: `https://www.coloradotapandtoast.com/dirty-soda-bar-${content.slug}` },
}

export default function Page() {
  return <SodaCityPage content={content} />
}
