"use client"

import {
  Button,
  Card,
  Input,
  Textarea,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import { Plus, Edit2, MapPin, Phone, Clock } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function AdminOfficesPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [offices] = useState([
    {
      id: "1",
      name: "New York Hub",
      address: "123 Main St, New York, NY 10001",
      phone: "+1 (212) 555-0123",
      hours: "24/7",
      capacity: 5000,
    },
    {
      id: "2",
      name: "Los Angeles Hub",
      address: "456 Market St, Los Angeles, CA 90001",
      phone: "+1 (213) 555-0456",
      hours: "24/7",
      capacity: 4500,
    },
    {
      id: "3",
      name: "Chicago Hub",
      address: "789 Commerce St, Chicago, IL 60601",
      phone: "+1 (312) 555-0789",
      hours: "6 AM - 10 PM",
      capacity: 3000,
    },
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
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Office Management</h1>
            <p className="text-foreground-600">Manage shipping offices and facilities</p>
          </div>
          <Button color="primary" startContent={<Plus />} onPress={onOpen}>
            Add Office
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-4 md:gap-6">
          {offices.map((office, idx) => (
            <motion.div
              key={office.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-6 md:p-8 hover:shadow-lg transition">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-4">{office.name}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-1" />
                        <p className="text-foreground-600">{office.address}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-[#0066CC]" />
                        <a href={`tel:${office.phone}`} className="text-[#0066CC] hover:underline">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-[#0066CC]" />
                        <p className="text-foreground-600">{office.hours}</p>
                      </div>
                      <p className="text-sm text-foreground-600">Capacity: {office.capacity} packages/day</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button isIconOnly size="sm" variant="light">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          <ModalHeader>Add New Office</ModalHeader>
          <ModalBody className="space-y-4">
            <Input label="Office Name" placeholder="e.g., New York Hub" />
            <Textarea label="Address" placeholder="Full address" />
            <Input label="Phone" placeholder="+1 (555) 000-0000" />
            <Input label="Hours" placeholder="e.g., 24/7 or 9 AM - 6 PM" />
            <Input label="Daily Capacity" type="number" placeholder="5000" />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => onOpenChange()}>
              Cancel
            </Button>
            <Button color="primary" onPress={() => onOpenChange()}>
              Add Office
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
