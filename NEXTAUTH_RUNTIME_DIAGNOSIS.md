# 🔍 NextAuth Runtime Error Diagnosis Guide

## ❌ Common Symptoms

- Login/Signup shows 500 Internal Server Error
- Console shows `/api/auth/error` returning 500
- `/api/auth/session` returns 500
- Build succeeds but runtime fails

## 🧩 Root Causes & Fixes

### 1️⃣ NEXTAUTH_SECRET Missing or Incorrect

**Symptoms:**
- Login page loads but submit fails with 500
- `/api/auth/error` returns 500
- Build passes but runtime fails

**Diagnosis:**
Check Amplify Console → Environment Variables:
```
NEXTAUTH_SECRET=cyberprobes-secret-2024-production-key-v1
NEXTAUTH_URL=https://main.d1ce8jq8iz0ibb.amplifyapp.com
```

**Common Mistakes:**
- ❌ `NEXT_AUTH_SECRET` (wrong name - missing 'T')
- ❌ Extra spaces: `NEXTAUTH_SECRET = value` (should be `NEXTAUTH_SECRET=value`)
- ❌ Quotes around value: `NEXTAUTH_SECRET="value"` (should be `NEXTAUTH_SECRET=value`)

**Fix:**
1. Go to Amplify Console → App Settings → Environment Variables
2. Verify exact variable name: `NEXTAUTH_SECRET` (not `NEXT_AUTH_SECRET`)
3. Ensure value has no quotes: `cyberprobes-secret-2024-production-key-v1`
4. No spaces before/after `=`
5. Redeploy

**Generate New Secret (if needed):**
```bash
openssl rand -base64 32
```
Then update in Amplify Console.

---

### 2️⃣ Database Connection Fails (RDS/Prisma)

**Symptoms:**
- Prisma build succeeds
- Runtime `/api/auth/session` returns 500
- `/api/auth/signin` returns 500
- Database connection errors in logs

**Diagnosis:**
Check `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  ✅ Must be "postgresql" not "postgres"
  url      = env("DATABASE_URL")
}
```

**Fix:**
1. Verify `DATABASE_URL` in Amplify Console includes SSL:
   ```
   postgresql://cyber_admin:CyberProbes2025!DB%23@cyberprobes-db.cluster-czis8ka6oj05.eu-north-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require
   ```

2. Ensure `?sslmode=require` is at the end (required for RDS)

3. Verify password encoding:
   - `!` stays as `!` (or use `%21`)
   - `#` should be `%23`

4. Redeploy

---

### 3️⃣ NEXTAUTH_URL Wrong Domain

**Symptoms:**
- Login screen loads
- Credentials submit → `/api/auth/error` 500
- Redirect loops

**Diagnosis:**
Check Amplify Console:
```
NEXTAUTH_URL=https://main.d1ce8jq8iz0ibb.amplifyapp.com
NEXT_PUBLIC_BASE_URL=https://main.d1ce8jq8iz0ibb.amplifyapp.com
```

**Common Mistakes:**
- ❌ Incomplete: `https://main.d1ce8jq8iz0ibb.am` (missing `.plifyapp.com`)
- ❌ Wrong domain: `https://localhost:3000` (should be Amplify URL)
- ❌ Trailing slash: `https://main.d1ce8jq8iz0ibb.amplifyapp.com/` (remove `/`)

**Fix:**
1. Use complete Amplify URL: `https://main.d1ce8jq8iz0ibb.amplifyapp.com`
2. No trailing slash
3. Must be HTTPS
4. Both `NEXTAUTH_URL` and `NEXT_PUBLIC_BASE_URL` should match

---

## 🧰 Debug Mode (Temporary)

Enable NextAuth debug mode to see detailed errors:

**Add to Amplify Console → Environment Variables:**
```
NEXTAUTH_DEBUG=true
```

**Then check:**
1. Browser Console → Network tab
2. Find `/api/auth/error` request
3. Check Response tab for detailed error message
4. Look for Prisma or JWT errors

**Remove after debugging** (security best practice)

---

## ✅ Verification Checklist

After fixing, verify:

- [ ] `NEXTAUTH_SECRET` is set (no quotes, no spaces)
- [ ] `NEXTAUTH_URL` is complete Amplify URL (no trailing slash)
- [ ] `DATABASE_URL` includes `?sslmode=require`
- [ ] `NEXT_PUBLIC_BASE_URL` matches `NEXTAUTH_URL`
- [ ] All variables have no quotes around values
- [ ] No extra spaces before/after `=`
- [ ] Redeployed after changes

---

## 🔍 Quick Test

1. **Test Session Endpoint:**
   ```
   https://main.d1ce8jq8iz0ibb.amplifyapp.com/api/auth/session
   ```
   Should return `{}` (empty object) if not logged in, not 500

2. **Test Login Page:**
   ```
   https://main.d1ce8jq8iz0ibb.amplifyapp.com/auth/login
   ```
   Should load without errors

3. **Check Browser Console:**
   - F12 → Console tab
   - Look for red errors
   - Network tab → Check `/api/auth/*` requests

---

## 📋 Environment Variables Reference

**Required Variables:**
```
DATABASE_URL=postgresql://cyber_admin:CyberProbes2025!DB%23@cyberprobes-db.cluster-czis8ka6oj05.eu-north-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require
NEXTAUTH_SECRET=cyberprobes-secret-2024-production-key-v1
NEXTAUTH_URL=https://main.d1ce8jq8iz0ibb.amplifyapp.com
JWT_SECRET=jwt-secret-key-cyberprobes-123
NEXT_PUBLIC_BASE_URL=https://main.d1ce8jq8iz0ibb.amplifyapp.com
NODE_ENV=production
```

**Optional (for debugging):**
```
NEXTAUTH_DEBUG=true
```

---

## 🚨 If Still Failing

1. **Check CloudWatch Logs:**
   - Amplify Console → Monitoring → View logs
   - Look for `[auth]` prefixed errors
   - Check for Prisma connection errors

2. **Verify RDS Security:**
   - RDS security group allows Amplify IPs
   - Database is publicly accessible (if needed)
   - SSL is enabled

3. **Test Database Connection:**
   - Use local connection string to verify RDS is accessible
   - Check if password encoding is correct

