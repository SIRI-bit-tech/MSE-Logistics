"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Zap, Truck, Plane } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Package,
    title: "Standard Shipping",
    description: "Reliable delivery in 5-7 business days",
    features: ["Door-to-door delivery", "Tracking included", "Insurance available"],
    price: "From $15.99",
  },
  {
    icon: Zap,
    title: "Express Delivery",
    description: "Fast delivery in 2-3 business days",
    features: ["Priority handling", "Real-time tracking", "Guaranteed delivery"],
    price: "From $39.99",
  },
  {
    icon: Plane,
    title: "Air Freight",
    description: "Ultra-fast international shipping",
    features: ["Next-day delivery available", "Premium packaging", "Full insurance"],
    price: "From $99.99",
  },
  {
    icon: Truck,
    title: "Freight Services",
    description: "Heavy and bulk item shipping",
    features: ["Specialized handling", "Custom routing", "Dedicated support"],
    price: "Quote on demand",
  },
]

export default function Services() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-4xl font-bold text-foreground">Our Services</h1>
        <p className="mb-12 text-lg text-muted-foreground">Choose the shipping option that works best for you</p>

        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <Card key={i} className="p-6 flex flex-col">
                <CardContent className="p-0 flex flex-col h-full">
                  <Icon className="mb-4 h-10 w-10 text-[#0066CC]" />
                  <h3 className="mb-2 text-xl font-bold text-foreground">{service.title}</h3>
                  <p className="mb-4 text-muted-foreground">{service.description}</p>
                  <ul className="mb-6 flex-1 space-y-2">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#0066CC]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mb-4 text-lg font-bold text-[#0066CC]">{service.price}</div>
                  <Button asChild className="bg-[#0066CC] hover:bg-[#0052A3]">
                    <Link href="/shipments/new">Ship Now</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
