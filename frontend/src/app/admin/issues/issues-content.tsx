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
    OPEN: "danger",
    IN_PROGRESS: "warning",
    RESOLVED: "success",
  } as const

  const priorityColor = {
    LOW: "default",
    MEDIUM: "warning",
    HIGH: "danger",
  } as const

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Issues & Support</h1>
        <p className="text-foreground-600">Track and resolve customer issues</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6">
        <Input
          placeholder="Search by tracking number or issue type"
          startContent={<Search className="w-4 h-4" />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Card className="overflow-hidden">
          <Table aria-label="Issues table">
            <TableHeader>
              <TableColumn>TRACKING</TableColumn>
              <TableColumn className="hidden md:table-cell">ISSUE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn className="hidden md:table-cell">PRIORITY</TableColumn>
              <TableColumn className="hidden lg:table-cell">REPORTED</TableColumn>
              <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody>
              {issues
                .filter((issue) => issue.trackingNumber.includes(searchValue.toUpperCase()))
                .map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell className="font-mono text-sm">{issue.trackingNumber}</TableCell>
                    <TableCell className="hidden md:table-cell">{issue.issue}</TableCell>
                    <TableCell>
                      <Badge color={statusColor[issue.status as keyof typeof statusColor]} variant="flat">
                        {issue.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge color={priorityColor[issue.priority as keyof typeof priorityColor]} variant="flat">
                        {issue.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm">{issue.reportedDate}</TableCell>
                    <TableCell>
                      <Button isIconOnly size="sm" variant="light" startContent={<MessageCircle />}>
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
    </>
  )
}
