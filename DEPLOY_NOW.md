# 🚀 Quick Deployment Guide - CyberProbes Website

## 📋 Pre-Deployment Checklist

### ✅ Before Deploying:

1. **Environment Variables Check**
   - [ ] `.env.local` file exists with all required variables
   - [ ] Database URL is correct
   - [ ] NEXTAUTH_SECRET is set
   - [ ] NEXTAUTH_URL matches deployment URL

2. **Code Quality**
   - [ ] No linting errors (`npm run lint`)
   - [ ] Build succeeds (`npm run build`)
   - [ ] All tests pass (if any)

3. **Git Status**
   - [ ] All changes committed
   - [ ] Code pushed to repository

---

## 🎯 Deployment Options

### Option 1: Vercel (Recommended - Easiest) ⭐

#### Step 1: Install Vercel CLI
```powershell
npm install -g vercel
```

#### Step 2: Login to Vercel
```powershell
vercel login
```

#### Step 3: Deploy
```powershell
# First deployment (will ask questions)
vercel

# Production deployment
vercel --prod
```

#### Step 4: Set Environment Variables
1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add all required variables:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - `NEXT_PUBLIC_BASE_URL`
   - `JWT_SECRET`

---

### Option 2: AWS Amplify

#### Step 1: Push to GitHub
```powershell
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### Step 2: Connect to AWS Amplify
1. Go to: https://console.aws.amazon.com/amplify/
2. Click "New App" → "Host web app"
3. Connect your GitHub repository
4. Select branch: `main`

#### Step 3: Configure Build Settings
Amplify will auto-detect Next.js. Use these settings:

**Build Settings:**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
        - npx prisma generate
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
```

#### Step 4: Set Environment Variables
In Amplify Console → App Settings → Environment Variables:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `NEXT_PUBLIC_BASE_URL`
- `JWT_SECRET`
- `NODE_ENV=production`

---

### Option 3: Manual Build & Deploy

#### Step 1: Build Production
```powershell
npm run build
```

#### Step 2: Test Locally
```powershell
npm start
```

#### Step 3: Deploy `.next` folder
Upload `.next` folder to your hosting provider

---

## 🔧 Environment Variables Template

Create `.env.production` file:

```env
# Database
DATABASE_URL=your-database-url-here

# NextAuth
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret-key-here-min-32-chars

# JWT
JWT_SECRET=your-jwt-secret-here-min-32-chars

# App
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NODE_ENV=production

# Optional: ReCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
```

---

## 📝 Quick Deploy Script

Save this as `deploy.ps1`:

```powershell
# CyberProbes Deployment Script
Write-Host "🚀 Starting deployment..." -ForegroundColor Green

# Step 1: Check git status
Write-Host "📋 Checking git status..." -ForegroundColor Yellow
git status

# Step 2: Build
Write-Host "🔨 Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

# Step 3: Deploy to Vercel
Write-Host "☁️ Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod

Write-Host "✅ Deployment complete!" -ForegroundColor Green
```

---

## 🐛 Troubleshooting

### Build Fails
```powershell
# Clear cache and rebuild
rm -rf .next node_modules/.cache
npm install
npm run build
```

### Environment Variables Not Working
- Check variable names (case-sensitive)
- Ensure `NEXT_PUBLIC_` prefix for client-side vars
- Restart deployment after adding variables

### Database Connection Issues
- Verify DATABASE_URL format
- Check database is accessible
- Test connection locally first

---

## ✅ Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] Login/Register works
- [ ] Database connections work
- [ ] API endpoints respond
- [ ] Images load properly
- [ ] No console errors

---

## 📞 Support

If deployment fails:
1. Check build logs
2. Verify environment variables
3. Check database connectivity
4. Review error messages

**Ready to deploy? Run:**
```powershell
npm run build
vercel --prod
```

