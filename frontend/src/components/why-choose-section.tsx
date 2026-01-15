"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckCircle, Clock, Shield, Globe } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: CheckCircle,
    title: "99% On-Time Delivery",
    description: "Reliable scheduling and tracking"
  },
  {
    icon: Clock,
    title: "Fastest Transit Times",
    description: "Optimized routes and priority handling"
  },
  {
    icon: Shield,
    title: "Cargo Insurance",
    description: "Full protection for your shipments"
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Worldwide coverage and partnerships"
  }
]

export default function WhyChooseSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1605902711834-8b11c3e3ef2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Captain looking through binoculars"
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
            <div className="absolute bottom-6 left-6 bg-[#FFD700] text-black p-4 rounded-lg">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm font-medium">Years of Excellence</div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Why Choose MS Express?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              With over five decades of experience in global shipping, we've built a reputation 
              for reliability, innovation, and customer satisfaction that's second to none.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="bg-[#FFD700]/20 rounded-full p-2 flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-[#FFD700]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <Button 
              asChild
              size="lg" 
              className="bg-[#FFD700] hover:bg-[#D4AF37] text-black font-bold px-8"
            >
              <Link href="/about">
                Learn More About Us
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
