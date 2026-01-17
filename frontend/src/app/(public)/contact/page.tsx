"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Globe, MessageCircle, Send, Users } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Implement API call
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full">
        <Image
          src="/contact-hero.jpg"
          alt="Contact Mediterranean Shipping Express"
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-[#D4AF37] flex-shrink-0" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Contact Us</h1>
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 max-w-3xl">
              Ready to ship with confidence? Our expert team is here to help you with all your logistics needs.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Contact Information Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-[#212529] mb-12 text-center">Get in Touch</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Mail,
                title: "Email Us",
                info: "support@mse.com",
                description: "Send us an email anytime",
                href: "mailto:support@mse.com"
              },
              {
                icon: Phone,
                title: "Call Us",
                info: "+1 (555) 123-4567",
                description: "Speak with our experts",
                href: "tel:+15551234567"
              },
              {
                icon: MapPin,
                title: "Visit Us",
                info: "Malta Headquarters",
                description: "123 Logistics Way, Valletta",
                href: null
              },
              {
                icon: Clock,
                title: "Business Hours",
                info: "24/7 Support",
                description: "We're always here to help",
                href: null
              }
            ].map((contact, index) => {
              const Icon = contact.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-[#DEE2E6] hover:shadow-lg hover:scale-105 transition-all duration-300 h-full group cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Icon className="w-12 h-12 text-[#D4AF37] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-lg font-bold text-[#212529] mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">{contact.title}</h3>
                      {contact.href ? (
                        <a href={contact.href} className="text-[#6C757D] hover:text-[#D4AF37] transition-colors duration-300">
                          <p className="font-semibold mb-1">{contact.info}</p>
                          <p className="text-sm">{contact.description}</p>
                        </a>
                      ) : (
                        <>
                          <p className="font-semibold text-[#6C757D] mb-1">{contact.info}</p>
                          <p className="text-sm text-[#6C757D]">{contact.description}</p>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Contact Form and Office Info */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="border-2 border-[#D4AF37] hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[#212529] mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="name" className="block text-sm font-medium text-[#212529] mb-2">Full Name *</label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="border-[#DEE2E6] focus:border-[#D4AF37] focus:ring-[#D4AF37] hover:border-[#B8860B] transition-colors duration-300"
                        required
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="email" className="block text-sm font-medium text-[#212529] mb-2">Email Address *</label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border-[#DEE2E6] focus:border-[#D4AF37] focus:ring-[#D4AF37] hover:border-[#B8860B] transition-colors duration-300"
                        required
                      />
                    </motion.div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="phone" className="block text-sm font-medium text-[#212529] mb-2">Phone Number</label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="border-[#DEE2E6] focus:border-[#D4AF37] focus:ring-[#D4AF37] hover:border-[#B8860B] transition-colors duration-300"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="subject" className="block text-sm font-medium text-[#212529] mb-2">Subject *</label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="border-[#DEE2E6] focus:border-[#D4AF37] focus:ring-[#D4AF37] hover:border-[#B8860B] transition-colors duration-300"
                        required
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-[#212529] mb-2">Message *</label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="border-[#DEE2E6] focus:border-[#D4AF37] focus:ring-[#D4AF37] hover:border-[#B8860B] transition-colors duration-300 min-h-[120px]"
                      placeholder="Tell us about your shipping needs..."
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-[#D4AF37] text-[#212529] hover:bg-[#B8860B] font-bold hover:scale-105 transition-all duration-300"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Office Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Global Offices */}
            <Card className="border-[#DEE2E6] hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <Globe className="w-10 h-10 text-[#D4AF37] mb-4" />
                <h3 className="text-xl font-bold text-[#212529] mb-4">Global Offices</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-[#212529]">Europe & Mediterranean</h4>
                    <p className="text-[#6C757D]">Malta, Barcelona, Genoa, Piraeus</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#212529]">Asia Pacific</h4>
                    <p className="text-[#6C757D]">Singapore, Hong Kong, Shanghai</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#212529]">Americas</h4>
                    <p className="text-[#6C757D]">Miami, Los Angeles, São Paulo</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Support */}
            <Card className="border-[#DEE2E6] hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <Users className="w-10 h-10 text-[#D4AF37] mb-4" />
                <h3 className="text-xl font-bold text-[#212529] mb-4">Customer Support</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6C757D]">Response Time:</span>
                    <span className="font-semibold text-[#212529]">&lt; 2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6C757D]">Availability:</span>
                    <span className="font-semibold text-[#212529]">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6C757D]">Languages:</span>
                    <span className="font-semibold text-[#212529]">15+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6C757D]">Satisfaction:</span>
                    <span className="font-semibold text-[#212529]">98.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-2 border-[#D4AF37] hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Phone className="w-10 h-10 text-[#D4AF37] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#212529] mb-2">Emergency Hotline</h3>
                <p className="text-2xl font-bold text-[#D4AF37] mb-2">+1 (555) 911-SHIP</p>
                <p className="text-sm text-[#6C757D]">24/7 Emergency Support</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-4xl font-bold text-[#212529] mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "How can I track my shipment?",
                answer: "Use our online tracking system with your tracking number, or contact our support team for real-time updates."
              },
              {
                question: "What shipping options do you offer?",
                answer: "We offer ocean freight, intermodal transport, warehousing, and comprehensive supply chain management services."
              },
              {
                question: "How do I get a shipping quote?",
                answer: "Contact us through this form, call our sales team, or use our online quote calculator for instant estimates."
              },
              {
                question: "Do you handle customs clearance?",
                answer: "Yes, we provide full customs clearance services and handle all documentation for international shipments."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-[#DEE2E6] hover:shadow-lg hover:scale-105 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-[#212529] mb-3">{faq.question}</h3>
                    <p className="text-[#6C757D]">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}