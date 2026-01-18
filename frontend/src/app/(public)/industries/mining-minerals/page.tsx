"use client"

import { motion } from "framer-motion"
import { Mountain, Truck, Clock, Globe, Shield, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function MiningMineralsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full">
        <Image
          src="/industries/mining-minerals.jpg"
          alt="Mining & Minerals Industry"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <Mountain className="w-12 h-12 text-[#D4AF37]" />
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Mining & Minerals
              </h1>
            </div>
            <p className="text-xl text-gray-100 max-w-3xl">
              Connecting mineral extraction industries with global markets through reliable, 
              efficient transport solutions for bulk commodities and specialized mining equipment.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Global Minerals Transportation
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                For decades MSE has been successfully connecting the minerals extraction industries 
                with customer markets around the world - offering fast, reliable transport solutions. 
                The mining industry requires specialized handling and logistics expertise.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                From bulk commodities to precious metals, from mining equipment to processed materials, 
                we understand the unique challenges of mineral transportation and provide tailored 
                solutions that ensure your valuable cargo reaches its destination safely and efficiently.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/mining-minerals.jpg"
                alt="Mining Operations"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Key Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Specialized Mining & Minerals Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <Truck className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bulk Commodities</h3>
              <p className="text-gray-700">
                Efficient transportation of bulk minerals including iron ore, coal, copper, 
                and other raw materials to processing facilities and markets worldwide.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <Shield className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Precious Metals</h3>
              <p className="text-gray-700">
                Secure, high-security transportation for precious metals and valuable minerals 
                with specialized handling and insurance coverage.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <Clock className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mining Equipment</h3>
              <p className="text-gray-700">
                Heavy-lift capabilities for mining machinery and equipment. Specialized 
                handling for oversized and overweight mining components.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-[#003873] to-[#0056b3] text-white rounded-lg p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Why Mining Companies Trust MSE
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Heavy-Lift Expertise</h4>
                    <p className="text-blue-100">
                      Specialized equipment and expertise for handling oversized mining 
                      machinery and heavy industrial components.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Bulk Handling Facilities</h4>
                    <p className="text-blue-100">
                      Modern bulk handling terminals and equipment for efficient loading 
                      and unloading of mineral commodities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Security Protocols</h4>
                    <p className="text-blue-100">
                      Enhanced security measures for valuable minerals and precious metals 
                      throughout the transportation process.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Global Mining Network</h4>
                    <p className="text-blue-100">
                      Extensive network connecting major mining regions with processing 
                      centers and end markets worldwide.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Environmental Compliance</h4>
                    <p className="text-blue-100">
                      Full compliance with environmental regulations for mineral 
                      transportation and handling procedures.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Market Expertise</h4>
                    <p className="text-blue-100">
                      Deep understanding of global commodity markets and trade flows 
                      to optimize your supply chain efficiency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white rounded-lg shadow-lg p-12 border">
            <Globe className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Ship Your Minerals Globally?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Partner with MSE for reliable, secure mining and minerals logistics. Our specialized 
              team has decades of experience in the mining industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#D4AF37] text-black font-bold hover:bg-[#B8860B]"
              >
                <Link href="/contact">Get a Quote</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
              >
                <Link href="/auth/signup">Create Account</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}