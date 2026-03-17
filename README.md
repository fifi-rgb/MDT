# Authieticket

A decentralized ticket marketplace supporting both traditional and NFT-based tickets, with AI-powered assistance built on Cloudflare's edge infrastructure.

## Overview

Authieticket is a hybrid ticket marketplace that addresses fraud and price manipulation in secondary ticket sales through blockchain verification and AI-powered validation. The platform supports both traditional ticketing systems and NFT-based tickets, with built-in royalty distribution for event organizers.

## Architecture

The application consists of three main components:

### Frontend
React-based single-page application with responsive UI, real-time search, and integrated AI chat assistant.

### Backend (Cloudflare Workers)
Edge-deployed serverless functions handling API requests, AI model inference, and business logic.

### AI Components
- **LLM**: Llama 3.3 70B Instruct for natural language processing
- **Speech Recognition**: Whisper AI for voice input transcription
- **State Management**: Durable Objects for conversation persistence
- **Data Layer**: D1 SQL database and KV storage

## Features

### Marketplace Functionality
- Dual support for traditional and blockchain-based tickets
- Real-time event search and filtering
- Seller reputation system
- Price validation and fraud detection
- Automated royalty distribution

### AI Integration
- Conversational interface for ticket queries and event discovery
- Voice input support with automatic transcription
- Context-aware responses using conversation history
- Ticket authenticity verification using AI analysis
- Multi-step workflow orchestration for complex operations

## Project Structure

```
MDT/
├── authieticket-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── AIChatAssistant.js    # Chat interface component
│   │   ├── App.js                     # Main application
│   │   ├── TicketDetail.js
│   │   ├── SellTicket.js
│   │   └── data/featuredEvents.js
│   └── package.json
│
├── cloudflare-ai-backend/
│   ├── src/
│   │   ├── index.js                   # Workers entry point
│   │   ├── handlers/
│   │   │   ├── chatHandler.js         # LLM chat implementation
│   │   │   ├── voiceHandler.js        # Speech-to-text processing
│   │   │   └── validationHandler.js   # Ticket validation logic
│   │   ├── durableObjects/
│   │   │   └── TicketAssistant.js     # Stateful conversation manager
│   │   └── workflows/
│   │       └── ticketWorkflows.js     # Multi-step orchestration
│   ├── migrations/
│   │   └── 0001_initial_schema.sql    # Database schema
│   ├── wrangler.toml                  # Cloudflare configuration
│   └── package.json
│
├── Smart_contract/                     # Smart contract documentation
└── Diagram_flow/                       # Architecture diagrams
```

## Technology Stack

### Frontend
- React 19.2
- React Router 6.14
- Tailwind CSS 3.4
- Lucide React (icons)

### Backend Infrastructure
- Cloudflare Workers (serverless edge runtime)
- Workers AI (Llama 3.3 70B, Whisper)
- Durable Objects (distributed state coordination)
- D1 Database (SQLite at the edge)
- Workers KV (distributed key-value storage)

## Installation

### Prerequisites
- Node.js 18+ (Node.js 20+ recommended for latest Wrangler)
- npm or yarn
- Cloudflare account

### Backend Setup

```bash
cd cloudflare-ai-backend
npm install

# Authenticate with Cloudflare
npx wrangler login

# Create KV namespace for conversation storage
npx wrangler kv namespace create CONVERSATIONS
npx wrangler kv namespace create CONVERSATIONS --preview

# Create D1 database
npx wrangler d1 create authieticket_db
```

Update `wrangler.toml` with the generated IDs from the above commands.

```bash
# Initialize database schema
npx wrangler d1 execute authieticket_db --file=./migrations/0001_initial_schema.sql

# Start development server
npm run dev
```

The backend API will be available at `http://localhost:8787`.

### Frontend Setup

```bash
cd authieticket-frontend
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local and set REACT_APP_AI_API_ENDPOINT=http://localhost:8787

npm start
```

The frontend will be available at `http://localhost:3000`.

## Configuration

### Backend Configuration

Key settings in `wrangler.toml`:

```toml
[ai]
binding = "AI"                        # Workers AI binding

[[kv_namespaces]]
binding = "CONVERSATIONS"              # Conversation storage
id = "<your-kv-id>"
preview_id = "<your-preview-id>"

[[d1_databases]]
binding = "DB"                         # Ticket database
database_id = "<your-database-id>"

[[durable_objects.bindings]]
name = "TICKET_ASSISTANT"              # Conversation state manager
class_name = "TicketAssistant"
```

### Frontend Configuration

Environment variables in `.env.local`:

```bash
REACT_APP_AI_API_ENDPOINT=http://localhost:8787
```

For production, update to your deployed Workers URL.
## API Reference

### Chat Endpoint

**POST** `/api/chat`

Request body:
```json
{
  "message": "string (required)",
  "userId": "string (required)",
  "context": {
    "page": "string (optional)"
  }
}
```

Response:
```json
{
  "response": "string",
  "sessionId": "string",
  "timestamp": "ISO 8601 string",
  "model": "llama-3.3-70b"
}
```

### Voice Input Endpoint

**POST** `/api/voice`

Request: multipart/form-data
- `audio`: File (webm, mp3, wav)
- `userId`: string

Response:
```json
{
  "transcription": "string",
  "response": "string",
  "sessionId": "string",
  "timestamp": "ISO 8601 string",
  "inputType": "voice"
}
```

### Ticket Validation Endpoint

**POST** `/api/validate-ticket`

Request body:
```json
{
  "ticketId": "string (required)",
  "walletAddress": "string (required)",
  "eventId": "string (optional)"
}
```

Response:
```json
{
  "valid": "boolean",
  "ticket": "object",
  "analysis": {
    "isValid": "boolean",
    "confidence": "number (0-100)",
    "concerns": "array",
    "recommendation": "string"
  },
  "timestamp": "ISO 8601 string"
}
```

### Health Check Endpoint

**GET** `/api/health`

Response:
```json
{
  "status": "healthy",
  "timestamp": "ISO 8601 string",
  "services": {
    "ai": "operational",
    "durableObjects": "operational",
    "workflows": "operational"
  }
}
```

## Deployment

### Backend Deployment

```bash
cd cloudflare-ai-backend
npm run deploy
```

The deployment will output a Workers URL. Update your frontend environment variables with this URL.

### Frontend Deployment

#### Option 1: Vercel
```bash
cd authieticket-frontend
vercel --prod
```

#### Option 2: Cloudflare Pages
```bash
npm run build
npx wrangler pages deploy build --project-name=authieticket-frontend
```

#### Option 3: Netlify
```bash
netlify deploy --prod
```

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Database Schema

The D1 database includes the following tables:

- `tickets` - Ticket listings and metadata
- `events` - Event information and details
- `validation_logs` - Ticket validation history
- `transactions` - Purchase and transfer records
- `user_preferences` - User settings and preferences
- `chat_sessions` - Conversation analytics

Full schema available in `cloudflare-ai-backend/migrations/0001_initial_schema.sql`.

## Performance

Expected latency metrics:

- Workers API routing: <5ms
- Durable Object operations: <10ms
- D1 database queries: <10ms
- KV read operations: <5ms
- AI inference (Llama 3.3): 1-3 seconds
- Speech transcription (Whisper): 500ms-1s

Total end-to-end request time for chat: 2-4 seconds.

## Cost Analysis

Cloudflare free tier includes:
- 100,000 Workers requests per day
- 10,000 Workers AI neurons per day
- 100,000 Durable Objects requests per day
- 100,000 KV read operations per day
- 5 D1 databases with 5GB storage each

Estimated costs beyond free tier scale approximately at:
- $0.15 per million requests (Workers)
- $0.011 per 1,000 neurons (Workers AI)
- $0.15 per million requests (Durable Objects)

## Documentation

- [Backend API Documentation](cloudflare-ai-backend/README.md)
- [Deployment Guide](DEPLOYMENT.md)
- [AI Enhancement Summary](AI_ENHANCEMENT_SUMMARY.md)
- [Architecture Overview](ARCHITECTURE.md)

## Development

### Running Tests

```bash
# Backend tests
cd cloudflare-ai-backend
npm test

# Frontend tests
cd authieticket-frontend
npm test
```

### Monitoring

View real-time logs during development:

```bash
cd cloudflare-ai-backend
npx wrangler tail
```

Monitor production deployments through the Cloudflare dashboard under Workers & Pages.

## Security

- CORS configured for cross-origin requests
- SQL parameterization to prevent injection attacks
- Input validation on all endpoints
- Rate limiting via Cloudflare
- HTTPS enforcement in production

## License

MIT License

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## References

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Workers AI Documentation](https://developers.cloudflare.com/workers-ai/)
- [Durable Objects Documentation](https://developers.cloudflare.com/durable-objects/)
- [D1 Database Documentation](https://developers.cloudflare.com/d1/)

