"use client"

import { Card, Divider, Image } from "@nextui-org/react"
import { Users, Target, Zap } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-foreground">About Mediterranean Shipping Express</h1>

        <div className="mb-12 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-foreground">Our Story</h2>
            <p className="mb-4 text-foreground-700">
              Founded in 2020, Mediterranean Shipping Express emerged from a simple vision: to transform international logistics
              through technology and reliability.
            </p>
            <p className="mb-4 text-foreground-700">
              We started with a small team of logistics experts and software engineers who understood the pain points of
              global shipping. Today, we operate in 150+ countries with a network of trusted partners.
            </p>
            <p className="text-foreground-700">
              Our commitment to innovation and customer satisfaction drives everything we do.
            </p>
          </div>
          <Image src="/company-office-team-logistics.jpg" alt="Mediterranean Shipping Express Team" className="rounded-xl" />
        </div>

        <Divider className="my-12" />

        <div className="mb-12">
          <h2 className="mb-8 text-2xl font-bold text-foreground">Our Values</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Target, title: "Reliability", description: "On-time delivery, every time" },
              { icon: Users, title: "Customer First", description: "Your satisfaction is our priority" },
              { icon: Zap, title: "Innovation", description: "Cutting-edge technology for logistics" },
            ].map((value, i) => {
              const Icon = value.icon
              return (
                <Card key={i} className="p-6">
                  <Icon className="mb-4 h-8 w-8 text-[#0066CC]" />
                  <h3 className="mb-2 font-semibold text-foreground">{value.title}</h3>
                  <p className="text-sm text-foreground-600">{value.description}</p>
                </Card>
              )
            })}
          </div>
        </div>

        <Divider className="my-12" />

        <div>
          <h2 className="mb-8 text-2xl font-bold text-foreground">By The Numbers</h2>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { number: "150+", label: "Countries" },
              { number: "1M+", label: "Shipments/Year" },
              { number: "99.2%", label: "On-Time Delivery" },
              { number: "24/7", label: "Customer Support" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-[#0066CC]">{stat.number}</div>
                <div className="text-foreground-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
