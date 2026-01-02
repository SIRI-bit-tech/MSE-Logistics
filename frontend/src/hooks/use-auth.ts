"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/store/auth-store"
import { useRouter } from "next/navigation"

export function useAuth() {
  const router = useRouter()
  const { user, token, isAuthenticated, setUser, setToken, logout } = useAuthStore()

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      setToken(token)
      // Fetch user data from API
    }
  }, [])

  const loginWithAuth0 = () => {
    // Integration with Auth0
    window.location.href = `/api/auth/login?returnTo=${window.location.origin}/dashboard`
  }

  const logoutUser = () => {
    logout()
    router.push("/")
  }

  return {
    user,
    token,
    isAuthenticated,
    setUser,
    loginWithAuth0,
    logout: logoutUser,
  }
}
