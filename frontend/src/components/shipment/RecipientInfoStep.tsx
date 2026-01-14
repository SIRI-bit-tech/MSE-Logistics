"use client"

import { Card, Input, Button } from "@nextui-org/react"
import { ArrowRight, ArrowLeft, Mail, Phone, MapPin } from "lucide-react"

interface RecipientInfoStepProps {
  formData: {
    recipientName: string
    recipientCompany: string
    recipientEmail: string
    recipientPhone: string
    recipientAddress: string
    recipientCity: string
    recipientCountry: string
    recipientZipCode: string
  }
  onInputChange: (field: string, value: any) => void
  onNext: () => void
  onPrevious: () => void
}

export default function RecipientInfoStep({ formData, onInputChange, onNext, onPrevious }: RecipientInfoStepProps) {
  return (
    <Card className="p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Recipient Information</h2>
          <p className="text-sm text-gray-600 mt-1">Please provide the destination party's contact details.</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-msc-yellow/10 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-msc-yellow" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">RECIPIENT NAME</label>
            <Input
              placeholder="Jane Smith"
              value={formData.recipientName}
              onValueChange={(value) => onInputChange('recipientName', value)}
              classNames={{
                input: "text-gray-900",
                inputWrapper: "bg-white border-gray-200"
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">COMPANY NAME</label>
            <Input
              placeholder="Recipient Company Ltd"
              value={formData.recipientCompany}
              onValueChange={(value) => onInputChange('recipientCompany', value)}
              classNames={{
                input: "text-gray-900",
                inputWrapper: "bg-white border-gray-200"
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">EMAIL ADDRESS</label>
            <Input
              type="email"
              placeholder="recipient@example.com"
              value={formData.recipientEmail}
              onValueChange={(value) => onInputChange('recipientEmail', value)}
              startContent={<Mail className="w-4 h-4 text-gray-400" />}
              classNames={{
                input: "text-gray-900",
                inputWrapper: "bg-white border-gray-200"
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PHONE NUMBER</label>
            <Input
              placeholder="+44 20 1234 5678"
              value={formData.recipientPhone}
              onValueChange={(value) => onInputChange('recipientPhone', value)}
              startContent={<Phone className="w-4 h-4 text-gray-400" />}
              classNames={{
                input: "text-gray-900",
                inputWrapper: "bg-white border-gray-200"
              }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ADDRESS</label>
          <Input
            placeholder="456 High Street, Suite 200"
            value={formData.recipientAddress}
            onValueChange={(value) => onInputChange('recipientAddress', value)}
            classNames={{
              input: "text-gray-900",
              inputWrapper: "bg-white border-gray-200"
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CITY</label>
            <Input
              placeholder="London"
              value={formData.recipientCity}
              onValueChange={(value) => onInputChange('recipientCity', value)}
              classNames={{
                input: "text-gray-900",
                inputWrapper: "bg-white border-gray-200"
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">COUNTRY</label>
            <Input
              placeholder="United Kingdom"
              value={formData.recipientCountry}
              onValueChange={(value) => onInputChange('recipientCountry', value)}
              classNames={{
                input: "text-gray-900",
                inputWrapper: "bg-white border-gray-200"
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP CODE</label>
            <Input
              placeholder="SW1A 1AA"
              value={formData.recipientZipCode}
              onValueChange={(value) => onInputChange('recipientZipCode', value)}
              classNames={{
                input: "text-gray-900",
                inputWrapper: "bg-white border-gray-200"
              }}
            />
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
            className="bg-black text-white hover:bg-gray-800 px-8"
            endContent={<ArrowRight className="w-5 h-5" />}
            onPress={onNext}
          >
            Next: Package Details
          </Button>
        </div>
      </div>
    </Card>
  )
}
