import Image from "next/image"

export const metadata = {
  title: "Dirty Soda Bar Catering | Tap & Toast",
  description:
    "Tap & Toast offers a Dirty Soda Bar experience for weddings, corporate events, and birthday parties across Colorado. Custom soda mixes, fun flavors, and a unique event experience.",
}

export default function DirtySodaBarPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="px-8 py-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE (TEXT) */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Dirty Soda Bar
            </h1>

            <p className="text-xl max-w-xl opacity-80 leading-relaxed">
              Tap & Toast now offers a fun and interactive <strong>Dirty Soda Bar</strong>
              experience for events across Colorado. Inspired by the viral soda trend,
              our mobile soda bar brings custom soda creations, flavored syrups,
              creams, and garnishes that guests absolutely love.
            </p>

            <div className="mt-10">
              <a
                href="/book"
                className="block w-full md:w-auto text-center bg-[#c7a45a] text-black px-6 md:px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition whitespace-normal wrap-break-word"
              >
                Book a Dirty Soda Bar
              </a>
            </div>
          </div>

          {/* RIGHT SIDE (IMAGE) */}
          <div>
            <Image
              src="/dirty-soda-bar.jpg"
              alt="Dirty Soda Bar Birthday Party Experience"
              width={1200}
              height={700}
              className="rounded-xl shadow-2xl object-cover"
            />
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="px-8 pb-24 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        <div className="bg-zinc-900 p-8 rounded-xl">
          <h3 className="text-xl font-semibold mb-3">Custom Soda Creations</h3>
          <p className="opacity-70">
            Guests can mix and match flavors, syrups, fruit garnishes and cream
            toppers to create their own custom soda combinations.
          </p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-xl">
          <h3 className="text-xl font-semibold mb-3">Perfect for All Ages</h3>
          <p className="opacity-70">
            A dirty soda bar is a huge hit at weddings, corporate events,
            birthday parties, and family celebrations.
          </p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-xl">
          <h3 className="text-xl font-semibold mb-3">Mobile Setup</h3>
          <p className="opacity-70">
            Our mobile bar trailer and staff bring everything needed to serve
            delicious sodas anywhere in Colorado.
          </p>
        </div>

      </section>

      {/* EVENT TYPES */}
      <section className="px-8 pb-24 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Perfect For Events Like</h2>

        <ul className="grid md:grid-cols-2 gap-6 text-lg opacity-80">
          <li>• Weddings</li>
          <li>• Corporate Events</li>
          <li>• Birthday Parties</li>
          <li>• Graduation Parties</li>
          <li>• School Events</li>
          <li>• Company Celebrations</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="px-8 pb-32 max-w-6xl mx-auto">
        <div className="bg-[#c7a45a] text-black p-12 rounded-2xl">

          <h2 className="text-3xl font-bold mb-4">
            Ready to Add a Dirty Soda Bar to Your Event?
          </h2>

          <p className="mb-8 text-lg">
            Tap & Toast makes event planning easy with professional staff,
            a beautiful mobile setup, and a soda bar experience guests
            will remember.
          </p>

          <div className="mb-8">
            <Image
              src="/dirty-soda-drinks.jpg"
              alt="Dirty Soda Drink Options"
              width={1200}
              height={700}
              className="rounded-xl shadow-lg object-cover"
            />
          </div>

          <a
            href="/book"
            className="block w-full md:w-auto text-center bg-black text-white px-6 md:px-8 py-4 rounded-lg font-semibold whitespace-normal wrap-break-word"
          >
            Get Your Event Quote
          </a>

        </div>
      </section>

    </main>
  )
}