"use client"

import type React from "react"

import { Button, Card, Divider, Input, Select, SelectItem, Textarea } from "@heroui/react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function NewShipmentPage() {
  const [formData, setFormData] = useState({
    senderName: "",
    senderAddress: "",
    senderPhone: "",
    recipientName: "",
    recipientAddress: "",
    recipientPhone: "",
    weight: "",
    dimensions: "",
    serviceType: "EXPRESS",
    transportMode: "AIR",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Shipment created:", formData)
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-8"
        >
          Create New Shipment
        </motion.h1>

        <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-8">
          {/* Sender Information */}
          <Card className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6 text-foreground">Sender Information</h2>
            <div className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Your name"
                value={formData.senderName}
                onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                isRequired
              />
              <Textarea
                label="Address"
                placeholder="Complete shipping address"
                value={formData.senderAddress}
                onChange={(e) => setFormData({ ...formData, senderAddress: e.target.value })}
                isRequired
              />
              <Input
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
                value={formData.senderPhone}
                onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
                isRequired
              />
            </div>
          </Card>

          <Divider />

          {/* Recipient Information */}
          <Card className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6 text-foreground">Recipient Information</h2>
            <div className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Recipient name"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                isRequired
              />
              <Textarea
                label="Address"
                placeholder="Complete delivery address"
                value={formData.recipientAddress}
                onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
                isRequired
              />
              <Input
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
                value={formData.recipientPhone}
                onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
                isRequired
              />
            </div>
          </Card>

          <Divider />

          {/* Package Details */}
          <Card className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6 text-foreground">Package Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Weight (kg)"
                  type="number"
                  placeholder="0.00"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  isRequired
                />
                <Input
                  label="Dimensions (L x W x H cm)"
                  placeholder="30 x 20 x 15"
                  value={formData.dimensions}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                />
              </div>
              <Textarea
                label="Package Description"
                placeholder="Describe what you're shipping"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Service Type"
                  selectedKeys={[formData.serviceType]}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                >
                  <SelectItem key="EXPRESS" value="EXPRESS">
                    Express (2-3 days)
                  </SelectItem>
                  <SelectItem key="STANDARD" value="STANDARD">
                    Standard (5-7 days)
                  </SelectItem>
                  <SelectItem key="ECONOMY" value="ECONOMY">
                    Economy (10-14 days)
                  </SelectItem>
                </Select>
                <Select
                  label="Transport Mode"
                  selectedKeys={[formData.transportMode]}
                  onChange={(e) => setFormData({ ...formData, transportMode: e.target.value })}
                >
                  <SelectItem key="AIR" value="AIR">
                    Air
                  </SelectItem>
                  <SelectItem key="LAND" value="LAND">
                    Land
                  </SelectItem>
                  <SelectItem key="WATER" value="WATER">
                    Water
                  </SelectItem>
                  <SelectItem key="MULTIMODAL" value="MULTIMODAL">
                    Multimodal
                  </SelectItem>
                </Select>
              </div>
            </div>
          </Card>

          <div className="flex gap-4 justify-end">
            <Button variant="bordered" type="reset">
              Clear
            </Button>
            <Button color="primary" type="submit" className="bg-[#0066CC]">
              Calculate Price & Continue
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  )
}
