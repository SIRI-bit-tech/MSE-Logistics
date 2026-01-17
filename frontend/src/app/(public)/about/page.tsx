"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Target, Zap, Globe, Award, TrendingUp, Shield, Clock, MapPin, Anchor } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full">
        <Image
          src="/about-hero.jpg"
          alt="Mediterranean Shipping Express - Global Logistics Leader"
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
              <Anchor className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#D4AF37] flex-shrink-0" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">About Mediterranean Shipping Express</h1>
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-6 sm:mb-8 leading-relaxed max-w-3xl">
              Connecting the world through reliable, innovative, and sustainable logistics solutions. 
              Your trusted partner in global shipping since 2020.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md">
              <Button asChild size="lg" className="bg-[#D4AF37] text-[#212529] hover:bg-[#B8860B] font-bold w-full sm:w-auto">
                <Link href="/services/ocean-freight">Our Services</Link>
              </Button>
              <Button asChild size="lg" className="bg-white/20 text-white border-2 border-white hover:bg-white hover:text-[#212529] font-bold backdrop-blur-sm w-full sm:w-auto">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Our Story */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#212529] mb-6">Our Story</h2>
              <p className="text-lg text-[#6C757D] leading-relaxed mb-6">
                Mediterranean Shipping Express was founded in 2020 with a revolutionary vision: to transform the global 
                logistics industry through cutting-edge technology, unwavering reliability, and exceptional customer service. 
                What began as a small team of passionate logistics experts and innovative software engineers has evolved 
                into one of the world's most trusted shipping and logistics companies.
              </p>
              <p className="text-lg text-[#6C757D] leading-relaxed mb-6">
                Our founders recognized the critical pain points plaguing international shipping: lack of transparency, 
                unreliable delivery times, complex documentation processes, and limited real-time tracking capabilities. 
                They set out to create a company that would address these challenges head-on, leveraging advanced 
                technology and building strategic partnerships worldwide.
              </p>
              <p className="text-lg text-[#6C757D] leading-relaxed mb-6">
                Today, we operate across 150+ countries with an extensive network of trusted partners, state-of-the-art 
                facilities, and a dedicated team of over 5,000 professionals. Our commitment to innovation has led to 
                numerous industry firsts, including AI-powered route optimization, blockchain-based documentation, and 
                real-time IoT tracking systems.
              </p>
              <p className="text-lg text-[#6C757D] leading-relaxed">
                From our headquarters in the Mediterranean region to our global network of offices and partners, we 
                continue to push the boundaries of what's possible in international logistics, always with our customers' 
                success at the heart of everything we do.
              </p>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/company-history.jpg"
                alt="Mediterranean Shipping Express History"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.section>

        {/* Mission, Vision, Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#212529] mb-12 text-center">Our Foundation</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-[#D4AF37] hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <Target className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-[#212529] mb-4">Our Mission</h3>
                <p className="text-[#6C757D] leading-relaxed">
                  To connect businesses and communities worldwide through reliable, innovative, and sustainable 
                  logistics solutions that enable global commerce and economic growth while protecting our planet 
                  for future generations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#B8860B] hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <Globe className="w-16 h-16 text-[#B8860B] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-[#212529] mb-4">Our Vision</h3>
                <p className="text-[#6C757D] leading-relaxed">
                  To be the world's most trusted and innovative logistics partner, setting new standards for 
                  reliability, sustainability, and customer satisfaction while fostering global connectivity 
                  and economic prosperity.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#D4AF37] hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <Users className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-[#212529] mb-4">Our Values</h3>
                <p className="text-[#6C757D] leading-relaxed">
                  Integrity, innovation, reliability, sustainability, and customer-centricity guide every 
                  decision we make. We believe in building long-term partnerships based on trust, transparency, 
                  and mutual success.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Leadership Team */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/leadership-team.jpg"
                alt="Mediterranean Shipping Express Leadership Team"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#212529] mb-6">Leadership Excellence</h2>
              <p className="text-lg text-[#6C757D] leading-relaxed mb-6">
                Our leadership team brings together decades of experience in logistics, technology, and international 
                business. Led by industry veterans who have successfully navigated the complexities of global shipping, 
                our executives combine deep operational expertise with visionary thinking to drive continuous innovation 
                and growth.
              </p>
              <p className="text-lg text-[#6C757D] leading-relaxed mb-6">
                Our CEO, with over 25 years in maritime logistics, has been instrumental in establishing key partnerships 
                across major shipping routes. Our CTO, a former Silicon Valley executive, leads our technology initiatives 
                that have revolutionized how we track, manage, and optimize shipments worldwide.
              </p>
              <p className="text-lg text-[#6C757D] leading-relaxed mb-8">
                Together, our leadership team is committed to maintaining the highest standards of operational excellence 
                while fostering a culture of innovation, sustainability, and customer success that permeates every level 
                of our organization.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#D4AF37] mb-2">25+</div>
                  <div className="text-sm text-[#6C757D]">Years Average Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#D4AF37] mb-2">12</div>
                  <div className="text-sm text-[#6C757D]">C-Level Executives</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#D4AF37] mb-2">8</div>
                  <div className="text-sm text-[#6C757D]">Countries Represented</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#D4AF37] mb-2">40%</div>
                  <div className="text-sm text-[#6C757D]">Women in Leadership</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Global Presence */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#212529] mb-12 text-center">Global Presence</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <Card className="border-[#DEE2E6] hover:shadow-lg transition-shadow text-center p-6">
              <MapPin className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <div className="text-3xl font-bold text-[#212529] mb-2">150+</div>
              <div className="text-[#6C757D]">Countries Served</div>
            </Card>
            
            <Card className="border-[#DEE2E6] hover:shadow-lg transition-shadow text-center p-6">
              <Globe className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <div className="text-3xl font-bold text-[#212529] mb-2">500+</div>
              <div className="text-[#6C757D]">Partner Locations</div>
            </Card>
            
            <Card className="border-[#DEE2E6] hover:shadow-lg transition-shadow text-center p-6">
              <Users className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <div className="text-3xl font-bold text-[#212529] mb-2">5,000+</div>
              <div className="text-[#6C757D]">Team Members</div>
            </Card>
            
            <Card className="border-[#DEE2E6] hover:shadow-lg transition-shadow text-center p-6">
              <TrendingUp className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <div className="text-3xl font-bold text-[#212529] mb-2">2M+</div>
              <div className="text-[#6C757D]">Annual Shipments</div>
            </Card>
          </div>
          
          <div className="bg-[#F8F9FA] rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-[#212529] mb-6 text-center">Regional Headquarters</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="font-bold text-[#212529] mb-2">Europe & Mediterranean</h4>
                <p className="text-[#6C757D] text-sm">Malta (HQ), Barcelona, Genoa, Piraeus</p>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-[#212529] mb-2">Asia Pacific</h4>
                <p className="text-[#6C757D] text-sm">Singapore, Hong Kong, Shanghai, Tokyo</p>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-[#212529] mb-2">Americas</h4>
                <p className="text-[#6C757D] text-sm">Miami, Los Angeles, São Paulo, Buenos Aires</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Innovation & Technology */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#212529] mb-6">Innovation & Technology</h2>
              <p className="text-lg text-[#6C757D] leading-relaxed mb-6">
                At the heart of our operations lies a commitment to technological innovation that sets us apart in the 
                logistics industry. Our proprietary technology platform integrates artificial intelligence, machine 
                learning, and IoT sensors to provide unprecedented visibility and control over global supply chains.
              </p>
              <p className="text-lg text-[#6C757D] leading-relaxed mb-6">
                Our advanced tracking systems provide real-time updates on shipment location, condition, and estimated 
                arrival times. Customers can access detailed analytics, predictive insights, and automated alerts through 
                our user-friendly dashboard and mobile applications.
              </p>
              <p className="text-lg text-[#6C757D] leading-relaxed mb-8">
                We invest over $50 million annually in research and development, working with leading technology partners 
                and universities to develop next-generation solutions for autonomous shipping, predictive maintenance, 
                and sustainable logistics operations.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-[#D4AF37]" />
                  <span className="text-[#6C757D]">AI-powered route optimization and demand forecasting</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-[#D4AF37]" />
                  <span className="text-[#6C757D]">Blockchain-based documentation and security</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-[#D4AF37]" />
                  <span className="text-[#6C757D]">Real-time IoT monitoring and predictive analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-[#D4AF37]" />
                  <span className="text-[#6C757D]">Cloud-based platform with 99.9% uptime guarantee</span>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/technology-innovation.jpg"
                alt="Technology and Innovation"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.section>

        {/* Awards & Recognition */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#212529] mb-12 text-center">Awards & Recognition</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-[#DEE2E6] hover:shadow-lg transition-shadow p-6">
              <Award className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-lg font-bold text-[#212529] mb-2">Global Logistics Excellence Award 2023</h3>
              <p className="text-[#6C757D] text-sm">Recognized for outstanding innovation in supply chain technology</p>
            </Card>
            
            <Card className="border-[#DEE2E6] hover:shadow-lg transition-shadow p-6">
              <Award className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-lg font-bold text-[#212529] mb-2">Sustainability Leader 2023</h3>
              <p className="text-[#6C757D] text-sm">Leading environmental initiatives in maritime shipping</p>
            </Card>
            
            <Card className="border-[#DEE2E6] hover:shadow-lg transition-shadow p-6">
              <Award className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-lg font-bold text-[#212529] mb-2">Customer Service Excellence 2022</h3>
              <p className="text-[#6C757D] text-sm">Highest customer satisfaction ratings in the industry</p>
            </Card>
            
            <Card className="border-[#DEE2E6] hover:shadow-lg transition-shadow p-6">
              <Award className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-lg font-bold text-[#212529] mb-2">Digital Innovation Award 2022</h3>
              <p className="text-[#6C757D] text-sm">Revolutionary blockchain implementation in logistics</p>
            </Card>
            
            <Card className="border-[#DEE2E6] hover:shadow-lg transition-shadow p-6">
              <Award className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-lg font-bold text-[#212529] mb-2">Best Employer 2021</h3>
              <p className="text-[#6C757D] text-sm">Outstanding workplace culture and employee satisfaction</p>
            </Card>
            
            <Card className="border-[#DEE2E6] hover:shadow-lg transition-shadow p-6">
              <Award className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-lg font-bold text-[#212529] mb-2">Safety Excellence Award 2021</h3>
              <p className="text-[#6C757D] text-sm">Zero incidents record and industry-leading safety protocols</p>
            </Card>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-[#343A40] rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <Image
                src="/about-cta.jpg"
                alt="Join Our Team"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Ship with Confidence?</h2>
              <p className="text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
                Experience the Mediterranean Shipping Express difference. Join thousands of satisfied customers 
                who trust us with their most important shipments.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button asChild size="lg" className="bg-[#D4AF37] text-[#212529] hover:bg-[#B8860B] font-bold">
                  <Link href="/user/register">Get Started Today</Link>
                </Button>
                <Button asChild size="lg" className="bg-white/20 text-white border-2 border-white hover:bg-white hover:text-[#212529] font-bold backdrop-blur-sm">
                  <Link href="/contact">Contact Our Team</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
