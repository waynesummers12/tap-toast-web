import Breadcrumbs from "../components/Breadcrumbs"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Colorado Corporate Bar & Office Soda Catering | Tap & Toast",
  alternates: { canonical: "https://www.coloradotapandtoast.com/corporate-events" },
  description:
    "Compare staffed bars, trailer rentals, and nonalcoholic soda catering for Denver, Golden, and Front Range company events. Starting prices, organizer checklist, and quotes.",
}

export default function CorporateEventsPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#c7a45a] selection:text-black">
      <Breadcrumbs items={[{"name": "Corporate Events", "path": "/corporate-events"}]} />

      {/* HERO */}
      <section className="px-8 py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        <div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            A Better Way to Bring Your Team Together
          </h1>

          <p className="text-xl max-w-3xl opacity-80 leading-relaxed">
            Plan a company party, employee appreciation day, client gathering, or holiday celebration with a mobile bar experience. Based in Golden, we serve Denver and Colorado’s Front Range with staffed bars, trailer rentals, and nonalcoholic dirty soda catering.
          </p>

          <div className="mt-10">
            <Link
              href="/book?service=bartending&tier=signature"
              prefetch
              className="inline-block bg-[#c7a45a] text-black px-10 py-5 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(199,164,90,0.4)]"
            >
              Get a Staffed Bar Quote
            </Link>
            <p className="text-sm text-[#c7a45a] mt-6">
              Staffed bars from $1,230 · Soda catering from $780 · Trailer rental from $600
            </p>
            <p className="text-xs text-white/60 mt-2">
              Choose your service · Share your venue · Confirm your event quote
            </p>
          </div>
        </div>

        <div>
          <Image
            src="/corporate-bar.jpg"
            alt="Tap & Toast Corporate Event Mobile Bar"
            width={700}
            height={500}
            className="rounded-2xl object-cover border border-white/10 shadow-2xl"
            priority
            quality={80}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

      </section>

      <section id="company-options" aria-labelledby="company-options-heading" className="mx-auto max-w-6xl scroll-mt-28 px-6 pb-20">
        <h2 id="company-options-heading" className="mb-4 text-3xl !text-white md:text-4xl">Choose the right fit for your team</h2>
        <p className="mb-8 max-w-3xl leading-relaxed text-neutral-300">Start with your event’s purpose and drink preferences. These are starting configurations; confirm your final staff, hours, location, and selected extras in the quote.</p>
        <div className="grid gap-6 lg:grid-cols-3">{[
          {name:"Staffed bar service",price:"$1,230",copy:"The Tipsy starts with two bartenders and four service hours. A place to start for company celebrations and client gatherings where alcoholic service fits your plans.",included:"Travel within 40 miles of Golden included. Clients supply alcohol; confirm other shopping needs with Jen.",href:"/book?service=bartending&tier=signature",cta:"Quote a Staffed Bar"},
          {name:"Nonalcoholic soda catering",price:"$780",copy:"One soda host and three service hours to start. Bring a custom soda menu to an employee appreciation day, daytime gathering, or office party.",included:"Soda, syrups, cream, fruit, ice, cups, and napkins supplied. Travel within 40 miles of Golden included.",href:"/book?service=soda&tier=taste",cta:"Quote a Soda Party"},
          {name:"Trailer-only rental",price:"$600",copy:"For company events where drink service is already arranged. Rent the mobile bar trailer and choose your rental hours; no bartenders are included.",included:"Delivery within 20 miles of Golden included. Confirm venue access and serving arrangements before booking.",href:"/book?type=rental&tier=trailer&service=bartending",cta:"Quote a Trailer Rental"},
        ].map(option=><article key={option.name} className="flex flex-col rounded-2xl border border-white/20 bg-neutral-900 p-7"><h3 className="mb-4 text-2xl !text-white">{option.name}</h3><p className="mb-5 text-3xl font-semibold text-[#e6c67c]">From {option.price}</p><p className="mb-4 leading-relaxed text-neutral-200">{option.copy}</p><p className="mb-8 text-sm leading-relaxed text-neutral-300">{option.included}</p><Link href={option.href} className="mt-auto rounded-lg bg-[#c7a45a] px-5 py-4 text-center font-semibold text-black hover:bg-[#dfbe79]">{option.cta}</Link></article>)}</div>
        <Link href="/mobile-bar-pricing" className="mt-6 inline-block text-[#e6c67c] underline underline-offset-4">Compare all standard package prices and inclusions</Link>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20" aria-labelledby="organizer-checklist">
        <h2 id="organizer-checklist" className="mb-8 text-3xl !text-white md:text-4xl">A practical checklist for the event organizer</h2>
        <div className="grid gap-7 md:grid-cols-2">{[
          ["Plan for the busiest moment", "Tell us if guests arrive together after a meeting or come through in shifts. Guest count, arrival patterns, drink complexity, and serving time help determine the right staffing."],
          ["Check building and site access", "Confirm outside-vendor permission, loading access, parking, and setup windows with your property manager or venue. Discuss stairs, elevators, doorways, and trailer placement before choosing equipment."],
          ["Match the menu to the audience", "Choose alcoholic or nonalcoholic service based on your event. Share dietary preferences in advance and confirm specific ingredients or accommodations with Jen."],
          ["Get the details ready for approval", "Have your date, full address, guest count, service window, and preferred package ready. Review the quote, payment terms, venue requirements, and purchasing responsibilities with your company’s decision-maker."],
        ].map(([title,copy])=><article key={title} className="rounded-2xl border border-white/15 p-7"><h3 className="mb-4 text-2xl !text-white">{title}</h3><p className="leading-relaxed text-neutral-300">{copy}</p></article>)}</div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20" aria-labelledby="corporate-questions"><h2 id="corporate-questions" className="mb-8 text-3xl !text-white md:text-4xl">Company event questions</h2><div className="space-y-3">{[
        ["Can we book an alcohol-free office event?", "Yes. Dirty soda catering is a hosted nonalcoholic option, with soda, syrups, cream, fruit, ice, cups, and napkins provided. Confirm your final menu and any dietary needs during planning."],
        ["Can you work at our office?", "Share your address and proposed setup area with Jen. Confirm access, vendor permission, parking, utilities, and space with the property manager. We need to confirm the setup rather than assume a trailer can fit indoors."],
        ["Do you provide the alcohol?", "Clients supply alcohol for alcoholic service. Discuss your menu and shopping plan with Jen and confirm other supplies for your selected package."],
        ["What should I have ready for a quote?", "Your event date, address, estimated guest count, preferred service hours, and whether you want a staffed bar, soda catering, or rental-only trailer. Mention any loading, security, or venue restrictions."],
        ["Can we plan drinks around our event theme?", "Talk with Jen about your menu ideas and preferences. Confirm the details of any personalized menu or signage during planning; custom production requests should be discussed before booking."],
        ["What if our company has special vendor requirements?", "Share insurance documentation requests, onboarding requirements, and deadlines with Jen before finalizing. Confirm what can be provided and when rather than assuming approval is automatic."],
      ].map(([q,a])=><details key={q} className="rounded-xl border border-white/20 p-6"><summary className="cursor-pointer font-semibold">{q}</summary><p className="mt-4 leading-relaxed text-neutral-300">{a}</p></details>)}</div></section>

      {/* EVENT TYPES */}
      <section className="px-8 pb-28 max-w-7xl mx-auto will-change-transform">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12">Perfect For Corporate Events Like</h2>

        <ul className="grid md:grid-cols-2 gap-6 text-lg text-gray-300">
          <li>• Company Holiday Parties</li>
          <li>• Networking Events</li>
          <li>• Product Launches</li>
          <li>• Client Appreciation Events</li>
          <li>• Team Celebrations</li>
          <li>• Brand Activations</li>
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-[#efcfda] bg-[#fce8ef] p-7 text-[#54283c] sm:p-10">
          <h2 className="mb-4 text-3xl">A sweet addition to your team celebration</h2>
          <p className="mb-6 max-w-3xl leading-relaxed text-[#704659]">Planning an employee appreciation day, office party, or company gathering? Explore nonalcoholic soda catering with hosts and ingredients included.</p>
          <a href="/dirty-soda-bar" className="inline-block rounded-full bg-[#99365c] px-7 py-4 font-semibold text-white hover:bg-[#772443]">Explore Dirty Soda Catering</a>
          <a href="/what-is-dirty-soda-bar" className="mt-4 block w-fit underline underline-offset-4">New to dirty soda? Read the planning guide</a>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 pb-32 max-w-6xl mx-auto">
        <div className="bg-[#c7a45a] text-black p-12 md:p-16 rounded-3xl shadow-[0_20px_60px_rgba(199,164,90,0.3)]">

          <h2 className="text-3xl font-bold mb-4">
            Let’s Plan Your Next Company Gathering
          </h2>

          <p className="mb-8 text-lg">
            Share your date, location, guest count, and preferred experience. Jen can help you confirm the right setup for your team.
          </p>

          <Link
            href="/book?service=bartending&tier=signature"
            prefetch
            className="block w-full md:w-auto text-center bg-black text-white px-10 py-5 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300"
          >
            Get a Staffed Bar Quote
          </Link>
          <a href="tel:7206439690" className="mx-auto mt-5 block w-fit font-semibold underline underline-offset-4">Questions or vendor requirements? Call Jen · 720-643-9690</a>
          <a href="mailto:jen@coloradotapandtoast.com?subject=Company%20event%20enquiry" className="mx-auto mt-4 block w-fit underline underline-offset-4">Email your event brief to Jen</a>

        </div>
      </section>

    </main>
  )
}