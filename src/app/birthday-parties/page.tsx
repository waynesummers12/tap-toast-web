import Image from "next/image"
export const metadata = {
  title: "Parties Mobile Bar Service | Tap & Toast",
  description:
    "Tap & Toast provides fun and stylish mobile bar service for birthday parties across Colorado. Perfect for backyard parties, milestone birthdays, and private celebrations.",
}

export default function BirthdayPartiesPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-200">

      {/* HERO */}
      <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block">Parties</span>
            <span className="block text-3xl md:text-4xl font-semibold mt-2">
              Mobile Bar Service
            </span>
          </h1>

          <p className="text-xl max-w-xl opacity-80 leading-relaxed">
            Celebrate your birthday in style with Tap & Toast’s mobile bar
            experience. Our professional bartenders and beautiful bar setup make
            backyard parties, milestone birthdays, and private celebrations feel
            like a VIP event.
          </p>

          <div className="mt-10">
            <a
              href="/book"
              className="block w-full md:w-auto text-center bg-black text-white px-6 md:px-8 py-4 rounded-sm font-semibold text-lg hover:opacity-90 transition whitespace-normal wrap-break-word"
            >
              Get Birthday Party Quote
            </a>
          </div>
        </div>

        <div>
          <Image
            src="/corporate-bar.jpg"
            alt="Tap & Toast mobile bar setup"
            width={800}
            height={500}
            className="rounded-sm border border-neutral-200 w-full object-cover"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-8 pb-24 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        <div className="bg-neutral-950 text-white p-8 rounded-sm border border-neutral-800">
          <h3 className="text-xl font-semibold mb-3">Private Party Vibes</h3>
          <p className="opacity-70">
            Our mobile bar instantly elevates your birthday party atmosphere
            and creates a memorable centerpiece for guests.
          </p>
        </div>

        <div className="bg-neutral-950 text-white p-8 rounded-sm border border-neutral-800">
          <h3 className="text-xl font-semibold mb-3">Signature Drinks</h3>
          <p className="opacity-70">
            Choose custom drink menus or themed cocktails that match your
            birthday celebration.
          </p>
        </div>

        <div className="bg-neutral-950 text-white p-8 rounded-sm border border-neutral-800">
          <h3 className="text-xl font-semibold mb-3">Stress-Free Hosting</h3>
          <p className="opacity-70">
            Our bartenders handle the drink service so you can relax and enjoy
            the party with friends and family.
          </p>
        </div>

      </section>

      {/* PARTY TYPES */}
      <section className="px-8 pb-24 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Perfect For Birthday Celebrations Like</h2>

        <ul className="grid md:grid-cols-2 gap-6 text-lg opacity-80">
          <li>• 21st Birthday Parties</li>
          <li>• 30th / 40th / 50th Milestone Birthdays</li>
          <li>• Backyard Birthday Parties</li>
          <li>• Surprise Parties</li>
          <li>• Private House Parties</li>
          <li>• Outdoor Summer Celebrations</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="px-8 pb-32 max-w-6xl mx-auto">
        <div className="bg-black text-white p-6 sm:p-12 md:p-16 rounded-sm">

          <h2 className="text-3xl font-bold mb-4">
            Throw a Birthday Party Guests Will Remember
          </h2>

          <p className="mb-8 text-lg">
            Tap & Toast brings the bar, the bartenders, and the energy so your
            birthday celebration becomes an unforgettable experience.
          </p>

          <a
            href="/book"
            className="block w-full md:w-auto text-center bg-white text-black px-6 md:px-8 py-4 rounded-sm font-semibold whitespace-normal wrap-break-word"
          >
            Reserve Your Party Date
          </a>

        </div>
      </section>

    </main>
  )
}