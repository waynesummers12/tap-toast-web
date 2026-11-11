import Breadcrumbs from "../components/Breadcrumbs"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Dirty Soda Bar Catering in Colorado | Tap & Toast",
  description: "Colorado dirty soda bar catering for birthdays, weddings, showers, school events, and corporate gatherings. Custom nonalcoholic drinks, a mobile bar, and staff.",
}

const faqs = [
  ["What is a dirty soda?", "It’s soda with a twist: flavored syrups, cream, fruit, and garnishes mixed into a custom drink. Our dirty soda bar is a nonalcoholic option for your celebration."],
  ["Can guests choose their own combinations?", "Yes. Guests can mix and match flavors, syrups, fruit garnishes, and cream toppers to create their own soda combinations."],
  ["What does dirty soda catering cost?", "Our starter package begins at $780 for a mobile soda bar and one soda host for three hours. Your final quote depends on your selected package, service time, staffing, and travel. Choose your event details to see your price."],
  ["Do we need to buy the drinks or ingredients?", "No. We supply the soda, syrups, cream, fruit, and ice, along with clear cups and napkins. We’ll confirm your drink selections with you before the event."],
  ["What should we arrange with our venue?", "Share your venue address, indoor or outdoor plans, and access details with Jen. Confirm a safe serving area, delivery access, and setup timing with your venue. Jen will confirm the space and any utility requirements for your chosen setup; for outdoor events, discuss a weather backup plan."],
  ["Can you accommodate dietary preferences?", "Tell Jen about allergies or dietary preferences before booking so you can discuss ingredients and suitable drink options. Specific alternatives and allergen accommodations must be confirmed in advance."],
  ["Where do you serve?", "We provide mobile dirty soda bar catering in Denver, Littleton, Lakewood, Parker, Highlands Ranch, Centennial, and surrounding Colorado areas."],
  ["How do I start planning?", "Start your quote with your event date, location, and guest count. Prefer to talk through your plans? Call Jen at 720-643-9690."],
] as const
const quote = "/book?service=soda"
const button = "inline-flex items-center justify-center rounded-full bg-[#99365c] px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#772443] focus-visible:outline-[#99365c]"

export default function DirtySodaBarPage() {
  return (
    <main className="min-h-screen bg-[#fff8fa] text-[#54283c] selection:bg-[#f5c6d8]">
      <Breadcrumbs items={[{"name": "Dirty Soda Bar", "path": "/dirty-soda-bar"}]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })),
      }) }} />
      <section className="relative overflow-hidden border-b border-[#efcfda] bg-[#fce8ef]">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-24 h-80 w-80 rounded-full border-[36px] border-white/35" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:grid-cols-2 md:py-20 lg:gap-16">
          <div className="min-w-0">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#99365c]">Colorado celebrations, with a sweet twist</p>
            <h1 className="mb-6 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">Dirty Soda Bar<br /><span className="italic text-[#99365c]">Catering in Colorado</span></h1>
            <p className="mb-5 text-xl">Your people. Your occasion. A little extra sparkle.</p>
            <p className="max-w-lg leading-relaxed text-[#704659]">Bring something sweet to birthdays, bridal showers, weddings, graduations, school events, and corporate gatherings. Our mobile dirty soda bar brings custom nonalcoholic drinks and staff to Denver, Littleton, Lakewood, Parker, Highlands Ranch, Centennial, and surrounding Colorado areas.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={quote} className={button}>Plan Your Soda Party <span aria-hidden="true" className="ml-3">↗</span></Link>
              <a href="#soda-how-it-works" className="px-2 py-3 text-sm underline underline-offset-4">What’s a dirty soda?</a>
            </div>
            <p className="mt-5 text-xs tracking-wide text-[#704659]">Nonalcoholic drinks · Custom combinations · Colorado celebrations</p>
          </div>
          <div className="min-w-0 rounded-t-[10rem] rounded-b-3xl border-8 border-white bg-white p-2 shadow-lg shadow-pink-950/5">
            <Image src="/dirty-soda-bar.jpg" alt="A birthday celebration around the Tap & Toast mobile soda bar" width={1200} height={700} priority sizes="(max-width: 768px) 100vw, 50vw" className="aspect-[4/5] w-full rounded-t-[9rem] rounded-b-2xl object-cover" />
            <p className="py-4 text-center text-2xl italic" style={{fontFamily:"var(--font-editorial), Georgia, serif"}}>A little fizz. A lot of fun.</p>
          </div>
        </div>
      </section>

      <section id="soda-how-it-works" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#99365c]">Meet the dirty soda bar</p>
          <h2 className="mb-5 text-4xl md:text-5xl">Sweet sips. So many possibilities.</h2>
          <p className="leading-relaxed text-[#704659]">Think soda, dressed up for the party. Flavored syrups, cream, fruit, and garnishes turn a familiar favorite into a drink that’s all your own.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["01", "Make it yours", "A milestone, a team celebration, or a just-because gathering with your favorite people. Make the soda bar part of your occasion."],
            ["02", "Mix up the fun", "Guests can explore flavors and create their own soda combinations with syrups, cream, and fruit garnishes."],
            ["03", "Enjoy the moment", "Our mobile bar and staff bring the soda experience to your celebration, so you can spend more time with your guests."],
          ].map(([number, title, body]) => <div key={number} className="rounded-3xl border border-[#efcfda] bg-white p-7"><span className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fce8ef] text-sm text-[#99365c]">{number}</span><h3 className="mb-3 text-3xl">{title}</h3><p className="leading-relaxed text-[#704659]">{body}</p></div>)}
        </div>
      </section>

      <section className="border-y border-[#efcfda] bg-[#fce8ef] px-6 py-16 md:py-20" aria-labelledby="soda-menu-heading">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#99365c]">A little menu inspiration</p>
          <h2 id="soda-menu-heading" className="mb-5 text-4xl md:text-5xl">Find your new favorite sip.</h2>
          <p className="mb-8 max-w-2xl leading-relaxed text-[#704659]">Start with a familiar soda, then make it your own. These sample combinations are ideas for your event menu; confirm your final flavors and ingredients with Jen.</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Cherry Vanilla Fizz", "Cola + cherry syrup + vanilla syrup + cream"],
              ["Strawberry Sunshine", "Lemon-lime soda + strawberry syrup + fresh lime"],
              ["Coconut Lime Splash", "Lemon-lime soda + coconut syrup + fresh lime"],
              ["Orange Cream Dream", "Orange soda + vanilla syrup + cream"],
            ].map(([name, ingredients]) => <div key={name} className="rounded-3xl border border-[#efcfda] bg-white p-6"><h3 className="mb-3 text-2xl">{name}</h3><p className="leading-relaxed text-[#704659]">{ingredients}</p></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24" aria-labelledby="soda-package-heading">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="rounded-3xl border border-[#efcfda] bg-white p-7 sm:p-10">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#99365c]">Your soda party starts here</p>
            <h2 id="soda-package-heading" className="mb-4 text-4xl">The starter soda package</h2>
            <p className="mb-5 text-3xl font-semibold">Starting at $780</p>
            <p className="mb-7 leading-relaxed text-[#704659]">One soda host, three hours of service, and a mobile soda bar for your celebration. Need more time or hosts? Explore the other packages in your quote.</p>
            <Link href="/book?service=soda&tier=taste" className={button}>Explore the $780 Starter Package</Link>
            <p className="mt-5 text-sm leading-relaxed text-[#704659]">Final pricing depends on your package, service time, staffing, and travel. Travel within 40 miles of Golden is included; additional travel is quoted separately.</p>
          </div>
          <div className="py-3">
            <h3 className="mb-5 text-3xl">What’s included?</h3>
            <ul className="space-y-4 text-[#704659]">
              <li>• Mobile soda bar setup and your selected soda hosts and service hours</li>
              <li>• Soda, flavored syrups, cream, fruit, and ice supplied by us</li>
              <li>• Clear cups and napkins</li>
              <li>• Personalized bar menu and trailer signage</li>
              <li>• An initial planning consultation and a final details call</li>
            </ul>
            <p className="mt-6 leading-relaxed text-[#704659]">We’ll work through your drink selections and event details together, so you know what to expect before the party.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#efcfda] bg-white px-6 py-16 md:py-20" aria-labelledby="soda-setup-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="soda-setup-heading" className="mb-5 text-4xl md:text-5xl">Let’s plan the setup.</h2>
          <p className="mb-8 max-w-2xl leading-relaxed text-[#704659]">Send us your venue address, guest count, and preferred service time. We’ll confirm the setup details with you before your event.</p>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["Space & access", "Tell us where you’d like the bar and how we can reach it. Confirm venue permission and a safe serving area; flag stairs, narrow entrances, or restricted delivery access."],
              ["Timing & venue needs", "Share your venue’s delivery and pickup windows. Jen will confirm arrival time, space requirements, and any electricity or water needs for the chosen setup."],
              ["Outdoor plans", "Let us know if your celebration is outdoors. Discuss suitable shelter and a weather backup plan with Jen and your venue before the event."],
            ].map(([title, body]) => <div key={title} className="rounded-3xl border border-[#efcfda] bg-[#fff8fa] p-7"><h3 className="mb-3 text-2xl">{title}</h3><p className="leading-relaxed text-[#704659]">{body}</p></div>)}
          </div>
        </div>
      </section>

      <section className="border-y border-[#efcfda] bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2">
          <Image src="/dirty-soda-drinks.jpg" alt="Colorful dirty soda drinks with garnishes" width={1200} height={700} sizes="(max-width: 768px) 100vw, 50vw" className="w-full rounded-3xl object-cover" />
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#99365c]">For the moments worth celebrating</p>
            <h2 className="mb-6 text-4xl md:text-5xl">Every occasion.<br />A reason to raise a glass.</h2>
            <p className="mb-7 leading-relaxed text-[#704659]">From backyard birthdays and girls’ nights to bridal showers, bachelorette parties, and weddings, give your guests a place to gather, sip, and celebrate. Bring the same fun to graduations, school events, family reunions, and company celebrations.</p>
            <div className="mb-8 flex flex-wrap gap-2">{["Birthdays", "Showers & weddings", "Girls’ nights & bachelorettes", "Graduations & school events", "Corporate gatherings", "Family celebrations"].map(label => <span key={label} className="rounded-full bg-[#fce8ef] px-4 py-2 text-sm">{label}</span>)}</div>
            <Link href={quote} className={button}>Get a Soda Party Quote</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <p className="mb-3 text-center text-xs uppercase tracking-[0.2em] text-[#99365c]">A little help with the planning</p>
        <h2 className="mb-10 text-center text-4xl md:text-5xl">Questions, answered.</h2>
        <div className="space-y-3">{faqs.map(([question, answer]) => <details key={question} className="rounded-2xl border border-[#efcfda] bg-white p-5 sm:p-6"><summary className="cursor-pointer font-semibold">{question}</summary><p className="mt-4 leading-relaxed text-[#704659]">{answer}</p></details>)}</div>
        <p className="mt-7 text-center"><Link href="/what-is-dirty-soda-bar" className="text-sm underline underline-offset-4">Explore our Dirty Soda Guide</Link></p>
      </section>

      <section className="bg-[#54283c] px-6 py-16 text-center text-white md:py-24">
        <div className="mx-auto max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#f5c6d8]">Let’s make it a celebration</p>
          <h2 className="mb-6 text-4xl md:text-6xl">Something sweet<br />to look forward to.</h2>
          <p className="mb-8 leading-relaxed text-[#f8e0e9]">Tell us when, where, and what you’re planning. Start your quote or talk through the details with Jen.</p>
          <Link href={quote} className="inline-block rounded-full bg-[#fce8ef] px-8 py-4 font-semibold text-[#54283c] hover:bg-white">Plan Your Soda Party</Link>
          <a href="tel:7206439690" className="mx-auto mt-4 block w-fit px-4 py-3 text-sm underline underline-offset-4">Call Jen · 720-643-9690</a>
        </div>
      </section>
      <footer className="mx-auto max-w-6xl px-6 py-10 text-center text-sm leading-relaxed text-[#704659]">
        <p className="mb-3">Colorado Tap & Toast · Dirty Soda Bar</p>
        <p>Serving {[['Denver','denver'],['Littleton','littleton'],['Lakewood','lakewood'],['Parker','parker'],['Highlands Ranch','highlands-ranch'],['Centennial','centennial']].map(([label,slug],i)=><span key={slug}>{i > 0 ? ' · ' : ''}<Link href={`/dirty-soda-bar-${slug}`} className="underline underline-offset-4">{label}</Link></span>)} and surrounding Colorado areas.</p>
      </footer>
    </main>
  )
}
