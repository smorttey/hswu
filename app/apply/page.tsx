"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Heart, Upload, CheckCircle, ArrowLeft, ArrowRight, DollarSign, FileText, CreditCard } from "lucide-react"
import Link from "next/link"

export default function LoanApplicationPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File[]>>({})
  const [formData, setFormData] = useState({
    loanAmount: "",
    loanPurpose: "",
    duration: "",
    monthlyIncome: "",
    otherIncome: "",
    monthlyExpenses: "",
    collateral: "",
    guarantor1Name: "",
    guarantor1Phone: "",
    guarantor2Name: "",
    guarantor2Phone: "",
    bankName: "",
    accountNumber: "",
  })

  // Load saved form data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('loan-application-draft')
    const savedStep = localStorage.getItem('loan-application-step')
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (e) {
        console.error('Failed to load saved form data')
      }
    }
    if (savedStep) {
      setStep(parseInt(savedStep))
    }
  }, [])

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('loan-application-draft', JSON.stringify(formData))
    localStorage.setItem('loan-application-step', step.toString())
  }, [formData, step])

  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  // Validation functions
  const validateStep = useCallback((stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (stepNumber) {
      case 1:
        if (!formData.loanAmount || parseFloat(formData.loanAmount) <= 0) {
          newErrors.loanAmount = "Please enter a valid loan amount"
        }
        if (parseFloat(formData.loanAmount) > 25000) {
          newErrors.loanAmount = "Maximum loan amount is GH₵25,000"
        }
        if (!formData.loanPurpose) {
          newErrors.loanPurpose = "Please select a loan purpose"
        }
        if (!formData.duration) {
          newErrors.duration = "Please select loan duration"
        }
        break
      case 2:
        if (!formData.monthlyIncome || parseFloat(formData.monthlyIncome) <= 0) {
          newErrors.monthlyIncome = "Please enter your monthly income"
        }
        if (!formData.monthlyExpenses || parseFloat(formData.monthlyExpenses) <= 0) {
          newErrors.monthlyExpenses = "Please enter your monthly expenses"
        }
        if (!formData.bankName) {
          newErrors.bankName = "Please select your bank"
        }
        if (!formData.accountNumber) {
          newErrors.accountNumber = "Please enter your account number"
        }
        break
      case 3:
        if (!formData.guarantor1Name.trim()) {
          newErrors.guarantor1Name = "Please enter first guarantor's name"
        }
        if (!formData.guarantor1Phone.trim()) {
          newErrors.guarantor1Phone = "Please enter first guarantor's phone"
        }
        if (!formData.guarantor2Name.trim()) {
          newErrors.guarantor2Name = "Please enter second guarantor's name"
        }
        if (!formData.guarantor2Phone.trim()) {
          newErrors.guarantor2Phone = "Please enter second guarantor's phone"
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  // Format currency input
  const formatCurrency = useCallback((value: string) => {
    const numericValue = value.replace(/[^\d]/g, '')
    return numericValue ? parseInt(numericValue).toLocaleString() : ''
  }, [])

  // Handle file uploads
  const handleFileUpload = useCallback((fileType: string, files: FileList | null) => {
    if (files) {
      setUploadedFiles(prev => ({
        ...prev,
        [fileType]: Array.from(files)
      }))
    }
  }, [])

  const handleNext = useCallback(() => {
    if (validateStep(step) && step < totalSteps) {
      setStep(step + 1)
    }
  }, [step, totalSteps, validateStep])

  const handlePrevious = useCallback(() => {
    if (step > 1) {
      setStep(step - 1)
      setErrors({}) // Clear errors when going back
    }
  }, [step])

  const handleSubmit = useCallback(async () => {
    if (!validateStep(4)) return

    setIsSubmitting(true)
    try {
      // Submit to API
      const response = await fetch('/api/loan-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          uploadedFiles: Object.keys(uploadedFiles).reduce((acc, key) => {
            acc[key] = uploadedFiles[key].map(file => ({
              name: file.name,
              size: file.size,
              type: file.type
            }))
            return acc
          }, {} as Record<string, any>)
        })
      })

      const result = await response.json()

      if (result.success) {
        // Clear saved draft after successful submission
        localStorage.removeItem('loan-application-draft')
        localStorage.removeItem('loan-application-step')

        setStep(5) // Success step
      } else {
        throw new Error(result.error || 'Submission failed')
      }
    } catch (error) {
      console.error('Submission failed:', error)
      // You could add a toast notification here
      alert('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }, [validateStep, formData, uploadedFiles])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'ArrowRight' && step < totalSteps) {
          e.preventDefault()
          handleNext()
        } else if (e.key === 'ArrowLeft' && step > 1) {
          e.preventDefault()
          handlePrevious()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [step, totalSteps, handleNext, handlePrevious])

  // Memoized calculations
  const loanCalculations = useMemo(() => {
    if (!formData.loanAmount || !formData.duration) return null

    const principal = parseFloat(formData.loanAmount)
    const months = parseInt(formData.duration)
    const interestRate = 0.12 // 12% annual
    const totalAmount = principal * (1 + interestRate)
    const monthlyPayment = totalAmount / months
    const totalInterest = principal * interestRate

    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount)
    }
  }, [formData.loanAmount, formData.duration])

  const financialSummary = useMemo(() => {
    if (!formData.monthlyIncome || !formData.monthlyExpenses) return null

    const totalIncome = parseFloat(formData.monthlyIncome) + parseFloat(formData.otherIncome || '0')
    const disposableIncome = totalIncome - parseFloat(formData.monthlyExpenses)

    return {
      totalIncome,
      disposableIncome
    }
  }, [formData.monthlyIncome, formData.otherIncome, formData.monthlyExpenses])

  if (step === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Application Submitted!</h2>
              <p className="text-gray-600">
                Your loan application has been submitted successfully. Application ID: <strong>LN2024001</strong>
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-left">
              <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Document verification (1-2 days)</li>
                <li>• Credit assessment (2-3 days)</li>
                <li>• Final approval (1 day)</li>
                <li>• Loan disbursement (1 day)</li>
              </ul>
            </div>
            <div className="space-y-3">
              <Link href="/dashboard">
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  Go to Dashboard
                </Button>
              </Link>
              <Button variant="outline" className="w-full bg-transparent">
                Track Application
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Loan Application</h1>
                <p className="text-xs text-gray-600">
                  Step {step} of {totalSteps}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between mb-8">
            {[
              { num: 1, title: "Loan Details", icon: DollarSign },
              { num: 2, title: "Financial Info", icon: CreditCard },
              { num: 3, title: "Guarantors", icon: FileText },
              { num: 4, title: "Documents", icon: Upload },
            ].map((stepItem) => (
              <div key={stepItem.num} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= stepItem.num ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                >
                  <stepItem.icon className="w-4 h-4" />
                </div>
                <p className="text-xs mt-2 text-center text-gray-600">{stepItem.title}</p>
              </div>
            ))}
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-xl">
                {step === 1 && "Loan Details"}
                {step === 2 && "Financial Information"}
                {step === 3 && "Guarantor Information"}
                {step === 4 && "Document Upload"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Tell us about the loan you need"}
                {step === 2 && "Provide your financial details"}
                {step === 3 && "Add guarantor information"}
                {step === 4 && "Upload required documents"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Step 1: Loan Details */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount" className="text-sm font-medium text-gray-700">
                      Loan Amount (GH₵) *
                    </Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      placeholder="10,000"
                      value={formData.loanAmount}
                      onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                      className={`h-11 ${errors.loanAmount ? 'border-red-500' : ''}`}
                      aria-describedby={errors.loanAmount ? 'loanAmount-error' : undefined}
                    />
                    {errors.loanAmount && (
                      <p id="loanAmount-error" className="text-xs text-red-600">{errors.loanAmount}</p>
                    )}
                    <p className="text-xs text-gray-500">Maximum eligible amount: GH₵25,000</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loanPurpose" className="text-sm font-medium text-gray-700">
                      Loan Purpose *
                    </Label>
                    <Select
                      value={formData.loanPurpose}
                      onValueChange={(value) => setFormData({ ...formData, loanPurpose: value })}
                    >
                      <SelectTrigger className={`h-11 ${errors.loanPurpose ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select loan purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medical-equipment">Medical Equipment</SelectItem>
                        <SelectItem value="education">Education/Training</SelectItem>
                        <SelectItem value="home-improvement">Home Improvement</SelectItem>
                        <SelectItem value="business">Business Investment</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.loanPurpose && (
                      <p className="text-xs text-red-600">{errors.loanPurpose}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-sm font-medium text-gray-700">
                      Loan Duration *
                    </Label>
                    <Select
                      value={formData.duration}
                      onValueChange={(value) => setFormData({ ...formData, duration: value })}
                    >
                      <SelectTrigger className={`h-11 ${errors.duration ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="18">18 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                        <SelectItem value="36">36 months</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.duration && (
                      <p className="text-xs text-red-600">{errors.duration}</p>
                    )}
                  </div>

                  {loanCalculations && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Loan Summary</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-green-700">Monthly Payment</p>
                          <p className="font-semibold text-green-900">
                            GH₵{loanCalculations.monthlyPayment.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-green-700">Total Interest</p>
                          <p className="font-semibold text-green-900">
                            GH₵{loanCalculations.totalInterest.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-green-200">
                        <p className="text-xs text-green-700">
                          Total Amount: GH₵{loanCalculations.totalAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Financial Information */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyIncome" className="text-sm font-medium text-gray-700">
                      Monthly Salary (GH₵) *
                    </Label>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      placeholder="3,500"
                      value={formData.monthlyIncome}
                      onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                      className={`h-11 ${errors.monthlyIncome ? 'border-red-500' : ''}`}
                    />
                    {errors.monthlyIncome && (
                      <p className="text-xs text-red-600">{errors.monthlyIncome}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="otherIncome" className="text-sm font-medium text-gray-700">
                      Other Monthly Income (GH₵)
                    </Label>
                    <Input
                      id="otherIncome"
                      type="number"
                      placeholder="500"
                      value={formData.otherIncome}
                      onChange={(e) => setFormData({ ...formData, otherIncome: e.target.value })}
                      className="h-11"
                    />
                    <p className="text-xs text-gray-500">Include side jobs, investments, etc.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthlyExpenses" className="text-sm font-medium text-gray-700">
                      Monthly Expenses (GH₵)
                    </Label>
                    <Input
                      id="monthlyExpenses"
                      type="number"
                      placeholder="2,000"
                      value={formData.monthlyExpenses}
                      onChange={(e) => setFormData({ ...formData, monthlyExpenses: e.target.value })}
                      className="h-11"
                    />
                    <p className="text-xs text-gray-500">Include rent, utilities, food, transport, etc.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankName" className="text-sm font-medium text-gray-700">
                      Bank Name
                    </Label>
                    <Select
                      value={formData.bankName}
                      onValueChange={(value) => setFormData({ ...formData, bankName: value })}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select your bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gcb">GCB Bank</SelectItem>
                        <SelectItem value="ecobank">Ecobank Ghana</SelectItem>
                        <SelectItem value="stanbic">Stanbic Bank</SelectItem>
                        <SelectItem value="absa">Absa Bank Ghana</SelectItem>
                        <SelectItem value="fidelity">Fidelity Bank</SelectItem>
                        <SelectItem value="cal">CAL Bank</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountNumber" className="text-sm font-medium text-gray-700">
                      Account Number
                    </Label>
                    <Input
                      id="accountNumber"
                      placeholder="1234567890"
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                      className="h-11"
                    />
                  </div>

                  {financialSummary && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Financial Summary</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-blue-700">Total Income</p>
                          <p className="font-semibold text-blue-900">
                            GH₵{financialSummary.totalIncome.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-blue-700">Disposable Income</p>
                          <p className={`font-semibold ${financialSummary.disposableIncome < 0 ? 'text-red-600' : 'text-blue-900'}`}>
                            GH₵{financialSummary.disposableIncome.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      {financialSummary.disposableIncome < 0 && (
                        <p className="text-xs text-red-600 mt-2">
                          ⚠️ Your expenses exceed your income. Consider reviewing your budget.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Guarantor Information */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> You need two guarantors who are also HSWU members with good standing.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">First Guarantor</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="guarantor1Name" className="text-sm font-medium text-gray-700">
                          Full Name
                        </Label>
                        <Input
                          id="guarantor1Name"
                          placeholder="Dr. Kofi Mensah"
                          value={formData.guarantor1Name}
                          onChange={(e) => setFormData({ ...formData, guarantor1Name: e.target.value })}
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="guarantor1Phone" className="text-sm font-medium text-gray-700">
                          Phone Number
                        </Label>
                        <Input
                          id="guarantor1Phone"
                          placeholder="+233 24 123 4567"
                          value={formData.guarantor1Phone}
                          onChange={(e) => setFormData({ ...formData, guarantor1Phone: e.target.value })}
                          className="h-11"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Second Guarantor</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="guarantor2Name" className="text-sm font-medium text-gray-700">
                          Full Name
                        </Label>
                        <Input
                          id="guarantor2Name"
                          placeholder="Nurse Ama Osei"
                          value={formData.guarantor2Name}
                          onChange={(e) => setFormData({ ...formData, guarantor2Name: e.target.value })}
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="guarantor2Phone" className="text-sm font-medium text-gray-700">
                          Phone Number
                        </Label>
                        <Input
                          id="guarantor2Phone"
                          placeholder="+233 20 987 6543"
                          value={formData.guarantor2Phone}
                          onChange={(e) => setFormData({ ...formData, guarantor2Phone: e.target.value })}
                          className="h-11"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="collateral" className="text-sm font-medium text-gray-700">
                      Collateral (Optional)
                    </Label>
                    <Textarea
                      id="collateral"
                      placeholder="Describe any collateral you can provide (property, vehicle, etc.)"
                      value={formData.collateral}
                      onChange={(e) => setFormData({ ...formData, collateral: e.target.value })}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Document Upload */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Required Documents:</strong> Please upload clear, readable copies of all required
                      documents.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-700">Recent Payslips</p>
                      <p className="text-xs text-gray-500">Last 3 months (PDF, JPG, PNG)</p>
                      <input 
                        type="file" 
                        id="payslips"
                        className="hidden" 
                        accept=".pdf,.jpg,.jpeg,.png" 
                        multiple 
                        onChange={(e) => handleFileUpload('payslips', e.target.files)}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 bg-transparent"
                        onClick={() => document.getElementById('payslips')?.click()}
                      >
                        Choose Files
                      </Button>
                      {uploadedFiles.payslips && uploadedFiles.payslips.length > 0 && (
                        <div className="mt-2 text-xs text-green-600">
                          {uploadedFiles.payslips.length} file(s) selected
                        </div>
                      )}
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-700">Bank Statements</p>
                      <p className="text-xs text-gray-500">Last 6 months (PDF)</p>
                      <input 
                        type="file" 
                        id="bankStatements"
                        className="hidden" 
                        accept=".pdf" 
                        onChange={(e) => handleFileUpload('bankStatements', e.target.files)}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 bg-transparent"
                        onClick={() => document.getElementById('bankStatements')?.click()}
                      >
                        Choose File
                      </Button>
                      {uploadedFiles.bankStatements && uploadedFiles.bankStatements.length > 0 && (
                        <div className="mt-2 text-xs text-green-600">
                          {uploadedFiles.bankStatements[0].name}
                        </div>
                      )}
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-700">Employment Letter</p>
                      <p className="text-xs text-gray-500">Current employment confirmation</p>
                      <input 
                        type="file" 
                        id="employmentLetter"
                        className="hidden" 
                        accept=".pdf,.jpg,.jpeg,.png" 
                        onChange={(e) => handleFileUpload('employmentLetter', e.target.files)}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 bg-transparent"
                        onClick={() => document.getElementById('employmentLetter')?.click()}
                      >
                        Choose File
                      </Button>
                      {uploadedFiles.employmentLetter && uploadedFiles.employmentLetter.length > 0 && (
                        <div className="mt-2 text-xs text-green-600">
                          {uploadedFiles.employmentLetter[0].name}
                        </div>
                      )}
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-700">Guarantor Consent Forms</p>
                      <p className="text-xs text-gray-500">Signed forms from both guarantors</p>
                      <input 
                        type="file" 
                        id="guarantorForms"
                        className="hidden" 
                        accept=".pdf,.jpg,.jpeg,.png" 
                        multiple 
                        onChange={(e) => handleFileUpload('guarantorForms', e.target.files)}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 bg-transparent"
                        onClick={() => document.getElementById('guarantorForms')?.click()}
                      >
                        Choose Files
                      </Button>
                      {uploadedFiles.guarantorForms && uploadedFiles.guarantorForms.length > 0 && (
                        <div className="mt-2 text-xs text-green-600">
                          {uploadedFiles.guarantorForms.length} file(s) selected
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="terms" className="rounded border-gray-300" />
                      <Label htmlFor="terms" className="text-sm text-green-800">
                        I agree to the{" "}
                        <a href="#" className="underline">
                          terms and conditions
                        </a>{" "}
                        and confirm that all information provided is accurate.
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={step === 1}
                  className="flex items-center bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {step < totalSteps ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 flex items-center"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
