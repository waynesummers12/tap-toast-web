import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Dirty Soda Bar for Birthday Parties | Tap & Toast Colorado",
  description: "Plan a sweet celebration with Colorado Tap & Toast’s mobile dirty soda bar. Custom soda combinations for birthdays, graduations, and family celebrations.",
}

const faqs = [
  ["What is a dirty soda?", "It’s soda with a twist: flavored syrups, cream, fruit, and garnishes mixed into a custom drink. Our dirty soda bar is a nonalcoholic option for your celebration."],
  ["Can guests choose their own combinations?", "Yes. Guests can mix and match flavors, syrups, fruit garnishes, and cream toppers to create their own soda combinations."],
  ["Where do you serve?", "We provide mobile dirty soda bar catering in Denver, Littleton, Lakewood, Parker, Highlands Ranch, Centennial, and surrounding Colorado areas."],
  ["How do I start planning?", "Start your quote with your event date, location, and guest count. Prefer to talk through your plans? Call Jen at 720-643-9690."],
] as const
const quote = "/book?service=soda"
const button = "inline-flex items-center justify-center rounded-full bg-[#99365c] px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#772443] focus-visible:outline-[#99365c]"

export default function DirtySodaBarPage() {
  return (
    <main className="min-h-screen bg-[#fff8fa] text-[#54283c] selection:bg-[#f5c6d8]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })),
      }) }} />
      <section className="relative overflow-hidden border-b border-[#efcfda] bg-[#fce8ef]">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-24 h-80 w-80 rounded-full border-[36px] border-white/35" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:grid-cols-2 md:py-20 lg:gap-16">
          <div className="min-w-0">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#99365c]">Colorado celebrations, with a sweet twist</p>
            <h1 className="mb-6 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">Her day.<br />Her friends.<br /><span className="italic text-[#99365c]">Her kind of sparkle.</span></h1>
            <p className="mb-5 text-xl">A dirty soda bar for a party that feels like her.</p>
            <p className="max-w-lg leading-relaxed text-[#704659]">Planning your daughter’s birthday? Bring everyone together over custom soda creations, fun flavors, and a mobile bar made for celebrating. You bring the occasion. We bring the soda experience.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={quote} className={button}>Plan Her Soda Party <span aria-hidden="true" className="ml-3">↗</span></Link>
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
            ["01", "Make it hers", "A birthday, a graduation, or a just-because celebration with her favorite people. Make the soda bar part of her day."],
            ["02", "Mix up the fun", "Guests can explore flavors and create their own soda combinations with syrups, cream, and fruit garnishes."],
            ["03", "Enjoy the moment", "Our mobile bar and staff bring the soda experience to your celebration, so you can spend more time with your guests."],
          ].map(([number, title, body]) => <div key={number} className="rounded-3xl border border-[#efcfda] bg-white p-7"><span className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fce8ef] text-sm text-[#99365c]">{number}</span><h3 className="mb-3 text-3xl">{title}</h3><p className="leading-relaxed text-[#704659]">{body}</p></div>)}
        </div>
      </section>

      <section className="border-y border-[#efcfda] bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2">
          <Image src="/dirty-soda-drinks.jpg" alt="Colorful dirty soda drinks with garnishes" width={1200} height={700} sizes="(max-width: 768px) 100vw, 50vw" className="w-full rounded-3xl object-cover" />
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#99365c]">For the moments worth celebrating</p>
            <h2 className="mb-6 text-4xl md:text-5xl">Big birthday energy.<br />Little details she’ll love.</h2>
            <p className="mb-7 leading-relaxed text-[#704659]">From backyard birthdays to graduation parties, give her friends a place to gather, sip, and celebrate. Our soda bar also welcomes weddings, school events, and family gatherings.</p>
            <div className="mb-8 flex flex-wrap gap-2">{["Birthday parties", "Graduations", "Family celebrations"].map(label => <span key={label} className="rounded-full bg-[#fce8ef] px-4 py-2 text-sm">{label}</span>)}</div>
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
          <p className="mb-8 leading-relaxed text-[#f8e0e9]">Tell us when, where, and who you’re celebrating. Start your quote or talk through the details with Jen.</p>
          <Link href={quote} className="inline-block rounded-full bg-[#fce8ef] px-8 py-4 font-semibold text-[#54283c] hover:bg-white">Plan Her Soda Party</Link>
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
