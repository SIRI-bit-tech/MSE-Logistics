"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4 py-8 md:py-0">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-md">
        <Card className="p-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl">Track Your Shipment</CardTitle>
            <CardDescription className="text-sm md:text-base">
              Enter your tracking number to get real-time updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                placeholder="e.g., SS-2024-001234"
                className="text-sm md:text-base"
                aria-label="Enter tracking number"
              />
              <Button
                onClick={handleTrack}
                className="bg-[#D4AF37] hover:bg-[#B8860B] flex-shrink-0"
                size="icon"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
