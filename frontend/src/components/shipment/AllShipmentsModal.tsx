"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Package, Search, Eye, MapPin, Calendar } from "lucide-react"
import ShipmentDetailsModal from "./ShipmentDetailsModal"

interface Shipment {
  id: string
  trackingNumber: string
  status: string
  createdAt: string
  recipientCity: string
  recipientCountry: string
  estimatedDeliveryDate?: string
  totalCost: number
  // Additional fields for details modal
  senderName?: string
  senderEmail?: string
  senderPhone?: string
  senderAddress?: string
  senderCity?: string
  senderCountry?: string
  senderPostalCode?: string
  recipientName?: string
  recipientEmail?: string
  recipientPhone?: string
  recipientAddress?: string
  recipientPostalCode?: string
  packageType?: string
  weight?: number
  length?: number
  width?: number
  height?: number
  description?: string
  value?: number
  currency?: string
  insuranceCost?: number | null
  serviceType?: string
  transportMode?: string
}

interface AllShipmentsModalProps {
  isOpen: boolean
  onClose: () => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800'
    case 'PROCESSING':
      return 'bg-blue-100 text-blue-800'
    case 'IN_TRANSIT':
      return 'bg-purple-100 text-purple-800'
    case 'DELIVERED':
      return 'bg-green-100 text-green-800'
    case 'ON_HOLD':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function AllShipmentsModal({ isOpen, onClose }: AllShipmentsModalProps) {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [filteredShipments, setFilteredShipments] = useState<Shipment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)

  // Fetch all shipments
  const fetchShipments = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/shipments?take=100', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        const data = await response.json()
        setShipments(data.shipments || [])
        setFilteredShipments(data.shipments || [])
      }
    } catch (error) {
      console.error('Error fetching shipments:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch detailed shipment data
  const fetchShipmentDetails = async (shipmentId: string) => {
    try {
      const response = await fetch(`/api/shipments/${shipmentId}`, {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        return data.shipment
      }
    } catch (error) {
      console.error('Error fetching shipment details:', error)
    }
    return null
  }

  // Handle view details
  const handleViewDetails = async (shipment: Shipment) => {
    const detailedShipment = await fetchShipmentDetails(shipment.id)
    if (detailedShipment) {
      setSelectedShipment(detailedShipment)
      setDetailsModalOpen(true)
    }
  }

  // Filter shipments based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredShipments(shipments)
    } else {
      const filtered = shipments.filter(shipment =>
        shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.recipientCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.recipientCountry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.status.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredShipments(filtered)
    }
  }, [searchTerm, shipments])

  // Fetch shipments when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchShipments()
    }
  }, [isOpen])

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Package className="w-6 h-6 text-[#D4AF37]" />
              All Shipments
            </DialogTitle>
          </DialogHeader>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by tracking number, destination, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Shipments Table */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-gray-500">Loading shipments...</div>
              </div>
            ) : filteredShipments.length === 0 ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-gray-500">
                  {searchTerm ? 'No shipments found matching your search.' : 'No shipments found.'}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Header */}
                <div className="grid grid-cols-12 gap-4 p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-600">
                  <div className="col-span-3">TRACKING NUMBER</div>
                  <div className="col-span-3">DESTINATION</div>
                  <div className="col-span-2">STATUS</div>
                  <div className="col-span-2">CREATED</div>
                  <div className="col-span-1">COST</div>
                  <div className="col-span-1">ACTIONS</div>
                </div>

                {/* Shipment Rows */}
                {filteredShipments.map((shipment) => (
                  <div
                    key={shipment.id}
                    className="grid grid-cols-12 gap-4 p-3 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="col-span-3">
                      <div className="font-medium text-gray-900">{shipment.trackingNumber}</div>
                    </div>
                    <div className="col-span-3">
                      <div className="flex items-center gap-1 text-gray-700">
                        <MapPin className="w-3 h-3" />
                        <span className="text-sm">
                          {shipment.recipientCity}, {shipment.recipientCountry}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <Badge className={`${getStatusColor(shipment.status)} border-0`}>
                        {shipment.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center gap-1 text-gray-600 text-sm">
                        <Calendar className="w-3 h-3" />
                        {new Date(shipment.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="text-sm font-medium text-gray-900">
                        ${shipment.totalCost.toFixed(0)}
                      </div>
                    </div>
                    <div className="col-span-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleViewDetails(shipment)}
                        className="h-8 w-8 p-0"
                        aria-label="View shipment details"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-gray-600">
              Showing {filteredShipments.length} of {shipments.length} shipments
            </div>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Shipment Details Modal */}
      <ShipmentDetailsModal
        shipment={selectedShipment}
        isOpen={detailsModalOpen}
        onClose={() => {
          setDetailsModalOpen(false)
          setSelectedShipment(null)
        }}
      />
    </>
  )
}