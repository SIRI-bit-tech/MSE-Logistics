"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Card, 
  CardBody, 
  Input, 
  Button, 
  Select, 
  SelectItem, 
  Textarea,
  Checkbox,
  Spinner
} from "@nextui-org/react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Stepper from "@/components/ui/stepper"
import ShippingServiceCard from "@/components/ui/shipping-service-card"
import { PACKAGE_TYPES } from "../../../../../constants"
import { useAuth } from "@/hooks/use-auth"

type PackageType = "DOCUMENTS" | "PARCEL" | "FRAGILE" | "ELECTRONICS" | "CLOTHING" | "FOOD" | "HAZARDOUS" | "OTHER"
type ServiceType = "EXPRESS" | "STANDARD" | "ECONOMY"

interface StepperStep {
  id: number
  title: string
  description: string
  completed: boolean
  active: boolean
}

interface ShippingRate {
  serviceType: ServiceType
  baseRate: number
  fuelSurcharge: number
  insurance: number
  totalCost: number
  deliveryDays: number
  description: string
}

interface ShipmentFormData {
  senderName: string
  senderEmail: string
  senderPhone: string
  senderAddress: string
  senderCity: string
  senderCountry: string
  senderPostalCode: string
  recipientName: string
  recipientEmail: string
  recipientPhone: string
  recipientAddress: string
  recipientCity: string
  recipientCountry: string
  recipientPostalCode: string
  packageType: PackageType
  weight: number
  length: number
  width: number
  height: number
  description: string
  value: number
  currency: string
  serviceType: ServiceType
  insuranceOptional: boolean
}

const CURRENCIES = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
]

const STEPS: StepperStep[] = [
  { id: 1, title: "Sender Info", description: "Your details", completed: false, active: true },
  { id: 2, title: "Recipient Info", description: "Delivery details", completed: false, active: false },
  { id: 3, title: "Package Details", description: "What you're sending", completed: false, active: false },
  { id: 4, title: "Service & Review", description: "Choose service", completed: false, active: false },
]

export default function CreateShipmentPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [steps, setSteps] = useState(STEPS)
  const [isLoading, setIsLoading] = useState(false)
  const [rates, setRates] = useState<ShippingRate[]>([])
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null)
  const [formData, setFormData] = useState<ShipmentFormData>({
    // Sender Info - Pre-fill with user data
    senderName: user ? `${user.firstName} ${user.lastName}` : "",
    senderEmail: user?.email || "",
    senderPhone: user?.phone || "",
    senderAddress: "",
    senderCity: "",
    senderCountry: "",
    senderPostalCode: "",

    // Recipient Info
    recipientName: "",
    recipientEmail: "",
    recipientPhone: "",
    recipientAddress: "",
    recipientCity: "",
    recipientCountry: "",
    recipientPostalCode: "",

    // Package Details
    packageType: "PARCEL" as PackageType,
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    description: "",
    value: 0,
    currency: "USD",

    // Service Selection
    serviceType: "STANDARD" as ServiceType,
    insuranceOptional: false,
  })

  const updateSteps = (stepNumber: number) => {
    setSteps((prev: StepperStep[]) => prev.map(step => ({
      ...step,
      completed: step.id < stepNumber,
      active: step.id === stepNumber
    })))
  }

  const handleInputChange = (field: keyof ShipmentFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateRates = async () => {
    if (!formData.weight || !formData.length || !formData.width || !formData.height) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/shipping/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weight: formData.weight,
          length: formData.length,
          width: formData.width,
          height: formData.height,
          value: formData.value,
          senderCountry: formData.senderCountry,
          recipientCountry: formData.recipientCountry,
          insuranceOptional: formData.insuranceOptional,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setRates(data.rates)
      }
    } catch (error) {
      console.error('Error calculating rates:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.senderName && formData.senderEmail && formData.senderPhone && 
                 formData.senderAddress && formData.senderCity && formData.senderCountry && 
                 formData.senderPostalCode)
      case 2:
        return !!(formData.recipientName && formData.recipientEmail && formData.recipientPhone && 
                 formData.recipientAddress && formData.recipientCity && formData.recipientCountry && 
                 formData.recipientPostalCode)
      case 3:
        return !!(formData.weight > 0 && formData.length > 0 && formData.width > 0 && 
                 formData.height > 0 && formData.description && formData.value > 0)
      case 4:
        return !!selectedService
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      updateSteps(nextStep)
      
      if (nextStep === 4) {
        calculateRates()
      }
    }
  }

  const handlePrevious = () => {
    const prevStep = currentStep - 1
    setCurrentStep(prevStep)
    updateSteps(prevStep)
  }

  const handleSubmit = async () => {
    if (!selectedService) return

    setIsLoading(true)
    try {
      const selectedRate = rates.find(rate => rate.serviceType === selectedService)
      
      const shipmentData = {
        ...formData,
        serviceType: selectedService,
        shippingCost: selectedRate?.baseRate || 0,
        insuranceCost: selectedRate?.insurance || 0,
        totalCost: selectedRate?.totalCost || 0,
      }

      const response = await fetch('/api/shipments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shipmentData),
      })

      if (response.ok) {
        const { shipment } = await response.json()
        router.push(`/shipments/${shipment.id}`)
      }
    } catch (error) {
      console.error('Error creating shipment:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Button
          variant="light"
          startContent={<ArrowLeft className="w-4 h-4" />}
          onPress={() => router.back()}
          className="mb-4"
        >
          Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Create New Shipment</h1>
        <p className="text-gray-600 mt-2">Fill in the details to create your shipment</p>
      </div>

      <Stepper steps={steps} currentStep={currentStep} />

      <Card className="mb-8">
        <CardBody className="p-8">
          {/* Step 1: Sender Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Sender Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.senderName}
                  onValueChange={(value) => handleInputChange('senderName', value)}
                  isRequired
                />
                <Input
                  label="Email Address"
                  placeholder="Enter your email"
                  type="email"
                  value={formData.senderEmail}
                  onValueChange={(value) => handleInputChange('senderEmail', value)}
                  isRequired
                />
                <Input
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  value={formData.senderPhone}
                  onValueChange={(value) => handleInputChange('senderPhone', value)}
                  isRequired
                />
                <Input
                  label="Postal Code"
                  placeholder="Enter postal code"
                  value={formData.senderPostalCode}
                  onValueChange={(value) => handleInputChange('senderPostalCode', value)}
                  isRequired
                />
              </div>

              <Input
                label="Address"
                placeholder="Enter your full address"
                value={formData.senderAddress}
                onValueChange={(value) => handleInputChange('senderAddress', value)}
                isRequired
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="City"
                  placeholder="Enter city"
                  value={formData.senderCity}
                  onValueChange={(value) => handleInputChange('senderCity', value)}
                  isRequired
                />
                <Input
                  label="Country"
                  placeholder="Enter country"
                  value={formData.senderCountry}
                  onValueChange={(value) => handleInputChange('senderCountry', value)}
                  isRequired
                />
              </div>
            </div>
          )}

          {/* Step 2: Recipient Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recipient Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  placeholder="Enter recipient's full name"
                  value={formData.recipientName}
                  onValueChange={(value) => handleInputChange('recipientName', value)}
                  isRequired
                />
                <Input
                  label="Email Address"
                  placeholder="Enter recipient's email"
                  type="email"
                  value={formData.recipientEmail}
                  onValueChange={(value) => handleInputChange('recipientEmail', value)}
                  isRequired
                />
                <Input
                  label="Phone Number"
                  placeholder="Enter recipient's phone number"
                  value={formData.recipientPhone}
                  onValueChange={(value) => handleInputChange('recipientPhone', value)}
                  isRequired
                />
                <Input
                  label="Postal Code"
                  placeholder="Enter postal code"
                  value={formData.recipientPostalCode}
                  onValueChange={(value) => handleInputChange('recipientPostalCode', value)}
                  isRequired
                />
              </div>

              <Input
                label="Address"
                placeholder="Enter recipient's full address"
                value={formData.recipientAddress}
                onValueChange={(value) => handleInputChange('recipientAddress', value)}
                isRequired
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="City"
                  placeholder="Enter city"
                  value={formData.recipientCity}
                  onValueChange={(value) => handleInputChange('recipientCity', value)}
                  isRequired
                />
                <Input
                  label="Country"
                  placeholder="Enter country"
                  value={formData.recipientCountry}
                  onValueChange={(value) => handleInputChange('recipientCountry', value)}
                  isRequired
                />
              </div>
            </div>
          )}

          {/* Step 3: Package Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Package Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Package Type"
                  placeholder="Select package type"
                  selectedKeys={[formData.packageType]}
                  onSelectionChange={(keys) => {
                    const value = Array.from(keys)[0] as PackageType
                    handleInputChange('packageType', value)
                  }}
                  isRequired
                >
                  {PACKAGE_TYPES.map((type: { value: string; label: string }) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  label="Weight (kg)"
                  placeholder="Enter weight"
                  type="number"
                  value={formData.weight.toString()}
                  onValueChange={(value) => handleInputChange('weight', parseFloat(value) || 0)}
                  isRequired
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  label="Length (cm)"
                  placeholder="Enter length"
                  type="number"
                  value={formData.length.toString()}
                  onValueChange={(value) => handleInputChange('length', parseFloat(value) || 0)}
                  isRequired
                />
                <Input
                  label="Width (cm)"
                  placeholder="Enter width"
                  type="number"
                  value={formData.width.toString()}
                  onValueChange={(value) => handleInputChange('width', parseFloat(value) || 0)}
                  isRequired
                />
                <Input
                  label="Height (cm)"
                  placeholder="Enter height"
                  type="number"
                  value={formData.height.toString()}
                  onValueChange={(value) => handleInputChange('height', parseFloat(value) || 0)}
                  isRequired
                />
              </div>

              <Textarea
                label="Package Description"
                placeholder="Describe what you're sending"
                value={formData.description}
                onValueChange={(value) => handleInputChange('description', value)}
                isRequired
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Declared Value"
                  placeholder="Enter package value"
                  type="number"
                  value={formData.value.toString()}
                  onValueChange={(value) => handleInputChange('value', parseFloat(value) || 0)}
                  isRequired
                />
                <Select
                  label="Currency"
                  placeholder="Select currency"
                  selectedKeys={[formData.currency]}
                  onSelectionChange={(keys) => {
                    const value = Array.from(keys)[0] as string
                    handleInputChange('currency', value)
                  }}
                  isRequired
                >
                  {CURRENCIES.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <Checkbox
                isSelected={formData.insuranceOptional}
                onValueChange={(checked) => handleInputChange('insuranceOptional', checked)}
              >
                Add insurance coverage (recommended for valuable items)
              </Checkbox>
            </div>
          )}

          {/* Step 4: Service Selection & Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose Shipping Service</h2>
              
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Spinner size="lg" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {rates.map((rate) => (
                    <ShippingServiceCard
                      key={rate.serviceType}
                      serviceType={rate.serviceType}
                      rate={rate}
                      selected={selectedService === rate.serviceType}
                      onSelect={setSelectedService}
                    />
                  ))}
                </div>
              )}

              {selectedService && (
                <Card className="bg-gray-50">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipment Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>From:</span>
                        <span>{formData.senderCity}, {formData.senderCountry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>To:</span>
                        <span>{formData.recipientCity}, {formData.recipientCountry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Package:</span>
                        <span>{formData.weight}kg - {formData.packageType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service:</span>
                        <span>{selectedService}</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Total Cost:</span>
                          <span>${rates.find(r => r.serviceType === selectedService)?.totalCost.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              )}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="bordered"
          onPress={handlePrevious}
          isDisabled={currentStep === 1}
          startContent={<ArrowLeft className="w-4 h-4" />}
        >
          Previous
        </Button>

        {currentStep < 4 ? (
          <Button
            className="bg-msc-yellow text-black hover:bg-msc-yellow/90"
            onPress={handleNext}
            isDisabled={!validateStep(currentStep)}
            endContent={<ArrowRight className="w-4 h-4" />}
          >
            Next Step
          </Button>
        ) : (
          <Button
            className="bg-msc-yellow text-black hover:bg-msc-yellow/90"
            onPress={handleSubmit}
            isDisabled={!selectedService}
            isLoading={isLoading}
          >
            Create Shipment
          </Button>
        )}
      </div>
    </div>
  )
}