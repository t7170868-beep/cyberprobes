# 🚨 CRITICAL FIX: AWS Amplify Environment Variables

## ❌ Issues Found in Your Current Variables

### 1. DATABASE_URL - Password Encoding Error
**Current (WRONG):**
```
postgresql://cyber_admin:CyberProbes2025!DB%23@...
```

**Problem:** `!` character is NOT URL-encoded. It should be `%21`.

**Correct:**
```
postgresql://cyber_admin:CyberProbes2025%21DB%23@cyberprobes-db.cluster-czis8ka6oj05.eu-north-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require
```

### 2. NEXTAUTH_URL - INCOMPLETE URL!
**Current (WRONG):**
```
https://main.d1ce8jq8iz0ibb.am
```

**Problem:** Missing `.plifyapp.com` - This will break authentication!

**Correct:**
```
https://main.d1ce8jq8iz0ibb.amplifyapp.com
```

## ✅ CORRECT Environment Variables (Copy These)

Go to: **AWS Amplify Console → App Settings → Environment variables**

Add/Update these **EXACT** values:

```
DATABASE_URL=postgresql://cyber_admin:CyberProbes2025%21DB%23@cyberprobes-db.cluster-czis8ka6oj05.eu-north-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require

JWT_SECRET=jwt-secret-key-cyberprobes-123

NEXTAUTH_SECRET=cyberprobes-secret-2024-production-key-v1

NEXTAUTH_URL=https://main.d1ce8jq8iz0ibb.amplifyapp.com

NEXT_PUBLIC_BASE_URL=https://main.d1ce8jq8iz0ibb.amplifyapp.com

NODE_ENV=production
```

## 📋 Step-by-Step Fix Instructions

### Step 1: Open AWS Amplify Console
1. Go to: https://console.aws.amazon.com/amplify/
2. Select your app
3. Click **App settings** (left sidebar)
4. Click **Environment variables**

### Step 2: Update DATABASE_URL
1. Find `DATABASE_URL` variable
2. **Delete the old value**
3. **Paste this EXACT value:**
   ```
   postgresql://cyber_admin:CyberProbes2025%21DB%23@cyberprobes-db.cluster-czis8ka6oj05.eu-north-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require
   ```
4. **Important:** Make sure `%21` (not `!`) and `%23` are in the password

### Step 3: Update NEXTAUTH_URL
1. Find `NEXTAUTH_URL` variable
2. **Delete the old value**
3. **Paste this EXACT value:**
   ```
   https://main.d1ce8jq8iz0ibb.amplifyapp.com
   ```
4. **Important:** Must include `.amplifyapp.com` at the end!

### Step 4: Verify All Variables
Check that you have all 6 variables with correct values:
- ✅ `DATABASE_URL` (with `%21` and `%23` in password)
- ✅ `JWT_SECRET`
- ✅ `NEXTAUTH_SECRET`
- ✅ `NEXTAUTH_URL` (complete URL with `.amplifyapp.com`)
- ✅ `NEXT_PUBLIC_BASE_URL` (complete URL)
- ✅ `NODE_ENV=production`

### Step 5: Save and Redeploy
1. Click **Save** button
2. Go to **Deployments** tab
3. Click **Redeploy this version** (or wait for auto-deploy)
4. Wait 10-15 minutes for deployment

## 🔍 How to Verify Fix Worked

After redeploy:

1. **Check Build Logs:**
   - Go to: Deployments → Latest build → View logs
   - Look for: `✔ Generated Prisma Client`
   - Look for: `✓ Compiled successfully`
   - **NO errors** about `DATABASE_URL` or `PrismaClientInitializationError`

2. **Test Website:**
   - Visit: https://main.d1ce8jq8iz0ibb.amplifyapp.com
   - Should load homepage (not blank screen)
   - Try login: https://main.d1ce8jq8iz0ibb.amplifyapp.com/auth/login

3. **Test Login:**
   - Email: `admin@cyberprobes.com`
   - Password: `admin123`
   - Should login successfully (not redirect loop)

## 🚨 If Still Not Working

### Check Build Logs for These Errors:

1. **`PrismaClientInitializationError`**
   - → DATABASE_URL wrong or RDS not accessible
   - Fix: Verify DATABASE_URL format and RDS public access

2. **`Cannot find module '@prisma/client'`**
   - → Prisma not generated
   - Fix: Check `amplify.yml` has `npx prisma generate`

3. **`NEXTAUTH_URL is required`**
   - → NEXTAUTH_URL missing or incomplete
   - Fix: Set complete URL with `.amplifyapp.com`

4. **`Invalid DATABASE_URL`**
   - → Password encoding wrong
   - Fix: Use `%21` for `!` and `%23` for `#`

## 📝 Password Encoding Reference

Your password: `CyberProbes2025!DB#`

Encoded version: `CyberProbes2025%21DB%23`

| Character | Encoded |
|-----------|---------|
| `!` | `%21` |
| `#` | `%23` |

## ✅ Final Checklist

Before redeploy, verify:

- [ ] DATABASE_URL password uses `%21` (not `!`)
- [ ] DATABASE_URL password uses `%23` (not `#`)
- [ ] NEXTAUTH_URL includes `.amplifyapp.com`
- [ ] All 6 variables are set
- [ ] No extra spaces or quotes
- [ ] Clicked "Save" in Amplify console

---

**After fixing these, your website should load properly!** 🚀

