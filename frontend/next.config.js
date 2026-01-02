/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["api.mapbox.com", "cdn.auth0.com"],
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/graphql",
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    NEXT_PUBLIC_AUTH0_DOMAIN: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
    NEXT_PUBLIC_AUTH0_CLIENT_ID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  },
}

module.exports = nextConfig
