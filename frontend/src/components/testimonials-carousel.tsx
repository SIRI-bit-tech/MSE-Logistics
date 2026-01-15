"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    name: "Sarah Chen",
    company: "TechCorp",
    role: "Logistics Director",
    text: "Mediterranean Shipping Express reduced our shipping costs by 35% while improving delivery times significantly. The real-time tracking feature is invaluable.",
    rating: 5,
    image: "/professional-woman-avatar.jpg",
  },
  {
    name: "James Wilson",
    company: "RetailMax",
    role: "Operations Manager",
    text: "Seamless integration with our existing systems. The API documentation is excellent and support team is always responsive.",
    rating: 5,
    image: "/professional-man-avatar.jpg",
  },
  {
    name: "Maria Garcia",
    company: "FreshFood Co",
    role: "Supply Chain Lead",
    text: "The mobile app is incredibly intuitive and the dashboard gives us complete visibility into our logistics operations.",
    rating: 5,
    image: "/professional-woman-avatar-2.jpg",
  },
  {
    name: "Ahmed Hassan",
    company: "GlobalTrade",
    role: "CEO",
    text: "Outstanding platform. We handle 500+ shipments daily with zero issues. The automation features save us countless hours.",
    rating: 5,
    image: "/professional-man-avatar-2.jpg",
  },
]

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="w-full px-4 py-12 md:py-20 bg-gray-50 dark:bg-slate-900">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Trusted by Industry Leaders
        </h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            {testimonials.map(
              (testimonial, idx) =>
                idx === current && (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="p-8 md:p-12">
                      <CardContent className="p-0">
                        <div className="flex flex-col items-center text-center">
                          <div className="flex mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
                            ))}
                          </div>
                          <p className="text-lg md:text-xl text-foreground mb-6 italic">{testimonial.text}</p>
                          <div>
                            <p className="font-semibold text-foreground">{testimonial.name}</p>
                            <p className="text-sm text-foreground-600">{testimonial.role}</p>
                            <p className="text-sm text-[#0066CC] font-semibold">{testimonial.company}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ),
            )}
          </AnimatePresence>

          {/* Navigation */}
          <Button
            onClick={prev}
            variant="default"
            size="icon"
            className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 bg-[#0066CC] hover:bg-[#003873] text-white rounded-full"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            onClick={next}
            variant="default"
            size="icon"
            className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 bg-[#0066CC] hover:bg-[#003873] text-white rounded-full"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2 rounded-full transition ${idx === current ? "bg-[#0066CC] w-8" : "bg-gray-300 w-2"}`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
