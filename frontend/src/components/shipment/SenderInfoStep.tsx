"use client"

import { Card, Input, Button, Checkbox } from "@nextui-org/react"
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"

interface SenderInfoStepProps {
  formData: {
    senderName: string
    senderCompany: string
    senderEmail: string
    senderPhone: string
    senderAddress: string
    senderCity: string
    senderCountry: string
    senderZipCode: string
    saveToAddressBook: boolean
  }
  onInputChange: (field: string, value: any) => void
  onNext: () => void
}

export default function SenderInfoStep({ formData, onInputChange, onNext }: SenderInfoStepProps) {
  return (
    <Card className="p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Sender Information</h2>
          <p className="text-sm text-gray-600 mt-1">Please provide the originating party's contact details.</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-msc-yellow/10 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-msc-yellow" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SENDER NAME</label>
            <Input
              placeholder="John Doe"
              value={formData.senderName}
              onValueChange={(value) => onInputChange('senderName', value)}
              classNames={{
                input: "text-gray-900",
                inputWrapper: "bg-white border-gray-200"
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">COMPANY NAME</label>
            <Input
              placeholder="MSE Mediterranean Services"
              value={formData.senderCompany}
              onValueChange={(value) => onInputChange('senderCompany', value)}
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
              placeholder="sender@example.com"
              value={formData.senderEmail}
              onValueChange={(value) => onInputChange('senderEmail', value)}
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
              placeholder="+1 (555) 000-0000"
              value={formData.senderPhone}
              onValueChange={(value) => onInputChange('senderPhone', value)}
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
            placeholder="123 Main Street, Building A"
            value={formData.senderAddress}
            onValueChange={(value) => onInputChange('senderAddress', value)}
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
              placeholder="New York"
              value={formData.senderCity}
              onValueChange={(value) => onInputChange('senderCity', value)}
              classNames={{
                input: "text-gray-900",
                inputWrapper: "bg-white border-gray-200"
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">COUNTRY</label>
            <Input
              placeholder="United States"
              value={formData.senderCountry}
              onValueChange={(value) => onInputChange('senderCountry', value)}
              classNames={{
                input: "text-gray-900",
                inputWrapper: "bg-white border-gray-200"
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP CODE</label>
            <Input
              placeholder="10001"
              value={formData.senderZipCode}
              onValueChange={(value) => onInputChange('senderZipCode', value)}
              classNames={{
                input: "text-gray-900",
                inputWrapper: "bg-white border-gray-200"
              }}
            />
          </div>
        </div>

        <div className="pt-4">
          <Checkbox
            isSelected={formData.saveToAddressBook}
            onValueChange={(checked) => onInputChange('saveToAddressBook', checked)}
            classNames={{
              label: "text-sm text-gray-700"
            }}
          >
            Save these details to my address book for future shipments.
          </Checkbox>
        </div>

        <div className="pt-6 flex justify-end">
          <Button
            size="lg"
            className="bg-black text-white hover:bg-gray-800 px-8"
            endContent={<ArrowRight className="w-5 h-5" />}
            onPress={onNext}
          >
            Next: Recipient Info
          </Button>
        </div>
      </div>
    </Card>
  )
}
