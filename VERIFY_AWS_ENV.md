# AWS Environment Variables - Final Verification

## ⚠️ Problem
Admin user database mein hai but login nahi ho raha.

## 🔍 Root Cause
AWS Amplify environment variables properly load nahi ho rahe production mein.

---

## ✅ FINAL FIX - Complete Environment Variables Reset

### STEP 1: AWS Amplify Console Mein Jao
```
https://console.aws.amazon.com/amplify/
```

### STEP 2: Environment Variables Section Kholo
1. Apni app (cyberprobes) select karo
2. Left sidebar → App settings → Environment variables

### STEP 3: SAARE Variables DELETE Karo
Pehle saare existing variables **DELETE** karo (clean slate ke liye)

### STEP 4: Naye Variables ADD Karo (Ek-ek karke)

**Variable 1:**
```
Key: DATABASE_URL
Value: mongodb+srv://t7170868_db_user:admin123@cluster0.pnugpz0.mongodb.net/cyberprobes?retryWrites=true&w=majority
```

**Variable 2:**
```
Key: NEXTAUTH_SECRET
Value: cyberprobes-secret-key-production-2025-do-not-share-this-secret-key-with-anyone
```

**Variable 3:**
```
Key: NEXTAUTH_URL
Value: https://main.d1ce8jq8iz0ibb.amplifyapp.com
```

**Variable 4:**
```
Key: NODE_ENV
Value: production
```

**Variable 5:**
```
Key: JWT_SECRET
Value: jwt-secret-key-cyberprobes-production-2025-keep-this-secret
```

### STEP 5: Save Karo
"Save" button click karo

### STEP 6: Build Settings Update Karo

1. Left sidebar → App settings → Build settings
2. "Edit" button click karo
3. Ye YAML paste karo:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - env | grep -E 'DATABASE_URL|NEXTAUTH' || echo "Env vars check"
        - rm -rf node_modules/.cache
        - rm -rf .next
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

4. "Save" click karo

### STEP 7: Force Complete Rebuild

1. Deployments tab mein jao
2. Latest deployment par click karo
3. "Redeploy this version" click karo
4. **IMPORTANT:** Wait karo 10-15 minutes (patience!)

### STEP 8: Build Logs Check Karo

Build complete hone ke baad:
1. Deployment par click karo
2. "Build logs" tab kholo
3. Search karo: "NEXTAUTH_URL"
4. Verify karo environment variable load ho raha hai

### STEP 9: Test Karo

**9.1: API Debug Endpoint**
```
https://main.d1ce8jq8iz0ibb.amplifyapp.com/api/debug
```

**9.2: Fresh Browser (Incognito)**
```
https://main.d1ce8jq8iz0ibb.amplifyapp.com/auth/login
```

Credentials:
- Email: admin@cyberprobes.com
- Password: admin123

---

## 🚨 Alternative Solution (If Still Not Working)

### Option A: Create Admin Via MongoDB Atlas UI

1. MongoDB Atlas → Browse Collections
2. Database: `cyberprobes`
3. Collection: `User`
4. Insert Document:

```json
{
  "name": "Admin User",
  "email": "admin@cyberprobes.com",
  "password": "$2b$10$N9qo8uLOickgx2ZMRZoZqeQxuBKpF5XqL8pIwZt0jq4TkOzK2TJ0G",
  "role": "ADMIN",
  "createdAt": {"$date": {"$numberLong": "1729900800000"}},
  "updatedAt": {"$date": {"$numberLong": "1729900800000"}}
}
```

(Password hash = admin123)

### Option B: Use Different Password

Try with stronger password:
- Email: admin@cyberprobes.com  
- Password: Admin@123!

Update in MongoDB Atlas User collection if needed.

---

## 📊 Checklist

- [ ] All 5 environment variables added in AWS Amplify
- [ ] Variables saved successfully
- [ ] Build settings updated (amplify.yml)
- [ ] Redeploy triggered
- [ ] Build completed successfully (green checkmark)
- [ ] Wait 10-15 minutes after build
- [ ] Browser cache cleared / using incognito
- [ ] Tested /api/debug endpoint
- [ ] Tested login with correct credentials
- [ ] Checked browser console for errors (F12)

---

## 🆘 If Nothing Works

Share these screenshots:
1. AWS Amplify Environment Variables page
2. AWS Build Logs (full)
3. Browser Console errors (F12 → Console tab)
4. API Debug response (/api/debug)

Then we can do deeper debugging!

---

Good luck! 🚀

