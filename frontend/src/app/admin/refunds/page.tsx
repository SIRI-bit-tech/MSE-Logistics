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
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Textarea,
} from "@nextui-org/react"
import { CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function AdminRefundsPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [refunds] = useState([
    {
      id: "1",
      trackingNumber: "SS-2024-001234",
      amount: "$250.00",
      reason: "Package damaged",
      status: "PENDING",
      requestDate: "2024-01-15",
    },
    {
      id: "2",
      trackingNumber: "SS-2024-001235",
      amount: "$320.00",
      reason: "Wrong address",
      status: "APPROVED",
      requestDate: "2024-01-14",
    },
    {
      id: "3",
      trackingNumber: "SS-2024-001236",
      amount: "$450.00",
      reason: "Delivery failed",
      status: "REJECTED",
      requestDate: "2024-01-10",
    },
  ])

  const statusColor = {
    PENDING: "warning",
    APPROVED: "success",
    REJECTED: "danger",
  } as const

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Refund Management</h1>
          <p className="text-foreground-600">Process and track customer refunds</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card className="overflow-hidden">
            <Table aria-label="Refunds table">
              <TableHeader>
                <TableColumn>TRACKING</TableColumn>
                <TableColumn className="hidden md:table-cell">AMOUNT</TableColumn>
                <TableColumn className="hidden lg:table-cell">REASON</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn className="hidden md:table-cell">DATE</TableColumn>
                <TableColumn>ACTION</TableColumn>
              </TableHeader>
              <TableBody>
                {refunds.map((refund) => (
                  <TableRow key={refund.id}>
                    <TableCell className="font-mono text-sm">{refund.trackingNumber}</TableCell>
                    <TableCell className="hidden md:table-cell font-semibold">{refund.amount}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm">{refund.reason}</TableCell>
                    <TableCell>
                      <Badge color={statusColor[refund.status as keyof typeof statusColor]} variant="flat">
                        {refund.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{refund.requestDate}</TableCell>
                    <TableCell>
                      {refund.status === "PENDING" && (
                        <div className="flex gap-2">
                          <Button isIconOnly size="sm" variant="light" color="success" onPress={onOpen}>
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button isIconOnly size="sm" variant="light" color="danger">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </motion.div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Approve Refund</ModalHeader>
          <ModalBody>
            <Textarea label="Refund Notes" placeholder="Add any notes about this refund..." />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => onOpenChange()}>
              Cancel
            </Button>
            <Button color="success" onPress={() => onOpenChange()}>
              Approve Refund
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
