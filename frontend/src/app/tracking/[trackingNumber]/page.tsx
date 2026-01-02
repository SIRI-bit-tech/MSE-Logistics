"use client"

import { useEffect } from "react"
import { Card, CardBody, CardHeader, Divider, Chip, Progress } from "@nextui-org/react"
import { useParams } from "next/navigation"
import { useShipment } from "@/hooks/use-shipment"
import TrackingMap from "@/components/tracking/tracking-map"
import TrackingTimeline from "@/components/tracking/tracking-timeline"
import ShipmentDetails from "@/components/tracking/shipment-details"

export default function TrackingPage() {
  const params = useParams()
  const trackingNumber = params.trackingNumber as string
  const { selectedShipment, getShipmentDetails, isLoading } = useShipment()

  useEffect(() => {
    if (trackingNumber) {
      getShipmentDetails(trackingNumber)
    }
  }, [trackingNumber])

  if (isLoading || !selectedShipment) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl mb-4">Loading tracking information...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    )
  }

  const statusPercentage = Math.min((selectedShipment.trackingEvents.length / 10) * 100, 100)

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Card className="mb-6">
        <CardHeader className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Tracking #{selectedShipment.trackingNumber}</h1>
            <p className="text-gray-600 mt-2">
              From {selectedShipment.senderCity}, {selectedShipment.senderCountry} to {selectedShipment.recipientCity},{" "}
              {selectedShipment.recipientCountry}
            </p>
          </div>
          <Chip color={selectedShipment.status === "DELIVERED" ? "success" : "primary"} variant="flat" size="lg">
            {selectedShipment.status}
          </Chip>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Delivery Progress</p>
              <Progress
                value={statusPercentage}
                className="h-3"
                color={selectedShipment.status === "DELIVERED" ? "success" : "primary"}
              />
            </div>
            {selectedShipment.estimatedDeliveryDate && (
              <div>
                <p className="text-sm text-gray-600">
                  Estimated Delivery: {new Date(selectedShipment.estimatedDeliveryDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrackingMap shipment={selectedShipment} />
          <TrackingTimeline events={selectedShipment.trackingEvents} />
        </div>
        <div>
          <ShipmentDetails shipment={selectedShipment} />
        </div>
      </div>
    </div>
  )
}
