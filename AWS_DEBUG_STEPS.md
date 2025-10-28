# 🔧 AWS Deployment Debug Steps

## Current Problem
Login still showing "Invalid email or password" on AWS deployment.

---

## ✅ SOLUTION CHECKLIST

### 1. Check AWS Build Status
1. AWS Amplify Console → Your App
2. Click on "Deployments" tab
3. Look at latest deployment:
   - ⏳ **Building** → Wait!
   - ✅ **Succeeded** → Continue to next step
   - ❌ **Failed** → Check logs (Step 2)

---

### 2. Check Build Logs (If Build Failed)

1. Click on the failed build
2. Click "Build logs"
3. Look for errors:

**Common Errors:**

#### Error: "Prisma Client not generated"
```
Solution:
Check amplify.yml has:
  preBuild:
    commands:
      - npx prisma generate --schema=./prisma/schema.prisma
```

#### Error: "DATABASE_URL not found"
```
Solution:
AWS Amplify → Environment variables
Make sure DATABASE_URL is set correctly
```

#### Error: "Module not found"
```
Solution:
Check package.json has all dependencies
Run locally: npm install
```

---

### 3. Verify Environment Variables

AWS Console → Your App → Environment variables

**Must have these 5 variables:**

```
✅ DATABASE_URL = mongodb+srv://t7170868_db_user:admin123@cluster0.pnugpz0.mongodb.net/cyberprobes?retryWrites=true&w=majority

✅ NEXTAUTH_SECRET = cyberprobes-secret-key-12345678901234567890123456789012

✅ NEXTAUTH_URL = https://main.d1ce8jq8iz0ibb.amplifyapp.com

✅ NODE_ENV = production

✅ JWT_SECRET = jwt-secret-key-cyberprobes-12345678901234567890
```

**Check each one carefully!**

---

### 4. Manual Redeploy

Force a fresh build:

1. AWS Amplify → Deployments
2. Click "Redeploy this version" on latest successful build
3. Wait 5-10 minutes
4. Test again

---

### 5. Clear Browser Cache

Before testing:

1. Open Incognito/Private window
2. Or clear browser cache:
   - Chrome: Ctrl+Shift+Delete
   - Select "Cached images and files"
   - Clear

---

### 6. MongoDB Atlas Network Access

1. MongoDB Atlas → Security → Network Access
2. Should see: **0.0.0.0/0** (Allow access from anywhere)
3. Status should be: **ACTIVE** (green)

If not:
- Click "Add IP Address"
- Select "Allow Access From Anywhere"
- Confirm

---

### 7. Test Database Connection from AWS

Check if AWS can connect to MongoDB:

1. AWS Amplify → Build logs
2. Look for these messages:
   ```
   ✓ MongoDB connection successful
   ✓ Prisma Client generated
   ```

If you see errors like:
```
❌ MongoServerSelectionTimeoutError
❌ Connection refused
```

**Solution:**
- Check MongoDB Atlas Network Access (Step 6)
- Verify DATABASE_URL password is correct
- Check MongoDB cluster is ACTIVE (not paused)

---

### 8. Check MongoDB Atlas Cluster Status

1. MongoDB Atlas Dashboard
2. Your cluster should show: **ACTIVE** (green)
3. If showing "PAUSED":
   - Click "Resume"
   - Wait 1-2 minutes
   - Redeploy AWS app

---

### 9. Verify Database Has Admin User

Use MongoDB Atlas interface:

1. MongoDB Atlas → Browse Collections
2. Database: `cyberprobes`
3. Collection: `User`
4. Should see user with email: `admin@cyberprobes.com`

If not found:
- Database not seeded
- Run locally: `npm run db:seed`
- Admin user will be created in MongoDB

---

### 10. Test Production API Directly

Open browser and test:

**Test 1: Health Check**
```
https://main.d1ce8jq8iz0ibb.amplifyapp.com/
```
Should load homepage

**Test 2: Login Page**
```
https://main.d1ce8jq8iz0ibb.amplifyapp.com/auth/login
```
Should show login form

**Test 3: API Test**
```
https://main.d1ce8jq8iz0ibb.amplifyapp.com/api/debug
```
Check if environment variables are loaded

---

## 🔧 Emergency Fix: Force Complete Rebuild

If nothing works, force complete rebuild:

1. AWS Amplify Console
2. App Settings → General
3. Scroll down to "Delete app"
4. **STOP!** Don't delete yet

Instead:

1. Go to Build settings
2. Click "Edit"
3. Add this to amplify.yml:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - rm -rf node_modules package-lock.json .next
        - npm install
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
      - .next/cache/**/*
```

4. Save
5. Trigger new build

---

## 🎯 Final Checklist

Before giving up:

- [ ] AWS build succeeded (green checkmark)
- [ ] All 5 environment variables added correctly
- [ ] MongoDB Atlas cluster is ACTIVE
- [ ] MongoDB Network Access allows 0.0.0.0/0
- [ ] Admin user exists in MongoDB database
- [ ] Browser cache cleared / using incognito
- [ ] Waited 5-10 minutes after latest deployment
- [ ] Tested in fresh browser window
- [ ] Checked build logs for errors

---

## 📞 Still Not Working?

Share these details:

1. **AWS Build Status:** Success/Failed?
2. **Build Log Errors:** Any red errors in build logs?
3. **Environment Variables:** Screenshot of all 5 variables
4. **MongoDB Status:** Cluster active? Network access allowed?
5. **Browser Console:** Any errors? (Press F12)

---

## ✅ SUCCESS CRITERIA

When everything works:

1. ✅ AWS build shows green checkmark
2. ✅ Login page loads without errors
3. ✅ Can login with:
   - Email: admin@cyberprobes.com
   - Password: admin123
4. ✅ Redirects to dashboard after login
5. ✅ Dashboard loads properly

---

Good luck! 🚀

