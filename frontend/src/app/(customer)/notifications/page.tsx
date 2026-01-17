"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"

export default function NotificationsPage() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-8"
        >
          Notification Settings
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <Card className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6 text-foreground">Email Notifications</h2>
            <div className="space-y-4">
              {[
                { label: "Shipment Picked Up", description: "Get notified when your package is picked up" },
                { label: "Shipment In Transit", description: "Updates when your package is on its way" },
                { label: "Delivery Attempted", description: "Notification when delivery is attempted" },
                { label: "Delivered", description: "Confirmation when package is delivered" },
                { label: "Delayed Shipment", description: "Alert if shipment is delayed" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between pb-4 border-b border-divider last:border-0"
                >
                  <div>
                    <p className="font-semibold text-foreground">{item.label}</p>
                    <p className="text-sm text-foreground-600">{item.description}</p>
                  </div>
                  <Checkbox defaultSelected />
                </motion.div>
              ))}
            </div>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6 text-foreground">SMS Notifications</h2>
            <div className="space-y-4">
              {[
                { label: "Critical Updates", description: "SMS for urgent delivery updates" },
                { label: "Delivery Time Window", description: "SMS with estimated delivery time" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between pb-4 border-b border-divider last:border-0"
                >
                  <div>
                    <p className="font-semibold text-foreground">{item.label}</p>
                    <p className="text-sm text-foreground-600">{item.description}</p>
                  </div>
                  <Checkbox defaultSelected />
                </motion.div>
              ))}
            </div>
          </Card>

          <div className="flex gap-4">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-[#0066CC]">
              Save Preferences
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
