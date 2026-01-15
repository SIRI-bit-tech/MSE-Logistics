"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, MessageCircle } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function IssuesContent() {
  const [searchValue, setSearchValue] = useState("")
  const [issues] = useState([
    {
      id: "1",
      trackingNumber: "SS-2024-001234",
      issue: "Package damaged in transit",
      status: "OPEN",
      priority: "HIGH",
      reportedDate: "2024-01-15",
    },
    {
      id: "2",
      trackingNumber: "SS-2024-001235",
      issue: "Delayed delivery",
      status: "IN_PROGRESS",
      priority: "MEDIUM",
      reportedDate: "2024-01-14",
    },
    {
      id: "3",
      trackingNumber: "SS-2024-001236",
      issue: "Wrong package delivered",
      status: "RESOLVED",
      priority: "HIGH",
      reportedDate: "2024-01-10",
    },
  ])

  const statusColor = {
    OPEN: "destructive",
    IN_PROGRESS: "secondary",
    RESOLVED: "default",
  } as const

  const priorityColor = {
    LOW: "outline",
    MEDIUM: "secondary",
    HIGH: "destructive",
  } as const

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Issues & Support</h1>
        <p className="text-muted-foreground">Track and resolve customer issues</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by tracking number or issue type"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>TRACKING</TableHead>
                  <TableHead className="hidden md:table-cell">ISSUE</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead className="hidden md:table-cell">PRIORITY</TableHead>
                  <TableHead className="hidden lg:table-cell">REPORTED</TableHead>
                  <TableHead>ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issues
                  .filter((issue) => issue.trackingNumber.includes(searchValue.toUpperCase()))
                  .map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell className="font-mono text-sm">{issue.trackingNumber}</TableCell>
                      <TableCell className="hidden md:table-cell">{issue.issue}</TableCell>
                      <TableCell>
                        <Badge variant={statusColor[issue.status as keyof typeof statusColor]}>
                          {issue.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant={priorityColor[issue.priority as keyof typeof priorityColor]}>
                          {issue.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">{issue.reportedDate}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </>
  )
}
