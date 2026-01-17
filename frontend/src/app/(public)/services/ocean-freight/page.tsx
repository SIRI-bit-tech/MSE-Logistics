"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Ship, CheckCircle, Globe, Shield, Clock, DollarSign } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function OceanFreightPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      <div className="relative h-[500px] w-full">
        <Image
          src="/ocean-freight-hero.jpg"
          alt="Ocean Freight Services"
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
              <Ship className="w-14 h-14 text-[#D4AF37]" />
              <h1 className="text-5xl md:text-6xl font-bold">Ocean Freight Services</h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-100">
              Reliable container shipping connecting major ports worldwide with competitive rates and flexible scheduling
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
            <h2 className="text-4xl font-bold text-[#212529] mb-6">Global Ocean Freight Solutions</h2>
            <p className="text-lg text-[#6C757D] leading-relaxed mb-4">
              Our ocean freight services provide cost-effective and reliable shipping solutions for businesses of all sizes. 
              Whether you're shipping a single container or managing regular shipments across multiple trade routes, we have 
              the expertise and global network to ensure your cargo arrives safely and on time.
            </p>
            <p className="text-lg text-[#6C757D] leading-relaxed">
              With partnerships across major shipping lines and ports worldwide, we offer flexible scheduling, competitive 
              pricing, and comprehensive cargo tracking. Our experienced team handles all documentation, customs clearance, 
              and logistics coordination, making international shipping simple and stress-free.
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
              src="/ocean-freight-container.jpg"
              alt="Container Ship at Port"
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
          <h2 className="text-4xl font-bold text-[#212529] mb-8 text-center">Why Choose Our Ocean Freight Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "Global Network", description: "Access to major ports across 6 continents with established partnerships and reliable service routes" },
              { icon: DollarSign, title: "Competitive Rates", description: "Volume discounts and flexible pricing options for both FCL and LCL shipments" },
              { icon: Shield, title: "Cargo Protection", description: "Comprehensive insurance options and secure handling procedures for all cargo types" },
              { icon: Clock, title: "Reliable Transit Times", description: "Consistent sailing schedules with accurate ETAs and proactive delay notifications" },
              { icon: CheckCircle, title: "Full Documentation Support", description: "Complete handling of bills of lading, customs paperwork, and compliance requirements" },
              { icon: Ship, title: "FCL & LCL Options", description: "Flexible container options from full container loads to consolidated less-than-container shipments" }
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

        {/* Service Types with Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-[#212529] mb-8 text-center">Our Ocean Freight Services</h2>
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
                    src="/fcl-container-loading.jpg"
                    alt="Full Container Load"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-[#212529] mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">Full Container Load (FCL)</h3>
                  <p className="text-[#6C757D] mb-6">
                    Dedicated container space for your cargo with direct port-to-port shipping. Ideal for large shipments 
                    that can fill 20ft or 40ft containers.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Exclusive container use - no cargo mixing",
                      "Faster transit times with direct routing",
                      "Lower per-unit costs for bulk shipments",
                      "Reduced handling and damage risk"
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
                    src="/lcl-cargo-consolidation.jpg"
                    alt="Less than Container Load"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-[#212529] mb-4 group-hover:text-[#B8860B] transition-colors duration-300">Less than Container Load (LCL)</h3>
                  <p className="text-[#6C757D] mb-6">
                    Cost-effective solution for smaller shipments that don't require a full container. Your cargo is 
                    consolidated with other shipments heading to the same destination.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Pay only for the space you use",
                      "Regular weekly departures to major ports",
                      "Professional cargo consolidation services",
                      "Flexible for varying shipment volumes"
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
              src="/ocean-freight-cta-bg.jpg"
              alt="Background"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Ship Your Cargo?</h2>
            <p className="text-xl mb-8 text-gray-300">
              Get a free quote for your ocean freight shipment today
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg" className="bg-[#D4AF37] text-[#212529] hover:bg-[#B8860B] font-bold hover:scale-105 transition-all duration-300">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}