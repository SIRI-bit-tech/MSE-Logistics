"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
    ACTIVE: "default",
    INACTIVE: "destructive",
    SUSPENDED: "secondary",
  } as const

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">User Management</h1>
          <p className="text-foreground-600">Manage customer accounts and their access</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name or email"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10"
              aria-label="Search users by name or email"
            />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden md:table-cell">NAME</TableHead>
                    <TableHead className="hidden lg:table-cell">EMAIL</TableHead>
                    <TableHead>COMPANY</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead className="hidden md:table-cell">SHIPMENTS</TableHead>
                    <TableHead>ACTIONS</TableHead>
                  </TableRow>
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
                          <Badge variant={statusColor[user.status as keyof typeof statusColor]}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{user.shipments}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
