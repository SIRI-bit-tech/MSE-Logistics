"use client"

import { Card, CardBody, CardHeader, Button, Link, Spinner } from "@nextui-org/react"
import { AlertCircle, FileText, Wrench } from "lucide-react"
import { useEffect, useState } from "react"

interface NotificationItem {
  id: string
  type: "alert" | "document" | "maintenance"
  title: string
  description: string
  time: string
  actionText?: string
  actionHref?: string
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

export default function NotificationCard() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications?limit=3', {
          credentials: 'include',
        })

        if (response.ok) {
          const data = await response.json()
          if (data.notifications) {
            // Convert backend notifications to frontend format
            const formattedNotifications = data.notifications
              .filter((n: any) => !n.isRead)
              .map((notification: any) => ({
                id: notification.id,
                type: notification.type?.toLowerCase() || 'alert',
                title: notification.title,
                description: notification.message,
                time: formatTimeAgo(notification.createdAt)
              }))
            setNotifications(formattedNotifications)
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

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Notifications</h3>
        </CardHeader>
        <CardBody className="flex items-center justify-center py-8">
          <Spinner size="lg" />
        </CardBody>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <Link href="/notifications" className="text-sm text-msc-yellow hover:underline">
          Mark all read
        </Link>
      </CardHeader>
      <CardBody className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            <p>No new notifications</p>
          </div>
        ) : (
          notifications.map((notification) => {
            const Icon = getIcon(notification.type)
            const colorClass = getColor(notification.type)
            
            return (
              <div key={notification.id} className="flex gap-3 p-3 rounded-lg bg-gray-50">
                <Icon className={`w-5 h-5 mt-0.5 ${colorClass}`} />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <p className="text-gray-600 text-xs mt-1">{notification.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-500 text-xs">{notification.time}</span>
                    {notification.actionText && notification.actionHref && (
                      <Button 
                        as={Link}
                        href={notification.actionHref}
                        size="sm" 
                        className="bg-msc-yellow text-black text-xs"
                      >
                        {notification.actionText}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </CardBody>
    </Card>
  )
}