"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/store/auth-store"
import { useRouter } from "next/navigation"

export function useAuth() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, setUser, setLoading, logout } = useAuthStore()

  useEffect(() => {
    // Fetch user data on mount
    const fetchUserData = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
        })
        
        if (response.ok) {
          const userData = await response.json()
          setUser(userData.user)
        } else {
          // No valid session
          setUser(null)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [setUser, setLoading])

  const loginWithCredentials = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      if (!response.ok) {
        const errorMessage = result?.error || 'Login failed'
        throw new Error(errorMessage)
      }
      
      // Update user state immediately after successful login
      if (result.user) {
        setUser(result.user)
      } else {
        // Fallback: fetch user data if not included in response
        try {
          const userResponse = await fetch('/api/auth/me', {
            credentials: 'include',
          })
          if (userResponse.ok) {
            const userData = await userResponse.json()
            setUser(userData.user)
          }
        } catch (error) {
          console.error('Error fetching user data after login:', error)
        }
      }
      
      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      
      // Provide user-friendly error messages
      let userMessage = "Login failed. Please try again."
      
      if (error instanceof Error) {
        if (error.message.includes('Invalid email or password')) {
          userMessage = "Invalid email or password."
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          userMessage = "Network error. Please check your connection."
        }
      }
      
      return { 
        success: false, 
        error: userMessage
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
      // Use direct API registration instead of GraphQL
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        const errorMessage = result?.message || result?.error || 'Registration failed'
        throw new Error(errorMessage)
      }

      return { success: true }
    } catch (error) {
      console.error("Registration error:", error)
      
      // Provide user-friendly error messages
      let userMessage = "Registration failed. Please try again."
      
      if (error instanceof Error) {
        if (error.message.includes('email') || error.message.includes('already exists')) {
          userMessage = "Email address is already in use."
        } else if (error.message.includes('password')) {
          userMessage = "Password does not meet requirements."
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          userMessage = "Network error. Please check your connection."
        }
      }
      
      return { 
        success: false, 
        error: userMessage
      }
    }
  }

  const logoutUser = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
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
