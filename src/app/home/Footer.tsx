import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const [ctaText, setCtaText] = useState('Get Quote');

  useEffect(() => {
    const updateCTA = () => {
      const scrollY = window.scrollY;
      const hour = new Date().getHours();

      // Page-based logic
      if (pathname === '/book') {
        setCtaText('Finish Booking');
        return;
      }

      // Scroll-based logic
      if (scrollY > 800) {
        setCtaText('Check Availability');
        return;
      }

      // Time-based logic
      if (hour >= 18) {
        setCtaText('Book for This Weekend');
      } else {
        setCtaText('Get Quote');
      }
    };

    updateCTA();
    window.addEventListener('scroll', updateCTA);

    return () => window.removeEventListener('scroll', updateCTA);
  }, [pathname]);

  return (
    <footer className="bg-black text-gray-400 py-16 px-6 pb-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 items-start text-center md:text-left">

        {/* Logo */}
        <div className="flex items-center justify-center md:justify-start gap-4">
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
          <p className="text-sm mt-2 text-white font-medium">
            Fully Insured · General & Liquor Liability Coverage
          </p>
        </div>

        {/* Contact */}
        <div className="text-center md:text-right">
          <p className="text-white font-semibold mb-2">Contact</p>

          <div className="space-y-2">
            <a
              href="mailto:jen@coloradotapandtoast.com"
              className="block text-sm text-gray-300 hover:text-white transition"
            >
              jen@coloradotapandtoast.com
            </a>

            <a
              href="tel:7206439690"
              className="block text-base text-white font-semibold hover:underline underline-offset-4 transform transition hover:scale-105"
            >
              <span className="inline-flex items-center justify-center md:justify-start gap-2">
                <span aria-hidden="true">📞</span>
                720-643-9690
              </span>
            </a>

            <p className="text-xs text-white font-semibold">
              Call or text anytime
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:justify-end items-center gap-3 mt-5">

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
              className="bg-[#c7a45a] text-black px-5 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition mx-auto md:mx-0"
            >
              Get Quote
            </Link>

          </div>
        </div>

      </div>

      <div className="border-t border-gray-800 mt-14 pt-6 text-center text-sm space-y-2">

        <div className="flex justify-center gap-4 text-xs text-gray-400">
          <Link href="/legal/terms" className="hover:text-white transition">
            Terms
          </Link>
          <Link href="/legal/refund-policy" className="hover:text-white transition">
            Refund Policy
          </Link>
          <Link href="/legal/privacy" className="hover:text-white transition">
            Privacy Policy
          </Link>
        </div>

        <div>
          © {new Date().getFullYear()} Tap & Toast Mobile Bar · Denver, Colorado
        </div>

      </div>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 p-3 flex gap-3 md:hidden z-50">
        <a
          href="tel:7206439690"
          className="flex-1 text-center bg-white text-black py-3 rounded-md font-semibold"
        >
          Call Now
        </a>

        <Link
          href="/book"
          className="flex-1 text-center bg-[#c7a45a] text-black py-3 rounded-md font-semibold"
        >
          {ctaText}
        </Link>
      </div>
    </footer>
  )
}