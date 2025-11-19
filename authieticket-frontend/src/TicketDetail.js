import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Star, Shield, Heart, TrendingDown, TrendingUp, Users, Info } from "lucide-react";

// Hardcoded event data for demo with enhanced details
const EVENTS = [
  {
    id: 1,
    name: "Summer Music Festival 2025",
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    date: "Jul 15, 2025",
    time: "6:00 PM",
    venue: "My Dinh National Stadium, Hanoi, Vietnam",
    description: "The biggest music festival in Southeast Asia featuring international and local artists. Experience 3 stages, 50+ artists, and unforgettable performances across multiple genres.",
    categories: [
      { type: "General Admission", price: 89.99, originalPrice: 99.99, available: 156, totalListings: 12 },
      { type: "VIP Section", price: 199.99, originalPrice: 249.99, available: 45, totalListings: 8 },
      { type: "Premium Lounge", price: 399.99, originalPrice: 450.00, available: 12, totalListings: 3 }
    ],
    sellers: [
      { id: 1, name: "0x742d...89aB", rating: 4.8, sales: 234, ticketsListed: 5, lowestPrice: 89.99 },
      { id: 2, name: "0x8bc3...f2a1", rating: 4.9, sales: 189, ticketsListed: 3, lowestPrice: 95.00 },
      { id: 3, name: "0x9a21...c4d8", rating: 4.7, sales: 156, ticketsListed: 4, lowestPrice: 92.50 }
    ],
    priceHistory: [
      { date: "Oct 18", avgPrice: 120 },
      { date: "Oct 25", avgPrice: 115 },
      { date: "Nov 1", avgPrice: 108 },
      { date: "Nov 8", avgPrice: 102 },
      { date: "Nov 15", avgPrice: 95 },
      { date: "Nov 19", avgPrice: 89.99 }
    ],
    type: "NFT",
    category: "Music"
  },
  {
    id: 2,
    name: "Tech Conference 2025",
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    date: "Aug 22, 2025",
    time: "9:00 AM",
    venue: "Marina Bay Sands Expo, Singapore",
    description: "Join industry leaders and innovators for 3 days of cutting-edge tech talks, workshops, and networking. Topics include AI, blockchain, cloud computing, and more.",
    categories: [
      { type: "Standard Pass", price: 299.00, originalPrice: 350.00, available: 89, totalListings: 15 },
      { type: "Premium Pass", price: 599.00, originalPrice: 699.00, available: 34, totalListings: 7 },
      { type: "VIP All-Access", price: 999.00, originalPrice: 1200.00, available: 8, totalListings: 2 }
    ],
    sellers: [
      { id: 1, name: "ticketmaster", rating: 4.9, sales: 1240, ticketsListed: 45, lowestPrice: 299.00 },
      { id: 2, name: "eventbrite", rating: 4.8, sales: 890, ticketsListed: 28, lowestPrice: 305.00 },
      { id: 3, name: "0x5c12...a9b3", rating: 4.6, sales: 67, ticketsListed: 16, lowestPrice: 310.00 }
    ],
    priceHistory: [
      { date: "Oct 18", avgPrice: 380 },
      { date: "Oct 25", avgPrice: 365 },
      { date: "Nov 1", avgPrice: 345 },
      { date: "Nov 8", avgPrice: 325 },
      { date: "Nov 15", avgPrice: 310 },
      { date: "Nov 19", avgPrice: 299 }
    ],
    type: "Traditional",
    category: "Conference"
  },
  {
    id: 3,
    name: "NBA Finals Game 5",
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    date: "Jun 10, 2025",
    time: "8:00 PM",
    venue: "Impact Arena, Bangkok, Thailand",
    description: "Witness basketball history as the world's best teams compete in the championship finals. Premium seating with excellent views of the court.",
    categories: [
      { type: "Upper Bowl", price: 450.00, originalPrice: 500.00, available: 78, totalListings: 18 },
      { type: "Lower Bowl", price: 850.00, originalPrice: 950.00, available: 42, totalListings: 12 },
      { type: "Courtside VIP", price: 2500.00, originalPrice: 3000.00, available: 6, totalListings: 3 }
    ],
    sellers: [
      { id: 1, name: "0x8f3a...12cD", rating: 5.0, sales: 456, ticketsListed: 8, lowestPrice: 450.00 },
      { id: 2, name: "stubhub", rating: 4.8, sales: 2340, ticketsListed: 15, lowestPrice: 465.00 },
      { id: 3, name: "0x3d9b...e5f2", rating: 4.9, sales: 189, ticketsListed: 7, lowestPrice: 475.00 }
    ],
    priceHistory: [
      { date: "Oct 18", avgPrice: 620 },
      { date: "Oct 25", avgPrice: 590 },
      { date: "Nov 1", avgPrice: 550 },
      { date: "Nov 8", avgPrice: 520 },
      { date: "Nov 15", avgPrice: 485 },
      { date: "Nov 19", avgPrice: 450 }
    ],
    type: "NFT",
    category: "Sports"
  },
  {
    id: 4,
    name: "Broadway: Hamilton",
    image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    date: "Jul 8, 2025",
    time: "7:30 PM",
    venue: "Esplanade – Theatres on the Bay, Singapore",
    description: "The award-winning Broadway musical comes to Singapore! Experience the story of America's founding father through hip-hop, jazz, and R&B.",
    categories: [
      { type: "Balcony", price: 175.00, originalPrice: 200.00, available: 92, totalListings: 14 },
      { type: "Orchestra", price: 325.00, originalPrice: 375.00, available: 38, totalListings: 9 },
      { type: "Premium Orchestra", price: 495.00, originalPrice: 550.00, available: 15, totalListings: 4 }
    ],
    sellers: [
      { id: 1, name: "telecharge", rating: 4.7, sales: 3420, ticketsListed: 35, lowestPrice: 175.00 },
      { id: 2, name: "0xa4f8...c2d1", rating: 4.8, sales: 124, ticketsListed: 12, lowestPrice: 180.00 },
      { id: 3, name: "sistic", rating: 4.6, sales: 890, ticketsListed: 18, lowestPrice: 185.00 }
    ],
    priceHistory: [
      { date: "Oct 18", avgPrice: 245 },
      { date: "Oct 25", avgPrice: 230 },
      { date: "Nov 1", avgPrice: 215 },
      { date: "Nov 8", avgPrice: 200 },
      { date: "Nov 15", avgPrice: 188 },
      { date: "Nov 19", avgPrice: 175 }
    ],
    type: "Traditional",
    category: "Theater"
  },
  {
    id: 5,
    name: "EDM Night: Afterlife",
    image: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    date: "Aug 5, 2025",
    time: "10:00 PM",
    venue: "Saigon Opera House, Ho Chi Minh City, Vietnam",
    description: "An electrifying night of electronic dance music featuring world-renowned DJs. State-of-the-art sound system and mesmerizing light shows await.",
    categories: [
      { type: "General Admission", price: 65.00, originalPrice: 75.00, available: 245, totalListings: 22 },
      { type: "VIP Table (4 ppl)", price: 450.00, originalPrice: 500.00, available: 12, totalListings: 5 },
      { type: "Backstage Pass", price: 250.00, originalPrice: 300.00, available: 8, totalListings: 3 }
    ],
    sellers: [
      { id: 1, name: "0x9bc2...45eF", rating: 4.6, sales: 312, ticketsListed: 18, lowestPrice: 65.00 },
      { id: 2, name: "0x7e41...b9c8", rating: 4.7, sales: 201, ticketsListed: 9, lowestPrice: 68.00 },
      { id: 3, name: "resident-advisor", rating: 4.8, sales: 1560, ticketsListed: 25, lowestPrice: 70.00 }
    ],
    priceHistory: [
      { date: "Oct 18", avgPrice: 88 },
      { date: "Oct 25", avgPrice: 82 },
      { date: "Nov 1", avgPrice: 78 },
      { date: "Nov 8", avgPrice: 73 },
      { date: "Nov 15", avgPrice: 69 },
      { date: "Nov 19", avgPrice: 65 }
    ],
    type: "NFT",
    category: "Music"
  },
  {
    id: 6,
    name: "Stand-up Comedy Night",
    image: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    date: "Jul 20, 2025",
    time: "8:00 PM",
    venue: "Thailand Cultural Centre, Bangkok, Thailand",
    description: "Laugh out loud with top international comedians performing their best material. An intimate evening of comedy featuring multiple acts.",
    categories: [
      { type: "Standard Seating", price: 42.00, originalPrice: 45.00, available: 178, totalListings: 16 },
      { type: "Premium Front Row", price: 85.00, originalPrice: 95.00, available: 24, totalListings: 6 },
      { type: "VIP Meet & Greet", price: 150.00, originalPrice: 175.00, available: 10, totalListings: 2 }
    ],
    sellers: [
      { id: 1, name: "eventbrite", rating: 4.5, sales: 890, ticketsListed: 42, lowestPrice: 42.00 },
      { id: 2, name: "0x6d92...f3a5", rating: 4.6, sales: 145, ticketsListed: 8, lowestPrice: 44.00 },
      { id: 3, name: "ticketmelon", rating: 4.7, sales: 567, ticketsListed: 14, lowestPrice: 45.00 }
    ],
    priceHistory: [
      { date: "Oct 18", avgPrice: 52 },
      { date: "Oct 25", avgPrice: 50 },
      { date: "Nov 1", avgPrice: 48 },
      { date: "Nov 8", avgPrice: 46 },
      { date: "Nov 15", avgPrice: 44 },
      { date: "Nov 19", avgPrice: 42 }
    ],
    type: "Traditional",
    category: "Comedy"
  }
];

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = EVENTS.find(e => e.id === Number(id));
  const [selectedCategory, setSelectedCategory] = useState(0);

  if (!event) return <div className="p-8">Event not found.</div>;

  const selectedTicket = event.categories[selectedCategory];
  const totalSellers = event.sellers.length;
  const priceChange = event.priceHistory[event.priceHistory.length - 1].avgPrice - event.priceHistory[0].avgPrice;
  const priceChangePercent = ((priceChange / event.priceHistory[0].avgPrice) * 100).toFixed(1);
  const isPriceDown = priceChange < 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <button className="mb-4 text-purple-600 hover:underline flex items-center gap-2" onClick={() => navigate(-1)}>
          ← Back to Events
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Event Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Header */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-80 relative" style={{ background: event.image }}>
                <span className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-bold ${event.type === 'NFT' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'}`}>
                  {event.type} Ticket
                </span>
              </div>
              <div className="p-8">
                <h1 className="text-4xl font-bold mb-4">{event.name}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 md:col-span-2">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">{event.venue}</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Info className="w-5 h-5 text-purple-600" />
                    About This Event
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{event.description}</p>
                </div>
              </div>
            </div>

            {/* Ticket Categories */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Ticket Categories</h2>
              <div className="space-y-4">
                {event.categories.map((category, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedCategory(index)}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition ${
                      selectedCategory === index
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{category.type}</h3>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 line-through">${category.originalPrice}</p>
                        <p className="text-2xl font-bold text-purple-600">${category.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{category.available} tickets available</span>
                      <span className="font-medium text-green-600">{category.totalListings} sellers</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Trend */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Price Trend (Last 30 Days)</h2>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isPriceDown ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {isPriceDown ? <TrendingDown className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                  <span className="font-bold">{isPriceDown ? '' : '+'}{priceChangePercent}%</span>
                </div>
              </div>
              <div className="relative h-64">
                <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={i * 50}
                      x2="600"
                      y2={i * 50}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                  ))}
                  
                  {/* Price line */}
                  <polyline
                    fill="none"
                    stroke="#9333ea"
                    strokeWidth="3"
                    points={event.priceHistory
                      .map((point, index) => {
                        const x = (index / (event.priceHistory.length - 1)) * 600;
                        const maxPrice = Math.max(...event.priceHistory.map(p => p.avgPrice));
                        const minPrice = Math.min(...event.priceHistory.map(p => p.avgPrice));
                        const y = 200 - ((point.avgPrice - minPrice) / (maxPrice - minPrice)) * 180 - 10;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />
                  
                  {/* Data points */}
                  {event.priceHistory.map((point, index) => {
                    const x = (index / (event.priceHistory.length - 1)) * 600;
                    const maxPrice = Math.max(...event.priceHistory.map(p => p.avgPrice));
                    const minPrice = Math.min(...event.priceHistory.map(p => p.avgPrice));
                    const y = 200 - ((point.avgPrice - minPrice) / (maxPrice - minPrice)) * 180 - 10;
                    return (
                      <circle key={index} cx={x} cy={y} r="5" fill="#9333ea" />
                    );
                  })}
                </svg>
                {/* X-axis labels */}
                <div className="flex justify-between mt-4 text-xs text-gray-600">
                  {event.priceHistory.map((point, index) => (
                    <span key={index}>{point.date}</span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4 text-center">
                Average price trend based on all ticket categories
              </p>
            </div>

            {/* Active Sellers */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-purple-600" />
                Active Sellers ({totalSellers})
              </h2>
              <div className="space-y-4">
                {event.sellers.map((seller) => (
                  <div key={seller.id} className="border border-gray-200 rounded-xl p-6 hover:border-purple-300 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {seller.name.substring(0, 2)}
                        </div>
                        <div>
                          <p className="font-bold text-lg text-gray-900">{seller.name}</p>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="font-medium">{seller.rating}</span>
                            </div>
                            <span>•</span>
                            <span>{seller.sales} sales</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Lowest price</p>
                        <p className="text-2xl font-bold text-purple-600">${seller.lowestPrice}</p>
                        <p className="text-xs text-gray-600 mt-1">{seller.ticketsListed} tickets listed</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Payment Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Selected: {selectedTicket.type}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-sm text-gray-500 line-through">${selectedTicket.originalPrice}</p>
                  <p className="text-4xl font-bold text-purple-600">${selectedTicket.price}</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">{selectedTicket.available} tickets available from {selectedTicket.totalListings} sellers</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <button className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold text-lg flex items-center justify-center gap-2">
                  <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal" className="w-6 h-6" />
                  Pay with PayPal
                </button>
                <button className="w-full px-6 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-bold text-lg flex items-center justify-center gap-2">
                  <img src="https://cdn.iconscout.com/icon/free/png-256/free-coinbase-logo-icon-svg-download-png-7651204.png" alt="Coinbase" className="w-6 h-6" />
                  Pay with Coinbase
                </button>
              </div>

              <div className="border-t pt-6 space-y-4">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Buyer Protection</p>
                    <p className="text-xs">Full refund if event is cancelled</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Instant Delivery</p>
                    <p className="text-xs">Tickets sent to your email immediately</p>
                  </div>
                </div>
              </div>

              <button className="mt-6 w-full flex items-center justify-center gap-2 text-gray-600 hover:text-red-500 transition py-2 border border-gray-200 rounded-lg hover:border-red-300">
                <Heart className="w-5 h-5" />
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
