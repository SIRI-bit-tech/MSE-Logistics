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

const mockShipments: ShipmentForAdmin[] = [
  {
    id: "1",
    trackingNumber: "SG123456789",
    status: "IN_TRANSIT",
    recipientCity: "New York",
    recipientCountry: "USA",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    trackingNumber: "SG987654321",
    status: "OUT_FOR_DELIVERY",
    recipientCity: "London",
    recipientCountry: "UK",
    createdAt: "2024-01-02",
  },
]

export default function AdminDashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [shipments, setShipments] = useState(mockShipments)
  
  useEffect(() => {
    // Fetch admin dashboard data
  }, [])

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
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="tracking">Tracking Number</Label>
                  <Input id="tracking" placeholder="Enter tracking number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient Name</Label>
                  <Input id="recipient" placeholder="Enter recipient name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Recipient Address</Label>
                  <Input id="address" placeholder="Enter address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
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
                <Button onClick={() => setIsOpen(false)} className="w-full">
                  Create Shipment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
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
              {mockShipments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No shipments</TableCell>
                </TableRow>
              ) : (
                mockShipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell>{shipment.trackingNumber}</TableCell>
                    <TableCell>
                      {shipment.recipientCity}, {shipment.recipientCountry}
                    </TableCell>
                    <TableCell>
                      <Select defaultValue={shipment.status}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                          <SelectItem value="OUT_FOR_DELIVERY">Out for Delivery</SelectItem>
                          <SelectItem value="DELIVERED">Delivered</SelectItem>
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
        </CardContent>
      </Card>

    </div>
  )
}
