"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Package, Clock, DollarSign } from "lucide-react"
import { motion } from "framer-motion"

export default function DriverDashboard() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-8"
        >
          Driver Dashboard
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[
            { icon: Package, label: "Active Deliveries", value: "12", color: "bg-blue-500" },
            { icon: Clock, label: "Hours Worked", value: "8.5h", color: "bg-green-500" },
            { icon: DollarSign, label: "Today's Earnings", value: "$245.50", color: "bg-yellow-500" },
            { icon: TrendingUp, label: "Completion Rate", value: "98%", color: "bg-purple-500" },
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`${stat.color} text-white rounded-lg p-3`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <Card className="p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6 text-foreground">Today's Routes</h2>
          <p className="text-foreground-600">Current active deliveries will appear here with route optimization</p>
        </Card>
      </div>
    </div>
  )
}
