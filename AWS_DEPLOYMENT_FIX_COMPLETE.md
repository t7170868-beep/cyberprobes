# 🚀 AWS Amplify Deployment - Complete Fix Guide

## ⚠️ PROBLEM
Localhost pe website chal rahi hai but AWS pe "Something went wrong!" error aa rahi hai.

## 🔍 ROOT CAUSE
1. **Database Issue**: Local pe SQLite use ho raha hai but AWS pe MongoDB Atlas chahiye
2. **Environment Variables**: AWS Amplify mein environment variables set nahi hain
3. **Prisma Schema**: SQLite ke liye configured hai, production ke liye MongoDB chahiye

---

## ✅ SOLUTION - Step by Step

### STEP 1: MongoDB Atlas Setup (5 minutes)

#### 1.1 MongoDB Atlas Account Banao
1. Jao: https://www.mongodb.com/cloud/atlas/register
2. Google account se signup karo (ya email se)
3. Free tier (M0) select karo

#### 1.2 Cluster Create Karo
1. "Build a Database" click karo
2. **FREE (M0)** option select karo
3. Region: **Mumbai (ap-south-1)** ya nearest
4. Cluster Name: `cyberprobes` (ya koi bhi)
5. "Create" button click karo
6. Wait karo 3-5 minutes (cluster ban raha hai)

#### 1.3 Database User Create Karo
1. Security → Database Access → "Add New Database User"
2. Authentication Method: **Password**
3. Username: `cyberprobes_user`
4. Password: `CyberProbes@2025` (ya apna strong password)
5. Database User Privileges: **Atlas Admin**
6. "Add User" click karo

#### 1.4 Network Access Allow Karo
1. Security → Network Access → "Add IP Address"
2. "Allow Access From Anywhere" click karo (0.0.0.0/0)
3. "Confirm" click karo

#### 1.5 Connection String Copy Karo
1. Database → "Connect" button click karo
2. "Drivers" option select karo
3. Driver: **Node.js**
4. Connection string copy karo:
```
mongodb+srv://cyberprobes_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```
5. `<password>` ko apne actual password se replace karo
6. Database name add karo: `/cyberprobes` (URL ke end mein)

**Final Connection String Example:**
```
mongodb+srv://cyberprobes_user:CyberProbes@2025@cluster0.abc123.mongodb.net/cyberprobes?retryWrites=true&w=majority
```

---

### STEP 2: AWS Amplify Environment Variables Setup

#### 2.1 AWS Amplify Console Kholo
1. Browser mein jao: https://console.aws.amazon.com/amplify/
2. Login karo (agar nahi ho)
3. Apni app select karo: **cyberprobes-site**

#### 2.2 Environment Variables Section Kholo
1. Left sidebar → **App settings** → **Environment variables**
2. Ya top menu mein **Environment variables** tab

#### 2.3 Ye Variables Add Karo (Ek-ek karke)

**Variable 1: DATABASE_URL**
```
Key: DATABASE_URL
Value: mongodb+srv://cyberprobes_user:CyberProbes@2025@cluster0.xxxxx.mongodb.net/cyberprobes?retryWrites=true&w=majority
```
⚠️ **IMPORTANT**: Apna actual MongoDB Atlas connection string use karo!

**Variable 2: NEXTAUTH_SECRET**
```
Key: NEXTAUTH_SECRET
Value: cyberprobes-secret-key-production-2025-keep-this-secret-safe-do-not-share
```

**Variable 3: NEXTAUTH_URL**
```
Key: NEXTAUTH_URL
Value: [APNI AWS AMPLIFY APP KA URL]
```
Example: `https://main.d1ce8jq8iz0ibb.amplifyapp.com`

⚠️ **Apna actual Amplify URL use karo!** (Amplify console mein mil jayega)

**Variable 4: NODE_ENV**
```
Key: NODE_ENV
Value: production
```

**Variable 5: JWT_SECRET**
```
Key: JWT_SECRET
Value: jwt-secret-key-cyberprobes-production-2025-keep-this-secret-safe
```

**Variable 6: NEXT_PUBLIC_BASE_URL**
```
Key: NEXT_PUBLIC_BASE_URL
Value: [APNI AWS AMPLIFY APP KA URL]
```
Example: `https://main.d1ce8jq8iz0ibb.amplifyapp.com`

#### 2.4 Save Karo
"Save" button click karo

---

### STEP 3: Prisma Schema Update for Production

**⚠️ IMPORTANT**: Hum dual database support add karenge:
- **Local Development**: SQLite
- **Production (AWS)**: MongoDB

Yeh already handle ho raha hai Prisma schema mein. Bas environment variable sahi hona chahiye.

---

### STEP 4: Update Build Settings

#### 4.1 Build Settings Kholo
1. AWS Amplify Console → App settings → Build settings
2. "Edit" button click karo

#### 4.2 Ye YAML Paste Karo
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - echo "Environment Check"
        - env | grep -E 'DATABASE_URL|NEXTAUTH|NODE_ENV' || echo "Checking env vars..."
        - rm -rf .next node_modules/.cache
        - npm ci
        - npx prisma generate --schema=./prisma/schema.prisma
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

#### 4.3 Save Karo
"Save" button click karo

---

### STEP 5: Seed Production Database

#### 5.1 Local se Production Database Seed Karo

1. **Apne local `.env` file mein temporary change karo:**
```env
# Temporarily use production MongoDB
DATABASE_URL="mongodb+srv://cyberprobes_user:CyberProbes@2025@cluster0.xxxxx.mongodb.net/cyberprobes?retryWrites=true&w=majority"
```

2. **Terminal mein run karo:**
```powershell
# Prisma generate for MongoDB
npx prisma generate

# Seed production database
npm run db:seed
```

3. **Success message aayega:**
```
Created admin user: admin@cyberprobes.com
Created regular user: user@cyberprobes.com
Created 3 blog posts
Created 2 videos
Created 3 courses with modules and materials
```

4. **`.env` file ko wapas local setting pe restore karo:**
```env
DATABASE_URL="file:./prisma/dev.db"
```

---

### STEP 6: Redeploy AWS Amplify

#### 6.1 Manual Redeploy
1. AWS Amplify Console → **Deployments** tab
2. Latest deployment pe **"Redeploy this version"** click karo
3. Ya **"Run build"** button click karo

#### 6.2 Wait Karo
- Build process 5-10 minutes lega
- Status check karte raho:
  - ✓ Provision
  - ✓ Build
  - ✓ Deploy
  - ✓ Verify

---

### STEP 7: Test Production Website

#### 7.1 Website Kholo
```
https://your-app-url.amplifyapp.com
```

#### 7.2 Test Login
1. Login page jao: `/auth/login`
2. Credentials:
   - Email: `admin@cyberprobes.com`
   - Password: `admin123`

#### 7.3 Test Admin Dashboard
```
https://your-app-url.amplifyapp.com/dashboard/admin
```

---

## 🔧 Troubleshooting

### Error: "Something went wrong!"

**Check 1: Environment Variables**
```bash
# AWS Amplify Console → Environment variables
# Verify all 6 variables are set correctly
```

**Check 2: Build Logs**
```bash
# AWS Amplify Console → Deployments → Latest build → View logs
# Check for errors in preBuild or build phase
```

**Check 3: MongoDB Connection**
```bash
# MongoDB Atlas → Clusters → Connect
# Verify cluster is running (green status)
# Check Network Access (0.0.0.0/0 should be there)
```

### Error: "PrismaClientInitializationError"

**Solution:**
1. Check DATABASE_URL is correct in AWS Amplify
2. Verify MongoDB Atlas cluster is running
3. Check Network Access allows all IPs (0.0.0.0/0)

### Error: "Authentication failed"

**Solution:**
1. Password mein special characters hain? URL encode karo:
   - `@` → `%40`
   - `!` → `%21`
   - `#` → `%23`
   - `$` → `%24`
   - `&` → `%26`

Example:
```
Password: Pass@123!
Encoded: Pass%40123%21
```

### Error: "Invalid email or password" (Login page)

**Solution:**
Database seed nahi hua. Step 5 repeat karo.

---

## 📋 Quick Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] Network Access set to 0.0.0.0/0
- [ ] Connection string copied
- [ ] All 6 environment variables added in AWS Amplify
- [ ] NEXTAUTH_URL set to actual Amplify URL
- [ ] Build settings updated
- [ ] Production database seeded
- [ ] AWS Amplify redeployed
- [ ] Website tested and working

---

## 🎯 Final Notes

### Security Tips for Production:
1. **Change default admin password** after first login
2. **Use strong passwords** for MongoDB Atlas
3. **Restrict Network Access** to specific IPs (optional, for better security)
4. **Never commit** `.env` files to git
5. **Rotate secrets** regularly (NEXTAUTH_SECRET, JWT_SECRET)

### Backup Strategy:
1. MongoDB Atlas provides **automatic backups** (free tier: 1 day retention)
2. Enable **Point-in-Time Recovery** for paid tiers
3. Export important data regularly

---

## 🆘 Still Having Issues?

### Check These:
1. **Browser Console** (F12) - Check for JavaScript errors
2. **AWS Amplify Build Logs** - Check for build/deploy errors
3. **MongoDB Atlas Logs** - Check for connection issues
4. **Network Tab** (F12) - Check API responses

### Common Issues:
- **CORS errors**: NEXTAUTH_URL should match your actual domain
- **Database timeout**: Check MongoDB Atlas cluster status
- **Build failures**: Check package.json dependencies
- **404 errors**: Clear browser cache and hard refresh (Ctrl+Shift+R)

---

## 📞 Support

Agar koi problem aa rahi hai toh:
1. AWS Amplify build logs check karo
2. Browser console errors check karo
3. MongoDB Atlas cluster status verify karo
4. Environment variables double-check karo

---

**Last Updated**: November 5, 2025
**Version**: 1.0
**Status**: Production Ready ✅

