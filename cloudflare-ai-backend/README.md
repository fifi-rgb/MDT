# Authieticket AI Backend - Cloudflare Workers Setup

This is the AI-powered backend for the Authieticket ticket marketplace, built on Cloudflare's edge platform.

## Features

- 🤖 **Workers AI Integration**: Llama 3.3 70B for intelligent chat assistance
- 💬 **Chat Assistant**: Natural language interface for ticket queries
- 🎤 **Voice Input**: Whisper AI for voice-to-text transcription
- 🔄 **Durable Objects**: Persistent conversation state and user memory
- 🔗 **Workflows**: Orchestrated ticket validation and purchase pipelines
- 🗄️ **D1 Database**: SQL database for tickets, events, and analytics
- 🔑 **KV Storage**: Fast key-value storage for conversations

## Architecture

```
┌─────────────────────────────────────────────┐
│          Cloudflare Workers AI              │
├─────────────────────────────────────────────┤
│  Llama 3.3 70B │ Whisper │ Other Models    │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│              Workers Runtime                │
├─────────────────────────────────────────────┤
│  • Chat Handler                             │
│  • Voice Handler                            │
│  • Validation Handler                       │
└─────────────────────────────────────────────┘
      ↓           ↓              ↓
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Durable  │ │    D1    │ │    KV    │
│ Objects  │ │ Database │ │ Storage  │
└──────────┘ └──────────┘ └──────────┘
```

## Prerequisites

- Node.js 18+
- npm or yarn
- Cloudflare account (free tier works)
- Wrangler CLI

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Wrangler (if not already installed)

```bash
npm install -g wrangler
```

### 3. Authenticate with Cloudflare

```bash
wrangler login
```

### 4. Create KV Namespace

```bash
wrangler kv:namespace create CONVERSATIONS
wrangler kv:namespace create CONVERSATIONS --preview
```

Copy the IDs and update `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "CONVERSATIONS"
id = "YOUR_KV_NAMESPACE_ID"
preview_id = "YOUR_PREVIEW_KV_NAMESPACE_ID"
```

### 5. Create D1 Database

```bash
wrangler d1 create authieticket_db
```

Copy the database ID and update `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "authieticket_db"
database_id = "YOUR_D1_DATABASE_ID"
```

### 6. Run Database Migrations

```bash
wrangler d1 execute authieticket_db --file=./migrations/0001_initial_schema.sql
```

### 7. Test Locally

```bash
npm run dev
```

The API will be available at `http://localhost:8787`

### 8. Deploy to Production

```bash
npm run deploy
```

## API Endpoints

### Chat Assistant

**POST** `/api/chat`

```json
{
  "message": "Tell me about Taylor Swift concert tickets",
  "userId": "user_123",
  "context": {
    "page": "/marketplace"
  }
}
```

Response:
```json
{
  "response": "I'd be happy to help you find Taylor Swift tickets...",
  "sessionId": "do_session_id",
  "timestamp": "2025-03-17T10:00:00Z",
  "model": "llama-3.3-70b"
}
```

### Voice Input

**POST** `/api/voice`

Send multipart/form-data with:
- `audio`: Audio file (webm, mp3, wav)
- `userId`: User identifier

Response:
```json
{
  "transcription": "Show me NBA tickets",
  "response": "Here are available NBA tickets...",
  "sessionId": "do_session_id",
  "timestamp": "2025-03-17T10:00:00Z",
  "inputType": "voice"
}
```

### Ticket Validation

**POST** `/api/validate-ticket`

```json
{
  "ticketId": "ticket_123",
  "walletAddress": "0x742d...89aB",
  "eventId": "evt_001"
}
```

Response:
```json
{
  "valid": true,
  "ticket": { ... },
  "analysis": {
    "isValid": true,
    "confidence": 95,
    "concerns": [],
    "recommendation": "approve"
  },
  "timestamp": "2025-03-17T10:00:00Z"
}
```

### Health Check

**GET** `/api/health`

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-03-17T10:00:00Z",
  "services": {
    "ai": "operational",
    "durableObjects": "operational",
    "workflows": "operational"
  }
}
```

## Environment Variables

Configure in `wrangler.toml`:

```toml
[vars]
ENVIRONMENT = "production"
```

## Durable Objects

### TicketAssistant

Manages conversation state for each user:

- Stores conversation history
- Manages user preferences
- Tracks session activity
- Provides context for AI responses

Endpoints:
- `/conversation` - Add message to history
- `/history` - Get conversation history
- `/clear` - Clear conversation
- `/preferences` - Get/set user preferences

## Workflows

### TicketValidationWorkflow

Multi-step validation process:
1. Fetch ticket data
2. Verify blockchain authenticity
3. AI fraud detection
4. Flag for review (if needed)
5. Update ticket status
6. Send notification

### TicketPurchaseWorkflow

Complete purchase orchestration:
1. Reserve ticket
2. Process payment
3. Transfer NFT
4. Update database
5. Distribute royalties
6. Send confirmation

## Database Schema

See `migrations/0001_initial_schema.sql` for complete schema.

Key tables:
- `tickets` - All ticket listings
- `events` - Event information
- `validation_logs` - Validation history
- `transactions` - Purchase records
- `user_preferences` - User settings
- `chat_sessions` - Chat analytics

## Cost Estimates

Cloudflare Free Tier includes:
- 10M Workers AI requests/month
- 100k Durable Object requests/day
- 100k KV reads/day
- 1k KV writes/day
- 5 D1 databases (5GB storage)

Typical costs beyond free tier:
- Workers AI: ~$0.01 per 1k requests
- Durable Objects: $0.15 per 1M requests
- KV: $0.50 per 1M reads
- D1: $0.75 per 1M reads

## Monitoring

View logs in real-time:
```bash
wrangler tail
```

View metrics in Cloudflare Dashboard:
- Workers Analytics
- AI Model Usage
- D1 Query Performance
- Durable Objects Activity

## Security

- CORS enabled for frontend domains
- Rate limiting via Cloudflare (recommended)
- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- XSS protection

## Development Tips

1. **Local Development**: Use `wrangler dev --local` for offline development
2. **Testing**: Use `wrangler dev --remote` to test with real AI models
3. **Debugging**: Check logs with `wrangler tail` during deployment
4. **Migrations**: Always test migrations locally first

## Troubleshooting

### Workers AI Not Responding
- Check AI binding in `wrangler.toml`
- Verify account has Workers AI enabled
- Check request format matches model requirements

### Durable Object Errors
- Ensure migrations are run: `wrangler deploy`
- Check Durable Object class is exported
- Verify binding name matches

### D1 Query Failures
- Run migrations: `wrangler d1 execute`
- Check SQL syntax
- Verify database binding

## Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Workers AI Docs](https://developers.cloudflare.com/workers-ai/)
- [Durable Objects Guide](https://developers.cloudflare.com/durable-objects/)
- [D1 Database Docs](https://developers.cloudflare.com/d1/)
- [Workflows Documentation](https://developers.cloudflare.com/workflows/)

## License

MIT License - See LICENSE file for details
