"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CreditCard,
  Smartphone,
  Shield,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Loader2,
  AlertTriangle,
  Phone,
  DollarSign,
} from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  loanId: string
  memberName: string
  onPaymentSuccess: (transactionId: string) => void
}

export function PaymentModal({ isOpen, onClose, amount, loanId, memberName, onPaymentSuccess }: PaymentModalProps) {
  const [step, setStep] = useState(1) // 1: method, 2: details, 3: processing, 4: success/error
  const [paymentMethod, setPaymentMethod] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [network, setNetwork] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactionStatus, setTransactionStatus] = useState<"success" | "failed" | null>(null)
  const [transactionId, setTransactionId] = useState("")
  const [progress, setProgress] = useState(0)

  const networks = [
    { value: "mtn", label: "MTN Mobile Money", color: "bg-yellow-500", prefix: "024, 025, 053, 054, 055, 059" },
    { value: "vodafone", label: "Vodafone Cash", color: "bg-red-500", prefix: "020, 050" },
    { value: "airteltigo", label: "AirtelTigo Money", color: "bg-blue-500", prefix: "026, 027, 056, 057" },
  ]

  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method)
    setStep(2)
  }

  const handleProcessPayment = async () => {
    setIsProcessing(true)
    setStep(3)
    setProgress(0)

    // Simulate payment processing with progress updates
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 500)

    try {
      // Simulate API call to payment processor
      await new Promise((resolve) => setTimeout(resolve, 5000))

      // Simulate random success/failure for demo
      const isSuccess = Math.random() > 0.2 // 80% success rate

      clearInterval(progressInterval)
      setProgress(100)

      if (isSuccess) {
        const mockTransactionId = `TXN${Date.now()}`
        setTransactionId(mockTransactionId)
        setTransactionStatus("success")
        setStep(4)
        setTimeout(() => {
          onPaymentSuccess(mockTransactionId)
        }, 2000)
      } else {
        setTransactionStatus("failed")
        setStep(4)
      }
    } catch (error) {
      clearInterval(progressInterval)
      setTransactionStatus("failed")
      setStep(4)
    } finally {
      setIsProcessing(false)
    }
  }

  const resetModal = () => {
    setStep(1)
    setPaymentMethod("")
    setPhoneNumber("")
    setNetwork("")
    setIsProcessing(false)
    setTransactionStatus(null)
    setTransactionId("")
    setProgress(0)
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-green-600" />
            Make Payment
          </DialogTitle>
          <DialogDescription>
            Pay GH₵{amount.toLocaleString()} for loan {loanId}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-green-700">Payment Amount</span>
              <span className="text-lg font-bold text-green-600">GH₵{amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-700">Loan ID</span>
              <span className="text-sm font-medium">{loanId}</span>
            </div>
          </div>

          {/* Step 1: Payment Method Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Choose Payment Method</h3>

              {/* Mobile Money */}
              <Card
                className="cursor-pointer hover:bg-green-50 transition-colors border-2 hover:border-green-200"
                onClick={() => handlePaymentMethodSelect("momo")}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Mobile Money</h4>
                      <p className="text-sm text-gray-600">Pay with MTN, Vodafone, or AirtelTigo</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Recommended</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Bank Transfer */}
              <Card
                className="cursor-pointer hover:bg-blue-50 transition-colors border-2 hover:border-blue-200"
                onClick={() => handlePaymentMethodSelect("bank")}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Bank Transfer</h4>
                      <p className="text-sm text-gray-600">Direct bank account transfer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Payment Details */}
          {step === 2 && paymentMethod === "momo" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <h3 className="font-semibold text-gray-900">Mobile Money Details</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="network">Select Network</Label>
                  <Select value={network} onValueChange={setNetwork}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your network" />
                    </SelectTrigger>
                    <SelectContent>
                      {networks.map((net) => (
                        <SelectItem key={net.value} value={net.value}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${net.color}`}></div>
                            <span>{net.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {network && (
                    <p className="text-xs text-gray-500">
                      Supported prefixes: {networks.find((n) => n.value === network)?.prefix}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Money Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="024 123 4567"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Secure Payment</p>
                      <p>
                        Your payment is processed securely. You'll receive a prompt on your phone to authorize the
                        transaction.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleProcessPayment}
                  disabled={!network || !phoneNumber}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Pay GH₵{amount.toLocaleString()}
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Bank Transfer Details */}
          {step === 2 && paymentMethod === "bank" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <h3 className="font-semibold text-gray-900">Bank Transfer Details</h3>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <h4 className="font-semibold text-gray-900">Transfer to:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank:</span>
                    <span className="font-medium">GCB Bank Limited</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Name:</span>
                    <span className="font-medium">HSWU Fund Loan Account</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Number:</span>
                    <span className="font-mono font-medium">1234567890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-mono font-medium">
                      {loanId}-{memberName.replace(/\s+/g, "")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium">Important</p>
                    <p>
                      Please use the reference number above when making the transfer. This helps us identify your
                      payment quickly.
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={handleClose} variant="outline" className="w-full bg-transparent">
                I'll Transfer Manually
              </Button>
            </div>
          )}

          {/* Step 3: Processing */}
          {step === 3 && (
            <div className="space-y-6 text-center py-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Processing Payment</h3>
                <p className="text-sm text-gray-600">
                  {progress < 30 && "Initiating payment request..."}
                  {progress >= 30 && progress < 60 && "Sending prompt to your phone..."}
                  {progress >= 60 && progress < 90 && "Waiting for authorization..."}
                  {progress >= 90 && "Confirming transaction..."}
                </p>
              </div>
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-gray-500">{progress}% complete</p>
              </div>
              {paymentMethod === "momo" && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800">
                    Check your phone for a payment prompt from your mobile money provider.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Success/Error */}
          {step === 4 && (
            <div className="space-y-6 text-center py-8">
              {transactionStatus === "success" ? (
                <>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-green-900">Payment Successful!</h3>
                    <p className="text-sm text-gray-600">Your payment has been processed successfully.</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Amount Paid:</span>
                      <span className="font-semibold">GH₵{amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Transaction ID:</span>
                      <span className="font-mono text-xs">{transactionId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Status:</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
                    </div>
                  </div>
                  <Button onClick={handleClose} className="w-full bg-green-600 hover:bg-green-700">
                    Done
                  </Button>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <XCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-red-900">Payment Failed</h3>
                    <p className="text-sm text-gray-600">
                      Your payment could not be processed. Please try again or contact support.
                    </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-800">
                      Common issues: Insufficient balance, network timeout, or transaction declined by provider.
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                      Try Again
                    </Button>
                    <Button onClick={handleClose} className="flex-1">
                      Close
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
