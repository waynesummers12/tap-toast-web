

export const metadata = {
  title: "Corporate Event Mobile Bar Service | Tap & Toast",
  description:
    "Tap & Toast provides professional mobile bar service for corporate events across Colorado. Perfect for company parties, networking events, holiday celebrations, and brand activations.",
}

export default function CorporateEventsPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="px-8 py-24 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Corporate Event Bar Service
        </h1>

        <p className="text-xl max-w-3xl opacity-80 leading-relaxed">
          Tap & Toast delivers a polished and professional mobile bar
          experience for corporate events throughout Colorado. From company
          celebrations and networking events to brand launches and holiday
          parties, our bartenders and mobile bar trailer create a memorable
          guest experience.
        </p>

        <div className="mt-10">
          <a
            href="/book"
            className="bg-[#c7a45a] text-black px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition"
          >
            Request Corporate Event Quote
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-8 pb-24 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        <div className="bg-zinc-900 p-8 rounded-xl">
          <h3 className="text-xl font-semibold mb-3">Professional Bartenders</h3>
          <p className="opacity-70">
            Our experienced bartenders provide fast, friendly service while
            maintaining a polished appearance perfect for professional events.
          </p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-xl">
          <h3 className="text-xl font-semibold mb-3">Custom Drink Menus</h3>
          <p className="opacity-70">
            Create signature drinks or custom menus tailored to your brand,
            company culture, or event theme.
          </p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-xl">
          <h3 className="text-xl font-semibold mb-3">Mobile Bar Setup</h3>
          <p className="opacity-70">
            Our stylish mobile bar setup becomes a centerpiece for your event
            while efficiently serving drinks to large groups.
          </p>
        </div>

      </section>

      {/* EVENT TYPES */}
      <section className="px-8 pb-24 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Perfect For Corporate Events Like</h2>

        <ul className="grid md:grid-cols-2 gap-6 text-lg opacity-80">
          <li>• Company Holiday Parties</li>
          <li>• Networking Events</li>
          <li>• Product Launches</li>
          <li>• Client Appreciation Events</li>
          <li>• Team Celebrations</li>
          <li>• Brand Activations</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="px-8 pb-32 max-w-6xl mx-auto">
        <div className="bg-[#c7a45a] text-black p-12 rounded-2xl">

          <h2 className="text-3xl font-bold mb-4">
            Make Your Corporate Event Stand Out
          </h2>

          <p className="mb-8 text-lg">
            Tap & Toast handles the bar service so your team can focus on
            connecting with guests and enjoying the event.
          </p>

          <a
            href="/book"
            className="bg-black text-white px-8 py-4 rounded-lg font-semibold"
          >
            Book Your Corporate Event
          </a>

        </div>
      </section>

    </main>
  )
}