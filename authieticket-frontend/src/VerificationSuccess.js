import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Ticket, DollarSign, Calendar, MapPin, Shield, ArrowRight } from 'lucide-react';

export default function VerificationSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, platform } = location.state || {};

  if (!formData || !platform) {
    navigate('/');
    return null;
  }

  const platformLogos = {
    ticketmaster: 'https://www.citypng.com/public/uploads/preview/ticketmaster-tm-logo-png-701751694953dwxoqkgjr.png',
    livenation: 'https://www.livenation.com/static/images/ln-logo.svg',
    eventbrite: 'https://cdn.worldvectorlogo.com/logos/eventbrite-1.svg',
    nft: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
  };

  const ticketTypeNames = {
    general: 'General Admission',
    vip: 'VIP',
    premium: 'Premium',
    balcony: 'Balcony',
    floor: 'Floor'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Verification Successful!</h1>
          <p className="text-xl text-gray-600">Your ticket has been verified and listed</p>
        </div>

        {/* Verification Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          {/* Platform Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-medium">Verified with</span>
                </div>
                <h2 className="text-2xl font-bold">{platform.name}</h2>
              </div>
              <img 
                src={platformLogos[platform.id]} 
                alt={platform.name}
                className="w-20 h-20 object-contain bg-white rounded-lg p-2"
              />
            </div>
          </div>

          {/* Ticket Details */}
          <div className="p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{formData.eventName}</h3>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {ticketTypeNames[formData.ticketType]}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium capitalize">
                  {formData.category}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Event Date</p>
                  <p className="text-gray-900 font-bold">
                    {new Date(formData.eventDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Venue</p>
                  <p className="text-gray-900 font-bold">{formData.venue}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Your Price</p>
                  <p className="text-gray-900 font-bold text-2xl">${formData.price}</p>
                  {formData.originalPrice && (
                    <p className="text-sm text-gray-500">
                      Original: <span className="line-through">${formData.originalPrice}</span>
                      <span className="text-green-600 ml-2">
                        ({((formData.originalPrice - formData.price) / formData.originalPrice * 100).toFixed(0)}% off)
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Ticket className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Quantity</p>
                  <p className="text-gray-900 font-bold text-2xl">{formData.quantity}</p>
                  <p className="text-sm text-gray-500">
                    ticket{formData.quantity > 1 ? 's' : ''} available
                  </p>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h4 className="font-bold text-gray-900 mb-4">Verification Details</h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Barcode:</span>
                  <span className="font-mono font-bold text-gray-900">{formData.ticketBarcode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-mono font-bold text-gray-900">{formData.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform:</span>
                  <span className="font-bold text-gray-900">{platform.name}</span>
                </div>
              </div>
            </div>

            {/* Earnings Breakdown */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-4">Your Earnings</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ticket Price</span>
                  <span className="font-bold">${formData.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee (5%)</span>
                  <span className="font-bold text-red-600">-${(formData.price * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-green-300">
                  <span className="font-bold text-lg">You Receive</span>
                  <span className="font-bold text-2xl text-green-600">${(formData.price * 0.95).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="font-bold text-xl mb-4">What's Next?</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Your listing is live</h4>
                <p className="text-gray-600 text-sm">Thousands of buyers can now see your ticket on Encore marketplace</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-bold text-gray-900">We'll notify you when sold</h4>
                <p className="text-gray-600 text-sm">Get instant notifications via email and SMS when someone purchases your ticket</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Get paid securely</h4>
                <p className="text-gray-600 text-sm">Funds are held in escrow and released to you after ticket transfer is confirmed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/my-listings')}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            View My Listings
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/sell-ticket')}
            className="flex-1 border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-purple-50 transition"
          >
            Sell Another Ticket
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
