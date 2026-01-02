"use client"

import {
  Button,
  Card,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function AdminPricingPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [zones] = useState([
    { id: "1", name: "Domestic", baseRate: 25, perKg: 0.5, minWeight: 0.5 },
    { id: "2", name: "North America", baseRate: 50, perKg: 1.0, minWeight: 1 },
    { id: "3", name: "Europe", baseRate: 75, perKg: 1.5, minWeight: 1 },
    { id: "4", name: "Asia", baseRate: 100, perKg: 2.0, minWeight: 2 },
  ])

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Pricing Management</h1>
            <p className="text-foreground-600">Manage shipping rates and pricing zones</p>
          </div>
          <Button color="primary" startContent={<Plus />} onPress={onOpen}>
            Add Zone
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card className="overflow-hidden">
            <Table aria-label="Pricing zones table">
              <TableHeader>
                <TableColumn>ZONE</TableColumn>
                <TableColumn>BASE RATE</TableColumn>
                <TableColumn>PER KG</TableColumn>
                <TableColumn className="hidden md:table-cell">MIN WEIGHT</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {zones.map((zone) => (
                  <TableRow key={zone.id}>
                    <TableCell className="font-semibold">{zone.name}</TableCell>
                    <TableCell>${zone.baseRate}</TableCell>
                    <TableCell>${zone.perKg}</TableCell>
                    <TableCell className="hidden md:table-cell">{zone.minWeight} kg</TableCell>
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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Add Pricing Zone</ModalHeader>
          <ModalBody className="space-y-4">
            <Input label="Zone Name" placeholder="e.g., Europe" />
            <Input label="Base Rate ($)" type="number" placeholder="0.00" />
            <Input label="Per KG ($)" type="number" placeholder="0.00" />
            <Input label="Minimum Weight (kg)" type="number" placeholder="0.5" />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => onOpenChange()}>
              Cancel
            </Button>
            <Button color="primary" onPress={() => onOpenChange()}>
              Add Zone
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
