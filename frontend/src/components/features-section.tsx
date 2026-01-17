"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"

const services = [
  {
    title: "Ocean Freight",
    description: "Reliable container shipping services connecting major ports worldwide with competitive rates and flexible scheduling.",
    image: "/ocean-freight-container.jpg",
    href: "/services/ocean-freight"
  },
  {
    title: "Intermodal Transport",
    description: "Seamless door-to-door logistics combining sea, rail, and road transport for maximum efficiency and cost savings.",
    image: "/intermodal-logistics.jpg",
    href: "/services/intermodal"
  },
  {
    title: "Warehousing & Storage",
    description: "Secure storage facilities and distribution centers strategically located near major ports and transportation hubs.",
    image: "/warehouse-facility.jpg",
    href: "/services/warehousing"
  },
  {
    title: "Supply Chain",
    description: "End-to-end supply chain management solutions designed to optimize your logistics operations and reduce costs.",
    image: "/supply-chain-network.jpg",
    href: "/services/supply-chain"
  }
]

export default function FeaturesSection() {
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Core Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive shipping and logistics solutions tailored to meet your business needs, 
            from small packages to large-scale industrial shipments.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href={service.href}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#FFD700] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
