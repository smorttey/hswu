"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Smartphone, CreditCard, Edit, Trash2, Star, Phone } from "lucide-react"

interface PaymentMethod {
  id: string
  type: "momo" | "bank"
  name: string
  details: string
  network?: string
  isDefault: boolean
  isVerified: boolean
  lastUsed?: string
}

interface PaymentMethodsProps {
  methods: PaymentMethod[]
  onAddMethod: (method: Omit<PaymentMethod, "id">) => void
  onUpdateMethod: (id: string, method: Partial<PaymentMethod>) => void
  onDeleteMethod: (id: string) => void
  onSetDefault: (id: string) => void
}

export function PaymentMethods({
  methods,
  onAddMethod,
  onUpdateMethod,
  onDeleteMethod,
  onSetDefault,
}: PaymentMethodsProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null)
  const [newMethod, setNewMethod] = useState({
    type: "momo" as "momo" | "bank",
    name: "",
    details: "",
    network: "",
  })

  const networks = [
    { value: "mtn", label: "MTN Mobile Money", color: "bg-yellow-500" },
    { value: "vodafone", label: "Vodafone Cash", color: "bg-red-500" },
    { value: "airteltigo", label: "AirtelTigo Money", color: "bg-blue-500" },
  ]

  const handleAddMethod = () => {
    onAddMethod({
      type: newMethod.type,
      name: newMethod.name,
      details: newMethod.details,
      network: newMethod.type === "momo" ? newMethod.network : undefined,
      isDefault: methods.length === 0,
      isVerified: false,
    })
    setNewMethod({ type: "momo", name: "", details: "", network: "" })
    setIsAddDialogOpen(false)
  }

  const handleEditMethod = () => {
    if (editingMethod) {
      onUpdateMethod(editingMethod.id, {
        name: editingMethod.name,
        details: editingMethod.details,
        network: editingMethod.type === "momo" ? editingMethod.network : undefined,
      })
      setEditingMethod(null)
    }
  }

  const getMethodIcon = (type: string, network?: string) => {
    if (type === "momo") {
      return <Smartphone className="w-5 h-5 text-green-600" />
    }
    return <CreditCard className="w-5 h-5 text-blue-600" />
  }

  const getNetworkColor = (network?: string) => {
    const networkData = networks.find((n) => n.value === network)
    return networkData?.color || "bg-gray-500"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
          <p className="text-gray-600">Manage your saved payment methods</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Method
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
              <DialogDescription>Add a new payment method to your account</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Payment Type</Label>
                <Select
                  value={newMethod.type}
                  onValueChange={(value: "momo" | "bank") => setNewMethod({ ...newMethod, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="momo">Mobile Money</SelectItem>
                    <SelectItem value="bank">Bank Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newMethod.type === "momo" && (
                <>
                  <div className="space-y-2">
                    <Label>Network</Label>
                    <Select
                      value={newMethod.network}
                      onValueChange={(value) => setNewMethod({ ...newMethod, network: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select network" />
                      </SelectTrigger>
                      <SelectContent>
                        {networks.map((network) => (
                          <SelectItem key={network.value} value={network.value}>
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${network.color}`}></div>
                              <span>{network.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="024 123 4567"
                        value={newMethod.details}
                        onChange={(e) => setNewMethod({ ...newMethod, details: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </>
              )}

              {newMethod.type === "bank" && (
                <>
                  <div className="space-y-2">
                    <Label>Bank Name</Label>
                    <Input
                      placeholder="e.g., GCB Bank"
                      value={newMethod.name}
                      onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Number</Label>
                    <Input
                      placeholder="1234567890"
                      value={newMethod.details}
                      onChange={(e) => setNewMethod({ ...newMethod, details: e.target.value })}
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label>Display Name</Label>
                <Input
                  placeholder="e.g., My MTN Number"
                  value={newMethod.name}
                  onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
                />
              </div>

              <div className="flex space-x-2 pt-4">
                <Button onClick={handleAddMethod} className="flex-1">
                  Add Method
                </Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Payment Methods List */}
      <div className="grid gap-4">
        {methods.map((method) => (
          <Card key={method.id} className={`${method.isDefault ? "ring-2 ring-green-500" : ""}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getMethodIcon(method.type, method.network)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{method.name}</h3>
                      {method.isDefault && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          <Star className="w-3 h-3 mr-1" />
                          Default
                        </Badge>
                      )}
                      {method.isVerified ? (
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Verified</Badge>
                      ) : (
                        <Badge variant="outline">Unverified</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      {method.type === "momo" && method.network && (
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${getNetworkColor(method.network)}`}></div>
                          <span className="text-sm text-gray-600">
                            {networks.find((n) => n.value === method.network)?.label}
                          </span>
                        </div>
                      )}
                      <span className="text-sm text-gray-600">
                        {method.type === "momo" ? method.details : `****${method.details.slice(-4)}`}
                      </span>
                    </div>
                    {method.lastUsed && (
                      <p className="text-xs text-gray-500 mt-1">
                        Last used: {new Date(method.lastUsed).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {!method.isDefault && (
                    <Button variant="outline" size="sm" onClick={() => onSetDefault(method.id)}>
                      Set Default
                    </Button>
                  )}

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setEditingMethod(method)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Payment Method</DialogTitle>
                        <DialogDescription>Update your payment method details</DialogDescription>
                      </DialogHeader>
                      {editingMethod && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Display Name</Label>
                            <Input
                              value={editingMethod.name}
                              onChange={(e) => setEditingMethod({ ...editingMethod, name: e.target.value })}
                            />
                          </div>

                          {editingMethod.type === "momo" ? (
                            <div className="space-y-2">
                              <Label>Phone Number</Label>
                              <Input
                                value={editingMethod.details}
                                onChange={(e) => setEditingMethod({ ...editingMethod, details: e.target.value })}
                              />
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Label>Account Number</Label>
                              <Input
                                value={editingMethod.details}
                                onChange={(e) => setEditingMethod({ ...editingMethod, details: e.target.value })}
                              />
                            </div>
                          )}

                          <div className="flex space-x-2 pt-4">
                            <Button onClick={handleEditMethod} className="flex-1">
                              Save Changes
                            </Button>
                            <Button variant="outline" onClick={() => setEditingMethod(null)} className="flex-1">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Payment Method</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this payment method? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDeleteMethod(method.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {methods.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Payment Methods</h3>
              <p className="text-gray-600 mb-4">Add a payment method to make loan payments easily.</p>
              <Button onClick={() => setIsAddDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Method
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
