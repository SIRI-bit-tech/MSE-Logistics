"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ChevronRight, Globe, Zap, Shield, MapPin, Clock, BarChart3, Truck } from "lucide-react"
import CarouselSection from "@/components/carousel-section"
import StatsBanner from "@/components/stats-banner"
import TestimonialsCarousel from "@/components/testimonials-carousel"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Home() {
  return (
    <div className="w-full bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="w-full px-4 py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-br from-[#003873] via-[#0066CC] to-[#003873]">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-8 md:gap-12 text-center md:text-left md:flex-row"
          >
            <div className="flex-1 w-full">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
                Global Logistics,
                <span className="block text-[#FFD700]">Delivered Swift</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-6 md:mb-8 max-w-2xl mx-auto md:mx-0">
                Real-time tracking, competitive pricing, and 24/7 support for international shipping. Track packages
                across 200+ countries with precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start max-w-md mx-auto md:mx-0">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#FFD700] text-[#003873] font-bold hover:bg-yellow-500 w-full sm:w-auto"
                >
                  <Link href="/user/register">
                    Get Started <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="bg-white text-[#003873] hover:bg-gray-100 hover:text-[#003873] w-full sm:w-auto">
                  <Link href="/track">Track Shipment</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-br from-[#0066CC]/20 to-[#FFD700]/20 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <Globe className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 text-[#FFD700] mx-auto mb-2 md:mb-4" />
                <p className="text-white text-sm sm:text-base md:text-lg">Global Shipping Network</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <StatsBanner />

      {/* Carousel Section */}
      <CarouselSection />

      <Separator />

      {/* Features Section */}
      <section className="w-full px-4 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-foreground px-4"
          >
            Why Choose Mediterranean Shipping Express
          </motion.h2>
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: MapPin, title: "Global Coverage", description: "150+ countries with reliable delivery partners" },
              { icon: Zap, title: "Real-time Tracking", description: "Live GPS tracking and instant status updates" },
              { icon: Clock, title: "Fast Delivery", description: "Express options with guaranteed delivery windows" },
              { icon: Shield, title: "Secure & Insured", description: "Full cargo insurance and secure handling" },
              { icon: Truck, title: "Multiple Transport", description: "Air, sea, land, and multimodal shipping" },
              {
                icon: BarChart3,
                title: "Competitive Pricing",
                description: "Dynamic rates based on market conditions",
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-4 sm:p-6 h-full hover:shadow-lg transition-shadow duration-300 hover:scale-105">
                    <CardContent className="p-0">
                      <Icon className="mb-3 sm:mb-4 h-8 w-8 sm:h-10 sm:w-10 text-[#0066CC]" />
                      <h3 className="mb-2 font-semibold text-base sm:text-lg text-foreground">{feature.title}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <Separator />

      {/* How It Works */}
      <section className="w-full px-4 py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-foreground px-4">How It Works</h2>
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: 1, title: "Create Account", description: "Sign up and verify your email" },
              { step: 2, title: "Book Shipment", description: "Enter package details and destination" },
              { step: 3, title: "Pickup & Transit", description: "We pick up and ship your package" },
              { step: 4, title: "Track & Receive", description: "Monitor in real-time until delivery" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#0066CC] text-white font-bold text-base sm:text-lg">
                  {item.step}
                </div>
                <h3 className="mb-2 font-semibold text-foreground text-base sm:text-lg">{item.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xs">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <TestimonialsCarousel />

      <Separator />

      {/* CTA Section */}
      <section className="w-full px-4 py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-[#003873] to-[#0066CC]">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4"
          >
            Ready to Transform Your Logistics?
          </motion.h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-6 sm:mb-8 px-4 max-w-2xl mx-auto">
            Join thousands of businesses shipping smarter with Mediterranean Shipping Express
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
            <Button
              asChild
              size="lg"
              className="bg-[#FFD700] text-[#003873] font-bold hover:bg-yellow-500 w-full sm:w-auto"
            >
              <Link href="/user/register">Start Free Trial</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="bg-white text-[#003873] hover:bg-gray-100 hover:text-[#003873] w-full sm:w-auto">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
