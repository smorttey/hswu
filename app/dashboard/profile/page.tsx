"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, User, Edit, Save, FileText, Calculator, Settings, LogOut, Menu, Bell } from "lucide-react"
import Link from "next/link"

export default function MemberProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    personal: {
      firstName: "Clement",
      lastName: "Mensah",
      email: "c.mensah@korlebu.gov.gh",
      phone: "+233 24 123 4567",
      dateOfBirth: "1985-03-15",
      nationalId: "GHA-123456789-0",
      address: "East Legon, Accra",
      emergencyContact: {
        name: "Kwame Mensah",
        relationship: "Spouse",
        phone: "+233 24 765 4321",
      },
    },
    employment: {
      position: "Senior Nurse",
      hospital: "Korle-Bu Teaching Hospital",
      department: "Emergency Department",
      employeeId: "KB2016001",
      startDate: "2016-01-15",
      monthlyIncome: 3500,
      supervisor: "Dr. Sarah Osei",
      workPhone: "+233 30 202 2000",
    },
    membership: {
      memberId: "MB2024001",
      joinDate: "2016-01-15",
      membershipType: "Full Member",
      status: "Active",
      contributionAmount: 175, // 5% of monthly income
      lastContribution: "2024-01-15",
      totalContributions: 16800,
    },
    financial: {
      totalLoans: 2,
      activeLoans: 1,
      totalBorrowed: 23000,
      totalRepaid: 10500,
      currentBalance: 12500,
      creditScore: 750,
      paymentHistory: "Excellent",
    },
  })

  const handleInputChange = (section: string, field: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleSave = () => {
    setIsEditing(false)
    // Save profile logic here
    console.log("Saving profile:", profile)
  }

  const loanHistory = [
    {
      id: "LN2023001",
      amount: 10000,
      purpose: "Home Improvement",
      status: "Completed",
      disbursedDate: "2023-01-15",
      completedDate: "2023-12-15",
      totalPaid: 10500,
    },
    {
      id: "LN2024001",
      amount: 15000,
      purpose: "Medical Equipment",
      status: "Active",
      disbursedDate: "2024-01-15",
      monthlyPayment: 706,
      remainingBalance: 12500,
      nextPayment: "2024-02-15",
    },
  ]

  const contributionHistory = [
    { month: "January 2024", amount: 175, status: "Paid", date: "2024-01-15" },
    { month: "December 2023", amount: 175, status: "Paid", date: "2023-12-15" },
    { month: "November 2023", amount: 175, status: "Paid", date: "2023-11-15" },
    { month: "October 2023", amount: 175, status: "Paid", date: "2023-10-15" },
    { month: "September 2023", amount: 175, status: "Paid", date: "2023-09-15" },
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
                <p className="text-xs text-gray-600 hidden sm:block">Member Profile</p>
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
                <p className="text-sm font-medium text-gray-900">
                  {profile.personal.firstName} {profile.personal.lastName}
                </p>
                <p className="text-xs text-gray-600">{profile.employment.position}</p>
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
                <User className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/apply"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <FileText className="w-4 h-4" />
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
                href="/dashboard/profile"
                className="flex items-center space-x-3 px-3 py-2 bg-green-50 text-green-700 rounded-lg"
              >
                <User className="w-4 h-4" />
                <span className="font-medium">My Profile</span>
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
              <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
              <p className="text-gray-600">Manage your personal information and membership details</p>
            </div>
            <Button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="bg-gradient-to-r from-green-600 to-blue-600"
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>

          {/* Profile Content */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {profile.personal.firstName} {profile.personal.lastName}
                  </h3>
                  <p className="text-gray-600 mb-2">{profile.employment.position}</p>
                  <p className="text-sm text-gray-500 mb-4">{profile.employment.hospital}</p>

                  <div className="space-y-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {profile.membership.status}
                    </Badge>
                    <div className="text-sm text-gray-600">
                      <p>Member ID: {profile.membership.memberId}</p>
                      <p>Joined: {profile.membership.joinDate}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-green-600">{profile.financial.creditScore}</p>
                        <p className="text-xs text-gray-600">Credit Score</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{profile.financial.activeLoans}</p>
                        <p className="text-xs text-gray-600">Active Loans</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <Tabs defaultValue="personal" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="personal">Personal</TabsTrigger>
                      <TabsTrigger value="employment">Employment</TabsTrigger>
                      <TabsTrigger value="membership">Membership</TabsTrigger>
                      <TabsTrigger value="financial">Financial</TabsTrigger>
                    </TabsList>

                    {/* Personal Information */}
                    <TabsContent value="personal" className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={profile.personal.firstName}
                            onChange={(e) => handleInputChange("personal", "firstName", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={profile.personal.lastName}
                            onChange={(e) => handleInputChange("personal", "lastName", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profile.personal.email}
                            onChange={(e) => handleInputChange("personal", "email", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={profile.personal.phone}
                            onChange={(e) => handleInputChange("personal", "phone", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth">Date of Birth</Label>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={profile.personal.dateOfBirth}
                            onChange={(e) => handleInputChange("personal", "dateOfBirth", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nationalId">National ID</Label>
                          <Input
                            id="nationalId"
                            value={profile.personal.nationalId}
                            onChange={(e) => handleInputChange("personal", "nationalId", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          value={profile.personal.address}
                          onChange={(e) => handleInputChange("personal", "address", e.target.value)}
                          disabled={!isEditing}
                          rows={3}
                        />
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-3">Emergency Contact</h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Name</Label>
                            <Input value={profile.personal.emergencyContact.name} disabled={!isEditing} />
                          </div>
                          <div className="space-y-2">
                            <Label>Relationship</Label>
                            <Input value={profile.personal.emergencyContact.relationship} disabled={!isEditing} />
                          </div>
                          <div className="space-y-2">
                            <Label>Phone</Label>
                            <Input value={profile.personal.emergencyContact.phone} disabled={!isEditing} />
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Employment Information */}
                    <TabsContent value="employment" className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Position</Label>
                          <Input value={profile.employment.position} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Employee ID</Label>
                          <Input value={profile.employment.employeeId} disabled />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Hospital</Label>
                          <Input value={profile.employment.hospital} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Department</Label>
                          <Input value={profile.employment.department} disabled />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input value={profile.employment.startDate} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Monthly Income</Label>
                          <Input value={`GH₵${profile.employment.monthlyIncome.toLocaleString()}`} disabled />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Supervisor</Label>
                          <Input value={profile.employment.supervisor} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Work Phone</Label>
                          <Input value={profile.employment.workPhone} disabled />
                        </div>
                      </div>
                    </TabsContent>

                    {/* Membership Information */}
                    <TabsContent value="membership" className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Member ID</Label>
                          <Input value={profile.membership.memberId} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Membership Type</Label>
                          <Input value={profile.membership.membershipType} disabled />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Join Date</Label>
                          <Input value={profile.membership.joinDate} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Status</Label>
                          <Input value={profile.membership.status} disabled />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Monthly Contribution</Label>
                          <Input value={`GH₵${profile.membership.contributionAmount}`} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Total Contributions</Label>
                          <Input value={`GH₵${profile.membership.totalContributions.toLocaleString()}`} disabled />
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-3">Recent Contributions</h4>
                        <div className="space-y-2">
                          {contributionHistory.slice(0, 3).map((contribution, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium">{contribution.month}</p>
                                <p className="text-sm text-gray-600">{contribution.date}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">GH₵{contribution.amount}</p>
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                                  {contribution.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    {/* Financial Information */}
                    <TabsContent value="financial" className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Credit Score</Label>
                          <Input value={profile.financial.creditScore} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Payment History</Label>
                          <Input value={profile.financial.paymentHistory} disabled />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Total Loans</Label>
                          <Input value={profile.financial.totalLoans} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Active Loans</Label>
                          <Input value={profile.financial.activeLoans} disabled />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Total Borrowed</Label>
                          <Input value={`GH₵${profile.financial.totalBorrowed.toLocaleString()}`} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Total Repaid</Label>
                          <Input value={`GH₵${profile.financial.totalRepaid.toLocaleString()}`} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Current Balance</Label>
                          <Input value={`GH₵${profile.financial.currentBalance.toLocaleString()}`} disabled />
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-3">Loan History</h4>
                        <div className="space-y-3">
                          {loanHistory.map((loan, index) => (
                            <div key={index} className="border rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h5 className="font-semibold">{loan.id}</h5>
                                  <p className="text-sm text-gray-600">{loan.purpose}</p>
                                </div>
                                <Badge
                                  className={
                                    loan.status === "Active"
                                      ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                      : "bg-green-100 text-green-800 hover:bg-green-100"
                                  }
                                >
                                  {loan.status}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                                <div>
                                  <p className="text-gray-600">Amount</p>
                                  <p className="font-medium">GH₵{loan.amount.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Disbursed</p>
                                  <p className="font-medium">{loan.disbursedDate}</p>
                                </div>
                                {loan.status === "Active" ? (
                                  <>
                                    <div>
                                      <p className="text-gray-600">Monthly Payment</p>
                                      <p className="font-medium">GH₵{loan.monthlyPayment}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Balance</p>
                                      <p className="font-medium">GH₵{loan.remainingBalance?.toLocaleString()}</p>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div>
                                      <p className="text-gray-600">Completed</p>
                                      <p className="font-medium">{loan.completedDate}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Total Paid</p>
                                      <p className="font-medium">GH₵{loan.totalPaid?.toLocaleString()}</p>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
