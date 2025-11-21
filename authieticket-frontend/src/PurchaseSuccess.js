import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, CheckCircle, Wallet, Download, ArrowRight, QrCode, Receipt } from 'lucide-react';

function PurchaseSuccess() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          </div>
        </div>
      </header>

      {/* Success Hero */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Purchase Successful!</h1>
          <p className="text-xl text-purple-100">
            Your ticket has been confirmed and is ready to use
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Event Summary */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Event</p>
                <p className="text-lg font-bold text-gray-900">Taylor Swift | The Eras Tour</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Date & Time</p>
                <p className="text-lg font-bold text-gray-900">Jul 15, 2025 • 7:00 PM</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Venue</p>
                <p className="text-lg font-bold text-gray-900">My Dinh National Stadium, Hanoi</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Section</p>
                <p className="text-lg font-bold text-gray-900">VIP • Row 5 • Seat 12</p>
              </div>
            </div>
          </div>

          {/* What You Received */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What You Received</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* QR Code Ticket */}
              <div className="bg-white rounded-xl shadow-md p-6 border-2 border-purple-200">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">QR Code Ticket</h3>
                <p className="text-gray-600 text-sm text-center mb-4">
                  Available in your Encore account
                </p>
                
                {/* QR Code Display */}
                <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
                  <div className="w-full aspect-square bg-gray-900 rounded flex items-center justify-center">
                    {/* Simulated QR Code Pattern */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <rect width="100" height="100" fill="white"/>
                      {/* Corner markers */}
                      <rect x="5" y="5" width="20" height="20" fill="black"/>
                      <rect x="75" y="5" width="20" height="20" fill="black"/>
                      <rect x="5" y="75" width="20" height="20" fill="black"/>
                      <rect x="10" y="10" width="10" height="10" fill="white"/>
                      <rect x="80" y="10" width="10" height="10" fill="white"/>
                      <rect x="10" y="80" width="10" height="10" fill="white"/>
                      {/* Random pattern */}
                      <rect x="30" y="10" width="5" height="5" fill="black"/>
                      <rect x="40" y="10" width="5" height="5" fill="black"/>
                      <rect x="50" y="10" width="5" height="5" fill="black"/>
                      <rect x="35" y="20" width="5" height="5" fill="black"/>
                      <rect x="45" y="20" width="5" height="5" fill="black"/>
                      <rect x="30" y="30" width="5" height="5" fill="black"/>
                      <rect x="40" y="30" width="5" height="5" fill="black"/>
                      <rect x="50" y="30" width="5" height="5" fill="black"/>
                      <rect x="60" y="30" width="5" height="5" fill="black"/>
                      <rect x="35" y="40" width="5" height="5" fill="black"/>
                      <rect x="55" y="40" width="5" height="5" fill="black"/>
                      <rect x="30" y="50" width="5" height="5" fill="black"/>
                      <rect x="40" y="50" width="5" height="5" fill="black"/>
                      <rect x="60" y="50" width="5" height="5" fill="black"/>
                      <rect x="35" y="60" width="5" height="5" fill="black"/>
                      <rect x="45" y="60" width="5" height="5" fill="black"/>
                      <rect x="55" y="60" width="5" height="5" fill="black"/>
                      <rect x="30" y="70" width="5" height="5" fill="black"/>
                      <rect x="50" y="70" width="5" height="5" fill="black"/>
                      <rect x="60" y="35" width="5" height="5" fill="black"/>
                      <rect x="70" y="35" width="5" height="5" fill="black"/>
                      <rect x="65" y="45" width="5" height="5" fill="black"/>
                      <rect x="75" y="45" width="5" height="5" fill="black"/>
                      <rect x="60" y="55" width="5" height="5" fill="black"/>
                      <rect x="70" y="55" width="5" height="5" fill="black"/>
                      <rect x="65" y="65" width="5" height="5" fill="black"/>
                      <rect x="75" y="65" width="5" height="5" fill="black"/>
                    </svg>
                  </div>
                  <p className="text-center text-xs text-gray-500 mt-2">Scan at venue entrance</p>
                </div>
                
                <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download QR Code
                </button>
              </div>

              {/* NFT Wallet */}
              <div className="bg-white rounded-xl shadow-md p-6 border-2 border-blue-200">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">NFT in Wallet</h3>
                <p className="text-gray-600 text-sm text-center mb-4">
                  Stored securely in your digital wallet
                </p>
                
                {/* NFT Preview */}
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg p-4 mb-4">
                  <div className="bg-white rounded-lg p-3 mb-3">
                    <div className="text-xs text-gray-500 mb-1">Token ID</div>
                    <div className="font-mono text-sm text-gray-900">0x742d...89aB</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 mb-3">
                    <div className="text-xs text-gray-500 mb-1">Contract</div>
                    <div className="font-mono text-sm text-gray-900">0x8f3a...12cD</div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Blockchain</span>
                    <span className="font-medium text-purple-600">Ethereum</span>
                  </div>
                </div>
                
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2">
                  <Wallet className="w-4 h-4" />
                  View in Wallet
                </button>
              </div>

              {/* Receipt */}
              <div className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-200">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Receipt className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Receipt</h3>
                <p className="text-gray-600 text-sm text-center mb-4">
                  Transaction confirmation & proof of purchase
                </p>
                
                {/* Receipt Details */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ticket Price</span>
                    <span className="font-medium text-gray-900">$189.99</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-medium text-gray-900">$9.50</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-sm font-bold">
                    <span className="text-gray-900">Total Paid</span>
                    <span className="text-purple-600">$199.49</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-xs text-gray-500 mb-1">Transaction ID</div>
                    <div className="font-mono text-xs text-gray-900">TXN-2025-11-21-8X9Y</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Payment Method</div>
                    <div className="text-sm text-gray-900">PayPal</div>
                  </div>
                </div>
                
                <button className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Receipt
                </button>
              </div>

            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">What's Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="font-bold mb-2">Access Your Account</h3>
                <p className="text-sm text-purple-100">
                  Log in to view your QR code ticket anytime
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="font-bold mb-2">Arrive at Venue</h3>
                <p className="text-sm text-purple-100">
                  Bring your phone with the QR code ready
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="font-bold mb-2">Scan & Enjoy</h3>
                <p className="text-sm text-purple-100">
                  Scan your QR code at the entrance and enjoy the event!
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-4 bg-white text-purple-600 border-2 border-purple-600 rounded-lg font-bold hover:bg-purple-50 transition flex items-center justify-center gap-2"
            >
              Browse More Events
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-4 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition flex items-center justify-center gap-2">
              <Ticket className="w-5 h-5" />
              View My Tickets
            </button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
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

export default PurchaseSuccess;
