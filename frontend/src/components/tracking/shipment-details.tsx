"use client"

import { Card, CardBody, CardHeader, Divider, Chip } from "@nextui-org/react"
import type { Shipment } from "../../../global"

interface ShipmentDetailsProps {
  shipment: Shipment
}

export default function ShipmentDetails({ shipment }: ShipmentDetailsProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-col items-start px-4 py-3">
          <h4 className="text-lg font-bold">Shipment Details</h4>
        </CardHeader>
        <Divider />
        <CardBody className="gap-3 p-4">
          <div>
            <p className="text-sm text-gray-600">Service Type</p>
            <Chip variant="flat" size="sm">
              {shipment.serviceType}
            </Chip>
          </div>

          <div>
            <p className="text-sm text-gray-600">Package Type</p>
            <p className="font-semibold">{shipment.packageType}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Weight</p>
            <p className="font-semibold">{shipment.weight} kg</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Dimensions</p>
            <p className="font-semibold">
              {shipment.length} × {shipment.width} × {shipment.height} cm
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Value</p>
            <p className="font-semibold">
              {shipment.currency} {shipment.value}
            </p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex flex-col items-start px-4 py-3">
          <h4 className="text-lg font-bold">Cost Breakdown</h4>
        </CardHeader>
        <Divider />
        <CardBody className="gap-3 p-4">
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping</p>
            <p className="font-semibold">${shipment.shippingCost}</p>
          </div>

          {shipment.insuranceCost && (
            <div className="flex justify-between">
              <p className="text-gray-600">Insurance</p>
              <p className="font-semibold">${shipment.insuranceCost}</p>
            </div>
          )}

          <Divider />

          <div className="flex justify-between">
            <p className="font-bold">Total</p>
            <p className="font-bold text-lg">${shipment.totalCost}</p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex flex-col items-start px-4 py-3">
          <h4 className="text-lg font-bold">Sender Information</h4>
        </CardHeader>
        <Divider />
        <CardBody className="gap-2 p-4 text-sm">
          <p>
            <strong>{shipment.senderName}</strong>
          </p>
          <p>{shipment.senderAddress}</p>
          <p>
            {shipment.senderCity}, {shipment.senderPostalCode}
          </p>
          <p>{shipment.senderCountry}</p>
          <p>{shipment.senderPhone}</p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex flex-col items-start px-4 py-3">
          <h4 className="text-lg font-bold">Recipient Information</h4>
        </CardHeader>
        <Divider />
        <CardBody className="gap-2 p-4 text-sm">
          <p>
            <strong>{shipment.recipientName}</strong>
          </p>
          <p>{shipment.recipientAddress}</p>
          <p>
            {shipment.recipientCity}, {shipment.recipientPostalCode}
          </p>
          <p>{shipment.recipientCountry}</p>
          <p>{shipment.recipientPhone}</p>
        </CardBody>
      </Card>
    </div>
  )
}
