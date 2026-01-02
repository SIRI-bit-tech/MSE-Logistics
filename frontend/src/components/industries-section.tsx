"use client"

import { motion } from "framer-motion"
import { Factory, Truck, Zap, Shirt, Apple, Pill } from "lucide-react"

const industries = [
  { icon: Factory, title: "Manufacturing", description: "Industrial equipment and machinery" },
  { icon: Truck, title: "Automotive", description: "Vehicle parts and components" },
  { icon: Zap, title: "Electronics", description: "Consumer and industrial electronics" },
  { icon: Shirt, title: "Fashion", description: "Textiles and apparel" },
  { icon: Apple, title: "Food & Beverage", description: "Perishable and packaged goods" },
  { icon: Pill, title: "Pharmaceuticals", description: "Medical supplies and drugs" }
]

export default function IndustriesSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon
            return (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center group cursor-pointer"
              >
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:bg-msc-yellow">
                  <IconComponent className="w-10 h-10 text-gray-600 group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-msc-yellow transition-colors">
                  {industry.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {industry.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}