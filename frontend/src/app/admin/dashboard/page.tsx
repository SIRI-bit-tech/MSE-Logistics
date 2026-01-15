"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "sonner"
import AdminHeader from "@/components/admin/admin-header"
import AdminStatsCard from "@/components/admin/admin-stats-card"

interface ShipmentForAdmin {
  id: string
  trackingNumber: string
  status: string
  recipientCity: string
  recipientCountry: string
  createdAt: string
}

interface FormData {
  trackingNumber: string
  recipientName: string
  recipientAddress: string
  status: string
}

export default function AdminDashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [shipments, setShipments] = useState<ShipmentForAdmin[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    trackingNumber: "",
    recipientName: "",
    recipientAddress: "",
    status: "PENDING",
  })
  
  useEffect(() => {
    if (isAuthenticated && (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN")) {
      fetchShipments()
    }
  }, [isAuthenticated, user])
  
  const fetchShipments = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/shipments?limit=50')
      
      if (response.ok) {
        const data = await response.json()
        const formattedShipments = data.shipments.map((s: any) => ({
          id: s.id,
          trackingNumber: s.trackingNumber,
          status: s.status,
          recipientCity: s.recipientCity,
          recipientCountry: s.recipientCountry,
          createdAt: new Date(s.createdAt).toLocaleDateString(),
        }))
        setShipments(formattedShipments)
      } else {
        toast.error('Failed to load shipments')
      }
    } catch (error) {
      console.error('Error fetching shipments:', error)
      toast.error('An error occurred while loading shipments')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateShipment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.trackingNumber || !formData.recipientName || !formData.recipientAddress) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Note: This is a simplified version. In production, you'd need a proper admin endpoint
      // that accepts minimal data or use the full shipment creation endpoint
      toast.info('Admin shipment creation not yet implemented')
      setIsOpen(false)
      
      // Reset form
      setFormData({
        trackingNumber: "",
        recipientName: "",
        recipientAddress: "",
        status: "PENDING",
      })
    } catch (error) {
      console.error('Error creating shipment:', error)
      toast.error('Failed to create shipment')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStatusChange = async (shipmentId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/shipments/${shipmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        // Update local state
        setShipments(prev => 
          prev.map(s => s.id === shipmentId ? { ...s, status: newStatus } : s)
        )
        toast.success('Status updated successfully')
      } else {
        toast.error('Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('An error occurred while updating status')
    }
  }

  if (!isAuthenticated || (user?.role !== "ADMIN" && user?.role !== "SUPER_ADMIN")) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="py-8 text-center">
            <p>Access Denied. Admin privileges required.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6">
      <AdminHeader />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <AdminStatsCard title="Total Shipments" value="1,234" icon="📦" />
        <AdminStatsCard title="Delivered Today" value="89" icon="✅" />
        <AdminStatsCard title="In Transit" value="234" icon="🚀" />
        <AdminStatsCard title="Revenue Today" value="$12,450" icon="💰" />
      </div>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <h2 className="text-2xl font-bold">Manage Shipments</h2>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>Add Shipment</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Shipment</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateShipment} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="tracking">Tracking Number</Label>
                  <Input 
                    id="tracking" 
                    placeholder="Enter tracking number"
                    value={formData.trackingNumber}
                    onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient Name</Label>
                  <Input 
                    id="recipient" 
                    placeholder="Enter recipient name"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Recipient Address</Label>
                  <Input 
                    id="address" 
                    placeholder="Enter address"
                    value={formData.recipientAddress}
                    onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                      <SelectItem value="DELIVERED">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Shipment'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No shipments</TableCell>
                  </TableRow>
                ) : (
                  shipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell>{shipment.trackingNumber}</TableCell>
                      <TableCell>
                        {shipment.recipientCity}, {shipment.recipientCountry}
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={shipment.status}
                          onValueChange={(value) => handleStatusChange(shipment.id, value)}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="PROCESSING">Processing</SelectItem>
                            <SelectItem value="ON_HOLD">On Hold</SelectItem>
                            <SelectItem value="PICKED_UP">Picked Up</SelectItem>
                            <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                            <SelectItem value="IN_CUSTOMS">In Customs</SelectItem>
                            <SelectItem value="CUSTOMS_CLEARED">Customs Cleared</SelectItem>
                            <SelectItem value="ARRIVED_AT_FACILITY">At Facility</SelectItem>
                            <SelectItem value="OUT_FOR_DELIVERY">Out for Delivery</SelectItem>
                            <SelectItem value="DELIVERY_ATTEMPTED">Delivery Attempted</SelectItem>
                            <SelectItem value="DELIVERED">Delivered</SelectItem>
                            <SelectItem value="RETURNED">Returned</SelectItem>
                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>{shipment.createdAt}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

    </div>
  )
}
