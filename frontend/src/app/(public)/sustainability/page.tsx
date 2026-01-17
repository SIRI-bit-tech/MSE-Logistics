"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, Recycle, Zap, Globe, Target, TrendingDown, Users, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full">
        <Image
          src="/sustainability-hero.jpg"
          alt="Sustainable Shipping Future"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-4xl"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Leaf className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#D4AF37] flex-shrink-0" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">Navigating Towards a Greener Future</h1>
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-6 sm:mb-8 leading-relaxed max-w-3xl">
              We are committed to reducing our environmental footprint by 2030. Discover how we're leading 
              the industry towards sustainable shipping practices and cleaner oceans.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md">
              <Button asChild size="lg" className="bg-[#D4AF37] text-[#212529] hover:bg-[#B8860B] font-bold w-full sm:w-auto">
                <Link href="#progress">View Our Progress</Link>
              </Button>
              <Button asChild size="lg" className="bg-white/20 text-white border-2 border-white hover:bg-white hover:text-[#212529] font-bold backdrop-blur-sm w-full sm:w-auto">
                <Link href="/sustainability/report">Download Report</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Our Commitment */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#212529] mb-6">Our Environmental Commitment</h2>
              <p className="text-lg text-[#6C757D] leading-relaxed mb-6">
                At Mediterranean Shipping Express, we recognize that the shipping industry plays a crucial role in global 
                trade, but we also understand our responsibility to protect the environment for future generations. Our 
                comprehensive sustainability strategy addresses every aspect of our operations, from fuel efficiency and 
                emissions reduction to waste management and biodiversity protection.
              </p>
              <p className="text-lg text-[#6C757D] leading-relaxed mb-6">
                We have committed to achieving net-zero emissions by 2050, with significant milestones along the way. 
                Our approach combines cutting-edge technology, operational excellence, and strategic partnerships to 
                create meaningful environmental impact while maintaining the highest standards of service reliability.
              </p>
              <p className="text-lg text-[#6C757D] leading-relaxed">
                This commitment extends beyond our own operations to include our entire supply chain, working closely 
                with partners, suppliers, and customers to create a more sustainable logistics ecosystem that benefits 
                everyone involved.
              </p>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/sustainability-commitment.jpg"
                alt="Environmental Commitment"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.section>

        {/* Key Goals */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#212529] mb-12 text-center">Our 2030 Sustainability Goals</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-[#DEE2E6] hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <TrendingDown className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-[#212529] mb-4">50% Emission Reduction</h3>
                <p className="text-[#6C757D] leading-relaxed">
                  Reduce carbon emissions by 50% compared to 2020 levels through advanced fuel technologies and operational efficiency.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#DEE2E6] hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <Recycle className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-[#212529] mb-4">Zero Waste to Landfill</h3>
                <p className="text-[#6C757D] leading-relaxed">
                  Achieve zero waste to landfill across all our facilities through comprehensive recycling and circular economy practices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#DEE2E6] hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <Zap className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-[#212529] mb-4">100% Renewable Energy</h3>
                <p className="text-[#6C757D] leading-relaxed">
                  Power all shore-based operations with renewable energy sources including solar, wind, and hydroelectric power.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#DEE2E6] hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <Globe className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-[#212529] mb-4">Ocean Protection</h3>
                <p className="text-[#6C757D] leading-relaxed">
                  Implement advanced ballast water treatment and marine biodiversity protection measures across our fleet.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Green Technologies */}
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
                src="/green-technology.jpg"
                alt="Green Shipping Technology"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#212529] mb-6">Innovative Green Technologies</h2>
              <p className="text-lg text-[#6C757D] leading-relaxed mb-6">
                We are investing heavily in next-generation technologies that will revolutionize the shipping industry. 
                Our research and development initiatives focus on alternative fuels, energy-efficient vessel designs, 
                and smart logistics systems that minimize environmental impact while maximizing operational efficiency.
              </p>
              <p className="text-lg text-[#6C757D] leading-relaxed mb-6">
                Our fleet modernization program includes the integration of hybrid propulsion systems, advanced hull 
                coatings that reduce drag, and AI-powered route optimization that can reduce fuel consumption by up to 
                15%. We're also pioneering the use of green ammonia and hydrogen fuel cells in maritime applications.
              </p>
              <p className="text-lg text-[#6C757D] leading-relaxed mb-8">
                Beyond vessel technology, we're implementing smart port solutions, automated cargo handling systems, 
                and digital twin technology that allows us to optimize operations in real-time, reducing both emissions 
                and operational costs while improving service reliability.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>
                  <span className="text-[#6C757D]">Alternative fuel research and implementation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>
                  <span className="text-[#6C757D]">AI-powered route optimization systems</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>
                  <span className="text-[#6C757D]">Smart port and automated handling solutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>
                  <span className="text-[#6C757D]">Advanced vessel design and propulsion systems</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Partnerships & Initiatives */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#212529] mb-12 text-center">Global Partnerships & Initiatives</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-[#D4AF37] overflow-hidden">
              <div className="relative h-[250px]">
                <Image
                  src="/ocean-conservation.jpg"
                  alt="Ocean Conservation"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-[#D4AF37] mb-4" />
                <h3 className="text-xl font-bold text-[#212529] mb-3">Ocean Conservation Alliance</h3>
                <p className="text-[#6C757D] leading-relaxed">
                  We partner with leading marine conservation organizations to protect ocean ecosystems, 
                  support marine research, and implement best practices for biodiversity preservation 
                  throughout our shipping routes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#B8860B] overflow-hidden">
              <CardContent className="p-6">
                <Award className="w-12 h-12 text-[#B8860B] mb-4" />
                <h3 className="text-xl font-bold text-[#212529] mb-3">Industry Leadership</h3>
                <p className="text-[#6C757D] leading-relaxed mb-4">
                  As founding members of the Global Maritime Sustainability Initiative, we lead industry-wide 
                  efforts to establish new environmental standards and share best practices across the shipping sector.
                </p>
                <ul className="space-y-2 text-sm text-[#6C757D]">
                  <li>• IMO Environmental Committee participation</li>
                  <li>• Green Shipping Corridor development</li>
                  <li>• Sustainable fuel research consortium</li>
                  <li>• Port decarbonization initiatives</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#D4AF37] overflow-hidden">
              <CardContent className="p-6">
                <Target className="w-12 h-12 text-[#D4AF37] mb-4" />
                <h3 className="text-xl font-bold text-[#212529] mb-3">Community Impact</h3>
                <p className="text-[#6C757D] leading-relaxed mb-4">
                  Our sustainability efforts extend to the communities we serve, supporting local environmental 
                  projects, education programs, and sustainable development initiatives in port cities worldwide.
                </p>
                <ul className="space-y-2 text-sm text-[#6C757D]">
                  <li>• Coastal cleanup programs</li>
                  <li>• Maritime education scholarships</li>
                  <li>• Local renewable energy projects</li>
                  <li>• Sustainable logistics training</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Progress Metrics */}
        <motion.section
          id="progress"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-[#F8F9FA] rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#212529] mb-12 text-center">Our Progress So Far</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-[#D4AF37] mb-2">23%</div>
                <div className="text-lg font-semibold text-[#212529] mb-2">Emission Reduction</div>
                <div className="text-sm text-[#6C757D]">Since 2020 baseline</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-[#D4AF37] mb-2">85%</div>
                <div className="text-lg font-semibold text-[#212529] mb-2">Waste Diverted</div>
                <div className="text-sm text-[#6C757D]">From landfills</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-[#D4AF37] mb-2">60%</div>
                <div className="text-lg font-semibold text-[#212529] mb-2">Renewable Energy</div>
                <div className="text-sm text-[#6C757D]">In shore operations</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-[#D4AF37] mb-2">12</div>
                <div className="text-lg font-semibold text-[#212529] mb-2">Green Vessels</div>
                <div className="text-sm text-[#6C757D]">In active service</div>
              </div>
            </div>
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
                src="/sustainability-cta.jpg"
                alt="Join Our Mission"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Sustainability Journey</h2>
              <p className="text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
                Partner with us to create a more sustainable future for global shipping. Together, we can 
                reduce environmental impact while maintaining the highest standards of service excellence.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button asChild size="lg" className="bg-[#D4AF37] text-[#212529] hover:bg-[#B8860B] font-bold">
                  <Link href="/contact">Partner With Us</Link>
                </Button>
                <Button asChild size="lg" className="bg-white/20 text-white border-2 border-white hover:bg-white hover:text-[#212529] font-bold backdrop-blur-sm">
                  <Link href="/sustainability/report">Download Full Report</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}