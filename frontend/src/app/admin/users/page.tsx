"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Edit2, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  createdAt: string
  shipmentCount?: number
}

export default function AdminUsersPage() {
  const router = useRouter()
  const { user: currentUser, isAuthenticated, isLoading: authLoading } = useAuth()
  const [searchValue, setSearchValue] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || (currentUser?.role !== "ADMIN" && currentUser?.role !== "SUPER_ADMIN")) {
        toast.error("Access denied. Admin privileges required.")
        router.push("/admin/login")
        return
      }
      fetchUsers()
    }
  }, [authLoading, isAuthenticated, currentUser, router])

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/users')
      
      if (response.ok) {
        const data = await response.json()
        setUsers(data.users || [])
      } else {
        toast.error('Failed to load users')
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('An error occurred while loading users')
    } finally {
      setIsLoading(false)
    }
  }

  const statusColor = {
    CUSTOMER: "default",
    DRIVER: "secondary",
    ADMIN: "destructive",
    SUPER_ADMIN: "destructive",
  } as const

  const handleEditClick = (user: User) => {
    setEditingUser(user)
    setIsEditOpen(true)
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return

    try {
      toast.info('User editing functionality coming soon')
      setIsEditOpen(false)
      setEditingUser(null)
    } catch (error) {
      console.error('Error updating user:', error)
      toast.error('An error occurred while updating user')
    }
  }

  const handleDeleteClick = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      toast.info('User deletion functionality coming soon')
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('An error occurred while deleting user')
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

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
                    <TableHead>NAME</TableHead>
                    <TableHead className="hidden lg:table-cell">EMAIL</TableHead>
                    <TableHead>ROLE</TableHead>
                    <TableHead className="hidden md:table-cell">JOINED</TableHead>
                    <TableHead className="hidden md:table-cell">SHIPMENTS</TableHead>
                    <TableHead>ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    users
                      .filter(
                        (user) =>
                          `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchValue.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchValue.toLowerCase()),
                      )
                      .map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-semibold">
                            {user.firstName} {user.lastName}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-sm">{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={statusColor[user.role as keyof typeof statusColor] || "default"}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{user.shipmentCount || 0}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleEditClick(user)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleDeleteClick(user.id)}
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Edit User Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            {editingUser && (
              <form onSubmit={handleEditSubmit} className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-firstName">First Name</Label>
                    <Input 
                      id="edit-firstName"
                      value={editingUser.firstName}
                      onChange={(e) => setEditingUser({ 
                        ...editingUser, 
                        firstName: e.target.value 
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-lastName">Last Name</Label>
                    <Input 
                      id="edit-lastName"
                      value={editingUser.lastName}
                      onChange={(e) => setEditingUser({ 
                        ...editingUser, 
                        lastName: e.target.value 
                      })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input 
                    id="edit-email"
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select 
                    value={editingUser.role}
                    onValueChange={(value) => setEditingUser({ ...editingUser, role: value })}
                  >
                    <SelectTrigger id="edit-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CUSTOMER">Customer</SelectItem>
                      <SelectItem value="DRIVER">Driver</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    Save Changes
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setIsEditOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
