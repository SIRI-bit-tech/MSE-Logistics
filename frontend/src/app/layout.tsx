import type React from "react"
import type { Metadata } from "next"
import { Providers } from "@/components/providers"
import "../../globals.css"
import LayoutWrapper from "@/components/layout-wrapper"

export const metadata: Metadata = {
  title: "Mediterranean Shipping Express - Global Logistics Platform",
  description: "Track your shipments globally with real-time updates",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  )
}
