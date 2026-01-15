"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, User as UserIcon } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const { loginWithCredentials } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await loginWithCredentials(formData.email, formData.password)
      
      if (result.success) {
        toast.success("Login successful!")
        router.push("/shipments")
      } else {
        toast.error(result.error || "Login failed. Please try again.")
      }
    } catch (error: any) {
      console.error('Login error:', error)
      toast.error(error.message || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Ocean Background with Ship */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center"
        style={{
          backgroundImage: `url('/login-image.png')`
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-msc-yellow rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">⚓</span>
            </div>
            <span className="text-xl font-bold">MEDITERRANEAN SHIPPING EXPRESS</span>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Connecting the World,<br />
              One Container at a<br />
              Time.
            </h1>
            <div className="w-16 h-1 bg-msc-yellow mb-6"></div>
            <p className="text-xl text-gray-200 mb-8">
              Global Logistics. Personal Service.
            </p>
          </div>

          {/* Footer */}
          <div className="flex gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-msc-yellow">●</span>
              <span>Privacy Policy</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-msc-yellow">●</span>
              <span>Terms of Service</span>
            </div>
            <span>© {new Date().getFullYear()} MSE</span>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Login to Your Account</h2>
            <p className="text-gray-600">Secure authentication with Better Auth.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pr-10"
                  required
                />
                <UserIcon className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))}
                />
                <label
                  htmlFor="rememberMe"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-msc-yellow hover:text-msc-gold">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-msc-yellow hover:bg-msc-gold text-black font-semibold"
              disabled={loading}
            >
              {loading ? "Logging in..." : "LOG IN →"}
            </Button>

            <div className="text-center">
              <span className="text-gray-500">Or</span>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.push("/auth/signup")}
            >
              Register New Account
            </Button>

            <div className="text-center text-sm text-gray-500 mt-4">
              <p>🔒 Secured by Better Auth</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
