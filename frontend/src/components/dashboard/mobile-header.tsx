"use client"

import { Button } from "@/components/ui/button"
import { Menu, Bell, User } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface MobileHeaderProps {
  onMenuToggle: () => void
  title?: string
}

export default function MobileHeader({ onMenuToggle, title }: MobileHeaderProps) {
  const { user } = useAuth()

  return (
    <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
      {/* Left side - Menu button and title */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuToggle}
          className="p-2"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        {title && (
          <h1 className="text-lg font-semibold text-gray-900 truncate">
            {title}
          </h1>
        )}
      </div>

      {/* Right side - User info and notifications */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="p-2">
          <Bell className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-msc-yellow rounded-full flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          {user?.firstName && (
            <span className="text-sm font-medium text-gray-900 hidden sm:block">
              {user.firstName}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}