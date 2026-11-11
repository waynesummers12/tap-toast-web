import Breadcrumbs from "../components/Breadcrumbs"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Colorado Party Bar Rentals & Birthday Bartenders | Tap & Toast",
  alternates: { canonical: "https://www.coloradotapandtoast.com/birthday-parties" },
  description: "Plan birthdays, bridal showers, girls’ nights, and bachelorette parties in Denver, Golden, and the Front Range. Compare trailer rentals, bartenders, and dirty soda bars.",
}

const experiences = [
  { title: "The Trailer", price: "$600", subtitle: "Your party, your own bar setup", detail: "Rent the mobile bar trailer without bartenders. Choose your rental hours and arrange your own drink service.", included: "Free delivery within 20 miles of Golden.", href: "/book?type=rental&tier=trailer&service=bartending", cta: "Get a Trailer Quote" },
  { title: "Staffed Mobile Bar", price: "$1,230", subtitle: "Let the bartenders handle service", detail: "The Tipsy starts with two professional bartenders and four hours of service. Plan your menu with Jen and review your shopping needs.", included: "Travel within 40 miles of Golden included.", href: "/book?service=bartending&tier=signature", cta: "Get a Bartending Quote" },
  { title: "Dirty Soda Party", price: "$780", subtitle: "A celebration without the alcohol", detail: "Start with one soda host and three hours. We supply soda, syrups, cream, fruit, ice, clear cups, and napkins.", included: "Travel within 40 miles of Golden included.", href: "/book?service=soda&tier=taste", cta: "Plan Your Soda Party" },
]

export default function BirthdayPartiesPage() {
  return <main className="min-h-screen bg-white text-neutral-950 selection:bg-[#fce8ef]">
    <Breadcrumbs items={[{ name: "Parties", path: "/birthday-parties" }]} />
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
      <div>
        <p className="mb-5 text-xs uppercase tracking-[0.25em] text-[#806321]">Colorado mobile bars for private celebrations</p>
        <h1 className="mb-6 text-4xl leading-tight sm:text-5xl md:text-6xl">Your favorite people. A reason to celebrate.</h1>
        <p className="text-lg leading-relaxed text-neutral-600">Birthdays, girls’ nights, bridal showers, bachelorette parties, and wine nights deserve a setting of their own. Tap & Toast brings mobile bar options to Golden, Denver, and the Front Range—from trailer rentals to staffed drink service and dirty soda parties.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#party-options" className="rounded-lg bg-black px-7 py-4 text-center font-semibold text-white">Find Your Party Package</a>
          <a href="tel:7206439690" className="rounded-lg border border-neutral-300 px-7 py-4 text-center font-semibold">Talk With Jen</a>
        </div>
      </div>
      <Image src="/corporate-bar.jpg" alt="Tap & Toast mobile bar setup for a private celebration" width={800} height={500} className="w-full rounded-2xl border border-neutral-200 object-cover" />
    </section>

    <section aria-labelledby="celebrations-heading" className="mx-auto max-w-6xl px-6 pb-20">
      <h2 id="celebrations-heading" className="mb-8 text-3xl md:text-4xl">Make the bar part of your party</h2>
      <div className="grid gap-6 md:grid-cols-3">{[
        ["Birthdays & backyard gatherings", "Build your drink menu around the birthday person’s favorites. Share when guests arrive so we can plan for the busiest part of the party."],
        ["Bridal showers & bachelorette parties", "Coordinate the menu with your theme and leave room in the schedule for toasts, games, and catching up. Tell us whether you want alcoholic or nonalcoholic service."],
        ["Girls’ nights & wine nights", "Turn a relaxed evening into a celebration. Choose a trailer for your own setup or staffed service, and confirm your drinks and supplies with Jen."],
      ].map(([title, description]) => <article key={title} className="rounded-2xl border border-[#e7dfcf] bg-[#faf8f3] p-7"><h3 className="mb-4 text-2xl">{title}</h3><p className="leading-relaxed text-neutral-600">{description}</p></article>)}</div>
    </section>

    <section id="party-options" aria-labelledby="options-heading" className="mx-auto max-w-6xl scroll-mt-28 px-6 pb-20">
      <h2 id="options-heading" className="mb-4 text-3xl md:text-4xl">Three ways to host</h2>
      <p className="mb-8 max-w-3xl leading-relaxed text-neutral-600">Start with the experience that fits your plans. These starting prices reflect the staff and hours listed below. Your quote confirms your selections and any additional travel charges.</p>
      <div className="grid gap-6 lg:grid-cols-3">{experiences.map((option, index) => <article key={option.title} className={`flex flex-col rounded-2xl border p-7 ${index === 2 ? "border-[#efcfda] bg-[#fce8ef] text-[#54283c]" : "border-neutral-700 bg-neutral-950 text-white"}`}>
        <p className={`mb-3 text-sm ${index === 2 ? "text-[#704659]" : "text-[#e6c67c]"}`}>{option.subtitle}</p>
        <h3 className={`mb-4 text-3xl ${index === 2 ? "!text-[#54283c]" : "!text-white"}`}>{option.title}</h3>
        <p className="mb-5 text-2xl font-semibold">From {option.price}</p>
        <p className="mb-4 leading-relaxed">{option.detail}</p>
        <p className="mb-8 text-sm leading-relaxed">{option.included}</p>
        <Link href={option.href} className={`mt-auto rounded-lg px-5 py-4 text-center font-semibold ${index === 2 ? "bg-[#99365c] text-white hover:bg-[#772443]" : "bg-white text-black hover:bg-neutral-200"}`}>{option.cta}</Link>
      </article>)}</div>
      <div className="mt-6 flex flex-wrap gap-6 text-sm underline underline-offset-4"><Link href="/bartending">Compare staffed bar packages</Link><Link href="/dirty-soda-bar">Explore soda menus and inclusions</Link><Link href="/what-is-dirty-soda-bar">What is a dirty soda bar?</Link></div>
    </section>

    <section aria-labelledby="checklist-heading" className="mx-auto max-w-6xl px-6 pb-20">
      <div className="rounded-2xl border border-[#e7dfcf] bg-[#faf8f3] p-8 sm:p-10">
        <h2 id="checklist-heading" className="mb-6 text-3xl md:text-4xl">Your party planning checklist</h2>
        <ol className="list-decimal space-y-5 pl-5 leading-relaxed text-neutral-700">
          <li><strong>Date and serving window:</strong> Share when guests arrive and when you want drink service to start and finish.</li>
          <li><strong>Guest count and drink menu:</strong> Let us know about your theme, preferred drinks, and dietary needs. Confirm specific ingredients and accommodations with Jen.</li>
          <li><strong>Location and access:</strong> Send the full address. Check outside-vendor permission, trailer parking, gates, stairs, and setup access with your venue or property owner.</li>
          <li><strong>Outdoor backup:</strong> Plan for weather and confirm shelter, space, electricity, and water needs for your chosen setup.</li>
          <li><strong>Supplies and responsibilities:</strong> Review what your package includes before shopping. Trailer rental does not include bartenders, and alcoholic drink purchases should be discussed separately.</li>
        </ol>
      </div>
    </section>

    <section aria-labelledby="party-faq" className="mx-auto max-w-4xl px-6 pb-20">
      <h2 id="party-faq" className="mb-8 text-3xl md:text-4xl">Party booking questions</h2>
      <div className="space-y-3">{[
        ["Can you set up at a private home?", "Share your address and access details with Jen before finalizing the setup. Trailer placement, parking, gates, and available space need to work for the property. Confirm permission for any rented or shared space."],
        ["Do you only cater birthday parties?", "No. We also help with girls’ nights, bridal showers, bachelorette parties, wine nights, family gatherings, and other private celebrations."],
        ["Can we have a nonalcoholic party?", "Yes. Dirty soda catering is a hosted nonalcoholic option with soda, syrups, cream, fruit, and ice supplied by us. Ingredients and any dietary accommodations are confirmed during planning."],
        ["Does a trailer rental come with a bartender?", "No. The Trailer is rental-only. Choose a staffed package if you want our bartenders to handle service. The package links above open the corresponding booking option."],
        ["Can you help us choose drinks?", "Yes. Talk with Jen about your theme, guest preferences, and service style. For alcoholic service, confirm purchases and supplies using your shopping plan; for soda catering, we provide the listed ingredients."],
        ["How do I get an accurate quote?", "Choose one of the options above, enter your date, location, and event details, then review the staff, hours, and total. Contact Jen if your venue or plans need a custom arrangement."],
      ].map(([question, answer]) => <details key={question} className="rounded-xl border border-neutral-200 p-6"><summary className="cursor-pointer font-semibold">{question}</summary><p className="mt-4 leading-relaxed text-neutral-600">{answer}</p></details>)}</div>
    </section>

    <section className="mx-auto max-w-6xl px-6 pb-28">
      <div className="rounded-2xl bg-black p-8 text-center text-white sm:p-14">
        <h2 className="mb-5 text-3xl !text-white md:text-4xl">Not just a bar. A place to make memories.</h2>
        <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-neutral-300">Tell us what you’re celebrating, where you’re gathering, and who’s coming. We’ll help you choose the right experience.</p>
        <a href="#party-options" className="inline-block rounded-lg bg-white px-8 py-4 font-semibold text-black">Choose Your Party Experience</a>
        <a href="tel:7206439690" className="mx-auto mt-5 block w-fit underline underline-offset-4">Ask Jen · 720-643-9690</a>
      </div>
    </section>
  </main>
}
