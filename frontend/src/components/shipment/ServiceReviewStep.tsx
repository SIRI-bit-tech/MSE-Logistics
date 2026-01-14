"use client"

import { Card, Button } from "@nextui-org/react"
import { ArrowLeft, CheckCircle } from "lucide-react"

interface ServiceReviewStepProps {
  formData: any
  onPrevious: () => void
  onSubmit: () => void
  isLoading: boolean
}

export default function ServiceReviewStep({ formData, onPrevious, onSubmit, isLoading }: ServiceReviewStepProps) {
  return (
    <Card className="p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Review & Confirm</h2>
          <p className="text-sm text-gray-600 mt-1">Please review your shipment details before submitting.</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-msc-yellow/10 flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-msc-yellow" />
        </div>
      </div>

      <div className="space-y-6">
        {/* Sender Information */}
        <div className="border-b pb-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">SENDER INFORMATION</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Name:</span>
              <span className="ml-2 text-gray-900">{formData.senderName}</span>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <span className="ml-2 text-gray-900">{formData.senderEmail}</span>
            </div>
            <div>
              <span className="text-gray-600">Phone:</span>
              <span className="ml-2 text-gray-900">{formData.senderPhone}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-600">Address:</span>
              <span className="ml-2 text-gray-900">
                {formData.senderAddress}, {formData.senderCity}, {formData.senderCountry} {formData.senderPostalCode}
              </span>
            </div>
          </div>
        </div>

        {/* Recipient Information */}
        <div className="border-b pb-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">RECIPIENT INFORMATION</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Name:</span>
              <span className="ml-2 text-gray-900">{formData.recipientName}</span>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <span className="ml-2 text-gray-900">{formData.recipientEmail}</span>
            </div>
            <div>
              <span className="text-gray-600">Phone:</span>
              <span className="ml-2 text-gray-900">{formData.recipientPhone}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-600">Address:</span>
              <span className="ml-2 text-gray-900">
                {formData.recipientAddress}, {formData.recipientCity}, {formData.recipientCountry} {formData.recipientPostalCode}
              </span>
            </div>
          </div>
        </div>

        {/* Package Details */}
        <div className="border-b pb-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">PACKAGE DETAILS</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Type:</span>
              <span className="ml-2 text-gray-900">{formData.packageType}</span>
            </div>
            <div>
              <span className="text-gray-600">Weight:</span>
              <span className="ml-2 text-gray-900">{formData.weight} kg</span>
            </div>
            <div>
              <span className="text-gray-600">Dimensions:</span>
              <span className="ml-2 text-gray-900">
                {formData.length} x {formData.width} x {formData.height} cm
              </span>
            </div>
            <div>
              <span className="text-gray-600">Value:</span>
              <span className="ml-2 text-gray-900">
                {formData.value} {formData.currency}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-600">Description:</span>
              <span className="ml-2 text-gray-900">{formData.description}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-600">Insurance:</span>
              <span className="ml-2 text-gray-900">{formData.insuranceOptional ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex justify-between">
          <Button
            size="lg"
            variant="bordered"
            className="px-8"
            startContent={<ArrowLeft className="w-5 h-5" />}
            onPress={onPrevious}
          >
            Previous
          </Button>
          <Button
            size="lg"
            className="bg-msc-yellow text-black hover:bg-msc-yellow/90 px-8"
            onPress={onSubmit}
            isLoading={isLoading}
          >
            Create Shipment
          </Button>
        </div>
      </div>
    </Card>
  )
}
