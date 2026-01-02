"use client"

import { motion } from "framer-motion"

const stats = [
  { label: "Countries", value: "200+" },
  { label: "Shipments Delivered", value: "10M+" },
  { label: "Uptime", value: "99.9%" },
  { label: "Customer Satisfaction", value: "98%" },
]

export default function StatsBanner() {
  return (
    <section className="w-full bg-gradient-to-r from-[#003873] to-[#0066CC] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#FFD700] mb-2">{stat.value}</div>
              <div className="text-gray-100 text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
