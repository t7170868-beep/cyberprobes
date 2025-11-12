# 🚀 AWS RDS PostgreSQL Setup Guide

## 📋 Complete Step-by-Step Guide

---

## 🔧 **STEP 1: Create AWS RDS PostgreSQL Instance**

### 1.1 Go to AWS Console
1. Login to AWS Console: https://console.aws.amazon.com/
2. Search for **"RDS"** in the search bar
3. Click on **"RDS"** service

### 1.2 Create Database
1. Click **"Create database"** button
2. Choose **"Standard create"** (not Easy create)

### 1.3 Database Configuration

**Engine Options:**
- **Engine type:** PostgreSQL
- **Version:** PostgreSQL 15.x or 16.x (latest stable)

**Templates:**
- Select **"Free tier"** (if available) or **"Production"**

**Settings:**
- **DB instance identifier:** `cyberprobes-db`
- **Master username:** `admin`
- **Master password:** Create a strong password (save it!)
  - Example: `CyberProbes2025!Secure`

**Instance configuration:**
- **DB instance class:** `db.t3.micro` (Free tier) or `db.t3.small`

**Storage:**
- **Storage type:** General Purpose SSD (gp3)
- **Allocated storage:** 20 GB (minimum)

### 1.4 Connectivity Settings

**Network & Security:**
- **VPC:** Default VPC (or create new)
- **Subnet group:** Default
- **Public access:** ✅ **YES** (Important for Amplify connection!)
- **VPC Security Group:** Create new security group
  - Name: `cyberprobes-rds-sg`
- **Availability Zone:** No preference (or choose closest)

**Database authentication:**
- **Password authentication** (default)

### 1.5 Additional Configuration

**Database options:**
- **Initial database name:** `cyberprobes`

**Backup:**
- **Enable automated backups:** ✅ Yes
- **Backup retention period:** 7 days

**Monitoring:**
- **Enable Enhanced monitoring:** ❌ No (optional, costs extra)

### 1.6 Create Database
1. Click **"Create database"**
2. Wait 5-10 minutes for database to be created
3. Status will show **"Available"** when ready

---

## 🔒 **STEP 2: Configure Security Group (CRITICAL!)**

### 2.1 Find Security Group
1. Go to **EC2 Console** → **Security Groups**
2. Find security group: `cyberprobes-rds-sg` (or the one created for RDS)

### 2.2 Edit Inbound Rules
1. Click on the security group
2. Go to **"Inbound rules"** tab
3. Click **"Edit inbound rules"**

### 2.3 Add Rule
1. Click **"Add rule"**
2. Configure:
   - **Type:** PostgreSQL
   - **Protocol:** TCP
   - **Port:** `5432`
   - **Source:** `0.0.0.0/0` (for testing - change later!)
   - **Description:** "Allow PostgreSQL from anywhere"

3. Click **"Save rules"**

⚠️ **Security Note:** After testing, restrict to:
- Your Amplify IP range
- Your backend server IP
- Or specific IP addresses

---

## 📝 **STEP 3: Get Database Endpoint**

1. Go back to **RDS Console** → **Databases**
2. Click on your database: `cyberprobes-db`
3. Copy the **Endpoint** (something like):
   ```
   cyberprobes-db.xxxxx.us-east-1.rds.amazonaws.com
   ```
4. Note the **Port:** `5432`

---

## ⚙️ **STEP 4: Update .env File**

### 4.1 Create PostgreSQL Connection String

Format:
```
postgresql://USERNAME:PASSWORD@ENDPOINT:PORT/DATABASE?sslmode=require
```

Example:
```
postgresql://admin:CyberProbes2025!Secure@cyberprobes-db.xxxxx.us-east-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require
```

### 4.2 Update .env File

```env
# AWS RDS PostgreSQL Configuration
DATABASE_URL="postgresql://admin:YOUR_PASSWORD@cyberprobes-db.xxxxx.us-east-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require"

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"
NEXTAUTH_URL="https://main.d1ce8jq8iz0ibb.amplifyapp.com"

# Node Environment
NODE_ENV="production"

# JWT Secret
JWT_SECRET="your-jwt-secret-key-change-this-in-production"
```

⚠️ **Important:** Replace:
- `YOUR_PASSWORD` with your actual RDS password
- `xxxxx` with your actual endpoint
- `us-east-1` with your actual region

---

## 🗄️ **STEP 5: Run Database Migrations**

### 5.1 Generate Prisma Client
```powershell
npm run db:generate
```

### 5.2 Push Schema to Database
```powershell
npx prisma db push
```

This will create all tables in your RDS PostgreSQL database.

### 5.3 Seed Database
```powershell
npm run db:seed
```

This will create:
- Admin user: `admin@cyberprobes.com` / `admin123`
- Regular user: `user@cyberprobes.com` / `user123`
- Sample blogs, videos, courses

---

## 🌐 **STEP 6: Update AWS Amplify Environment Variables**

### 6.1 Go to AWS Amplify Console
1. Go to: https://console.aws.amazon.com/amplify/
2. Select your app: `cyberprobes-site`

### 6.2 Add Environment Variables
1. Go to **App settings** → **Environment variables**
2. Add/Update these variables:

```
DATABASE_URL = postgresql://admin:YOUR_PASSWORD@cyberprobes-db.xxxxx.us-east-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require

NEXTAUTH_SECRET = your-super-secret-key-change-this-in-production

NEXTAUTH_URL = https://main.d1ce8jq8iz0ibb.amplifyapp.com

NODE_ENV = production

JWT_SECRET = your-jwt-secret-key-change-this-in-production
```

3. Click **"Save"**

### 6.3 Redeploy
1. Go to **Deployments** tab
2. Click **"Redeploy this version"**
3. Wait 10-15 minutes for deployment

---

## 🧪 **STEP 7: Test Connection**

### 7.1 Test Locally
```powershell
# Test database connection
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.$connect().then(() => { console.log('✅ Connected to RDS!'); prisma.$disconnect(); }).catch(e => { console.error('❌ Error:', e.message); });"
```

### 7.2 Test Production
After deployment, test login:
- URL: `https://main.d1ce8jq8iz0ibb.amplifyapp.com/auth/login`
- Email: `admin@cyberprobes.com`
- Password: `admin123`

---

## 🔐 **STEP 8: Secure the Connection (After Testing)**

### 8.1 Restrict Security Group
1. Go to **EC2** → **Security Groups**
2. Edit inbound rules
3. Change source from `0.0.0.0/0` to:
   - Your Amplify IP range
   - Or specific IP addresses

### 8.2 Disable Public Access (Optional)
1. Go to **RDS** → Your database
2. Click **"Modify"**
3. **Public access:** ❌ **No**
4. Apply changes

⚠️ **Note:** Only disable public access if your backend is in the same VPC.

---

## ✅ **Troubleshooting**

### Error: "Connection timeout"
- **Cause:** Security group not allowing connection
- **Fix:** Check inbound rules allow port 5432

### Error: "Authentication failed"
- **Cause:** Wrong username/password
- **Fix:** Verify credentials in DATABASE_URL

### Error: "Database does not exist"
- **Cause:** Database name mismatch
- **Fix:** Check initial database name in RDS settings

### Error: "SSL required"
- **Cause:** Missing SSL mode
- **Fix:** Add `?sslmode=require` to connection string

---

## 📊 **Cost Estimation**

### Free Tier (12 months):
- **db.t3.micro:** Free
- **20 GB storage:** Free
- **20 GB backup:** Free

### After Free Tier:
- **db.t3.micro:** ~$15/month
- **Storage:** ~$0.10/GB/month
- **Backup:** ~$0.095/GB/month

**Estimated Monthly Cost:** $20-30/month

---

## 🎯 **Quick Checklist**

- [ ] RDS PostgreSQL instance created
- [ ] Security group configured (port 5432)
- [ ] Database endpoint copied
- [ ] .env file updated with connection string
- [ ] Prisma client generated
- [ ] Database schema pushed (`npx prisma db push`)
- [ ] Database seeded (`npm run db:seed`)
- [ ] AWS Amplify environment variables updated
- [ ] Amplify redeployed
- [ ] Login tested successfully
- [ ] Security group restricted (after testing)

---

## 🚀 **Next Steps**

1. **Commit and push code:**
   ```powershell
   git add .
   git commit -m "Setup AWS RDS PostgreSQL database"
   git push
   ```

2. **Wait for Amplify deployment**

3. **Test production login**

4. **Secure security group** (restrict IP access)

---

**Total Setup Time:** 30-45 minutes  
**Difficulty:** Medium  
**Cost:** Free tier available, then ~$20-30/month

🎉 **Your website will now use AWS RDS PostgreSQL!**

