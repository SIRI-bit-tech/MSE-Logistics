"use client"

import type React from "react"

import { Button, Card, Input } from "@nextui-org/react"
import { useState } from "react"
import { Mail, Lock, Shield } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function AdminLogin() {
  const router = useRouter()
  const { loginWithCredentials } = useAuth()
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
      const result = await loginWithCredentials(formData.email, formData.password)
      
      if (result.success) {
        toast.success("Login successful!")
        router.push("/admin/dashboard")
      } else {
        setError(result.error || "Login failed. Please check your credentials.")
      }
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
            classNames={{
              input: "text-white",
              inputWrapper: "bg-slate-800 border-slate-700"
            }}
          />

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

          <Button type="submit" color="primary" className="w-full bg-[#0066CC]" size="lg" isLoading={loading}>
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          <p>Need an admin account? <a href="/admin/register" className="text-[#0066CC] hover:underline">Register here</a></p>
          <p className="mt-2">This portal is restricted to authorized administrators only.</p>
        </div>
      </Card>
    </div>
  )
}
