"use client"

import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Bell, AlertCircle, FileText, Wrench } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

interface NotificationItem {
  id: string
  type: "alert" | "document" | "maintenance"
  title: string
  description: string
  time: string
  isRead: boolean
}

const getIcon = (type: string) => {
  switch (type) {
    case "alert":
      return AlertCircle
    case "document":
      return FileText
    case "maintenance":
      return Wrench
    default:
      return AlertCircle
  }
}

const getColor = (type: string) => {
  switch (type) {
    case "alert":
      return "text-red-500"
    case "document":
      return "text-[#FFD700]"
    case "maintenance":
      return "text-blue-500"
    default:
      return "text-gray-500"
  }
}

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)
  const [isMarkingRead, setIsMarkingRead] = useState(false)

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications?limit=5', {
          credentials: 'include',
        })

        if (response.ok) {
          const data = await response.json()
          if (data.notifications) {
            const formattedNotifications = data.notifications.map((notification: any) => ({
              id: notification.id,
              type: notification.type?.toLowerCase() || 'alert',
              title: notification.title,
              description: notification.message,
              time: formatTimeAgo(notification.createdAt),
              isRead: notification.isRead
            }))
            setNotifications(formattedNotifications)
            setUnreadCount(formattedNotifications.filter((n: NotificationItem) => !n.isRead).length)
          }
        }
      } catch (error) {
        console.error('Error fetching notifications:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  const handleMarkAllRead = async () => {
    if (isMarkingRead) return
    
    try {
      setIsMarkingRead(true)
      const response = await fetch('/api/notifications', {
        method: 'PATCH',
        credentials: 'include',
      })

      if (response.ok) {
        // Update local state to mark all as read
        setNotifications(prev => 
          prev.map(notification => ({ ...notification, isRead: true }))
        )
        setUnreadCount(0)
      } else {
        console.error('Failed to mark notifications as read')
      }
    } catch (error) {
      console.error('Error marking notifications as read:', error)
    } finally {
      setIsMarkingRead(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="w-5 h-5 text-gray-600 hover:text-gray-800" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex justify-between items-center px-2 py-3 border-b">
          <span className="font-semibold">Notifications</span>
          {unreadCount > 0 && (
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-[#FFD700] h-auto p-1"
              onClick={handleMarkAllRead}
              disabled={isMarkingRead}
            >
              {isMarkingRead ? 'Marking...' : 'Mark all read'}
            </Button>
          )}
        </div>
        
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No new notifications</p>
          </div>
        ) : (
          <>
            {notifications.map((notification) => {
              const Icon = getIcon(notification.type)
              const colorClass = getColor(notification.type)
              
              return (
                <DropdownMenuItem 
                  key={notification.id} 
                  className={`py-3 cursor-pointer ${!notification.isRead ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex gap-3 w-full">
                    <Icon className={`w-4 h-4 mt-1 ${colorClass} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{notification.title}</p>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notification.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    )}
                  </div>
                </DropdownMenuItem>
              )
            })}
            
            <div className="text-center border-t pt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#FFD700] w-full"
                asChild
              >
                <Link href="/notifications">
                  View all notifications
                </Link>
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
