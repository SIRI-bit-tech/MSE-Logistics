"use client"

import type React from "react"
import { useState } from "react"
import { Input, Button, Checkbox, Select, SelectItem } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Link from "next/link"
import { User, Mail, Phone, Globe, Lock, Eye, EyeOff, UserCheck } from "lucide-react"

const countries = [
  { key: "US", label: "United States", flag: "🇺🇸" },
  { key: "GB", label: "United Kingdom", flag: "🇬🇧" },
  { key: "CA", label: "Canada", flag: "🇨🇦" },
  { key: "AU", label: "Australia", flag: "🇦🇺" },
  { key: "DE", label: "Germany", flag: "🇩🇪" },
  { key: "FR", label: "France", flag: "🇫🇷" },
  { key: "IT", label: "Italy", flag: "🇮🇹" },
  { key: "ES", label: "Spain", flag: "🇪🇸" },
  { key: "NL", label: "Netherlands", flag: "🇳🇱" },
  { key: "BE", label: "Belgium", flag: "🇧🇪" },
  { key: "CH", label: "Switzerland", flag: "🇨🇭" },
  { key: "AT", label: "Austria", flag: "🇦🇹" },
  { key: "SE", label: "Sweden", flag: "🇸🇪" },
  { key: "NO", label: "Norway", flag: "🇳🇴" },
  { key: "DK", label: "Denmark", flag: "🇩🇰" },
  { key: "FI", label: "Finland", flag: "🇫🇮" },
  { key: "PL", label: "Poland", flag: "🇵🇱" },
  { key: "CZ", label: "Czech Republic", flag: "🇨🇿" },
  { key: "HU", label: "Hungary", flag: "🇭🇺" },
  { key: "GR", label: "Greece", flag: "🇬🇷" },
  { key: "PT", label: "Portugal", flag: "🇵🇹" },
  { key: "IE", label: "Ireland", flag: "🇮🇪" },
  { key: "JP", label: "Japan", flag: "🇯🇵" },
  { key: "KR", label: "South Korea", flag: "🇰🇷" },
  { key: "CN", label: "China", flag: "🇨🇳" },
  { key: "IN", label: "India", flag: "🇮🇳" },
  { key: "SG", label: "Singapore", flag: "🇸🇬" },
  { key: "HK", label: "Hong Kong", flag: "🇭🇰" },
  { key: "AE", label: "United Arab Emirates", flag: "🇦🇪" },
  { key: "SA", label: "Saudi Arabia", flag: "🇸🇦" },
  { key: "EG", label: "Egypt", flag: "🇪🇬" },
  { key: "ZA", label: "South Africa", flag: "🇿🇦" },
  { key: "BR", label: "Brazil", flag: "🇧🇷" },
  { key: "MX", label: "Mexico", flag: "🇲🇽" },
  { key: "AR", label: "Argentina", flag: "🇦🇷" },
  { key: "CL", label: "Chile", flag: "🇨🇱" },
  { key: "CO", label: "Colombia", flag: "🇨🇴" },
  { key: "PE", label: "Peru", flag: "🇵🇪" },
]

const roles = [
  { key: "CUSTOMER", label: "Customer", description: "I want to ship packages" },
  { key: "DRIVER", label: "Driver", description: "I want to deliver packages" },
]

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessEmail: "",
    phoneNumber: "",
    country: "",
    role: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (!formData.agreeTerms) {
      toast.error("Please agree to the terms and conditions")
      return
    }

    if (!formData.role) {
      toast.error("Please select your role")
      return
    }

    setLoading(true)

    try {
      // Use Auth0's registration API with custom form data
      const response = await fetch('/api/auth/register-with-credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          businessEmail: formData.businessEmail,
          phoneNumber: formData.phoneNumber,
          country: formData.country,
          role: formData.role,
          password: formData.password
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Registration failed')
      }

      const { user } = await response.json()
      
      // Token is now stored in httpOnly cookie by the backend
      // No need to store in localStorage anymore
      
      toast.success("Account created successfully!")
      
      // Redirect based on role
      if (user.role === 'DRIVER') {
        router.push("/dashboard") // Driver dashboard at (driver)/dashboard
      } else {
        router.push("/shipments") // Customer main page at (customer)/shipments
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      toast.error(error.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Ocean Background with Container Ship */}
      <div 
        className="flex-1 relative bg-cover bg-center bg-no-repeat flex flex-col justify-between p-12 text-white"
        style={{
          backgroundImage: `url('/signup-image.png')`
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-msc-yellow rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-2xl">⚓</span>
          </div>
          <span className="text-2xl font-bold tracking-wide">MEDITERRANEAN SHIPPING EXPRESS</span>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            Logistics for the<br />
            <span className="text-msc-yellow">Modern World.</span>
          </h1>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Join our global network today. Experience seamless shipping solutions tailored for your business needs across the seven seas.
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap gap-6 text-base">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-msc-yellow rounded-full"></div>
              <span>Global Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-msc-yellow rounded-full"></div>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-msc-yellow rounded-full"></div>
              <span>Secure Logistics</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-base opacity-75">
          <span>© {new Date().getFullYear()} Mediterranean Shipping Express. All rights reserved.</span>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full max-w-2xl bg-white flex flex-col justify-center px-12 py-8 overflow-y-auto">
        <div className="w-full max-w-xl mx-auto">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Create an Account</h2>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-3">
                  First Name
                </label>
                <Input
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  startContent={<User className="w-4 h-4 text-gray-400" />}
                  size="lg"
                  classNames={{
                    input: "text-gray-900 text-base",
                    inputWrapper: "h-12 border-2 border-gray-200 hover:border-gray-300 focus-within:border-msc-yellow bg-white"
                  }}
                  required
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-3">
                  Last Name
                </label>
                <Input
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  startContent={<User className="w-4 h-4 text-gray-400" />}
                  size="lg"
                  classNames={{
                    input: "text-gray-900 text-base",
                    inputWrapper: "h-12 border-2 border-gray-200 hover:border-gray-300 focus-within:border-msc-yellow bg-white"
                  }}
                  required
                />
              </div>
            </div>

            {/* Business Email and Phone Number */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-3">
                  Business Email
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.businessEmail}
                  onChange={(e) => handleChange("businessEmail", e.target.value)}
                  startContent={<Mail className="w-4 h-4 text-gray-400" />}
                  size="lg"
                  classNames={{
                    input: "text-gray-900 text-base",
                    inputWrapper: "h-12 border-2 border-gray-200 hover:border-gray-300 focus-within:border-msc-yellow bg-white"
                  }}
                  required
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-3">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  startContent={<Phone className="w-4 h-4 text-gray-400" />}
                  size="lg"
                  classNames={{
                    input: "text-gray-900 text-base",
                    inputWrapper: "h-12 border-2 border-gray-200 hover:border-gray-300 focus-within:border-msc-yellow bg-white"
                  }}
                />
              </div>
            </div>

            {/* Country/Region and Role */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-3">
                  Country/Region
                </label>
                <Select
                  placeholder="Select Country"
                  selectedKeys={formData.country ? [formData.country] : []}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string
                    handleChange("country", selectedKey)
                  }}
                  startContent={<Globe className="w-4 h-4 text-gray-400" />}
                  size="lg"
                  classNames={{
                    trigger: "h-12 border-2 border-gray-200 hover:border-gray-300 data-[focus=true]:border-msc-yellow bg-white",
                    value: "text-gray-900 text-base"
                  }}
                >
                  {countries.map((country) => (
                    <SelectItem 
                      key={country.key} 
                      value={country.key}
                      startContent={<span className="text-lg">{country.flag}</span>}
                    >
                      {country.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-3">
                  I am a
                </label>
                <Select
                  placeholder="Select Role"
                  selectedKeys={formData.role ? [formData.role] : []}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string
                    handleChange("role", selectedKey)
                  }}
                  startContent={<UserCheck className="w-4 h-4 text-gray-400" />}
                  size="lg"
                  classNames={{
                    trigger: "h-12 border-2 border-gray-200 hover:border-gray-300 data-[focus=true]:border-msc-yellow bg-white",
                    value: "text-gray-900 text-base"
                  }}
                  required
                >
                  {roles.map((role) => (
                    <SelectItem 
                      key={role.key} 
                      value={role.key}
                      description={role.description}
                    >
                      {role.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            {/* Password and Confirm Password */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-3">
                  Password
                </label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  startContent={<Lock className="w-4 h-4 text-gray-400" />}
                  endContent={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  size="lg"
                  classNames={{
                    input: "text-gray-900 text-base",
                    inputWrapper: "h-12 border-2 border-gray-200 hover:border-gray-300 focus-within:border-msc-yellow bg-white"
                  }}
                  required
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-3">
                  Confirm Password
                </label>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  startContent={<Lock className="w-4 h-4 text-gray-400" />}
                  endContent={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  size="lg"
                  classNames={{
                    input: "text-gray-900 text-base",
                    inputWrapper: "h-12 border-2 border-gray-200 hover:border-gray-300 focus-within:border-msc-yellow bg-white"
                  }}
                  required
                />
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-3 py-2">
              <Checkbox
                isSelected={formData.agreeTerms}
                onValueChange={(checked) => handleChange("agreeTerms", checked)}
                size="md"
                classNames={{
                  wrapper: "before:border-gray-400"
                }}
              />
              <span className="text-base text-gray-700 leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-msc-yellow hover:text-msc-gold transition-colors font-medium">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-msc-yellow hover:text-msc-gold transition-colors font-medium">
                  Privacy Policy
                </Link>
                .
              </span>
            </div>

            <Button
              type="submit"
              className="w-full bg-msc-yellow hover:bg-msc-gold text-black font-bold text-lg h-14 rounded-lg"
              disabled={loading}
              isLoading={loading}
            >
              Create Account →
            </Button>

            <div className="text-center pt-6">
              <span className="text-gray-500 text-base">Already have an account? </span>
              <Link 
                href="/auth/login" 
                className="text-msc-yellow hover:text-msc-gold font-semibold text-base transition-colors"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}