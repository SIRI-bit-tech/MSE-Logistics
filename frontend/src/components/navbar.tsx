"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAuth } from "@/hooks/use-auth"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"

export default function Navbar() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration mismatch by only rendering auth-dependent content after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Public navigation for unauthenticated users
  const publicMenuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Track Shipment", href: "/track" },
  ]

  // Authenticated navigation based on user role
  const getAuthenticatedMenuItems = () => {
    const baseItems = [
      { label: "Dashboard", href: user?.role === "DRIVER" ? "/dashboard" : "/shipments" },
      { label: "Track Shipment", href: "/track" },
    ]

    if (user?.role === "CUSTOMER") {
      return [
        { label: "My Shipments", href: "/shipments" },
        { label: "New Shipment", href: "/shipments/new" },
        { label: "Track Shipment", href: "/track" },
        { label: "Profile", href: "/profile" },
      ]
    }

    if (user?.role === "DRIVER") {
      return [
        { label: "Dashboard", href: "/dashboard" },
        { label: "My Deliveries", href: "/deliveries" },
        { label: "Track Shipment", href: "/track" },
        { label: "Profile", href: "/driver-profile" },
      ]
    }

    if (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") {
      return [
        { label: "Admin Dashboard", href: "/admin/dashboard" },
        { label: "Users", href: "/admin/users" },
        { label: "Track Shipment", href: "/track" },
      ]
    }

    return baseItems
  }

  const menuItems = isAuthenticated ? getAuthenticatedMenuItems() : publicMenuItems

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col gap-4 mt-8">
                  {isMounted && !isLoading && menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-gray-700 hover:text-[#D4AF37] font-medium text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {isMounted && !isLoading && isAuthenticated && (
                    <>
                      <DropdownMenuSeparator />
                      <Button variant="destructive" onClick={logout} className="w-full justify-start">
                        Sign Out
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <Link
              href={isAuthenticated ? (
                user?.role === "ADMIN" || user?.role === "SUPER_ADMIN"
                  ? "/admin/dashboard"
                  : (user?.role === "DRIVER" ? "/dashboard" : "/shipments")
              ) : "/"}
              className="flex items-center"
            >
              <Image
                src="/mse-logo.png"
                alt="MSE Logo"
                width={60}
                height={40}
                className="drop-shadow-lg filter brightness-110 contrast-125"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-[#D4AF37] font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2 md:gap-3">
            {!isMounted || isLoading ? (
              // Show consistent loading state during SSR and initial client render
              <div className="flex gap-2">
                <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-[#FFD700] text-[#003873] font-semibold text-xs md:text-sm border-[#FFD700] hover:bg-[#FFD700]/90 hover:text-[#003873]">
                    <span className="hidden sm:inline">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="sm:hidden">{user.firstName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href={user.role === "DRIVER" ? "/driver-profile" : "/profile"}>
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={user.role === "DRIVER" ? "/dashboard" : "/shipments"}>
                      {user.role === "DRIVER" ? "Dashboard" : "My Shipments"}
                    </Link>
                  </DropdownMenuItem>
                  {user.role === "CUSTOMER" && (
                    <DropdownMenuItem asChild>
                      <Link href="/shipments/new">New Shipment</Link>
                    </DropdownMenuItem>
                  )}
                  {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard">Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Button
                  asChild
                  variant="ghost"
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs md:text-sm"
                >
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="bg-[#FFD700] hover:bg-[#D4AF37] text-black text-xs md:text-sm font-semibold"
                >
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
