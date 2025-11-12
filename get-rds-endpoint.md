# 🔍 How to Get RDS Endpoint

## Quick Method 1: AWS RDS Console

1. **Login to AWS Console:**
   - Go to: https://console.aws.amazon.com/
   - Email: `tsinghtushar@gmail.com`
   - Password: `Tushar@@11`

2. **Go to RDS:**
   - Search "RDS" in top search bar
   - Click "RDS" service
   - Click "Databases" in left sidebar

3. **Find Your Database:**
   - Click on your database (cyberprobes-db or similar)
   - Look for **"Endpoint"** field
   - Copy it - it looks like:
     ```
     cyberprobes-db.xxxxx.us-east-1.rds.amazonaws.com
     ```

---

## Quick Method 2: AWS Amplify (If Already Configured)

1. **Go to AWS Amplify Console:**
   - Search "Amplify" in AWS Console
   - Select your app

2. **Check Environment Variables:**
   - Go to **App settings** → **Environment variables**
   - Look for **DATABASE_URL**
   - Copy the endpoint from there

---

## What the Endpoint Looks Like

Example endpoints:
- `cyberprobes-db.abc123.us-east-1.rds.amazonaws.com`
- `cyberprobes-db.xyz789.ap-south-1.rds.amazonaws.com`

Format: `database-name.random-id.region.rds.amazonaws.com`

---

## Once You Have Endpoint

Run this command again:
```powershell
.\update-rds-final.ps1
```

And provide:
- **Endpoint:** (paste the endpoint you copied)
- **Port:** 5432 (press Enter for default)
- **Database name:** cyberprobes (press Enter for default)

---

**Or if you have the full connection string from Amplify, just paste it and I'll update it!**

