"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/store/auth-store"
import { useRouter } from "next/navigation"
import { useSession, signIn, signUp, signOut } from "@/lib/auth-client"

export function useAuth() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, setUser, setLoading, logout } = useAuthStore()
  const { data: session, isPending } = useSession()

  useEffect(() => {
    if (isPending) {
      setLoading(true)
      return
    }

    if (session?.user) {
      // Parse name into firstName and lastName
      const nameParts = session.user.name?.split(' ') || []
      const firstName = nameParts[0] || ""
      const lastName = nameParts.slice(1).join(' ') || ""
      
      setUser({
        id: session.user.id,
        email: session.user.email,
        firstName,
        lastName,
        phone: undefined, // Better Auth doesn't store phone by default
        profileImage: session.user.image || undefined,
        role: "CUSTOMER", // Default role, you can extend Better Auth to store roles
        createdAt: new Date(session.user.createdAt),
      })
    } else {
      setLoading(false)
    }
  }, [session, isPending, setUser, setLoading])

  const loginWithCredentials = async (email: string, password: string) => {
    try {
      const result = await signIn.email({
        email,
        password,
      })
      
      if (result.error) {
        throw new Error(result.error.message)
      }
      
      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Login failed" 
      }
    }
  }

  const registerWithCredentials = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string
  ) => {
    try {
      const result = await signUp.email({
        email,
        password,
        name: `${firstName} ${lastName}`,
        callbackURL: "/shipments"
      })
      
      if (result.error) {
        throw new Error(result.error.message)
      }
      
      return { success: true }
    } catch (error) {
      console.error("Registration error:", error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Registration failed" 
      }
    }
  }

  const logoutUser = async () => {
    try {
      await signOut()
      logout()
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
      logout()
      router.push("/")
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    loginWithCredentials,
    registerWithCredentials,
    logout: logoutUser,
  }
}
