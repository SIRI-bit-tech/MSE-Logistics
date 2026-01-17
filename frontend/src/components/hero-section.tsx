"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { useState } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function HeroSection() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const router = useRouter()

  const handleTrack = () => {
    const trimmedValue = trackingNumber.trim()
    if (trimmedValue) {
      router.push(`/tracking/${encodeURIComponent(trimmedValue)}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTrack()
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen relative flex items-center justify-center text-white px-4 overflow-hidden"
    >
      {/* Background Image - Ocean with container ship */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero-ship.png'), url('https://unsplash.com/photos/blue-and-red-cargo-ship-on-sea-during-daytime-jOqJbvo1P9g')`
        }}
      />
      
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 text-left max-w-6xl mx-auto w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
              Connecting the World,<br />
              One Container at a Time
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
              Your trusted partner for global shipping and logistics solutions. 
              Fast, reliable, and secure container shipping worldwide.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 mb-8"
          >
            <Button 
              size="lg" 
              className="bg-[#FFD700] hover:bg-[#D4AF37] text-black font-bold px-8 py-3"
              asChild
            >
              <Link href="/user/register">Create Account</Link>
            </Button>
            <Button 
              size="lg" 
              className="bg-white/20 text-white border-2 border-white hover:bg-white hover:text-[#212529] font-semibold px-8 py-3 backdrop-blur-sm"
              onClick={() => {
                const trackingInput = document.getElementById('tracking-input') as HTMLInputElement
                trackingInput?.focus()
              }}
            >
              Track Shipment
            </Button>
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-2 max-w-md"
          >
            <Input
              id="tracking-input"
              placeholder="Enter tracking number..."
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-white text-gray-900 placeholder:text-gray-500"
              aria-label="Enter tracking number"
            />
            <Button 
              onClick={handleTrack}
              disabled={!trackingNumber.trim()}
              className="bg-[#FFD700] hover:bg-[#D4AF37] text-black px-6 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search size={18} className="mr-2" />
              Track
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
