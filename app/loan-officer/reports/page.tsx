"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import {
  Heart,
  TrendingUp,
  TrendingDown,
  CalendarIcon,
  Download,
  Clock,
  CheckCircle,
  DollarSign,
  Users,
  FileText,
  Award,
  AlertTriangle,
  BarChart3,
  PieChartIcon,
  Activity,
  Zap,
  Star,
  Trophy,
  Menu,
  Bell,
  Settings,
  LogOut,
  User,
} from "lucide-react"
import Link from "next/link"

export default function LoanOfficerReports() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dateRange, setDateRange] = useState("30")
  const [selectedPeriod, setSelectedPeriod] = useState("current_month")
  const [comparisonPeriod, setComparisonPeriod] = useState("previous_month")
  const [date, setDate] = useState<Date>()

  // Performance Data
  const performanceMetrics = {
    current: {
      applicationsProcessed: 45,
      approvalRate: 78,
      averageProcessingTime: 2.3,
      loanVolumeProcessed: 1250000,
      customerSatisfaction: 4.6,
      qualityScore: 92,
      targetAchievement: 112,
      rank: 3,
    },
    previous: {
      applicationsProcessed: 38,
      approvalRate: 72,
      averageProcessingTime: 2.8,
      loanVolumeProcessed: 980000,
      customerSatisfaction: 4.4,
      qualityScore: 88,
      targetAchievement: 95,
      rank: 5,
    },
  }

  const monthlyTrends = [
    { month: "Jan", applications: 32, approved: 24, rejected: 8, volume: 850000 },
    { month: "Feb", applications: 28, approved: 21, rejected: 7, volume: 720000 },
    { month: "Mar", applications: 35, approved: 26, rejected: 9, volume: 920000 },
    { month: "Apr", applications: 42, approved: 31, rejected: 11, volume: 1100000 },
    { month: "May", applications: 38, approved: 29, rejected: 9, volume: 980000 },
    { month: "Jun", applications: 45, approved: 35, rejected: 10, volume: 1250000 },
  ]

  const processingTimeData = [
    { day: "Mon", avgTime: 2.1, target: 2.5 },
    { day: "Tue", avgTime: 2.3, target: 2.5 },
    { day: "Wed", avgTime: 2.0, target: 2.5 },
    { day: "Thu", avgTime: 2.4, target: 2.5 },
    { day: "Fri", avgTime: 2.6, target: 2.5 },
    { day: "Sat", avgTime: 1.8, target: 2.5 },
    { day: "Sun", avgTime: 1.5, target: 2.5 },
  ]

  const applicationStatusData = [
    { name: "Approved", value: 35, color: "#10b981" },
    { name: "Rejected", value: 10, color: "#ef4444" },
    { name: "Pending", value: 8, color: "#f59e0b" },
    { name: "Under Review", value: 12, color: "#3b82f6" },
  ]

  const loanCategoryData = [
    { category: "Medical Equipment", count: 15, volume: 450000, avgAmount: 30000 },
    { category: "Education", count: 12, volume: 240000, avgAmount: 20000 },
    { category: "Home Improvement", count: 8, volume: 320000, avgAmount: 40000 },
    { category: "Business", count: 6, volume: 180000, avgAmount: 30000 },
    { category: "Emergency", count: 4, volume: 60000, avgAmount: 15000 },
  ]

  const teamComparison = [
    { name: "Samuel Adjei", applications: 45, approvalRate: 78, avgTime: 2.3, rank: 3 },
    { name: "Grace Mensah", applications: 52, approvalRate: 82, avgTime: 2.1, rank: 1 },
    { name: "Kofi Asante", applications: 41, approvalRate: 75, avgTime: 2.4, rank: 4 },
    { name: "Ama Osei", applications: 48, approvalRate: 80, avgTime: 2.0, rank: 2 },
    { name: "Yaw Boateng", applications: 35, approvalRate: 70, avgTime: 2.8, rank: 5 },
  ]

  const achievements = [
    {
      title: "Top Performer",
      description: "Exceeded monthly target by 12%",
      icon: Trophy,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      date: "June 2024",
    },
    {
      title: "Quality Excellence",
      description: "Maintained 92% quality score",
      icon: Star,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      date: "June 2024",
    },
    {
      title: "Speed Champion",
      description: "Fastest processing time this quarter",
      icon: Zap,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      date: "May 2024",
    },
    {
      title: "Customer Favorite",
      description: "4.6/5 customer satisfaction rating",
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-100",
      date: "April 2024",
    },
  ]

  const getPerformanceChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change > 0,
      isNegative: change < 0,
    }
  }

  const getPerformanceColor = (value: number, threshold: number, reverse = false) => {
    if (reverse) {
      return value <= threshold ? "text-green-600" : "text-red-600"
    }
    return value >= threshold ? "text-green-600" : "text-red-600"
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
                <h1 className="text-lg font-semibold text-gray-900">Performance Reports</h1>
                <p className="text-xs text-gray-600 hidden sm:block">Track your performance and achievements</p>
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
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
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
                className="flex items-center space-x-3 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">My Reports</span>
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
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Performance Dashboard</h2>
              <p className="text-gray-600">Track your loan processing performance and achievements</p>
            </div>

            <div className="flex items-center space-x-3">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current_month">This Month</SelectItem>
                  <SelectItem value="last_month">Last Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="bg-transparent">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {date ? date.toLocaleDateString() : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>

              <Button variant="outline" className="bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-green-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Applications Processed</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {performanceMetrics.current.applicationsProcessed}
                    </p>
                    <div className="flex items-center mt-1">
                      {getPerformanceChange(
                        performanceMetrics.current.applicationsProcessed,
                        performanceMetrics.previous.applicationsProcessed,
                      ).isPositive ? (
                        <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                      )}
                      <span
                        className={`text-sm ${
                          getPerformanceChange(
                            performanceMetrics.current.applicationsProcessed,
                            performanceMetrics.previous.applicationsProcessed,
                          ).isPositive
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {
                          getPerformanceChange(
                            performanceMetrics.current.applicationsProcessed,
                            performanceMetrics.previous.applicationsProcessed,
                          ).value
                        }
                        %
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Approval Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{performanceMetrics.current.approvalRate}%</p>
                    <div className="flex items-center mt-1">
                      {getPerformanceChange(
                        performanceMetrics.current.approvalRate,
                        performanceMetrics.previous.approvalRate,
                      ).isPositive ? (
                        <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                      )}
                      <span
                        className={`text-sm ${
                          getPerformanceChange(
                            performanceMetrics.current.approvalRate,
                            performanceMetrics.previous.approvalRate,
                          ).isPositive
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {
                          getPerformanceChange(
                            performanceMetrics.current.approvalRate,
                            performanceMetrics.previous.approvalRate,
                          ).value
                        }
                        %
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Processing Time</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {performanceMetrics.current.averageProcessingTime} days
                    </p>
                    <div className="flex items-center mt-1">
                      {getPerformanceChange(
                        performanceMetrics.current.averageProcessingTime,
                        performanceMetrics.previous.averageProcessingTime,
                      ).isNegative ? (
                        <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-red-600 mr-1" />
                      )}
                      <span
                        className={`text-sm ${
                          getPerformanceChange(
                            performanceMetrics.current.averageProcessingTime,
                            performanceMetrics.previous.averageProcessingTime,
                          ).isNegative
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {
                          getPerformanceChange(
                            performanceMetrics.current.averageProcessingTime,
                            performanceMetrics.previous.averageProcessingTime,
                          ).value
                        }
                        %
                      </span>
                    </div>
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
                    <p className="text-sm font-medium text-gray-600">Loan Volume</p>
                    <p className="text-2xl font-bold text-gray-900">
                      GH₵{(performanceMetrics.current.loanVolumeProcessed / 1000000).toFixed(1)}M
                    </p>
                    <div className="flex items-center mt-1">
                      {getPerformanceChange(
                        performanceMetrics.current.loanVolumeProcessed,
                        performanceMetrics.previous.loanVolumeProcessed,
                      ).isPositive ? (
                        <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                      )}
                      <span
                        className={`text-sm ${
                          getPerformanceChange(
                            performanceMetrics.current.loanVolumeProcessed,
                            performanceMetrics.previous.loanVolumeProcessed,
                          ).isPositive
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {
                          getPerformanceChange(
                            performanceMetrics.current.loanVolumeProcessed,
                            performanceMetrics.previous.loanVolumeProcessed,
                          ).value
                        }
                        %
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Score Card */}
          <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Overall Performance Score</h3>
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl font-bold">{performanceMetrics.current.qualityScore}</div>
                    <div>
                      <p className="text-green-100">Quality Score</p>
                      <p className="text-sm text-green-200">Rank #{performanceMetrics.current.rank} in team</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{performanceMetrics.current.targetAchievement}%</div>
                  <p className="text-green-100">Target Achievement</p>
                  <div className="flex items-center mt-2">
                    <Trophy className="w-5 h-5 mr-2" />
                    <span className="text-sm">Top Performer</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="trends" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="trends">Performance Trends</TabsTrigger>
              <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
              <TabsTrigger value="comparison">Team Comparison</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            {/* Performance Trends Tab */}
            <TabsContent value="trends" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="w-5 h-5 mr-2" />
                      Monthly Application Trends
                    </CardTitle>
                    <CardDescription>Applications processed over the last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        applications: {
                          label: "Applications",
                          color: "hsl(var(--chart-1))",
                        },
                        approved: {
                          label: "Approved",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlyTrends}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Area
                            type="monotone"
                            dataKey="applications"
                            stackId="1"
                            stroke="var(--color-applications)"
                            fill="var(--color-applications)"
                            fillOpacity={0.6}
                          />
                          <Area
                            type="monotone"
                            dataKey="approved"
                            stackId="2"
                            stroke="var(--color-approved)"
                            fill="var(--color-approved)"
                            fillOpacity={0.8}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Processing Time Analysis
                    </CardTitle>
                    <CardDescription>Daily average processing time vs target</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        avgTime: {
                          label: "Avg Time",
                          color: "hsl(var(--chart-1))",
                        },
                        target: {
                          label: "Target",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={processingTimeData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="avgTime"
                            stroke="var(--color-avgTime)"
                            strokeWidth={3}
                            dot={{ fill: "var(--color-avgTime)", strokeWidth: 2, r: 4 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="target"
                            stroke="var(--color-target)"
                            strokeDasharray="5 5"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChartIcon className="w-5 h-5 mr-2" />
                      Application Status Distribution
                    </CardTitle>
                    <CardDescription>Current month application outcomes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        approved: {
                          label: "Approved",
                          color: "#10b981",
                        },
                        rejected: {
                          label: "Rejected",
                          color: "#ef4444",
                        },
                        pending: {
                          label: "Pending",
                          color: "#f59e0b",
                        },
                        under_review: {
                          label: "Under Review",
                          color: "#3b82f6",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={applicationStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {applicationStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Loan Volume by Month
                    </CardTitle>
                    <CardDescription>Total loan volume processed monthly</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        volume: {
                          label: "Volume (GH₵)",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyTrends}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                          <ChartTooltip
                            content={
                              <ChartTooltipContent
                                formatter={(value) => [`GH₵${(value / 1000000).toFixed(1)}M`, "Volume"]}
                              />
                            }
                          />
                          <Bar dataKey="volume" fill="var(--color-volume)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Detailed Analysis Tab */}
            <TabsContent value="analysis" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Loan Category Analysis</CardTitle>
                    <CardDescription>Performance breakdown by loan category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {loanCategoryData.map((category, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{category.category}</span>
                            <span className="text-sm text-gray-600">{category.count} applications</span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>GH₵{(category.volume / 1000).toFixed(0)}K total</span>
                            <span>GH₵{(category.avgAmount / 1000).toFixed(0)}K avg</span>
                          </div>
                          <Progress value={(category.count / 45) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quality Metrics</CardTitle>
                    <CardDescription>Detailed quality assessment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Documentation Quality</span>
                          <span className="text-sm font-bold">95%</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Risk Assessment Accuracy</span>
                          <span className="text-sm font-bold">88%</span>
                        </div>
                        <Progress value={88} className="h-2" />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Customer Communication</span>
                          <span className="text-sm font-bold">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Compliance Score</span>
                          <span className="text-sm font-bold">98%</span>
                        </div>
                        <Progress value={98} className="h-2" />
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Overall Quality Score</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">92</span>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Excellent</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                  <CardDescription>AI-powered insights and recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-green-700">Strengths</h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Excellent Processing Speed</p>
                            <p className="text-sm text-gray-600">
                              Your average processing time of 2.3 days is 18% faster than team average
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium">High Approval Rate</p>
                            <p className="text-sm text-gray-600">
                              78% approval rate indicates strong risk assessment skills
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Customer Satisfaction</p>
                            <p className="text-sm text-gray-600">4.6/5 rating shows excellent customer service</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-orange-700">Areas for Improvement</h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Documentation Review</p>
                            <p className="text-sm text-gray-600">
                              Consider spending more time on document verification to reduce risk
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Large Loan Applications</p>
                            <p className="text-sm text-gray-600">
                              Focus on improving processing time for loans above GH₵30,000
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Team Comparison Tab */}
            <TabsContent value="comparison" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Performance Comparison</CardTitle>
                  <CardDescription>How you stack up against your colleagues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamComparison.map((member, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          member.name === "Samuel Adjei" ? "bg-blue-50 border-blue-200" : "bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                member.rank === 1
                                  ? "bg-yellow-100 text-yellow-600"
                                  : member.rank === 2
                                    ? "bg-gray-100 text-gray-600"
                                    : member.rank === 3
                                      ? "bg-orange-100 text-orange-600"
                                      : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              {member.rank === 1 ? (
                                <Trophy className="w-5 h-5" />
                              ) : (
                                <span className="font-bold">#{member.rank}</span>
                              )}
                            </div>
                            <div>
                              <p className="font-semibold">{member.name}</p>
                              {member.name === "Samuel Adjei" && (
                                <Badge variant="outline" className="text-blue-600 border-blue-600">
                                  You
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold">{member.applications}</p>
                            <p className="text-sm text-gray-600">Applications</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold">{member.approvalRate}%</p>
                            <p className="text-sm text-gray-600">Approval Rate</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold">{member.avgTime}</p>
                            <p className="text-sm text-gray-600">Avg Time (days)</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ranking Trends</CardTitle>
                    <CardDescription>Your position over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Current Month</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold">#3</span>
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Last Month</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold">#5</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">2 Months Ago</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold">#4</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Goals</CardTitle>
                    <CardDescription>Track your progress towards targets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Monthly Target</span>
                          <span className="text-sm font-bold">112%</span>
                        </div>
                        <Progress value={112} className="h-2" />
                        <p className="text-xs text-green-600 mt-1">Exceeded by 12%</p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Quality Target</span>
                          <span className="text-sm font-bold">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                        <p className="text-xs text-green-600 mt-1">Above 90% target</p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Speed Target</span>
                          <span className="text-sm font-bold">108%</span>
                        </div>
                        <Progress value={108} className="h-2" />
                        <p className="text-xs text-green-600 mt-1">8% faster than target</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${achievement.bgColor}`}>
                          <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{achievement.title}</h4>
                          <p className="text-gray-600 mb-2">{achievement.description}</p>
                          <p className="text-sm text-gray-500">{achievement.date}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recognition History</CardTitle>
                  <CardDescription>Your awards and recognitions over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
                      <Trophy className="w-8 h-8 text-yellow-600" />
                      <div>
                        <h4 className="font-semibold">Employee of the Month</h4>
                        <p className="text-sm text-gray-600">June 2024 - Outstanding performance across all metrics</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                      <Star className="w-8 h-8 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">Quality Excellence Award</h4>
                        <p className="text-sm text-gray-600">May 2024 - Maintained highest quality standards</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                      <Zap className="w-8 h-8 text-green-600" />
                      <div>
                        <h4 className="font-semibold">Speed Champion</h4>
                        <p className="text-sm text-gray-600">April 2024 - Fastest processing time in Q1</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Milestones</CardTitle>
                  <CardDescription>Goals you're working towards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">100 Applications Milestone</h4>
                        <p className="text-sm text-gray-600">Process 100 applications in a quarter</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">85/100</p>
                        <Progress value={85} className="w-20 h-2 mt-1" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Perfect Quality Month</h4>
                        <p className="text-sm text-gray-600">Achieve 100% quality score for a month</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">92/100</p>
                        <Progress value={92} className="w-20 h-2 mt-1" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Team Leader</h4>
                        <p className="text-sm text-gray-600">Rank #1 in team performance</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-orange-600">#3</p>
                        <p className="text-sm text-gray-600">Current rank</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
