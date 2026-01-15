"use client"

import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface ActionCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  color?: string
}

export default function ActionCard({ title, description, icon: Icon, href, color = "bg-msc-yellow" }: ActionCardProps) {
  return (
    <Link href={href} className="block">
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-6">
          <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4`}>
            <Icon className="w-6 h-6 text-black" />
          </div>
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
