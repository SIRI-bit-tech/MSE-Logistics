"use client"

import { Button, Card, Input, Select, SelectItem } from "@nextui-org/react"
import { useState } from "react"

export default function Pricing() {
  const [formData, setFormData] = useState({
    weight: "",
    distance: "",
    transportMode: "LAND",
    serviceType: "STANDARD",
  })
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null)

  const handleCalculate = () => {
    // Mock pricing calculation
    const basePrice = 15
    const weight = Number.parseFloat(formData.weight) || 0
    const distance = Number.parseFloat(formData.distance) || 0

    let multiplier = 1
    if (formData.transportMode === "AIR") multiplier = 2.5
    if (formData.transportMode === "WATER") multiplier = 0.6
    if (formData.transportMode === "MULTIMODAL") multiplier = 1.8

    if (formData.serviceType === "EXPRESS") multiplier *= 1.5
    if (formData.serviceType === "OVERNIGHT") multiplier *= 3

    const price = (basePrice + weight * 0.5 + distance * 0.01) * multiplier
    setEstimatedPrice(Math.round(price * 100) / 100)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-4xl font-bold text-foreground">Pricing Calculator</h1>
        <p className="mb-12 text-lg text-foreground-600">Get an instant estimate for your shipment</p>

        <Card className="p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Package Weight (kg)"
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              placeholder="Enter weight"
            />
            <Input
              label="Distance (km)"
              type="number"
              value={formData.distance}
              onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
              placeholder="Enter distance"
            />
            <Select
              label="Transport Mode"
              value={formData.transportMode}
              onChange={(e) => setFormData({ ...formData, transportMode: e.target.value })}
            >
              <SelectItem key="AIR" value="AIR">
                Air Freight
              </SelectItem>
              <SelectItem key="LAND" value="LAND">
                Land Transport
              </SelectItem>
              <SelectItem key="WATER" value="WATER">
                Sea Freight
              </SelectItem>
              <SelectItem key="MULTIMODAL" value="MULTIMODAL">
                Multimodal
              </SelectItem>
            </Select>
            <Select
              label="Service Type"
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
            >
              <SelectItem key="STANDARD" value="STANDARD">
                Standard (5-7 days)
              </SelectItem>
              <SelectItem key="EXPRESS" value="EXPRESS">
                Express (2-3 days)
              </SelectItem>
              <SelectItem key="OVERNIGHT" value="OVERNIGHT">
                Overnight
              </SelectItem>
            </Select>
          </div>

          <Button onClick={handleCalculate} color="primary" className="mt-6 w-full bg-[#0066CC]" size="lg">
            Calculate Price
          </Button>

          {estimatedPrice !== null && (
            <div className="mt-8 rounded-lg bg-blue-50 p-6 dark:bg-blue-950">
              <p className="text-sm text-foreground-600">Estimated Price</p>
              <p className="text-3xl font-bold text-[#0066CC]">${estimatedPrice}</p>
              <p className="mt-2 text-sm text-foreground-600">
                This is an estimate. Final price may vary based on actual dimensions and content.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
