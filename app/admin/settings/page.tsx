"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Heart,
  Save,
  SettingsIcon,
  Users,
  DollarSign,
  Bell,
  Shield,
  Phone,
  Menu,
  LogOut,
  BarChart3,
  FileText,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function AdminSettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [settings, setSettings] = useState({
    // System Settings
    systemName: "HSWU Fund Loan Management System",
    systemDescription: "Health Services Workers' Union Loan Management Platform",
    maintenanceMode: false,
    autoBackup: true,
    backupFrequency: "daily",

    // Loan Settings
    maxLoanAmount: 50000,
    minLoanAmount: 1000,
    defaultInterestRate: 12,
    maxLoanTerm: 36,
    minLoanTerm: 6,
    processingFee: 2.5,

    // Member Settings
    membershipFee: 50,
    contributionRate: 5,
    maxActiveLoans: 2,
    creditScoreThreshold: 600,

    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    paymentReminders: true,
    overdueNotifications: true,
    approvalNotifications: true,

    // Security Settings
    sessionTimeout: 30,
    passwordExpiry: 90,
    twoFactorAuth: false,
    loginAttempts: 5,

    // Contact Information
    organizationName: "Health Services Workers' Union of TUC Ghana",
    address: "TUC House, Accra, Ghana",
    phone: "+233 30 266 4065",
    email: "info@hswu-tuc.org.gh",
    website: "https://hswu-tuc.org.gh",
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // Save settings logic here
    console.log("Saving settings:", settings)
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
                <p className="text-xs text-gray-600 hidden sm:block">System Settings</p>
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
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Reports</span>
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center space-x-3 px-3 py-2 bg-green-50 text-green-700 rounded-lg"
              >
                <SettingsIcon className="w-4 h-4" />
                <span className="font-medium">Settings</span>
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
              <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
              <p className="text-gray-600">Configure system parameters and preferences</p>
            </div>
            <Button onClick={handleSave} className="bg-gradient-to-r from-green-600 to-blue-600">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>

          {/* Settings Tabs */}
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="loans">Loans</TabsTrigger>
                  <TabsTrigger value="members">Members</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <SettingsIcon className="w-5 h-5 mr-2" />
                        General System Settings
                      </CardTitle>
                      <CardDescription>Basic system configuration and preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="systemName">System Name</Label>
                          <Input
                            id="systemName"
                            value={settings.systemName}
                            onChange={(e) => handleSettingChange("systemName", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="backupFrequency">Backup Frequency</Label>
                          <Select
                            value={settings.backupFrequency}
                            onValueChange={(value) => handleSettingChange("backupFrequency", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="systemDescription">System Description</Label>
                        <Textarea
                          id="systemDescription"
                          value={settings.systemDescription}
                          onChange={(e) => handleSettingChange("systemDescription", e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Maintenance Mode</Label>
                          <p className="text-sm text-gray-600">Enable to restrict system access</p>
                        </div>
                        <Switch
                          checked={settings.maintenanceMode}
                          onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Automatic Backup</Label>
                          <p className="text-sm text-gray-600">Enable automatic system backups</p>
                        </div>
                        <Switch
                          checked={settings.autoBackup}
                          onCheckedChange={(checked) => handleSettingChange("autoBackup", checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Loan Settings */}
                <TabsContent value="loans" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <DollarSign className="w-5 h-5 mr-2" />
                        Loan Configuration
                      </CardTitle>
                      <CardDescription>Configure loan parameters and limits</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="maxLoanAmount">Maximum Loan Amount (GH₵)</Label>
                          <Input
                            id="maxLoanAmount"
                            type="number"
                            value={settings.maxLoanAmount}
                            onChange={(e) => handleSettingChange("maxLoanAmount", Number.parseInt(e.target.value))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="minLoanAmount">Minimum Loan Amount (GH₵)</Label>
                          <Input
                            id="minLoanAmount"
                            type="number"
                            value={settings.minLoanAmount}
                            onChange={(e) => handleSettingChange("minLoanAmount", Number.parseInt(e.target.value))}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="defaultInterestRate">Default Interest Rate (%)</Label>
                          <Input
                            id="defaultInterestRate"
                            type="number"
                            step="0.1"
                            value={settings.defaultInterestRate}
                            onChange={(e) =>
                              handleSettingChange("defaultInterestRate", Number.parseFloat(e.target.value))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="processingFee">Processing Fee (%)</Label>
                          <Input
                            id="processingFee"
                            type="number"
                            step="0.1"
                            value={settings.processingFee}
                            onChange={(e) => handleSettingChange("processingFee", Number.parseFloat(e.target.value))}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="maxLoanTerm">Maximum Loan Term (months)</Label>
                          <Input
                            id="maxLoanTerm"
                            type="number"
                            value={settings.maxLoanTerm}
                            onChange={(e) => handleSettingChange("maxLoanTerm", Number.parseInt(e.target.value))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="minLoanTerm">Minimum Loan Term (months)</Label>
                          <Input
                            id="minLoanTerm"
                            type="number"
                            value={settings.minLoanTerm}
                            onChange={(e) => handleSettingChange("minLoanTerm", Number.parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Member Settings */}
                <TabsContent value="members" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Member Configuration
                      </CardTitle>
                      <CardDescription>Configure member-related settings and requirements</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="membershipFee">Membership Fee (GH₵)</Label>
                          <Input
                            id="membershipFee"
                            type="number"
                            value={settings.membershipFee}
                            onChange={(e) => handleSettingChange("membershipFee", Number.parseInt(e.target.value))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contributionRate">Monthly Contribution Rate (%)</Label>
                          <Input
                            id="contributionRate"
                            type="number"
                            step="0.1"
                            value={settings.contributionRate}
                            onChange={(e) => handleSettingChange("contributionRate", Number.parseFloat(e.target.value))}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="maxActiveLoans">Maximum Active Loans per Member</Label>
                          <Input
                            id="maxActiveLoans"
                            type="number"
                            value={settings.maxActiveLoans}
                            onChange={(e) => handleSettingChange("maxActiveLoans", Number.parseInt(e.target.value))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="creditScoreThreshold">Minimum Credit Score</Label>
                          <Input
                            id="creditScoreThreshold"
                            type="number"
                            value={settings.creditScoreThreshold}
                            onChange={(e) =>
                              handleSettingChange("creditScoreThreshold", Number.parseInt(e.target.value))
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Notification Settings */}
                <TabsContent value="notifications" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Bell className="w-5 h-5 mr-2" />
                        Notification Settings
                      </CardTitle>
                      <CardDescription>Configure system notifications and alerts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-gray-600">Send notifications via email</p>
                          </div>
                          <Switch
                            checked={settings.emailNotifications}
                            onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>SMS Notifications</Label>
                            <p className="text-sm text-gray-600">Send notifications via SMS</p>
                          </div>
                          <Switch
                            checked={settings.smsNotifications}
                            onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Payment Reminders</Label>
                            <p className="text-sm text-gray-600">Send payment due reminders</p>
                          </div>
                          <Switch
                            checked={settings.paymentReminders}
                            onCheckedChange={(checked) => handleSettingChange("paymentReminders", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Overdue Notifications</Label>
                            <p className="text-sm text-gray-600">Send overdue payment alerts</p>
                          </div>
                          <Switch
                            checked={settings.overdueNotifications}
                            onCheckedChange={(checked) => handleSettingChange("overdueNotifications", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Approval Notifications</Label>
                            <p className="text-sm text-gray-600">Send loan approval/rejection notifications</p>
                          </div>
                          <Switch
                            checked={settings.approvalNotifications}
                            onCheckedChange={(checked) => handleSettingChange("approvalNotifications", checked)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Security Settings */}
                <TabsContent value="security" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Security Configuration
                      </CardTitle>
                      <CardDescription>Configure security policies and authentication</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                          <Input
                            id="sessionTimeout"
                            type="number"
                            value={settings.sessionTimeout}
                            onChange={(e) => handleSettingChange("sessionTimeout", Number.parseInt(e.target.value))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                          <Input
                            id="passwordExpiry"
                            type="number"
                            value={settings.passwordExpiry}
                            onChange={(e) => handleSettingChange("passwordExpiry", Number.parseInt(e.target.value))}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="loginAttempts">Maximum Login Attempts</Label>
                        <Input
                          id="loginAttempts"
                          type="number"
                          value={settings.loginAttempts}
                          onChange={(e) => handleSettingChange("loginAttempts", Number.parseInt(e.target.value))}
                          className="w-full md:w-1/2"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Two-Factor Authentication</Label>
                          <p className="text-sm text-gray-600">Require 2FA for all users</p>
                        </div>
                        <Switch
                          checked={settings.twoFactorAuth}
                          onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Contact Settings */}
                <TabsContent value="contact" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Phone className="w-5 h-5 mr-2" />
                        Contact Information
                      </CardTitle>
                      <CardDescription>Organization contact details and information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="organizationName">Organization Name</Label>
                        <Input
                          id="organizationName"
                          value={settings.organizationName}
                          onChange={(e) => handleSettingChange("organizationName", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          value={settings.address}
                          onChange={(e) => handleSettingChange("address", e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={settings.phone}
                            onChange={(e) => handleSettingChange("phone", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={settings.email}
                            onChange={(e) => handleSettingChange("email", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website URL</Label>
                        <Input
                          id="website"
                          type="url"
                          value={settings.website}
                          onChange={(e) => handleSettingChange("website", e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
