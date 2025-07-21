"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Plus,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  Bell,
  CreditCard,
  Clock,
  CheckCircle,
  Menu,
  User,
  Settings,
  LogOut,
} from "lucide-react"
import Link from "next/link"

export default function MemberDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const activeLoans = [
    {
      id: "LN001",
      amount: 15000,
      purpose: "Medical Equipment",
      monthlyPayment: 1250,
      nextDue: "2024-02-15",
      balance: 12500,
      progress: 17,
    },
    {
      id: "LN002",
      amount: 8000,
      purpose: "Education",
      monthlyPayment: 800,
      nextDue: "2024-02-20",
      balance: 6400,
      progress: 20,
    },
  ]

  const notifications = [
    {
      id: 1,
      type: "payment",
      message: "Payment of GH₵1,250 due in 3 days",
      time: "2 hours ago",
      urgent: true,
    },
    {
      id: 2,
      type: "approval",
      message: "Your loan application LN003 has been approved",
      time: "1 day ago",
      urgent: false,
    },
    {
      id: 3,
      type: "reminder",
      message: "Update your employment details",
      time: "3 days ago",
      urgent: false,
    },
  ]

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
                <p className="text-xs text-gray-600 hidden sm:block">Member Dashboard</p>
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
                className="flex items-center space-x-3 px-3 py-2 bg-green-50 text-green-700 rounded-lg"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">Dashboard</span>
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
                <DollarSign className="w-4 h-4" />
                <span>Loan Calculator</span>
              </Link>
              <Link
                href="/dashboard/payments"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <CreditCard className="w-4 h-4" />
                <span>Payments</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
              <Link
                href="/settings"
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
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome back, Akosua!</h2>
                <p className="text-green-100">Here's your loan portfolio overview</p>
              </div>
              <div className="hidden md:block">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-green-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Loans</p>
                    <p className="text-2xl font-bold text-green-600">2</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Borrowed</p>
                    <p className="text-2xl font-bold text-blue-600">GH₵23,000</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Outstanding</p>
                    <p className="text-2xl font-bold text-orange-600">GH₵18,900</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Credit Score</p>
                    <p className="text-2xl font-bold text-purple-600">850</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Active Loans */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Active Loans</CardTitle>
                    <CardDescription>Your current loan portfolio</CardDescription>
                  </div>
                  <Link href="/apply">
                    <Button size="sm" className="bg-gradient-to-r from-green-600 to-blue-600">
                      <Plus className="w-4 h-4 mr-2" />
                      New Loan
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeLoans.map((loan) => (
                    <div key={loan.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{loan.purpose}</h4>
                          <p className="text-sm text-gray-600">Loan ID: {loan.id}</p>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Active
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Loan Amount</p>
                          <p className="font-semibold">GH₵{loan.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Balance</p>
                          <p className="font-semibold">GH₵{loan.balance.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Monthly Payment</p>
                          <p className="font-semibold">GH₵{loan.monthlyPayment.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Next Due</p>
                          <p className="font-semibold">{loan.nextDue}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Repayment Progress</span>
                          <span className="font-medium">{loan.progress}%</span>
                        </div>
                        <Progress value={loan.progress} className="h-2" />
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Statement
                        </Button>
                        <Button size="sm" variant="outline">
                          Make Payment
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Notifications & Quick Actions */}
            <div className="space-y-6">
              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${notification.urgent ? "bg-red-500" : "bg-blue-500"}`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </CardContent>
              </Card>

              {/* Loan Eligibility */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-lg text-green-700">Loan Eligibility</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="font-semibold text-gray-900">You're eligible for</p>
                    <p className="text-2xl font-bold text-green-600">GH₵25,000</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Rate</span>
                      <span className="font-medium">12% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max Tenure</span>
                      <span className="font-medium">36 months</span>
                    </div>
                  </div>
                  <Link href="/apply">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Apply Now</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/calculator">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <DollarSign className="w-4 h-4 mr-3" />
                      Loan Calculator
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Download className="w-4 h-4 mr-3" />
                    Download Statements
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Calendar className="w-4 h-4 mr-3" />
                    Payment Schedule
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
