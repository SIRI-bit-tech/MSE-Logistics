"use client"

import { Button, Card, Input, Textarea } from "@nextui-org/react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 (555) 000-0000",
    company: "Acme Corporation",
    bio: "International business owner",
  })

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-8"
        >
          My Profile
        </motion.h1>

        <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <Card className="p-6 md:p-8">
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
              <Input
                label="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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
