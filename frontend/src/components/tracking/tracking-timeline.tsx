"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TrackingEvent, ShipmentStatus } from "../../../global"

interface TrackingTimelineProps {
  events: TrackingEvent[]
  status: ShipmentStatus
}

// All possible statuses in chronological order
const ALL_STATUSES: ShipmentStatus[] = [
  "PENDING",
  "PROCESSING",
  "PICKED_UP",
  "IN_TRANSIT",
  "IN_CUSTOMS",
  "CUSTOMS_CLEARED",
  "ARRIVED_AT_FACILITY",
  "OUT_FOR_DELIVERY",
  "DELIVERY_ATTEMPTED",
  "DELIVERED",
  "ON_HOLD",
  "CANCELLED",
  "RETURNED"
]

// Terminal statuses that can occur at any point
const TERMINAL_STATUSES: ShipmentStatus[] = ["CANCELLED", "RETURNED", "ON_HOLD", "DELIVERY_ATTEMPTED"]

export default function TrackingTimeline({ events, status }: TrackingTimelineProps) {
  // Get the index of current status
  const currentStatusIndex = ALL_STATUSES.indexOf(status)
  
  // Create timeline items showing all statuses up to current one
  let timelineItems
  
  if (currentStatusIndex === -1 || TERMINAL_STATUSES.includes(status)) {
    // Handle terminal statuses or unknown statuses
    // Show all events that actually occurred, plus the current terminal status
    const eventStatuses = events.map(e => e.status)
    const uniqueStatuses = Array.from(new Set(eventStatuses))
    
    timelineItems = uniqueStatuses.map((statusName) => {
      const event = events.find(e => e.status === statusName)
      return {
        status: statusName,
        event: event,
        isCompleted: true,
        isCurrent: false
      }
    })
    
    // Add current terminal status if not already in events
    if (!uniqueStatuses.includes(status)) {
      const terminalEvent = events.find(e => e.status === status)
      timelineItems.push({
        status: status,
        event: terminalEvent,
        isCompleted: terminalEvent !== undefined,
        isCurrent: true
      })
    } else {
      // Mark the terminal status as current
      const terminalItem = timelineItems.find(item => item.status === status)
      if (terminalItem) {
        terminalItem.isCurrent = true
      }
    }
    
    timelineItems.reverse() // Show most recent first
  } else {
    // Normal flow: show all statuses up to current one
    timelineItems = ALL_STATUSES.slice(0, currentStatusIndex + 1).map((statusName) => {
      // Find the actual event for this status
      const event = events.find(e => e.status === statusName)
      
      return {
        status: statusName,
        event: event,
        isCompleted: event !== undefined,
        isCurrent: statusName === status
      }
    }).reverse() // Show most recent first
  }

  const getStatusColor = (statusName: ShipmentStatus) => {
    switch (statusName) {
      case "DELIVERED":
        return "bg-green-500"
      case "CANCELLED":
      case "RETURNED":
        return "bg-red-500"
      case "ON_HOLD":
      case "DELIVERY_ATTEMPTED":
        return "bg-yellow-500"
      default:
        return "bg-[#D4AF37]" // MSC Yellow
    }
  }

  const formatStatus = (statusName: ShipmentStatus) => {
    return statusName.replace(/_/g, ' ')
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold text-[#003873] mb-6">Shipment Updates</h3>

        <div className="space-y-4">
          {timelineItems.map((item, index) => {
            const event = item.event
            
            return (
              <div key={`${item.status}-${index}`} className="flex gap-4">
                {/* Timeline indicator */}
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-4 h-4 rounded-full border-4 border-white shadow-md ${
                      item.isCurrent ? getStatusColor(item.status) : 
                      item.isCompleted ? 'bg-gray-400' : 'bg-gray-200'
                    }`} 
                  />
                  {index < timelineItems.length - 1 && (
                    <div className={`w-1 h-16 mt-2 ${
                      item.isCompleted ? 'bg-gray-300' : 'bg-gray-200'
                    }`} />
                  )}
                </div>

                {/* Event details */}
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className={`font-bold ${
                          item.isCurrent ? 'text-[#D4AF37]' : 'text-[#003873]'
                        }`}>
                          {formatStatus(item.status)}
                        </p>
                        {item.isCurrent && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            Current
                          </Badge>
                        )}
                      </div>
                      
                      {event ? (
                        <>
                          <p className="text-gray-700 text-sm mt-1">
                            {event.description}
                          </p>
                          <p className="text-gray-600 text-sm mt-1">
                            {event.location}, {event.city}, {event.country}
                          </p>
                          {event.facility && (
                            <p className="text-gray-500 text-sm">
                              Facility: {event.facility}
                            </p>
                          )}
                          {event.transportMode && (
                            <p className="text-gray-500 text-sm">
                              Transport: {event.transportMode}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-gray-500 text-sm italic">
                          Awaiting update
                        </p>
                      )}
                    </div>
                    
                    {event && (
                      <div className="text-right">
                        <Badge variant="outline" className="mb-1">
                          {new Date(event.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </Badge>
                        <p className="text-xs text-gray-500">
                          {new Date(event.createdAt).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Show note if there are special statuses */}
        {(status === "CANCELLED" || status === "RETURNED" || status === "ON_HOLD") && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              {status === "CANCELLED" && "This shipment has been cancelled."}
              {status === "RETURNED" && "This shipment is being returned to sender."}
              {status === "ON_HOLD" && "This shipment is currently on hold. Please contact support for more information."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
