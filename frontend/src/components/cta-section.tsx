"use client"

import { Button } from "@nextui-org/react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function CTASection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 px-4 bg-white"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-gray-800"
        >
          Ready to Ship with Us?
        </motion.h2>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl mb-8 text-gray-600 leading-relaxed"
        >
          Get started today and experience the difference of working with a trusted global shipping partner. 
          Our team is ready to help you find the perfect logistics solution for your business.
        </motion.p>
        
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Button 
            as={Link}
            href="/quote"
            size="lg" 
            className="bg-msc-yellow hover:bg-msc-gold text-black font-bold px-8 py-3"
          >
            Get Quote
          </Button>
          <Button 
            as={Link}
            href="/contact"
            size="lg" 
            variant="bordered" 
            className="border-gray-400 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-3"
          >
            Contact Us
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}