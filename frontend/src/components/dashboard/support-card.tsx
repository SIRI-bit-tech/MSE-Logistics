"use client"

import { Card, CardBody, Button, Link } from "@nextui-org/react"
import { Phone } from "lucide-react"

export default function SupportCard() {
  return (
    <Card className="bg-gray-900 text-white">
      <CardBody className="p-6">
        <h3 className="text-lg font-semibold mb-2">Need Assistance?</h3>
        <p className="text-gray-300 text-sm mb-4">24/7 Support Line</p>
        <Button
          as={Link}
          href="tel:+18005550199"
          className="bg-msc-yellow text-black font-semibold w-full"
          startContent={<Phone className="w-4 h-4" />}
        >
          +1 (800) 555-0199
        </Button>
      </CardBody>
    </Card>
  )
}