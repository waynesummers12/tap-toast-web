"use client";
import Image from 'next/image';

const shimmerStyles = `
@keyframes shimmer {
  0% { transform: translateX(-120%) skewX(12deg); }
  100% { transform: translateX(220%) skewX(12deg); }
}

@keyframes floatBubble {
  0% { transform: translateY(0) scale(1); opacity:0.25; }
  50% { transform: translateY(-30px) scale(1.05); opacity:0.4; }
  100% { transform: translateY(-60px) scale(1); opacity:0; }
}
`;

export default function PackagesSection() {
  return (
    <section id="packages" className="relative bg-white text-black py-24 px-6 overflow-hidden">
      <style jsx global>{shimmerStyles}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="absolute left-[10%] bottom-10 w-6 h-6 bg-[#9C7A2C]/20 rounded-full animate-[floatBubble_6s_linear_infinite]" />
        <span className="absolute left-[25%] bottom-0 w-4 h-4 bg-[#9C7A2C]/20 rounded-full animate-[floatBubble_8s_linear_infinite]" />
        <span className="absolute left-[45%] bottom-6 w-5 h-5 bg-[#9C7A2C]/20 rounded-full animate-[floatBubble_7s_linear_infinite]" />
        <span className="absolute right-[30%] bottom-4 w-4 h-4 bg-[#9C7A2C]/20 rounded-full animate-[floatBubble_9s_linear_infinite]" />
        <span className="absolute right-[15%] bottom-8 w-6 h-6 bg-[#9C7A2C]/20 rounded-full animate-[floatBubble_10s_linear_infinite]" />
      </div>
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-light tracking-[0.2em] text-[#9C7A2C] uppercase mb-6">
          Packages
        </h2>
        <div className="w-16 h-0.5 bg-black mx-auto mb-6" />
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the perfect Tap & Toast experience for your event.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {/* Package 1 */}
        <div className="relative cursor-pointer bg-black text-white rounded-xl overflow-hidden shadow-xl group transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-[#9C7A2C] hover:shadow-[0_0_25px_rgba(156,122,44,0.45)]">
          <div className="absolute top-4 right-4 bg-[#9C7A2C] text-white text-xs px-4 py-1 rounded-full uppercase tracking-widest shadow-lg z-10">
            Most Popular
          </div>
          <div className="relative overflow-hidden">
            <Image
              src="/package1.jpg?v=1"
              alt="The Taste Package"
              width={600}
              height={224}
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              priority
            />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-full top-0 h-full w-1/2 bg-linear-to-r from-transparent via-white/30 to-transparent transform skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.2s_forwards]" />
            </div>
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <span className="text-white text-sm tracking-widest uppercase">View Package</span>
            </div>
          </div>

          <div className="p-8">
            <div className="inline-block mb-4 px-4 py-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-semibold">The Taste</h3>
            </div>

            <ul className="space-y-2 text-gray-300 mb-6">
              <li>• Mobile Bar Setup</li>
              <li>• Professional Bartender</li>
              <li>• 2 Beverage Options</li>
              <li>• 3 Hour Service</li>
            </ul>

            <p className="text-xl font-bold mb-6">Starting at $600</p>

            <a
              href="/book"
              className="inline-block bg-[#9C7A2C] hover:bg-[#b3913b] text-white px-6 py-3 rounded-full text-sm uppercase tracking-[0.2em]"
            >
              Book Instantly with Real Quote
            </a>
          </div>
          <a href="/book" className="absolute inset-0 z-10" aria-label="Book The Taste package"></a>
        </div>

        {/* Package 2 */}
        <div className="relative cursor-pointer bg-black text-white rounded-xl overflow-hidden shadow-xl group transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-[#9C7A2C] hover:shadow-[0_0_25px_rgba(156,122,44,0.45)]">
          <div className="relative overflow-hidden">
            <Image
              src="/package2.jpg"
              alt="The Tipsy Package"
              width={600}
              height={224}
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-full top-0 h-full w-1/2 bg-linear-to-r from-transparent via-white/30 to-transparent transform skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.2s_forwards]" />
            </div>
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <span className="text-white text-sm tracking-widest uppercase">View Package</span>
            </div>
          </div>

          <div className="p-8">
            <div className="inline-block mb-4 px-4 py-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-semibold">The Tipsy</h3>
            </div>

            <ul className="space-y-2 text-gray-300 mb-6">
              <li>• Mobile Bar Setup</li>
              <li>• 2 Professional Bartenders</li>
              <li>• 3 Beverage Options</li>
              <li>• 4 Hour Service</li>
            </ul>

            <p className="text-xl font-bold mb-6">Starting at $850</p>

            <a
              href="/book"
              className="inline-block bg-[#9C7A2C] hover:bg-[#b3913b] text-white px-6 py-3 rounded-full text-sm uppercase tracking-[0.2em]"
            >
              Book Instantly with Real Quote
            </a>
          </div>
          <a href="/book" className="absolute inset-0 z-10" aria-label="Book The Tipsy package"></a>
        </div>

        {/* Package 3 */}
        <div className="relative cursor-pointer bg-black text-white rounded-xl overflow-hidden shadow-xl group transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-[#9C7A2C] hover:shadow-[0_0_25px_rgba(156,122,44,0.45)]">
          <div className="relative overflow-hidden">
            <Image
              src="/package3.jpg"
              alt="The Toasted Package"
              width={600}
              height={224}
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-full top-0 h-full w-1/2 bg-linear-to-r from-transparent via-white/30 to-transparent transform skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.2s_forwards]" />
            </div>
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <span className="text-white text-sm tracking-widest uppercase">View Package</span>
            </div>
          </div>

          <div className="p-8">
            <div className="inline-block mb-4 px-4 py-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-semibold">The Toasted</h3>
            </div>

            <ul className="space-y-2 text-gray-300 mb-6">
              <li>• Mobile Bar Setup</li>
              <li>• 2+ Professional Bartenders</li>
              <li>• Custom Cocktail Menu</li>
              <li>• 5 Hour Service</li>
            </ul>

            <p className="text-xl font-bold mb-6">Premium Experience</p>

            <a
              href="/book"
              className="inline-block bg-[#9C7A2C] hover:bg-[#b3913b] text-white px-6 py-3 rounded-full text-sm uppercase tracking-[0.2em]"
            >
              Book Instantly with Real Quote
            </a>
          </div>
          <a href="/book" className="absolute inset-0 z-10" aria-label="Book The Toasted package"></a>
        </div>

      </div>
    </section>
  )
}