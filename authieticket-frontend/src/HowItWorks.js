import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Upload, Shield, CreditCard, Check, Users, TrendingUp, ArrowRight, Search, DollarSign, Lock } from 'lucide-react';

function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Encore
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium transition">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-purple-600 font-medium transition">About</Link>
              <Link to="/how-it-works" className="text-purple-600 font-medium">How It Works</Link>
              <Link to="/sell-ticket" className="text-gray-700 hover:text-purple-600 font-medium transition">Sell Tickets</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">How Encore Works</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Simple, secure, and transparent ticket buying and selling in three easy steps
          </p>
        </div>
      </section>

      {/* For Buyers Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">For Buyers</h2>
            <p className="text-xl text-gray-600">Find and purchase authentic tickets with confidence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
                <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <div className="text-center mb-6">
                  <Search className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Browse Events</h3>
                  <p className="text-gray-600">
                    Search through thousands of events across music, sports, theater, and more. Filter by category, location, and date.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>See both Traditional & NFT tickets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Compare prices and sellers</span>
                  </div>
                </div>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-purple-400" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <div className="text-center mb-6">
                  <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Secure Payment</h3>
                  <p className="text-gray-600">
                    Pay with PayPal for traditional tickets or cryptocurrency for NFT tickets. All payments are protected.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Buyer protection included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Secure escrow system</span>
                  </div>
                </div>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
                <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <div className="text-center mb-6">
                  <Ticket className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Your Ticket</h3>
                  <p className="text-gray-600">
                    Receive your ticket instantly after payment. Digital tickets sent to your email or wallet.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Instant ticket transfer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>100% authentic guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition"
            >
              Start Browsing Events
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* For Sellers Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">For Sellers</h2>
            <p className="text-xl text-gray-600">List your tickets and get paid quickly and securely</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <div className="text-center mb-6">
                  <Upload className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">List Your Ticket</h3>
                  <p className="text-gray-600">
                    Upload your ticket from Ticketmaster, Live Nation, or mint an NFT ticket. Set your price within fair limits.
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-purple-600" />
                    <span>Connect your platform account</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-600" />
                    <span>Automatic ticket verification</span>
                  </div>
                </div>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-gray-400" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <div className="text-center mb-6">
                  <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Wait for Buyer</h3>
                  <p className="text-gray-600">
                    Your listing goes live immediately. Buyers can see your ticket details, price, and seller rating.
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span>Visible to thousands of buyers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span>No upfront listing fees</span>
                  </div>
                </div>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-gray-400" />
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <div className="text-center mb-6">
                  <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Paid</h3>
                  <p className="text-gray-600">
                    Once sold, receive payment instantly with competitive platform fees. Fast and secure.
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Instant payment transfer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Transparent fee structure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/sell-ticket"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition"
            >
              Start Selling Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built-In Security</h2>
            <p className="text-xl text-gray-600">Your protection is our priority</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Escrow Protection</h3>
              <p className="text-gray-600">
                Payments held securely until ticket transfer is confirmed. Protects both buyers and sellers.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Contracts</h3>
              <p className="text-gray-600">
                NFT tickets use blockchain smart contracts for automatic, tamper-proof transactions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Price Limits</h3>
              <p className="text-gray-600">
                Fair pricing enforced. NFT tickets have reasonable markup limits. No price gouging allowed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What's the difference between Traditional and NFT tickets?</h3>
              <p className="text-gray-600">
                Traditional tickets come from established platforms like Ticketmaster and Live Nation. NFT tickets are blockchain-based with smart contract enforcement and perpetual organizer royalties on resales.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How do you verify tickets are authentic?</h3>
              <p className="text-gray-600">
                Traditional tickets are verified through direct API integration with platforms. NFT tickets are verified on the blockchain with cryptographic proof of ownership.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What are your fees?</h3>
              <p className="text-gray-600">
                We charge competitive platform fees on all sales. For NFT tickets, event organizers also receive royalties on resales. All fees are clearly displayed before you complete your transaction.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What if something goes wrong?</h3>
              <p className="text-gray-600">
                Our buyer protection covers all purchases. If a ticket is invalid or the event is cancelled, you'll receive a full refund. Contact our support team 24/7.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How fast will I receive my ticket?</h3>
              <p className="text-gray-600">
                Digital tickets are transferred instantly after payment confirmation. Physical tickets are shipped within 24 hours if applicable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of fans buying and selling tickets securely on Encore
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Browse Events
            </Link>
            <Link
              to="/sell-ticket"
              className="px-8 py-4 bg-purple-700 text-white rounded-lg font-bold hover:bg-purple-800 transition border-2 border-white"
            >
              Sell Tickets
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Ticket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Encore</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 Encore. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HowItWorks;
