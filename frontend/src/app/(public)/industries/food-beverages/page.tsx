"use client"

import { motion } from "framer-motion"
import { Coffee, Thermometer, Clock, Globe, Shield, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FoodBeveragesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full">
        <Image
          src="/industries/food-beverages.jpg"
          alt="Food & Beverages Industry"
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
              <Coffee className="w-12 h-12 text-[#D4AF37]" />
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Food & Beverages
              </h1>
            </div>
            <p className="text-xl text-gray-100 max-w-3xl">
              Specialized cold chain logistics and temperature-controlled transportation 
              for food and beverage products, ensuring freshness and quality worldwide.
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
                Cold Chain Excellence
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Thanks to a dedicated approach servicing the food and beverage industries, 
                MSE understands the unique needs of the sector, including the cold chain. 
                Food safety and quality preservation are our top priorities.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                From fresh produce to frozen goods, from beverages to processed foods, we provide 
                comprehensive temperature-controlled logistics solutions that maintain product 
                integrity from origin to destination, ensuring your products reach consumers fresh and safe.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/food-beverages.jpg"
                alt="Food Processing Facility"
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
            Specialized Food & Beverage Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <Thermometer className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cold Chain Management</h3>
              <p className="text-gray-700">
                Complete temperature-controlled logistics from -25°C to +25°C with 
                real-time monitoring and automated alerts for temperature deviations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <Shield className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Food Safety Compliance</h3>
              <p className="text-gray-700">
                Full compliance with HACCP, FDA, and international food safety standards. 
                Certified facilities and trained personnel ensure product integrity.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <Clock className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fresh Produce Logistics</h3>
              <p className="text-gray-700">
                Specialized handling for perishable goods with optimized transit times 
                and controlled atmosphere solutions for maximum freshness.
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
              Why Food & Beverage Companies Choose MSE
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Advanced Cold Storage</h4>
                    <p className="text-blue-100">
                      State-of-the-art refrigerated containers and cold storage facilities 
                      with precise temperature and humidity control.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Real-Time Monitoring</h4>
                    <p className="text-blue-100">
                      24/7 temperature and location tracking with immediate alerts 
                      for any deviations from specified parameters.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Food Safety Certification</h4>
                    <p className="text-blue-100">
                      All facilities are certified for food handling with regular 
                      audits and compliance with international food safety standards.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Global Fresh Network</h4>
                    <p className="text-blue-100">
                      Extensive network connecting agricultural regions with consumer 
                      markets worldwide for optimal freshness.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Rapid Transit Times</h4>
                    <p className="text-blue-100">
                      Optimized routing and priority handling for perishable goods 
                      to minimize transit time and maximize shelf life.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Contamination Prevention</h4>
                    <p className="text-blue-100">
                      Strict protocols to prevent cross-contamination and maintain 
                      the highest standards of food safety and hygiene.
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
              Ready to Ship Your Food Products Fresh?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Partner with MSE for reliable, temperature-controlled food and beverage logistics. 
              Our cold chain expertise ensures your products reach consumers fresh and safe.
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