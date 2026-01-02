"use client"

import { Card, CardBody } from "@nextui-org/react"
import { motion } from "framer-motion"

interface AdminStatsCardProps {
  title: string
  value: string
  icon: string
}

export default function AdminStatsCard({ title, value, icon }: AdminStatsCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }}>
      <Card className="bg-gradient-to-br from-[#003873] to-[#0066CC] text-white">
        <CardBody className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-200 text-sm">{title}</p>
              <p className="text-3xl font-bold mt-2">{value}</p>
            </div>
            <span className="text-4xl">{icon}</span>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}
