"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Calendar, Users, Target, TrendingDown, Leaf, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full">
        <Image
          src="/sustainability-hero.jpg"
          alt="Sustainability Report"
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
              <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-[#D4AF37] flex-shrink-0" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">2024 Sustainability Report</h1>
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-6 sm:mb-8 max-w-3xl">
              Our comprehensive annual report on environmental initiatives, progress metrics, and future commitments
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap max-w-lg">
              <Button size="lg" className="bg-[#D4AF37] text-[#212529] hover:bg-[#B8860B] font-bold hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Download PDF Report
              </Button>
              <Button asChild size="lg" className="bg-white/20 text-white border-2 border-white hover:bg-white hover:text-[#212529] font-bold backdrop-blur-sm hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                <Link href="/sustainability">View Online Version</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Report Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#212529] mb-6">Report Highlights</h2>
              <p className="text-lg text-[#6C757D] leading-relaxed mb-6">
                Our 2024 Sustainability Report provides a comprehensive overview of our environmental initiatives, 
                achievements, and commitments for the future. This year marks significant progress in our journey 
                toward carbon neutrality and sustainable shipping practices.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-[#D4AF37]" />
                  <span className="text-[#6C757D]">Published: January 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#D4AF37]" />
                  <span className="text-[#6C757D]">48 pages of comprehensive data and insights</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-[#D4AF37]" />
                  <span className="text-[#6C757D]">Stakeholder feedback and community impact</span>
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <Image
                src="/sustainability-commitment.jpg"
                alt="Sustainability Report Cover"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Key Metrics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-[#212529] mb-12 text-center">2024 Key Achievements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: TrendingDown, value: "32%", label: "CO₂ Reduction", description: "Compared to 2020 baseline" },
              { icon: Leaf, value: "85%", label: "Renewable Energy", description: "Across all facilities" },
              { icon: Target, value: "12", label: "Green Initiatives", description: "Launched this year" },
              { icon: Award, value: "5", label: "Certifications", description: "Environmental awards received" }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center border-2 border-[#D4AF37] hover:shadow-lg hover:scale-105 transition-all duration-300 group">
                  <CardContent className="p-8">
                    <metric.icon className="w-12 h-12 text-[#D4AF37] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-4xl font-bold text-[#212529] mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                      {metric.value}
                    </div>
                    <h3 className="text-xl font-semibold text-[#212529] mb-2">{metric.label}</h3>
                    <p className="text-[#6C757D] text-sm">{metric.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Report Sections */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-[#212529] mb-12 text-center">What's Inside the Report</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Executive Summary",
                description: "Key highlights and strategic overview of our sustainability journey",
                pages: "Pages 3-8"
              },
              {
                title: "Environmental Impact",
                description: "Detailed analysis of our carbon footprint and reduction initiatives",
                pages: "Pages 9-18"
              },
              {
                title: "Green Technology",
                description: "Innovations in fuel efficiency and renewable energy adoption",
                pages: "Pages 19-28"
              },
              {
                title: "Supply Chain Sustainability",
                description: "Partner collaboration and sustainable logistics practices",
                pages: "Pages 29-36"
              },
              {
                title: "Community Impact",
                description: "Social responsibility programs and community engagement",
                pages: "Pages 37-42"
              },
              {
                title: "Future Commitments",
                description: "2025-2030 roadmap and sustainability targets",
                pages: "Pages 43-48"
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg hover:scale-105 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#212529] mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                      {section.title}
                    </h3>
                    <p className="text-[#6C757D] mb-4 leading-relaxed">
                      {section.description}
                    </p>
                    <div className="text-sm text-[#D4AF37] font-semibold">
                      {section.pages}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Download CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-[#F8F9FA] rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold text-[#212529] mb-6">Ready to Explore Our Progress?</h2>
            <p className="text-xl text-[#6C757D] mb-8 max-w-3xl mx-auto">
              Download our comprehensive 2024 Sustainability Report to discover detailed insights into our 
              environmental initiatives, achievements, and future commitments.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-[#D4AF37] text-[#212529] hover:bg-[#B8860B] font-bold hover:scale-105 transition-all duration-300">
                <Download className="w-5 h-5 mr-2" />
                Download PDF (4.2 MB)
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#212529] font-bold hover:scale-105 transition-all duration-300">
                <Link href="/contact">Request Print Copy</Link>
              </Button>
            </div>
            <p className="text-sm text-[#6C757D] mt-4">
              Available in English, Spanish, and French • Last updated: January 15, 2025
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  )
}