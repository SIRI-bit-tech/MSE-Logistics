"use client"

import type React from "react"

import { Button, Card, Input, Textarea } from "@heroui/react"
import { Mail, Phone, MapPin } from "lucide-react"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-4xl font-bold text-foreground">Contact Us</h1>
        <p className="mb-12 text-lg text-foreground-600">We're here to help. Get in touch with our team.</p>

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {[
                { icon: Mail, label: "Email", value: "support@mse.com", href: "mailto:" },
                { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:" },
                { icon: MapPin, label: "Address", value: "123 Logistics Way, Global City, GC 12345", href: null },
              ].map((contact, i) => {
                const Icon = contact.icon
                return (
                  <div key={i} className="flex gap-4">
                    <Icon className="h-6 w-6 flex-shrink-0 text-[#0066CC]" />
                    <div>
                      <p className="text-sm font-semibold text-foreground-600">{contact.label}</p>
                      {contact.href ? (
                        <a href={contact.href + contact.value} className="text-foreground hover:text-[#0066CC]">
                          {contact.value}
                        </a>
                      ) : (
                        <p className="text-foreground">{contact.value}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <Card className="lg:col-span-2 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Input
                  label="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <Input
                label="Phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <Input
                label="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
              <Textarea
                label="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                minRows={5}
                required
              />
              <Button type="submit" color="primary" className="w-full bg-[#0066CC]" size="lg">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
