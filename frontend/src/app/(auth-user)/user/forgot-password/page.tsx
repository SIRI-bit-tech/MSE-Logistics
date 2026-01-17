"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Mail } from "lucide-react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // TODO: Implement password reset request
      console.log("Reset password for:", email)
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-slate-950 dark:to-slate-900 px-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <Mail className="h-12 w-12 text-[#0066CC]" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h1>
          <p className="text-foreground-600 mb-6">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <Button as="a" href="/user/login" color="primary" className="w-full bg-[#0066CC]">
            Back to Login
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-slate-950 dark:to-slate-900 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Reset Password</h1>
          <p className="text-foreground-600">Enter your email address and we'll send you a reset link</p>
        </div>

        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            startContent={<Mail className="h-4 w-4" />}
          />

          <Button onClick={handleSubmit} color="primary" className="w-full bg-[#0066CC]" size="lg" isLoading={loading}>
            Send Reset Link
          </Button>
        </div>

        <div className="mt-6 text-center">
          <a href="/user/login" className="text-[#0066CC] text-sm font-semibold">
            Back to login
          </a>
        </div>
      </Card>
    </div>
  )
}
