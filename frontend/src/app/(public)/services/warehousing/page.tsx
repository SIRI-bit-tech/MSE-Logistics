"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Warehouse, CheckCircle, Package, BarChart3, Shield, Clock, Zap, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function WarehousingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      <div className="relative h-[500px] w-full">
        <Image
          src="/warehousing-hero.jpg"
          alt="Warehousing & Storage Services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Warehouse className="w-14 h-14 text-[#D4AF37]" />
              <h1 className="text-5xl md:text-6xl font-bold">Warehousing & Storage</h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-100">
              State-of-the-art facilities with advanced inventory management and flexible storage solutions
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Overview with Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-4xl font-bold text-[#212529] mb-6">Strategic Warehousing Solutions</h2>
            <p className="text-lg text-[#6C757D] leading-relaxed mb-4">
              Our warehousing and distribution services provide secure, climate-controlled storage facilities strategically 
              located near major ports and transportation hubs. Whether you need short-term storage during transit or 
              long-term inventory management, our facilities are equipped with modern technology to handle your cargo efficiently.
            </p>
            <p className="text-lg text-[#6C757D] leading-relaxed">
              We offer comprehensive warehouse management services including receiving, inspection, inventory tracking, 
              order fulfillment, and distribution. Our advanced warehouse management system provides real-time visibility 
              into your inventory levels, movements, and order status, giving you complete control over your supply chain.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <Image
              src="/warehouse-facility.jpg"
              alt="Modern Warehouse Facility"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-[#212529] mb-8 text-center">Warehouse Capabilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MapPin, title: "Strategic Locations", description: "Facilities near major ports and transportation hubs for faster distribution" },
              { icon: Shield, title: "Secure Storage", description: "24/7 security monitoring, access control, and comprehensive insurance coverage" },
              { icon: BarChart3, title: "Real-Time Tracking", description: "Advanced WMS with live inventory visibility and automated reporting" },
              { icon: Zap, title: "Fast Fulfillment", description: "Same-day order processing and next-day shipping capabilities" }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-[#DEE2E6] hover:shadow-lg hover:scale-105 transition-all duration-300 h-full group">
                    <CardContent className="p-6">
                      <Icon className="w-12 h-12 text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-xl font-bold text-[#212529] mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">{feature.title}</h3>
                      <p className="text-[#6C757D]">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Services with Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-[#212529] mb-8 text-center">Our Warehousing Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-[#D4AF37] overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="relative h-[250px] overflow-hidden">
                  <Image
                    src="/warehouse-storage.jpg"
                    alt="Storage Solutions"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-8">
                  <Package className="w-12 h-12 text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold text-[#212529] mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">Storage Solutions</h3>
                  <p className="text-[#6C757D] mb-6">
                    Flexible storage options tailored to your cargo type and duration requirements, from short-term 
                    cross-docking to long-term inventory management.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Climate-controlled environments",
                      "Hazmat and special cargo handling",
                      "Pallet and bulk storage options",
                      "Bonded warehouse facilities"
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                        <span className="text-[#6C757D]">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-[#B8860B] overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="relative h-[250px] overflow-hidden">
                  <Image
                    src="/warehouse-inventory.jpg"
                    alt="Inventory Management"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-8">
                  <BarChart3 className="w-12 h-12 text-[#B8860B] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold text-[#212529] mb-4 group-hover:text-[#B8860B] transition-colors duration-300">Inventory Management</h3>
                  <p className="text-[#6C757D] mb-6">
                    Comprehensive inventory control with real-time tracking, automated reordering, and detailed 
                    reporting to optimize your stock levels.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Barcode and RFID tracking",
                      "Cycle counting and audits",
                      "Automated stock alerts",
                      "Custom reporting dashboards"
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                        <span className="text-[#6C757D]">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-[#D4AF37] overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="relative h-[250px] overflow-hidden">
                  <Image
                    src="/warehouse-fulfillment.jpg"
                    alt="Order Fulfillment"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-8">
                  <Zap className="w-12 h-12 text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold text-[#212529] mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">Order Fulfillment</h3>
                  <p className="text-[#6C757D] mb-6">
                    End-to-end order processing from pick and pack to shipping, with accuracy rates exceeding 99.9% 
                    and same-day dispatch capabilities.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Pick, pack, and ship services",
                      "Custom packaging and labeling",
                      "Returns processing",
                      "Multi-channel integration"
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                        <span className="text-[#6C757D]">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-[#B8860B] overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="relative h-[250px] overflow-hidden">
                  <Image
                    src="/warehouse-value-added.jpg"
                    alt="Value-Added Services"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-8">
                  <Clock className="w-12 h-12 text-[#B8860B] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold text-[#212529] mb-4 group-hover:text-[#B8860B] transition-colors duration-300">Value-Added Services</h3>
                  <p className="text-[#6C757D] mb-6">
                    Additional services to streamline your operations including kitting, assembly, quality inspection, 
                    and custom packaging solutions.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Product kitting and assembly",
                      "Quality control inspections",
                      "Repackaging and relabeling",
                      "Cross-docking services"
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                        <span className="text-[#6C757D]">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-[#343A40] rounded-2xl p-12 text-center text-white relative overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/warehouse-cta-bg.jpg"
              alt="Background"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Warehousing Solutions?</h2>
            <p className="text-xl mb-8 text-gray-300">
              Contact us to discuss your storage and distribution requirements
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg" className="bg-[#D4AF37] text-[#212529] hover:bg-[#B8860B] font-bold hover:scale-105 transition-all duration-300">
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
