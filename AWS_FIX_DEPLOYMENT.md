# 🔧 AWS Amplify Deployment Fix - Step by Step

## ⚠️ PROBLEM
AWS pe deploy kiya hai but login ya database issues aa rahe hain.

## ✅ SOLUTION
Environment variables AWS Amplify mein set karne hain.

---

## 📋 Step-by-Step Fix Guide

### STEP 1: AWS Amplify Console Mein Jao

1. Browser mein jao: **https://console.aws.amazon.com/amplify/**
2. Login karo (agar already login nahi ho)
3. Apni app select karo: **cyberprobes-site** (ya jo bhi naam rakha hai)

---

### STEP 2: Environment Variables Section Kholo

1. Left sidebar mein **"App settings"** section dhundo
2. **"Environment variables"** click karo
3. Ya direct **"Environment variables"** tab pe jao (top mein tabs honge)

---

### STEP 3: Ye Environment Variables Add/Update Karo

**⚠️ IMPORTANT: Ye exact values copy karke paste karo!**

#### Variable 1: DATABASE_URL
```
Key: DATABASE_URL
Value: mongodb+srv://t7170868_db_user:admin123@cluster0.pnugpz0.mongodb.net/cyberprobes?retryWrites=true&w=majority
```

#### Variable 2: NEXTAUTH_SECRET
```
Key: NEXTAUTH_SECRET
Value: cyberprobes-secret-key-12345678901234567890123456789012
```

#### Variable 3: NEXTAUTH_URL
```
Key: NEXTAUTH_URL
Value: [AAPKI AMPLIFY APP URL]
```
**Note:** Ye aapki Amplify app ka URL hoga, jaise:
- `https://main.d123456789.amplifyapp.com`
- Ya custom domain agar set kiya hai

#### Variable 4: NODE_ENV
```
Key: NODE_ENV
Value: production
```

#### Variable 5: JWT_SECRET
```
Key: JWT_SECRET
Value: jwt-secret-key-cyberprobes-12345678901234567890
```

---

### STEP 4: Save Karo

1. **"Save"** button click karo
2. Confirmation popup aayegi - **"Yes"** click karo

---

### STEP 5: Redeploy Karo

Environment variables save karne ke baad:

**Option A: Automatic Redeploy**
- AWS Amplify automatically redeploy start kar dega (wait karo 5-10 min)

**Option B: Manual Redeploy**
1. **"Deployments"** tab pe jao
2. **"Redeploy this version"** button click karo

---

### STEP 6: Wait Karo (Build Complete Hone Tak)

1. **"Deployments"** tab mein jao
2. Current deployment status dikhayi dega:
   - 🔵 **Provision** → Starting
   - 🟡 **Build** → Running
   - 🟢 **Deploy** → Deploying
   - ✅ **Verify** → Success!

**Wait karo jab tak ✅ green checkmark na dikhaye (5-10 minutes)**

---

### STEP 7: Test Karo!

Build complete hone ke baad:

1. Aapki app URL pe jao (jaise: `https://main.d123456789.amplifyapp.com`)
2. `/auth/login` page kholo
3. Login karo:
   - Email: `admin@cyberprobes.com`
   - Password: `admin123`

✅ **Login ho jana chahiye!**

---

## 🔍 NEXTAUTH_URL Kaise Dhundhein?

Agar NEXTAUTH_URL pata nahi hai:

1. AWS Amplify console mein
2. Aapki app pe click karo
3. Top par **URL dikhega** (copy karo):
   ```
   https://main.d123456789.amplifyapp.com
   ```
4. Ye URL **NEXTAUTH_URL** mein paste karo

---

## 🐛 Build Fail Ho Rahi Hai?

### Error 1: Prisma Generation Failed
**Fix:** `amplify.yml` file check karo

Update karo:
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
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
      - .next/cache/**/*
```

### Error 2: MongoDB Connection Failed
**Check:**
- ✅ DATABASE_URL sahi hai?
- ✅ Password correct hai? (`admin123`)
- ✅ MongoDB Atlas mein Network Access allowed hai?
- ✅ Database name `/cyberprobes` add kiya hai?

### Error 3: NextAuth Error
**Check:**
- ✅ NEXTAUTH_SECRET set hai?
- ✅ NEXTAUTH_URL production URL hai (https://)
- ✅ JWT_SECRET set hai?

---

## 📝 Complete Environment Variables List

Copy-paste ready format:

```
DATABASE_URL=mongodb+srv://t7170868_db_user:admin123@cluster0.pnugpz0.mongodb.net/cyberprobes?retryWrites=true&w=majority
NEXTAUTH_SECRET=cyberprobes-secret-key-12345678901234567890123456789012
NEXTAUTH_URL=https://main.dXXXXXXXXX.amplifyapp.com
NODE_ENV=production
JWT_SECRET=jwt-secret-key-cyberprobes-12345678901234567890
```

⚠️ **NEXTAUTH_URL mein apna actual URL daalo!**

---

## 🎯 Quick Checklist

- [ ] AWS Amplify console khola
- [ ] App select kiya
- [ ] Environment variables section khola
- [ ] Saare 5 variables add kiye:
  - [ ] DATABASE_URL (MongoDB connection string)
  - [ ] NEXTAUTH_SECRET
  - [ ] NEXTAUTH_URL (production URL)
  - [ ] NODE_ENV (production)
  - [ ] JWT_SECRET
- [ ] Save kiya
- [ ] Redeploy triggered
- [ ] Build complete hone ka wait kiya
- [ ] Website test kiya
- [ ] ✅ Login successful!

---

## 📞 Still Issues?

### Check Build Logs
1. AWS Amplify console
2. Current deployment pe click karo
3. **"Build logs"** tab kholo
4. Error dhundo

### Check Application Logs
1. AWS CloudWatch logs check karo
2. Ya Amplify console mein **"Monitoring"** tab

### Common Issues:

**"Module not found" error:**
- `npm ci` run ho raha hai build mein? Check amplify.yml
- All dependencies `package.json` mein hain?

**"Prisma Client not generated":**
- preBuild mein `npx prisma generate` hai?
- DATABASE_URL environment variable set hai?

**"Authentication failed":**
- NEXTAUTH_SECRET set hai AWS mein?
- NEXTAUTH_URL correct hai (https:// ke saath)?

---

## 🎉 Success Signs

✅ Build succeeds without errors  
✅ Website loads properly  
✅ Login page shows up  
✅ Can login with admin credentials  
✅ Dashboard accessible  
✅ MongoDB data visible  

---

**Total Fix Time:** 10-15 minutes  
**Main Fix:** Environment variables set karna AWS Amplify mein

🚀 **Good luck!**

