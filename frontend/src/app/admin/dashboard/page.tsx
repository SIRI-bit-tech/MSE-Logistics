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
import { Package, CheckCircle, Truck, DollarSign, Printer, Trash2 } from "lucide-react"
import AdminHeader from "@/components/admin/admin-header"
import AdminStatsCard from "@/components/admin/admin-stats-card"
import ShipmentReceipt from "@/components/admin/shipment-receipt"
import type { ShipmentReceiptProps } from "@/components/admin/shipment-receipt"

interface ShipmentForAdmin {
  id: string
  trackingNumber: string
  status: string
  recipientCity: string
  recipientCountry: string
  recipientName: string
  recipientEmail: string
  recipientPhone: string
  recipientAddress: string
  currentLatitude?: number
  currentLongitude?: number
  currentLocation?: string
  estimatedDeliveryDate?: string
  notes?: string
  transportMode: string
  createdAt: string
  totalCost: number
  currency: string
  senderName: string
  senderEmail: string
  senderPhone: string
  senderAddress: string
  senderCity: string
  senderCountry: string
  senderPostalCode: string
  recipientPostalCode: string
  packageType: string
  weight: number
  description: string
  serviceType: string
  shippingCost: number
  insuranceCost?: number
  value: number // Declared value entered by the user
}

interface FormData {
  trackingNumber: string
  recipientName: string
  recipientAddress: string
  status: string
}

interface DashboardStats {
  totalShipments: number
  deliveredToday: number
  inTransit: number
  revenueToday: number
}

export default function AdminDashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isReceiptOpen, setIsReceiptOpen] = useState(false)
  const [editingShipment, setEditingShipment] = useState<ShipmentForAdmin | null>(null)
  const [receiptShipment, setReceiptShipment] = useState<ShipmentForAdmin | null>(null)
  const [shipments, setShipments] = useState<ShipmentForAdmin[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    totalShipments: 0,
    deliveredToday: 0,
    inTransit: 0,
    revenueToday: 0,
  })
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
      fetchDashboardData()
    }
  }, [isAuthenticated, user])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)

      // Fetch shipments
      const shipmentsResponse = await fetch('/api/admin/shipments?limit=50')

      if (shipmentsResponse.ok) {
        const shipmentsData = await shipmentsResponse.json()
        const formattedShipments = shipmentsData.shipments.map((s: any) => ({
          id: s.id,
          trackingNumber: s.trackingNumber,
          status: s.status,
          recipientCity: s.recipientCity,
          recipientCountry: s.recipientCountry,
          createdAt: new Date(s.createdAt).toLocaleDateString(),
          totalCost: s.totalCost,
        }))
        setShipments(formattedShipments)

        // Calculate stats from real data
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const totalShipments = shipmentsData.pagination?.total || shipmentsData.shipments.length
        const deliveredToday = shipmentsData.shipments.filter((s: any) => {
          if (s.status === 'DELIVERED' && s.actualDeliveryDate) {
            const deliveryDate = new Date(s.actualDeliveryDate)
            deliveryDate.setHours(0, 0, 0, 0)
            return deliveryDate.getTime() === today.getTime()
          }
          return false
        }).length

        const inTransit = shipmentsData.shipments.filter((s: any) =>
          s.status === 'IN_TRANSIT' || s.status === 'OUT_FOR_DELIVERY'
        ).length

        // Calculate revenue from today's delivered shipments
        const revenueToday = shipmentsData.shipments
          .filter((s: any) => {
            if (s.status === 'DELIVERED' && s.actualDeliveryDate) {
              const deliveryDate = new Date(s.actualDeliveryDate)
              deliveryDate.setHours(0, 0, 0, 0)
              return deliveryDate.getTime() === today.getTime()
            }
            return false
          })
          .reduce((sum: number, s: any) => sum + (s.totalCost || 0), 0)

        setStats({
          totalShipments,
          deliveredToday,
          inTransit,
          revenueToday,
        })
      } else {
        toast.error('Failed to load dashboard data')
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast.error('An error occurred while loading dashboard data')
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

  const handlePrintReceipt = async (shipment: ShipmentForAdmin) => {
    try {
      // Fetch full shipment details for receipt
      const response = await fetch(`/api/admin/shipments/${shipment.id}`)
      if (response.ok) {
        const data = await response.json()
        const fullShipment: ShipmentReceiptProps['shipment'] = {
          id: shipment.id,
          trackingNumber: shipment.trackingNumber,
          status: shipment.status,
          createdAt: data.shipment.createdAt,
          totalCost: data.shipment.totalCost || 0,
          currency: data.shipment.currency || 'USD',
          senderName: data.shipment.senderName || '',
          senderEmail: data.shipment.senderEmail || '',
          senderPhone: data.shipment.senderPhone || '',
          senderAddress: data.shipment.senderAddress || '',
          senderCity: data.shipment.senderCity || '',
          senderCountry: data.shipment.senderCountry || '',
          senderPostalCode: data.shipment.senderPostalCode || '',
          recipientName: data.shipment.recipientName || '',
          recipientEmail: data.shipment.recipientEmail || '',
          recipientPhone: data.shipment.recipientPhone || '',
          recipientAddress: data.shipment.recipientAddress || '',
          recipientCity: data.shipment.recipientCity || '',
          recipientCountry: data.shipment.recipientCountry || '',
          recipientPostalCode: data.shipment.recipientPostalCode || '',
          packageType: data.shipment.packageType || 'PARCEL',
          weight: data.shipment.weight || 0,
          description: data.shipment.description || '',
          serviceType: data.shipment.serviceType || 'STANDARD',
          transportMode: data.shipment.transportMode || 'LAND',
          shippingCost: data.shipment.shippingCost || 0,
          insuranceCost: data.shipment.insuranceCost || 0,
          estimatedDeliveryDate: data.shipment.estimatedDeliveryDate,
          value: data.shipment.value || 0, // This is the declared value entered by the user
        }
        setReceiptShipment(fullShipment)
        setIsReceiptOpen(true)
      } else {
        toast.error('Failed to load shipment details for receipt')
      }
    } catch (error) {
      console.error('Error loading shipment for receipt:', error)
      toast.error('An error occurred while loading shipment details')
    }
  }

  const handleDeleteShipment = async (shipment: ShipmentForAdmin) => {
    if (!confirm(`Are you sure you want to delete shipment ${shipment.trackingNumber}? This action cannot be undone.`)) {
      return
    }

    try {
      const response = await fetch(`/api/admin/shipments/${shipment.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // Remove from local state
        setShipments(prev => prev.filter(s => s.id !== shipment.id))
        toast.success(`Shipment ${shipment.trackingNumber} deleted successfully`)
        // Refresh stats
        fetchDashboardData()
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Failed to delete shipment')
      }
    } catch (error) {
      console.error('Error deleting shipment:', error)
      toast.error('An error occurred while deleting shipment')
    }
  }

  const handleEditClick = async (shipment: ShipmentForAdmin) => {
    // Fetch full shipment details
    try {
      const response = await fetch(`/api/admin/shipments/${shipment.id}`)
      if (response.ok) {
        const data = await response.json()
        setEditingShipment({
          ...shipment,
          recipientName: data.shipment.recipientName,
          recipientEmail: data.shipment.recipientEmail,
          recipientPhone: data.shipment.recipientPhone,
          recipientAddress: data.shipment.recipientAddress,
          currentLatitude: data.shipment.currentLatitude,
          currentLongitude: data.shipment.currentLongitude,
          currentLocation: data.shipment.currentLocation,
          estimatedDeliveryDate: data.shipment.estimatedDeliveryDate,
          notes: data.shipment.notes,
          transportMode: data.shipment.transportMode,
          totalCost: data.shipment.totalCost,
        })
        setIsEditOpen(true)
      } else {
        toast.error('Failed to load shipment details')
      }
    } catch (error) {
      console.error('Error loading shipment:', error)
      toast.error('An error occurred while loading shipment')
    }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingShipment) return

    setIsSubmitting(true)
    try {
      // Prepare payload - only send fields that have values
      const payload: any = {}

      if (editingShipment.status) {
        payload.status = editingShipment.status
      }

      if (editingShipment.currentLocation) {
        payload.currentLocation = editingShipment.currentLocation
      }

      if (editingShipment.currentLatitude !== undefined && editingShipment.currentLatitude !== null) {
        payload.currentLatitude = Number(editingShipment.currentLatitude)
      }

      if (editingShipment.currentLongitude !== undefined && editingShipment.currentLongitude !== null) {
        payload.currentLongitude = Number(editingShipment.currentLongitude)
      }

      if (editingShipment.estimatedDeliveryDate) {
        payload.estimatedDeliveryDate = editingShipment.estimatedDeliveryDate
      }

      if (editingShipment.notes) {
        payload.notes = editingShipment.notes
      }

      if (editingShipment.transportMode) {
        payload.transportMode = editingShipment.transportMode
      }

      if (editingShipment.totalCost !== undefined) {
        payload.totalCost = editingShipment.totalCost
      }

      const response = await fetch(`/api/admin/shipments/${editingShipment.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setShipments(prev =>
          prev.map(s => s.id === editingShipment.id ? editingShipment : s)
        )
        toast.success('Shipment updated successfully')
        setIsEditOpen(false)
        setEditingShipment(null)
        fetchDashboardData() // Refresh data
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Failed to update shipment')
      }
    } catch (error) {
      toast.error('An error occurred while updating shipment')
    } finally {
      setIsSubmitting(false)
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
        <AdminStatsCard
          title="Total Shipments"
          value={stats.totalShipments}
          icon={Package}
        />
        <AdminStatsCard
          title="Delivered Today"
          value={stats.deliveredToday}
          icon={CheckCircle}
        />
        <AdminStatsCard
          title="In Transit"
          value={stats.inTransit}
          icon={Truck}
        />
        <AdminStatsCard
          title="Revenue Today"
          value={`$${stats.revenueToday.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={DollarSign}
        />
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
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditClick(shipment)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePrintReceipt(shipment)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Printer className="w-4 h-4 mr-1" />
                            Receipt
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteShipment(shipment)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Shipment Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Shipment - {editingShipment?.trackingNumber}</DialogTitle>
          </DialogHeader>
          {editingShipment && (
            <form onSubmit={handleEditSubmit} className="space-y-4 py-4">
              {/* Recipient Info - Read Only */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Recipient Information</Label>
                <div className="grid grid-cols-2 gap-3 p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="text-sm font-medium">{editingShipment.recipientName || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{editingShipment.recipientEmail || 'N/A'}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="text-sm font-medium">{editingShipment.recipientAddress || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">City</p>
                    <p className="text-sm font-medium">{editingShipment.recipientCity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Country</p>
                    <p className="text-sm font-medium">{editingShipment.recipientCountry}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="edit-status">Shipment Status *</Label>
                <Select
                  value={editingShipment.status}
                  onValueChange={(value) => setEditingShipment({ ...editingShipment, status: value })}
                >
                  <SelectTrigger id="edit-status">
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
                    <SelectItem value="ARRIVED_AT_FACILITY">Arrived at Facility</SelectItem>
                    <SelectItem value="OUT_FOR_DELIVERY">Out for Delivery</SelectItem>
                    <SelectItem value="DELIVERY_ATTEMPTED">Delivery Attempted</SelectItem>
                    <SelectItem value="DELIVERED">Delivered</SelectItem>
                    <SelectItem value="RETURNED">Returned</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Current Location */}
              <div className="space-y-2">
                <Label htmlFor="edit-location">Current Location</Label>
                <Input
                  id="edit-location"
                  placeholder="e.g., Distribution Center, Miami, FL"
                  value={editingShipment.currentLocation || ''}
                  onChange={(e) => setEditingShipment({ ...editingShipment, currentLocation: e.target.value })}
                />
              </div>

              {/* GPS Coordinates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-lat">Latitude</Label>
                  <Input
                    id="edit-lat"
                    type="number"
                    step="any"
                    placeholder="e.g., 25.7617"
                    value={editingShipment.currentLatitude || ''}
                    onChange={(e) => setEditingShipment({
                      ...editingShipment,
                      currentLatitude: e.target.value ? parseFloat(e.target.value) : undefined
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-lng">Longitude</Label>
                  <Input
                    id="edit-lng"
                    type="number"
                    step="any"
                    placeholder="e.g., -80.1918"
                    value={editingShipment.currentLongitude || ''}
                    onChange={(e) => setEditingShipment({
                      ...editingShipment,
                      currentLongitude: e.target.value ? parseFloat(e.target.value) : undefined
                    })}
                  />
                </div>
              </div>

              {/* Estimated Delivery Date */}
              <div className="space-y-2">
                <Label htmlFor="edit-delivery">Estimated Delivery Date</Label>
                <Input
                  id="edit-delivery"
                  type="date"
                  value={editingShipment.estimatedDeliveryDate ?
                    new Date(editingShipment.estimatedDeliveryDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setEditingShipment({
                    ...editingShipment,
                    estimatedDeliveryDate: e.target.value
                  })}
                />
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Internal Notes</Label>
                <Input
                  id="edit-notes"
                  placeholder="Add any internal notes..."
                  value={editingShipment.notes || ''}
                  onChange={(e) => setEditingShipment({ ...editingShipment, notes: e.target.value })}
                />
              </div>

              {/* Transport Mode */}
              <div className="space-y-2">
                <Label htmlFor="edit-transport">Transport Mode</Label>
                <Select
                  value={editingShipment.transportMode || 'LAND'}
                  onValueChange={(value) => setEditingShipment({ ...editingShipment, transportMode: value })}
                >
                  <SelectTrigger id="edit-transport">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AIR">Air</SelectItem>
                    <SelectItem value="LAND">Land</SelectItem>
                    <SelectItem value="WATER">Sea</SelectItem>
                    <SelectItem value="MULTIMODAL">Multimodal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Total Cost */}
              <div className="space-y-2">
                <Label htmlFor="edit-cost">Total Shipping Cost</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="edit-cost"
                    type="number"
                    min="0"
                    step="0.01"
                    className="pl-10"
                    placeholder="0.00"
                    value={editingShipment.totalCost}
                    onChange={(e) => {
                      const val = e.target.value
                      setEditingShipment({
                        ...editingShipment,
                        totalCost: val === '' ? '' : parseFloat(val) as any
                      })
                    }}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Receipt Dialog */}
      {receiptShipment && (
        <ShipmentReceipt
          shipment={receiptShipment}
          isOpen={isReceiptOpen}
          onClose={() => {
            setIsReceiptOpen(false)
            setReceiptShipment(null)
          }}
        />
      )}

    </div>
  )
}
