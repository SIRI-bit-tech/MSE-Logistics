"use client"

import { Card, CardBody, CardHeader, Divider, Chip } from "@nextui-org/react"
import type { Shipment } from "../../../global"

interface ShipmentDetailsProps {
  shipment: Shipment
}

export default function ShipmentDetails({ shipment }: ShipmentDetailsProps) {
  return (
    <div className="space-y-4">
      {/* Package Information */}
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col items-start px-4 py-3 bg-gray-50">
          <h4 className="text-lg font-bold text-[#003873]">Package Information</h4>
        </CardHeader>
        <Divider />
        <CardBody className="gap-3 p-4">
          <div>
            <p className="text-sm text-gray-600">Package Type</p>
            <Chip variant="flat" size="sm" className="mt-1">
              {shipment.packageType}
            </Chip>
          </div>

          <div>
            <p className="text-sm text-gray-600">Weight</p>
            <p className="font-semibold">{shipment.weight} kg</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Dimensions (L × W × H)</p>
            <p className="font-semibold">
              {shipment.length} × {shipment.width} × {shipment.height} cm
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Declared Value</p>
            <p className="font-semibold">
              {shipment.currency} {shipment.value.toLocaleString()}
            </p>
          </div>

          {shipment.description && (
            <div>
              <p className="text-sm text-gray-600">Description</p>
              <p className="text-sm">{shipment.description}</p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Service Details */}
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col items-start px-4 py-3 bg-gray-50">
          <h4 className="text-lg font-bold text-[#003873]">Service Details</h4>
        </CardHeader>
        <Divider />
        <CardBody className="gap-3 p-4">
          <div>
            <p className="text-sm text-gray-600">Service Type</p>
            <Chip 
              variant="flat" 
              size="sm" 
              color={shipment.serviceType === "EXPRESS" ? "warning" : "default"}
              className="mt-1"
            >
              {shipment.serviceType}
            </Chip>
          </div>

          <div>
            <p className="text-sm text-gray-600">Transport Mode</p>
            <p className="font-semibold">{shipment.transportMode}</p>
          </div>

          {shipment.estimatedDeliveryDate && (
            <div>
              <p className="text-sm text-gray-600">Estimated Delivery</p>
              <p className="font-semibold">
                {new Date(shipment.estimatedDeliveryDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          )}

          {shipment.actualDeliveryDate && (
            <div>
              <p className="text-sm text-gray-600">Actual Delivery</p>
              <p className="font-semibold text-green-600">
                {new Date(shipment.actualDeliveryDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Cost Breakdown */}
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col items-start px-4 py-3 bg-gray-50">
          <h4 className="text-lg font-bold text-[#003873]">Cost Breakdown</h4>
        </CardHeader>
        <Divider />
        <CardBody className="gap-3 p-4">
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Cost</p>
            <p className="font-semibold">{shipment.currency || '$'}{shipment.shippingCost.toFixed(2)}</p>
          </div>

          {shipment.insuranceCost && shipment.insuranceCost > 0 && (
            <div className="flex justify-between">
              <p className="text-gray-600">Insurance</p>
              <p className="font-semibold">{shipment.currency || '$'}{shipment.insuranceCost.toFixed(2)}</p>
            </div>
          )}

          <Divider />

          <div className="flex justify-between">
            <p className="font-bold text-[#003873]">Total Cost</p>
            <p className="font-bold text-lg text-[#D4AF37]">{shipment.currency || '$'}{shipment.totalCost.toFixed(2)}</p>
          </div>
        </CardBody>
      </Card>

      {/* Sender Information */}
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col items-start px-4 py-3 bg-gray-50">
          <h4 className="text-lg font-bold text-[#003873]">Sender Information</h4>
        </CardHeader>
        <Divider />
        <CardBody className="gap-2 p-4 text-sm">
          <p className="font-semibold text-[#003873]">{shipment.senderName}</p>
          <p className="text-gray-600">{shipment.senderAddress}</p>
          <p className="text-gray-600">
            {shipment.senderCity}, {shipment.senderPostalCode}
          </p>
          <p className="text-gray-600">{shipment.senderCountry}</p>
          <Divider className="my-2" />
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-600">{shipment.senderEmail}</p>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <p className="text-gray-600">{shipment.senderPhone}</p>
          </div>
        </CardBody>
      </Card>

      {/* Recipient Information */}
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col items-start px-4 py-3 bg-gray-50">
          <h4 className="text-lg font-bold text-[#003873]">Recipient Information</h4>
        </CardHeader>
        <Divider />
        <CardBody className="gap-2 p-4 text-sm">
          <p className="font-semibold text-[#003873]">{shipment.recipientName}</p>
          <p className="text-gray-600">{shipment.recipientAddress}</p>
          <p className="text-gray-600">
            {shipment.recipientCity}, {shipment.recipientPostalCode}
          </p>
          <p className="text-gray-600">{shipment.recipientCountry}</p>
          <Divider className="my-2" />
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-600">{shipment.recipientEmail}</p>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <p className="text-gray-600">{shipment.recipientPhone}</p>
          </div>
        </CardBody>
      </Card>

      {/* Current Location (if available) */}
      {shipment.currentLocation && (
        <Card className="shadow-lg border-2 border-[#D4AF37]">
          <CardHeader className="flex flex-col items-start px-4 py-3 bg-yellow-50">
            <h4 className="text-lg font-bold text-[#003873]">Current Location</h4>
          </CardHeader>
          <Divider />
          <CardBody className="gap-2 p-4">
            <p className="font-semibold text-[#D4AF37]">{shipment.currentLocation}</p>
            {shipment.lastLocationUpdate && (
              <p className="text-xs text-gray-500">
                Last updated: {new Date(shipment.lastLocationUpdate).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            )}
          </CardBody>
        </Card>
      )}
    </div>
  )
}
