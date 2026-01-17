"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"
import Image from "next/image"
import { User, Mail, Phone, Globe, Lock, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import countryList from "react-select-country-list"
import ReactCountryFlag from "react-country-flag"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SignupPage() {
  const router = useRouter()
  const { registerWithCredentials } = useAuth()
  const countries = countryList()
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessEmail: "",
    phoneNumber: "",
    country: "",
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

    setLoading(true)

    try {
      const result = await registerWithCredentials(
        formData.businessEmail,
        formData.password,
        formData.firstName,
        formData.lastName
      )
      
      if (result.success) {
        toast.success("Account created successfully!")
        router.push("/shipments")
      } else {
        toast.error(result.error || "Registration failed. Please try again.")
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
      {/* Left Side - Ocean Background with Container Ship - Hidden on mobile */}
      <div 
        className="hidden lg:flex flex-1 relative bg-cover bg-center bg-no-repeat flex-col justify-between p-12 text-white"
        style={{
          backgroundImage: `url('/signup-image.png')`
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image 
            src="/mse-logo.png" 
            alt="MSE Logo" 
            width={72} 
            height={48} 
            className="drop-shadow-lg filter brightness-110 contrast-125" 
          />
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

      {/* Right Side - Registration Form - Full width on mobile */}
      <div className="w-full lg:max-w-2xl bg-white flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-8 overflow-y-auto">
        <div className="w-full max-w-xl mx-auto">
          {/* Mobile Logo - Only shown on mobile */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <Image 
              src="/mse-logo.png" 
              alt="MSE Logo" 
              width={96} 
              height={64} 
              className="drop-shadow-lg filter brightness-110 contrast-125" 
            />
          </div>

          <div className="mb-6 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-4 text-center lg:text-left">Create an Account</h2>
            <p className="text-sm sm:text-base text-gray-600 text-center lg:text-left lg:hidden">Join Mediterranean Shipping Express today</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4 sm:space-y-6">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">
                  First Name
                </label>
                <div className="relative">
                  <Input
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="h-10 sm:h-12 pl-10 text-sm sm:text-base"
                    required
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">
                  Last Name
                </label>
                <div className="relative">
                  <Input
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="h-10 sm:h-12 pl-10 text-sm sm:text-base"
                    required
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Business Email and Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">
                  Business Email
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.businessEmail}
                    onChange={(e) => handleChange("businessEmail", e.target.value)}
                    className="h-10 sm:h-12 pl-10 text-sm sm:text-base"
                    required
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">
                  Phone Number
                </label>
                <div className="relative">
                  <Input
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                    className="h-10 sm:h-12 pl-10 text-sm sm:text-base"
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Country/Region */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">
                Country/Region
              </label>
              <div className="relative">
                <Select
                  value={formData.country}
                  onValueChange={(value) => handleChange("country", value)}
                >
                  <SelectTrigger className="h-10 sm:h-12 pl-10 text-sm sm:text-base">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {countries.getData().map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        <div className="flex items-center gap-2">
                          <ReactCountryFlag 
                            countryCode={country.value} 
                            svg 
                            style={{
                              width: '1.2em',
                              height: '1.2em',
                            }}
                          />
                          <span>{country.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Globe className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Password and Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="h-10 sm:h-12 pl-10 pr-10 text-sm sm:text-base"
                    required
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    className="h-10 sm:h-12 pl-10 pr-10 text-sm sm:text-base"
                    required
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-600 absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-3 py-2">
              <Checkbox
                id="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => handleChange("agreeTerms", checked as boolean)}
              />
              <label htmlFor="agreeTerms" className="text-sm sm:text-base text-gray-700 leading-relaxed cursor-pointer">
                I agree to the{" "}
                <Link href="/terms" className="text-msc-yellow hover:text-msc-gold transition-colors font-medium">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-msc-yellow hover:text-msc-gold transition-colors font-medium">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-msc-yellow hover:bg-msc-gold text-black font-bold text-sm sm:text-lg h-12 sm:h-14"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account →"}
            </Button>

            <div className="text-center pt-4 sm:pt-6">
              <span className="text-gray-500 text-sm sm:text-base">Already have an account? </span>
              <Link 
                href="/auth/login" 
                className="text-msc-yellow hover:text-msc-gold font-semibold text-sm sm:text-base transition-colors"
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
