"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function AddressesPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [addresses, setAddresses] = useState([
    { id: "1", label: "Home", address: "123 Main St, New York, NY 10001", isDefault: true },
    { id: "2", label: "Office", address: "456 Business Ave, New York, NY 10002", isDefault: false },
  ])
  const [formData, setFormData] = useState({ label: "", address: "" })

  const handleAddAddress = () => {
    if (formData.label && formData.address) {
      setAddresses([...addresses, { id: Date.now().toString(), ...formData, isDefault: false }])
      setFormData({ label: "", address: "" })
      setIsOpen(false)
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
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#0066CC] hover:bg-[#0052A3]">
                <Plus className="w-4 h-4 mr-2" />
                Add Address
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
                <DialogDescription>
                  Add a new shipping address to your account.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Enter address label (e.g., Home, Office)"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                />
                <Input
                  placeholder="Street, City, Country, ZIP"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAddress} className="bg-[#0066CC] hover:bg-[#0052A3]">
                  Add Address
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-4 md:gap-6">
          {addresses.map((addr, idx) => (
            <motion.div
              key={addr.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="hover:shadow-lg transition">
                <CardContent className="p-6">
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
                    <Button variant="outline" size="icon" onClick={() => handleDeleteAddress(addr.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
