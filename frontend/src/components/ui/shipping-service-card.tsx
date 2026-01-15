"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Crown, Truck, Plane } from "lucide-react"

type ServiceType = "EXPRESS" | "STANDARD" | "ECONOMY"

interface ShippingRate {
  serviceType: ServiceType
  baseRate: number
  fuelSurcharge: number
  insurance: number
  totalCost: number
  deliveryDays: number
  description: string
}

interface ShippingServiceCardProps {
  serviceType: ServiceType
  rate: ShippingRate
  selected: boolean
  onSelect: (serviceType: ServiceType) => void
}

const serviceIcons = {
  EXPRESS: Crown,
  STANDARD: Truck,
  ECONOMY: Plane,
}

const serviceColors = {
  EXPRESS: 'border-[#FFD700] bg-[#FFD700]/5',
  STANDARD: 'border-gray-300 bg-white',
  ECONOMY: 'border-gray-300 bg-white',
}

export default function ShippingServiceCard({ 
  serviceType, 
  rate, 
  selected, 
  onSelect 
}: ShippingServiceCardProps) {
  const Icon = serviceIcons[serviceType]
  
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        selected ? serviceColors.EXPRESS : serviceColors[serviceType]
      }`}
      onClick={() => onSelect(serviceType)}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className={`p-3 rounded-full mb-4 ${
            selected ? 'bg-[#FFD700]' : 'bg-gray-100'
          }`}>
            <Icon className={`w-6 h-6 ${
              selected ? 'text-black' : 'text-gray-600'
            }`} />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {serviceType.charAt(0) + serviceType.slice(1).toLowerCase()}
          </h3>
          
          <p className="text-sm text-gray-500 mb-4">
            ARRIVES IN {rate.deliveryDays} DAYS
          </p>
          
          <div className="text-2xl font-bold text-gray-900">
            ${rate.totalCost.toFixed(2)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
