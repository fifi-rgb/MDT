import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Shield, TrendingUp, Users, Globe, Heart, ArrowRight, CheckCircle } from 'lucide-react';

function About() {
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
              <Link to="/about" className="text-purple-600 font-medium">About</Link>
              <Link to="/how-it-works" className="text-gray-700 hover:text-purple-600 font-medium transition">How It Works</Link>
              <Link to="/sell-ticket" className="text-gray-700 hover:text-purple-600 font-medium transition">Sell Tickets</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Encore</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Revolutionizing event ticketing with a hybrid marketplace that bridges traditional platforms and blockchain technology
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                Encore is on a mission to make event ticketing fair, transparent, and accessible to everyone. We believe that fans should be able to buy and sell tickets at reasonable prices without fear of fraud or exploitation.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                By combining the reliability of established ticketing platforms with the innovation of blockchain technology, we're creating a marketplace that protects both buyers and sellers while ensuring authentic tickets at fair prices.
              </p>
              <p className="text-lg text-gray-600">
                Whether you're a concert-goer, sports fan, or event organizer, Encore provides the tools and security you need for seamless ticket transactions.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">50K+</div>
                  <div className="text-gray-600">Active Users</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">200K+</div>
                  <div className="text-gray-600">Tickets Sold</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">$5M+</div>
                  <div className="text-gray-600">Volume</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">4.8★</div>
                  <div className="text-gray-600">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Our Values</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Trust & Security</h3>
              <p className="text-gray-600">
                We use advanced encryption, escrow systems, and blockchain verification to ensure every transaction is safe and authentic.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fair Pricing</h3>
              <p className="text-gray-600">
                Our platform enforces reasonable price limits and transparent fees, protecting fans from price gouging and hidden charges.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fan-First</h3>
              <p className="text-gray-600">
                Every feature we build puts fans first. From easy navigation to buyer protection, we're here to serve the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hybrid Approach Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Hybrid Approach</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            The best of both worlds: traditional reliability meets blockchain innovation
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional Path */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Traditional Tickets</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Integration with Ticketmaster, Live Nation, and Eventbrite</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Seller verification through platform APIs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">PayPal payment processing with buyer protection</span>
                </li>
              </ul>
            </div>

            {/* NFT Path */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-600 p-3 rounded-lg">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">NFT Tickets</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Smart contracts enforce fair pricing limits</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Automatic payment distribution to all parties</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Atomic blockchain transactions eliminate escrow delays</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Unlimited resales with organizer royalties</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Join the Encore Community</h2>
          <p className="text-xl text-purple-100 mb-8">
            Start buying and selling tickets the smarter, safer way
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 transition flex items-center justify-center gap-2"
            >
              Browse Events
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/sell-ticket"
              className="px-8 py-4 bg-purple-700 text-white rounded-lg font-bold hover:bg-purple-800 transition border-2 border-white flex items-center justify-center gap-2"
            >
              Sell Your Tickets
              <ArrowRight className="w-5 h-5" />
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

export default About;
