# Deployment Guide - Authieticket AI Platform

Complete step-by-step guide to deploy your AI-powered ticket marketplace.

## Prerequisites Checklist

- [ ] Cloudflare account (sign up at https://dash.cloudflare.com/sign-up)
- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/Command prompt access

## Phase 1: Cloudflare Account Setup

### Step 1: Create Cloudflare Account
1. Go to https://dash.cloudflare.com/sign-up
2. Sign up with email (free tier is sufficient)
3. Verify your email address
4. Complete the onboarding

### Step 2: Enable Workers AI
1. Go to Cloudflare Dashboard
2. Navigate to **Workers & Pages** → **AI**
3. Enable Workers AI (it's included in the free tier)
4. Accept the terms of service

## Phase 2: Backend Deployment

### Step 1: Install Wrangler CLI

```bash
npm install -g wrangler
```

Verify installation:
```bash
wrangler --version
```

### Step 2: Authenticate

```bash
wrangler login
```

This will open a browser window. Click "Allow" to grant access.

### Step 3: Navigate to Backend Directory

```bash
cd MDT/cloudflare-ai-backend
npm install
```

### Step 4: Create KV Namespace

```bash
wrangler kv:namespace create CONVERSATIONS
```

Output example:
```
✨ Success!
Add the following to your wrangler.toml:
[[kv_namespaces]]
binding = "CONVERSATIONS"
id = "abc123xyz789"
```

Save this ID! Now create the preview namespace:

```bash
wrangler kv:namespace create CONVERSATIONS --preview
```

Save the preview ID as well.

### Step 5: Create D1 Database

```bash
wrangler d1 create authieticket_db
```

Output example:
```
✅ Successfully created DB 'authieticket_db'
database_id = "def456uvw123"
```

Save this database ID!

### Step 6: Update wrangler.toml

Open `cloudflare-ai-backend/wrangler.toml` and update with your IDs:

```toml
name = "authieticket-ai-backend"
main = "src/index.js"
compatibility_date = "2024-01-01"

[ai]
binding = "AI"

[[kv_namespaces]]
binding = "CONVERSATIONS"
id = "abc123xyz789"  # ← Replace with your KV namespace ID
preview_id = "xyz789abc123"  # ← Replace with your preview KV ID

[[durable_objects.bindings]]
name = "TICKET_ASSISTANT"
class_name = "TicketAssistant"
script_name = "authieticket-ai-backend"

[[migrations]]
tag = "v1"
new_classes = ["TicketAssistant"]

[[d1_databases]]
binding = "DB"
database_name = "authieticket_db"
database_id = "def456uvw123"  # ← Replace with your D1 database ID

[vars]
ENVIRONMENT = "production"
```

### Step 7: Run Database Migrations

```bash
wrangler d1 execute authieticket_db --file=./migrations/0001_initial_schema.sql
```

Verify success:
```bash
wrangler d1 execute authieticket_db --command="SELECT * FROM events"
```

You should see the 3 sample events.

### Step 8: Test Locally (Optional but Recommended)

```bash
npm run dev
```

Open a new terminal and test:

```bash
# Test health endpoint
curl http://localhost:8787/api/health

# Test chat endpoint
curl -X POST http://localhost:8787/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Tell me about NFT tickets","userId":"test_user_123"}'
```

If both work, you're ready to deploy!

### Step 9: Deploy to Production

```bash
npm run deploy
```

Output will show your deployed URL:
```
✨ Deployed authieticket-ai-backend
   https://authieticket-ai-backend.your-subdomain.workers.dev
```

**Save this URL!** You'll need it for the frontend.

### Step 10: Test Production Deployment

```bash
# Test health
curl https://authieticket-ai-backend.your-subdomain.workers.dev/api/health

# Test chat
curl -X POST https://authieticket-ai-backend.your-subdomain.workers.dev/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello","userId":"test_123"}'
```

## Phase 3: Frontend Deployment

### Option A: Deploy to Vercel (Recommended)

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Navigate to Frontend

```bash
cd ../authieticket-frontend
```

#### Step 3: Create Production Environment File

Create `.env.production`:

```bash
REACT_APP_AI_API_ENDPOINT=https://authieticket-ai-backend.your-subdomain.workers.dev
```

Replace with your actual Workers URL from Phase 2, Step 9.

#### Step 4: Login to Vercel

```bash
vercel login
```

#### Step 5: Deploy

```bash
vercel --prod
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **authieticket-frontend**
- Directory? **.**
- Override settings? **N**

Your app will be deployed to `https://authieticket-frontend.vercel.app`

#### Step 6: Configure Environment Variables in Vercel

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - Key: `REACT_APP_AI_API_ENDPOINT`
   - Value: `https://authieticket-ai-backend.your-subdomain.workers.dev`
5. Click **Save**
6. Redeploy: `vercel --prod`

### Option B: Deploy to Cloudflare Pages

#### Step 1: Build the Frontend

```bash
cd authieticket-frontend
npm run build
```

#### Step 2: Deploy to Pages

```bash
wrangler pages deploy build --project-name=authieticket-frontend
```

#### Step 3: Set Environment Variables

```bash
wrangler pages deployment create authieticket-frontend \
  --env-variable REACT_APP_AI_API_ENDPOINT=https://your-worker.workers.dev
```

### Option C: Deploy to Netlify

#### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

#### Step 2: Login

```bash
netlify login
```

#### Step 3: Deploy

```bash
cd authieticket-frontend
netlify deploy --prod
```

When prompted:
- Create & configure new site? **Y**
- Team? Select your team
- Site name? **authieticket-frontend**
- Publish directory? **build**

#### Step 4: Set Environment Variables

```bash
netlify env:set REACT_APP_AI_API_ENDPOINT "https://your-worker.workers.dev"
```

## Phase 4: Testing & Verification

### Test the Complete System

1. Visit your deployed frontend URL
2. Click the purple chat button (bottom-right)
3. Try these test queries:
   - "Tell me about NFT tickets"
   - "Show me upcoming concerts"
   - "How does ticket verification work?"
4. Test voice input (click microphone icon)
5. Test ticket browsing and search

### Verify Backend Logs

```bash
cd cloudflare-ai-backend
wrangler tail
```

Keep this running and interact with your app to see real-time logs.

## Phase 5: Custom Domain (Optional)

### For Backend (Cloudflare Workers)

1. Go to Cloudflare Dashboard
2. Navigate to **Workers & Pages**
3. Select your worker
4. Go to **Settings** → **Triggers**
5. Add custom domain:
   - E.g., `api.yourdomain.com`
6. Update frontend environment variable with new URL

### For Frontend (Vercel/Netlify/Pages)

#### Vercel:
1. Go to project settings
2. Navigate to **Domains**
3. Add your domain
4. Update DNS records as instructed

#### Cloudflare Pages:
1. Go to Workers & Pages
2. Select your Pages project
3. Go to **Custom domains**
4. Add your domain (automatic if domain is on Cloudflare)

## Phase 6: Monitoring & Maintenance

### Cloudflare Dashboard Monitoring

1. **Workers Analytics**
   - Requests per second
   - Success rate
   - CPU time
   - Errors

2. **AI Usage**
   - Model requests
   - Token consumption
   - Cost tracking

3. **D1 Metrics**
   - Query count
   - Query duration
   - Storage usage

4. **Durable Objects**
   - Active instances
   - Request count
   - Memory usage

### Set Up Alerts (Recommended)

1. Go to Cloudflare Dashboard
2. Navigate to **Notifications**
3. Create alerts for:
   - Error rate > 5%
   - AI requests approaching limit
   - Database storage > 80%

### View Real-time Logs

```bash
# Backend logs
cd cloudflare-ai-backend
wrangler tail

# Filter by status
wrangler tail --status error

# Filter by search term
wrangler tail --search "ticket"
```

## Troubleshooting

### Issue: "AI binding not found"

**Solution:**
- Ensure Workers AI is enabled in your Cloudflare account
- Check `[ai]` binding in `wrangler.toml`
- Verify you're on a plan that includes Workers AI

### Issue: "Database not found"

**Solution:**
```bash
# List your databases
wrangler d1 list

# Verify migrations
wrangler d1 execute authieticket_db --command="SELECT name FROM sqlite_master WHERE type='table'"
```

### Issue: "Durable Object not found"

**Solution:**
- Ensure migrations are in `wrangler.toml`
- Redeploy: `wrangler deploy`
- Check exports in `src/index.js`

### Issue: "CORS errors in browser"

**Solution:**
- Verify CORS headers in `src/index.js`
- Check frontend is using correct API URL
- Clear browser cache

### Issue: "KV namespace not found"

**Solution:**
```bash
# List KV namespaces
wrangler kv:namespace list

# Verify IDs in wrangler.toml match
```

## Cost Monitoring

### Check Current Usage

```bash
wrangler whoami
```

Then go to:
- Cloudflare Dashboard → **Workers & Pages** → **Plans**
- View current usage vs limits

### Free Tier Limits (as of 2024)

- Workers: 100k requests/day
- Workers AI: 10k neurons/day (equivalent to ~10M tokens)
- Durable Objects: 100k requests/day
- KV: 100k reads/day, 1k writes/day
- D1: 5 databases, 5GB each, 100k reads/day

### Upgrade Triggers

Consider upgrading when:
- Consistently hitting rate limits
- Need faster AI responses (higher tier models)
- Require more storage
- Want analytics and advanced features

## Next Steps

1. **Customize AI Prompts** - Edit system prompts in `chatHandler.js`
2. **Add More Events** - Insert into D1 database
3. **Integrate Blockchain** - Connect to actual NFT smart contracts
4. **Add Authentication** - Implement user login system
5. **Set Up Analytics** - Google Analytics, Mixpanel, etc.
6. **SEO Optimization** - Meta tags, sitemaps, robots.txt
7. **Performance Monitoring** - Set up Sentry or similar

## Support Resources

- **Cloudflare Discord**: https://discord.gg/cloudflaredev
- **Workers Documentation**: https://developers.cloudflare.com/workers/
- **Workers AI Docs**: https://developers.cloudflare.com/workers-ai/
- **GitHub Issues**: Create issues in your repository

## Security Checklist

- [ ] Update CORS settings for production domains
- [ ] Enable rate limiting in Cloudflare
- [ ] Set up Cloudflare Access for admin endpoints
- [ ] Review and update environment variables
- [ ] Enable HTTPS everywhere
- [ ] Set up monitoring and alerts
- [ ] Regular security audits

---

**Congratulations! Your AI-powered ticket marketplace is now live! 🎉**
