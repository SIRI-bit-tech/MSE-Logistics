"use client"

import type React from "react"

import { Button, Card, Input, Select, SelectItem } from "@nextui-org/react"
import { useState } from "react"
import { Mail, Lock, Shield, User, Phone } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function AdminRegister() {
  const router = useRouter()
  const { registerWithCredentials } = useAuth()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "ADMIN",
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

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setLoading(true)

    try {
      const result = await registerWithCredentials(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      )

      if (result.success) {
        toast.success("Admin account created successfully!")
        router.push("/admin/dashboard")
      } else {
        setError(result.error || "Registration failed")
      }
    } catch (err) {
      setError("Registration failed. Please try again.")
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
          <h1 className="text-3xl font-bold text-white mb-2">Admin Registration</h1>
          <p className="text-slate-400">Create administrator account</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-900 text-red-200 rounded-lg text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              startContent={<User className="h-4 w-4" />}
              classNames={{
                input: "text-white",
                inputWrapper: "bg-slate-800 border-slate-700"
              }}
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              startContent={<User className="h-4 w-4" />}
              classNames={{
                input: "text-white",
                inputWrapper: "bg-slate-800 border-slate-700"
              }}
            />
          </div>

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            startContent={<Mail className="h-4 w-4" />}
            classNames={{
              input: "text-white",
              inputWrapper: "bg-slate-800 border-slate-700"
            }}
          />

          <Input
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            startContent={<Phone className="h-4 w-4" />}
            classNames={{
              input: "text-white",
              inputWrapper: "bg-slate-800 border-slate-700"
            }}
          />

          <Select
            label="Role"
            selectedKeys={[formData.role]}
            onSelectionChange={(keys) => {
              const selectedRole = Array.from(keys)[0] as string
              setFormData({ ...formData, role: selectedRole })
            }}
            classNames={{
              trigger: "bg-slate-800 border-slate-700",
              value: "text-white"
            }}
          >
            <SelectItem key="ADMIN" value="ADMIN">Administrator</SelectItem>
            <SelectItem key="SUPER_ADMIN" value="SUPER_ADMIN">Super Administrator</SelectItem>
          </Select>

          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            startContent={<Lock className="h-4 w-4" />}
            classNames={{
              input: "text-white",
              inputWrapper: "bg-slate-800 border-slate-700"
            }}
          />

          <Input
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
            startContent={<Lock className="h-4 w-4" />}
            classNames={{
              input: "text-white",
              inputWrapper: "bg-slate-800 border-slate-700"
            }}
          />

          <Button 
            type="submit" 
            color="primary" 
            className="w-full bg-[#0066CC]" 
            size="lg" 
            isLoading={loading}
          >
            Create Admin Account
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          <p>Already have an account? <a href="/admin/login" className="text-[#0066CC] hover:underline">Sign In</a></p>
        </div>
      </Card>
    </div>
  )
}