"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Zap, Truck, Globe, MapPin } from "lucide-react"

const solutions = [
  {
    id: 1,
    icon: Zap,
    title: "Express Shipping",
    subLinks: ["24-Hour Delivery", "Same Day Service", "Priority Handling"],
    backgroundImage: "/express-shipping.png"
  },
  {
    id: 2,
    icon: Truck,
    title: "Standard Shipping",
    subLinks: ["Ground Transport", "Cost-Effective", "Reliable Delivery"],
    backgroundImage: "/Standard-Shipping.png"
  },
  {
    id: 3,
    icon: Globe,
    title: "International Shipping",
    subLinks: ["Air Freight", "Sea Freight", "Customs Clearance"],
    backgroundImage: "/International-Shipping.png"
  },
  {
    id: 4,
    icon: MapPin,
    title: "Track & Trace Solutions",
    subLinks: ["Real-Time Tracking", "SMS Notifications", "Delivery Updates"],
    backgroundImage: "/Track & Trace Solutions.png"
  }
]

export default function OurSolutionsSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  // Auto-rotate background images every 4 seconds
  useEffect(() => {
    if (hoveredCard === null) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % solutions.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [hoveredCard])

  const currentBackgroundImage = hoveredCard !== null 
    ? solutions.find(s => s.id === hoveredCard)?.backgroundImage || solutions[currentImageIndex].backgroundImage
    : solutions[currentImageIndex].backgroundImage

  return (
    <section className="relative w-full min-h-[600px] overflow-hidden">
      {/* Full-width Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentBackgroundImage}
          alt="Logistics Background"
          fill
          className="object-cover transition-all duration-1000 ease-in-out"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 py-16">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Solutions
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              As well as being a global leader in container shipping, we worldwide network of industry-specific 
              services means we can offer our customers a comprehensive international service. This ensures we 
              deliver fast and reliable transit times, and help you provide the best solutions for your needs.
            </p>
          </motion.div>

          {/* Solutions Grid - 4 Cards in a Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {solutions.map((solution, index) => {
              const Icon = solution.icon
              const isHovered = hoveredCard === solution.id
              
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredCard(solution.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group cursor-pointer"
                >
                  <Card 
                    className={`
                      relative h-80 bg-transparent border-2 border-white/20 backdrop-blur-sm
                      transition-all duration-300 ease-in-out
                      ${isHovered 
                        ? 'scale-105 border-[#D4AF37] bg-[#D4AF37]/10' 
                        : 'hover:scale-102 hover:border-white/40'
                      }
                    `}
                  >
                    <CardContent className="p-6 h-full flex flex-col justify-between text-center">
                      {/* Icon */}
                      <div className="flex flex-col items-center">
                        <div className={`
                          inline-flex items-center justify-center w-20 h-20 rounded-full mb-6
                          transition-all duration-300
                          ${isHovered ? 'bg-[#D4AF37] text-black' : 'bg-white/20 text-white'}
                        `}>
                          <Icon className="w-10 h-10" />
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-bold text-white mb-6">
                          {solution.title}
                        </h3>
                      </div>

                      {/* Sub-links */}
                      <div className={`
                        space-y-3 transition-all duration-300 ease-in-out
                        ${isHovered 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-70 translate-y-2'
                        }
                      `}>
                        {solution.subLinks.map((link, linkIndex) => (
                          <motion.div
                            key={linkIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 0 }}
                            transition={{ delay: linkIndex * 0.1 }}
                            className={`
                              text-sm transition-colors cursor-pointer
                              ${isHovered ? 'text-[#D4AF37] font-medium' : 'text-gray-200'}
                            `}
                          >
                            {link}
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* See All Solutions Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-[#D4AF37] text-black font-bold hover:bg-[#B8860B] transition-all duration-300 hover:scale-105 px-8 py-3"
            >
              <Link href="/solutions">
                See All Solutions
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}