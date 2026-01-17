"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Lock } from "lucide-react"
import { useSearchParams } from "next/navigation"

export function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    if (passwords.password !== passwords.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    setError("")

    try {
      // TODO: Implement password reset
      console.log("Reset password with token:", token)
      setSuccess(true)
    } catch (err) {
      setError("Failed to reset password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="w-full max-w-md p-8 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Password Reset Successfully</h1>
        <p className="text-foreground-600 mb-6">
          Your password has been updated. Please log in with your new password.
        </p>
        <Button as="a" href="/user/login" color="primary" className="w-full bg-[#0066CC]">
          Go to Login
        </Button>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Set New Password</h1>
        <p className="text-foreground-600">Enter your new password below</p>
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

      <div className="space-y-4">
        <Input
          label="New Password"
          type="password"
          value={passwords.password}
          onChange={(e) => setPasswords({ ...passwords, password: e.target.value })}
          startContent={<Lock className="h-4 w-4" />}
        />

        <Input
          label="Confirm Password"
          type="password"
          value={passwords.confirmPassword}
          onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
          startContent={<Lock className="h-4 w-4" />}
        />

        <Button onClick={handleSubmit} color="primary" className="w-full bg-[#0066CC]" size="lg" isLoading={loading}>
          Reset Password
        </Button>
      </div>
    </Card>
  )
}
