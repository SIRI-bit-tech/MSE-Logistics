"use client"

import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import GreenFutureSection from "@/components/green-future-section"
import MovingWorldSection from "@/components/moving-world-section"
import IndustriesSection from "@/components/industries-section"
import WhyChooseSection from "@/components/why-choose-section"
import CustomerAdvisories from "@/components/customer-advisories"
import OurSolutionsSection from "@/components/our-solutions-section"
import CTASection from "@/components/cta-section"

export default function Home() {
  return (
    <div className="w-full bg-white">
      <HeroSection />
      <FeaturesSection />
      <GreenFutureSection />
      <MovingWorldSection />
      <IndustriesSection />
      <WhyChooseSection />
      <OurSolutionsSection />
      <CustomerAdvisories />
      <CTASection />
    </div>
  )
}
