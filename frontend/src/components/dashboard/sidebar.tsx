"use client"

import { Link, Button } from "@nextui-org/react"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  Package, 
  Plus,
  Search,
  User,
  Settings,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"

const sidebarItems = [
  {
    label: "Dashboard",
    href: "/shipments",
    icon: LayoutDashboard,
  },
  {
    label: "My Shipments",
    href: "/shipments/list",
    icon: Package,
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

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/shipments" className="flex items-center gap-3 text-gray-900">
          <div className="bg-msc-yellow text-black rounded w-10 h-10 flex items-center justify-center font-bold text-lg">
            ⚓
          </div>
          <div>
            <div className="font-bold text-lg">MSE</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              MEDITERRANEAN SHIPPING<br />EXPRESS
            </div>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors w-full",
                isActive && "bg-msc-yellow text-black hover:bg-msc-yellow hover:text-black font-medium"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        {bottomItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors w-full",
                isActive && "bg-gray-100 text-gray-900"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
        
        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="light"
          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors w-full justify-start"
          startContent={<LogOut className="w-5 h-5" />}
        >
          Logout
        </Button>
      </div>
    </div>
  )
}