import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Shield, Users, TrendingUp, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">HSWU Fund Loan</h1>
              <p className="text-xs text-gray-600">Health Services Workers' Union</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Link href="/login">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent">
                Login
              </Button>
            </Link>
            <Link href="/apply">
              <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                Apply for Loan
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Empowering Ghana's
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  {" "}
                  Health Heroes
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Access affordable loans designed specifically for health service workers across Ghana. Quick approvals,
                competitive rates, and flexible repayment terms.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/apply">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 w-full sm:w-auto"
                >
                  Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/calculator">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 w-full sm:w-auto bg-transparent"
                >
                  Loan Calculator
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">5,000+</div>
                <div className="text-sm text-gray-600">Members Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">GH₵50M+</div>
                <div className="text-sm text-gray-600">Loans Disbursed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">98%</div>
                <div className="text-sm text-gray-600">Approval Rate</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full -translate-y-16 translate-x-16 opacity-60"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full translate-y-12 -translate-x-12 opacity-60"></div>

              <div className="relative z-10 text-center space-y-6">
                <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">Dr. Akosua Mensah</h3>
                  <p className="text-gray-600">Senior Nurse, Korle-Bu Hospital</p>
                  <p className="text-sm text-gray-500 italic">
                    "HSWU Fund helped me expand my clinic and serve more patients in my community."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h3 className="text-3xl font-bold text-gray-900">Why Choose HSWU Fund?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Designed by health workers, for health workers. We understand your unique needs and challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Low Interest Rates</h4>
                <p className="text-sm text-gray-600">Starting from 12% per annum with flexible terms</p>
              </CardContent>
            </Card>

            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Quick Approval</h4>
                <p className="text-sm text-gray-600">Get approved within 48 hours of application</p>
              </CardContent>
            </Card>

            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Secure & Trusted</h4>
                <p className="text-sm text-gray-600">Bank-level security with transparent processes</p>
              </CardContent>
            </Card>

            <Card className="border-purple-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Member Benefits</h4>
                <p className="text-sm text-gray-600">Exclusive rates and terms for union members</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-3xl font-bold text-white">Ready to Get Started?</h3>
            <p className="text-green-100 text-lg">
              Join thousands of health workers who have already benefited from our loan services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 w-full sm:w-auto">
                  Apply for Loan
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600 w-full sm:w-auto bg-transparent"
                >
                  Member Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">HSWU Fund Loan</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering Ghana's health service workers with accessible financial solutions.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/apply" className="hover:text-white">
                    Personal Loans
                  </Link>
                </li>
                <li>
                  <Link href="/calculator" className="hover:text-white">
                    Loan Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📍 TUC House, Accra, Ghana</p>
                <p>📞 +233 30 266 1234</p>
                <p>✉️ info@hswufund.org.gh</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; 2024 HSWU Fund Loan. All rights reserved. | A service of Health Services Workers' Union, TUC Ghana
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
