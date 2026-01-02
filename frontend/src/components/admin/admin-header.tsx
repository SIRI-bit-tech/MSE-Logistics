"use client"

import { motion } from "framer-motion"

export default function AdminHeader() {
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
      <h1 className="text-4xl font-bold text-[#003873]">Admin Dashboard</h1>
      <p className="text-gray-600 mt-2">Manage all shipments, drivers, and platform operations</p>
    </motion.div>
  )
}
