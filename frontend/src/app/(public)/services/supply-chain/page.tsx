"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Network, CheckCircle, TrendingUp, Users, Globe, Zap, BarChart3, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function SupplyChainPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      <div className="relative h-[500px] w-full">
        <Image
          src="/supply-chain-hero.jpg"
          alt="Supply Chain Management"
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
              <Network className="w-14 h-14 text-[#D4AF37]" />
              <h1 className="text-5xl md:text-6xl font-bold">Supply Chain Management</h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-100">
              End-to-end supply chain solutions designed to optimize operations and reduce costs
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
            <h2 className="text-4xl font-bold text-[#212529] mb-6">Comprehensive Supply Chain Solutions</h2>
            <p className="text-lg text-[#6C757D] leading-relaxed mb-4">
              Our supply chain management services provide end-to-end visibility and control over your entire logistics 
              network. From procurement to final delivery, we optimize every step of your supply chain to reduce costs, 
              improve efficiency, and enhance customer satisfaction.
            </p>
            <p className="text-lg text-[#6C757D] leading-relaxed">
              We leverage advanced analytics, automation, and industry expertise to identify bottlenecks, streamline 
              processes, and implement best practices. Our team works as an extension of your business, providing 
              strategic guidance and operational support to help you achieve your supply chain objectives.
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
              src="/supply-chain-network.jpg"
              alt="Supply Chain Network"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-[#212529] mb-8 text-center">Supply Chain Advantages</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: "Cost Reduction", description: "Reduce operational costs by 15-25% through process optimization and efficiency gains" },
              { icon: Zap, title: "Faster Delivery", description: "Improve delivery times with optimized routing and streamlined processes" },
              { icon: BarChart3, title: "Better Visibility", description: "Real-time tracking and analytics across your entire supply chain network" },
              { icon: Shield, title: "Risk Mitigation", description: "Proactive risk management and contingency planning for supply disruptions" }
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

        {/* Services with Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-[#212529] mb-8 text-center">Our Supply Chain Services</h2>
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
                    src="/supply-chain-network-design.jpg"
                    alt="Network Design & Optimization"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-8">
                  <Globe className="w-12 h-12 text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold text-[#212529] mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">Network Design & Optimization</h3>
                  <p className="text-[#6C757D] mb-6">
                    Strategic planning and optimization of your distribution network to minimize costs while maintaining 
                    service levels. We analyze your current operations and design efficient networks tailored to your needs.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Facility location analysis",
                      "Route optimization modeling",
                      "Capacity planning",
                      "Cost-benefit analysis"
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
                    src="/supply-chain-forecasting.jpg"
                    alt="Demand Planning & Forecasting"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-8">
                  <BarChart3 className="w-12 h-12 text-[#B8860B] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold text-[#212529] mb-4 group-hover:text-[#B8860B] transition-colors duration-300">Demand Planning & Forecasting</h3>
                  <p className="text-[#6C757D] mb-6">
                    Advanced analytics and machine learning to predict demand patterns, optimize inventory levels, 
                    and prevent stockouts or overstock situations.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Statistical forecasting models",
                      "Seasonal trend analysis",
                      "Safety stock optimization",
                      "Collaborative planning tools"
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
                    src="/supply-chain-supplier.jpg"
                    alt="Supplier Management"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-8">
                  <Users className="w-12 h-12 text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold text-[#212529] mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">Supplier Management</h3>
                  <p className="text-[#6C757D] mb-6">
                    Comprehensive vendor management including supplier selection, performance monitoring, and 
                    relationship management to ensure reliable supply and quality standards.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Supplier qualification and audits",
                      "Performance scorecards",
                      "Contract negotiation support",
                      "Risk assessment and mitigation"
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
                    src="/supply-chain-automation.jpg"
                    alt="Process Automation"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-8">
                  <Zap className="w-12 h-12 text-[#B8860B] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold text-[#212529] mb-4 group-hover:text-[#B8860B] transition-colors duration-300">Process Automation</h3>
                  <p className="text-[#6C757D] mb-6">
                    Implement cutting-edge technology and automation to streamline operations, reduce manual errors, 
                    and improve efficiency across your supply chain.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Automated order processing",
                      "EDI and API integrations",
                      "Robotic process automation",
                      "AI-powered decision support"
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

        {/* Implementation Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-[#212529] mb-8 text-center">Our Implementation Approach</h2>
          <div className="space-y-6">
            {[
              { step: 1, title: "Assessment & Analysis", description: "Comprehensive evaluation of your current supply chain operations, identifying pain points, inefficiencies, and opportunities for improvement.", color: "D4AF37" },
              { step: 2, title: "Strategy Development", description: "Design customized solutions aligned with your business objectives, including technology selection, process redesign, and implementation roadmap.", color: "B8860B" },
              { step: 3, title: "Implementation & Integration", description: "Execute the plan with minimal disruption to your operations, including system integration, process changes, and staff training.", color: "D4AF37" },
              { step: 4, title: "Optimization & Support", description: "Continuous monitoring, performance tracking, and ongoing optimization to ensure sustained improvements and adapt to changing business needs.", color: "B8860B" }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`border-l-4 border-[#${process.color}] hover:shadow-lg hover:scale-105 transition-all duration-300 group`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#F8F9FA] p-3 rounded-full group-hover:bg-[#D4AF37] transition-colors duration-300">
                        <span className={`text-2xl font-bold text-[#${process.color}] group-hover:text-white transition-colors duration-300`}>{process.step}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#212529] mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">{process.title}</h3>
                        <p className="text-[#6C757D]">
                          {process.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              src="/supply-chain-cta-bg.jpg"
              alt="Background"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transform Your Supply Chain</h2>
            <p className="text-xl mb-8 text-gray-300">
              Schedule a consultation to discover how we can optimize your operations
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg" className="bg-[#D4AF37] text-[#212529] hover:bg-[#B8860B] font-bold hover:scale-105 transition-all duration-300">
                <Link href="/contact">Contact Our Experts</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
