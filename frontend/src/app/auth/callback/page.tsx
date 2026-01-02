"use client"
import { Spinner } from "@nextui-org/react"
import CallbackContent from "@/components/auth/callback-content"
import { Suspense } from "react"

export default function CallbackPage() {
  return (
    <Suspense fallback={<CallbackLoadingState />}>
      <CallbackContent />
    </Suspense>
  )
}

function CallbackLoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4">Completing your sign in...</p>
      </div>
    </div>
  )
}
