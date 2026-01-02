"use client"

import {
  Button,
  Card,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react"
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function AddressesPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [addresses, setAddresses] = useState([
    { id: "1", label: "Home", address: "123 Main St, New York, NY 10001", isDefault: true },
    { id: "2", label: "Office", address: "456 Business Ave, New York, NY 10002", isDefault: false },
  ])
  const [formData, setFormData] = useState({ label: "", address: "" })

  const handleAddAddress = () => {
    if (formData.label && formData.address) {
      setAddresses([...addresses, { id: Date.now().toString(), ...formData, isDefault: false }])
      setFormData({ label: "", address: "" })
      onOpenChange()
    }
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id))
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Saved Addresses</h1>
            <p className="text-foreground-600 mt-2">Manage your shipping addresses</p>
          </div>
          <Button color="primary" startContent={<Plus />} onPress={onOpen}>
            Add Address
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-4 md:gap-6">
          {addresses.map((addr, idx) => (
            <motion.div
              key={addr.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg text-foreground">{addr.label}</h3>
                      {addr.isDefault && (
                        <span className="text-xs bg-[#0066CC] text-white px-2 py-1 rounded">Default</span>
                      )}
                    </div>
                    <p className="text-foreground-600">{addr.address}</p>
                  </div>
                  <Button isIconOnly variant="light" color="danger" onClick={() => handleDeleteAddress(addr.id)}>
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Add New Address</ModalHeader>
          <ModalBody>
            <Input
              label="Label (e.g., Home, Office)"
              placeholder="Enter address label"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            />
            <Input
              label="Full Address"
              placeholder="Street, City, Country, ZIP"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => onOpenChange()}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleAddAddress}>
              Add Address
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
