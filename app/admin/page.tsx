"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Download,
  Eye,
  UserCheck,
  UserX,
  Menu,
  Bell,
  Settings,
  LogOut,
  BarChart3,
  FileText,
  CreditCard,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("all")

  const stats = [
    {
      title: "Total Applications",
      value: "1,247",
      change: "+12%",
      icon: FileText,
      color: "blue",
    },
    {
      title: "Active Loans",
      value: "892",
      change: "+8%",
      icon: CreditCard,
      color: "green",
    },
    {
      title: "Total Disbursed",
      value: "GH₵12.5M",
      change: "+15%",
      icon: DollarSign,
      color: "orange",
    },
    {
      title: "Default Rate",
      value: "2.1%",
      change: "-0.5%",
      icon: AlertCircle,
      color: "red",
    },
  ]

  const recentApplications = [
    {
      id: "LN2024001",
      applicant: "Clement Mensah",
      amount: 15000,
      purpose: "Medical Equipment",
      status: "pending",
      submittedDate: "2024-01-15",
      hospital: "Korle-Bu Hospital",
    },
    {
      id: "LN2024002",
      applicant: "Kwame Asante",
      amount: 8000,
      purpose: "Education",
      status: "approved",
      submittedDate: "2024-01-14",
      hospital: "Ridge Hospital",
    },
    {
      id: "LN2024003",
      applicant: "Ama Osei",
      amount: 12000,
      purpose: "Home Improvement",
      status: "under_review",
      submittedDate: "2024-01-13",
      hospital: "37 Military Hospital",
    },
    {
      id: "LN2024004",
      applicant: "Kofi Mensah",
      amount: 20000,
      purpose: "Business",
      status: "rejected",
      submittedDate: "2024-01-12",
      hospital: "LEKMA Hospital",
    },
    {
      id: "LN2024005",
      applicant: "Efua Boateng",
      amount: 6000,
      purpose: "Emergency",
      status: "approved",
      submittedDate: "2024-01-11",
      hospital: "Tema General Hospital",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Approved
          </Badge>
        )
      case "under_review":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            Under Review
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatColor = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-600"
      case "green":
        return "bg-green-100 text-green-600"
      case "orange":
        return "bg-orange-100 text-orange-600"
      case "red":
        return "bg-red-100 text-red-600"
      default:
        return "bg-gray-100 text-gray-600"
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
                <p className="text-xs text-gray-600 hidden sm:block">Admin Dashboard</p>
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
                className="flex items-center space-x-3 px-3 py-2 bg-green-50 text-green-700 rounded-lg"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="font-medium">Dashboard</span>
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
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <CreditCard className="w-4 h-4" />
                <span>Active Loans</span>
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
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Admin Dashboard</h2>
                <p className="text-green-100">Manage loan applications and monitor system performance</p>
              </div>
              <div className="hidden md:block">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatColor(stat.color)}`}
                    >
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Applications */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Recent Applications</CardTitle>
                    <CardDescription>Latest loan applications requiring attention</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="under_review">Under Review</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentApplications.map((application) => (
                      <div key={application.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{application.applicant}</h4>
                              <p className="text-sm text-gray-600">{application.hospital}</p>
                            </div>
                          </div>
                          {getStatusBadge(application.status)}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-gray-600">Application ID</p>
                            <p className="font-medium">{application.id}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Amount</p>
                            <p className="font-medium">GH₵{application.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Purpose</p>
                            <p className="font-medium">{application.purpose}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Submitted</p>
                            <p className="font-medium">{application.submittedDate}</p>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          {application.status === "pending" && (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <UserCheck className="w-4 h-4 mr-2" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                              >
                                <UserX className="w-4 h-4 mr-2" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <Button variant="outline">View All Applications</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Alerts */}
            <div className="space-y-6">
              {/* Pending Actions */}
              <Card className="border-orange-100">
                <CardHeader>
                  <CardTitle className="text-lg text-orange-700 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Pending Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-yellow-900">Applications to Review</p>
                      <p className="text-sm text-yellow-700">23 pending applications</p>
                    </div>
                    <Badge className="bg-yellow-600">23</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-red-900">Overdue Payments</p>
                      <p className="text-sm text-red-700">12 accounts overdue</p>
                    </div>
                    <Badge className="bg-red-600">12</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-900">Document Verification</p>
                      <p className="text-sm text-blue-700">8 documents pending</p>
                    </div>
                    <Badge className="bg-blue-600">8</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Today's Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">New Applications</span>
                    <span className="font-semibold text-green-600">+5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Loans Approved</span>
                    <span className="font-semibold text-blue-600">+3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Disbursements</span>
                    <span className="font-semibold text-orange-600">GH₵45,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Collections</span>
                    <span className="font-semibold text-purple-600">GH₵32,500</span>
                  </div>
                </CardContent>
              </Card>

              {/* System Health */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-lg text-green-700">System Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Server Status</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-600">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Database</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-600">Healthy</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Backup</span>
                    <span className="text-sm font-medium text-gray-900">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Users</span>
                    <span className="text-sm font-medium text-gray-900">127</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
