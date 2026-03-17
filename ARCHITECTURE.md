# Authieticket AI Architecture

## System Architecture

```
┌───────────────────────────────────────────────────────────────────────┐
│                          USER INTERFACE                                │
├───────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │              React Frontend (Port 3000)                        │  │
│  │                                                                 │  │
│  │  • Event Marketplace UI                                        │  │
│  │  • Ticket Browse & Search                                      │  │
│  │  • User Profile & Wallet                                       │  │
│  │                                                                 │  │
│  │  ┌──────────────────────────────────────────────────────┐     │  │
│  │  │        AI Chat Assistant Component                    │     │  │
│  │  │  ┌────────────┐  ┌────────────┐  ┌──────────────┐   │     │  │
│  │  │  │ Text Input │  │ Voice Input│  │   History    │   │     │  │
│  │  │  │  (Chat)    │  │ (Microphone)│  │   Display   │   │     │  │
│  │  │  └────────────┘  └────────────┘  └──────────────┘   │     │  │
│  │  └──────────────────────────────────────────────────────┘     │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                        │
└───────────────────────────┬────────────────────────────────────────────┘
                            │
                            │ HTTPS/REST API
                            │ JSON Payloads
                            ↓
┌───────────────────────────────────────────────────────────────────────┐
│                    CLOUDFLARE EDGE NETWORK                             │
├───────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │           Cloudflare Workers (Main API)                        │  │
│  │                  src/index.js                                   │  │
│  │                                                                 │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │  │
│  │  │ Chat Handler │  │Voice Handler │  │  Validation  │         │  │
│  │  │              │  │              │  │   Handler    │         │  │
│  │  │ /api/chat    │  │ /api/voice   │  │/api/validate │         │  │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │  │
│  │         │                 │                 │                  │  │
│  └─────────┼─────────────────┼─────────────────┼──────────────────┘  │
│            │                 │                 │                      │
│            ↓                 ↓                 ↓                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │              Cloudflare Workers AI                             │  │
│  │                                                                 │  │
│  │  ┌─────────────────────────┐    ┌──────────────────────────┐  │  │
│  │  │    Llama 3.3 70B         │    │      Whisper AI          │  │  │
│  │  │  Instruct (FP8 Fast)     │    │   (Speech-to-Text)       │  │  │
│  │  │                          │    │                          │  │  │
│  │  │  • Natural Language      │    │  • Audio Transcription   │  │  │
│  │  │  • Context Understanding │    │  • Multi-format Support  │  │  │
│  │  │  • Conversation Memory   │    │  • Real-time Processing  │  │  │
│  │  │  • Event Recommendations │    │                          │  │  │
│  │  └─────────────────────────┘    └──────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────────────┘  │
│            │                                 │                        │
│            ↓                                 ↓                        │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                  State Management Layer                         │  │
│  │                                                                 │  │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │  │
│  │  │ Durable Objects│  │  D1 Database   │  │  KV Storage    │   │  │
│  │  │                │  │                │  │                │   │  │
│  │  │ • Conversation │  │ • Tickets      │  │ • Conversation │   │  │
│  │  │   History      │  │ • Events       │  │   Cache        │   │  │
│  │  │ • User State   │  │ • Users        │  │ • Analytics    │   │  │
│  │  │ • Preferences  │  │ • Transactions │  │ • Session Data │   │  │
│  │  │ • Session Mgmt │  │ • Validation   │  │                │   │  │
│  │  │                │  │   Logs         │  │                │   │  │
│  │  │ Per-User       │  │ SQL Queries    │  │ Key-Value      │   │  │
│  │  │ Instances      │  │ Indexed        │  │ Fast Reads     │   │  │
│  │  └────────────────┘  └────────────────┘  └────────────────┘   │  │
│  └────────────────────────────────────────────────────────────────┘  │
│            │                                                           │
│            ↓                                                           │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │              Cloudflare Workflows (Optional)                   │  │
│  │                                                                 │  │
│  │  ┌─────────────────────────┐  ┌─────────────────────────────┐ │  │
│  │  │ Ticket Validation       │  │ Purchase Orchestration      │ │  │
│  │  │ Workflow                │  │ Workflow                    │ │  │
│  │  │                         │  │                             │ │  │
│  │  │ 1. Fetch Data           │  │ 1. Reserve Ticket           │ │  │
│  │  │ 2. Blockchain Check     │  │ 2. Process Payment          │ │  │
│  │  │ 3. AI Fraud Detection   │  │ 3. Transfer NFT             │ │  │
│  │  │ 4. Flag Review          │  │ 4. Update Database          │ │  │
│  │  │ 5. Update Status        │  │ 5. Distribute Royalties     │ │  │
│  │  │ 6. Send Notification    │  │ 6. Send Confirmation        │ │  │
│  │  └─────────────────────────┘  └─────────────────────────────┘ │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagrams

### Chat Conversation Flow

```
User Types Message
       ↓
Frontend Component (AIChatAssistant.js)
       ↓
POST /api/chat
       ↓
Chat Handler (chatHandler.js)
       ↓
┌──────────────┐
│ Durable      │ ← Store message + Get history
│ Object       │
│ (per user)   │
└──────────────┘
       ↓
Build context with history
       ↓
Workers AI (Llama 3.3)
       ↓
Generate response
       ↓
┌──────────────┐
│ Durable      │ ← Store AI response
│ Object       │
└──────────────┘
       ↓
┌──────────────┐
│ KV Storage   │ ← Store for analytics (optional)
└──────────────┘
       ↓
Return JSON response
       ↓
Frontend displays message
```

### Voice Input Flow

```
User Clicks Mic → Records Audio
               ↓
            Stop Recording
               ↓
    Create Audio Blob (WebM)
               ↓
    POST /api/voice (FormData)
               ↓
    Voice Handler (voiceHandler.js)
               ↓
    Workers AI (Whisper)
               ↓
    Transcribe to Text
               ↓
    ┌────────────────────┐
    │ Forward to Chat    │
    │ Handler with text  │
    └────────────────────┘
               ↓
    Get AI Response
               ↓
    Return {transcription, response}
               ↓
    Display both in chat
```

### Ticket Validation Flow

```
Scan QR Code / Enter Ticket ID
            ↓
POST /api/validate-ticket
            ↓
Validation Handler
            ↓
┌──────────┐
│    D1    │ ← Query ticket info
│ Database │
└──────────┘
            ↓
Build analysis prompt
            ↓
Workers AI (Llama 3.3)
            ↓
Fraud Analysis
            ↓
┌──────────┐
│    D1    │ ← Log validation attempt
│ Database │
└──────────┘
            ↓
Return validation result
            ↓
Display to user
```

## Component Interaction Matrix

```
┌─────────────────┬────────┬────────┬────────┬────────┬────────┬────────┐
│                 │Frontend│Workers │Workers │Durable │   D1   │   KV   │
│                 │        │  API   │   AI   │Objects │Database│Storage │
├─────────────────┼────────┼────────┼────────┼────────┼────────┼────────┤
│ Frontend        │   -    │  REST  │   -    │   -    │   -    │   -    │
├─────────────────┼────────┼────────┼────────┼────────┼────────┼────────┤
│ Workers API     │  JSON  │   -    │  Fetch │ Fetch  │  SQL   │  Get   │
├─────────────────┼────────┼────────┼────────┼────────┼────────┼────────┤
│ Workers AI      │   -    │  Run   │   -    │   -    │   -    │   -    │
├─────────────────┼────────┼────────┼────────┼────────┼────────┼────────┤
│ Durable Objects │   -    │  Fetch │   -    │   -    │  Read  │   -    │
├─────────────────┼────────┼────────┼────────┼────────┼────────┼────────┤
│ D1 Database     │   -    │  Query │   -    │  Query │   -    │   -    │
├─────────────────┼────────┼────────┼────────┼────────┼────────┼────────┤
│ KV Storage      │   -    │Get/Put │   -    │   -    │   -    │   -    │
└─────────────────┴────────┴────────┴────────┴────────┴────────┴────────┘
```

## Technology Stack Summary

### Frontend Layer
- **Framework**: React 19.2
- **Routing**: React Router 6.14
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Build Tool**: Create React App

### Backend Layer (Cloudflare)
- **Runtime**: Cloudflare Workers (V8 Isolates)
- **AI Models**: Llama 3.3 70B, Whisper
- **State**: Durable Objects
- **Database**: D1 (SQLite)
- **Cache**: Workers KV
- **Orchestration**: Workflows

### Communication
- **Protocol**: HTTPS/REST
- **Format**: JSON
- **CORS**: Configured for cross-origin

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Production Deployment                     │
└─────────────────────────────────────────────────────────────┘

Frontend Deployment                Backend Deployment
┌────────────────┐                ┌────────────────────┐
│  Vercel/       │                │  Cloudflare        │
│  Netlify/      │───HTTPS API───▶│  Workers           │
│  CF Pages      │    Calls       │                    │
│                │                │  • Global Edge     │
│ • CDN Cached   │                │  • Auto-scaling    │
│ • SSL/TLS      │                │  • DDoS Protection │
│ • Geo-routing  │                │  • Analytics       │
└────────────────┘                └────────────────────┘
        │                                  │
        │                                  │
        ↓                                  ↓
┌────────────────┐                ┌────────────────────┐
│  DNS Provider  │                │  Cloudflare        │
│                │                │  Dashboard         │
│ • Custom Domain│                │                    │
│ • SSL Cert     │                │ • Monitoring       │
│ • CDN          │                │ • Logs             │
└────────────────┘                │ • Analytics        │
                                  └────────────────────┘
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Security Layers                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Cloudflare DDoS Protection                              │
│     • Automatic threat detection                            │
│     • Rate limiting                                         │
│     • Bot management                                        │
│                                                              │
│  2. HTTPS/TLS Encryption                                    │
│     • End-to-end encryption                                 │
│     • Certificate management                                │
│                                                              │
│  3. CORS Configuration                                      │
│     • Allowed origins                                       │
│     • Method restrictions                                   │
│                                                              │
│  4. Input Validation                                        │
│     • Request sanitization                                  │
│     • Type checking                                         │
│     • Size limits                                           │
│                                                              │
│  5. SQL Injection Prevention                                │
│     • Parameterized queries                                 │
│     • Prepared statements                                   │
│                                                              │
│  6. XSS Protection                                          │
│     • Content Security Policy                               │
│     • Output encoding                                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Scalability Model

```
Traffic Load          Workers AI      Durable Objects    D1 Database
─────────────────────────────────────────────────────────────────────
Low (0-1k req/day)   Free tier       Free tier          Free tier
                     <10k neurons    <100k req          <100k reads

Medium (1k-100k)     $5-20/mo        $10-50/mo          $5-20/mo
                     AI credits      DO requests        Read/write

High (100k-1M)       $50-200/mo      $100-300/mo        $50-150/mo
                     Scaled AI       Scaled DO          Scaled D1

Enterprise (1M+)     $500+/mo        $500+/mo           $200+/mo
                     Volume pricing  Volume pricing     Volume pricing
```

## Monitoring Points

```
┌──────────────────┐
│  User Action     │
└────────┬─────────┘
         │
         ↓
┌──────────────────┐    Log: Request received
│  Workers API     │    Metrics: Latency, Status
└────────┬─────────┘
         │
         ↓
┌──────────────────┐    Log: AI request sent
│  Workers AI      │    Metrics: Tokens, Response Time
└────────┬─────────┘
         │
         ↓
┌──────────────────┐    Log: State read/write
│ Durable Objects  │    Metrics: Instance count, Memory
└────────┬─────────┘
         │
         ↓
┌──────────────────┐    Log: Query executed
│  D1 Database     │    Metrics: Query time, Rows
└────────┬─────────┘
         │
         ↓
┌──────────────────┐    Log: Response sent
│  Response        │    Metrics: Total time, Size
└──────────────────┘
```

## Latency Budget

```
Component              Target Latency    Max Latency
──────────────────────────────────────────────────────
Workers API Routing    < 5ms             < 20ms
Durable Object Fetch   < 10ms            < 50ms
D1 Database Query      < 10ms            < 100ms
KV Read                < 5ms             < 50ms
Workers AI (LLM)       1-3 seconds       5 seconds
Workers AI (Whisper)   500ms-1s          3 seconds
Total Request          2-4 seconds       8 seconds
```

---

This architecture provides:
- ✅ Global edge deployment
- ✅ Sub-50ms base latency
- ✅ Auto-scaling to millions of requests
- ✅ 99.9%+ uptime
- ✅ DDoS protection
- ✅ Built-in monitoring
- ✅ Cost-effective scaling
