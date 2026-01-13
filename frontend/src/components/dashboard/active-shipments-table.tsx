"use client"

import { 
  Card, 
  CardBody, 
  CardHeader, 
  Table, 
  TableBody, 
  TableCell, 
  TableColumn, 
  TableHeader, 
  TableRow,
  Link,
  Spinner
} from "@nextui-org/react"
import { useEffect, useState } from "react"

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
        const response = await fetch('/api/graphql-proxy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            query: `
              query GetUserShipments {
                getUserShipments {
                  id
                  trackingNumber
                  recipientName
                  recipientAddress
                  status
                  createdAt
                  estimatedDeliveryDate
                }
              }
            `
          })
        })

        if (response.ok) {
          const data = await response.json()
          if (data.data?.getUserShipments) {
            // Show only active shipments (not delivered or cancelled)
            const activeShipments = data.data.getUserShipments.filter(
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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Active Shipments</h3>
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
        <h3 className="text-lg font-semibold">Active Shipments</h3>
        <Link href="/shipments" className="text-sm text-msc-yellow hover:underline">
          View All
        </Link>
      </CardHeader>
      <CardBody>
        {shipments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No active shipments found.</p>
            <Link href="/shipments/new" className="text-msc-yellow hover:underline mt-2 inline-block">
              Create your first shipment
            </Link>
          </div>
        ) : (
          <Table aria-label="Active shipments table" removeWrapper>
            <TableHeader>
              <TableColumn>Tracking Number</TableColumn>
              <TableColumn>Destination</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>ETA</TableColumn>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell className="font-mono text-sm font-medium">
                    {shipment.trackingNumber}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{formatRoute(shipment.recipientAddress)}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      shipment.status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-800' :
                      shipment.status === 'PROCESSING' ? 'bg-yellow-100 text-yellow-800' :
                      shipment.status === 'PICKED_UP' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {shipment.status.replace('_', ' ')}
                    </span>
                  </TableCell>
                  <TableCell>
                    {shipment.estimatedDeliveryDate ? formatDate(shipment.estimatedDeliveryDate) : 'TBD'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardBody>
    </Card>
  )
}