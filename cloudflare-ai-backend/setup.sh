#!/bin/bash

# Quick Start Script for Authieticket AI Backend
# This script guides you through the initial setup

echo "🚀 Authieticket AI Backend Setup"
echo "================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${YELLOW}Checking prerequisites...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js installed: $NODE_VERSION${NC}"
else
    echo -e "${RED}❌ Node.js not found. Please install Node.js 18+ from https://nodejs.org${NC}"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✅ npm installed: v$NPM_VERSION${NC}"
else
    echo -e "${RED}❌ npm not found.${NC}"
    exit 1
fi

# Check if wrangler is installed
echo ""
echo -e "${YELLOW}Checking Wrangler CLI...${NC}"
if command -v wrangler &> /dev/null; then
    WRANGLER_VERSION=$(wrangler --version)
    echo -e "${GREEN}✅ Wrangler installed: $WRANGLER_VERSION${NC}"
else
    echo -e "${YELLOW}⚠️  Wrangler not found. Installing...${NC}"
    npm install -g wrangler
    echo -e "${GREEN}✅ Wrangler installed${NC}"
fi

# Install dependencies
echo ""
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Check Cloudflare authentication
echo ""
echo -e "${YELLOW}Checking Cloudflare authentication...${NC}"
WHOAMI=$(wrangler whoami 2>&1)
if [[ $WHOAMI == *"not authenticated"* ]]; then
    echo -e "${YELLOW}⚠️  Not authenticated with Cloudflare${NC}"
    echo -e "${CYAN}Please log in to Cloudflare...${NC}"
    wrangler login
else
    echo -e "${GREEN}✅ Authenticated with Cloudflare${NC}"
fi

# Setup guide
echo ""
echo -e "${CYAN}📋 Next Steps:${NC}"
echo "================================="
echo ""
echo -e "${NC}1. Create KV Namespace:${NC}"
echo -e "   ${YELLOW}wrangler kv:namespace create CONVERSATIONS${NC}"
echo -e "   ${YELLOW}wrangler kv:namespace create CONVERSATIONS --preview${NC}"
echo ""
echo -e "${NC}2. Create D1 Database:${NC}"
echo -e "   ${YELLOW}wrangler d1 create authieticket_db${NC}"
echo ""
echo -e "${NC}3. Update wrangler.toml with the IDs from steps 1-2${NC}"
echo ""
echo -e "${NC}4. Run database migrations:${NC}"
echo -e "   ${YELLOW}wrangler d1 execute authieticket_db --file=./migrations/0001_initial_schema.sql${NC}"
echo ""
echo -e "${NC}5. Start development server:${NC}"
echo -e "   ${YELLOW}npm run dev${NC}"
echo ""
echo -e "${NC}6. Test the API:${NC}"
echo -e "   ${YELLOW}Open http://localhost:8787/api/health in your browser${NC}"
echo ""
echo -e "${CYAN}📚 Full documentation: README.md${NC}"
echo -e "${CYAN}🚀 Deployment guide: ../DEPLOYMENT.md${NC}"
echo ""

# Ask if user wants to create resources now
echo -e "${YELLOW}Would you like to create KV namespace and D1 database now? (y/N)${NC}"
read -r response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo ""
    echo -e "${YELLOW}Creating KV namespace...${NC}"
    wrangler kv:namespace create CONVERSATIONS
    
    echo ""
    echo -e "${YELLOW}Creating preview KV namespace...${NC}"
    wrangler kv:namespace create CONVERSATIONS --preview
    
    echo ""
    echo -e "${YELLOW}Creating D1 database...${NC}"
    wrangler d1 create authieticket_db
    
    echo ""
    echo -e "${GREEN}✅ Resources created!${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  IMPORTANT: Copy the IDs above and update wrangler.toml${NC}"
    echo ""
    echo -e "${CYAN}After updating wrangler.toml, run:${NC}"
    echo -e "${YELLOW}wrangler d1 execute authieticket_db --file=./migrations/0001_initial_schema.sql${NC}"
    echo -e "${YELLOW}npm run dev${NC}"
else
    echo ""
    echo -e "${GREEN}👍 No problem! Follow the manual steps above when ready.${NC}"
fi

echo ""
echo -e "${GREEN}Setup complete! Happy coding! 🎉${NC}"
