import Link from "next/link"

export const metadata = {
  title: "What is a Dirty Soda Bar? | Tap & Toast",
  description:
    "Learn what a dirty soda bar is, how it works, and why it's the perfect addition to weddings, parties, and corporate events.",
}

export default function WhatIsDirtySodaBarPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#c7a45a] selection:text-black">

      {/* SEO SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "What is a Dirty Soda Bar?",
            "description": "A guide explaining what a dirty soda bar is and why it's popular for events.",
            "author": {
              "@type": "Organization",
              "name": "Tap & Toast"
            }
          })
        }}
      />

      {/* HERO */}
      <section className="px-8 py-24 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          What is a Dirty Soda Bar?
        </h1>

        <p className="text-xl opacity-80 max-w-2xl mx-auto">
          A dirty soda bar is one of the fastest growing trends in event entertainment —
          offering customizable, fun, and unforgettable drink experiences for guests of all ages.
        </p>
      </section>

      {/* CONTENT */}
      <section className="px-8 pb-24 max-w-4xl mx-auto space-y-10 text-lg text-gray-300 leading-relaxed">

        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">What is a Dirty Soda?</h2>
          <p>
            A &quot;dirty soda&quot; is a soft drink mixed with flavored syrups, cream, fruit, and other
            custom add-ins to create a unique and refreshing beverage. Originating in the western
            United States, dirty sodas have become incredibly popular at events and parties.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">What is a Dirty Soda Bar?</h2>
          <p>
            A dirty soda bar is a fully customizable drink station where guests can choose their
            base soda, flavors, and toppings. It creates an interactive experience that guests love,
            making it a perfect addition to weddings, birthday parties, and corporate events.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">Why Are Dirty Soda Bars So Popular?</h2>
          <p>
            Dirty soda bars offer something unique compared to traditional drink stations. They are
            fun, visually appealing, and customizable, allowing guests to create drinks that match
            their taste. They are also inclusive, making them perfect for both kids and adults.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">What Events Are Best for a Dirty Soda Bar?</h2>
          <p>
            Dirty soda bars are perfect for weddings, birthday parties, corporate events, school
            functions, graduation parties, and more. They provide a memorable experience that guests
            talk about long after the event is over.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">Where Can I Book a Dirty Soda Bar Near Me?</h2>
          <p>
            Tap & Toast provides mobile dirty soda bar catering across Colorado including Denver,
            Parker, Littleton, Lakewood, Highlands Ranch, and Centennial.
          </p>
        </div>

      </section>

      {/* CTA */}
      <section className="px-8 pb-32 max-w-4xl mx-auto text-center">
        <div className="bg-[#c7a45a] text-black p-12 md:p-16 rounded-3xl shadow-[0_20px_60px_rgba(199,164,90,0.3)]">

          <h2 className="text-3xl font-bold mb-4">
            Book a Dirty Soda Bar for Your Event
          </h2>

          <p className="mb-8 text-lg">
            Create a unique experience your guests will love — perfect for any occasion.
          </p>

          <Link
            href="/book"
            prefetch
            className="inline-block bg-black text-white px-10 py-5 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300"
          >
            Check Availability
          </Link>

        </div>
      </section>

    </main>
  )
}
