import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Ticket, DollarSign, Hash, Users, Shield, CheckCircle, AlertCircle } from 'lucide-react';

const platforms = [
  { id: 'ticketmaster', name: 'Ticketmaster', logo: 'https://logos-world.net/wp-content/uploads/2021/03/Ticketmaster-Logo.png' },
  { id: 'livenation', name: 'Live Nation', logo: 'https://www.livenation.com/static/images/ln-logo.svg' },
  { id: 'eventbrite', name: 'Eventbrite', logo: 'https://cdn.worldvectorlogo.com/logos/eventbrite-1.svg' },
  { id: 'nft', name: 'NFT Wallet', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' }
];

const categories = [
  { id: 'music', name: 'Music' },
  { id: 'sports', name: 'Sports' },
  { id: 'theater', name: 'Theater' },
  { id: 'conference', name: 'Conference' },
  { id: 'comedy', name: 'Comedy' }
];

const ticketTypes = [
  { id: 'general', name: 'General Admission' },
  { id: 'vip', name: 'VIP' },
  { id: 'premium', name: 'Premium' },
  { id: 'balcony', name: 'Balcony' },
  { id: 'floor', name: 'Floor' }
];

export default function SellTicket() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    platform: '',
    ticketBarcode: '',
    orderId: '',
    eventName: '',
    category: '',
    ticketType: '',
    price: '',
    originalPrice: '',
    quantity: '1',
    eventDate: '',
    venue: ''
  });
  const [isVerifying, setIsVerifying] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePlatformSelect = (platformId) => {
    setFormData({ ...formData, platform: platformId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    
    // Simulate API verification
    setTimeout(() => {
      setIsVerifying(false);
      navigate('/verification-success', { 
        state: { 
          formData,
          platform: platforms.find(p => p.id === formData.platform)
        } 
      });
    }, 2000);
  };

  const isStep1Valid = formData.platform !== '';
  const isStep2Valid = formData.ticketBarcode && formData.orderId;
  const isFormValid = formData.eventName && formData.price && formData.eventDate && formData.venue;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button 
            className="text-purple-600 hover:underline mb-4"
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl font-bold mb-2">Sell Your Tickets</h1>
          <p className="text-gray-600">List your tickets securely and reach thousands of buyers</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className={`flex items-center ${step >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                  {step > 1 ? <CheckCircle className="w-6 h-6" /> : '1'}
                </div>
                <span className="ml-3 font-medium">Choose Platform</span>
              </div>
            </div>
            <div className={`flex-1 h-1 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200'} mx-4`}></div>
            <div className="flex-1">
              <div className={`flex items-center ${step >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                  {step > 2 ? <CheckCircle className="w-6 h-6" /> : '2'}
                </div>
                <span className="ml-3 font-medium">Verify Ticket</span>
              </div>
            </div>
            <div className={`flex-1 h-1 ${step >= 3 ? 'bg-purple-600' : 'bg-gray-200'} mx-4`}></div>
            <div className="flex-1">
              <div className={`flex items-center ${step >= 3 ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <span className="ml-3 font-medium">Set Price & Details</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Choose Platform */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Select Your Ticket Platform</h2>
                  <p className="text-gray-600">Choose where you originally purchased your ticket</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {platforms.map((platform) => (
                    <div
                      key={platform.id}
                      onClick={() => handlePlatformSelect(platform.id)}
                      className={`border-2 rounded-xl p-6 cursor-pointer transition ${
                        formData.platform === platform.id
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <img src={platform.logo} alt={platform.name} className="w-16 h-16 object-contain" />
                        <div>
                          <h3 className="font-bold text-lg">{platform.name}</h3>
                          <p className="text-sm text-gray-600">
                            {platform.id === 'nft' ? 'Blockchain tickets' : 'Traditional tickets'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!isStep1Valid}
                    className={`px-8 py-3 rounded-lg font-bold ${
                      isStep1Valid
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Verify Ticket */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Verify Your Ticket</h2>
                  <p className="text-gray-600">Enter your ticket details from {platforms.find(p => p.id === formData.platform)?.name}</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Secure Verification</p>
                    <p>We'll verify your ticket with {platforms.find(p => p.id === formData.platform)?.name} to ensure authenticity and prevent fraud.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <Hash className="w-4 h-4 inline mr-1" />
                      Ticket Barcode / QR Code
                    </label>
                    <input
                      type="text"
                      name="ticketBarcode"
                      value={formData.ticketBarcode}
                      onChange={handleChange}
                      placeholder="Enter your ticket barcode number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <Ticket className="w-4 h-4 inline mr-1" />
                      Order ID / Confirmation Number
                    </label>
                    <input
                      type="text"
                      name="orderId"
                      value={formData.orderId}
                      onChange={handleChange}
                      placeholder="Enter your order/confirmation number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={!isStep2Valid}
                    className={`px-8 py-3 rounded-lg font-bold ${
                      isStep2Valid
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Verify & Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Set Price & Details */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Set Your Price & Details</h2>
                  <p className="text-gray-600">Complete your listing information</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Event Name</label>
                    <input
                      type="text"
                      name="eventName"
                      value={formData.eventName}
                      onChange={handleChange}
                      placeholder="e.g., Summer Music Festival 2025"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Ticket Type</label>
                    <select
                      name="ticketType"
                      value={formData.ticketType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      required
                    >
                      <option value="">Select type</option>
                      {ticketTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <DollarSign className="w-4 h-4 inline mr-1" />
                      Original Price (USD)
                    </label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      placeholder="150.00"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <DollarSign className="w-4 h-4 inline mr-1" />
                      Your Selling Price (USD)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="120.00"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      required
                    />
                    {formData.price && formData.originalPrice && (
                      <p className="text-sm text-gray-600 mt-1">
                        {((formData.originalPrice - formData.price) / formData.originalPrice * 100).toFixed(0)}% discount
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <Users className="w-4 h-4 inline mr-1" />
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      min="1"
                      max="10"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Event Date</label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Venue</label>
                    <input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleChange}
                      placeholder="e.g., Marina Bay Sands Expo, Singapore"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">Platform Fee: 13%</p>
                    <p>You will receive ${(formData.price * 0.87).toFixed(2)} after the platform fee (${(formData.price * 0.13).toFixed(2)})</p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!isFormValid || isVerifying}
                    className={`px-8 py-3 rounded-lg font-bold flex items-center gap-2 ${
                      isFormValid && !isVerifying
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isVerifying ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        List Ticket
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
