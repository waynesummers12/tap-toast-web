import Image from "next/image"
import Link from "next/link"

export default function TailgateSection() {
  return (
    <section id="tailgates" className="bg-black px-6 py-16 text-white md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden border border-white/20 bg-black">
          <Image src="/tap-trailer-clean.png" alt="Tap & Toast keg tap trailer with four taps and a covered wood bar" width={1303} height={1207} sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full" />
        </div>
        <div>
          <p className="mb-5 text-xs uppercase tracking-[0.2em] text-neutral-300">Broncos, CU &amp; School of Mines game days</p>
          <h2 className="mb-6 text-white">Your tailgate.<br />Our tap trailer.</h2>
          <p className="max-w-lg leading-relaxed text-neutral-300">Bring the crew together before kickoff with a keg tap trailer rental for your Denver Broncos, CU, or Colorado School of Mines football tailgate.</p>
          <div className="my-8 border-y border-white/30 py-6">
            <p className="text-5xl font-semibold">$800</p>
            <p className="mt-3 text-lg text-white">Free delivery &amp; pickup included</p>
            <p className="mt-2 text-sm text-neutral-300">Tap trailer rental · You supply the alcohol</p>
          </div>
          <Link href="/tailgates" className="inline-flex min-h-12 items-center justify-center bg-white px-7 py-4 text-sm font-semibold text-black hover:bg-neutral-200">Plan Your Game-Day Tailgate <span aria-hidden="true" className="ml-3">→</span></Link>
          <p className="mt-4 text-sm text-neutral-400">Contact Jen to confirm your game date and location.</p>
        </div>
      </div>
    </section>
  )
}
