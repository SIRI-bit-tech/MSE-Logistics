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
  Input,
} from "@nextui-org/react"
import { Search, Edit2, Trash2, Award } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function AdminDriversPage() {
  const [searchValue, setSearchValue] = useState("")
  const [drivers] = useState([
    {
      id: "1",
      name: "John Smith",
      email: "john@drivers.com",
      status: "ACTIVE",
      rating: 4.8,
      deliveries: 287,
      joinDate: "2023-06-15",
    },
    {
      id: "2",
      name: "Lisa Johnson",
      email: "lisa@drivers.com",
      status: "ACTIVE",
      rating: 4.9,
      deliveries: 345,
      joinDate: "2023-05-10",
    },
    {
      id: "3",
      name: "Mike Brown",
      email: "mike@drivers.com",
      status: "ON_LEAVE",
      rating: 4.6,
      deliveries: 198,
      joinDate: "2023-08-20",
    },
  ])

  const statusColor = {
    ACTIVE: "success",
    INACTIVE: "danger",
    ON_LEAVE: "warning",
  } as const

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Driver Management</h1>
          <p className="text-foreground-600">Manage drivers, routes, and performance</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6">
          <Input
            placeholder="Search drivers by name or email"
            startContent={<Search className="w-4 h-4" />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            aria-label="Search drivers by name or email"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card className="overflow-hidden">
            <Table aria-label="Drivers table">
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn className="hidden lg:table-cell">EMAIL</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn className="hidden md:table-cell">RATING</TableColumn>
                <TableColumn className="hidden lg:table-cell">DELIVERIES</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {drivers
                  .filter(
                    (driver) =>
                      driver.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                      driver.email.toLowerCase().includes(searchValue.toLowerCase()),
                  )
                  .map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell className="font-semibold">{driver.name}</TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">{driver.email}</TableCell>
                      <TableCell>
                        <Badge color={statusColor[driver.status as keyof typeof statusColor]} variant="flat">
                          {driver.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-[#FFD700]" />
                          {driver.rating}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{driver.deliveries}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button isIconOnly size="sm" variant="light">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button isIconOnly size="sm" variant="light" color="danger">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
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
