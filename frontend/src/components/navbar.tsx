"use client"

import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react"
import { useAuth } from "@/hooks/use-auth"
import { useState } from "react"

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Track Shipment", href: "/track" },
  ]

  return (
    <NextUINavbar
      className="bg-white shadow-sm border-b"
      classNames={{ wrapper: "px-4 md:px-6" }}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle aria-label="toggle navigation" className="md:hidden" />
        <NavbarBrand>
          <Link href="/" className="font-bold text-gray-800 text-lg md:text-xl flex items-center gap-2">
            <span className="bg-msc-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
              M
            </span>
            <span className="hidden sm:inline font-bold">MSE</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link color="foreground" href={item.href} className="text-gray-700 hover:text-msc-yellow font-medium">
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2 md:gap-3">
        {isAuthenticated && user ? (
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat" className="bg-[#FFD700] text-[#003873] font-semibold text-xs md:text-sm">
                <span className="hidden sm:inline">
                  {user.firstName} {user.lastName}
                </span>
                <span className="sm:hidden">{user.firstName}</span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu actions">
              <DropdownItem key="profile" href="/profile">
                My Profile
              </DropdownItem>
              <DropdownItem key="dashboard" href="/dashboard">
                Dashboard
              </DropdownItem>
              {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") ? (
                <DropdownItem key="admin" href="/admin/dashboard">
                  Admin Panel
                </DropdownItem>
              ) : null}
              <DropdownItem key="settings" href="/settings">
                Settings
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={logout}>
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <div className="flex gap-2">
            <Button
              as={Link}
              color="default"
              href="/auth/login"
              variant="flat"
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs md:text-sm"
            >
              Sign In
            </Button>
            <Button
              as={Link}
              color="primary"
              href="/auth/signup"
              variant="flat"
              className="bg-msc-yellow hover:bg-msc-gold text-black text-xs md:text-sm font-semibold"
            >
              Get Started
            </Button>
          </div>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.href}-${index}`}>
            <Link color="foreground" href={item.href} className="w-full text-white" size="lg">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  )
}
