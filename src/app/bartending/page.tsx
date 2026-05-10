import Image from "next/image";
import Link from "next/link";

export default function BartendingPage() {
  return (
    <main className="bg-black text-white">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Professional Bartenders for Your Event
          </h1>

          <p className="text-lg text-gray-300 mb-6">
            Tap & Toast provides experienced, friendly bartenders for weddings,
            corporate events, and private parties across Colorado.
          </p>

          <div className="flex gap-4">
            <Link
              href="/book"
              className="bg-[#c6a25a] text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
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
        </div>

        <div className="rounded-xl overflow-hidden">
          <Image
            src="/bartending-picture.jpg"
            alt="Bartending at Tap & Toast event"
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

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
          <div key={i} className="bg-neutral-900 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-400">{item.text}</p>
          </div>
        ))}
      </section>

      {/* PACKAGES */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Bartending Packages
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {/* CLASSIC */}
          <div className="bg-neutral-900 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">The Classic</h3>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li>• 1 Professional Bartender</li>
              <li>• 3 Hours Service</li>
              <li>• Full Bar Setup</li>
            </ul>
            <p className="text-xl font-semibold mb-6">Starting at $300</p>
            <Link href="/book" className="bg-[#c6a25a] text-black px-5 py-2 rounded-lg font-semibold">
              Book Now
            </Link>
          </div>

          {/* ELEVATED */}
          <div className="bg-neutral-900 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">The Elevated</h3>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li>• 2 Professional Bartenders</li>
              <li>• 4 Hours Service</li>
              <li>• High Volume Events</li>
            </ul>
            <p className="text-xl font-semibold mb-6">Starting at $600</p>
            <Link href="/book" className="bg-[#c6a25a] text-black px-5 py-2 rounded-lg font-semibold">
              Book Now
            </Link>
          </div>

        </div>
      </section>

      {/* MEET JEN */}
      <section className="max-w-7xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-12 items-center">

        <div className="rounded-xl overflow-hidden">
          <Image
            src="/bartending-picture.jpg"
            alt="Bartending at Tap & Toast event"
            width={600}
            height={700}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">
            Meet Your Bartending Team
          </h2>
          <p className="text-gray-300 mb-4">
            Led by Jen, Tap & Toast delivers a high-end bartending experience
            with a personal touch. From weddings to private events, we focus on
            making your event seamless and unforgettable.
          </p>

          <a
            href="mailto:jen@coloradotapandtoast.com"
            className="text-[#c6a25a] underline"
          >
            Contact Jen directly
          </a>
        </div>

      </section>

    </main>
  );
}
