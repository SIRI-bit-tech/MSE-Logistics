"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export default function DriverProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    vehicle: "",
    bio: "",
  })

  // Store original data for cancel functionality
  const [originalData, setOriginalData] = useState(formData)

  // Fetch driver profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!authLoading && !isAuthenticated) {
        router.push('/driver/login')
        return
      }

      if (!authLoading && isAuthenticated && user) {
        try {
          setIsFetching(true)
          const response = await fetch('/api/driver/profile')
          
          if (response.ok) {
            const data = await response.json()
            const profileData = {
              firstName: data.firstName || "",
              lastName: data.lastName || "",
              email: data.email || "",
              phone: data.phone || "",
              licenseNumber: data.licenseNumber || "",
              vehicle: data.vehicle || "",
              bio: data.bio || "",
            }
            setFormData(profileData)
            setOriginalData(profileData)
          } else {
            toast.error('Failed to load profile data')
          }
        } catch (error) {
          console.error('Error fetching profile:', error)
          toast.error('An error occurred while loading your profile')
        } finally {
          setIsFetching(false)
        }
      }
    }

    fetchProfile()
  }, [authLoading, isAuthenticated, user, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/driver/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await response.json()
        setOriginalData(formData)
        toast.success('Profile updated successfully!')
      } else {
        const error = await response.json()
        toast.error(error.message || 'Failed to update profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('An error occurred while updating your profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    // Reset form to original data
    setFormData(originalData)
    toast.info('Changes discarded')
  }

  if (authLoading || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-8"
        >
          Driver Profile
        </motion.h1>

        <motion.form 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <Card className="p-6 md:p-8">
            <CardContent className="p-0">
              <h2 className="text-lg font-bold mb-4 text-foreground">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 md:p-8">
            <CardContent className="p-0">
              <h2 className="text-lg font-bold mb-4 text-foreground">Driver Information</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="license">License Number</Label>
                  <Input
                    id="license"
                    value={formData.licenseNumber}
                    disabled
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Vehicle Details</Label>
                  <Input
                    id="vehicle"
                    value={formData.vehicle}
                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-[#0066CC] hover:bg-[#0052A3]"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Profile'}
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  )
}