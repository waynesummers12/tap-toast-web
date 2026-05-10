import Image from "next/image";
import Link from "next/link";

export default function BartendingPage() {
  return (
    <main className="bg-black text-white selection:bg-[#c6a25a] selection:text-black">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 items-center">
        
        <div>
          <h1 className="text-4xl md:text-6xl font-semibold mb-6 leading-tight">
            Professional Bartenders for Your Event
          </h1>

          <p className="text-lg text-gray-300 mb-8 max-w-lg">
            Tap & Toast provides experienced, friendly bartenders for weddings,
            corporate events, and private parties across Colorado.
          </p>

          <p className="text-sm text-[#c6a25a] mb-4">
            Limited availability — most weekends book out 2–4 weeks in advance
          </p>
          <div className="flex gap-4">
            <Link
              href="/book"
              className="bg-[#c6a25a] text-black px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(198,162,90,0.4)]"
            >
              Get a Quote
            </Link>

            <a
              href="tel:7206439690"
              className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition"
            >
              Call Now
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            ✔ Trusted by Colorado event hosts  ✔ Fast response times  ✔ Stress-free setup
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <Image
            src="/bartending-2.jpg"
            alt="Bartending at Tap & Toast event"
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent my-10" />
      {/* TESTIMONIALS */}
      <section className="max-w-6xl mx-auto px-6 pb-24 text-center">
        <h2 className="text-3xl font-semibold mb-12">What Clients Are Saying</h2>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            {
              quote: "Absolutely incredible experience. Our guests loved the bartenders and everything ran perfectly.",
              name: "Wedding Client"
            },
            {
              quote: "Professional, fun, and seamless from start to finish. Highly recommend.",
              name: "Corporate Event"
            },
            {
              quote: "They made our party unforgettable. The drinks, setup, and service were top tier.",
              name: "Private Party"
            }
          ].map((t, i) => (
            <div key={i} className="bg-neutral-900/80 p-6 rounded-2xl border border-white/10">
              <p className="text-gray-300 mb-4 italic">&quot;{t.quote}&quot;</p>
              <p className="text-[#c6a25a] font-medium">{t.name}</p>
            </div>
          ))}

        </div>
      </section>

      <div className="text-center pb-16">
        <Link
          href="/book"
          className="inline-block bg-[#c6a25a] text-black px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
        >
          Check Availability for Your Date
        </Link>
      </div>

      <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent my-10" />

      {/* WHY US */}
      <section className="max-w-7xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Licensed & Experienced",
            text: "Professional bartenders who know how to run a smooth event."
          },
          {
            title: "Friendly & Professional",
            text: "Great energy, great service, and amazing guest experience."
          },
          {
            title: "We Handle Everything",
            text: "Setup, tools, service flow — we’ve got it covered."
          }
        ].map((item, i) => (
          <div key={i} className="bg-neutral-900/70 backdrop-blur p-6 rounded-2xl border border-white/10 hover:border-[#c6a25a] transition">
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-400">{item.text}</p>
          </div>
        ))}
      </section>

      <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent my-10" />

      {/* PERFECT FOR */}
      <section className="max-w-6xl mx-auto px-6 pb-20 text-center">
        <h2 className="text-3xl font-semibold mb-10">Perfect For</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Weddings",
            "Corporate Events",
            "Private Parties"
          ].map((item, i) => (
            <div key={i} className="bg-neutral-900/70 p-6 rounded-2xl border border-white/10">
              <p className="text-lg font-medium">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent my-10" />

      {/* WHAT’S INCLUDED */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-semibold mb-10 text-center">What’s Included</h2>

        <div className="grid md:grid-cols-3 gap-6 text-gray-300">
          {[
            "Professional bartending staff",
            "Full bar setup + tools",
            "Custom drink guidance",
            "Efficient guest service flow",
            "Clean, polished presentation",
            "Seamless setup & breakdown"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[#c6a25a]">✔</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent my-10" />

      {/* PACKAGES */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Bartending Packages
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {/* CLASSIC */}
          <div className="bg-neutral-900/80 backdrop-blur p-8 rounded-2xl border border-white/10 hover:scale-[1.02] transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4">The Classic</h3>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li>• 1 Professional Bartender</li>
              <li>• 3 Hours Service</li>
              <li>• Full Bar Setup</li>
            </ul>
            <p className="text-2xl font-semibold mb-6 text-[#c6a25a]">Starting at $300</p>
            <Link href="/book" className="bg-[#c6a25a] text-black px-5 py-2 rounded-lg font-semibold">
              Book Now
            </Link>
          </div>

          {/* ELEVATED */}
          <div className="bg-neutral-900/80 backdrop-blur p-8 rounded-2xl border border-white/10 hover:scale-[1.02] transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4">The Elevated</h3>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li>• 2 Professional Bartenders</li>
              <li>• 4 Hours Service</li>
              <li>• High Volume Events</li>
            </ul>
            <p className="text-2xl font-semibold mb-6 text-[#c6a25a]">Starting at $600</p>
            <Link href="/book" className="bg-[#c6a25a] text-black px-5 py-2 rounded-lg font-semibold">
              Book Now
            </Link>
          </div>

        </div>
      </section>

      <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent my-10" />

      {/* MEET JEN */}
      <section className="max-w-7xl mx-auto px-6 pb-28 grid md:grid-cols-2 gap-16 items-center">

        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <Image
            src="/bartending-picture.jpg"
            alt="Bartending at Tap & Toast event"
            width={600}
            height={700}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Meet Your Bartending Team
          </h2>
          <p className="text-gray-300 mb-5 leading-relaxed">
            Led by Jen, Tap & Toast delivers a high-end bartending experience
            with a personal touch. From weddings to private events, we focus on
            making your event seamless and unforgettable.
          </p>

          <a
            href="mailto:jen@coloradotapandtoast.com"
            className="inline-block text-[#c6a25a] font-medium hover:underline"
          >
            Contact Jen directly
          </a>
        </div>

      </section>

      {/* FINAL CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-32 text-center">

        <h2 className="text-4xl font-semibold mb-6">
          Ready to Elevate Your Event?
        </h2>

        <p className="text-gray-300 mb-10">
          Let’s make your event seamless, professional, and unforgettable.
        </p>

        <Link
          href="/book"
          className="inline-block bg-[#c6a25a] text-black px-10 py-5 rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(198,162,90,0.5)]"
        >
          Check Availability
        </Link>

      </section>

      {/* MOBILE STICKY CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-black border-t border-white/10 p-4 flex justify-center md:hidden z-50">
        <Link
          href="/book"
          className="w-full max-w-md text-center bg-[#c6a25a] text-black py-3 rounded-lg font-semibold"
        >
          Book Your Date
        </Link>
      </div>

    </main>
  );
}
