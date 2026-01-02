"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { Spinner } from "@nextui-org/react"

export default function CallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setToken } = useAuthStore()

  useEffect(() => {
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    if (code) {
      // Exchange code for token with backend
      const token = code // This should be exchanged properly
      setToken(token)
      router.push("/dashboard")
    } else {
      router.push("/auth/login")
    }
  }, [searchParams, router, setToken])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4">Completing your sign in...</p>
      </div>
    </div>
  )
}
