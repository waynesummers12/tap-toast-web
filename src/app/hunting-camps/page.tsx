import type { Metadata } from "next"
import Image from "next/image"
import Breadcrumbs from "../components/Breadcrumbs"

export const metadata: Metadata = {
  title: "Hunting Camp Tap Trailer Rental | $1,500 per Week | Tap & Toast",
  description: "Rent the Tap & Toast keg tap trailer for your hunting camp for one week at $1,500. Contact Jen to discuss dates, camp location, access, and delivery or pickup.",
  alternates: { canonical: "https://www.coloradotapandtoast.com/hunting-camps" },
}

const inquiryHref = "mailto:jen@coloradotapandtoast.com?subject=Hunting%20camp%20weekly%20trailer%20rental&body=Hi%20Jen%2C%0A%0AI%27m%20interested%20in%20the%20%241%2C500%20one-week%20hunting%20camp%20trailer%20rental.%0ARental%20dates%3A%20%0ACamp%20location%3A%20%0ARoad%20and%20site%20access%3A%20%0AGroup%20size%3A%20%0ADelivery%20or%20pickup%20preference%3A%20%0A%0AThank%20you!"

export default function HuntingCampsPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-neutral-950 selection:bg-stone-200">
      <Breadcrumbs items={[{ name: "Hunting Camps", path: "/hunting-camps" }]} />
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:py-20 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#455044]">A week away. A place to gather.</p>
          <h1 className="text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">Make camp<br /><span className="italic">your own.</span></h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-neutral-700">Bring the Tap &amp; Toast keg tap trailer to your hunting camp plans. A gathering place for your crew to settle in and share stories back at camp.</p>
          <div className="my-8 border-y border-stone-300 py-6">
            <p className="text-4xl font-semibold">$1,500 <span className="text-lg font-normal">for one week</span></p>
            <p className="mt-3 text-sm text-neutral-600">Tap trailer rental · You supply the alcohol</p>
          </div>
          <a href={inquiryHref} className="inline-flex min-h-12 items-center justify-center bg-[#303c32] px-7 py-4 text-sm font-semibold text-white hover:bg-black">Ask About Your Camp Dates <span aria-hidden="true" className="ml-4">↗</span></a>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">Discuss camp access and delivery or pickup arrangements with Jen before booking.</p>
        </div>
        <figure className="min-w-0 overflow-hidden border border-stone-300 bg-black">
          <Image src="/tap-trailer-clean.png" alt="Tap & Toast keg tap trailer with a covered wooden bar and four taps" width={1303} height={1207} priority sizes="(max-width: 1023px) 100vw, 50vw" className="h-auto w-full" />
          <figcaption className="border-t border-white/20 px-5 py-4 text-center text-sm text-neutral-300">The Tap &amp; Toast keg tap trailer</figcaption>
        </figure>
      </section>
      <section className="bg-[#303c32] px-6 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-stone-300">Your crew’s home base</p>
          <h2 className="max-w-3xl text-4xl leading-tight md:text-5xl">A week of camp. A bar to gather around.</h2>
          <p className="mt-6 max-w-2xl leading-relaxed text-stone-200">The trailer’s wood bar, covered serving area, and keg taps bring character to your camp setup. Plan the rental around your week away and talk through the location with Jen.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <h2 className="mb-10 text-4xl md:text-5xl">Let’s plan your camp setup.</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            ["01", "Choose your week", "Send your preferred start and end dates and the size of your group so Jen can check availability."],
            ["02", "Share the location", "Include the camp location, road conditions, and available setup space to discuss whether the trailer is a fit."],
            ["03", "Work out the details", "Confirm delivery or pickup arrangements and discuss keg and drink plans with Jen. You supply the alcohol."],
          ].map(([number, title, description]) => (
            <article key={number} className="border-t border-stone-300 pt-6">
              <p className="mb-4 text-sm text-neutral-500">{number}</p>
              <h3 className="text-3xl">{title}</h3>
              <p className="mt-4 leading-relaxed text-neutral-700">{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-black px-6 py-16 text-center text-white md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-4xl md:text-5xl">Reserve a week for your crew.</h2>
          <p className="mt-5 text-lg text-neutral-300">One-week tap trailer rental · $1,500</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={inquiryHref} className="inline-flex min-h-12 items-center justify-center bg-white px-7 py-4 font-semibold text-black hover:bg-stone-200">Email Jen About Your Camp</a>
            <a href="tel:7206439690" className="inline-flex min-h-12 items-center justify-center border border-white/50 px-7 py-4 font-semibold hover:bg-white/10">Call 720-643-9690</a>
          </div>
        </div>
      </section>
    </main>
  )
}
