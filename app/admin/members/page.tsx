"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  Search,
  Filter,
  Eye,
  User,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  Download,
  Menu,
  Bell,
  Settings,
  LogOut,
  Users,
  BarChart3,
  FileText,
  DollarSign,
  CreditCard,
} from "lucide-react"
import Link from "next/link"

export default function AdminMembersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [hospitalFilter, setHospitalFilter] = useState("all")

  const members = [
    {
      id: "MB2024001",
      personal: {
        name: "Clement Olives",
        email: "c.olives@korlebu.gov.gh",
        phone: "+233 24 123 4567",
        dateOfBirth: "1985-03-15",
        nationalId: "GHA-123456789-0",
      },
      employment: {
        position: "Senior Doctor",
        hospital: "Korle-Bu Teaching Hospital",
        department: "Software Department",
        employeeId: "KB2016001",
        yearsOfService: 8,
        monthlyIncome: 3500,
        employmentStatus: "active",
      },
      membership: {
        joinDate: "2016-01-15",
        membershipStatus: "active",
        membershipType: "full",
        contributionStatus: "current",
        lastContribution: "2024-01-15",
      },
      loans: {
        totalLoans: 2,
        activeLoans: 1,
        totalBorrowed: 23000,
        totalRepaid: 10500,
        currentBalance: 12500,
        creditScore: 750,
        defaultHistory: 0,
      },
      status: "active",
    },
    {
      id: "MB2024002",
      personal: {
        name: "Kwame Asante",
        email: "kwame.asante@ridge.gov.gh",
        phone: "+233 20 456 7890",
        dateOfBirth: "1990-07-22",
        nationalId: "GHA-987654321-0",
      },
      employment: {
        position: "Lab Technician",
        hospital: "Ridge Hospital",
        department: "Laboratory Services",
        employeeId: "RH2019045",
        yearsOfService: 5,
        monthlyIncome: 2800,
        employmentStatus: "active",
      },
      membership: {
        joinDate: "2019-03-10",
        membershipStatus: "active",
        membershipType: "full",
        contributionStatus: "current",
        lastContribution: "2024-01-10",
      },
      loans: {
        totalLoans: 1,
        activeLoans: 1,
        totalBorrowed: 8000,
        totalRepaid: 1600,
        currentBalance: 6400,
        creditScore: 680,
        defaultHistory: 0,
      },
      status: "active",
    },
    {
      id: "MB2024003",
      personal: {
        name: "Ama Osei",
        email: "ama.osei@37mh.gov.gh",
        phone: "+233 24 789 0123",
        dateOfBirth: "1982-11-08",
        nationalId: "GHA-456789123-0",
      },
      employment: {
        position: "Midwife",
        hospital: "37 Military Hospital",
        department: "Maternity Ward",
        employeeId: "MH2012078",
        yearsOfService: 12,
        monthlyIncome: 3200,
        employmentStatus: "active",
      },
      membership: {
        joinDate: "2012-05-20",
        membershipStatus: "active",
        membershipType: "full",
        contributionStatus: "overdue",
        lastContribution: "2023-11-15",
      },
      loans: {
        totalLoans: 3,
        activeLoans: 1,
        totalBorrowed: 25000,
        totalRepaid: 15400,
        currentBalance: 9600,
        creditScore: 820,
        defaultHistory: 1,
      },
      status: "active",
    },
    {
      id: "MB2024004",
      personal: {
        name: "Kofi Boateng",
        email: "kofi.boateng@tema.gov.gh",
        phone: "+233 20 333 4444",
        dateOfBirth: "1988-04-12",
        nationalId: "GHA-789123456-0",
      },
      employment: {
        position: "Radiographer",
        hospital: "Tema General Hospital",
        department: "Radiology",
        employeeId: "TG2020033",
        yearsOfService: 4,
        monthlyIncome: 3000,
        employmentStatus: "active",
      },
      membership: {
        joinDate: "2020-02-01",
        membershipStatus: "active",
        membershipType: "full",
        contributionStatus: "current",
        lastContribution: "2024-01-01",
      },
      loans: {
        totalLoans: 1,
        activeLoans: 0,
        totalBorrowed: 10000,
        totalRepaid: 10000,
        currentBalance: 0,
        creditScore: 780,
        defaultHistory: 0,
      },
      status: "active",
    },
    {
      id: "MB2024005",
      personal: {
        name: "Grace Adjei",
        email: "grace.adjei@lekma.gov.gh",
        phone: "+233 24 555 6666",
        dateOfBirth: "1987-09-30",
        nationalId: "GHA-321654987-0",
      },
      employment: {
        position: "Pharmacist",
        hospital: "LEKMA Hospital",
        department: "Pharmacy",
        employeeId: "LK2018067",
        yearsOfService: 6,
        monthlyIncome: 3800,
        employmentStatus: "suspended",
      },
      membership: {
        joinDate: "2018-08-15",
        membershipStatus: "suspended",
        membershipType: "full",
        contributionStatus: "suspended",
        lastContribution: "2023-08-15",
      },
      loans: {
        totalLoans: 2,
        activeLoans: 0,
        totalBorrowed: 18000,
        totalRepaid: 12000,
        currentBalance: 6000,
        creditScore: 520,
        defaultHistory: 2,
      },
      status: "suspended",
    },
  ]

  const stats = [
    { title: "Total Members", value: "2,847", change: "+45", color: "blue" },
    { title: "Active Members", value: "2,698", change: "+32", color: "green" },
    { title: "New This Month", value: "45", change: "+12", color: "purple" },
    { title: "Suspended", value: "149", change: "-8", color: "red" },
  ]

  const hospitals = [
    "Korle-Bu Teaching Hospital",
    "Ridge Hospital",
    "37 Military Hospital",
    "Tema General Hospital",
    "LEKMA Hospital",
  ]

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.personal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.employment.hospital.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || member.status === statusFilter
    const matchesHospital = hospitalFilter === "all" || member.employment.hospital === hospitalFilter
    return matchesSearch && matchesStatus && matchesHospital
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Active
          </Badge>
        )
      case "suspended":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            Suspended
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="text-gray-600 border-gray-600">
            Inactive
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getContributionBadge = (status: string) => {
    switch (status) {
      case "current":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Current</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Overdue</Badge>
      case "suspended":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Suspended</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return "text-green-600"
    if (score >= 650) return "text-yellow-600"
    return "text-red-600"
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
                <p className="text-xs text-gray-600 hidden sm:block">Members Management</p>
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
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <DollarSign className="w-4 h-4" />
                <span>Active Loans</span>
              </Link>
              <Link
                href="/admin/members"
                className="flex items-center space-x-3 px-3 py-2 bg-green-50 text-green-700 rounded-lg"
              >
                <Users className="w-4 h-4" />
                <span className="font-medium">Members</span>
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
              <h2 className="text-2xl font-bold text-gray-900">Members Management</h2>
              <p className="text-gray-600">Manage union member profiles and information</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Members
              </Button>
              <Button className="bg-gradient-to-r from-green-600 to-blue-600">
                <User className="w-4 h-4 mr-2" />
                Add Member
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

          {/* Members Management */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <CardTitle>Member Directory</CardTitle>
                  <CardDescription>View and manage union member profiles</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search members..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={hospitalFilter} onValueChange={setHospitalFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Hospitals" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Hospitals</SelectItem>
                      {hospitals.map((hospital) => (
                        <SelectItem key={hospital} value={hospital}>
                          {hospital}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{member.personal.name}</h4>
                          <p className="text-sm text-gray-600">
                            {member.employment.position} • {member.employment.hospital}
                          </p>
                          <p className="text-xs text-gray-500">
                            Member ID: {member.id} • Joined: {member.membership.joinDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(member.status)}
                        {getContributionBadge(member.membership.contributionStatus)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Years of Service</p>
                        <p className="font-semibold">{member.employment.yearsOfService} years</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Monthly Income</p>
                        <p className="font-semibold">GH₵{member.employment.monthlyIncome.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Credit Score</p>
                        <p className={`font-semibold text-lg ${getCreditScoreColor(member.loans.creditScore)}`}>
                          {member.loans.creditScore}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Active Loans</p>
                        <p className="font-semibold">
                          {member.loans.activeLoans} of {member.loans.totalLoans}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600">Total Borrowed</p>
                        <p className="font-semibold text-blue-600">GH₵{member.loans.totalBorrowed.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Repaid</p>
                        <p className="font-semibold text-green-600">GH₵{member.loans.totalRepaid.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Current Balance</p>
                        <p className="font-semibold text-orange-600">
                          GH₵{member.loans.currentBalance.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-4 h-4" />
                          <span>{member.personal.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="w-4 h-4" />
                          <span>{member.personal.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{member.employment.department}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </Button>
                        <Button size="sm" variant="outline">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Loan History
                        </Button>
                        {member.status === "active" && (
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4 mr-2" />
                            Contact
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
