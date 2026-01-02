import { create } from "zustand"
import type { User } from "../../global"

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  setToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  setToken: (token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token)
    }
    set({ token })
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
    }
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    })
  },
}))
