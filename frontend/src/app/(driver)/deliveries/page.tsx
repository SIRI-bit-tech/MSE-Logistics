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
  Link,
  Tabs,
  Tab,
} from "@heroui/react"
import { CheckCircle, Clock, MapPin } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function DeliveriesPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [deliveries] = useState([
    {
      id: "1",
      trackingNumber: "SS-2024-001234",
      recipientName: "John Smith",
      address: "123 Main St, NY",
      phone: "+1 (555) 123-4567",
      status: "ACTIVE",
      estimatedTime: "2:00 PM",
    },
    {
      id: "2",
      trackingNumber: "SS-2024-001235",
      recipientName: "Jane Doe",
      address: "456 Park Ave, NY",
      phone: "+1 (555) 234-5678",
      status: "ACTIVE",
      estimatedTime: "3:30 PM",
    },
  ])

  const [completed] = useState([
    {
      id: "3",
      trackingNumber: "SS-2024-001236",
      recipientName: "Bob Johnson",
      address: "789 Oak Rd, NY",
      phone: "+1 (555) 345-6789",
      status: "DELIVERED",
      completedTime: "1:15 PM",
    },
  ])

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-8"
        >
          Deliveries
        </motion.h1>

        <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key as string)} className="mb-8">
          <Tab key="active" title="Active Deliveries" className="w-full">
            <Card className="overflow-hidden mt-4">
              <Table aria-label="Active deliveries table">
                <TableHeader>
                  <TableColumn>TRACKING</TableColumn>
                  <TableColumn className="hidden sm:table-cell">RECIPIENT</TableColumn>
                  <TableColumn className="hidden md:table-cell">ADDRESS</TableColumn>
                  <TableColumn className="hidden lg:table-cell">PHONE</TableColumn>
                  <TableColumn>ETA</TableColumn>
                  <TableColumn>ACTION</TableColumn>
                </TableHeader>
                <TableBody>
                  {deliveries.map((delivery) => (
                    <TableRow key={delivery.id}>
                      <TableCell className="font-mono text-sm">{delivery.trackingNumber}</TableCell>
                      <TableCell className="hidden sm:table-cell">{delivery.recipientName}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{delivery.address}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <a href={`tel:${delivery.phone}`} className="text-[#0066CC] hover:underline">
                          {delivery.phone}
                        </a>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {delivery.estimatedTime}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button as={Link} href={`/tracking/${delivery.trackingNumber}`} size="sm" variant="flat">
                          Deliver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </Tab>

          <Tab key="completed" title="Completed" className="w-full">
            <Card className="overflow-hidden mt-4">
              <Table aria-label="Completed deliveries table">
                <TableHeader>
                  <TableColumn>TRACKING</TableColumn>
                  <TableColumn className="hidden sm:table-cell">RECIPIENT</TableColumn>
                  <TableColumn className="hidden md:table-cell">ADDRESS</TableColumn>
                  <TableColumn>COMPLETED</TableColumn>
                </TableHeader>
                <TableBody>
                  {completed.map((delivery) => (
                    <TableRow key={delivery.id}>
                      <TableCell className="font-mono text-sm">{delivery.trackingNumber}</TableCell>
                      <TableCell className="hidden sm:table-cell">{delivery.recipientName}</TableCell>
                      <TableCell className="hidden md:table-cell">{delivery.address}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {delivery.completedTime}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
