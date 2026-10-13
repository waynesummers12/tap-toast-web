import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Breadcrumbs from "../components/Breadcrumbs"

export const metadata: Metadata = {
  title: "College & NFL Tailgate Keg Tap Trailer in Colorado | Tap & Toast",
  description: "Plan your Broncos, CU, or Colorado School of Mines tailgate with our $800 keg tap trailer rental, including free delivery and pickup. Contact Jen for availability.",
  alternates: { canonical: "https://www.coloradotapandtoast.com/tailgates" },
}

const inquiryHref = "mailto:jen@coloradotapandtoast.com?subject=Tailgate%20trailer%20inquiry&body=Hi%20Jen%2C%0A%0AI%27m%20planning%20a%20tailgate.%0AGame%20and%20date%3A%20%0ALocation%20or%20parking%20lot%3A%20%0AGuest%20count%3A%20%0ATrailer%20rental%20or%20bartending%20service%3A%20%0A%0AThank%20you!"

export default function TailgatesPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-950 selection:bg-stone-200">
      <Breadcrumbs items={[{ name: "Tailgates", path: "/tailgates" }]} />
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:py-20 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600">Colorado game days · Tap & Toast</p>
          <h1 className="text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">Your crew.<br />Your colors.<br /><span className="italic">Your tailgate.</span></h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-neutral-700">Bring the keg tap trailer into your Broncos, CU, or Colorado School of Mines game-day plans. A place to gather, pour a drink, and get the pregame celebration started.</p>
          <div className="mt-7 border-y border-neutral-200 py-5">
            <p className="text-3xl font-semibold">$800 <span className="text-base font-normal">tap trailer rental</span></p>
            <p className="mt-2 font-semibold">Free delivery &amp; pickup for Broncos, CU, and School of Mines game-day tailgates</p>
            <p className="mt-2 text-sm text-neutral-600">You supply the alcohol. Contact Jen to confirm your date and location.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={inquiryHref} className="inline-flex min-h-12 items-center justify-center bg-black px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-neutral-800">Plan Your Tailgate <span aria-hidden="true" className="ml-4">↗</span></a>
            <a href="#the-trailer" className="inline-flex min-h-12 items-center px-2 py-3 text-sm underline underline-offset-4">Meet the keg tap trailer</a>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-neutral-600">Tell Jen your game date and location to discuss availability and setup.</p>
        </div>
        <figure className="min-w-0 border border-stone-200 bg-stone-100 p-5 sm:p-8">
          <Image src="/tap-trailer-clean.png" alt="Tap & Toast keg tap trailer with a wood bar, metal roof, and four taps" width={1303} height={1207} priority sizes="(max-width: 1023px) 100vw, 50vw" className="h-auto w-full" />
          <figcaption className="mt-5 border-t border-stone-300 pt-4 text-center text-sm text-neutral-600">The Tap & Toast keg tap trailer</figcaption>
        </figure>
      </section>

      <section className="bg-black px-6 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-neutral-400">Saturdays. Sundays. Your kind of celebration.</p>
          <h2 className="max-w-3xl text-4xl leading-tight md:text-5xl">Make the pregame part of the tradition.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-16">
            <article className="border-t border-white/30 pt-6">
              <h3 className="mb-4 text-3xl">College game days</h3>
              <p className="max-w-lg leading-relaxed text-neutral-300">Gather your CU or Colorado School of Mines alumni crew, friends, and fellow fans before kickoff. Start with your game, your guest list, and the place you want to meet.</p>
            </article>
            <article className="border-t border-white/30 pt-6">
              <h3 className="mb-4 text-3xl">NFL tailgates</h3>
              <p className="max-w-lg leading-relaxed text-neutral-300">Bring your Sunday crew together around the bar. Share your tailgate plans with Jen to explore how the trailer could fit your game day.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="the-trailer" className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:py-24 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600">The bar comes with character</p>
          <h2 className="text-4xl leading-tight md:text-5xl">Real taps.<br />A gathering place for your fans.</h2>
          <p className="mt-6 max-w-lg leading-relaxed text-neutral-700">A wood bar, a covered serving area, and keg taps give your gathering a centerpiece. Ask about a DIY trailer rental or an event with bartending service.</p>
          <Link href="/bartending" className="mt-6 inline-block py-3 font-semibold underline underline-offset-4">Explore our bartending service</Link>
        </div>
        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {[
            ["01", "Pick your game", "Share the date, approximate guest count, and when you want your tailgate to start."],
            ["02", "Talk through the location", "Send Jen the venue or parking lot details so you can discuss trailer access and setup before booking."],
            ["03", "Plan the drinks", "You supply the alcohol. Discuss your keg plans and whether you want trailer rental or bartending service with Jen."],
          ].map(([number, title, copy]) => (
            <div key={number} className="flex gap-5 py-7">
              <span className="pt-1 text-sm text-neutral-500">{number}</span>
              <div><h3 className="text-2xl">{title}</h3><p className="mt-2 leading-relaxed text-neutral-700">{copy}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-stone-50 px-6 py-16 text-center md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-4xl md:text-5xl">Let’s talk game day.</h2>
          <p className="mt-5 leading-relaxed text-neutral-700">Have a college or NFL tailgate in mind? Contact Jen with your date and location to work through the details.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={inquiryHref} className="inline-flex min-h-12 items-center justify-center bg-black px-8 py-4 font-semibold text-white hover:bg-neutral-800">Email Jen About a Tailgate</a>
            <a href="tel:7206439690" className="inline-flex min-h-12 items-center justify-center border border-black px-8 py-4 font-semibold hover:bg-stone-200">Call 720-643-9690</a>
          </div>
        </div>
      </section>
    </main>
  )
}
