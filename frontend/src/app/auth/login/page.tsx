"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardBody, CardHeader, Input, Button, Link, Divider } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import toast from "react-hot-toast"

export default function LoginPage() {
  const router = useRouter()
  const { setToken, setUser } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Integration with Auth0
      // This is a placeholder for Auth0 authentication
      toast.success("Login successful!")
      router.push("/dashboard")
    } catch (error) {
      toast.error("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003873] to-[#0066CC] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-start px-6 py-4">
          <h1 className="text-2xl font-bold text-[#003873]">Sign In</h1>
          <p className="text-gray-600 mt-2">Access your Mediterranean Shipping Express account</p>
        </CardHeader>
        <Divider />
        <CardBody className="gap-4 p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              color="primary"
              className="w-full bg-[#0066CC]"
              disabled={loading}
              isLoading={loading}
            >
              Sign In
            </Button>
          </form>

          <Divider />

          <Button
            variant="bordered"
            className="w-full border-[#0066CC] text-[#0066CC]"
            onClick={() => {
              // Auth0 Google login
              toast.info("Redirecting to Auth0...")
            }}
          >
            Sign in with Google
          </Button>

          <Button
            variant="bordered"
            className="w-full border-[#0066CC] text-[#0066CC]"
            onClick={() => {
              // Auth0 Facebook login
              toast.info("Redirecting to Auth0...")
            }}
          >
            Sign in with Facebook
          </Button>

          <div className="text-center pt-4">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-[#0066CC] font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
