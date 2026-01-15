"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
}

export default function StatsCard({ title, value, icon: Icon, change, changeType = 'neutral' }: StatsCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600'
      case 'negative':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getChangeBackground = () => {
    switch (changeType) {
      case 'positive':
        return 'bg-green-50'
      case 'negative':
        return 'bg-red-50'
      default:
        return 'bg-gray-50'
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }}>
      <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-msc-yellow rounded-lg">
                  <Icon className="w-5 h-5 text-black" />
                </div>
                {change && (
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getChangeBackground()} ${getChangeColor()}`}>
                    {change}
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-600 uppercase tracking-wide font-medium mb-1">
                {title}
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {value}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
