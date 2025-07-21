"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentModal } from "@/components/payment/payment-modal"
import { PaymentHistory } from "@/components/payment/payment-history"
import { PaymentMethods } from "@/components/payment/payment-methods"
import {
  Heart,
  CreditCard,
  DollarSign,
  TrendingUp,
  Plus,
  Menu,
  Bell,
  User,
  LogOut,
  Calculator,
  Settings,
} from "lucide-react"
import Link from "next/link"

export default function PaymentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [selectedLoan, setSelectedLoan] = useState<any>(null)

  // Mock data
  const activeLoans = [
    {
      id: "LN001",
      amount: 15000,
      purpose: "Medical Equipment",
      monthlyPayment: 1250,
      nextDue: "2024-02-15",
      balance: 12500,
      daysUntilDue: 3,
    },
    {
      id: "LN002",
      amount: 8000,
      purpose: "Education",
      monthlyPayment: 800,
      nextDue: "2024-02-20",
      balance: 6400,
      daysUntilDue: 8,
    },
  ]

  const transactions = [
    {
      id: "TXN001",
      date: "2024-01-15",
      amount: 1250,
      method: "momo" as const,
      network: "mtn",
      status: "completed" as const,
      loanId: "LN001",
      reference: "REF001",
      fee: 5.0,
      description: "Monthly loan payment",
    },
    {
      id: "TXN002",
      date: "2024-01-10",
      amount: 800,
      method: "bank" as const,
      status: "completed" as const,
      loanId: "LN002",
      reference: "REF002",
      fee: 0.0,
      description: "Monthly loan payment",
    },
    {
      id: "TXN003",
      date: "2024-01-05",
      amount: 1250,
      method: "momo" as const,
      network: "vodafone",
      status: "failed" as const,
      loanId: "LN001",
      reference: "REF003",
      fee: 5.0,
      description: "Monthly loan payment",
    },
  ]

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "PM001",
      type: "momo" as const,
      name: "My MTN Number",
      details: "024 123 4567",
      network: "mtn",
      isDefault: true,
      isVerified: true,
      lastUsed: "2024-01-15",
    },
    {
      id: "PM002",
      type: "bank" as const,
      name: "GCB Savings",
      details: "1234567890",
      isDefault: false,
      isVerified: true,
      lastUsed: "2024-01-10",
    },
  ])

  const handleMakePayment = (loan: any) => {
    setSelectedLoan(loan)
    setPaymentModalOpen(true)
  }

  const handlePaymentSuccess = (transactionId: string) => {
    console.log("Payment successful:", transactionId)
    setPaymentModalOpen(false)
    setSelectedLoan(null)
    // Refresh data here
  }

  const handleAddPaymentMethod = (method: any) => {
    const newMethod = {
      ...method,
      id: `PM${Date.now()}`,
    }
    setPaymentMethods([...paymentMethods, newMethod])
  }

  const handleUpdatePaymentMethod = (id: string, updates: any) => {
    setPaymentMethods((methods) => methods.map((method) => (method.id === id ? { ...method, ...updates } : method)))
  }

  const handleDeletePaymentMethod = (id: string) => {
    setPaymentMethods((methods) => methods.filter((method) => method.id !== id))
  }

  const handleSetDefaultPaymentMethod = (id: string) => {
    setPaymentMethods((methods) =>
      methods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">HSWU Fund Loan</h1>
                <p className="text-xs text-gray-600 hidden sm:block">Payments & Transactions</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-green-600" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Akosua Mensah</p>
                <p className="text-xs text-gray-600">Senior Nurse</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}
        >
          <div className="p-6 space-y-6">
            <nav className="space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/apply"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Apply for Loan</span>
              </Link>
              <Link
                href="/calculator"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <Calculator className="w-4 h-4" />
                <span>Loan Calculator</span>
              </Link>
              <Link
                href="/dashboard/payments"
                className="flex items-center space-x-3 px-3 py-2 bg-green-50 text-green-700 rounded-lg"
              >
                <CreditCard className="w-4 h-4" />
                <span className="font-medium">Payments</span>
              </Link>
              <Link
                href="/dashboard/profile"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </nav>

            <div className="pt-6 border-t">
              <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="w-4 h-4 mr-3" />
                Sign Out
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Payments & Transactions</h2>
              <p className="text-gray-600">Manage your loan payments and view transaction history</p>
            </div>
          </div>

          {/* Quick Payment Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                Quick Payment
              </CardTitle>
              <CardDescription>Make payments for your active loans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {activeLoans.map((loan) => (
                  <div key={loan.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{loan.purpose}</h4>
                        <span className="text-sm text-gray-500">Loan ID: {loan.id}</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Monthly Payment</p>
                          <p className="font-semibold">GH₵{loan.monthlyPayment.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Next Due</p>
                          <p className="font-semibold">{loan.nextDue}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Balance</p>
                          <p className="font-semibold">GH₵{loan.balance.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Days Until Due</p>
                          <p className={`font-semibold ${loan.daysUntilDue <= 5 ? "text-red-600" : "text-green-600"}`}>
                            {loan.daysUntilDue} days
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <Button
                        onClick={() => handleMakePayment(loan)}
                        className={`${
                          loan.daysUntilDue <= 5 ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tabs for different sections */}
          <Tabs defaultValue="history" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="history">Transaction History</TabsTrigger>
              <TabsTrigger value="methods">Payment Methods</TabsTrigger>
            </TabsList>

            <TabsContent value="history">
              <PaymentHistory transactions={transactions} />
            </TabsContent>

            <TabsContent value="methods">
              <PaymentMethods
                methods={paymentMethods}
                onAddMethod={handleAddPaymentMethod}
                onUpdateMethod={handleUpdatePaymentMethod}
                onDeleteMethod={handleDeletePaymentMethod}
                onSetDefault={handleSetDefaultPaymentMethod}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Payment Modal */}
      {selectedLoan && (
        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={() => {
            setPaymentModalOpen(false)
            setSelectedLoan(null)
          }}
          amount={selectedLoan.monthlyPayment}
          loanId={selectedLoan.id}
          memberName="Akosua Mensah"
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  )
}
