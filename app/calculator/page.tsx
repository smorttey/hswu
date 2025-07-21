"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Heart, Calculator, ArrowLeft, DollarSign, Calendar, Percent, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function LoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState([10000])
  const [duration, setDuration] = useState([24])
  const [interestRate, setInterestRate] = useState([12])
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalPayable, setTotalPayable] = useState(0)

  useEffect(() => {
    const principal = loanAmount[0]
    const months = duration[0]
    const rate = interestRate[0] / 100 / 12

    if (principal && months && rate) {
      const monthlyPaymentCalc = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)
      const totalPayableCalc = monthlyPaymentCalc * months
      const totalInterestCalc = totalPayableCalc - principal

      setMonthlyPayment(monthlyPaymentCalc)
      setTotalPayable(totalPayableCalc)
      setTotalInterest(totalInterestCalc)
    }
  }, [loanAmount, duration, interestRate])

  const generateAmortizationSchedule = () => {
    const principal = loanAmount[0]
    const months = duration[0]
    const rate = interestRate[0] / 100 / 12
    const schedule = []

    let balance = principal
    const monthlyPmt = monthlyPayment

    for (let i = 1; i <= months; i++) {
      const interestPayment = balance * rate
      const principalPayment = monthlyPmt - interestPayment
      balance -= principalPayment

      schedule.push({
        month: i,
        payment: monthlyPmt,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      })
    }

    return schedule
  }

  const amortizationSchedule = generateAmortizationSchedule()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Loan Calculator</h1>
                <p className="text-xs text-gray-600">Calculate your loan payments</p>
              </div>
            </div>
          </div>
          <Link href="/apply">
            <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              Apply for Loan
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Loan Calculator</h2>
            <p className="text-gray-600">Plan your loan with our easy-to-use calculator</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-xl">Loan Parameters</CardTitle>
                <CardDescription>Adjust the values to see your loan details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium text-gray-700">Loan Amount</Label>
                      <span className="text-lg font-bold text-green-600">GH₵{loanAmount[0].toLocaleString()}</span>
                    </div>
                    <Slider
                      value={loanAmount}
                      onValueChange={setLoanAmount}
                      max={50000}
                      min={1000}
                      step={500}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>GH₵1,000</span>
                      <span>GH₵50,000</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium text-gray-700">Loan Duration</Label>
                      <span className="text-lg font-bold text-blue-600">{duration[0]} months</span>
                    </div>
                    <Slider value={duration} onValueChange={setDuration} max={36} min={6} step={6} className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>6 months</span>
                      <span>36 months</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium text-gray-700">Interest Rate (Annual)</Label>
                      <span className="text-lg font-bold text-orange-600">{interestRate[0]}%</span>
                    </div>
                    <Slider
                      value={interestRate}
                      onValueChange={setInterestRate}
                      max={24}
                      min={8}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>8%</span>
                      <span>24%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Quick Presets</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setLoanAmount([5000])
                        setDuration([12])
                        setInterestRate([12])
                      }}
                    >
                      Small Loan
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setLoanAmount([15000])
                        setDuration([24])
                        setInterestRate([12])
                      }}
                    >
                      Medium Loan
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setLoanAmount([30000])
                        setDuration([36])
                        setInterestRate([12])
                      }}
                    >
                      Large Loan
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setLoanAmount([10000])
                        setDuration([18])
                        setInterestRate([10])
                      }}
                    >
                      Best Rate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {/* Payment Summary */}
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-xl">Payment Summary</CardTitle>
                  <CardDescription>Your loan payment breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-green-700 mb-1">Monthly Payment</p>
                      <p className="text-2xl font-bold text-green-600">
                        GH₵{Math.round(monthlyPayment).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-blue-700 mb-1">Total Interest</p>
                      <p className="text-2xl font-bold text-blue-600">
                        GH₵{Math.round(totalInterest).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <p className="text-sm text-orange-700 mb-1">Total Payable</p>
                      <p className="text-2xl font-bold text-orange-600">
                        GH₵{Math.round(totalPayable).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Percent className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm text-purple-700 mb-1">Interest Rate</p>
                      <p className="text-2xl font-bold text-purple-600">{interestRate[0]}% p.a.</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg text-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-green-100">Repayment Start Date</p>
                        <p className="font-semibold">
                          {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-GB")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-100">Final Payment Date</p>
                        <p className="font-semibold">
                          {new Date(Date.now() + (duration[0] + 1) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(
                            "en-GB",
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-3">
                    <Link href="/apply" className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                        Apply for This Loan
                      </Button>
                    </Link>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Save Calculation
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Eligibility Check */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-lg text-green-700">Eligibility Check</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">HSWU Member</span>
                      <span className="text-green-600 font-medium">✓ Required</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Minimum Income</span>
                      <span className="text-green-600 font-medium">✓ GH₵1,500/month</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Employment Period</span>
                      <span className="text-green-600 font-medium">✓ 6+ months</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Credit Score</span>
                      <span className="text-green-600 font-medium">✓ Good standing</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800 text-center">
                      <strong>Great news!</strong> You meet all eligibility requirements for this loan amount.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Amortization Schedule */}
          <Card className="mt-8 shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-xl">Amortization Schedule</CardTitle>
              <CardDescription>Monthly payment breakdown over the loan term</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Month</th>
                      <th className="text-right py-2">Payment</th>
                      <th className="text-right py-2">Principal</th>
                      <th className="text-right py-2">Interest</th>
                      <th className="text-right py-2">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {amortizationSchedule.slice(0, 12).map((row) => (
                      <tr key={row.month} className="border-b hover:bg-gray-50">
                        <td className="py-2">{row.month}</td>
                        <td className="text-right py-2">GH₵{Math.round(row.payment).toLocaleString()}</td>
                        <td className="text-right py-2">GH₵{Math.round(row.principal).toLocaleString()}</td>
                        <td className="text-right py-2">GH₵{Math.round(row.interest).toLocaleString()}</td>
                        <td className="text-right py-2">GH₵{Math.round(row.balance).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {amortizationSchedule.length > 12 && (
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">
                    View Full Schedule ({amortizationSchedule.length} months)
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
