"use client"

import { ArrowRight, ArrowLeft, Mail, Phone, MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { validatePostalCode, formatPostalCode, getPostalCodePlaceholder } from "@/lib/postal-code-validation"
import { useState, useEffect } from "react"

interface RecipientInfoStepProps {
  formData: {
    recipientName: string
    recipientEmail: string
    recipientPhone: string
    recipientAddress: string
    recipientCity: string
    recipientCountry: string
    recipientPostalCode: string
  }
  onInputChange: (field: string, value: any) => void
  onNext: () => void
  onPrevious: () => void
}

export default function RecipientInfoStep({ formData, onInputChange, onNext, onPrevious }: RecipientInfoStepProps) {
  const [postalCodeValidation, setPostalCodeValidation] = useState<{
    isValid: boolean
    message?: string
    example?: string
  }>({ isValid: true })

  // Validate postal code when it or country changes
  useEffect(() => {
    if (formData.recipientPostalCode && formData.recipientCountry) {
      const validation = validatePostalCode(formData.recipientPostalCode, formData.recipientCountry)
      setPostalCodeValidation(validation)
    } else {
      setPostalCodeValidation({ isValid: true })
    }
  }, [formData.recipientPostalCode, formData.recipientCountry])

  const handlePostalCodeChange = (value: string) => {
    onInputChange('recipientPostalCode', value)
    
    // Auto-format postal code if country is selected
    if (formData.recipientCountry && value.length > 3) {
      const formatted = formatPostalCode(value, formData.recipientCountry)
      if (formatted !== value) {
        onInputChange('recipientPostalCode', formatted)
      }
    }
  }

  const getPostalCodeInputProps = () => {
    const placeholder = formData.recipientCountry 
      ? getPostalCodePlaceholder(formData.recipientCountry)
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
          <h2 className="text-xl font-semibold text-gray-900">Recipient Information</h2>
          <p className="text-sm text-gray-600 mt-1">Please provide the destination party's contact details.</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-msc-yellow/10 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-msc-yellow" />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-2">RECIPIENT NAME</label>
          <Input
            id="recipientName"
            placeholder="Jane Smith"
            value={formData.recipientName}
            onChange={(e) => onInputChange('recipientName', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700 mb-2">EMAIL ADDRESS</label>
            <div className="relative">
              <Input
                id="recipientEmail"
                type="email"
                placeholder="recipient@example.com"
                value={formData.recipientEmail}
                onChange={(e) => onInputChange('recipientEmail', e.target.value)}
                className="pl-10"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div>
            <label htmlFor="recipientPhone" className="block text-sm font-medium text-gray-700 mb-2">PHONE NUMBER</label>
            <div className="relative">
              <Input
                id="recipientPhone"
                placeholder="+44 20 1234 5678"
                value={formData.recipientPhone}
                onChange={(e) => onInputChange('recipientPhone', e.target.value)}
                className="pl-10"
              />
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="recipientAddress" className="block text-sm font-medium text-gray-700 mb-2">ADDRESS</label>
          <Input
            id="recipientAddress"
            placeholder="456 High Street, Suite 200"
            value={formData.recipientAddress}
            onChange={(e) => onInputChange('recipientAddress', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="recipientCity" className="block text-sm font-medium text-gray-700 mb-2">CITY</label>
            <Input
              id="recipientCity"
              placeholder="London"
              value={formData.recipientCity}
              onChange={(e) => onInputChange('recipientCity', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="recipientCountry" className="block text-sm font-medium text-gray-700 mb-2">COUNTRY</label>
            <Input
              id="recipientCountry"
              placeholder="United Kingdom"
              value={formData.recipientCountry}
              onChange={(e) => onInputChange('recipientCountry', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="recipientPostalCode" className="block text-sm font-medium text-gray-700 mb-2">POSTAL CODE</label>
            <Input
              id="recipientPostalCode"
              {...getPostalCodeInputProps()}
              value={formData.recipientPostalCode}
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

        <div className="pt-6 flex justify-between">
          <Button
            size="lg"
            variant="outline"
            className="px-8"
            onClick={onPrevious}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>
          <Button
            size="lg"
            className="bg-black text-white hover:bg-gray-800 px-8"
            onClick={onNext}
          >
            Next: Package Details
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
