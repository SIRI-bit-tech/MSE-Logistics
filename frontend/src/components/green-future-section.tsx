"use client"

import { Button } from "@nextui-org/react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function GreenFutureSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative py-20 px-4 overflow-hidden bg-gray-900"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/green-future-bg.jpg')`
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto text-center text-white">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-8"
        >
          Navigating Towards a Greener Future
        </motion.h2>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          We are committed to reducing our environmental footprint by 2030. Discover how we're 
          leading the industry towards sustainable shipping practices and cleaner oceans.
        </motion.p>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Button 
            as={Link}
            href="/sustainability"
            size="lg" 
            className="bg-msc-yellow hover:bg-msc-gold text-black font-bold px-8 py-3"
          >
            Our Sustainability Goals
          </Button>
          <Button 
            as={Link}
            href="/green-initiatives"
            size="lg" 
            variant="bordered" 
            className="text-white border-white hover:bg-white/10 font-semibold px-8 py-3"
          >
            Green Initiatives
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}