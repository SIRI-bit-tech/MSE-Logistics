"use client"

import type React from "react"

import { Button, Card, Input } from "@heroui/react"
import { useState } from "react"
import { Mail, Lock, Shield } from "lucide-react"

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // TODO: Implement admin login
      console.log("Admin login:", formData)
    } catch (err) {
      setError("Login failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <Card className="w-full max-w-md p-8 bg-slate-950 border border-slate-800">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="h-10 w-10 text-[#0066CC]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-slate-400">Secure login for administrators</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-900 text-red-200 rounded-lg text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            startContent={<Mail className="h-4 w-4" />}
            className="dark"
          />

          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            startContent={<Lock className="h-4 w-4" />}
            className="dark"
          />

          <Button type="submit" color="primary" className="w-full bg-[#0066CC]" size="lg" isLoading={loading}>
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          <p>This portal is restricted to authorized administrators only.</p>
        </div>
      </Card>
    </div>
  )
}
