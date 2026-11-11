import Image from "next/image"
import Link from "next/link"
import Breadcrumbs from "../components/Breadcrumbs"

const content = {
  "city": "Centennial",
  "slug": "centennial",
  "tag": "A sweet break from the ordinary.",
  "intro": "Bring people together at your Centennial office celebration, birthday, school gathering, or wedding. We arrive with a mobile soda bar, hosts, and the ingredients for custom nonalcoholic drinks worth gathering around.",
  "heading": "Something for the whole guest list.",
  "events": [
    [
      "Team & company celebrations",
      "Turn an employee appreciation event or company gathering into a chance to connect. Let us know whether service will happen during a break or throughout the event."
    ],
    [
      "School events & graduations",
      "Create a fun drink stop for the celebration. Share the guest count and any venue rules, and discuss dietary preferences with Jen before choosing the menu."
    ],
    [
      "Birthdays, showers & weddings",
      "Bring a playful nonalcoholic option to your celebration. Guests can explore custom flavors while you enjoy time with friends and family."
    ]
  ],
  "planheading": "A smoother plan for your Centennial venue.",
  "planintro": "Organizing a workplace party or using a shared event space? Coordinate the people, access, and schedule before the day arrives.",
  "steps": [
    [
      "Choose a venue contact",
      "Identify who can approve the serving location and outside catering. Share loading access, parking instructions, and any building restrictions."
    ],
    [
      "Plan the service window",
      "Tell us when guests will arrive and whether drinks are needed all at once or over several hours. We’ll discuss hosts and service time for your plans."
    ],
    [
      "Confirm the setup details",
      "Share delivery and pickup windows. Jen will confirm space and utility needs for your selected setup; for outdoor events, discuss shelter and a weather backup."
    ]
  ],
  "question": "What should I confirm for an office or shared venue?",
  "answer": "Ask your venue contact about outside catering, the serving location, loading access, and setup and pickup times. Share the guest count and service schedule with Jen so we can discuss staffing and the right setup.",
  "description": "Centennial dirty soda catering from $780 for company events, birthdays, schools, and weddings. See inclusions, drink ideas, and venue planning guidance."
}
const quote = "/book?service=soda"
const starter = "/book?service=soda&tier=taste"
const button = "inline-flex items-center justify-center rounded-full bg-[#99365c] px-7 py-4 text-center font-semibold text-white transition hover:bg-[#772443] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#99365c]"
export const metadata = { title: `Dirty Soda Bar Catering in ${content.city} | Tap & Toast`, description: content.description, alternates: { canonical: `https://www.coloradotapandtoast.com/dirty-soda-bar-${content.slug}` } }
const faqs = [
  ["Is this a walk-in soda shop?", "We’re a mobile catering service for booked events, not a walk-in soda shop. Our bar and hosts come to your celebration."],
  ["What does the $780 package include?", "The starter package includes a mobile soda bar, one soda host, and three hours of service. We supply soda, syrups, cream, fruit, ice, clear cups, and napkins. Final pricing depends on your selected package, time, staffing, and travel."],
  [content.question, content.answer],
  ["Is travel included?", "Travel within 40 miles of Golden is included. Send your exact venue address so we can confirm travel details and any additional charges before your event."],
  ["Can you accommodate dietary preferences?", "Share allergies and dietary preferences with Jen before booking. Specific ingredients, alternatives, and allergen accommodations must be confirmed in advance."],
  ["What information do I need for a quote?", "Have your event date, venue address, guest count, and preferred service time ready. You can explore packages online or call Jen to discuss setup questions."],
]

export default function LocalSodaPage() {
  return (
    <main className="min-h-screen bg-[#fff8fa] text-[#54283c] selection:bg-[#f5c6d8]">
      <Breadcrumbs items={[{ name: "Dirty Soda Bar", path: "/dirty-soda-bar" }, { name: content.city, path: `/dirty-soda-bar-${content.slug}` }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Service",
        name: `Dirty Soda Bar Catering in ${content.city}`, serviceType: "Dirty Soda Bar Catering", areaServed: content.city,
        provider: { "@type": "Organization", name: "Colorado Tap & Toast", url: "https://www.coloradotapandtoast.com" },
        url: `https://www.coloradotapandtoast.com/dirty-soda-bar-${content.slug}`,
        description: content.description,
      }) }} />
      <section className="overflow-hidden border-b border-[#efcfda] bg-[#fce8ef]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:grid-cols-2 md:py-20 lg:gap-16">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#99365c]">{content.tag}</p>
            <h1 className="mb-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">Dirty Soda Bar Catering<br /><span className="italic text-[#99365c]">in {content.city}</span></h1>
            <p className="max-w-xl text-lg leading-relaxed text-[#704659]">{content.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5"><Link href={quote} className={button}>Plan Your Soda Party</Link><a href="#packages" className="underline underline-offset-4">See what’s included ↓</a></div>
            <p className="mt-6 text-sm text-[#704659]">Starting at $780 · One host · Three hours</p>
          </div>
          <div className="rounded-t-[7rem] rounded-b-3xl border-8 border-white bg-white p-2 shadow-lg shadow-pink-950/5">
            <Image src="/dirty-soda-bar.jpg" alt="A celebration around the Tap & Toast mobile soda bar" width={1200} height={700} priority sizes="(max-width: 768px) 100vw, 50vw" className="aspect-[4/5] w-full rounded-t-[6rem] rounded-b-2xl object-cover" />
            <p className="py-4 text-center text-xl italic">Good company. A little fizz. Your kind of party.</p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[#99365c]">Made for gathering</p>
        <h2 className="mb-9 text-3xl md:text-4xl">{content.heading}</h2>
        <div className="grid gap-5 md:grid-cols-3">{content.events.map(([title, body]) => <article key={title} className="rounded-3xl border border-[#efcfda] bg-white p-7"><h3 className="mb-4 text-2xl">{title}</h3><p className="leading-relaxed text-[#704659]">{body}</p></article>)}</div>
      </section>
      <section id="packages" className="scroll-mt-24 border-y border-[#efcfda] bg-white px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div className="rounded-3xl bg-[#54283c] p-8 text-white sm:p-10">
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-[#f5c6d8]">The starter soda package</p>
            <h2 className="mb-5 text-4xl">A sweet place to start.</h2>
            <p className="mb-5 text-3xl font-semibold">Starting at $780</p>
            <p className="mb-7 leading-relaxed text-[#f8e0e9]">One soda host and three hours of service. Explore more hosts and other packages as you plan your guest count and schedule.</p>
            <Link href={starter} className="inline-block rounded-full bg-[#fce8ef] px-7 py-4 text-center font-semibold text-[#54283c] hover:bg-white">Explore the $780 Package</Link>
            <p className="mt-6 text-sm leading-relaxed text-[#f8e0e9]">Travel within 40 miles of Golden is included. We’ll confirm travel using your venue address. Your final quote depends on your package, service time, staffing, and travel.</p>
          </div>
          <div className="py-4">
            <h3 className="mb-6 text-3xl">We bring the bar—and the ingredients.</h3>
            <ul className="list-disc space-y-4 pl-5 leading-relaxed text-[#704659]">
              <li>Mobile soda bar with your selected hosts and service hours</li><li>Soda, syrups, cream, fruit, and ice</li><li>Clear cups and napkins</li><li>Personalized bar menu and trailer signage</li><li>Initial planning consultation and a final details call</li>
            </ul>
            <p className="mt-6 leading-relaxed text-[#704659]">No ingredient shopping list for you. We’ll confirm drink selections and event details together.</p>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-20">
        <Image src="/dirty-soda-drinks.jpg" alt="Colorful dirty soda drinks with garnishes" width={1200} height={700} sizes="(max-width: 768px) 100vw, 50vw" className="w-full rounded-3xl object-cover" />
        <div><p className="mb-3 text-xs uppercase tracking-[0.18em] text-[#99365c]">Dream up your menu</p><h2 className="mb-5 text-3xl md:text-4xl">Familiar favorites.<br />A playful little twist.</h2>
          <ul className="mb-6 space-y-4 text-[#704659]"><li><strong>Cherry Vanilla Fizz</strong><br />Cola, cherry, vanilla, and cream</li><li><strong>Strawberry Sunshine</strong><br />Lemon-lime soda, strawberry, and fresh lime</li><li><strong>Orange Cream Dream</strong><br />Orange soda, vanilla, and cream</li></ul>
          <p className="mb-5 text-sm leading-relaxed text-[#704659]">These are sample combinations. Confirm final flavors, ingredients, and dietary preferences with Jen.</p><Link href="/dirty-soda-bar#soda-menu-heading" className="font-semibold text-[#99365c] underline underline-offset-4">Explore more soda ideas</Link>
        </div>
      </section>
      <section className="border-y border-[#efcfda] bg-[#fce8ef] px-6 py-16 md:py-20"><div className="mx-auto max-w-6xl">
        <h2 className="mb-5 text-3xl md:text-4xl">{content.planheading}</h2><p className="mb-9 max-w-3xl leading-relaxed text-[#704659]">{content.planintro}</p>
        <ol className="grid gap-5 md:grid-cols-3">{content.steps.map(([title, body], index) => <li key={title} className="rounded-3xl border border-[#efcfda] bg-white p-7"><span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fce8ef] text-[#99365c]">{index + 1}</span><h3 className="mb-3 text-2xl">{title}</h3><p className="leading-relaxed text-[#704659]">{body}</p></li>)}</ol>
      </div></section>
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-20"><h2 className="mb-8 text-3xl md:text-4xl">Your {content.city} booking questions</h2><div className="space-y-3">{faqs.map(([question, answer]) => <details key={question} className="rounded-2xl border border-[#efcfda] bg-white p-6"><summary className="cursor-pointer font-semibold">{question}</summary><p className="mt-4 leading-relaxed text-[#704659]">{answer}</p></details>)}</div></section>
      <section className="bg-[#54283c] px-6 py-16 text-center text-white"><div className="mx-auto max-w-2xl"><p className="mb-4 text-xs uppercase tracking-[0.18em] text-[#f5c6d8]">Let’s make it a celebration</p><h2 className="mb-6 text-4xl md:text-5xl">Your people. Your party.<br />We’ll bring the fizz.</h2><p className="mb-8 leading-relaxed text-[#f8e0e9]">Share your {content.city} venue, date, and guest count. Explore your quote or talk through the setup with Jen.</p><Link href={quote} className="inline-block rounded-full bg-[#fce8ef] px-8 py-4 font-semibold text-[#54283c] hover:bg-white">Plan Your Soda Party</Link><a href="tel:7206439690" className="mx-auto mt-5 block w-fit underline underline-offset-4">Call Jen · 720-643-9690</a></div></section>
      <footer className="mx-auto max-w-6xl px-6 pb-28 pt-10 text-center text-sm leading-relaxed text-[#704659]"><p className="mb-4"><Link href="/dirty-soda-bar" className="underline underline-offset-4">Colorado dirty soda catering</Link> · <Link href="/what-is-dirty-soda-bar" className="underline underline-offset-4">How a dirty soda bar works</Link></p><p>Also exploring venues in {[['Parker','parker'],['Centennial','centennial'],['Highlands Ranch','highlands-ranch'],['Littleton','littleton']].filter(([, slug]) => slug !== content.slug).map(([city, slug], index) => <span key={slug}>{index > 0 ? ' · ' : ''}<Link href={`/dirty-soda-bar-${slug}`} className="underline underline-offset-4">{city}</Link></span>)}?</p></footer>
    </main>
  )
}
