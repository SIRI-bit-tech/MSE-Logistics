"use client"

import { Phone } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SupportCard() {
  return (
    <Card className="bg-gray-900 text-white border-gray-900">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-2">Need Assistance?</h3>
        <p className="text-gray-300 text-sm mb-4">24/7 Support Line</p>
        <Button
          asChild
          className="bg-msc-yellow text-black font-semibold w-full hover:bg-msc-gold"
        >
          <Link href="tel:+18005550199" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            +1 (800) 555-0199
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
