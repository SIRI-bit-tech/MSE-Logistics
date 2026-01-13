"use client"

import { Card, CardBody, CardHeader, Button } from "@nextui-org/react"
import { Headphones, Calculator } from "lucide-react"
import Link from "next/link"

export default function QuickSupport() {
  const handleChatNow = () => {
    // Open chat widget or redirect to support page
    window.open('/support', '_blank')
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <h3 className="text-xl font-bold text-gray-900">Quick Support</h3>
      </CardHeader>
      <CardBody className="pt-0 space-y-4">
        {/* 24/7 Logistics Support */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="p-2 bg-msc-yellow rounded-lg">
            <Headphones className="w-5 h-5 text-black" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">24/7 Logistics Support</h4>
            <p className="text-sm text-gray-600 mb-3">
              Need help with a shipment? Our agents are online.
            </p>
            <Button 
              size="sm" 
              className="bg-msc-yellow text-black hover:bg-msc-gold"
              onClick={handleChatNow}
            >
              Chat Now
            </Button>
          </div>
        </div>

        {/* Shipping Rate Calculator */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="p-2 bg-msc-yellow rounded-lg">
            <Calculator className="w-5 h-5 text-black" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">Shipping Rate Calculator</h4>
            <p className="text-sm text-gray-600 mb-3">
              Estimate costs for your next Mediterranean freight.
            </p>
            <Link href="/quotes">
              <Button 
                size="sm" 
                variant="bordered"
                className="border-msc-yellow text-msc-yellow hover:bg-msc-yellow hover:text-black"
              >
                Open
              </Button>
            </Link>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}