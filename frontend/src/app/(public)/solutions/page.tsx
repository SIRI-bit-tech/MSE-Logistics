"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { 
  Zap, 
  Truck, 
  Globe, 
  MapPin, 
  Clock, 
  Shield, 
  Package, 
  Plane,
  Ship,
  FileText,
  Bell,
  CheckCircle
} from "lucide-react"

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full">
        <Image
          src="/ocean-freight-hero.jpg"
          alt="Our Solutions"
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
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Our Solutions
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl">
              Mediterranean Shipping Express offers four core shipping solutions designed to meet every business need. 
              From urgent express deliveries to cost-effective standard shipping, international freight to advanced tracking systems.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Express Shipping Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-[#FFB700] rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-black" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Express Shipping</h2>
              </div>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                When time is of the essence, our express shipping service delivers your packages with unmatched speed and reliability. 
                Whether you need same-day delivery within the city or next-day delivery across the country, we understand that some 
                shipments simply cannot wait.
              </p>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our express network operates around the clock, with dedicated vehicles and priority handling at every step. 
                We work with trusted partners who share our commitment to speed without compromising safety. Your urgent packages 
                receive special attention from pickup to delivery, ensuring they arrive exactly when you need them.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[#FFB700] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">24-Hour Delivery</h3>
                    <p className="text-gray-600">
                      Next-day delivery to major cities and business centers. Perfect for important documents, 
                      medical supplies, or critical business materials that need to arrive by tomorrow.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Zap className="w-6 h-6 text-[#FFB700] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Same Day Service</h3>
                    <p className="text-gray-600">
                      Ultra-fast delivery within the same day for local and regional shipments. Ideal for emergency 
                      parts, last-minute gifts, or urgent business needs that cannot wait until tomorrow.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-[#FFB700] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Priority Handling</h3>
                    <p className="text-gray-600">
                      Your express packages receive premium care throughout the journey. Special handling procedures, 
                      dedicated transport, and priority processing at all facilities ensure safe and swift delivery.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="/ocean-freight-container.jpg"
                alt="Express Shipping"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Standard Shipping Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl md:order-1"
            >
              <Image
                src="/intermodal-transport-hero.jpg"
                alt="Standard Shipping"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="md:order-2"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-[#FFB700] rounded-full flex items-center justify-center">
                  <Truck className="w-8 h-8 text-black" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Standard Shipping</h2>
              </div>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our standard shipping service provides the perfect balance of affordability and reliability for your everyday shipping needs. 
                This service is designed for businesses and individuals who want dependable delivery without the premium cost of express options.
              </p>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                We understand that not every shipment is urgent, but every shipment is important. Our standard service maintains the same 
                high standards of care and professionalism while offering competitive pricing. With predictable delivery times and 
                excellent customer service, it's the smart choice for regular shipping needs.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Truck className="w-6 h-6 text-[#FFB700] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Ground Transport</h3>
                    <p className="text-gray-600">
                      Reliable overland shipping using our extensive network of ground transportation. Perfect for 
                      packages that need to travel across the country with dependable delivery schedules.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Package className="w-6 h-6 text-[#FFB700] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Cost-Effective</h3>
                    <p className="text-gray-600">
                      Budget-friendly rates that don't compromise on quality or service. Ideal for regular shipments, 
                      bulk orders, or when you need reliable delivery at an affordable price point.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#FFB700] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Reliable Delivery</h3>
                    <p className="text-gray-600">
                      Consistent delivery times you can count on. We provide accurate delivery estimates and work 
                      hard to meet them, giving you peace of mind for your shipping needs.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* International Shipping Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-[#FFB700] rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-black" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">International Shipping</h2>
              </div>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Expand your business globally with our international shipping services. We connect you to markets worldwide 
                through our extensive network of international partners and shipping routes. Whether you're sending documents 
                to Europe or machinery to Asia, we handle the complexities of international logistics.
              </p>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                International shipping involves many moving parts - customs regulations, documentation, different transportation 
                modes, and varying delivery standards. Our experienced team navigates these challenges for you, ensuring your 
                international shipments move smoothly from origin to destination across borders and continents.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Plane className="w-6 h-6 text-[#FFB700] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Air Freight</h3>
                    <p className="text-gray-600">
                      Fast international delivery by air for time-sensitive shipments. Perfect for urgent business documents, 
                      high-value items, or when you need your packages to reach international destinations quickly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Ship className="w-6 h-6 text-[#FFB700] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Sea Freight</h3>
                    <p className="text-gray-600">
                      Cost-effective ocean shipping for large volumes and non-urgent shipments. Ideal for bulk goods, 
                      heavy machinery, or when you need to ship large quantities at economical rates.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FileText className="w-6 h-6 text-[#FFB700] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Customs Clearance</h3>
                    <p className="text-gray-600">
                      Expert handling of customs documentation and procedures. We manage the paperwork, duties, and 
                      regulations so your international shipments clear customs smoothly and efficiently.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="/ocean-freight-hero.jpg"
                alt="International Shipping"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Track & Trace Solutions Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl md:order-1"
            >
              <Image
                src="/logistics-tracking-gps-map.jpg"
                alt="Track & Trace Solutions"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="md:order-2"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-[#FFB700] rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-black" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Track & Trace Solutions</h2>
              </div>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Stay informed about your shipments every step of the way with our advanced tracking and tracing solutions. 
                We believe that visibility is key to peace of mind, which is why we provide detailed tracking information 
                from the moment your package leaves your hands until it reaches its destination.
              </p>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our tracking system goes beyond simple location updates. We provide detailed status information, estimated 
                delivery times, and proactive notifications about any changes or delays. Whether you're shipping one package 
                or managing hundreds of shipments, our tracking tools give you the visibility you need to stay in control.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#FFB700] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Live GPS Tracking</h3>
                    <p className="text-gray-600">
                      Follow your packages in motion with precise location updates. See exactly where your shipment 
                      is at any time, giving you complete visibility throughout the delivery journey.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Bell className="w-6 h-6 text-[#FFB700] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">SMS Notifications</h3>
                    <p className="text-gray-600">
                      Receive instant alerts on your mobile phone for important shipment updates. Get notified when 
                      your package is picked up, in transit, out for delivery, or successfully delivered.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[#FFB700] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Delivery Updates</h3>
                    <p className="text-gray-600">
                      Stay ahead with proactive communication about delivery schedules. We keep you informed about 
                      estimated arrival times and any changes that might affect your delivery.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/ocean-freight-hero.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Choose Your Perfect Shipping Solution?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you need express delivery, cost-effective standard shipping, international freight, or advanced tracking, 
              we have the right solution for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#D4AF37] text-black font-bold hover:bg-[#B8860B]"
              >
                <Link href="/auth/signup">Get Started Today</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white text-black font-bold hover:bg-gray-100"
              >
                <Link href="/contact">Speak with an Expert</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}