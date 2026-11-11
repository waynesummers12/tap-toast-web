import SodaCityPage from "../components/SodaCityPage"

const content = {
  "city": "Littleton",
  "slug": "littleton",
  "tag": "A sweet addition to a day worth sharing.",
  "intro": "Bring custom nonalcoholic drinks to a Littleton bridal shower, birthday, graduation, or wedding. We supply the hosts, mobile soda bar, and ingredients for a celebration that feels personal from the first sip.",
  "heading": "Gather, sip, and make it yours.",
  "events": [
    [
      "Bridal showers & girls’ nights",
      "Add a playful drink menu to an afternoon with friends. Talk through flavors and dietary preferences with Jen before finalizing your selections."
    ],
    [
      "Graduations & open-house parties",
      "Expecting guests to come and go? Share the arrival window and total guest count so we can discuss service hours and staffing."
    ],
    [
      "Weddings & milestone birthdays",
      "Give guests a nonalcoholic option they can customize. Coordinate the soda service with meals, speeches, and the other moments you have planned."
    ]
  ],
  "planheading": "Planning your Littleton open house or party",
  "planintro": "The guest count is only part of the picture. Tell us how your gathering will unfold so we can help plan the soda service.",
  "steps": [
    [
      "Describe the guest flow",
      "Will everyone arrive at once or drop in over several hours? Share both the expected headcount and the busiest part of the day."
    ],
    [
      "Choose the serving location",
      "Tell us where guests will gather and how we can reach the space. Flag gates, stairs, parking restrictions, or shared entrances before confirming the setup."
    ],
    [
      "Confirm the final details",
      "Coordinate arrival and pickup with your venue. Jen will confirm space and utility needs for the selected setup; agree on a weather backup if you’re hosting outdoors."
    ]
  ],
  "question": "How should I plan an open-house graduation party?",
  "answer": "Share the full guest count, arrival window, and the hours you want drinks served. Jen can discuss staffing and service time with you. Confirm access, the serving location, and an outdoor backup before the event.",
  "description": "Littleton dirty soda catering from $780. Explore included ingredients, drink ideas, and practical venue planning for birthdays, showers, weddings, and group events."
}

export const metadata = {
  title: `Dirty Soda Bar Catering in ${content.city} | Tap & Toast`,
  description: content.description,
  alternates: { canonical: `https://www.coloradotapandtoast.com/dirty-soda-bar-${content.slug}` },
}

export default function Page() {
  return <SodaCityPage content={content} />
}
