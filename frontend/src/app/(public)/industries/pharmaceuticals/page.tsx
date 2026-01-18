"use client"

import { motion } from "framer-motion"
import { Pill, Shield, Clock, Globe, Thermometer, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PharmaceuticalsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full">
        <Image
          src="/industries/pharmaceuticals.jpg"
          alt="Pharmaceuticals Industry"
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
              <Pill className="w-12 h-12 text-[#D4AF37]" />
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Pharmaceuticals
              </h1>
            </div>
            <p className="text-xl text-gray-100 max-w-3xl">
              Delivering life-saving medicines and medical supplies with the highest standards of safety, 
              security, and temperature control across global supply chains.
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
                Critical Healthcare Logistics
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The pharmaceutical industry demands the highest levels of precision, security, and reliability. 
                More and more pharmaceutical companies are turning to sea transport to deliver medicines and 
                other essential goods quickly and safely to the markets that need them most.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Mediterranean Shipping Express understands the critical nature of pharmaceutical logistics. 
                We provide specialized solutions that ensure your life-saving products reach their destination 
                with complete integrity, maintaining the cold chain and regulatory compliance every step of the way.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/industries/pharmaceutical-warehouse.jpg"
                alt="Pharmaceutical Warehouse"
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
            Specialized Pharmaceutical Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <Thermometer className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cold Chain Management</h3>
              <p className="text-gray-700">
                Temperature-controlled shipping solutions for vaccines, biologics, and temperature-sensitive 
                medications. Real-time monitoring ensures product integrity throughout the journey.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <Shield className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Regulatory Compliance</h3>
              <p className="text-gray-700">
                Full compliance with FDA, EMA, and other international pharmaceutical regulations. 
                Complete documentation and chain of custody tracking for all shipments.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <Clock className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Time-Critical Delivery</h3>
              <p className="text-gray-700">
                Express shipping options for urgent medical supplies and emergency medications. 
                Priority handling ensures life-saving treatments reach patients when needed.
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
              Why Pharmaceutical Companies Trust MSE
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">GDP Certified Facilities</h4>
                    <p className="text-blue-100">
                      All our pharmaceutical handling facilities are Good Distribution Practice (GDP) certified, 
                      ensuring the highest standards of quality and safety.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">24/7 Monitoring</h4>
                    <p className="text-blue-100">
                      Real-time temperature and humidity monitoring with immediate alerts for any deviations 
                      from specified parameters.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Secure Chain of Custody</h4>
                    <p className="text-blue-100">
                      Complete traceability and security protocols to prevent counterfeiting and ensure 
                      product authenticity throughout the supply chain.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Global Network</h4>
                    <p className="text-blue-100">
                      Extensive worldwide network enabling efficient distribution to emerging markets 
                      and established pharmaceutical hubs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Specialized Packaging</h4>
                    <p className="text-blue-100">
                      Custom packaging solutions for different pharmaceutical products, from bulk APIs 
                      to finished dosage forms.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Emergency Response</h4>
                    <p className="text-blue-100">
                      Rapid response capabilities for humanitarian aid, disaster relief, and emergency 
                      medical supply distribution.
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
              Ready to Ship Your Pharmaceutical Products?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Partner with MSE for reliable, compliant, and secure pharmaceutical logistics. 
              Our specialized team is ready to handle your most critical shipments.
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