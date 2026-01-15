"use client"

import { MapPin, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Shipment {
  id: string
  trackingNumber: string
  recipientCity: string
  recipientCountry: string
  status: string
  estimatedDeliveryDate: string | null
}

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status.toUpperCase()) {
    case 'DELIVERED':
      return 'default'
    case 'IN_TRANSIT':
    case 'PICKED_UP':
    case 'OUT_FOR_DELIVERY':
      return 'secondary'
    case 'ON_HOLD':
    case 'CANCELLED':
      return 'destructive'
    default:
      return 'outline'
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
          <Button 
            variant="ghost" 
            size="sm"
            className="text-msc-yellow hover:text-msc-gold"
            asChild
          >
            <Link href="/shipments" className="flex items-center gap-2">
              View All
              <ExternalLink className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Loading shipments...</div>
          </div>
        ) : shipments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="text-gray-500 mb-2">No shipments found</div>
            <Button className="bg-msc-yellow text-black hover:bg-msc-gold" asChild>
              <Link href="/shipments/new">
                Create Your First Shipment
              </Link>
            </Button>
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
                      <Badge variant={getStatusVariant(shipment.status)}>
                        {formatStatus(shipment.status)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {formatDate(shipment.estimatedDeliveryDate)}
                    </td>
                    <td className="py-4 px-4">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="text-msc-yellow hover:text-msc-gold"
                        asChild
                      >
                        <Link href={`/track?number=${shipment.trackingNumber}`}>
                          Details
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
