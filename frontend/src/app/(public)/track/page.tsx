"use client"

import { Button, Card, Input } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search } from "lucide-react"
import { motion } from "framer-motion"

export default function Track() {
  const router = useRouter()
  const [trackingNumber, setTrackingNumber] = useState("")

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      router.push(`/tracking/${trackingNumber}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4 py-8 md:py-0">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-md">
        <Card className="p-6 md:p-8">
          <h1 className="mb-2 text-center text-2xl md:text-3xl font-bold text-foreground">Track Your Shipment</h1>
          <p className="mb-8 text-center text-sm md:text-base text-foreground-600">
            Enter your tracking number to get real-time updates
          </p>

          <div className="flex gap-2">
            <Input
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleTrack()}
              placeholder="e.g., SS-2024-001234"
              size="lg"
              className="text-sm md:text-base"
            />
            <Button
              isIconOnly
              onClick={handleTrack}
              color="primary"
              className="bg-[#0066CC] flex-shrink-0"
              size="lg"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
