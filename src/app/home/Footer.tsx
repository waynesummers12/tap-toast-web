import Image from 'next/image';

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
          <p className="text-sm">jen@coloradotapntoast.com</p>
          <p className="text-sm">Instagram: @coloradotapandtoast</p>
        </div>

      </div>

      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm">
        © {new Date().getFullYear()} Tap & Toast Mobile Bar · Denver, Colorado
      </div>
    </footer>
  )
}