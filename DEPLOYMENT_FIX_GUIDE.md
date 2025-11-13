# 🚨 Website Deploy Nah Ho Rahi - Complete Fix Guide

## 🔍 Step 1: Check AWS Amplify Build Status

1. **AWS Amplify Console kholo:**
   - https://console.aws.amazon.com/amplify/
   - Apni app select karo
   - **Deployments** tab pe jao

2. **Latest build check karo:**
   - Status kya hai? (Building / Failed / Succeeded)
   - Agar **Failed** hai, to **View logs** pe click karo
   - Error messages copy karo

## ⚠️ Most Common Issues & Fixes

### Issue 1: Environment Variables Missing ❌

**Symptoms:**
- Build fails with "DATABASE_URL not found"
- "PrismaClientInitializationError"
- Blank page after deployment

**Fix:**
1. AWS Amplify Console → **App settings** → **Environment variables**
2. Ye **EXACT** values add/update karo:

```
DATABASE_URL=postgresql://cyber_admin:CyberProbes2025%21DB%23@cyberprobes-db.cluster-czis8ka6oj05.eu-north-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require

JWT_SECRET=jwt-secret-key-cyberprobes-123

NEXTAUTH_SECRET=cyberprobes-secret-2024-production-key-v1

NEXTAUTH_URL=https://main.d1ce8jq8iz0ibb.amplifyapp.com

NEXT_PUBLIC_BASE_URL=https://main.d1ce8jq8iz0ibb.amplifyapp.com

NODE_ENV=production
```

3. **Save** karo
4. **Redeploy** karo

### Issue 2: Build Fails - TypeScript Errors ❌

**Symptoms:**
- Build logs mein TypeScript errors
- "Type error: ..."

**Fix:**
- Already fixed! All type declarations installed
- Check `amplify.yml` has type installation commands

### Issue 3: Prisma Client Not Generated ❌

**Symptoms:**
- "Cannot find module '@prisma/client'"
- Build fails during `npm run build`

**Fix:**
- Already fixed! `amplify.yml` has `npx prisma generate`
- Verify in build logs: `✔ Generated Prisma Client`

### Issue 4: Database Connection Failed ❌

**Symptoms:**
- "PrismaClientInitializationError"
- "Can't reach database server"

**Fix:**
1. **AWS RDS Console** check karo:
   - RDS → Databases → Your DB
   - **Connectivity & security** tab
   - **Publicly accessible** = **Yes** hona chahiye

2. **Security Group** check karo:
   - Inbound rules → Port **5432** open hona chahiye
   - Source: **0.0.0.0/0** (for testing)

## 🔧 Quick Diagnostic Steps

### Step 1: Check Build Logs
```
AWS Amplify → Deployments → Latest Build → View Logs
```

Look for:
- ✅ `✔ Generated Prisma Client` - Good!
- ✅ `✓ Compiled successfully` - Good!
- ❌ `PrismaClientInitializationError` - Database issue
- ❌ `DATABASE_URL not found` - Env var missing
- ❌ `Type error` - TypeScript issue

### Step 2: Verify Environment Variables
```
AWS Amplify → App settings → Environment variables
```

Check all 6 variables are present:
- [ ] DATABASE_URL
- [ ] JWT_SECRET
- [ ] NEXTAUTH_SECRET
- [ ] NEXTAUTH_URL
- [ ] NEXT_PUBLIC_BASE_URL
- [ ] NODE_ENV

### Step 3: Test Database Connection
```bash
# If you have psql installed locally
psql -h cyberprobes-db.cluster-czis8ka6oj05.eu-north-1.rds.amazonaws.com -U cyber_admin -d cyberprobes
```

## 🚀 Force Redeploy

Agar sab kuch theek hai but still deploy nahi ho raha:

1. **AWS Amplify Console** → **Deployments**
2. Latest deployment pe click karo
3. **Redeploy this version** button click karo
4. Wait 10-15 minutes

## 📋 Complete Checklist

Before asking for help, verify:

- [ ] All 6 environment variables set in Amplify
- [ ] DATABASE_URL password is URL-encoded (`%21` for `!`, `%23` for `#`)
- [ ] NEXTAUTH_URL is complete (includes `.amplifyapp.com`)
- [ ] RDS is publicly accessible
- [ ] Security group allows port 5432
- [ ] Build logs show "Generated Prisma Client"
- [ ] Build logs show "Compiled successfully"
- [ ] No TypeScript errors in build logs
- [ ] Code pushed to GitHub (git status clean)

## 🆘 Still Not Working?

**Share these details:**

1. **Build Logs** (last 50 lines)
2. **Environment Variables** (variable names only, not values)
3. **RDS Status** (Available / Not available)
4. **Error Message** (exact text from browser console)

---

**Main sab kuch fix kar dunga!** 🚀

