"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Truck, Train, Ship, CheckCircle, MapPin, Clock, TrendingDown, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function IntermodalPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      <div className="relative h-[500px] w-full">
        <Image
          src="/intermodal-transport-hero.jpg"
          alt="Intermodal Transport Solutions"
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
            <div className="flex items-center gap-4 mb-6">
              <Ship className="w-12 h-12 text-[#D4AF37]" />
              <Train className="w-12 h-12 text-[#D4AF37]" />
              <Truck className="w-12 h-12 text-[#D4AF37]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Intermodal Transport Solutions</h1>
            <p className="text-xl md:text-2xl text-gray-100">
              Seamless multi-modal logistics combining ocean, rail, and road transport for maximum efficiency
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <Image
              src="/intermodal-logistics.jpg"
              alt="Intermodal Logistics"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
          <div>
            <h2 className="text-4xl font-bold text-[#212529] mb-6">Integrated Multi-Modal Logistics</h2>
            <p className="text-lg text-[#6C757D] leading-relaxed mb-4">
              Intermodal transportation combines the strengths of different transport modes to create the most efficient 
              and cost-effective shipping solution. By strategically utilizing ocean freight, rail transport, and road 
              delivery, we optimize your supply chain while reducing costs and environmental impact.
            </p>
            <p className="text-lg text-[#6C757D] leading-relaxed">
              Our intermodal services provide seamless door-to-door delivery with a single point of contact managing the 
              entire journey. From initial pickup to final delivery, we coordinate every transfer point, handle all 
              documentation, and ensure your cargo moves smoothly across different transport modes without delays or complications.
            </p>
          </div>
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-[#212529] mb-8 text-center">Advantages of Intermodal Transport</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingDown, title: "Cost Savings", description: "Reduce shipping costs by 20-30% through optimized route planning and mode selection" },
              { icon: Clock, title: "Faster Transit", description: "Minimize delays with coordinated transfers and priority handling at interchange points" },
              { icon: Shield, title: "Enhanced Security", description: "Containerized shipping reduces handling and theft risk throughout the journey" },
              { icon: MapPin, title: "Wider Reach", description: "Access remote locations through combined transport modes and extended network coverage" }
            ].map((benefit, index) => {
              const Icon = benefit.icon
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
                      <h3 className="text-xl font-bold text-[#212529] mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">{benefit.title}</h3>
                      <p className="text-[#6C757D]">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-[#212529] mb-8 text-center">How Intermodal Transport Works</h2>
          <div className="space-y-6">
            {[
              { icon: Truck, step: 1, title: "Initial Pickup", description: "We collect your cargo from your facility using road transport and deliver it to the nearest rail terminal or port" },
              { icon: Train, step: 2, title: "Long-Distance Transport", description: "Your containerized cargo travels via rail or ocean freight for the main leg of the journey, maximizing efficiency" },
              { icon: Ship, step: 3, title: "Transfer & Coordination", description: "Seamless transfers between transport modes at our partner facilities with minimal handling and no delays" },
              { icon: Truck, step: 4, title: "Final Delivery", description: "Road transport completes the last mile, delivering your cargo directly to the destination address" }
            ].map((step, index) => {
              const Icon = step.icon
              const isYellow = step.step % 2 === 1 // Steps 1 and 3 use yellow, steps 2 and 4 use gold
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`border-l-4 ${isYellow ? 'border-msc-yellow' : 'border-msc-gold'} hover:shadow-lg hover:scale-105 transition-all duration-300 group`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`bg-[#F8F9FA] p-3 rounded-full ${isYellow ? 'group-hover:bg-msc-yellow' : 'group-hover:bg-msc-gold'} transition-colors duration-300`}>
                          <Icon className={`w-8 h-8 ${isYellow ? 'text-msc-yellow' : 'text-msc-gold'} group-hover:text-white transition-colors duration-300`} />
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold text-[#212529] mb-2 ${isYellow ? 'group-hover:text-msc-yellow' : 'group-hover:text-msc-gold'} transition-colors duration-300`}>Step {step.step}: {step.title}</h3>
                          <p className="text-[#6C757D]">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Service Features with Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-[#212529] mb-8 text-center">What We Offer</h2>
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
                    src="/intermodal-coordination.jpg"
                    alt="Single Point of Contact"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-[#212529] mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">Single Point of Contact</h3>
                  <p className="text-[#6C757D] mb-6">
                    One dedicated account manager coordinates your entire shipment across all transport modes, providing 
                    consistent communication and streamlined problem resolution.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "24/7 shipment visibility and tracking",
                      "Proactive exception management",
                      "Unified billing and documentation"
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
                    src="/intermodal-flexibility.jpg"
                    alt="Flexible Solutions"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-[#212529] mb-4 group-hover:text-[#B8860B] transition-colors duration-300">Flexible Solutions</h3>
                  <p className="text-[#6C757D] mb-6">
                    We design custom intermodal solutions based on your specific requirements, balancing cost, speed, 
                    and sustainability to meet your business objectives.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Route optimization for best performance",
                      "Scalable capacity for seasonal demands",
                      "Special handling for unique cargo"
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
              src="/intermodal-cta-bg.jpg"
              alt="Background"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Optimize Your Supply Chain</h2>
            <p className="text-xl mb-8 text-gray-300">
              Discover how intermodal transport can reduce costs and improve efficiency
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg" className="bg-[#D4AF37] text-[#212529] hover:bg-[#B8860B] font-bold hover:scale-105 transition-all duration-300">
                <Link href="/contact">Request Consultation</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}