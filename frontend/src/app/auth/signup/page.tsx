"use client"

import type React from "react"

import { useState } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Link,
  Divider,
  Checkbox,
  Select,
  SelectItem,
} from "@nextui-org/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    country: "",
    userType: "customer",
    agreeTerms: false,
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (!formData.agreeTerms) {
      toast.error("Please agree to the terms and conditions")
      return
    }

    setLoading(true)

    try {
      // Integration with Auth0
      toast.success("Account created successfully!")
      router.push("/dashboard")
    } catch (error) {
      toast.error("Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003873] to-[#0066CC] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-start px-6 py-4">
          <h1 className="text-2xl font-bold text-[#003873]">Create Account</h1>
          <p className="text-gray-600 mt-2">Join Mediterranean Shipping Express today</p>
        </CardHeader>
        <Divider />
        <CardBody className="gap-4 p-6">
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="First Name"
                placeholder="John"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <Input
                label="Last Name"
                placeholder="Doe"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Company"
              placeholder="Your company"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />

            <Select label="User Type" name="userType" value={formData.userType} onChange={handleChange}>
              <SelectItem key="customer" value="customer">
                Customer
              </SelectItem>
              <SelectItem key="business" value="business">
                Business
              </SelectItem>
              <SelectItem key="courier" value="courier">
                Courier Partner
              </SelectItem>
            </Select>

            <Input
              type="password"
              label="Password"
              placeholder="Create a strong password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Input
              type="password"
              label="Confirm Password"
              placeholder="Re-enter your password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <Checkbox name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} isRequired>
              <span className="text-sm">
                I agree to the{" "}
                <Link href="/terms" className="text-[#0066CC]">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#0066CC]">
                  Privacy Policy
                </Link>
              </span>
            </Checkbox>

            <Button
              type="submit"
              color="primary"
              className="w-full bg-[#0066CC]"
              disabled={loading}
              isLoading={loading}
            >
              Create Account
            </Button>
          </form>

          <div className="text-center pt-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-[#0066CC] font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
