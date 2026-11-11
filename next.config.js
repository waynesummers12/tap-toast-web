/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return ["/mountainview-menagerie", "/mountainview"].map(source => ({
      source,
      destination: "/mountain-view",
      permanent: true,
    }));
  },
}

module.exports = nextConfig
