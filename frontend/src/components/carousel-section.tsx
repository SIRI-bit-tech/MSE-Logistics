"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  {
    title: "Real-Time Global Tracking",
    description: "Track your shipments across 200+ countries with live GPS updates",
    image: "/logistics-tracking-gps-map.jpg",
    color: "from-blue-600 to-blue-800",
  },
  {
    title: "Competitive Pricing",
    description: "Dynamic rates optimized for your shipping needs and budget",
    image: "/pricing-dashboard-analytics.jpg",
    color: "from-green-600 to-green-800",
  },
  {
    title: "24/7 Customer Support",
    description: "Always available to help with your logistics needs",
    image: "/customer-support-team.jpg",
    color: "from-purple-600 to-purple-800",
  },
]

export default function CarouselSection() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoplay])

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
    setAutoplay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    setAutoplay(false)
  }

  return (
    <section className="w-full px-4 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="relative h-96 md:h-96 overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait">
            {slides.map(
              (slide, idx) =>
                idx === current && (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className={`absolute inset-0 bg-gradient-to-r ${slide.color} flex items-center justify-center`}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
                      <h3 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h3>
                      <p className="text-lg md:text-xl text-gray-100 mb-8">{slide.description}</p>
                    </div>
                  </motion.div>
                ),
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 rounded-full p-2 transition"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 rounded-full p-2 transition"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrent(idx)
                  setAutoplay(false)
                }}
                className={`h-2 rounded-full transition ${idx === current ? "bg-white w-8" : "bg-white/50 w-2"}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
