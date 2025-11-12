# 🔍 How to Get Your AWS RDS Database Details

## 📋 Quick Steps

### STEP 1: Login to AWS Console
1. Go to: https://console.aws.amazon.com/
2. Login with:
   - Email: `tsinghtushar@gmail.com`
   - Password: `Tushar@@11`

### STEP 2: Find Your RDS Database
1. **Search "RDS"** in the top search bar
2. Click on **"RDS"** service
3. Click **"Databases"** in left sidebar
4. You'll see your database listed (something like `cyberprobes-db`)

### STEP 3: Get Database Details
Click on your database, then you'll see:

**1. Endpoint (Copy this!):**
```
cyberprobes-db.xxxxx.us-east-1.rds.amazonaws.com
```
- This is your database hostname

**2. Port:**
```
5432
```
- Usually 5432 for PostgreSQL

**3. Master username:**
```
admin
```
- Or whatever you set when creating

**4. Database name:**
- Check "Configuration" tab
- Or "Connectivity & security" tab
- Usually `cyberprobes` or `postgres`

**5. Password:**
- The password you set when creating RDS
- If you forgot, you'll need to reset it

### STEP 4: Format Connection String

Once you have all details, format will be:
```
postgresql://USERNAME:PASSWORD@ENDPOINT:PORT/DATABASE_NAME?sslmode=require
```

**Example:**
```
postgresql://admin:YourPassword123@cyberprobes-db.xxxxx.us-east-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require
```

---

## 🚀 Quick Alternative: Check AWS Amplify

If your website is already running on RDS, the connection string might be in Amplify:

1. Go to **AWS Amplify Console**
2. Select your app
3. Go to **App settings** → **Environment variables**
4. Look for **DATABASE_URL**
5. Copy that value!

---

## 📝 What I Need From You

Please provide:
1. **RDS Endpoint** (the long URL ending in .rds.amazonaws.com)
2. **Port** (usually 5432)
3. **Username** (usually admin)
4. **Password** (the one you set for RDS)
5. **Database name** (usually cyberprobes or postgres)

**OR**

Just copy the **DATABASE_URL** from AWS Amplify environment variables and paste it here!

---

**Once you provide these details, I'll update everything automatically!** 🚀

