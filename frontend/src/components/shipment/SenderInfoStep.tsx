"use client"

import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SenderInfoStepProps {
  formData: {
    senderName: string
    senderEmail: string
    senderPhone: string
    senderAddress: string
    senderCity: string
    senderCountry: string
    senderPostalCode: string
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SENDER NAME</label>
          <Input
            placeholder="John Doe"
            value={formData.senderName}
            onChange={(e) => onInputChange('senderName', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">EMAIL ADDRESS</label>
            <div className="relative">
              <Input
                type="email"
                placeholder="sender@example.com"
                value={formData.senderEmail}
                onChange={(e) => onInputChange('senderEmail', e.target.value)}
                className="pl-10"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PHONE NUMBER</label>
            <div className="relative">
              <Input
                placeholder="+1 (555) 000-0000"
                value={formData.senderPhone}
                onChange={(e) => onInputChange('senderPhone', e.target.value)}
                className="pl-10"
              />
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ADDRESS</label>
          <Input
            placeholder="123 Main Street, Building A"
            value={formData.senderAddress}
            onChange={(e) => onInputChange('senderAddress', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CITY</label>
            <Input
              placeholder="New York"
              value={formData.senderCity}
              onChange={(e) => onInputChange('senderCity', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">COUNTRY</label>
            <Input
              placeholder="United States"
              value={formData.senderCountry}
              onChange={(e) => onInputChange('senderCountry', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">POSTAL CODE</label>
            <Input
              placeholder="10001"
              value={formData.senderPostalCode}
              onChange={(e) => onInputChange('senderPostalCode', e.target.value)}
            />
          </div>
        </div>

        <div className="pt-6 flex justify-end">
          <Button
            size="lg"
            className="bg-black text-white hover:bg-gray-800 px-8"
            onClick={onNext}
          >
            Next: Recipient Info
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
