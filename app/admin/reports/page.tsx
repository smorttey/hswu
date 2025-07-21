"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Heart,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  FileText,
  BarChart3,
  Menu,
  Bell,
  Settings,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"

export default function AdminReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  })
  const [reportType, setReportType] = useState("overview")

  const monthlyData = [
    { month: "Jan", applications: 45, approvals: 38, disbursements: 450000, collections: 320000 },
    { month: "Feb", applications: 52, approvals: 44, disbursements: 520000, collections: 380000 },
    { month: "Mar", applications: 48, approvals: 41, disbursements: 485000, collections: 410000 },
    { month: "Apr", applications: 61, approvals: 53, disbursements: 630000, collections: 450000 },
    { month: "May", applications: 58, approvals: 49, disbursements: 580000, collections: 480000 },
    { month: "Jun", applications: 67, approvals: 58, disbursements: 690000, collections: 520000 },
  ]

  const loanPurposeData = [
    { name: "Medical Equipment", value: 35, amount: 2800000 },
    { name: "Education", value: 25, amount: 1500000 },
    { name: "Home Improvement", value: 20, amount: 1800000 },
    { name: "Business", value: 15, amount: 2200000 },
    { name: "Emergency", value: 5, amount: 400000 },
  ]

  const hospitalData = [
    { hospital: "Korle-Bu", members: 450, activeLoans: 89, totalDisbursed: 1200000 },
    { hospital: "Ridge", members: 320, activeLoans: 67, totalDisbursed: 890000 },
    { hospital: "37 Military", members: 280, activeLoans: 54, totalDisbursed: 750000 },
    { hospital: "Tema General", members: 190, activeLoans: 38, totalDisbursed: 520000 },
    { hospital: "LEKMA", members: 160, activeLoans: 32, totalDisbursed: 440000 },
  ]

  const performanceMetrics = [
    { title: "Total Applications", value: "1,247", change: "+12%", trend: "up" },
    { title: "Approval Rate", value: "87.5%", change: "+2.3%", trend: "up" },
    { title: "Average Processing Time", value: "2.8 days", change: "-0.5 days", trend: "up" },
    { title: "Default Rate", value: "2.1%", change: "-0.3%", trend: "up" },
    { title: "Portfolio Value", value: "GH₵12.5M", change: "+15%", trend: "up" },
    { title: "Collection Rate", value: "97.8%", change: "+0.5%", trend: "up" },
  ]

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"]

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
                <p className="text-xs text-gray-600 hidden sm:block">Reports & Analytics</p>
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
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <Users className="w-4 h-4" />
                <span>Members</span>
              </Link>
              <Link
                href="/admin/reports"
                className="flex items-center space-x-3 px-3 py-2 bg-green-50 text-green-700 rounded-lg"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">Reports</span>
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
              <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
              <p className="text-gray-600">Comprehensive system performance and insights</p>
            </div>
            <div className="flex space-x-2">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">System Overview</SelectItem>
                  <SelectItem value="loans">Loan Performance</SelectItem>
                  <SelectItem value="members">Member Analytics</SelectItem>
                  <SelectItem value="financial">Financial Reports</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performanceMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {metric.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Application Trends</CardTitle>
                <CardDescription>Applications and approvals over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    applications: {
                      label: "Applications",
                      color: "hsl(var(--chart-1))",
                    },
                    approvals: {
                      label: "Approvals",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="applications"
                        stroke="var(--color-applications)"
                        name="Applications"
                      />
                      <Line type="monotone" dataKey="approvals" stroke="var(--color-approvals)" name="Approvals" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Loan Purpose Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Loan Purpose Distribution</CardTitle>
                <CardDescription>Breakdown by loan purpose</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Percentage",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <RechartsPieChart.Pie
                        data={loanPurposeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {loanPurposeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </RechartsPieChart.Pie>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Financial Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Performance</CardTitle>
                <CardDescription>Disbursements vs Collections</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    disbursements: {
                      label: "Disbursements",
                      color: "hsl(var(--chart-1))",
                    },
                    collections: {
                      label: "Collections",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="disbursements" fill="var(--color-disbursements)" name="Disbursements" />
                      <Bar dataKey="collections" fill="var(--color-collections)" name="Collections" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Hospital Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Hospital Performance</CardTitle>
                <CardDescription>Member distribution and loan activity by hospital</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hospitalData.map((hospital, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{hospital.hospital}</h4>
                        <p className="text-sm text-gray-600">{hospital.members} members</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{hospital.activeLoans} active loans</p>
                        <p className="text-sm text-gray-600">GH₵{hospital.totalDisbursed.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Reports Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analytics</CardTitle>
              <CardDescription>Comprehensive system metrics and KPIs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Application Metrics</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Applications</span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pending Review</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Approved</span>
                      <span className="font-medium text-green-600">1,091</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rejected</span>
                      <span className="font-medium text-red-600">133</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Loan Portfolio</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Loans</span>
                      <span className="font-medium">892</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Outstanding</span>
                      <span className="font-medium">GH₵12.5M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Overdue Loans</span>
                      <span className="font-medium text-red-600">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed Loans</span>
                      <span className="font-medium text-green-600">199</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Member Statistics</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Members</span>
                      <span className="font-medium">2,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Members</span>
                      <span className="font-medium text-green-600">2,698</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">New This Month</span>
                      <span className="font-medium">45</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Suspended</span>
                      <span className="font-medium text-red-600">149</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Financial Health</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Collection Rate</span>
                      <span className="font-medium text-green-600">97.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Default Rate</span>
                      <span className="font-medium text-red-600">2.1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Loan Size</span>
                      <span className="font-medium">GH₵14,025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Portfolio Growth</span>
                      <span className="font-medium text-green-600">+15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
