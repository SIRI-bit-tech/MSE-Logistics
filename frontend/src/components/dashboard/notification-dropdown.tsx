"use client"

import { 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Button,
  Spinner
} from "@nextui-org/react"
import { Bell, AlertCircle, FileText, Wrench } from "lucide-react"
import { useEffect, useState } from "react"

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
      return "text-msc-yellow"
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
        const response = await fetch('/api/graphql-proxy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            query: `
              query GetUserNotifications {
                getUserNotifications {
                  id
                  title
                  message
                  type
                  isRead
                  createdAt
                }
              }
            `
          })
        })

        if (response.ok) {
          const data = await response.json()
          if (data.data?.getUserNotifications) {
            const formattedNotifications = data.data.getUserNotifications
              .slice(0, 5)
              .map((notification: any) => ({
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

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="light"
          className="relative"
        >
          <Bell className="w-5 h-5 text-gray-600 hover:text-gray-800" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Notifications"
        className="w-80"
        closeOnSelect={false}
      >
        <DropdownItem key="header" className="h-14 gap-2" textValue="Notifications">
          <div className="flex justify-between items-center w-full">
            <span className="font-semibold">Notifications</span>
            {unreadCount > 0 && (
              <Button size="sm" variant="light" className="text-msc-yellow">
                Mark all read
              </Button>
            )}
          </div>
        </DropdownItem>
        
        {loading ? (
          <DropdownItem key="loading" textValue="Loading">
            <div className="flex justify-center py-4">
              <Spinner size="sm" />
            </div>
          </DropdownItem>
        ) : notifications.length === 0 ? (
          <DropdownItem key="empty" textValue="No notifications">
            <div className="text-center py-4 text-gray-500">
              <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No new notifications</p>
            </div>
          </DropdownItem>
        ) : (
          <>
            {notifications.map((notification) => {
              const Icon = getIcon(notification.type)
              const colorClass = getColor(notification.type)
              
              return (
                <DropdownItem 
                  key={notification.id} 
                  className={`h-auto py-3 ${!notification.isRead ? 'bg-blue-50' : ''}`}
                  textValue={notification.title}
                >
                  <div className="flex gap-3">
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
                </DropdownItem>
              )
            })}
            
            <DropdownItem key="view-all" textValue="View all notifications">
              <div className="text-center">
                <Button 
                  variant="light" 
                  size="sm" 
                  className="text-msc-yellow w-full"
                >
                  View all notifications
                </Button>
              </div>
            </DropdownItem>
          </>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}