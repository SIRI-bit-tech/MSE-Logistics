"use client"

import { Card, CardBody, CardHeader, Button, Chip } from "@nextui-org/react"
import { MapPin, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"

interface Shipment {
  id: string
  trackingNumber: string
  recipientCity: string
  recipientCountry: string
  status: string
  estimatedDeliveryDate: string | null
}

const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case 'DELIVERED':
      return 'success'
    case 'IN_TRANSIT':
    case 'PICKED_UP':
    case 'OUT_FOR_DELIVERY':
      return 'warning'
    case 'PROCESSING':
    case 'PENDING':
      return 'primary'
    case 'ON_HOLD':
    case 'CANCELLED':
      return 'danger'
    default:
      return 'default'
  }
}

const formatStatus = (status: string) => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

export default function RecentShipmentsTable() {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchShipments = async () => {
      if (!user?.id) return
      
      try {
        const response = await fetch('/api/shipments', {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (response.ok) {
          const data = await response.json()
          // Get the 4 most recent shipments
          setShipments(data.shipments?.slice(0, 4) || [])
        }
      } catch (error) {
        console.error('Error fetching shipments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchShipments()
  }, [user?.id])

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'TBD'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Card className="bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-xl font-bold text-gray-900">Recent Shipments</h3>
          <Link href="/shipments">
            <Button 
              variant="light" 
              size="sm"
              className="text-msc-yellow hover:text-msc-gold"
              endContent={<ExternalLink className="w-4 h-4" />}
            >
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardBody className="pt-0">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Loading shipments...</div>
          </div>
        ) : shipments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="text-gray-500 mb-2">No shipments found</div>
            <Link href="/shipments/new">
              <Button className="bg-msc-yellow text-black hover:bg-msc-gold">
                Create Your First Shipment
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-0 text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Tracking Number
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Destination
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Estimated Delivery
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr key={shipment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-0">
                      <div className="font-medium text-gray-900">
                        {shipment.trackingNumber}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {shipment.recipientCity}, {shipment.recipientCountry}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Chip 
                        size="sm" 
                        color={getStatusColor(shipment.status)}
                        variant="flat"
                      >
                        {formatStatus(shipment.status)}
                      </Chip>
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {formatDate(shipment.estimatedDeliveryDate)}
                    </td>
                    <td className="py-4 px-4">
                      <Link href={`/track?number=${shipment.trackingNumber}`}>
                        <Button 
                          size="sm" 
                          variant="light"
                          className="text-msc-yellow hover:text-msc-gold"
                        >
                          Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardBody>
    </Card>
  )
}