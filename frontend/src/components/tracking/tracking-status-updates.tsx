"use client"

import { MapPin, Building2 } from "lucide-react"
import { getStatusIcon, getStatusColor } from "@/lib/status-icons"
import type { TrackingEvent, ShipmentStatus } from "../../../global"

interface TrackingStatusUpdatesProps {
  events: TrackingEvent[]
  status: ShipmentStatus
  createdAt: Date
}

export default function TrackingStatusUpdates({ events, status, createdAt }: TrackingStatusUpdatesProps) {
  // Sort events by date (most recent first)
  const sortedEvents = [...events].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Get icon for current status
  const StatusIcon = getStatusIcon(status)
  const PendingIcon = getStatusIcon('PENDING')

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
        <h2 className="text-lg font-bold text-gray-900">Status Updates</h2>
      </div>

      <div className="space-y-4">
        {sortedEvents.length === 0 ? (
          // No events yet - show only pending
          <div className="flex gap-3">
            <div className="relative z-10">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-yellow-100">
                <PendingIcon className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">
                    Shipment Pending
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Your shipment is being prepared for processing
                  </p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {formatDate(createdAt)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Show all tracking events */}
            {sortedEvents.map((event, index) => {
              const EventIcon = getStatusIcon(event.status)
              const colorClass = getStatusColor(event.status)
              
              return (
                <div key={event.id} className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200" />
                  
                  <div className="flex gap-3">
                    {/* Status icon */}
                    <div className="relative z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 ? colorClass : 'bg-gray-100 text-gray-400'
                      }`}>
                        <EventIcon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Event details */}
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">
                            {event.description}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <MapPin className="w-3 h-3" />
                            <span>
                              {event.location}
                              {event.city && event.location !== event.city && `, ${event.city}`}
                            </span>
                          </div>
                          {event.facility && (
                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                              <Building2 className="w-3 h-3" />
                              <span>{event.facility}</span>
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {formatDate(event.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Always show PENDING at the bottom */}
            <div className="relative">
              <div className="flex gap-3">
                <div className="relative z-10">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-400">
                    <PendingIcon className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">
                        Shipment Created
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Shipment order received and pending processing
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {formatDate(createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Download button */}
      <button className="w-full mt-6 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        Download Full History (PDF)
      </button>
    </div>
  )
}
