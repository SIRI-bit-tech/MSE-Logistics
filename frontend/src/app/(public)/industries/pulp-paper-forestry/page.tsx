"use client"

import { motion } from "framer-motion"
import { TreePine, Package2, Truck, Globe, Shield, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PulpPaperForestryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full">
        <Image
          src="/industries/pulp-paper-forestry.jpg"
          alt="Pulp, Paper & Forestry Industry"
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
              <TreePine className="w-12 h-12 text-[#D4AF37]" />
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Pulp, Paper & Forestry
              </h1>
            </div>
            <p className="text-xl text-gray-100 max-w-3xl">
              Comprehensive logistics solutions for forest products, from raw materials 
              to finished paper goods, supporting sustainable forestry and manufacturing worldwide.
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
                Complete Forest Products Supply Chain
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Using our knowledge in transportation and logistics we can provide versatile 
                solutions for your pulp, paper and forest products. Our expertise covers the 
                full supply chain from forest to final consumer markets.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Mediterranean Shipping Express understands the unique requirements of the forestry 
                industry, from handling raw timber and wood chips to transporting finished paper 
                products and packaging materials to global markets with care and efficiency.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/pulp-paper-forestry.jpg"
                alt="Paper Mill Operations"
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
            Specialized Forestry & Paper Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <TreePine className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Raw Materials</h3>
              <p className="text-gray-700">
                Efficient transportation of logs, wood chips, pulp, and other raw forestry 
                materials from production sites to processing facilities worldwide.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <Package2 className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Finished Products</h3>
              <p className="text-gray-700">
                Comprehensive logistics for paper products, packaging materials, and 
                value-added forest products to global consumer and industrial markets.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <Truck className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bulk Handling</h3>
              <p className="text-gray-700">
                Specialized equipment and facilities for handling bulk forest products 
                with moisture protection and contamination prevention measures.
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
              Why Forestry Companies Choose MSE
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Sustainable Practices</h4>
                    <p className="text-blue-100">
                      Supporting sustainable forestry initiatives with eco-friendly 
                      transportation solutions and carbon footprint reduction programs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Moisture Protection</h4>
                    <p className="text-blue-100">
                      Specialized containers and handling procedures to protect forest 
                      products from moisture damage during transportation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Global Forest Network</h4>
                    <p className="text-blue-100">
                      Extensive network connecting major forestry regions with 
                      processing centers and consumer markets worldwide.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Supply Chain Expertise</h4>
                    <p className="text-blue-100">
                      Deep understanding of forestry supply chains from raw material 
                      sourcing to finished product distribution.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Bulk Handling Capabilities</h4>
                    <p className="text-blue-100">
                      Specialized terminals and equipment for efficient handling 
                      of bulk forest products and raw materials.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Quality Preservation</h4>
                    <p className="text-blue-100">
                      Careful handling procedures to maintain product quality and 
                      prevent contamination throughout the transportation process.
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
              Ready to Ship Your Forest Products Globally?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Partner with MSE for sustainable, efficient forestry and paper logistics. 
              Our expertise covers the complete forest products supply chain.
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