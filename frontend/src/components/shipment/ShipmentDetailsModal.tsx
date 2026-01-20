"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, MapPin, User, Phone, Mail, Calendar, DollarSign } from "lucide-react"

interface Shipment {
  id: string
  trackingNumber: string
  status: string
  createdAt: string
  estimatedDeliveryDate?: string | null
  totalCost: number
  // Sender info
  senderName?: string
  senderEmail?: string
  senderPhone?: string
  senderAddress?: string
  senderCity?: string
  senderCountry?: string
  senderPostalCode?: string
  // Recipient info
  recipientName?: string
  recipientEmail?: string
  recipientPhone?: string
  recipientAddress?: string
  recipientCity?: string
  recipientCountry?: string
  recipientPostalCode?: string
  // Package info
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

interface ShipmentDetailsModalProps {
  shipment: Shipment | null
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

export default function ShipmentDetailsModal({ shipment, isOpen, onClose }: ShipmentDetailsModalProps) {
  if (!shipment) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Package className="w-6 h-6 text-[#D4AF37]" />
            Shipment Details - {shipment.trackingNumber}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Status</label>
              <Badge className={`${getStatusColor(shipment.status)} border-0`}>
                {shipment.status.replace(/_/g, ' ')}
              </Badge>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Created</label>
              <p className="text-sm text-gray-900">
                {new Date(shipment.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Total Cost</label>
              <p className="text-sm text-gray-900 font-semibold">
                ${shipment.totalCost.toFixed(2)} USD
              </p>
            </div>
          </div>

          <Separator />

          {/* Sender Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-[#D4AF37]" />
              Sender Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Name:</span>
                  <span className="text-sm text-gray-900">{shipment.senderName || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Email:</span>
                  <span className="text-sm text-gray-900">{shipment.senderEmail || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Phone:</span>
                  <span className="text-sm text-gray-900">{shipment.senderPhone || 'N/A'}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div>
                    <span className="text-sm text-gray-600">Address:</span>
                    <p className="text-sm text-gray-900">
                      {shipment.senderAddress || 'N/A'}<br />
                      {shipment.senderCity || 'N/A'}, {shipment.senderCountry || 'N/A'}<br />
                      {shipment.senderPostalCode || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Recipient Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#D4AF37]" />
              Recipient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Name:</span>
                  <span className="text-sm text-gray-900">{shipment.recipientName || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Email:</span>
                  <span className="text-sm text-gray-900">{shipment.recipientEmail || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Phone:</span>
                  <span className="text-sm text-gray-900">{shipment.recipientPhone || 'N/A'}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div>
                    <span className="text-sm text-gray-600">Address:</span>
                    <p className="text-sm text-gray-900">
                      {shipment.recipientAddress || 'N/A'}<br />
                      {shipment.recipientCity || 'N/A'}, {shipment.recipientCountry || 'N/A'}<br />
                      {shipment.recipientPostalCode || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Package Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#D4AF37]" />
              Package Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Type:</span>
                  <span className="ml-2 text-sm text-gray-900">{shipment.packageType || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Weight:</span>
                  <span className="ml-2 text-sm text-gray-900">{shipment.weight || 0} kg</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Dimensions:</span>
                  <span className="ml-2 text-sm text-gray-900">
                    {shipment.length || 0} × {shipment.width || 0} × {shipment.height || 0} cm
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Service Type:</span>
                  <span className="ml-2 text-sm text-gray-900">{shipment.serviceType || 'Standard'}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Declared Value:</span>
                  <span className="text-sm text-gray-900">
                    {shipment.value || 0} {shipment.currency || 'USD'}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Insurance:</span>
                  <span className="ml-2 text-sm text-gray-900">
                    {shipment.insuranceCost && shipment.insuranceCost > 0 ? `$${shipment.insuranceCost.toFixed(2)}` : 'No'}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Transport Mode:</span>
                  <span className="ml-2 text-sm text-gray-900">{shipment.transportMode || 'Land'}</span>
                </div>
                {shipment.estimatedDeliveryDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Est. Delivery:</span>
                    <span className="text-sm text-gray-900">
                      {new Date(shipment.estimatedDeliveryDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {shipment.description && (
              <div className="mt-4">
                <span className="text-sm text-gray-600">Description:</span>
                <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-md">
                  {shipment.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}