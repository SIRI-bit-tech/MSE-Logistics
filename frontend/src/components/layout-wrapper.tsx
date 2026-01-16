"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuthStore } from "@/store/auth-store"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isAuthenticated } = useAuthStore()
  
  const isAuthPage = pathname?.startsWith('/auth')
  const isAdminAuthPage = pathname?.startsWith('/admin/login') || pathname?.startsWith('/admin/register')
  const isCustomerDashboard = pathname?.startsWith('/shipments') || 
                             pathname?.startsWith('/addresses') || 
                             pathname?.startsWith('/profile') || 
                             pathname?.startsWith('/settings') ||
                             pathname?.startsWith('/notifications') ||
                             pathname?.startsWith('/payments') ||
                             pathname?.startsWith('/quotes') ||
                             pathname?.startsWith('/invoices')
  const isTrackingPage = pathname?.startsWith('/tracking')

  // Don't show navbar/footer for auth pages, admin auth pages, customer dashboard, or tracking pages when authenticated
  if (isAuthPage || isAdminAuthPage || isCustomerDashboard || (isTrackingPage && isAuthenticated)) {
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