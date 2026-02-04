# Quick Deploy Guide - SQLite on EC2

## Fastest Way to Deploy

### 1. EC2 पर Connect करें
```bash
ssh -i "cyberprobes.pem" ubuntu@ec2-13-50-17-25.eu-north-1.compute.amazonaws.com
```

### 2. Code Transfer करें (Git से)
```bash
cd ~
git clone <your-repo-url> cyberprobes
cd cyberprobes
```

### 3. Deployment Script Run करें
```bash
chmod +x deploy.sh
./deploy.sh
```

## Manual Quick Setup (5 Minutes)

```bash
# 1. Node.js Install
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. PM2 Install
sudo npm install -g pm2

# 3. Dependencies
npm ci

# 4. Environment Setup
cat > .env.production << 'EOF'
DATABASE_URL="file:./prisma/production.db"
NEXTAUTH_URL="http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NODE_ENV=production
NEXT_PUBLIC_BASE_URL="http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000"
PORT=3000
EOF

# 5. Database Setup
npx prisma generate
npx prisma db push --accept-data-loss

# 6. Build
npm run build

# 7. Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Important URLs

- Application: `http://YOUR_EC2_IP:3000`
- PM2 Dashboard: `pm2 monit`
- Logs: `pm2 logs cyberprobes`

## Common Commands

```bash
# Restart
pm2 restart cyberprobes

# Stop
pm2 stop cyberprobes

# Logs
pm2 logs cyberprobes --lines 100

# Status
pm2 status
```

