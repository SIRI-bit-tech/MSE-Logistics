"use client"

import { Button, Card, Input, Link as NextUILink } from "@nextui-org/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function Login() {
  const router = useRouter()
  const { loginWithCredentials } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await loginWithCredentials(formData.email, formData.password)
      
      if (result.success) {
        router.push("/shipments")
      } else {
        setError(result.error || "Login failed. Please check your credentials.")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
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
            <NextUILink href="/user/forgot-password" className="text-sm text-[#0066CC]">
              Forgot password?
            </NextUILink>
          </div>

          <Button type="submit" color="primary" className="w-full bg-[#0066CC]" size="lg" isLoading={loading}>
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-foreground-600">
            Don't have an account?{" "}
            <NextUILink href="/user/register" className="text-[#0066CC] font-semibold">
              Sign up
            </NextUILink>
          </p>
        </div>
      </Card>
    </div>
  )
}
