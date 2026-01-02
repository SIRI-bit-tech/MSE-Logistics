"use client"

import { Button, Card, Input } from "@heroui/react"
import { useState } from "react"
import { Mail, ArrowRight } from "lucide-react"

export default function VerifyEmail() {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  const handleVerify = async () => {
    setLoading(true)
    try {
      // TODO: Implement email verification
      console.log("Verifying code:", code)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-slate-950 dark:to-slate-900 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Mail className="h-12 w-12 text-[#0066CC]" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Verify Your Email</h1>
          <p className="text-foreground-600">We sent a verification code to your email</p>
        </div>

        <div className="space-y-4">
          <Input
            label="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="000000"
            size="lg"
          />

          <Button
            onClick={handleVerify}
            color="primary"
            className="w-full bg-[#0066CC]"
            size="lg"
            isLoading={loading}
            endContent={<ArrowRight className="h-4 w-4" />}
          >
            Verify Email
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-foreground-600">
          <p>Didn't receive the code? Check your spam folder or request a new one.</p>
        </div>
      </Card>
    </div>
  )
}
