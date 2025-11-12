# 🔍 How to Get Your AWS RDS Connection String

## 📋 Step-by-Step Guide

### STEP 1: Find Your RDS Database Endpoint

1. **Go to AWS Console:** https://console.aws.amazon.com/
2. **Search "RDS"** → Click on RDS service
3. **Click "Databases"** in left sidebar
4. **Click on your database** (cyberprobes-db or similar)
5. **Copy the "Endpoint"** - it looks like:
   ```
   cyberprobes-db.xxxxx.us-east-1.rds.amazonaws.com
   ```
6. **Note the Port:** Usually `5432` for PostgreSQL

### STEP 2: Get Your Database Credentials

From RDS database page, you'll see:
- **Master username:** Usually `admin` or `postgres`
- **Master password:** The one you set when creating database

### STEP 3: Format Connection String

**PostgreSQL Connection String Format:**
```
postgresql://USERNAME:PASSWORD@ENDPOINT:PORT/DATABASE_NAME?sslmode=require
```

**Example:**
```
postgresql://admin:MyPassword123@cyberprobes-db.xxxxx.us-east-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require
```

### STEP 4: Update .env File

Replace the MongoDB URL with your RDS PostgreSQL URL:

**BEFORE (MongoDB):**
```env
DATABASE_URL="mongodb+srv://t7170868_db_user:admin123@cluster0.pnugpz0.mongodb.net/cyberprobes?retryWrites=true&w=majority"
```

**AFTER (PostgreSQL):**
```env
DATABASE_URL="postgresql://admin:YOUR_PASSWORD@cyberprobes-db.xxxxx.us-east-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require"
```

⚠️ **Important:** 
- Replace `YOUR_PASSWORD` with your actual RDS password
- Replace `xxxxx` with your actual endpoint
- Replace `us-east-1` with your actual region (if different)

---

## 🚨 Common Issues

### Issue 1: "Connection timeout"
**Solution:** Check Security Group allows port 5432 from your IP

### Issue 2: "Authentication failed"
**Solution:** Verify username and password are correct

### Issue 3: "Database does not exist"
**Solution:** Check database name in RDS settings

### Issue 4: "SSL required"
**Solution:** Make sure `?sslmode=require` is in connection string

---

## 📝 Quick Checklist

- [ ] RDS endpoint copied
- [ ] Username noted
- [ ] Password available
- [ ] Database name confirmed
- [ ] Connection string formatted correctly
- [ ] .env file updated
- [ ] Security group allows port 5432

---

**Once you have the connection string, I'll update the .env file for you!**

