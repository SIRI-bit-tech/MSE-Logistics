"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
    ACTIVE: "default",
    INACTIVE: "destructive",
    ON_LEAVE: "secondary",
  } as const

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Driver Management</h1>
          <p className="text-muted-foreground">Manage drivers, routes, and performance</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search drivers by name or email"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10"
              aria-label="Search drivers by name or email"
            />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>NAME</TableHead>
                    <TableHead className="hidden lg:table-cell">EMAIL</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead className="hidden md:table-cell">RATING</TableHead>
                    <TableHead className="hidden lg:table-cell">DELIVERIES</TableHead>
                    <TableHead>ACTIONS</TableHead>
                  </TableRow>
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
                          <Badge variant={statusColor[driver.status as keyof typeof statusColor]}>
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
