"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const shippingNeeds = [
  {
    title: "Agriculture",
    image: "/supply-chain-supplier.jpg",
    description: "With global sourcing an everyday reality, MSC connects the growers, farmers and producers of agricultural products around the world with their customers.",
    readMore: "/services/agriculture"
  },
  {
    title: "Fruit",
    image: "/warehouse-storage.jpg",
    description: "Whether you're shipping apples or avocados, our world-leading reefer fleet is equipped with the technology you need to keep your fruit in perfect condition.",
    readMore: "/services/fruit"
  },
  {
    title: "Pharmaceuticals",
    image: "/warehouse-value-added.jpg",
    description: "More and more pharmaceutical companies are turning to sea transport to deliver medicines and other essential goods quickly and safely to their destinations.",
    readMore: "/services/pharmaceuticals"
  },
  {
    title: "Car Parts",
    image: "/intermodal-logistics.jpg",
    description: "Whether you are shipping production or service parts, a reliable and experienced shipping partner is a vital link in your automotive supply chain.",
    readMore: "/services/car-parts"
  },
  {
    title: "Electronics",
    image: "/technology-innovation.jpg",
    description: "From smartphones to industrial equipment, we provide secure and reliable shipping solutions for all your electronic goods.",
    readMore: "/services/electronics"
  },
  {
    title: "Textiles",
    image: "/warehouse-fulfillment.jpg",
    description: "Our comprehensive textile shipping services connect fashion brands and manufacturers with global markets efficiently.",
    readMore: "/services/textiles"
  }
]

export default function ShippingNeedsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 4

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= shippingNeeds.length ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, shippingNeeds.length - itemsPerView) : prev - 1
    )
  }

  const visibleItems = shippingNeeds.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Your Shipping Needs Met</h2>
          <div className="w-16 h-1 bg-[#FFD700] mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            At MSC we pride ourselves on being a global container shipping company that delivers technical solutions designed to 
            meet the specific needs of each of our customers. Regardless of your cargo type, or final destination, we offer versatile 
            solutions that move as land, sea and sea.
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mt-4">
            Thanks to the extensive capacity of our container fleet, MSC is the trusted transportation partner and shipping 
            company for customers across the world over. Combining this with our global port coverage and extensive 
            equipment availability means we are able to deliver a professional, efficient shipping service, tailored to the specific 
            needs of your business.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleItems.map((item, index) => (
              <motion.div
                key={currentIndex + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      width={1000}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <Button
                      asChild
                      variant="link"
                      className="text-[#FFD700] hover:text-[#D4AF37] p-0 h-auto font-semibold"
                    >
                      <Link href={item.readMore}>
                        LEARN MORE ABOUT {item.title.toUpperCase()} →
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </Button>
          
          <Button
            onClick={nextSlide}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full"
            disabled={currentIndex + itemsPerView >= shippingNeeds.length}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </Button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(shippingNeeds.length / itemsPerView) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerView)}
              className={`w-3 h-3 rounded-full transition-colors ${
                Math.floor(currentIndex / itemsPerView) === index 
                  ? 'bg-[#FFD700]' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
