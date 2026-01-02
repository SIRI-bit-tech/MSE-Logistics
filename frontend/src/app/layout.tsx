import type React from "react"
import type { Metadata } from "next"
import { Providers } from "@/components/providers"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import "../../globals.css"

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
          <Navbar />
          <main className="min-h-screen bg-background">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
