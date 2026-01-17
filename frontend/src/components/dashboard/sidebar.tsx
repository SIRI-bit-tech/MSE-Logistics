"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { 
  LayoutDashboard, 
  Plus,
  Search,
  User,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

const sidebarItems = [
  {
    label: "Dashboard",
    href: "/shipments",
    icon: LayoutDashboard,
  },
  {
    label: "Create Shipment",
    href: "/shipments/new",
    icon: Plus,
  },
  {
    label: "Track Package",
    href: "/track",
    icon: Search,
  },
]

const bottomItems = [
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

interface SidebarProps {
  isOpen?: boolean
  onToggle?: () => void
  className?: string
}

export default function Sidebar({ isOpen = true, onToggle, className }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const handleLinkClick = () => {
    // Close mobile sidebar when link is clicked
    if (isMobile && onToggle) {
      onToggle()
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "bg-white border-r border-gray-200 min-h-screen flex flex-col transition-all duration-300 z-50",
        // Desktop behavior - always visible, can be collapsed
        "lg:relative lg:translate-x-0",
        // Mobile behavior - hidden by default, overlay when opened
        "fixed left-0 top-0 lg:block",
        // Mobile visibility
        isMobile ? (isOpen ? "block" : "hidden") : "block",
        // Mobile positioning
        isMobile && isOpen ? "translate-x-0" : isMobile ? "-translate-x-full" : "translate-x-0",
        // Width
        isOpen ? "w-64" : "w-0 lg:w-16",
        className
      )}>
        {/* Mobile Close Button */}
        {isMobile && (
          <div className="lg:hidden p-4 border-b border-gray-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="ml-auto flex"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Logo */}
        <div className={cn(
          "border-b border-gray-200 transition-all duration-300",
          isOpen ? "p-6" : "lg:p-3"
        )}>
          <Link 
            href="/shipments" 
            className="flex items-center gap-3 text-gray-900"
            onClick={handleLinkClick}
          >
            <img src="/mse-logo.png" alt="MSE Logo" className="w-10 h-10 flex-shrink-0" />
            {isOpen && (
              <div className="min-w-0">
                <div className="text-xs text-gray-500 uppercase tracking-wide leading-tight">
                  MEDITERRANEAN SHIPPING<br />EXPRESS
                </div>
              </div>
            )}
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className={cn(
          "flex-1 space-y-2 transition-all duration-300",
          isOpen ? "p-4" : "lg:p-2"
        )}>
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center gap-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors w-full",
                  isOpen ? "px-4 py-3" : "lg:px-2 lg:py-3 lg:justify-center",
                  isActive && "bg-msc-yellow text-black hover:bg-msc-yellow hover:text-black font-medium"
                )}
                title={!isOpen ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="truncate">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className={cn(
          "border-t border-gray-200 space-y-2 transition-all duration-300",
          isOpen ? "p-4" : "lg:p-2"
        )}>
          {bottomItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center gap-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors w-full",
                  isOpen ? "px-4 py-3" : "lg:px-2 lg:py-3 lg:justify-center",
                  isActive && "bg-gray-100 text-gray-900"
                )}
                title={!isOpen ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="truncate">{item.label}</span>}
              </Link>
            )
          })}
          
          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="ghost"
            className={cn(
              "flex items-center gap-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors w-full",
              isOpen ? "px-4 py-3 justify-start" : "lg:px-2 lg:py-3 lg:justify-center"
            )}
            title={!isOpen ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="truncate">Logout</span>}
          </Button>
        </div>
      </div>
    </>
  )
}