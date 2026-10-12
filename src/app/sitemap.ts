import type { MetadataRoute } from "next"

const siteUrl = "https://www.coloradotapandtoast.com"

export default function sitemap(): MetadataRoute.Sitemap {
  // List final public URLs. Omit lastModified until actual edit dates are tracked.
  const paths = [
    "/",
    "/weddings",
    "/bartending",
    "/birthday-parties",
    "/corporate-events",
    "/dirty-soda-bar",
    "/dirty-soda-bar-denver",
    "/dirty-soda-bar-littleton",
    "/dirty-soda-bar-lakewood",
    "/dirty-soda-bar-parker",
    "/dirty-soda-bar-highlands-ranch",
    "/dirty-soda-bar-centennial",
    "/what-is-dirty-soda-bar",
    "/book",
  ]

  return paths.map(path => ({ url: `${siteUrl}${path}` }))
}
