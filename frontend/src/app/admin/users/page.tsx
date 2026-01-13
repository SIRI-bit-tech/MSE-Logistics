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
import { Search, Edit2, Trash2 } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function AdminUsersPage() {
  const [searchValue, setSearchValue] = useState("")
  const [users] = useState([
    {
      id: "1",
      name: "Sarah Chen",
      email: "sarah@techcorp.com",
      company: "TechCorp",
      status: "ACTIVE",
      joinDate: "2024-01-10",
      shipments: 45,
    },
    {
      id: "2",
      name: "James Wilson",
      email: "james@retailmax.com",
      company: "RetailMax",
      status: "ACTIVE",
      joinDate: "2023-12-15",
      shipments: 128,
    },
    {
      id: "3",
      name: "Maria Garcia",
      email: "maria@freshfood.com",
      company: "FreshFood Co",
      status: "INACTIVE",
      joinDate: "2023-11-20",
      shipments: 78,
    },
  ])

  const statusColor = {
    ACTIVE: "success",
    INACTIVE: "danger",
    SUSPENDED: "warning",
  } as const

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">User Management</h1>
          <p className="text-foreground-600">Manage customer accounts and their access</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6">
          <Input
            placeholder="Search by name or email"
            startContent={<Search className="w-4 h-4" />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            aria-label="Search users by name or email"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card className="overflow-hidden">
            <Table aria-label="Users table">
              <TableHeader>
                <TableColumn className="hidden md:table-cell">NAME</TableColumn>
                <TableColumn className="hidden lg:table-cell">EMAIL</TableColumn>
                <TableColumn>COMPANY</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn className="hidden md:table-cell">SHIPMENTS</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {users
                  .filter(
                    (user) =>
                      user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                      user.email.toLowerCase().includes(searchValue.toLowerCase()),
                  )
                  .map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="hidden md:table-cell font-semibold">{user.name}</TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">{user.email}</TableCell>
                      <TableCell>{user.company}</TableCell>
                      <TableCell>
                        <Badge color={statusColor[user.status as keyof typeof statusColor]} variant="flat">
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{user.shipments}</TableCell>
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
