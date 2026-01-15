"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Globe } from "lucide-react"
import Sidebar from "@/components/dashboard/sidebar"
import SenderInfoStep from "@/components/shipment/SenderInfoStep"
import RecipientInfoStep from "@/components/shipment/RecipientInfoStep"
import PackageDetailsStep from "@/components/shipment/PackageDetailsStep"
import ServiceReviewStep from "@/components/shipment/ServiceReviewStep"
import { useAuth } from "@/hooks/use-auth"

interface ShipmentFormData {
  // Sender
  senderName: string
  senderEmail: string
  senderPhone: string
  senderAddress: string
  senderCity: string
  senderCountry: string
  senderPostalCode: string
  // Recipient
  recipientName: string
  recipientEmail: string
  recipientPhone: string
  recipientAddress: string
  recipientCity: string
  recipientCountry: string
  recipientPostalCode: string
  // Package
  packageType: string
  weight: number
  length: number
  width: number
  height: number
  description: string
  value: number
  currency: string
  insuranceOptional: boolean
}

export default function CreateShipmentPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ShipmentFormData>({
    senderName: user ? `${user.firstName} ${user.lastName}` : "",
    senderEmail: user?.email || "",
    senderPhone: user?.phone || "",
    senderAddress: "",
    senderCity: "",
    senderCountry: "",
    senderPostalCode: "",
    recipientName: "",
    recipientEmail: "",
    recipientPhone: "",
    recipientAddress: "",
    recipientCity: "",
    recipientCountry: "",
    recipientPostalCode: "",
    packageType: "PARCEL",
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    description: "",
    value: 0,
    currency: "USD",
    insuranceOptional: false,
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      // Map form fields to DB schema explicitly
      const shipmentData = {
        senderName: formData.senderName,
        senderEmail: formData.senderEmail,
        senderPhone: formData.senderPhone,
        senderAddress: formData.senderAddress,
        senderCity: formData.senderCity,
        senderCountry: formData.senderCountry,
        senderPostalCode: formData.senderPostalCode,
        recipientName: formData.recipientName,
        recipientEmail: formData.recipientEmail,
        recipientPhone: formData.recipientPhone,
        recipientAddress: formData.recipientAddress,
        recipientCity: formData.recipientCity,
        recipientCountry: formData.recipientCountry,
        recipientPostalCode: formData.recipientPostalCode,
        packageType: formData.packageType,
        weight: formData.weight,
        length: formData.length,
        width: formData.width,
        height: formData.height,
        description: formData.description,
        value: formData.value,
        currency: formData.currency,
        insuranceOptional: formData.insuranceOptional,
      }

      const response = await fetch('/api/shipments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(shipmentData),
      })

      if (response.ok) {
        await response.json()
        router.push(`/shipments`)
      }
    } catch (error) {
      console.error('Error creating shipment:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-6 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Shipment</h1>
            <p className="text-gray-600">Complete the details below to initiate your Mediterranean cargo request.</p>
          </div>

          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-4xl">
              {/* Step 1 */}
              <div className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                    currentStep === 1 ? 'bg-[#FFD700] text-black' : currentStep > 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > 1 ? '✓' : '1'}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-xs font-medium ${currentStep === 1 ? 'text-[#FFD700]' : 'text-gray-500'}`}>
                      {currentStep === 1 ? 'CURRENT STEP' : 'STEP 1'}
                    </div>
                    <div className="text-sm font-semibold text-gray-900">Sender Info</div>
                  </div>
                </div>
                <div className={`flex-1 h-0.5 mx-4 ${currentStep > 1 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                    currentStep === 2 ? 'bg-[#FFD700] text-black' : currentStep > 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > 2 ? '✓' : '2'}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-xs font-medium ${currentStep === 2 ? 'text-[#FFD700]' : 'text-gray-500'}`}>
                      {currentStep === 2 ? 'CURRENT STEP' : 'STEP 2'}
                    </div>
                    <div className="text-sm font-semibold text-gray-900">Recipient Info</div>
                  </div>
                </div>
                <div className={`flex-1 h-0.5 mx-4 ${currentStep > 2 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              </div>

              {/* Step 3 */}
              <div className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                    currentStep === 3 ? 'bg-[#FFD700] text-black' : currentStep > 3 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > 3 ? '✓' : '3'}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-xs font-medium ${currentStep === 3 ? 'text-[#FFD700]' : 'text-gray-500'}`}>
                      {currentStep === 3 ? 'CURRENT STEP' : 'STEP 3'}
                    </div>
                    <div className="text-sm font-semibold text-gray-900">Package Details</div>
                  </div>
                </div>
                <div className={`flex-1 h-0.5 mx-4 ${currentStep > 3 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              </div>

              {/* Step 4 */}
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                    currentStep === 4 ? 'bg-[#FFD700] text-black' : 'bg-gray-200 text-gray-600'
                  }`}>
                    4
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-xs font-medium ${currentStep === 4 ? 'text-[#FFD700]' : 'text-gray-500'}`}>
                      {currentStep === 4 ? 'CURRENT STEP' : 'STEP 4'}
                    </div>
                    <div className="text-sm font-semibold text-gray-900">Service & Review</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <SenderInfoStep
                  formData={formData}
                  onInputChange={handleInputChange}
                  onNext={handleNext}
                />
              )}
              {currentStep === 2 && (
                <RecipientInfoStep
                  formData={formData}
                  onInputChange={handleInputChange}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                />
              )}
              {currentStep === 3 && (
                <PackageDetailsStep
                  formData={formData}
                  onInputChange={handleInputChange}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                />
              )}
              {currentStep === 4 && (
                <ServiceReviewStep
                  formData={formData}
                  onPrevious={handlePrevious}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              )}
            </div>

            {/* Right Column - Summary */}
            <div className="space-y-6">
              {/* Shipment Summary Card */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-[#FFD700] rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-black">📦</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">SHIPMENT SUMMARY</h3>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Weight</span>
                    <span className="font-medium text-gray-900">
                      {formData.weight > 0 ? `${formData.weight} kg` : '-- kg'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Route Type</span>
                    <span className="font-medium text-gray-900">
                      {formData.senderCountry && formData.recipientCountry 
                        ? `${formData.senderCountry} → ${formData.recipientCountry}`
                        : 'Not Selected'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Insurance</span>
                    <span className="font-medium text-gray-900">
                      {formData.insuranceOptional ? 'Yes' : 'No'}
                    </span>
                  </div>

                  <div className="border-t pt-3 mt-3">
                    <div className="text-xs text-muted-foreground mb-1">TOTAL QUOTE</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-[#FFD700]">$0.00</span>
                      <span className="text-sm text-muted-foreground">USD</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground italic pt-2">
                    Quotes are finalized in Step 4 after service selection and dimensions verification.
                  </p>
                </div>
              </Card>

              {/* Service Coverage Card */}
              <Card className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">SERVICE COVERAGE</div>
                    <h3 className="text-lg font-semibold">Global Sea-Port Network</h3>
                  </div>
                  <Globe className="w-8 h-8 text-[#FFD700]" />
                </div>
                <p className="text-sm text-gray-300">
                  Access to 500+ ports worldwide with reliable Mediterranean shipping routes.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
