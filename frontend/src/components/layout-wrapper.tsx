"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname?.startsWith('/auth')
  const isCustomerDashboard = pathname?.startsWith('/shipments') || 
                             pathname?.startsWith('/addresses') || 
                             pathname?.startsWith('/profile') || 
                             pathname?.startsWith('/settings') ||
                             pathname?.startsWith('/notifications') ||
                             pathname?.startsWith('/payments') ||
                             pathname?.startsWith('/quotes') ||
                             pathname?.startsWith('/invoices')

  if (isAuthPage || isCustomerDashboard) {
    return <main className="min-h-screen">{children}</main>
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">{children}</main>
      <Footer />
    </>
  )
}