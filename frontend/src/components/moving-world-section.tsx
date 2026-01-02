"use client"

import { motion } from "framer-motion"

export default function MovingWorldSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16 px-4 bg-msc-yellow"
    >
      <div className="max-w-7xl mx-auto">
        {/* Statistics */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-4xl md:text-6xl font-bold text-black mb-2">520+</div>
            <div className="text-sm md:text-base text-gray-800 font-medium">Routes Worldwide</div>
          </div>
          <div>
            <div className="text-4xl md:text-6xl font-bold text-black mb-2">730</div>
            <div className="text-sm md:text-base text-gray-800 font-medium">Vessels</div>
          </div>
          <div>
            <div className="text-4xl md:text-6xl font-bold text-black mb-2">155</div>
            <div className="text-sm md:text-base text-gray-800 font-medium">Countries Served</div>
          </div>
          <div>
            <div className="text-4xl md:text-6xl font-bold text-black mb-2">24/7</div>
            <div className="text-sm md:text-base text-gray-800 font-medium">Customer Support</div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}