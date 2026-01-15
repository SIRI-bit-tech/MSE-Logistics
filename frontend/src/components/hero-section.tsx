"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { useState } from "react"
import { Search } from "lucide-react"

export default function HeroSection() {
  const [trackingNumber, setTrackingNumber] = useState("")

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
            >
              Get Quote
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white hover:bg-white/10 font-semibold px-8 py-3"
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
              placeholder="Enter tracking number..."
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1 bg-white text-gray-700"
              aria-label="Enter tracking number"
            />
            <Button 
              className="bg-[#FFD700] hover:bg-[#D4AF37] text-black px-6 font-semibold"
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
