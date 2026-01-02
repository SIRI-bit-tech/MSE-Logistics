"use client"

import { motion } from "framer-motion"

interface DashboardHeaderProps {
  userName: string
}

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
      <h1 className="text-4xl font-bold text-[#003873]">Welcome back, {userName}! 👋</h1>
      <p className="text-gray-600 mt-2">Manage your shipments and track packages in real-time</p>
    </motion.div>
  )
}
