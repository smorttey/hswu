"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Search,
  Filter,
  Eye,
  DollarSign,
  Calendar,
  Phone,
  TrendingUp,
  AlertTriangle,
  Download,
  Menu,
  Bell,
  Settings,
  LogOut,
  Users,
  BarChart3,
  FileText,
  CreditCard,
} from "lucide-react"
import Link from "next/link"

export default function AdminLoansPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const activeLoans = [
    {
      id: "LN2024001",
      borrower: {
        name: "Clement Mensah",
        email: "c.mensah@korlebu.gov.gh",
        phone: "+233 24 123 4567",
        position: "Senior Nurse",
        hospital: "Korle-Bu Teaching Hospital",
      },
      loan: {
        amount: 15000,
        disbursedAmount: 15000,
        balance: 12500,
        monthlyPayment: 706,
        interestRate: 12,
        duration: 24,
        remainingMonths: 18,
        purpose: "Medical Equipment",
      },
      payment: {
        nextDueDate: "2024-02-15",
        lastPaymentDate: "2024-01-15",
        lastPaymentAmount: 706,
        totalPaid: 2500,
        status: "current",
        daysOverdue: 0,
      },
      disbursedDate: "2023-12-01",
      maturityDate: "2025-12-01",
      status: "active",
      riskLevel: "low",
    },
    {
      id: "LN2024002",
      borrower: {
        name: "Kwame Asante",
        email: "kwame.asante@ridge.gov.gh",
        phone: "+233 20 456 7890",
        position: "Lab Technician",
        hospital: "Ridge Hospital",
      },
      loan: {
        amount: 8000,
        disbursedAmount: 8000,
        balance: 6400,
        monthlyPayment: 497,
        interestRate: 12,
        duration: 18,
        remainingMonths: 13,
        purpose: "Education",
      },
      payment: {
        nextDueDate: "2024-02-20",
        lastPaymentDate: "2024-01-20",
        lastPaymentAmount: 497,
        totalPaid: 1600,
        status: "current",
        daysOverdue: 0,
      },
      disbursedDate: "2023-11-20",
      maturityDate: "2025-05-20",
      status: "active",
      riskLevel: "medium",
    },
    {
      id: "LN2024003",
      borrower: {
        name: "Ama Osei",
        email: "ama.osei@37mh.gov.gh",
        phone: "+233 24 789 0123",
        position: "Midwife",
        hospital: "37 Military Hospital",
      },
      loan: {
        amount: 12000,
        disbursedAmount: 12000,
        balance: 9600,
        monthlyPayment: 463,
        interestRate: 12,
        duration: 30,
        remainingMonths: 21,
        purpose: "Home Improvement",
      },
      payment: {
        nextDueDate: "2024-02-10",
        lastPaymentDate: "2024-01-05",
        lastPaymentAmount: 463,
        totalPaid: 2400,
        status: "overdue",
        daysOverdue: 5,
      },
      disbursedDate: "2023-10-10",
      maturityDate: "2026-04-10",
      status: "active",
      riskLevel: "high",
    },
    {
      id: "LN2024004",
      borrower: {
        name: "Kofi Boateng",
        email: "kofi.boateng@tema.gov.gh",
        phone: "+233 20 333 4444",
        position: "Radiographer",
        hospital: "Tema General Hospital",
      },
      loan: {
        amount: 10000,
        disbursedAmount: 10000,
        balance: 0,
        monthlyPayment: 555,
        interestRate: 12,
        duration: 20,
        remainingMonths: 0,
        purpose: "Business",
      },
      payment: {
        nextDueDate: null,
        lastPaymentDate: "2024-01-10",
        lastPaymentAmount: 555,
        totalPaid: 10000,
        status: "completed",
        daysOverdue: 0,
      },
      disbursedDate: "2022-05-10",
      maturityDate: "2024-01-10",
      status: "completed",
      riskLevel: "low",
    },
  ]

  const stats = [
    { title: "Total Active Loans", value: "892", change: "+8%", color: "blue" },
    { title: "Total Outstanding", value: "GH₵12.5M", change: "+5%", color: "green" },
    { title: "Overdue Loans", value: "23", change: "-2", color: "red" },
    { title: "Collection Rate", value: "97.8%", change: "+0.5%", color: "purple" },
  ]

  const filteredLoans = activeLoans.filter((loan) => {
    const matchesSearch =
      loan.borrower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.borrower.hospital.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || loan.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Active
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            Completed
          </Badge>
        )
      case "overdue":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            Overdue
          </Badge>
        )
      case "defaulted":
        return (
          <Badge variant="outline" className="text-gray-600 border-gray-600">
            Defaulted
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string, daysOverdue: number) => {
    switch (status) {
      case "current":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Current</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{daysOverdue} days overdue</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low Risk</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium Risk</Badge>
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High Risk</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
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
                <p className="text-xs text-gray-600 hidden sm:block">Active Loans Management</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-600">System Administrator</p>
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
                href="/admin"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/admin/applications"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <FileText className="w-4 h-4" />
                <span>Applications</span>
              </Link>
              <Link
                href="/admin/loans"
                className="flex items-center space-x-3 px-3 py-2 bg-green-50 text-green-700 rounded-lg"
              >
                <DollarSign className="w-4 h-4" />
                <span className="font-medium">Active Loans</span>
              </Link>
              <Link
                href="/admin/members"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <Users className="w-4 h-4" />
                <span>Members</span>
              </Link>
              <Link
                href="/admin/reports"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Reports</span>
              </Link>
              <Link
                href="/admin/settings"
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
              <h2 className="text-2xl font-bold text-gray-900">Active Loans Management</h2>
              <p className="text-gray-600">Monitor and manage all active loan accounts</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button className="bg-gradient-to-r from-green-600 to-blue-600">
                <CreditCard className="w-4 h-4 mr-2" />
                Loan Analytics
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Loans Management */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <CardTitle>Active Loan Portfolio</CardTitle>
                  <CardDescription>Monitor loan performance and payment status</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search loans..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="defaulted">Defaulted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                {filteredLoans.map((loan) => (
                  <div key={loan.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{loan.borrower.name}</h4>
                          <p className="text-sm text-gray-600">
                            {loan.borrower.position} • {loan.borrower.hospital}
                          </p>
                          <p className="text-xs text-gray-500">Loan ID: {loan.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(loan.status)}
                        {getPaymentStatusBadge(loan.payment.status, loan.payment.daysOverdue)}
                        {getRiskBadge(loan.riskLevel)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Original Amount</p>
                        <p className="font-semibold text-lg">GH₵{loan.loan.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Outstanding Balance</p>
                        <p className="font-semibold text-lg text-orange-600">GH₵{loan.loan.balance.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Monthly Payment</p>
                        <p className="font-semibold text-lg">GH₵{loan.loan.monthlyPayment}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Next Due Date</p>
                        <p className="font-semibold">{loan.payment.nextDueDate || "Completed"}</p>
                      </div>
                    </div>

                    {/* Repayment Progress */}
                    {loan.status === "active" && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Repayment Progress</span>
                          <span className="font-medium">
                            {Math.round(((loan.loan.duration - loan.loan.remainingMonths) / loan.loan.duration) * 100)}%
                          </span>
                        </div>
                        <Progress
                          value={((loan.loan.duration - loan.loan.remainingMonths) / loan.loan.duration) * 100}
                          className="h-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>
                            {loan.loan.duration - loan.loan.remainingMonths} of {loan.loan.duration} months
                          </span>
                          <span>{loan.loan.remainingMonths} months remaining</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span>Total Paid: GH₵{loan.payment.totalPaid.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Last Payment: {loan.payment.lastPaymentDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>{loan.loan.interestRate}% p.a.</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                        {loan.payment.status === "overdue" && (
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Follow Up
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
