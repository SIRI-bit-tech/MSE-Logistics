"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Newspaper } from "lucide-react"

export default function AdminHeader() {
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-[#003873]">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage all shipments, drivers, and platform operations</p>
        </div>
        <Link href="/admin/news">
          <Button variant="outline" className="flex items-center gap-2">
            <Newspaper className="w-4 h-4" />
            News Management
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}
