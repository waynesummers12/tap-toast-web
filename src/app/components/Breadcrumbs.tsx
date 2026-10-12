import Link from "next/link"

type BreadcrumbItem = { name: string; path: string }

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const trail = [{ name: "Home", path: "/" }, ...items]
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://www.coloradotapandtoast.com${item.path}`,
    })),
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-6 pt-6 text-sm leading-relaxed">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {trail.map((item, index) => (
            <li key={item.path} className="flex min-w-0 items-center gap-2">
              {index > 0 && <span aria-hidden="true">›</span>}
              {index === trail.length - 1 ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.path} className="inline-block py-2 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">{item.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </>
  )
}
