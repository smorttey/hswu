"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Search,
  Filter,
  Eye,
  FileText,
  User,
  DollarSign,
  Calendar,
  Download,
  Menu,
  Bell,
  Settings,
  LogOut,
  Users,
  TrendingUp,
  BarChart3,
  UserCheck,
  UserX,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

export default function AdminApplicationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTab, setSelectedTab] = useState("all")

  const applications = [
    {
      id: "LN2024001",
      applicant: {
        name: "Clement Mensah",
        email: "c.mensah@korlebu.gov.gh",
        phone: "+233 24 123 4567",
        position: "Senior Nurse",
        hospital: "Korle-Bu Teaching Hospital",
        yearsOfService: 8,
        employeeId: "KB2016001",
      },
      loan: {
        amount: 15000,
        purpose: "Medical Equipment Purchase",
        duration: 24,
        interestRate: 12,
        monthlyPayment: 706,
      },
      status: "pending",
      submittedDate: "2024-01-15",
      assignedOfficer: "Samuel Adjei",
      creditScore: 750,
      riskLevel: "low",
      priority: "normal",
    },
    {
      id: "LN2024002",
      applicant: {
        name: "Kwame Asante",
        email: "kwame.asante@ridge.gov.gh",
        phone: "+233 20 456 7890",
        position: "Lab Technician",
        hospital: "Ridge Hospital",
        yearsOfService: 5,
        employeeId: "RH2019045",
      },
      loan: {
        amount: 8000,
        purpose: "Education/Training",
        duration: 18,
        interestRate: 12,
        monthlyPayment: 497,
      },
      status: "under_review",
      submittedDate: "2024-01-14",
      assignedOfficer: "Samuel Adjei",
      creditScore: 680,
      riskLevel: "medium",
      priority: "high",
    },
    {
      id: "LN2024003",
      applicant: {
        name: "Ama Osei",
        email: "ama.osei@37mh.gov.gh",
        phone: "+233 24 789 0123",
        position: "Midwife",
        hospital: "37 Military Hospital",
        yearsOfService: 12,
        employeeId: "MH2012078",
      },
      loan: {
        amount: 12000,
        purpose: "Home Improvement",
        duration: 30,
        interestRate: 12,
        monthlyPayment: 463,
      },
      status: "approved",
      submittedDate: "2024-01-13",
      assignedOfficer: "Samuel Adjei",
      creditScore: 820,
      riskLevel: "low",
      priority: "normal",
      approvedDate: "2024-01-17",
    },
    {
      id: "LN2024004",
      applicant: {
        name: "Kofi Mensah",
        email: "kofi.mensah@lekma.gov.gh",
        phone: "+233 20 111 2222",
        position: "Pharmacist",
        hospital: "LEKMA Hospital",
        yearsOfService: 3,
        employeeId: "LK2021089",
      },
      loan: {
        amount: 20000,
        purpose: "Business Investment",
        duration: 36,
        interestRate: 14,
        monthlyPayment: 685,
      },
      status: "rejected",
      submittedDate: "2024-01-12",
      assignedOfficer: "Grace Boateng",
      creditScore: 580,
      riskLevel: "high",
      priority: "low",
      rejectedDate: "2024-01-18",
      rejectionReason: "Insufficient credit history",
    },
  ]

  const stats = [
    { title: "Total Applications", value: "1,247", change: "+12%", color: "blue" },
    { title: "Pending Review", value: "23", change: "+3", color: "orange" },
    { title: "Approved Today", value: "8", change: "+2", color: "green" },
    { title: "Rejection Rate", value: "8.5%", change: "-1.2%", color: "red" },
  ]

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant.hospital.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    const matchesTab = selectedTab === "all" || app.status === selectedTab
    return matchesSearch && matchesStatus && matchesTab
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            Pending
          </Badge>
        )
      case "under_review":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            Under Review
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Approved
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

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>
      case "normal":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Normal</Badge>
      case "low":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Low</Badge>
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
                <p className="text-xs text-gray-600 hidden sm:block">Applications Management</p>
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
                className="flex items-center space-x-3 px-3 py-2 bg-green-50 text-green-700 rounded-lg"
              >
                <FileText className="w-4 h-4" />
                <span className="font-medium">Applications</span>
              </Link>
              <Link
                href="/admin/loans"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <DollarSign className="w-4 h-4" />
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
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Applications Management</h2>
              <p className="text-gray-600">Review and manage all loan applications</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="bg-gradient-to-r from-green-600 to-blue-600">
                <FileText className="w-4 h-4 mr-2" />
                New Application
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

          {/* Applications Table */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <CardTitle>All Applications</CardTitle>
                  <CardDescription>Manage and review loan applications</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search applications..."
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
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
                  <TabsTrigger value="pending">
                    Pending ({applications.filter((app) => app.status === "pending").length})
                  </TabsTrigger>
                  <TabsTrigger value="under_review">
                    Review ({applications.filter((app) => app.status === "under_review").length})
                  </TabsTrigger>
                  <TabsTrigger value="approved">
                    Approved ({applications.filter((app) => app.status === "approved").length})
                  </TabsTrigger>
                  <TabsTrigger value="rejected">
                    Rejected ({applications.filter((app) => app.status === "rejected").length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={selectedTab} className="mt-6">
                  <div className="space-y-4">
                    {filteredApplications.map((application) => (
                      <div key={application.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">{application.applicant.name}</h4>
                              <p className="text-sm text-gray-600">
                                {application.applicant.position} • {application.applicant.hospital}
                              </p>
                              <p className="text-xs text-gray-500">
                                ID: {application.id} • Officer: {application.assignedOfficer}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(application.status)}
                            {getPriorityBadge(application.priority)}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Amount</p>
                            <p className="font-semibold text-lg">GH₵{application.loan.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Purpose</p>
                            <p className="font-medium">{application.loan.purpose}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Credit Score</p>
                            <p className="font-semibold text-lg text-green-600">{application.creditScore}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Submitted</p>
                            <p className="font-medium">{application.submittedDate}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-4 h-4" />
                              <span>GH₵{application.loan.monthlyPayment}/month</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{application.loan.duration} months</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="capitalize">{application.riskLevel} risk</span>
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
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
