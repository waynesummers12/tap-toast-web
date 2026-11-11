import Link from "next/link"

const packages = [
  { name: "The Trailer", price: "$600", note: "Trailer rental only", href: "/book?type=rental&tier=trailer&service=bartending", items: ["Mobile bar trailer rental", "No bartenders included", "Choose your rental hours", "Free delivery within 20 miles of Golden"], cta: "Plan a Trailer Rental" },
  { name: "The Tipsy", price: "$1,230", note: "Staffed bar experience", href: "/book?service=bartending&tier=signature", items: ["2 professional bartenders", "4 hours of service", "Signature cocktail planning", "Travel within 40 miles of Golden"], cta: "Get a Tipsy Quote" },
  { name: "The Toasted", price: "$1,800", note: "More staff and service time", href: "/book?service=bartending&tier=premium", items: ["3 professional bartenders", "5 hours of service", "Full cocktail experience", "Travel within 40 miles of Golden"], cta: "Get a Toasted Quote" },
]

export default function Packages() {
  return <section id="bartending-packages" aria-labelledby="package-heading" className="mx-auto max-w-7xl px-6 pb-20">
    <h2 id="package-heading" className="mb-4 text-center text-3xl md:text-4xl">Choose how you want to host</h2>
    <p className="mx-auto mb-10 max-w-2xl text-center leading-relaxed text-neutral-600">Choose a staffed experience or rent the trailer for your own setup. Starting prices below match the listed staff and hours; your final quote reflects your selections and any additional travel.</p>
    <div className="grid gap-6 md:grid-cols-3">{packages.map(pkg => <article key={pkg.name} className="flex flex-col rounded-2xl border border-neutral-700 bg-neutral-950 p-7 text-white">
      <p className="mb-3 text-sm text-[#e6c67c]">{pkg.note}</p>
      <h3 className="mb-4 text-3xl !text-white">{pkg.name}</h3>
      <p className="mb-6 text-2xl font-semibold">{pkg.price} <span className="text-sm font-normal text-neutral-300">starting price</span></p>
      <ul className="mb-8 list-disc space-y-3 pl-5 text-neutral-200">{pkg.items.map(item => <li key={item}>{item}</li>)}</ul>
      <Link href={pkg.href} className="mt-auto rounded-lg bg-white px-5 py-4 text-center font-semibold text-black hover:bg-neutral-200">{pkg.cta}</Link>
    </article>)}</div>
    <p className="mt-6 text-center text-sm text-neutral-600">Not sure which option fits? Call <a href="tel:7206439690" className="underline underline-offset-4">Jen at 720-643-9690</a> to discuss your venue, guest count, and menu.</p>
  </section>
}
