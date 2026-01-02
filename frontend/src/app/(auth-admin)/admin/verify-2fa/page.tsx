"use client"

import { Button, Card, Input } from "@heroui/react"
import { useState } from "react"
import { Shield } from "lucide-react"

export default function Verify2FA() {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleVerify = async () => {
    setLoading(true)
    setError("")

    try {
      // TODO: Implement 2FA verification
      console.log("Verifying 2FA code:", code)
    } catch (err) {
      setError("Invalid code. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <Card className="w-full max-w-md p-8 bg-slate-950 border border-slate-800">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="h-10 w-10 text-[#FFD700]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Two-Factor Authentication</h1>
          <p className="text-slate-400">Enter your 2FA code from your authenticator app</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-900 text-red-200 rounded-lg text-sm">{error}</div>}

        <div className="space-y-4">
          <Input
            label="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="000000"
            maxLength={6}
            className="dark"
          />

          <Button onClick={handleVerify} color="primary" className="w-full bg-[#0066CC]" size="lg" isLoading={loading}>
            Verify
          </Button>
        </div>
      </Card>
    </div>
  )
}
