"use client"

import { motion } from "framer-motion"
import { Beaker, Shield, AlertTriangle, Globe, Truck, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ChemicalsPetrochemicalsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full">
        <Image
          src="/industries/chemicals-petrochemicals.jpg"
          alt="Chemicals & Petrochemicals Industry"
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
              <Beaker className="w-12 h-12 text-[#D4AF37]" />
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Chemicals & Petrochemicals
              </h1>
            </div>
            <p className="text-xl text-gray-100 max-w-3xl">
              Safe, compliant transportation of hazardous and dangerous goods with specialized 
              handling procedures and robust safety protocols for the chemical industry.
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
                Specialized Hazardous Goods Transportation
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                MSE provides careful, precise and robust processes to safely transport hazardous 
                and dangerous goods, such as chemicals and petrochemicals. The chemical industry 
                requires the highest levels of safety, compliance, and specialized expertise.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our comprehensive approach ensures full regulatory compliance while maintaining 
                the integrity of your chemical products throughout the transportation process. 
                From basic chemicals to complex petrochemical compounds, we handle it all with precision.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/chemicals-petrochemicals.jpg"
                alt="Chemical Processing Plant"
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
            Specialized Chemical Transportation Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <AlertTriangle className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Hazardous Materials</h3>
              <p className="text-gray-700">
                Certified handling and transportation of dangerous goods with full IMDG 
                compliance and specialized safety protocols for all chemical classes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <Truck className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bulk Chemicals</h3>
              <p className="text-gray-700">
                Specialized tank containers and bulk handling facilities for liquid 
                chemicals, acids, and petrochemical products with contamination prevention.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <Shield className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Safety Compliance</h3>
              <p className="text-gray-700">
                Complete regulatory compliance with international safety standards, 
                documentation, and emergency response procedures for chemical transportation.
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
              Why Chemical Companies Trust MSE
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">IMDG Certified Operations</h4>
                    <p className="text-blue-100">
                      Full International Maritime Dangerous Goods Code compliance with 
                      certified dangerous goods specialists and proper documentation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Specialized Equipment</h4>
                    <p className="text-blue-100">
                      Modern tank containers, specialized packaging, and handling equipment 
                      designed for safe chemical transportation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Emergency Response</h4>
                    <p className="text-blue-100">
                      24/7 emergency response capabilities with trained personnel and 
                      immediate incident management protocols.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Global Chemical Network</h4>
                    <p className="text-blue-100">
                      Extensive network connecting major chemical production centers 
                      with global markets and processing facilities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Quality Assurance</h4>
                    <p className="text-blue-100">
                      Rigorous quality control procedures to prevent contamination 
                      and ensure product integrity throughout transportation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Regulatory Expertise</h4>
                    <p className="text-blue-100">
                      Deep knowledge of international chemical regulations, customs 
                      procedures, and safety requirements across all markets.
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
              Ready to Ship Your Chemical Products Safely?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Partner with MSE for safe, compliant chemical and petrochemical logistics. 
              Our specialized team ensures your hazardous goods reach their destination securely.
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