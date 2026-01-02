"use client"

import { Card } from "@nextui-org/react"
import { TrendingUp, Package, DollarSign, Users } from "lucide-react"
import { motion } from "framer-motion"

export default function AdminAnalyticsPage() {
  const stats = [
    { icon: Package, label: "Total Shipments", value: "24,567", change: "+12%" },
    { icon: DollarSign, label: "Total Revenue", value: "$1.2M", change: "+8.5%" },
    { icon: Users, label: "Active Users", value: "3,456", change: "+15%" },
    { icon: TrendingUp, label: "Avg Rating", value: "4.7/5", change: "+2%" },
  ]

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Analytics & Reports</h1>
          <p className="text-foreground-600">Platform-wide analytics and performance metrics</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="w-8 h-8 text-[#0066CC]" />
                    <span className="text-sm text-green-600 font-semibold">{stat.change}</span>
                  </div>
                  <p className="text-sm text-foreground-600 mb-2">{stat.label}</p>
                  <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <Card className="p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold mb-6 text-foreground">Monthly Trends</h2>
          <div className="h-64 bg-gray-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
            <p className="text-foreground-600">Chart component will display here</p>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 md:p-8">
            <h2 className="text-lg font-bold mb-4 text-foreground">Top Routes</h2>
            <div className="space-y-3">
              {[
                { route: "NYC to Boston", count: 1234 },
                { route: "LA to San Francisco", count: 987 },
                { route: "Chicago to Detroit", count: 876 },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center pb-3 border-b border-divider last:border-0">
                  <span className="text-foreground">{item.route}</span>
                  <span className="font-bold text-[#0066CC]">{item.count}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-lg font-bold mb-4 text-foreground">Service Breakdown</h2>
            <div className="space-y-3">
              {[
                { service: "Express", percent: 35 },
                { service: "Standard", percent: 45 },
                { service: "Economy", percent: 20 },
              ].map((item, idx) => (
                <div key={idx} className="pb-3 border-b border-divider last:border-0">
                  <div className="flex justify-between mb-2">
                    <span className="text-foreground">{item.service}</span>
                    <span className="font-bold">{item.percent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#0066CC] h-2 rounded-full" style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
