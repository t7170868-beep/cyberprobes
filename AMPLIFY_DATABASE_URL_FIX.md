# 🔧 Fix: DATABASE_URL with Special Characters in Amplify

## ❌ Problem

Prisma validation error:
```
Error validating datasource `db`: the URL must start with the protocol `postgresql://` or `postgres://`
```

Even though logs show:
```
DATABASE_URL starts with: postgresql://cyber_admin:CyberProbes2025
```

## 🔍 Root Cause

AWS Amplify misinterprets special characters (`!`, `%`, `#`, `@`) in environment variables when they're stored without proper quoting.

Your DATABASE_URL contains:
- `!` (exclamation mark)
- `%23` (URL-encoded `#`)
- `@` (at symbol)

These characters cause Amplify's env parser to truncate or corrupt the value.

## ✅ Solution

### Step 1: Re-enter DATABASE_URL in Amplify Console

1. Go to: **AWS Amplify Console → App Settings → Environment Variables**

2. **Delete** the existing `DATABASE_URL` variable

3. **Add new** `DATABASE_URL` with **single quotes** around the value:

   ```
   Key: DATABASE_URL
   Value: 'postgresql://cyber_admin:CyberProbes2025!DB%23@cyberprobes-db.cluster-czis8ka6oj05.eu-north-1.rds.amazonaws.com:5432/cyberprobes'
   ```

   ⚠️ **IMPORTANT:** Include the single quotes `'...'` - Amplify will store it as literal and not interpret special characters.

### Step 2: Verify All Environment Variables

Make sure these are all set in Amplify Console:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `'postgresql://cyber_admin:CyberProbes2025!DB%23@cyberprobes-db.cluster-czis8ka6oj05.eu-north-1.rds.amazonaws.com:5432/cyberprobes'` |
| `NEXTAUTH_URL` | `https://main.d1ce8jq8iz0ibb.amplifyapp.com` |
| `NEXTAUTH_SECRET` | `cyberprobes-secret-2024-production-key-v1` |
| `JWT_SECRET` | `jwt-secret-key-cyberprobes-123` |
| `NEXT_PUBLIC_BASE_URL` | `https://main.d1ce8jq8iz0ibb.amplifyapp.com` |
| `NODE_ENV` | `production` |

### Step 3: Redeploy

1. In Amplify Console → **Deployments** tab
2. Click **"Redeploy this version"**
3. Wait for build to complete

### Step 4: Verify in Build Logs

Look for these lines in build logs:

✅ **Success indicators:**
```
DATABASE_URL starts with: postgresql://cyber_admin:CyberProbes2025
✔ Generated Prisma Client
The database is already in sync with the Prisma schema.
```

❌ **If you still see errors:**
- Check that single quotes are included in DATABASE_URL value
- Verify the password encoding: `!` stays as `!`, `%23` stays as `%23`
- Make sure there are no extra spaces before/after the value

## 🧪 Local Testing (Optional)

To verify your Prisma schema is correct, run locally:

```bash
npx prisma db push
```

If it works locally, the issue is purely how Amplify reads the env variable.

## 📋 Prisma Schema Verification

Your `prisma/schema.prisma` should have:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

✅ Must say `"postgresql"` (not `"postgres"`)

## 💡 Why Single Quotes Work

- Single quotes prevent shell interpretation of special characters
- Amplify stores the value literally, including all special characters
- Prisma receives the complete, unmodified connection string

## 🚨 Common Mistakes

1. ❌ **No quotes:** `postgresql://...` → Special chars get interpreted
2. ❌ **Double quotes:** `"postgresql://..."` → Still gets interpreted
3. ✅ **Single quotes:** `'postgresql://...'` → Stored as literal

## 📝 Summary

| Issue | Cause | Fix |
|-------|-------|-----|
| Prisma validation P1012 | Amplify misinterprets `!` and `%` in DATABASE_URL | Wrap DATABASE_URL in single quotes `' '` |
| !Failed to set up process.env.secrets | Amplify tries to use SSM (safe to ignore) | No action needed if vars visible in logs |
| postgresql:// validation | Correct - Prisma expects this prefix | No change needed |

