# 🔧 Fix: 500 Internal Server Error on Login

## ❌ Problem
After successful deployment, login shows:
```
500 Internal Server Error
```

## 🔍 Root Cause
Build logs show these variables are **MISSING**:
- ❌ `NEXTAUTH_URL` - WARNING - not set
- ❌ `JWT_SECRET` - WARNING - not set

**Even though build succeeded, these variables are needed at RUNTIME for login to work!**

---

## ✅ IMMEDIATE FIX

### Step 1: Add Missing Variables in Amplify Console

1. Go to: **AWS Amplify Console** → **App Settings** → **Environment Variables**

2. **Add these 2 missing variables:**

   ```
   NEXTAUTH_URL=https://main.d1ce8jq8iz0ibb.amplifyapp.com
   JWT_SECRET=jwt-secret-key-cyberprobes-123
   ```

3. **Important:**
   - ❌ NO quotes around values
   - ❌ NO spaces before/after `=`
   - ✅ Exact variable names (case-sensitive)
   - ✅ Complete URL (no trailing slash)

4. Click **"Save"**

### Step 2: Redeploy

1. Go to **Deployments** tab
2. Click **"Redeploy this version"**
3. Wait for deployment to complete (~5-10 minutes)

### Step 3: Verify Variables at Runtime

After deployment, visit:
```
https://main.d1ce8jq8iz0ibb.amplifyapp.com/api/debug/env
```

**Expected result:**
```json
{
  "status": "OK",
  "criticalVariables": {
    "NEXTAUTH_SECRET": "SET",
    "DATABASE_URL": "SET",
    "NEXTAUTH_URL": "SET",
    "JWT_SECRET": "SET",
    "NEXT_PUBLIC_BASE_URL": "SET",
    "NODE_ENV": "production"
  }
}
```

**If any show "MISSING", they're not set correctly in Amplify Console.**

---

## 📋 Complete Variable Checklist

All 6 variables **MUST** be set:

| Variable | Status | Value |
|----------|--------|-------|
| `DATABASE_URL` | ✅ SET | `postgresql://cyber_admin:CyberProbes2025!DB%23@...` |
| `NEXTAUTH_SECRET` | ✅ SET | `cyberprobes-secret-2024-production-key-v1` |
| `NEXTAUTH_URL` | ❌ **MISSING** | `https://main.d1ce8jq8iz0ibb.amplifyapp.com` |
| `JWT_SECRET` | ❌ **MISSING** | `jwt-secret-key-cyberprobes-123` |
| `NEXT_PUBLIC_BASE_URL` | ✅ SET | `https://main.d1ce8jq8iz0ibb.amplifyapp.com` |
| `NODE_ENV` | ✅ SET | `production` |

---

## 🔍 Why These Variables Are Critical

### `NEXTAUTH_URL`
- **Required by:** NextAuth for callback URLs
- **Used for:** OAuth redirects, session callbacks
- **Without it:** NextAuth can't generate proper callback URLs → 500 error

### `JWT_SECRET`
- **Required by:** JWT token signing (if used separately)
- **Used for:** Token encryption/decryption
- **Without it:** JWT operations may fail → 500 error

---

## 🧪 Debug Steps

### 1. Check Runtime Variables
Visit: `/api/debug/env`

### 2. Check CloudWatch Logs
1. AWS Amplify Console → **Monitoring** → **Logs**
2. Look for `[NextAuth]` or `[auth]` error messages
3. Check which variables are shown as MISSING

### 3. Check Browser Console
1. Open website
2. Press **F12** → **Console** tab
3. Try to login
4. Look for error messages

### 4. Check Network Tab
1. Press **F12** → **Network** tab
2. Try to login
3. Look for failed requests to `/api/auth/*`
4. Check response body for error details

---

## ✅ Expected Result After Fix

1. **All variables SET** in Amplify Console
2. **Redeploy completed**
3. **`/api/debug/env` shows `status: "OK"`**
4. **Login works** without 500 error
5. **User redirected** after successful login

---

## 🚨 Common Mistakes

### ❌ Wrong Variable Name
- `NEXT_AUTH_URL` (wrong - missing 'T')
- `NEXTAUTHURL` (wrong - missing underscore)
- ✅ `NEXTAUTH_URL` (correct)

### ❌ Quotes Around Value
- `NEXTAUTH_URL="https://..."` (wrong)
- ✅ `NEXTAUTH_URL=https://...` (correct)

### ❌ Trailing Slash
- `NEXTAUTH_URL=https://main.d1ce8jq8iz0ibb.amplifyapp.com/` (wrong)
- ✅ `NEXTAUTH_URL=https://main.d1ce8jq8iz0ibb.amplifyapp.com` (correct)

### ❌ Spaces Around `=`
- `NEXTAUTH_URL = https://...` (wrong)
- ✅ `NEXTAUTH_URL=https://...` (correct)

---

## 💡 Quick Test

After adding variables and redeploying:

1. Visit: `https://main.d1ce8jq8iz0ibb.amplifyapp.com/api/debug/env`
2. Should see all variables as "SET"
3. Try login
4. Should work without 500 error

---

## 📞 Still Not Working?

If 500 error persists after adding variables:

1. **Double-check variable names** (case-sensitive)
2. **Verify no quotes/spaces** in values
3. **Check CloudWatch logs** for specific error
4. **Test `/api/debug/env`** to confirm variables are available at runtime
5. **Clear browser cache** and try again

**The most common issue is variables not being saved correctly in Amplify Console!**

