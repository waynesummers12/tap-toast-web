import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Corporate Event Mobile Bar Service | Tap & Toast",
  description:
    "Tap & Toast provides professional mobile bar service for corporate events across Colorado. Perfect for company parties, networking events, holiday celebrations, and brand activations.",
}

export default function CorporateEventsPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#c7a45a] selection:text-black">

      {/* HERO */}
      <section className="px-8 py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        <div>
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
            <Link
              href="/book"
              prefetch
              className="inline-block bg-[#c7a45a] text-black px-10 py-5 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(199,164,90,0.4)]"
            >
              Request Corporate Event Quote
            </Link>
            <p className="text-sm text-[#c7a45a] mt-6">
              Trusted by teams across Colorado — limited availability for peak event dates
            </p>
            <p className="text-xs text-white/60 mt-2">
              ✔ Professional staff  ✔ Seamless setup  ✔ Designed for high-volume events
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

      {/* FEATURES */}
      <section className="px-8 pb-24 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        <div className="bg-neutral-900/70 backdrop-blur p-8 rounded-2xl border border-white/10 hover:border-[#c7a45a] transition">
          <h3 className="text-xl font-semibold mb-3">Professional Bartenders</h3>
          <p className="opacity-70">
            Our experienced bartenders provide fast, friendly service while
            maintaining a polished appearance perfect for professional events.
          </p>
        </div>

        <div className="bg-neutral-900/70 backdrop-blur p-8 rounded-2xl border border-white/10 hover:border-[#c7a45a] transition">
          <h3 className="text-xl font-semibold mb-3">Custom Drink Menus</h3>
          <p className="opacity-70">
            Create signature drinks or custom menus tailored to your brand,
            company culture, or event theme.
          </p>
        </div>

        <div className="bg-neutral-900/70 backdrop-blur p-8 rounded-2xl border border-white/10 hover:border-[#c7a45a] transition">
          <h3 className="text-xl font-semibold mb-3">Mobile Bar Setup</h3>
          <p className="opacity-70">
            Our stylish mobile bar setup becomes a centerpiece for your event
            while efficiently serving drinks to large groups.
          </p>
        </div>

      </section>

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

      {/* CTA */}
      <section className="px-8 pb-32 max-w-6xl mx-auto">
        <div className="bg-[#c7a45a] text-black p-12 md:p-16 rounded-3xl shadow-[0_20px_60px_rgba(199,164,90,0.3)]">

          <h2 className="text-3xl font-bold mb-4">
            Make Your Corporate Event Stand Out
          </h2>

          <p className="mb-8 text-lg">
            Tap & Toast handles the bar service so your team can focus on
            connecting with guests and enjoying the event.
          </p>

          <Link
            href="/book"
            prefetch
            className="block w-full md:w-auto text-center bg-black text-white px-10 py-5 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300"
          >
            Book Your Corporate Event
          </Link>

        </div>
      </section>

    </main>
  )
}