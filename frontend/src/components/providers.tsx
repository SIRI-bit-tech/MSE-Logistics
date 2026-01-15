"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { Toaster } from "@/components/ui/sonner"
import { useAuthStore } from "@/store/auth-store"

export function Providers({ children }: { children: React.ReactNode }) {
  const hasInitialized = useRef(false)

  // Initialize auth once at the app level using ref to prevent re-runs
  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    const initAuth = async () => {
      const { setUser, setLoading } = useAuthStore.getState()
      setLoading(true)
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
        })
        
        if (response.ok) {
          const userData = await response.json()
          setUser(userData.user)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
