import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://mediterraneanshippingexpress.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/about',
          '/contact',
          '/track',
          '/services/',
          '/sustainability/',
          '/privacy',
          '/terms',
          '/faq',
          '/tracking/',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/shipments/',
          '/dashboard/',
          '/profile/',
          '/settings/',
          '/notifications/',
          '/addresses/',
          '/deliveries/',
          '/earnings/',
          '/driver-profile/',
          '/auth/',
          '/user/',
        ],
        crawlDelay: 2,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}