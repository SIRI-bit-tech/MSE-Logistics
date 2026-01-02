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
import { Plus, Trash2, CreditCard } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function PaymentsPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [paymentMethods, setPaymentMethods] = useState([
    { id: "1", type: "CREDIT_CARD", last4: "4242", brand: "Visa", isDefault: true },
    { id: "2", type: "CREDIT_CARD", last4: "5555", brand: "Mastercard", isDefault: false },
  ])

  const handleDeletePayment = (id: string) => {
    setPaymentMethods(paymentMethods.filter((p) => p.id !== id))
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
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Payment Methods</h1>
            <p className="text-foreground-600 mt-2">Manage your billing information</p>
          </div>
          <Button color="primary" startContent={<Plus />} onPress={onOpen}>
            Add Payment Method
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {paymentMethods.map((method, idx) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <CreditCard className="w-8 h-8 text-[#0066CC]" />
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {method.brand} •••• {method.last4}
                      </h3>
                      {method.isDefault && <p className="text-xs text-foreground-600">Default payment method</p>}
                    </div>
                  </div>
                  <Button isIconOnly variant="light" color="danger" onClick={() => handleDeletePayment(method.id)}>
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          <ModalHeader>Add Payment Method</ModalHeader>
          <ModalBody className="space-y-4">
            <Input label="Cardholder Name" placeholder="John Doe" />
            <Input label="Card Number" placeholder="1234 5678 9012 3456" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Expiry Date" placeholder="MM/YY" />
              <Input label="CVV" type="password" placeholder="***" />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => onOpenChange()}>
              Cancel
            </Button>
            <Button color="primary" onPress={() => onOpenChange()}>
              Add Payment Method
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
