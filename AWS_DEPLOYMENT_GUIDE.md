# 🚀 CyberProbes AWS Deployment Guide

## 📋 Prerequisites

### Required Tools:
1. **AWS Account** (email: tsinghtshar@gmail.com)
2. **AWS CLI** installed
3. **Docker Desktop** installed
4. **Node.js** (already installed)

---

## 🔧 Step 1: Install AWS CLI

### Download and Install:
```powershell
# Download AWS CLI installer
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

# Or manually download from:
# https://awscli.amazonaws.com/AWSCLIV2.msi
```

### Verify Installation:
```powershell
aws --version
```

---

## 🔐 Step 2: Configure AWS Credentials

```powershell
aws configure
```

**Enter the following when prompted:**
- **AWS Access Key ID**: [Get from AWS Console → IAM → Security Credentials]
- **AWS Secret Access Key**: [Get from AWS Console → IAM → Security Credentials]
- **Default region name**: `us-east-1` (or your preferred region)
- **Default output format**: `json`

### Get AWS Access Keys:
1. Go to AWS Console: https://console.aws.amazon.com/
2. Login with: tsinghtshar@gmail.com / Tuhar11@@
3. Navigate to: IAM → Users → Your User → Security Credentials
4. Click "Create Access Key"
5. Download and save the credentials

---

## 🐳 Step 3: Install Docker Desktop (if not installed)

1. Download from: https://www.docker.com/products/docker-desktop/
2. Install and start Docker Desktop
3. Verify installation:
```powershell
docker --version
docker-compose --version
```

---

## 📦 Step 4: Prepare Production Build

### 4.1: Update Environment Variables
Create `.env.production.local` file:

```env
NODE_ENV=production
DATABASE_URL=file:./prisma/dev.db
NEXTAUTH_URL=https://your-app-url.com
NEXTAUTH_SECRET=generate-a-secure-random-string-here
NEXT_PUBLIC_BASE_URL=https://your-app-url.com
```

### 4.2: Generate NextAuth Secret
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and use it as `NEXTAUTH_SECRET`

### 4.3: Test Production Build Locally
```powershell
npm run build
npm start
```

---

## ☁️ Step 5: Deploy to AWS (Choose ONE method)

### **Option A: AWS Amplify (Easiest - Recommended)**

#### 5.1: Push Code to GitHub
```powershell
# Initialize git (if not already)
git init
git add .
git commit -m "Prepare for AWS deployment"

# Create new GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/cyberprobes-site.git
git push -u origin main
```

#### 5.2: Deploy via AWS Amplify Console
1. Go to: https://console.aws.amazon.com/amplify/
2. Click "New app" → "Host web app"
3. Choose "GitHub" as source
4. Connect your GitHub account
5. Select `cyberprobes-site` repository
6. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
           - npx prisma generate
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
7. Add environment variables in Amplify console:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
8. Click "Save and deploy"

**Your app will be live at:** `https://main.d123456.amplifyapp.com`

---

### **Option B: AWS EC2 with Docker (More Control)**

#### 5.1: Create EC2 Instance
```powershell
# Create EC2 instance
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t2.micro \
  --key-name your-key-pair \
  --security-groups cyberprobes-sg \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=CyberProbes-Server}]'
```

#### 5.2: Connect to EC2 and Deploy
```bash
# SSH into EC2
ssh -i your-key.pem ec2-user@your-ec2-ip

# Install Docker
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Clone your repository
git clone https://github.com/YOUR_USERNAME/cyberprobes-site.git
cd cyberprobes-site

# Create .env.production file
nano .env.production

# Start application
docker-compose up -d
```

---

### **Option C: AWS Elastic Beanstalk (Managed)**

#### 5.1: Install EB CLI
```powershell
pip install awsebcli --upgrade --user
```

#### 5.2: Initialize and Deploy
```powershell
# Initialize Elastic Beanstalk
eb init -p docker cyberprobes-app --region us-east-1

# Create environment and deploy
eb create cyberprobes-env

# Open in browser
eb open
```

---

## 🔄 Step 6: Setup Custom Domain (Optional)

### 6.1: Register Domain or Use Existing
1. Go to Route 53: https://console.aws.amazon.com/route53/
2. Register new domain or add existing

### 6.2: Configure DNS
1. Create hosted zone
2. Add A record pointing to your app
3. Update `NEXTAUTH_URL` in environment variables

---

## 📊 Step 7: Monitoring & Maintenance

### View Logs:
```powershell
# Amplify
aws amplify get-job --app-id YOUR_APP_ID --branch-name main --job-id JOB_ID

# EC2
ssh into instance and: docker-compose logs -f

# Elastic Beanstalk
eb logs
```

### Update Application:
```powershell
# Amplify - just push to GitHub
git push origin main

# EC2
ssh into instance
cd cyberprobes-site
git pull
docker-compose down
docker-compose up -d --build

# Elastic Beanstalk
eb deploy
```

---

## 🛡️ Step 8: Security Best Practices

1. **Enable HTTPS:**
   - Amplify: Automatic with custom domain
   - EC2: Use AWS Certificate Manager + Load Balancer
   - Elastic Beanstalk: Configure in environment

2. **Setup CloudFront CDN:**
   ```powershell
   aws cloudfront create-distribution --origin-domain-name your-app-url.com
   ```

3. **Enable AWS WAF:**
   - Protect against common web attacks
   - Configure in AWS WAF console

4. **Setup Backups:**
   - Regular database backups
   - Code repository backups

---

## 💰 Cost Estimation

### AWS Amplify (Recommended):
- **Free Tier:** 1000 build minutes/month
- **After Free Tier:** ~$10-30/month

### AWS EC2 t2.micro:
- **Free Tier:** 750 hours/month (first year)
- **After Free Tier:** ~$8-15/month

### AWS Elastic Beanstalk:
- **Free:** Only pay for underlying resources
- **Cost:** ~$15-40/month (depending on traffic)

---

## 🆘 Troubleshooting

### Build Fails:
```powershell
# Check build logs
# Ensure all dependencies are in package.json
# Verify environment variables
```

### Database Issues:
```powershell
# Run migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

### Port Already in Use:
```powershell
# Find and kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## ✅ Quick Deploy Commands (After Setup)

### Build Docker Image:
```powershell
docker build -t cyberprobes-app .
```

### Run Locally with Docker:
```powershell
docker-compose up -d
```

### Push to AWS ECR (if using ECS):
```powershell
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
docker tag cyberprobes-app:latest YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/cyberprobes-app:latest
docker push YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/cyberprobes-app:latest
```

---

## 📞 Support

For issues, check:
1. AWS CloudWatch Logs
2. Docker logs: `docker-compose logs -f`
3. Next.js build errors: `npm run build`

---

## 🎉 Success Checklist

- [ ] AWS CLI installed and configured
- [ ] Docker Desktop running
- [ ] Production build tested locally
- [ ] Environment variables configured
- [ ] Code pushed to GitHub (if using Amplify)
- [ ] App deployed and accessible
- [ ] Custom domain configured (optional)
- [ ] HTTPS enabled
- [ ] Monitoring setup

---

**Your CyberProbes website is now live on AWS! 🚀**
