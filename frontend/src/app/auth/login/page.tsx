"use client"

import { useState } from "react"
import { Input, Button, Checkbox, Link } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, User as UserIcon } from "lucide-react"
import toast from "react-hot-toast"
import type { User } from "../../../../global"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Use Auth0's authentication API directly (secure)
      const authResponse = await fetch('/api/auth/login-with-credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })

      if (!authResponse.ok) {
        const error = await authResponse.json()
        throw new Error(error.message || 'Login failed')
      }

      const authData = await authResponse.json() as { user: User; token: string }
      
      // Token is now stored in httpOnly cookie by the backend
      // No need to store in localStorage anymore
      
      toast.success("Login successful!")
      
      // Role-based redirection
      const userRole = authData.user?.role
      if (userRole === 'DRIVER') {
        router.push("/dashboard") // Driver dashboard
      } else if (userRole === 'CUSTOMER') {
        router.push("/shipments") // Customer main page
      } else {
        // Fallback for missing or unknown roles
        router.push("/dashboard")
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
            <p className="text-gray-600">Secure authentication powered by Auth0 with custom forms.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email or Username
              </label>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email or username"
                value={formData.email}
                onChange={handleChange}
                endContent={<UserIcon className="w-4 h-4 text-gray-400" />}
                classNames={{
                  input: "text-gray-700",
                  inputWrapper: "border border-gray-300 hover:border-gray-400 focus-within:border-msc-yellow"
                }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                classNames={{
                  input: "text-gray-700",
                  inputWrapper: "border border-gray-300 hover:border-gray-400 focus-within:border-msc-yellow"
                }}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <Checkbox
                name="rememberMe"
                isSelected={formData.rememberMe}
                onValueChange={(val) => setFormData(prev => ({ ...prev, rememberMe: val }))}
                classNames={{
                  wrapper: "before:border-gray-300"
                }}
              >
                <span className="text-sm text-gray-600">Remember me</span>
              </Checkbox>
              <Link href="/auth/forgot-password" className="text-sm text-msc-yellow hover:text-msc-gold">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-msc-yellow hover:bg-msc-gold text-black font-semibold py-3 text-base"
              disabled={loading}
              isLoading={loading}
            >
              LOG IN →
            </Button>

            <div className="text-center">
              <span className="text-gray-500">Or</span>
            </div>

            <Button
              variant="bordered"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3"
              onClick={() => router.push("/auth/signup")}
            >
              Register New Account
            </Button>

            {/* <div className="text-center text-sm text-gray-500 mt-4">
              <p>🔒 Secured by Auth0 with OAuth 2.0</p>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  )
}