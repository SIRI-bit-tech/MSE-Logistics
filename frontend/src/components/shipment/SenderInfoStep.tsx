"use client"

import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { validatePostalCode, formatPostalCode, getPostalCodePlaceholder } from "@/lib/postal-code-validation"
import { useState, useEffect } from "react"

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
  const [postalCodeValidation, setPostalCodeValidation] = useState<{
    isValid: boolean
    message?: string
    example?: string
  }>({ isValid: true })

  // Validate postal code when it or country changes
  useEffect(() => {
    if (formData.senderPostalCode && formData.senderCountry) {
      const validation = validatePostalCode(formData.senderPostalCode, formData.senderCountry)
      setPostalCodeValidation(validation)
    } else {
      setPostalCodeValidation({ isValid: true })
    }
  }, [formData.senderPostalCode, formData.senderCountry])

  const handlePostalCodeChange = (value: string) => {
    onInputChange('senderPostalCode', value)
    
    // Auto-format postal code if country is selected
    if (formData.senderCountry && value.length > 3) {
      const formatted = formatPostalCode(value, formData.senderCountry)
      if (formatted !== value) {
        onInputChange('senderPostalCode', formatted)
      }
    }
  }

  const getPostalCodeInputProps = () => {
    const placeholder = formData.senderCountry 
      ? getPostalCodePlaceholder(formData.senderCountry)
      : "Enter postal code"
    
    return {
      placeholder,
      className: !postalCodeValidation.isValid ? 'border-red-300 focus:border-red-500' : ''
    }
  }

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
              {...getPostalCodeInputProps()}
              value={formData.senderPostalCode}
              onChange={(e) => handlePostalCodeChange(e.target.value)}
            />
            {!postalCodeValidation.isValid && (
              <div className="mt-1">
                <p className="text-red-500 text-xs">{postalCodeValidation.message}</p>
                {postalCodeValidation.example && (
                  <p className="text-gray-500 text-xs">{postalCodeValidation.example}</p>
                )}
              </div>
            )}
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
