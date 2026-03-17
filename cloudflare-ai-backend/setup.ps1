# Quick Start Script for Authieticket AI Backend
# This script guides you through the initial setup

Write-Host "🚀 Authieticket AI Backend Setup" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check npm
try {
    $npmVersion = npm --version
    Write-Host "✅ npm installed: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found." -ForegroundColor Red
    exit 1
}

# Check if wrangler is installed
Write-Host ""
Write-Host "Checking Wrangler CLI..." -ForegroundColor Yellow
try {
    $wranglerVersion = wrangler --version
    Write-Host "✅ Wrangler installed: $wranglerVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Wrangler not found. Installing..." -ForegroundColor Yellow
    npm install -g wrangler
    Write-Host "✅ Wrangler installed" -ForegroundColor Green
}

# Install dependencies
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install
Write-Host "✅ Dependencies installed" -ForegroundColor Green

# Check Cloudflare authentication
Write-Host ""
Write-Host "Checking Cloudflare authentication..." -ForegroundColor Yellow
$whoami = wrangler whoami 2>&1
if ($whoami -match "not authenticated") {
    Write-Host "⚠️  Not authenticated with Cloudflare" -ForegroundColor Yellow
    Write-Host "Please log in to Cloudflare..." -ForegroundColor Cyan
    wrangler login
} else {
    Write-Host "✅ Authenticated with Cloudflare" -ForegroundColor Green
}

# Setup guide
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Create KV Namespace:" -ForegroundColor White
Write-Host "   wrangler kv:namespace create CONVERSATIONS" -ForegroundColor Gray
Write-Host "   wrangler kv:namespace create CONVERSATIONS --preview" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Create D1 Database:" -ForegroundColor White
Write-Host "   wrangler d1 create authieticket_db" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Update wrangler.toml with the IDs from steps 1-2" -ForegroundColor White
Write-Host ""
Write-Host "4. Run database migrations:" -ForegroundColor White
Write-Host "   wrangler d1 execute authieticket_db --file=./migrations/0001_initial_schema.sql" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Start development server:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "6. Test the API:" -ForegroundColor White
Write-Host "   Open http://localhost:8787/api/health in your browser" -ForegroundColor Gray
Write-Host ""
Write-Host "📚 Full documentation: README.md" -ForegroundColor Cyan
Write-Host "🚀 Deployment guide: ../DEPLOYMENT.md" -ForegroundColor Cyan
Write-Host ""

# Ask if user wants to create resources now
Write-Host "Would you like to create KV namespace and D1 database now? (Y/N)" -ForegroundColor Yellow
$response = Read-Host

if ($response -eq "Y" -or $response -eq "y") {
    Write-Host ""
    Write-Host "Creating KV namespace..." -ForegroundColor Yellow
    wrangler kv:namespace create CONVERSATIONS
    
    Write-Host ""
    Write-Host "Creating preview KV namespace..." -ForegroundColor Yellow
    wrangler kv:namespace create CONVERSATIONS --preview
    
    Write-Host ""
    Write-Host "Creating D1 database..." -ForegroundColor Yellow
    wrangler d1 create authieticket_db
    
    Write-Host ""
    Write-Host "✅ Resources created!" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: Copy the IDs above and update wrangler.toml" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "After updating wrangler.toml, run:" -ForegroundColor Cyan
    Write-Host "wrangler d1 execute authieticket_db --file=./migrations/0001_initial_schema.sql" -ForegroundColor Gray
    Write-Host "npm run dev" -ForegroundColor Gray
} else {
    Write-Host ""
    Write-Host "👍 No problem! Follow the manual steps above when ready." -ForegroundColor Green
}

Write-Host ""
Write-Host "Setup complete! Happy coding! 🎉" -ForegroundColor Green
