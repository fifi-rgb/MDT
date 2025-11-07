import React, { useState } from 'react';
import { Search, Wallet, User, ShoppingCart, Menu, X, Ticket, TrendingUp, Shield, Zap, ChevronRight, Star, MapPin, Calendar, Clock, Heart, Filter, SlidersHorizontal } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const featuredEvents = [
    {
      id: 1,
      name: "Summer Music Festival 2025",
      image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      date: "Jul 15, 2025",
      time: "6:00 PM",
      venue: "Central Park, NYC",
      price: 89.99,
      originalPrice: 99.99,
      type: "NFT",
      seller: "0x742d...89aB",
      rating: 4.8,
      category: "Music"
    },
    {
      id: 2,
      name: "Tech Conference 2025",
      image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      date: "Aug 22, 2025",
      time: "9:00 AM",
      venue: "Convention Center, SF",
      price: 299.00,
      originalPrice: 350.00,
      type: "Traditional",
      seller: "ticketmaster",
      rating: 4.9,
      category: "Conference"
    },
    {
      id: 3,
      name: "NBA Finals Game 5",
      image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      date: "Jun 10, 2025",
      time: "8:00 PM",
      venue: "Madison Square Garden",
      price: 450.00,
      originalPrice: 500.00,
      type: "NFT",
      seller: "0x8f3a...12cD",
      rating: 5.0,
      category: "Sports"
    },
    {
      id: 4,
      name: "Broadway: Hamilton",
      image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      date: "Jul 8, 2025",
      time: "7:30 PM",
      venue: "Richard Rodgers Theatre",
      price: 175.00,
      originalPrice: 200.00,
      type: "Traditional",
      seller: "telecharge",
      rating: 4.7,
      category: "Theater"
    },
    {
      id: 5,
      name: "EDM Night: Afterlife",
      image: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
      date: "Aug 5, 2025",
      time: "10:00 PM",
      venue: "Brooklyn Mirage",
      price: 65.00,
      originalPrice: 75.00,
      type: "NFT",
      seller: "0x9bc2...45eF",
      rating: 4.6,
      category: "Music"
    },
    {
      id: 6,
      name: "Stand-up Comedy Night",
      image: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      date: "Jul 20, 2025",
      time: "8:00 PM",
      venue: "Comedy Cellar, NYC",
      price: 42.00,
      originalPrice: 45.00,
      type: "Traditional",
      seller: "eventbrite",
      rating: 4.5,
      category: "Comedy"
    }
  ];

  const categories = ['All', 'Music', 'Sports', 'Theater', 'Conference', 'Comedy'];

  const filteredEvents = activeTab === 'all' 
    ? featuredEvents 
    : featuredEvents.filter(e => e.category.toLowerCase() === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Authieticket
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition">Marketplace</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition">Sell Tickets</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition">How It Works</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition">About</a>
            </nav>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition font-medium">
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <User className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col gap-4">
                <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">Marketplace</a>
                <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">Sell Tickets</a>
                <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">How It Works</a>
                <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">About</a>
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium justify-center">
                  <Wallet className="w-5 h-5" />
                  Connect Wallet
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Buy & Sell Authentic Event Tickets Securely
            </h1>
            <p className="text-lg md:text-xl text-purple-100 mb-8">
              Hybrid marketplace supporting both traditional tickets and NFTs. Transparent, secure, and fair pricing.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-lg p-2 flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-400 ml-2" />
              <input 
                type="text" 
                placeholder="Search events, artists, venues..." 
                className="flex-1 px-2 py-3 outline-none text-gray-800"
              />
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-medium">
                Search
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-200" />
                <span className="text-sm text-purple-100">Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-200" />
                <span className="text-sm text-purple-100">Instant Transfer</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-200" />
                <span className="text-sm text-purple-100">Fair Pricing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat.toLowerCase())}
                  className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                    activeTab === cat.toLowerCase()
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Events Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Events</h2>
            <a href="#" className="flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium">
              View All
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div 
                key={event.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden group"
                onClick={() => setSelectedTicket(event)}
              >
                {/* Event Image */}
                <div 
                  className="h-48 relative"
                  style={{ background: event.image }}
                >
                  <div className="absolute top-3 right-3">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      event.type === 'NFT' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-blue-600 text-white'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-purple-600 transition">
                    {event.name}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                      <Clock className="w-4 h-4 ml-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  {/* Seller Info */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                      <div>
                        <p className="text-xs text-gray-500">Seller</p>
                        <p className="text-sm font-medium text-gray-900">{event.seller}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-bold text-gray-900">{event.rating}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 line-through">${event.originalPrice}</p>
                      <p className="text-2xl font-bold text-purple-600">${event.price}</p>
                    </div>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How Authieticket Works</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Simple, secure, and transparent ticket marketplace for everyone
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">List Your Ticket</h3>
              <p className="text-gray-400 mb-4">
                Upload your ticket from Ticketmaster, StubHub, or mint an NFT ticket. Set your price within fair limits.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-600 rounded-full text-xs">Traditional</span>
                <span className="px-3 py-1 bg-purple-600 rounded-full text-xs">NFT</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Transaction</h3>
              <p className="text-gray-400 mb-4">
                Buyers pay with credit card or crypto. Funds held in escrow until ticket transfer is confirmed.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-green-400">PCI Compliant</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Transfer</h3>
              <p className="text-gray-400 mb-4">
                Ticket ownership transfers immediately. Seller gets paid minus platform fee. Buyer gets ticket.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400">Atomic Transaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600 mb-2">50K+</p>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600 mb-2">200K+</p>
              <p className="text-gray-600">Tickets Sold</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600 mb-2">$5M+</p>
              <p className="text-gray-600">Transaction Volume</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600 mb-2">4.8★</p>
              <p className="text-gray-600">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                  <Ticket className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Authieticket</span>
              </div>
              <p className="text-gray-400 text-sm">
                The future of event ticketing. Secure, transparent, and authentic.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Marketplace</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Browse Events</a></li>
                <li><a href="#" className="hover:text-white transition">Sell Tickets</a></li>
                <li><a href="#" className="hover:text-white transition">NFT Tickets</a></li>
                <li><a href="#" className="hover:text-white transition">Verified Sellers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Refund Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © 2025 Authieticket. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Discord</a>
              <a href="#" className="text-gray-400 hover:text-white transition">GitHub</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTicket(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="h-64 relative"
              style={{ background: selectedTicket.image }}
            >
              <button 
                className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100"
                onClick={() => setSelectedTicket(null)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedTicket.name}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    selectedTicket.type === 'NFT' 
                      ? 'bg-purple-100 text-purple-600' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {selectedTicket.type} Ticket
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 line-through">${selectedTicket.originalPrice}</p>
                  <p className="text-4xl font-bold text-purple-600">${selectedTicket.price}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">{selectedTicket.date} at {selectedTicket.time}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">{selectedTicket.venue}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Seller Information</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">{selectedTicket.seller}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{selectedTicket.rating} rating</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                    View Profile
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-bold text-lg">
                  Purchase Ticket
                </button>
                <button className="px-6 py-4 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition font-bold">
                  <Heart className="w-6 h-6" />
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-4">
                <Shield className="w-4 h-4 inline mr-1" />
                Secure payment • Buyer protection included
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
