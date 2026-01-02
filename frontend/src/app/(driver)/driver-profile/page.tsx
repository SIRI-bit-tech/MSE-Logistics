"use client"

import { Button, Card, Input, Textarea } from "@nextui-org/react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function DriverProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "James",
    lastName: "Driver",
    email: "james@example.com",
    phone: "+1 (555) 000-0000",
    licenseNumber: "DL123456",
    vehicle: "Toyota Camry - ABC 123",
    bio: "Professional delivery driver with 5 years experience",
  })

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-8"
        >
          Driver Profile
        </motion.h1>

        <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <Card className="p-6 md:p-8">
            <h2 className="text-lg font-bold mb-4 text-foreground">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Input
                label="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              <Input
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Input
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-lg font-bold mb-4 text-foreground">Driver Information</h2>
            <div className="space-y-4">
              <Input
                label="License Number"
                value={formData.licenseNumber}
                disabled
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
              />
              <Input
                label="Vehicle Details"
                value={formData.vehicle}
                onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
              />
              <Textarea
                label="Bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>
          </Card>

          <div className="flex gap-4">
            <Button variant="bordered">Cancel</Button>
            <Button color="primary" className="bg-[#0066CC]">
              Update Profile
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  )
}