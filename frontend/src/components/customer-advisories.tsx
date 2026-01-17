"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const advisories = [
  {
    date: "31/12/2026",
    category: "TRADE UPDATE",
    title: "Container Ship from China Sets Record for Fastest Transit Time",
    description: "New shipping route reduces delivery time by 30% for Asia-Europe trade",
    image: "/ocean-freight-container.jpg",
    readMore: "/news/fastest-transit-record",
    color: "warning"
  },
  {
    date: "24/12/2026",
    category: "SUSTAINABILITY",
    title: "The Future of Logistics: Sustainable Shipping Solutions",
    description: "How green technology is revolutionizing the maritime industry",
    image: "/sustainability-hero.jpg",
    readMore: "/news/sustainable-shipping",
    color: "success"
  },
  {
    date: "20/12/2026",
    category: "TECHNOLOGY",
    title: "Digital Transformation in Container Tracking",
    description: "New IoT sensors provide real-time cargo monitoring and temperature control",
    image: "/technology-innovation.jpg",
    readMore: "/news/digital-transformation",
    color: "primary"
  }
]

export default function CustomerAdvisories() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 3

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 1 >= advisories.length - itemsPerView + 1 ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? advisories.length - itemsPerView : prev - 1
    )
  }

  const visibleItems = advisories.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Latest News</h2>
          <Button
            asChild
            variant="link"
            className="text-[#FFD700] hover:text-[#D4AF37] font-semibold"
          >
            <Link href="/news">
              View All News →
            </Link>
          </Button>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="flex gap-4 overflow-hidden">
            {visibleItems.map((advisory, index) => (
              <motion.div
                key={currentIndex + index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-80"
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={advisory.image} 
                      alt={advisory.title}
                      width={800}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                    <Badge 
                      className={`absolute top-4 left-4 ${
                        advisory.color === 'warning' ? 'bg-yellow-500 text-white' :
                        advisory.color === 'primary' ? 'bg-blue-500 text-white' :
                        advisory.color === 'secondary' ? 'bg-gray-500 text-white' :
                        advisory.color === 'success' ? 'bg-green-500 text-white' :
                        'bg-gray-500 text-white'
                      }`}
                    >
                      {advisory.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="text-sm text-gray-500 mb-2">{advisory.date}</div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 leading-tight">
                      {advisory.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {advisory.description}
                    </p>
                    <Button
                      asChild
                      variant="link"
                      className="text-[#FFD700] hover:text-[#D4AF37] p-0 h-auto font-semibold"
                    >
                      <Link href={advisory.readMore}>
                        READ FULL ARTICLE →
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <Button
            onClick={prevSlide}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </Button>
          
          <Button
            onClick={nextSlide}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </Button>
        </div>
      </div>
    </section>
  )
}
