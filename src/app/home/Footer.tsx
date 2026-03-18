import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 items-center">

        {/* Logo */}
        <div className="flex items-center gap-4">
          <Image
            src="/web-app-manifest-512x512.png"
            alt="Tap & Toast Mobile Bar Logo"
            width={56}
            height={56}
            className="rounded"
          />

          <div>
            <p className="text-white text-lg font-semibold">Colorado Tap & Toast</p>
            <p className="text-sm">Mobile Bar</p>
          </div>
        </div>

        {/* Service Area */}
        <div className="text-center md:text-left">
          <p className="text-white font-semibold mb-2">Service Area</p>
          <p className="text-sm leading-relaxed">
            Denver • Boulder • Fort Collins • Colorado Springs
          </p>
          <p className="text-sm">
            Serving the Front Range of Colorado and events across the state.
          </p>
        </div>

        {/* Contact */}
        <div className="text-center md:text-right">
          <p className="text-white font-semibold mb-2">Contact</p>

          <a
            href="mailto:jen@coloradotapandtoast.com"
            className="block text-sm hover:text-white transition"
          >
            jen@coloradotapandtoast.com
          </a>

          <a
            href="tel:7206439690"
            className="block text-sm mt-1 hover:text-white transition"
          >
            720-643-9690
          </a>

          <p className="text-xs mt-1 opacity-70">
            Call or text anytime
          </p>

          <div className="flex flex-col md:flex-row md:justify-end items-center gap-3 mt-4">

            <a
              href="https://instagram.com/coloradotapandtoast"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-white transition"
            >
              Instagram: @coloradotapandtoast
            </a>

            <Link
              href="/book"
              className="bg-[#c7a45a] text-black px-5 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
            >
              Get Quote
            </Link>

          </div>
        </div>

      </div>

      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm">
        © {new Date().getFullYear()} Tap & Toast Mobile Bar · Denver, Colorado
      </div>
    </footer>
  )
}