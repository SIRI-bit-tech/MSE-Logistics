import { create } from "zustand"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  profileImage?: string
  role: "CUSTOMER" | "DRIVER" | "ADMIN" | "SUPER_ADMIN"
  createdAt: Date
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: User) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
      isLoading: false,
    }),

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  },
}))
