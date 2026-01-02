"use client"

import { useEffect } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Divider,
} from "@nextui-org/react"
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [shipments, setShipments] = useEffect(() => {
    // Fetch admin dashboard data
  }, [])

  if (!isAuthenticated || (user?.role !== "ADMIN" && user?.role !== "SUPER_ADMIN")) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardBody className="py-8 text-center">
            <p>Access Denied. Admin privileges required.</p>
          </CardBody>
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
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Manage Shipments</h2>
          <Button color="primary" onPress={onOpen}>
            Add Shipment
          </Button>
        </CardHeader>
        <Divider />
        <CardBody>
          <Table aria-label="Admin shipments table">
            <TableHeader>
              <TableColumn>Tracking</TableColumn>
              <TableColumn>Destination</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody items={mockShipments} emptyContent="No shipments">
              {(shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell>{shipment.trackingNumber}</TableCell>
                  <TableCell>
                    {shipment.recipientCity}, {shipment.recipientCountry}
                  </TableCell>
                  <TableCell>
                    <Select size="sm" defaultSelectedKeys={[shipment.status]} className="w-32">
                      <SelectItem key="PENDING">Pending</SelectItem>
                      <SelectItem key="IN_TRANSIT">In Transit</SelectItem>
                      <SelectItem key="OUT_FOR_DELIVERY">Out for Delivery</SelectItem>
                      <SelectItem key="DELIVERED">Delivered</SelectItem>
                    </Select>
                  </TableCell>
                  <TableCell>{shipment.createdAt}</TableCell>
                  <TableCell>
                    <Button variant="light" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Add New Shipment</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input label="Tracking Number" placeholder="Enter tracking number" />
              <Input label="Recipient Name" placeholder="Enter recipient name" />
              <Input label="Recipient Address" placeholder="Enter address" />
              <Select label="Status">
                <SelectItem key="PENDING">Pending</SelectItem>
                <SelectItem key="IN_TRANSIT">In Transit</SelectItem>
                <SelectItem key="DELIVERED">Delivered</SelectItem>
              </Select>
              <Button color="primary" onPress={onOpenChange}>
                Create Shipment
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
