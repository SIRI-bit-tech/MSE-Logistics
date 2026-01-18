"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const industries = [
  {
    id: "pharmaceuticals",
    title: "Pharmaceuticals",
    description: "More and more pharmaceutical companies are turning to sea transport to deliver medicines and other essential goods quickly and safely to the markets that need them most.",
    image: "/industries/pharmaceuticals.jpg",
    slug: "pharmaceuticals"
  },
  {
    id: "automotive",
    title: "Car Parts",
    description: "Whether you are shipping production or service parts, a reliable and experienced shipping partner is a vital link in your premium vehicle supply chain.",
    image: "/industries/car-parts.jpg",
    slug: "automotive"
  },
  {
    id: "mining",
    title: "Mining & Minerals",
    description: "For decades MSC has been successfully connecting the minerals extraction industries with customer markets around the world - offering fast, reliable transport solutions.",
    image: "/industries/mining-minerals.jpg",
    slug: "mining-minerals"
  },
  {
    id: "plastics",
    title: "Plastics & Rubber Products",
    description: "Transportation to and from every major trade lane, plastic and rubber goods are at the very centre of most modern global supply chains.",
    image: "/industries/plastics-rubber.jpg",
    slug: "plastics-rubber"
  },
  {
    id: "chemicals",
    title: "Chemicals & Petrochemicals",
    description: "MSC provides careful, precise and robust processes to safely transport hazardous and dangerous goods, such as chemicals and petrochemicals.",
    image: "/industries/chemicals-petrochemicals.jpg",
    slug: "chemicals-petrochemicals"
  },
  {
    id: "food",
    title: "Food & Beverages",
    description: "Thanks to a dedicated approach servicing the food and beverage industries, MSC understands the unique needs of the sector, including the cold chain.",
    image: "/industries/food-beverages.jpg",
    slug: "food-beverages"
  },
  {
    id: "forestry",
    title: "Pulp, Paper & Forestry Products",
    description: "Using our knowledge in transportation and logistics we can provide versatile solutions for your pulp, paper and forest products. Our expertise covers the full supply chain.",
    image: "/industries/pulp-paper-forestry.jpg",
    slug: "pulp-paper-forestry"
  },
  {
    id: "retail",
    title: "Retail",
    description: "Retailers rely on efficient global product sourcing and a flexible and robust 'just-in-time' supply chain. We provide seamless port-to-port delivery solutions.",
    image: "/industries/retail.jpg",
    slug: "retail"
  }
]

export default function IndustriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 4

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= industries.length ? 0 : prev + itemsPerView
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, industries.length - itemsPerView) : Math.max(0, prev - itemsPerView)
    )
  }

  const visibleIndustries = industries.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Industries We Serve</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Specialized logistics solutions for diverse industries, ensuring your cargo reaches its destination 
            safely and on time, regardless of complexity or special requirements.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#D4AF37] group"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#D4AF37] group"
            disabled={currentIndex + itemsPerView >= industries.length}
          >
            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-white" />
          </button>

          {/* Cards Container */}
          <div className="mx-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {visibleIndustries.map((industry, index) => (
                  <motion.div
                    key={industry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={industry.image}
                        alt={industry.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#D4AF37] transition-colors">
                        {industry.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                        {industry.description}
                      </p>
                      
                      {/* Read More Button */}
                      <Button
                        asChild
                        variant="ghost"
                        className="text-[#D4AF37] hover:text-[#B8860B] hover:bg-[#D4AF37]/10 p-0 h-auto font-semibold group/btn"
                      >
                        <Link href={`/industries/${industry.slug}`} className="flex items-center gap-2">
                          READ MORE
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(industries.length / itemsPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerView)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / itemsPerView) === index
                    ? 'bg-[#D4AF37] w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}