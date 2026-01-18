"use client"

import { motion } from "framer-motion"
import { Package, Recycle, Clock, Globe, Shield, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PlasticsRubberPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full">
        <Image
          src="/industries/plastics-rubber.jpg"
          alt="Plastics & Rubber Industry"
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
              <Package className="w-12 h-12 text-[#D4AF37]" />
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Plastics & Rubber
              </h1>
            </div>
            <p className="text-xl text-gray-100 max-w-3xl">
              Comprehensive logistics solutions for plastic and rubber products, connecting 
              manufacturers with global markets through efficient and sustainable transportation.
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
                Essential Supply Chain Solutions
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Transportation to and from every major trade lane, plastic and rubber goods are 
                at the very centre of most modern global supply chains. These materials are 
                fundamental to countless industries and consumer products worldwide.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Mediterranean Shipping Express provides specialized logistics solutions for the 
                plastics and rubber industry, ensuring your products reach global markets efficiently 
                while maintaining quality and supporting sustainability initiatives.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/plastics-rubber.jpg"
                alt="Plastics Manufacturing"
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
            Specialized Plastics & Rubber Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <Package className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Raw Materials</h3>
              <p className="text-gray-700">
                Efficient transportation of plastic resins, rubber compounds, and chemical 
                feedstocks to manufacturing facilities worldwide.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <Recycle className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Finished Products</h3>
              <p className="text-gray-700">
                Comprehensive logistics for finished plastic and rubber products, from 
                consumer goods to industrial components and automotive parts.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <Clock className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sustainable Solutions</h3>
              <p className="text-gray-700">
                Supporting circular economy initiatives with specialized handling for 
                recycled materials and sustainable packaging solutions.
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
              Why Plastics & Rubber Companies Choose MSE
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Global Trade Lanes</h4>
                    <p className="text-blue-100">
                      Comprehensive coverage of all major plastic and rubber trade routes 
                      connecting production centers with consumer markets.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Quality Protection</h4>
                    <p className="text-blue-100">
                      Specialized handling procedures to protect plastic and rubber products 
                      from contamination and environmental damage.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Supply Chain Integration</h4>
                    <p className="text-blue-100">
                      Seamless integration with manufacturing processes and distribution 
                      networks for maximum efficiency.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Sustainability Focus</h4>
                    <p className="text-blue-100">
                      Supporting environmental initiatives with eco-friendly transportation 
                      options and recycling logistics.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Flexible Capacity</h4>
                    <p className="text-blue-100">
                      Adaptable shipping solutions to handle varying volumes and seasonal 
                      demand fluctuations in the plastics market.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Industry Expertise</h4>
                    <p className="text-blue-100">
                      Deep understanding of plastic and rubber industry requirements, 
                      regulations, and market dynamics.
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
              Ready to Optimize Your Plastics Supply Chain?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Partner with MSE for reliable, sustainable plastics and rubber logistics. 
              Our global network ensures your products reach every market efficiently.
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