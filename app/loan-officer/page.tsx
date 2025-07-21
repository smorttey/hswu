"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Heart,
  Search,
  Filter,
  Eye,
  FileText,
  User,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Download,
  MessageSquare,
  History,
  Menu,
  Bell,
  Settings,
  LogOut,
  Users,
  TrendingUp,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function LoanOfficerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTab, setSelectedTab] = useState("pending")

  const applications = [
    {
      id: "LN2024001",
      applicant: {
        name: "Akosua Mensah",
        email: "akosua.mensah@korlebu.gov.gh",
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
      financial: {
        monthlyIncome: 3500,
        otherIncome: 500,
        monthlyExpenses: 2000,
        bankName: "GCB Bank",
        accountNumber: "1234567890",
      },
      guarantors: [
        { name: "Dr. Kofi Mensah", phone: "+233 20 987 6543", relationship: "Colleague" },
        { name: "Nurse Ama Osei", phone: "+233 24 555 7890", relationship: "Supervisor" },
      ],
      documents: [
        { name: "Payslips (3 months)", status: "verified", uploadDate: "2024-01-10" },
        { name: "Bank Statements", status: "pending", uploadDate: "2024-01-10" },
        { name: "Employment Letter", status: "verified", uploadDate: "2024-01-10" },
        { name: "National ID", status: "verified", uploadDate: "2024-01-10" },
      ],
      status: "pending",
      submittedDate: "2024-01-15",
      assignedOfficer: "Samuel Adjei",
      creditScore: 750,
      riskLevel: "low",
      notes: [],
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
      financial: {
        monthlyIncome: 2800,
        otherIncome: 200,
        monthlyExpenses: 1800,
        bankName: "Ecobank Ghana",
        accountNumber: "9876543210",
      },
      guarantors: [
        { name: "Dr. Yaw Boateng", phone: "+233 24 111 2222", relationship: "Head of Department" },
        { name: "Mary Adjei", phone: "+233 20 333 4444", relationship: "Colleague" },
      ],
      documents: [
        { name: "Payslips (3 months)", status: "verified", uploadDate: "2024-01-12" },
        { name: "Bank Statements", status: "verified", uploadDate: "2024-01-12" },
        { name: "Employment Letter", status: "verified", uploadDate: "2024-01-12" },
        { name: "Training Course Details", status: "pending", uploadDate: "2024-01-12" },
      ],
      status: "under_review",
      submittedDate: "2024-01-14",
      assignedOfficer: "Samuel Adjei",
      creditScore: 680,
      riskLevel: "medium",
      notes: [
        {
          id: 1,
          author: "Samuel Adjei",
          date: "2024-01-16",
          content: "Applicant has good employment history. Need to verify training course details.",
        },
      ],
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
      financial: {
        monthlyIncome: 3200,
        otherIncome: 800,
        monthlyExpenses: 2200,
        bankName: "Stanbic Bank",
        accountNumber: "5555666677",
      },
      guarantors: [
        { name: "Colonel Dr. Asante", phone: "+233 20 555 6666", relationship: "Senior Officer" },
        { name: "Grace Mensah", phone: "+233 24 777 8888", relationship: "Colleague" },
      ],
      documents: [
        { name: "Payslips (3 months)", status: "verified", uploadDate: "2024-01-11" },
        { name: "Bank Statements", status: "verified", uploadDate: "2024-01-11" },
        { name: "Employment Letter", status: "verified", uploadDate: "2024-01-11" },
        { name: "Property Documents", status: "verified", uploadDate: "2024-01-11" },
      ],
      status: "approved",
      submittedDate: "2024-01-13",
      assignedOfficer: "Samuel Adjei",
      creditScore: 820,
      riskLevel: "low",
      approvedDate: "2024-01-17",
      notes: [
        {
          id: 1,
          author: "Samuel Adjei",
          date: "2024-01-17",
          content: "Excellent credit history and stable employment. Approved for full amount.",
        },
      ],
    },
  ]

  const stats = [
    {
      title: "Assigned Applications",
      value: "23",
      change: "+3 today",
      icon: FileText,
      color: "blue",
    },
    {
      title: "Pending Review",
      value: "8",
      change: "2 urgent",
      icon: Clock,
      color: "orange",
    },
    {
      title: "Approved This Month",
      value: "15",
      change: "+25%",
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Average Processing Time",
      value: "2.3 days",
      change: "-0.5 days",
      icon: TrendingUp,
      color: "purple",
    },
  ]

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            Pending Review
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

  const getStatColor = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-600"
      case "green":
        return "bg-green-100 text-green-600"
      case "orange":
        return "bg-orange-100 text-orange-600"
      case "purple":
        return "bg-purple-100 text-purple-600"
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
                <p className="text-xs text-gray-600 hidden sm:block">Loan Officer Dashboard</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Samuel Adjei</p>
                <p className="text-xs text-gray-600">Loan Officer</p>
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
                href="/loan-officer"
                className="flex items-center space-x-3 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link
                href="/loan-officer/applications"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <FileText className="w-4 h-4" />
                <span>Applications</span>
              </Link>
              <Link
                href="/loan-officer/approved"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Approved Loans</span>
              </Link>
              <Link
                href="/loan-officer/members"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <Users className="w-4 h-4" />
                <span>Member Profiles</span>
              </Link>
              <Link
                href="/loan-officer/reports"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <TrendingUp className="w-4 h-4" />
                <span>My Reports</span>
              </Link>
              <Link
                href="/loan-officer/settings"
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
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome back, Samuel!</h2>
                <p className="text-blue-100">You have 8 applications pending review today</p>
              </div>
              <div className="hidden md:block">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white" />
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
                      <p className="text-sm text-gray-500">{stat.change}</p>
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

          {/* Applications Management */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <CardTitle className="text-xl">Application Review</CardTitle>
                  <CardDescription>Review and process loan applications</CardDescription>
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
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="pending">
                    Pending ({applications.filter((app) => app.status === "pending").length})
                  </TabsTrigger>
                  <TabsTrigger value="under_review">
                    Under Review ({applications.filter((app) => app.status === "under_review").length})
                  </TabsTrigger>
                  <TabsTrigger value="approved">
                    Approved ({applications.filter((app) => app.status === "approved").length})
                  </TabsTrigger>
                  <TabsTrigger value="all">All Applications</TabsTrigger>
                </TabsList>

                <TabsContent value={selectedTab} className="mt-6">
                  <div className="space-y-4">
                    {filteredApplications
                      .filter((app) => selectedTab === "all" || app.status === selectedTab)
                      .map((application) => (
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
                                <p className="text-xs text-gray-500">Application ID: {application.id}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(application.status)}
                              {getRiskBadge(application.riskLevel)}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-600">Loan Amount</p>
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
                                <TrendingUp className="w-4 h-4" />
                                <span>{application.loan.interestRate}% p.a.</span>
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setSelectedApplication(application)}
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    Review
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>Application Review - {application.id}</DialogTitle>
                                    <DialogDescription>
                                      Complete review for {application.applicant.name}
                                    </DialogDescription>
                                  </DialogHeader>

                                  <ApplicationReviewModal application={application} />
                                </DialogContent>
                              </Dialog>

                              {application.status === "pending" && (
                                <>
                                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                                  >
                                    <XCircle className="w-4 h-4 mr-2" />
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

// Application Review Modal Component
function ApplicationReviewModal({ application }: { application: any }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [newNote, setNewNote] = useState("")
  const [decision, setDecision] = useState("")
  const [decisionNotes, setDecisionNotes] = useState("")

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="guarantors">Guarantors</TabsTrigger>
          <TabsTrigger value="decision">Decision</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Applicant Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{application.applicant.name}</h3>
                    <p className="text-gray-600">{application.applicant.position}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{application.applicant.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{application.applicant.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{application.applicant.hospital}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{application.applicant.yearsOfService} years of service</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Loan Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Amount Requested</p>
                    <p className="text-2xl font-bold text-green-600">GH₵{application.loan.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="text-xl font-semibold">{application.loan.duration} months</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Interest Rate</p>
                    <p className="text-xl font-semibold">{application.loan.interestRate}% p.a.</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Monthly Payment</p>
                    <p className="text-xl font-semibold">GH₵{application.loan.monthlyPayment}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Purpose</p>
                  <p className="font-medium">{application.loan.purpose}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-10 h-10 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600">Credit Score</p>
                  <p className="text-2xl font-bold text-green-600">{application.creditScore}</p>
                  <p className="text-xs text-green-600">Excellent</p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-10 h-10 text-blue-600" />
                  </div>
                  <p className="text-sm text-blue-700 mb-1">Debt-to-Income</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round((application.loan.monthlyPayment / application.financial.monthlyIncome) * 100)}%
                  </p>
                  <p className="text-xs text-blue-600">Acceptable</p>
                </div>

                <div className="text-center">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 ${
                      application.riskLevel === "low"
                        ? "bg-green-100"
                        : application.riskLevel === "medium"
                          ? "bg-yellow-100"
                          : "bg-red-100"
                    }`}
                  >
                    <AlertTriangle
                      className={`w-10 h-10 ${
                        application.riskLevel === "low"
                          ? "text-green-600"
                          : application.riskLevel === "medium"
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    />
                  </div>
                  <p className="text-sm text-gray-600">Risk Level</p>
                  <p
                    className={`text-2xl font-bold capitalize ${
                      application.riskLevel === "low"
                        ? "text-green-600"
                        : application.riskLevel === "medium"
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {application.riskLevel}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Tab */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Income Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Salary</span>
                  <span className="font-semibold">GH₵{application.financial.monthlyIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Other Income</span>
                  <span className="font-semibold">GH₵{application.financial.otherIncome.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Monthly Income</span>
                    <span className="font-bold text-green-600">
                      GH₵{(application.financial.monthlyIncome + application.financial.otherIncome).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Expenses & Banking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Expenses</span>
                  <span className="font-semibold">GH₵{application.financial.monthlyExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Disposable Income</span>
                  <span className="font-semibold text-blue-600">
                    GH₵
                    {(
                      application.financial.monthlyIncome +
                      application.financial.otherIncome -
                      application.financial.monthlyExpenses
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="border-t pt-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Bank</span>
                    <span className="font-medium">{application.financial.bankName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Account</span>
                    <span className="font-mono text-sm">****{application.financial.accountNumber.slice(-4)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Financial Ratios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700 mb-1">Loan-to-Income Ratio</p>
                  <p className="text-2xl font-bold text-green-600">
                    {Math.round(
                      (application.loan.monthlyPayment /
                        (application.financial.monthlyIncome + application.financial.otherIncome)) *
                        100,
                    )}
                    %
                  </p>
                  <p className="text-xs text-green-600">Recommended: 30%</p>
                </div>

                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 mb-1">Expense Ratio</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round(
                      (application.financial.monthlyExpenses /
                        (application.financial.monthlyIncome + application.financial.otherIncome)) *
                        100,
                    )}
                    %
                  </p>
                  <p className="text-xs text-blue-600">Current spending</p>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-700 mb-1">Savings Capacity</p>
                  <p className="text-2xl font-bold text-purple-600">
                    GH₵
                    {(
                      application.financial.monthlyIncome +
                      application.financial.otherIncome -
                      application.financial.monthlyExpenses -
                      application.loan.monthlyPayment
                    ).toLocaleString()}
                  </p>
                  <p className="text-xs text-purple-600">After loan payment</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Document Verification</CardTitle>
              <CardDescription>Review and verify uploaded documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {application.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-600">Uploaded: {doc.uploadDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge
                        className={
                          doc.status === "verified"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : doc.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      >
                        {doc.status === "verified" ? "Verified" : doc.status === "pending" ? "Pending" : "Rejected"}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Guarantors Tab */}
        <TabsContent value="guarantors" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {application.guarantors.map((guarantor, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">Guarantor {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{guarantor.name}</p>
                      <p className="text-sm text-gray-600">{guarantor.relationship}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{guarantor.phone}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      SMS
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Decision Tab */}
        <TabsContent value="decision" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Application Decision</CardTitle>
              <CardDescription>Make your final decision on this loan application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="decision" className="text-sm font-medium">
                    Decision
                  </Label>
                  <Select value={decision} onValueChange={setDecision}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select your decision" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approve">Approve</SelectItem>
                      <SelectItem value="reject">Reject</SelectItem>
                      <SelectItem value="request_more_info">Request More Information</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="decisionNotes" className="text-sm font-medium">
                    Decision Notes
                  </Label>
                  <Textarea
                    id="decisionNotes"
                    placeholder="Provide detailed reasoning for your decision..."
                    value={decisionNotes}
                    onChange={(e) => setDecisionNotes(e.target.value)}
                    className="mt-2 min-h-[120px]"
                  />
                </div>

                {decision === "approve" && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Approval Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-green-700">Approved Amount</p>
                        <p className="font-semibold">GH₵{application.loan.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-green-700">Interest Rate</p>
                        <p className="font-semibold">{application.loan.interestRate}% p.a.</p>
                      </div>
                      <div>
                        <p className="text-green-700">Duration</p>
                        <p className="font-semibold">{application.loan.duration} months</p>
                      </div>
                      <div>
                        <p className="text-green-700">Monthly Payment</p>
                        <p className="font-semibold">GH₵{application.loan.monthlyPayment}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Button
                    className={`flex-1 ${
                      decision === "approve"
                        ? "bg-green-600 hover:bg-green-700"
                        : decision === "reject"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={!decision || !decisionNotes}
                  >
                    {decision === "approve"
                      ? "Approve Application"
                      : decision === "reject"
                        ? "Reject Application"
                        : "Request More Information"}
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    Save as Draft
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes History */}
          {application.notes && application.notes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <History className="w-5 h-5 mr-2" />
                  Review History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {application.notes.map((note) => (
                    <div key={note.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">{note.author}</p>
                        <p className="text-xs text-gray-500">{note.date}</p>
                      </div>
                      <p className="text-sm text-gray-700">{note.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
