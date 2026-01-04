"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/store/auth-store"
import { useRouter } from "next/navigation"

export function useAuth() {
  const router = useRouter()
  const { user, isAuthenticated, setUser, logout } = useAuthStore()

  useEffect(() => {
    // Authentication is now handled via httpOnly cookies
    // No need to read from localStorage
    // User data will be fetched from server-side session
  }, [])

  const loginWithAuth0 = () => {
    // Integration with Auth0
    window.location.href = `/api/auth/login?returnTo=${window.location.origin}/dashboard`
  }

  const logoutUser = async () => {
    try {
      // Call server-side logout to clear httpOnly cookie
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      logout()
      router.push("/")
    }
  }

  return {
    user,
    isAuthenticated,
    setUser,
    loginWithAuth0,
    logout: logoutUser,
  }
}
