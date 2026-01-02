"use client"

import type React from "react"

import { Button, Card, Input, Link as HeroLink, Divider } from "@heroui/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, Chrome } from "lucide-react"

export default function Login() {
  const router = useRouter()
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
      // TODO: Implement login API call
      console.log("Login:", formData)
      router.push("/dashboard")
    } catch (err) {
      setError("Login failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthLogin = (provider: string) => {
    // TODO: Implement OAuth login
    console.log("OAuth login with:", provider)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-slate-950 dark:to-slate-900 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-foreground-600">Sign in to your Mediterranean Shipping Express account</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="flex justify-end">
            <HeroLink href="/user/forgot-password" className="text-sm text-[#0066CC]">
              Forgot password?
            </HeroLink>
          </div>

          <Button type="submit" color="primary" className="w-full bg-[#0066CC]" size="lg" isLoading={loading}>
            Sign In
          </Button>
        </form>

        <Divider className="my-6" />

        <div className="space-y-3">
          <Button
            variant="bordered"
            className="w-full"
            startContent={<Chrome className="h-4 w-4" />}
            onClick={() => handleOAuthLogin("google")}
          >
            Sign in with Google
          </Button>
          <Button variant="bordered" className="w-full" onClick={() => handleOAuthLogin("facebook")}>
            Sign in with Facebook
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-foreground-600">
            Don't have an account?{" "}
            <HeroLink href="/user/register" className="text-[#0066CC] font-semibold">
              Sign up
            </HeroLink>
          </p>
        </div>
      </Card>
    </div>
  )
}
