"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

interface Shipment {
  id: string
  trackingNumber: string
  recipientName: string
  recipientAddress: string
  status: string
  createdAt: string
  estimatedDeliveryDate?: string
}

export default function ActiveShipmentsTable() {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await fetch('/api/shipments?take=10', {
          credentials: 'include',
        })

        if (response.ok) {
          const data = await response.json()
          if (data.shipments) {
            // Show only active shipments (not delivered or cancelled)
            const activeShipments = data.shipments.filter(
              (shipment: Shipment) => 
                shipment.status !== 'DELIVERED' && shipment.status !== 'CANCELLED'
            ).slice(0, 3) // Show only first 3
            setShipments(activeShipments)
          }
        }
      } catch (error) {
        console.error('Error fetching shipments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchShipments()
  }, [])

  const formatRoute = (address: string) => {
    // Extract city/country from address for route display
    const parts = address.split(',')
    return parts.length > 1 ? parts.slice(-2).join(',').trim() : address
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    })
  }

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status.toUpperCase()) {
      case 'IN_TRANSIT':
      case 'PICKED_UP':
        return 'secondary'
      case 'PROCESSING':
        return 'outline'
      default:
        return 'default'
    }
  }

  if (loading) {
    return (
      <Card className="bg-white">
        <CardHeader>
          <h3 className="text-xl font-bold text-gray-900">Active Shipments</h3>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-gray-500">Loading shipments...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-xl font-bold text-gray-900">Active Shipments</h3>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-[#FFD700] hover:text-[#D4AF37]"
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
        {shipments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="text-gray-500 mb-2">No active shipments found.</div>
            <Button className="bg-[#FFD700] text-black hover:bg-[#D4AF37]" asChild>
              <Link href="/shipments/new">
                Create your first shipment
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
                    ETA
                  </th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr key={shipment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-0">
                      <div className="font-mono text-sm font-medium text-gray-900">
                        {shipment.trackingNumber}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">{formatRoute(shipment.recipientAddress)}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={getStatusVariant(shipment.status)}>
                        {shipment.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {shipment.estimatedDeliveryDate ? formatDate(shipment.estimatedDeliveryDate) : 'TBD'}
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