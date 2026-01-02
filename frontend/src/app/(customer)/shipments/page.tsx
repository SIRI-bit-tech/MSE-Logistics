"use client"

import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Badge,
  Link,
} from "@heroui/react"
import { Plus, Eye } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function ShipmentsPage() {
  const [shipments] = useState([
    {
      id: "1",
      trackingNumber: "SS-2024-001234",
      destination: "New York, USA",
      status: "IN_TRANSIT",
      date: "2024-01-15",
      price: "$250.00",
    },
    {
      id: "2",
      trackingNumber: "SS-2024-001235",
      destination: "London, UK",
      status: "DELIVERED",
      date: "2024-01-10",
      price: "$320.00",
    },
    {
      id: "3",
      trackingNumber: "SS-2024-001236",
      destination: "Tokyo, Japan",
      status: "PROCESSING",
      date: "2024-01-18",
      price: "$450.00",
    },
  ])

  const statusColor = {
    PENDING: "warning",
    PROCESSING: "default",
    PICKED_UP: "secondary",
    IN_TRANSIT: "primary",
    DELIVERED: "success",
    CANCELLED: "danger",
  } as const

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">My Shipments</h1>
            <p className="text-foreground-600 mt-2">Track and manage all your shipments</p>
          </div>
          <Button as={Link} href="/shipments/new" color="primary" startContent={<Plus />}>
            New Shipment
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card className="overflow-hidden">
            <Table aria-label="Shipments table">
              <TableHeader>
                <TableColumn>TRACKING NUMBER</TableColumn>
                <TableColumn>DESTINATION</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>DATE</TableColumn>
                <TableColumn>PRICE</TableColumn>
                <TableColumn>ACTION</TableColumn>
              </TableHeader>
              <TableBody>
                {shipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-mono text-sm">{shipment.trackingNumber}</TableCell>
                    <TableCell>{shipment.destination}</TableCell>
                    <TableCell>
                      <Badge color={statusColor[shipment.status as keyof typeof statusColor]} variant="flat">
                        {shipment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{shipment.date}</TableCell>
                    <TableCell className="font-semibold">{shipment.price}</TableCell>
                    <TableCell>
                      <Button as={Link} isIconOnly variant="light" href={`/tracking/${shipment.trackingNumber}`}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
