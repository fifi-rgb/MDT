# Encore - AI Coding Instructions

## Project Overview

**Encore** is a hybrid event ticketing marketplace supporting both traditional tickets (via API partnerships) and NFT-based blockchain tickets. The platform bridges the gap between established ticketing systems and next-generation decentralized commerce.

**Current Focus**: React frontend (`authieticket-frontend/`) - a modern marketplace UI for browsing and purchasing event tickets.

## Architecture: Hybrid Dual-Path Strategy

The project operates on two parallel paths:

### Path A: Traditional Tickets (API-First)
- Integrates with existing platforms (Ticketmaster, StubHub, Eventbrite)
- Sellers list via platform APIs with ticket verification
- Payment via Stripe with escrow protection
- Immediate market access, established user trust
- Platform takes 5% fee, seller gets 95%

### Path B: NFT Tickets (Smart Contract-Based)
- Event organizers mint tickets as blockchain NFTs
- Smart contracts enforce price limits (max 110% markup)
- Automatic payment splits: 5% platform, 2% organizer royalty, 93% seller
- Atomic transactions eliminate escrow delays
- Unlimited resales with perpetual organizer royalties
- Full transparency via public blockchain

**Strategic Rollout**: Traditional tickets (Year 1) → NFT option (Year 2) → Blockchain-first (Year 3+)

## Frontend Architecture

### Tech Stack
- **React 19** (CRA-based)
- **Tailwind CSS** (with postcss/autoprefixer)
- **Lucide React** icons
- **React Testing Library**

### Key Component: `src/App.js`
This is the main marketplace component containing:
- **Header** with wallet connection button (responsive mobile menu)
- **Hero section** with search functionality and trust badges
- **Category filtering** (Music, Sports, Theater, Conference, Comedy)
- **Event grid** (cards showing price, seller rating, event details)
- **Modal detail view** for ticket purchases
- **How It Works** educational section
- **Stats/footer** sections

### UI/UX Patterns
1. **Hybrid ticket badges**: Blue ("Traditional"), Purple ("NFT")
2. **Gradient backgrounds**: Used throughout for visual hierarchy
3. **Seller trust indicators**: Avatar, rating stars, profile links
4. **Price display**: Original strikethrough + discounted highlight
5. **Responsive design**: Mobile-first with breakpoints at `sm` (640px) and `md` (768px)

### Component State Management
- **`isMenuOpen`**: Mobile navigation toggle
- **`activeTab`**: Category filter state
- **`selectedTicket`**: Modal open/close with event detail
- Uses inline state objects for mock event data (6 featured events)

## Critical Patterns & Conventions

### 1. Event Data Structure
```javascript
{
  id: 1,
  name: "Event Title",
  image: "linear-gradient(...)", // CSS gradient, not actual image URL
  date: "Jul 15, 2025",
  time: "6:00 PM",
  venue: "Location String",
  price: 89.99,
  originalPrice: 99.99,
  type: "NFT" | "Traditional", // Critical for badge rendering
  seller: "0x742d..." | "ticketmaster", // Wallet address or brand name
  rating: 4.8,
  category: "Music" | "Sports" | "Theater" | "Conference" | "Comedy"
}
```

### 2. Tailwind Conventions
- Color scheme: Purple-600 (primary), Blue-600 (secondary), Gray gradients (neutral)
- Spacing: Consistent `gap-`, `p-`, `m-` scales
- Responsive classes: Hidden on mobile `hidden md:flex`, show on mobile `block md:hidden`
- Gradients: `bg-gradient-to-r`, `bg-gradient-to-br` for visual depth

### 3. Icon Usage
- **lucide-react** icons used throughout: `<Ticket />`, `<Wallet />`, `<Shield />`, etc.
- Icons sized: `w-4 h-4` (small), `w-5 h-5` (medium), `w-6 h-6` (large)
- Always paired with text labels for accessibility

### 4. Modal Pattern
- Click event card → `setSelectedTicket(event)`
- Modal backdrop: `fixed inset-0 bg-black bg-opacity-50`
- Click outside modal closes: `onClick={() => setSelectedTicket(null)}`
- Stop propagation on modal content: `onClick={(e) => e.stopPropagation()}`

### 5. Array Filtering
```javascript
const filteredEvents = activeTab === 'all' 
  ? featuredEvents 
  : featuredEvents.filter(e => e.category.toLowerCase() === activeTab);
```
- Converts category to lowercase for consistent comparison

## Development Workflow

### Running the App
```bash
cd authieticket-frontend
npm start           # Dev server at localhost:3000 (hot reload)
npm test            # Jest with React Testing Library
npm run build       # Production optimized build
```

### Testing Convention
- Test files: `*.test.js` (e.g., `App.test.js`)
- Uses `@testing-library/react` and `@testing-library/jest-dom`
- Setup in `setupTests.js` (React StrictMode enabled)

## Key Integration Points

### Wallet Connection
- Button: `<Wallet className="w-5 h-5" /> Connect Wallet`
- Currently non-functional (placeholder for Web3 integration)
- Expected to connect to blockchain for Path B (NFT) transactions

### Search Functionality
- Input placeholder: "Search events, artists, venues..."
- Currently unstyled/non-functional in base App.js
- Should filter events by name/venue/artist when implemented

### External Dependencies to Watch
- **lucide-react** versions: Icons must match package.json (^0.552.0)
- **React 19** breaking changes: No PropTypes, function components only
- **Tailwind** config: Scanned at build time, must restart dev server when editing config

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Icons not displaying | Missing import from lucide-react | Verify import statement at top of component |
| Styling not applied | Tailwind purge missing classes | Ensure `tailwind.config.js` includes correct content paths |
| Mobile menu unresponsive | `md:` breakpoint logic inverted | Check classes use `hidden md:flex` (hide on mobile, show on desktop) |
| Modal not closing | Missing propagation stop on inner click | Add `onClick={(e) => e.stopPropagation()}` to modal content |

## Files to Reference

- **Architecture**: `Diagram_flow/Hybrid_approach` (visual flow of both paths)
- **Smart contract logic**: `Smart_contract/Initial_thoughs_on_smart_contract` (payment splits, royalties)
- **Current frontend**: `authieticket-frontend/src/App.js` (main UI reference)
- **Styling setup**: `authieticket-frontend/tailwind.config.js`, `src/index.css`

## Next Steps for New Features

1. **Search implementation**: Filter `featuredEvents` on input change
2. **Wallet integration**: Connect to Web3 library, call `listenerTicket()` or `buyTicket()` contracts
3. **Backend API**: Fetch real events from database instead of mock data
4. **User authentication**: Add login/profile management
5. **NFT display**: Fetch actual token metadata from blockchain
6. **Payment processing**: Integrate Stripe for traditional, crypto gateway for NFT path

---

**Last Updated**: November 2025 | **Branch**: dev | **Current Status**: Marketplace UI prototype
