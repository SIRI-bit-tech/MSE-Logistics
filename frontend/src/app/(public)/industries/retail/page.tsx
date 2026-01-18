"use client"

import { motion } from "framer-motion"
import { ShoppingCart, Clock, Truck, Globe, Shield, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RetailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full">
        <Image
          src="/industries/retail.jpg"
          alt="Retail Industry"
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
              <ShoppingCart className="w-12 h-12 text-[#D4AF37]" />
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Retail
              </h1>
            </div>
            <p className="text-xl text-gray-100 max-w-3xl">
              Flexible, just-in-time logistics solutions for retail supply chains, 
              connecting global sourcing with consumer markets through efficient distribution networks.
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
                Just-in-Time Retail Logistics
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Retailers rely on efficient global product sourcing and a flexible and robust 
                'just-in-time' supply chain. We provide seamless port-to-port delivery solutions 
                that keep your shelves stocked and customers satisfied.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Mediterranean Shipping Express understands the fast-paced demands of retail logistics. 
                From seasonal merchandise to everyday essentials, we provide flexible, scalable 
                solutions that adapt to changing consumer demands and market trends.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/retail.jpg"
                alt="Retail Distribution Center"
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
            Specialized Retail Logistics Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <Clock className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Just-in-Time Delivery</h3>
              <p className="text-gray-700">
                Precise timing and coordination to support lean inventory management 
                and reduce carrying costs while ensuring product availability.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <Truck className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Seasonal Logistics</h3>
              <p className="text-gray-700">
                Flexible capacity and expedited services for seasonal merchandise, 
                holiday goods, and time-sensitive retail campaigns.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <Shield className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Global Sourcing</h3>
              <p className="text-gray-700">
                Comprehensive logistics support for global product sourcing, 
                connecting manufacturers worldwide with retail distribution centers.
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
              Why Retailers Choose MSE
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Flexible Capacity</h4>
                    <p className="text-blue-100">
                      Scalable shipping solutions that adapt to seasonal demand 
                      fluctuations and changing retail requirements.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Fast Transit Times</h4>
                    <p className="text-blue-100">
                      Optimized routing and priority handling to minimize lead times 
                      and support just-in-time inventory strategies.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Global Sourcing Network</h4>
                    <p className="text-blue-100">
                      Extensive network connecting major manufacturing regions 
                      with retail distribution centers worldwide.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Supply Chain Visibility</h4>
                    <p className="text-blue-100">
                      Real-time tracking and inventory visibility to support 
                      demand planning and inventory optimization.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Consolidation Services</h4>
                    <p className="text-blue-100">
                      Efficient consolidation of multiple suppliers' goods 
                      to reduce shipping costs and simplify logistics.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">E-commerce Support</h4>
                    <p className="text-blue-100">
                      Specialized solutions for e-commerce fulfillment and 
                      direct-to-consumer shipping requirements.
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
              Ready to Optimize Your Retail Supply Chain?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Partner with MSE for flexible, efficient retail logistics. Our global network 
              and just-in-time solutions keep your shelves stocked and customers happy.
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