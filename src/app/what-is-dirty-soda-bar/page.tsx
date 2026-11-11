import Breadcrumbs from "../components/Breadcrumbs"
import Image from "next/image"
import Link from "next/link"

const url = "https://www.coloradotapandtoast.com/what-is-dirty-soda-bar"
const title = "What Is a Dirty Soda Bar? Ideas & Pricing"
const description = "Learn what goes in a dirty soda, explore drink combinations, compare DIY and hosted soda bars, and plan Colorado event catering starting at $780."
export const metadata = {
  title: `${title} | Tap & Toast`, description,
  alternates: { canonical: url },
}
const button = "inline-flex items-center justify-center rounded-full bg-[#99365c] px-7 py-4 text-center font-semibold text-white hover:bg-[#772443] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#99365c]"
const sections = [["drinks", "Drink ideas"], ["diy-or-hosted", "DIY or hosted?"], ["cost", "Cost & inclusions"], ["planning", "Planning checklist"], ["questions", "Common questions"]]
const faqs = [
  ["Does dirty soda contain alcohol?", "Our dirty soda drinks are nonalcoholic. The word “dirty” refers to the added flavors, cream, or other mix-ins—not alcohol."],
  ["Does every drink have cream?", "No. A soda can be customized with flavored syrup and fruit without adding cream. Confirm ingredients and any dietary or allergy requirements with Jen before your event."],
  ["Are the drinks caffeine-free or sugar-free?", "That depends on the base soda and mix-ins. Don’t assume every drink is caffeine-free or sugar-free; discuss specific choices and availability with Jen when planning the menu."],
  ["Do we supply the ingredients?", "For Tap & Toast soda catering, we supply soda, syrups, cream, fruit, ice, clear cups, and napkins. Final drink selections are confirmed during planning."],
  ["Can we visit your soda shop?", "We provide mobile catering for booked events rather than a walk-in soda shop. Our bar and hosts come to your celebration."],
]

export default function WhatIsDirtySodaBarPage() {
  return (
    <main className="min-h-screen bg-[#fff8fa] text-[#54283c] selection:bg-[#f5c6d8]">
      <Breadcrumbs items={[{ name: "Dirty Soda Bar", path: "/dirty-soda-bar" }, { name: "What Is a Dirty Soda?", path: "/what-is-dirty-soda-bar" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article", headline: title, description,
        mainEntityOfPage: url, image: "https://www.coloradotapandtoast.com/dirty-soda-drinks.jpg",
        author: { "@type": "Organization", name: "Colorado Tap & Toast", url: "https://www.coloradotapandtoast.com" },
      }) }} />
      <header className="border-b border-[#efcfda] bg-[#fce8ef] px-6 py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#99365c]">The soda party planning guide</p>
            <h1 className="mb-6 text-4xl leading-tight sm:text-5xl md:text-6xl">What is a<br /><span className="italic text-[#99365c]">dirty soda bar?</span></h1>
            <p className="mb-5 text-xl leading-relaxed">A dirty soda bar is a drink station where soda is mixed with flavored syrups, cream, fruit, or other add-ins. Guests choose combinations to suit their tastes.</p>
            <p className="leading-relaxed text-[#704659]">Think cherry-vanilla cola, strawberry-lime soda, or an orange-and-cream combination. At Tap & Toast, it’s a nonalcoholic experience with hosts who bring the bar and ingredients to your event.</p>
            <Link href="/dirty-soda-bar" className={`${button} mt-7`}>Explore Colorado Soda Catering</Link>
          </div>
          <Image src="/dirty-soda-drinks.jpg" alt="Colorful dirty soda drinks with garnishes" width={1200} height={700} priority sizes="(max-width: 768px) 100vw, 50vw" className="w-full rounded-3xl border-8 border-white object-cover shadow-sm" />
        </div>
      </header>
      <nav aria-label="In this guide" className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-3 border-b border-[#efcfda] px-6 py-6 text-sm">{sections.map(([id, label]) => <a key={id} href={`#${id}`} className="py-1 font-semibold text-[#99365c] underline underline-offset-4">{label}</a>)}</nav>
      <section id="drinks" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16">
        <h2 className="mb-5 text-3xl md:text-4xl">What goes in a dirty soda?</h2>
        <p className="mb-8 max-w-3xl leading-relaxed text-[#704659]">Start with a soda you enjoy, add a flavor or two, and finish with cream or fruit if you like. These examples are menu inspiration; confirm your final ingredients and selections with Jen.</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[
          ["Cherry Vanilla Fizz", "Cola + cherry syrup + vanilla syrup + cream"],
          ["Strawberry Sunshine", "Lemon-lime soda + strawberry syrup + fresh lime"],
          ["Coconut Lime Splash", "Lemon-lime soda + coconut syrup + fresh lime"],
          ["Orange Cream Dream", "Orange soda + vanilla syrup + cream"],
        ].map(([name, ingredients]) => <div key={name} className="rounded-3xl border border-[#efcfda] bg-white p-6"><h3 className="mb-4 text-2xl">{name}</h3><p className="leading-relaxed text-[#704659]">{ingredients}</p></div>)}</div>
      </section>
      <section id="diy-or-hosted" className="scroll-mt-24 border-y border-[#efcfda] bg-white px-6 py-16"><div className="mx-auto max-w-6xl">
        <h2 className="mb-5 text-3xl md:text-4xl">Should you DIY or book a hosted soda bar?</h2>
        <p className="mb-8 max-w-3xl leading-relaxed text-[#704659]">The choice comes down to how much you want to organize and who will serve during the party.</p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-[#efcfda] p-7"><h3 className="mb-4 text-2xl">A DIY drink station</h3><p className="mb-4 leading-relaxed text-[#704659]">You choose the ingredients and arrange the serving area. Plan who will buy supplies, keep ice and ingredients ready, refill the station, and answer guests’ ingredient questions.</p><p className="leading-relaxed text-[#704659]">This can suit a gathering where you’re comfortable managing the drink station yourself.</p></div>
          <div className="rounded-3xl border border-[#efcfda] bg-[#fff8fa] p-7"><h3 className="mb-4 text-2xl">Hosted Tap & Toast catering</h3><p className="mb-4 leading-relaxed text-[#704659]">We bring the mobile soda bar, your selected hosts, and the ingredients. You work with Jen on the menu, venue access, and service schedule before the event.</p><p className="leading-relaxed text-[#704659]">This suits hosts who want to spend their time with guests while someone else handles soda service.</p></div>
        </div>
      </div></section>
      <section id="cost" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16"><div className="grid gap-10 md:grid-cols-2">
        <div><p className="mb-3 text-xs uppercase tracking-[0.18em] text-[#99365c]">Colorado event catering</p><h2 className="mb-5 text-3xl md:text-4xl">How much does a soda bar cost?</h2><p className="mb-5 text-3xl font-semibold">Tap & Toast starts at $780</p><p className="mb-7 leading-relaxed text-[#704659]">Our starter package includes one soda host and three hours of service. The final quote depends on your package, service time, staffing, and travel. Travel within 40 miles of Golden is included; share your exact address to confirm travel details.</p><Link href="/book?service=soda&tier=taste" className={button}>Explore the $780 Starter Package</Link></div>
        <div className="rounded-3xl border border-[#efcfda] bg-white p-7"><h3 className="mb-5 text-2xl">Included with our soda catering</h3><ul className="list-disc space-y-4 pl-5 leading-relaxed text-[#704659]"><li>Mobile soda bar and your selected hosts and service hours</li><li>Soda, syrups, cream, fruit, and ice</li><li>Clear cups and napkins</li><li>Personalized bar menu and trailer signage</li><li>Initial planning consultation and final details call</li></ul></div>
      </div></section>
      <section id="planning" className="scroll-mt-24 border-y border-[#efcfda] bg-[#fce8ef] px-6 py-16"><div className="mx-auto max-w-6xl"><h2 className="mb-8 text-3xl md:text-4xl">Your soda party planning checklist</h2><ol className="grid gap-5 md:grid-cols-2">{[
        ["Choose the date and serving window", "Think about when guests arrive, when food is served, and how long you’d like drinks available."],
        ["Estimate guests and busy periods", "Tell us both your overall headcount and whether everyone will visit the bar at once. We can discuss staffing for your plans."],
        ["Confirm venue access", "Share the address, unloading route, and any restrictions. Jen will confirm space and utility requirements; outdoor plans need a weather backup."],
        ["Discuss the drink menu", "Choose flavor ideas and tell us about allergies or dietary preferences in advance. Specific accommodations must be confirmed before booking."],
      ].map(([name, body], index) => <li key={name} className="rounded-3xl border border-[#efcfda] bg-white p-7"><p className="mb-3 text-sm font-semibold text-[#99365c]">0{index + 1}</p><h3 className="mb-3 text-2xl">{name}</h3><p className="leading-relaxed text-[#704659]">{body}</p></li>)}</ol></div></section>
      <section id="questions" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-16"><h2 className="mb-8 text-3xl md:text-4xl">A few more things to know</h2><div className="space-y-3">{faqs.map(([question, answer]) => <details key={question} className="rounded-2xl border border-[#efcfda] bg-white p-6"><summary className="cursor-pointer font-semibold">{question}</summary><p className="mt-4 leading-relaxed text-[#704659]">{answer}</p></details>)}</div></section>
      <section className="bg-[#54283c] px-6 py-16 text-center text-white"><div className="mx-auto max-w-2xl"><h2 className="mb-5 text-4xl md:text-5xl">Turn the ideas into your party.</h2><p className="mb-8 leading-relaxed text-[#f8e0e9]">Planning a birthday, shower, wedding, graduation, or team celebration? Start with your date, location, and guest count.</p><Link href="/book?service=soda" className="inline-block rounded-full bg-[#fce8ef] px-8 py-4 font-semibold text-[#54283c] hover:bg-white">Plan Your Soda Party</Link><a href="tel:7206439690" className="mx-auto mt-5 block w-fit underline underline-offset-4">Talk through your plans with Jen · 720-643-9690</a></div></section>
      <footer className="mx-auto max-w-6xl px-6 pb-28 pt-10 text-center text-sm leading-relaxed text-[#704659]"><p className="mb-4">Explore catering and setup guidance for your area:</p><div className="flex flex-wrap justify-center gap-x-5 gap-y-3">{[["Denver", "denver"], ["Littleton", "littleton"], ["Lakewood", "lakewood"], ["Parker", "parker"], ["Highlands Ranch", "highlands-ranch"], ["Centennial", "centennial"]].map(([city, slug]) => <Link key={slug} href={`/dirty-soda-bar-${slug}`} className="underline underline-offset-4">{city}</Link>)}</div></footer>
    </main>
  )
}
