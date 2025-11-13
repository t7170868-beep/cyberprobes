# 🔧 Amplify Environment Variables Setup Guide

## ❌ Problem: SSM Secrets Setup Failed

**Build Log Shows:**
```
---- Setting Up SSM Secrets ----
SSM params {"Path":"/amplify/d1ce8jq8iz0ibb/main/","WithDecryption":true}
!Failed to set up process.env.secrets
```

**What This Means:**
- AWS Amplify tried to fetch secrets from SSM Parameter Store
- SSM path is empty or has permission issues
- Environment variables may be missing at runtime (even if build shows them)

**Result:**
- `process.env.*` variables undefined at runtime
- NextAuth, Prisma, and API routes crash → 500 Internal Server Error

---

## ✅ Solution: Manual Environment Variables Setup

### Step 1: Go to Amplify Console

1. Open: **AWS Amplify Console**
2. Select your app: **cyberprobes**
3. Go to: **App Settings → Environment Variables**

### Step 2: Add/Verify All Required Variables

Add these **EXACT** variables (no quotes, no spaces):

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `postgresql://cyber_admin:CyberProbes2025!DB%23@cyberprobes-db.cluster-czis8ka6oj05.eu-north-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require` |
| `NEXTAUTH_SECRET` | `cyberprobes-secret-2024-production-key-v1` |
| `NEXTAUTH_URL` | `https://main.d1ce8jq8iz0ibb.amplifyapp.com` |
| `JWT_SECRET` | `jwt-secret-key-cyberprobes-123` |
| `NEXT_PUBLIC_BASE_URL` | `https://main.d1ce8jq8iz0ibb.amplifyapp.com` |
| `NODE_ENV` | `production` |

### Step 3: Important Notes

⚠️ **Critical Rules:**
- ❌ **NO quotes** around values
- ❌ **NO spaces** before/after `=`
- ❌ **NO trailing slashes** in URLs
- ✅ Use **exact variable names** (case-sensitive)
- ✅ `DATABASE_URL` must include `?sslmode=require` at the end

### Step 4: Save and Redeploy

1. Click **"Save"** button
2. Go to **Deployments** tab
3. Click **"Redeploy this version"**
4. Wait for deployment to complete

---

## 🔍 Verification Steps

### 1. Check Build Logs

After redeploy, look for:
```
✅ DATABASE_URL starts with: postgresql://cyber_admin:CyberProbes2025
```

If this appears → Variables are available during build ✅

### 2. Test Runtime (After Deployment)

**Test Session Endpoint:**
```
https://main.d1ce8jq8iz0ibb.amplifyapp.com/api/auth/session
```

**Expected:**
- ✅ Returns `{}` (empty object) if not logged in
- ❌ Returns `500` if env vars missing

**Test Login Page:**
```
https://main.d1ce8jq8iz0ibb.amplifyapp.com/auth/login
```

**Expected:**
- ✅ Page loads without errors
- ❌ Shows error if env vars missing

### 3. Check Browser Console

1. Open website
2. Press **F12** (DevTools)
3. Go to **Console** tab
4. Look for errors:
   - ❌ `NEXTAUTH_SECRET environment variable is required`
   - ❌ `DATABASE_URL` connection errors
   - ❌ `500 Internal Server Error`

---

## 🧩 Alternative: Use SSM Parameter Store (Advanced)

If you want to use SSM instead of manual variables:

### Step 1: Check Current SSM Parameters

```bash
aws ssm get-parameters-by-path \
  --path "/amplify/d1ce8jq8iz0ibb/main/" \
  --with-decryption
```

### Step 2: Add Parameters to SSM

```bash
# DATABASE_URL
aws ssm put-parameter \
  --name "/amplify/d1ce8jq8iz0ibb/main/DATABASE_URL" \
  --value "postgresql://cyber_admin:CyberProbes2025!DB%23@cyberprobes-db.cluster-czis8ka6oj05.eu-north-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require" \
  --type SecureString

# NEXTAUTH_SECRET
aws ssm put-parameter \
  --name "/amplify/d1ce8jq8iz0ibb/main/NEXTAUTH_SECRET" \
  --value "cyberprobes-secret-2024-production-key-v1" \
  --type SecureString

# NEXTAUTH_URL
aws ssm put-parameter \
  --name "/amplify/d1ce8jq8iz0ibb/main/NEXTAUTH_URL" \
  --value "https://main.d1ce8jq8iz0ibb.amplifyapp.com" \
  --type SecureString

# JWT_SECRET
aws ssm put-parameter \
  --name "/amplify/d1ce8jq8iz0ibb/main/JWT_SECRET" \
  --value "jwt-secret-key-cyberprobes-123" \
  --type SecureString

# NEXT_PUBLIC_BASE_URL
aws ssm put-parameter \
  --name "/amplify/d1ce8jq8iz0ibb/main/NEXT_PUBLIC_BASE_URL" \
  --value "https://main.d1ce8jq8iz0ibb.amplifyapp.com" \
  --type String
```

### Step 3: Verify IAM Permissions

Amplify needs permission to read SSM parameters:
- Check IAM role for Amplify
- Ensure `ssm:GetParameters` and `ssm:GetParameter` permissions

**Note:** Manual setup (Option 1) is **easier and recommended** for most cases.

---

## 📋 Complete Environment Variables Checklist

After setup, verify all are present:

- [ ] `DATABASE_URL` - PostgreSQL connection string with `?sslmode=require`
- [ ] `NEXTAUTH_SECRET` - 32+ character secret
- [ ] `NEXTAUTH_URL` - Complete Amplify URL (no trailing slash)
- [ ] `JWT_SECRET` - JWT signing secret
- [ ] `NEXT_PUBLIC_BASE_URL` - Same as NEXTAUTH_URL
- [ ] `NODE_ENV` - Set to `production`

---

## 🚨 Common Mistakes

1. **Variable Name Typos:**
   - ❌ `NEXT_AUTH_SECRET` (missing 'T')
   - ✅ `NEXTAUTH_SECRET`

2. **Quotes Around Values:**
   - ❌ `NEXTAUTH_SECRET="value"`
   - ✅ `NEXTAUTH_SECRET=value`

3. **Spaces Around Equals:**
   - ❌ `NEXTAUTH_SECRET = value`
   - ✅ `NEXTAUTH_SECRET=value`

4. **Incomplete URLs:**
   - ❌ `NEXTAUTH_URL=https://main.d1ce8jq8iz0ibb.am`
   - ✅ `NEXTAUTH_URL=https://main.d1ce8jq8iz0ibb.amplifyapp.com`

5. **Missing SSL Mode:**
   - ❌ `DATABASE_URL=postgresql://.../cyberprobes`
   - ✅ `DATABASE_URL=postgresql://.../cyberprobes?sslmode=require`

---

## ✅ Summary

| Issue | Root Cause | Fix |
|-------|------------|-----|
| 500 Login Error | Missing `process.env` vars at runtime | Add env vars in Amplify Console manually |
| !Failed to set up process.env.secrets | SSM path empty or missing permissions | Add env manually (recommended) or fix SSM |
| NextAuth crash | Missing `NEXTAUTH_SECRET` or `DATABASE_URL` | Add these properly in Amplify Console |
| Build passes, runtime fails | Env vars available at build but not runtime | Ensure variables are set in Amplify Console (not just SSM) |

---

## 🎯 Quick Fix Steps

1. **Amplify Console** → **App Settings** → **Environment Variables**
2. **Add/Update** all 6 required variables (see table above)
3. **Save**
4. **Redeploy** → **Deployments** → **"Redeploy this version"**
5. **Wait** for deployment (10-15 minutes)
6. **Test** website and login functionality

---

## 💡 Pro Tip

After adding variables, you can verify they're being read by checking the build logs for:
```
DATABASE_URL starts with: postgresql://cyber_admin:CyberProbes2025
```

If this appears, variables are being read correctly ✅

