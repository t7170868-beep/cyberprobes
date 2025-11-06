#!/bin/bash

# CyberProbes EC2 Deployment Script for SQLite
# This script deploys the Next.js application with SQLite database on EC2

set -e  # Exit on error

echo "🚀 Starting CyberProbes Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="cyberprobes"
APP_DIR="/home/ubuntu/cyberprobes"
NODE_VERSION="20"
PORT=3000

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
   echo -e "${RED}Please do not run as root. Use a regular user with sudo privileges.${NC}"
   exit 1
fi

echo -e "${GREEN}Step 1: Installing Node.js ${NODE_VERSION}...${NC}"
if ! command -v node &> /dev/null || [ "$(node -v | cut -d'v' -f2 | cut -d'.' -f1)" != "$NODE_VERSION" ]; then
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

echo -e "${GREEN}Node.js version: $(node -v)${NC}"
echo -e "${GREEN}npm version: $(npm -v)${NC}"

echo -e "${GREEN}Step 2: Installing PM2 (Process Manager)...${NC}"
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
fi

echo -e "${GREEN}Step 3: Creating application directory...${NC}"
sudo mkdir -p $APP_DIR
sudo chown -R $USER:$USER $APP_DIR

echo -e "${GREEN}Step 4: Copying application files...${NC}"
# Note: This assumes you're running from the project root
# If deploying from local machine, use rsync or git clone instead
if [ -d ".git" ]; then
    echo "Git repository detected. Files should be pulled via git."
else
    echo "Copying files to $APP_DIR..."
    rsync -av --exclude 'node_modules' --exclude '.next' --exclude '.git' \
          --exclude '*.log' --exclude '.env.local' \
          ./ $APP_DIR/
fi

cd $APP_DIR

echo -e "${GREEN}Step 5: Installing dependencies...${NC}"
npm ci --production=false

echo -e "${GREEN}Step 6: Setting up environment variables...${NC}"
if [ ! -f .env.production ]; then
    cat > .env.production << EOF
# Database Configuration
DATABASE_URL="file:./prisma/production.db"

# NextAuth Configuration
NEXTAUTH_URL="http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):${PORT}"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"

# Application Configuration
NODE_ENV=production
NEXT_PUBLIC_BASE_URL="http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):${PORT}"
NEXT_TELEMETRY_DISABLED=1

# Port Configuration
PORT=${PORT}
EOF
    echo -e "${YELLOW}Created .env.production file. Please review and update if needed.${NC}"
else
    echo -e "${GREEN}.env.production already exists.${NC}"
fi

echo -e "${GREEN}Step 7: Setting up SQLite database...${NC}"
# Create prisma directory if it doesn't exist
mkdir -p prisma

# Generate Prisma client
npx prisma generate

# Initialize database if it doesn't exist
if [ ! -f "prisma/production.db" ]; then
    echo "Creating SQLite database..."
    npx prisma db push --accept-data-loss
    echo -e "${GREEN}Database created successfully.${NC}"
else
    echo -e "${GREEN}Database already exists. Running migrations...${NC}"
    npx prisma migrate deploy || npx prisma db push --accept-data-loss
fi

# Set proper permissions for database
chmod 644 prisma/production.db || true

echo -e "${GREEN}Step 8: Building Next.js application...${NC}"
npm run build

echo -e "${GREEN}Step 9: Setting up PM2 ecosystem...${NC}"
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: '${APP_NAME}',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: '${APP_DIR}',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: ${PORT}
    },
    error_file: '${APP_DIR}/logs/pm2-error.log',
    out_file: '${APP_DIR}/logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    max_memory_restart: '1G',
    watch: false
  }]
};
EOF

# Create logs directory
mkdir -p logs

echo -e "${GREEN}Step 10: Starting application with PM2...${NC}"
pm2 delete ${APP_NAME} 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save

# Setup PM2 to start on system boot
pm2 startup systemd -u $USER --hp /home/$USER | grep -v "PM2" | sudo bash || true

echo -e "${GREEN}Step 11: Setting up firewall rules...${NC}"
sudo ufw allow ${PORT}/tcp || true
sudo ufw allow 22/tcp || true
sudo ufw --force enable || true

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo ""
echo -e "${YELLOW}Application Status:${NC}"
pm2 status
echo ""
echo -e "${YELLOW}Application URL:${NC}"
echo "http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):${PORT}"
echo ""
echo -e "${YELLOW}Useful Commands:${NC}"
echo "  pm2 logs ${APP_NAME}          # View logs"
echo "  pm2 restart ${APP_NAME}        # Restart app"
echo "  pm2 stop ${APP_NAME}          # Stop app"
echo "  pm2 monit                     # Monitor app"
echo ""
echo -e "${GREEN}🎉 Deployment complete!${NC}"

