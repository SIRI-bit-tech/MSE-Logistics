import type React from "react"
import type { Metadata } from "next"
import { Providers } from "@/components/providers"
import "../../globals.css"
import LayoutWrapper from "@/components/layout-wrapper"
import StructuredData from "@/components/structured-data"
import { organizationStructuredData, websiteStructuredData } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "Mediterranean Shipping Express - Global Logistics Platform",
  description: "Track your shipments globally with real-time updates. Mediterranean Shipping Express offers ocean freight, intermodal transport, warehousing, and supply chain solutions worldwide.",
  keywords: "shipping, logistics, ocean freight, container shipping, supply chain, warehousing, intermodal transport, Mediterranean shipping, global logistics, cargo tracking",
  authors: [{ name: "Mediterranean Shipping Express" }],
  creator: "Mediterranean Shipping Express",
  publisher: "Mediterranean Shipping Express",
  metadataBase: new URL('https://mediterraneanshippingexpress.com'),
  alternates: {
    canonical: 'https://mediterraneanshippingexpress.com',
  },
  openGraph: {
    title: "Mediterranean Shipping Express - Global Logistics Platform",
    description: "Track your shipments globally with real-time updates. Mediterranean Shipping Express offers ocean freight, intermodal transport, warehousing, and supply chain solutions worldwide.",
    url: 'https://mediterraneanshippingexpress.com',
    siteName: 'Mediterranean Shipping Express',
    images: [
      {
        url: '/mse-logo.png',
        width: 512,
        height: 512,
        alt: 'Mediterranean Shipping Express Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mediterranean Shipping Express - Global Logistics Platform",
    description: "Track your shipments globally with real-time updates. Mediterranean Shipping Express offers ocean freight, intermodal transport, warehousing, and supply chain solutions worldwide.",
    images: ['/mse-logo.png'],
    creator: '@MSEShipping',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon.ico' }
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { url: '/favicons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  },
  manifest: '/favicons/site.webmanifest'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData data={organizationStructuredData} />
        <StructuredData data={websiteStructuredData} />
      </head>
      <body>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  )
}
