"use client"

import { Card, CardBody, CardHeader, Link, Spinner } from "@nextui-org/react"
import { Ship, FileText, CheckCircle, Package } from "lucide-react"
import { useEffect, useState } from "react"

interface ActivityItem {
  id: string
  type: "shipment_created" | "shipment_updated" | "document_generated" | "booking_confirmed"
  title: string
  time: string
  actionText?: string
  actionHref?: string
}

const getIcon = (type: string) => {
  switch (type) {
    case "shipment_created":
      return Package
    case "shipment_updated":
      return Ship
    case "document_generated":
      return FileText
    case "booking_confirmed":
      return CheckCircle
    default:
      return CheckCircle
  }
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/activities?limit=5', {
          credentials: 'include',
        })

        if (response.ok) {
          const data = await response.json()
          if (data.activities) {
            const formattedActivities = data.activities.map((activity: any) => ({
              id: activity.id,
              type: activity.type,
              title: activity.title,
              time: formatTimeAgo(activity.time),
              actionText: activity.actionText,
              actionHref: activity.actionHref
            }))
            setActivities(formattedActivities)
          }
        }
      } catch (error) {
        console.error('Error fetching activities:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return 'Yesterday'
    return `${diffInDays} days ago`
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Recent Activity</h3>
        </CardHeader>
        <CardBody className="flex items-center justify-center py-8">
          <Spinner size="lg" />
        </CardBody>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Recent Activity</h3>
      </CardHeader>
      <CardBody className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            <p>No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => {
            const Icon = getIcon(activity.type)
            
            return (
              <div key={activity.id} className="flex gap-3 items-start">
                <div className="w-2 h-2 bg-msc-yellow rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex items-start gap-2">
                    <Icon className="w-4 h-4 mt-0.5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{activity.time}</span>
                        {activity.actionText && activity.actionHref && (
                          <Link 
                            href={activity.actionHref}
                            className="text-xs text-msc-yellow hover:underline"
                          >
                            {activity.actionText}
                          </Link>
                        )}
                      </div>
                    </div>
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