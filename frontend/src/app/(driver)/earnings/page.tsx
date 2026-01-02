"use client"

import { Card } from "@nextui-org/react"
import { motion } from "framer-motion"

export default function EarningsPage() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-8"
        >
          Earnings & Performance
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {[
            { label: "This Month", value: "$2,450.00" },
            { label: "This Week", value: "$598.50" },
            { label: "Today", value: "$245.50" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-6">
                <p className="text-sm text-foreground-600 mb-2">{item.label}</p>
                <p className="text-3xl font-bold text-[#0066CC]">{item.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6 text-foreground">Earnings Trend</h2>
          <p className="text-foreground-600">7-day earnings chart and analytics will be displayed here</p>
        </Card>

        <Card className="p-6 md:p-8 mt-6">
          <h2 className="text-xl font-bold mb-6 text-foreground">Performance Metrics</h2>
          <div className="space-y-4">
            {[
              { label: "Deliveries Completed", value: "287", target: "250+" },
              { label: "Customer Rating", value: "4.8/5", target: "4.5+" },
              { label: "On-Time Rate", value: "96%", target: "95%+" },
            ].map((metric, idx) => (
              <div key={idx} className="flex justify-between items-center pb-4 border-b border-divider last:border-0">
                <div>
                  <p className="font-semibold text-foreground">{metric.label}</p>
                  <p className="text-sm text-foreground-600">Target: {metric.target}</p>
                </div>
                <p className="text-2xl font-bold text-[#0066CC]">{metric.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
