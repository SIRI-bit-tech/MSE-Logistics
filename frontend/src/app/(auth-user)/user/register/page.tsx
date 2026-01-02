"use client"

import type React from "react"

import { Button, Card, Input, Link as HeroLink } from "@heroui/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, User } from "lucide-react"

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      // TODO: Implement registration API call
      console.log("Register:", formData)
      router.push("/user/verify-email")
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-slate-950 dark:to-slate-900 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-foreground-600">Join Mediterranean Shipping Express today</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              startContent={<User className="h-4 w-4" />}
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              startContent={<User className="h-4 w-4" />}
            />
          </div>

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            startContent={<Mail className="h-4 w-4" />}
          />

          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            startContent={<Lock className="h-4 w-4" />}
          />

          <Input
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
            startContent={<Lock className="h-4 w-4" />}
          />

          <Button type="submit" color="primary" className="w-full bg-[#0066CC]" size="lg" isLoading={loading}>
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-foreground-600">
            Already have an account?{" "}
            <HeroLink href="/user/login" className="text-[#0066CC] font-semibold">
              Sign in
            </HeroLink>
          </p>
        </div>
      </Card>
    </div>
  )
}
