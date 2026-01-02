"use client"

import { Card, CardBody, Chip } from "@nextui-org/react"
import type { TrackingEvent } from "../../../global"

interface TrackingTimelineProps {
  events: TrackingEvent[]
}

export default function TrackingTimeline({ events }: TrackingTimelineProps) {
  return (
    <Card>
      <CardBody className="p-6">
        <h3 className="text-2xl font-bold text-[#003873] mb-6">Tracking History</h3>

        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={event.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-[#0066CC] border-4 border-white shadow-md" />
                {index < events.length - 1 && <div className="w-1 h-12 bg-gray-300 mt-2" />}
              </div>

              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-[#003873]">{event.description}</p>
                    <p className="text-gray-600 text-sm mt-1">
                      {event.location}, {event.country}
                    </p>
                    {event.facility && <p className="text-gray-500 text-sm">Facility: {event.facility}</p>}
                  </div>
                  <Chip variant="flat" size="sm">
                    {new Date(event.createdAt).toLocaleDateString()}
                  </Chip>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
