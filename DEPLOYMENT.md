# EC2 Deployment Guide - SQLite

यह guide आपको EC2 instance पर SQLite database के साथ CyberProbes application deploy करने में मदद करेगी।

## Prerequisites

1. EC2 instance running Ubuntu 20.04/22.04
2. SSH access to EC2 instance
3. Security group में port 3000 open होना चाहिए
4. PEM key file के साथ SSH access

## Deployment Steps

### Step 1: EC2 Instance पर Connect करें

```bash
ssh -i "cyberprobes.pem" ubuntu@ec2-13-50-17-25.eu-north-1.compute.amazonaws.com
```

### Step 2: Local Machine से Files Transfer करें

#### Option A: Git के साथ (Recommended)
```bash
# EC2 पर
cd ~
git clone <your-repo-url> cyberprobes
cd cyberprobes
```

#### Option B: rsync के साथ
```bash
# Local machine से
rsync -avz -e "ssh -i cyberprobes.pem" \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  ./ ubuntu@ec2-13-50-17-25.eu-north-1.compute.amazonaws.com:~/cyberprobes/
```

#### Option C: SCP के साथ
```bash
# Local machine से
scp -i cyberprobes.pem -r \
  --exclude 'node_modules' \
  --exclude '.next' \
  ./ ubuntu@ec2-13-50-17-25.eu-north-1.compute.amazonaws.com:~/cyberprobes/
```

### Step 3: Deployment Script Run करें

```bash
# EC2 पर
cd ~/cyberprobes
chmod +x deploy.sh
./deploy.sh
```

### Step 4: Manual Setup (अगर script काम न करे)

```bash
# Node.js Install करें
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 Install करें
sudo npm install -g pm2

# Dependencies Install करें
npm ci

# Environment Variables Setup करें
cat > .env.production << EOF
DATABASE_URL="file:./prisma/production.db"
NEXTAUTH_URL="http://YOUR_EC2_IP:3000"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NODE_ENV=production
NEXT_PUBLIC_BASE_URL="http://YOUR_EC2_IP:3000"
NEXT_TELEMETRY_DISABLED=1
PORT=3000
EOF

# Prisma Client Generate करें
npx prisma generate

# Database Initialize करें
npx prisma db push --accept-data-loss

# Build करें
npm run build

# PM2 के साथ Start करें
pm2 start npm --name "cyberprobes" -- start
pm2 save
pm2 startup
```

## Environment Variables

`.env.production` file में ये variables set करें:

```env
DATABASE_URL="file:./prisma/production.db"
NEXTAUTH_URL="http://YOUR_EC2_PUBLIC_IP:3000"
NEXTAUTH_SECRET="your-secret-key-here"
NODE_ENV=production
NEXT_PUBLIC_BASE_URL="http://YOUR_EC2_PUBLIC_IP:3000"
PORT=3000
```

## Database Management

### Database Reset करना
```bash
rm prisma/production.db
npx prisma db push --accept-data-loss
```

### Database Seed करना (अगर seed script हो)
```bash
npm run db:seed
```

### Prisma Studio चलाना
```bash
npx prisma studio
# Browser में http://localhost:5555 खुलेगा
```

## PM2 Commands

```bash
# Application Status देखना
pm2 status

# Logs देखना
pm2 logs cyberprobes

# Restart करना
pm2 restart cyberprobes

# Stop करना
pm2 stop cyberprobes

# Monitor करना
pm2 monit
```

## Nginx Setup (Optional - Production के लिए Recommended)

### Nginx Install करें
```bash
sudo apt update
sudo apt install nginx -y
```

### Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/cyberprobes
```

इस content को add करें:
```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Nginx Enable करें
```bash
sudo ln -s /etc/nginx/sites-available/cyberprobes /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

## Troubleshooting

### Port Already in Use
```bash
# Check कौन सा process port 3000 use कर रहा है
sudo lsof -i :3000
# या
sudo netstat -tulpn | grep 3000

# Process kill करें
sudo kill -9 <PID>
```

### Database Lock Error
```bash
# Database file के permissions check करें
ls -la prisma/production.db
chmod 644 prisma/production.db
```

### Build Errors
```bash
# Clean build करें
rm -rf .next node_modules
npm ci
npm run build
```

### PM2 Issues
```bash
# PM2 logs check करें
pm2 logs cyberprobes --lines 100

# PM2 reset करें
pm2 delete cyberprobes
pm2 start ecosystem.config.js
```

## Security Checklist

- [ ] Firewall में सिर्फ necessary ports open हैं
- [ ] `.env.production` file secure है (permissions 600)
- [ ] Database file के proper permissions हैं
- [ ] NEXTAUTH_SECRET strong है
- [ ] Regular backups setup हैं
- [ ] SSL certificate installed है (production के लिए)

## Backup Strategy

### Database Backup Script
```bash
#!/bin/bash
# backup-db.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/ubuntu/backups"
mkdir -p $BACKUP_DIR
cp prisma/production.db $BACKUP_DIR/production_$DATE.db
# Keep only last 7 days of backups
find $BACKUP_DIR -name "production_*.db" -mtime +7 -delete
```

### Cron Job Setup
```bash
crontab -e
# Add this line for daily backup at 2 AM
0 2 * * * /home/ubuntu/cyberprobes/backup-db.sh
```

## Monitoring

### Application Health Check
```bash
curl http://localhost:3000/api/health
```

### System Resources
```bash
# CPU और Memory usage
htop

# Disk usage
df -h

# Application logs
pm2 logs cyberprobes --lines 50
```

## Updates और Maintenance

### Code Update करना
```bash
cd ~/cyberprobes
git pull origin main
npm ci
npx prisma generate
npm run build
pm2 restart cyberprobes
```

### Database Migration
```bash
npx prisma migrate deploy
# या
npx prisma db push
```

## Support

अगर कोई issue आए तो:
1. PM2 logs check करें: `pm2 logs cyberprobes`
2. Application logs check करें: `tail -f logs/pm2-error.log`
3. System logs check करें: `journalctl -u pm2-ubuntu`

