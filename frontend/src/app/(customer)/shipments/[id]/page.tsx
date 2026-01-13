"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { 
  Card, 
  CardBody, 
  Button, 
  Chip,
  Spinner,
  Divider
} from "@nextui-org/react"
import { ArrowLeft, Package, MapPin, Clock, User, Phone, Mail } from "lucide-react"
import { SHIPMENT_STATUS_COLORS, SHIPMENT_STATUS_ICONS } from "../../../../../constants"

type ShipmentStatus = "PENDING" | "PROCESSING" | "ON_HOLD" | "PICKED_UP" | "IN_TRANSIT" | "IN_CUSTOMS" | "CUSTOMS_CLEARED" | "ARRIVED_AT_FACILITY" | "OUT_FOR_DELIVERY" | "DELIVERY_ATTEMPTED" | "DELIVERED" | "RETURNED" | "CANCELLED"
type TransportMode = "AIR" | "LAND" | "WATER" | "MULTIMODAL"
type ServiceType = "EXPRESS" | "STANDARD" | "ECONOMY"
type PackageType = "DOCUMENTS" | "PARCEL" | "FRAGILE" | "ELECTRONICS" | "CLOTHING" | "FOOD" | "HAZARDOUS" | "OTHER"

interface TrackingEvent {
  id: string
  status: ShipmentStatus
  location: string
  city: string
  country: string
  description: string
  createdAt: string
}

interface Shipment {
  id: string
  trackingNumber: string
  senderName: string
  senderEmail: string
  senderPhone: string
  senderAddress: string
  senderCity: string
  senderCountry: string
  senderPostalCode: string
  recipientName: string
  recipientEmail: string
  recipientPhone: string
  recipientAddress: string
  recipientCity: string
  recipientCountry: string
  recipientPostalCode: string
  packageType: PackageType
  weight: number
  length: number
  width: number
  height: number
  description: string
  value: number
  currency: string
  serviceType: ServiceType
  transportMode: TransportMode
  status: ShipmentStatus
  shippingCost: number
  insuranceCost?: number
  totalCost: number
  estimatedDeliveryDate?: string
  trackingEvents: TrackingEvent[]
}

export default function ShipmentDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [shipment, setShipment] = useState<Shipment | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchShipment()
  }, [params.id])

  const fetchShipment = async () => {
    try {
      const response = await fetch(`/api/shipments/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setShipment(data.shipment)
      }
    } catch (error) {
      console.error('Error fetching shipment:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!shipment) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Shipment Not Found</h1>
        <Button onPress={() => router.back()}>Go Back</Button>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <Button
          variant="light"
          startContent={<ArrowLeft className="w-4 h-4" />}
          onPress={() => router.back()}
          className="mb-4"
        >
          Back to Shipments
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shipment Details</h1>
            <p className="text-gray-600 mt-2">Tracking Number: {shipment.trackingNumber}</p>
          </div>
          <Chip
            color={SHIPMENT_STATUS_COLORS[shipment.status] as any}
            variant="flat"
            size="lg"
            startContent={<span>{SHIPMENT_STATUS_ICONS[shipment.status]}</span>}
          >
            {shipment.status.replace('_', ' ')}
          </Chip>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tracking Timeline */}
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Tracking Timeline
              </h2>
              
              <div className="space-y-4">
                {shipment.trackingEvents.map((event: TrackingEvent, index: number) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-msc-yellow' : 'bg-gray-300'
                      }`} />
                      {index < shipment.trackingEvents.length - 1 && (
                        <div className="w-px h-8 bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">
                          {event.status.replace('_', ' ')}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(event.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{event.description}</p>
                      <p className="text-sm text-gray-500">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {event.location}, {event.country}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Package Details */}
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Package Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Package Type</h3>
                  <p className="text-gray-600">{shipment.packageType}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Weight</h3>
                  <p className="text-gray-600">{shipment.weight} kg</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Dimensions</h3>
                  <p className="text-gray-600">
                    {shipment.length} × {shipment.width} × {shipment.height} cm
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Declared Value</h3>
                  <p className="text-gray-600">{shipment.currency} {shipment.value}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{shipment.description}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sender Information */}
          <Card>
            <CardBody className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Sender
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">{shipment.senderName}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {shipment.senderEmail}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {shipment.senderPhone}
                  </p>
                </div>
                <Divider />
                <div>
                  <p className="text-sm text-gray-600">
                    {shipment.senderAddress}<br />
                    {shipment.senderCity}, {shipment.senderPostalCode}<br />
                    {shipment.senderCountry}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Recipient Information */}
          <Card>
            <CardBody className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Recipient
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">{shipment.recipientName}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {shipment.recipientEmail}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {shipment.recipientPhone}
                  </p>
                </div>
                <Divider />
                <div>
                  <p className="text-sm text-gray-600">
                    {shipment.recipientAddress}<br />
                    {shipment.recipientCity}, {shipment.recipientPostalCode}<br />
                    {shipment.recipientCountry}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Cost Breakdown */}
          <Card>
            <CardBody className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping Cost</span>
                  <span className="text-gray-900">${shipment.shippingCost.toFixed(2)}</span>
                </div>
                {shipment.insuranceCost && shipment.insuranceCost > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Insurance</span>
                    <span className="text-gray-900">${shipment.insuranceCost.toFixed(2)}</span>
                  </div>
                )}
                <Divider />
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-900">Total Cost</span>
                  <span className="text-gray-900">${shipment.totalCost.toFixed(2)}</span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Service Information */}
          <Card>
            <CardBody className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Service Type</p>
                  <p className="font-medium text-gray-900">{shipment.serviceType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Transport Mode</p>
                  <p className="font-medium text-gray-900">{shipment.transportMode}</p>
                </div>
                {shipment.estimatedDeliveryDate && (
                  <div>
                    <p className="text-sm text-gray-600">Estimated Delivery</p>
                    <p className="font-medium text-gray-900">
                      {new Date(shipment.estimatedDeliveryDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}