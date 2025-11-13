# 🚀 AWS Amplify Deployment Checklist

## ✅ Pre-Deployment Verification

### 1. Environment Variables (CRITICAL)
Ensure these are set in **AWS Amplify Console → App Settings → Environment variables**:

```
DATABASE_URL=postgresql://cyber_admin:CyberProbes2025%21DB%23@cyberprobes-db.cluster-czis8ka6oj05.eu-north-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require
NEXTAUTH_SECRET=cyberprobes-secret-2024-production-key-v1
NEXTAUTH_URL=https://main.d1ce8jq8iz0ibb.amplifyapp.com
JWT_SECRET=jwt-secret-key-cyberprobes-123
NODE_ENV=production
```

**⚠️ Important:** Password must be URL-encoded (`#` → `%23`, `!` → `%21`)

### 2. Prisma Configuration ✅
- ✅ `amplify.yml` has `npx prisma generate` in preBuild
- ✅ `prisma/schema.prisma` uses `provider = "postgresql"`
- ✅ All ID fields use `@default(uuid())` for PostgreSQL

### 3. Next.js Configuration ✅
- ✅ `next.config.js` uses `output: 'standalone'` (NOT `export`)
- ✅ `serverExternalPackages: ['@prisma/client']` configured
- ✅ No Prisma usage in client components

### 4. AWS RDS Configuration
Verify in AWS RDS Console:
- ✅ **Publicly Accessible:** Yes
- ✅ **Security Group:** Allows inbound on port 5432 from 0.0.0.0/0 (or Amplify IPs)
- ✅ **Database:** `cyberprobes` exists
- ✅ **User:** `cyber_admin` exists with correct password

### 5. Type Declarations ✅
- ✅ `@types/bcrypt` installed
- ✅ `@types/react-google-recaptcha` installed
- ✅ `@types/jsonwebtoken` installed
- ✅ Custom type declarations in `src/types/`

### 6. Build Configuration ✅
- ✅ `amplify.yml` properly configured
- ✅ All type declarations installed in preBuild
- ✅ Prisma generate runs before build

## 🔍 Troubleshooting Blank Page

### If website shows blank page:

1. **Check Amplify Build Logs**
   - Go to: AWS Amplify Console → App → Build Details → View Logs
   - Look for errors like:
     - `PrismaClientInitializationError`
     - `DATABASE_URL not found`
     - `Cannot find module '@prisma/client'`

2. **Verify Environment Variables**
   - Check all 5 variables are set correctly
   - Ensure `DATABASE_URL` password is URL-encoded

3. **Check Database Connectivity**
   - Verify RDS is publicly accessible
   - Check security group allows port 5432

4. **Verify Prisma Client Generation**
   - Build logs should show: `✔ Generated Prisma Client`
   - If missing, check `amplify.yml` has `npx prisma generate`

5. **Check Browser Console**
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for failed API calls

## 📝 Current Configuration Status

✅ **amplify.yml** - Properly configured with Prisma generate
✅ **next.config.js** - Uses standalone (correct for Amplify)
✅ **Prisma Schema** - PostgreSQL configured
✅ **Type Declarations** - All installed
✅ **API Routes** - All use Prisma correctly (server-side only)
✅ **Client Components** - No direct Prisma usage

## 🎯 Quick Fix Commands

If build fails, check these in order:

1. **Verify DATABASE_URL format:**
   ```
   postgresql://username:password@host:5432/database?sslmode=require
   ```

2. **Test database connection locally:**
   ```bash
   npx prisma db push
   ```

3. **Regenerate Prisma client:**
   ```bash
   npx prisma generate
   ```

4. **Test build locally:**
   ```bash
   npm run build
   ```

## 🔗 Important URLs

- **Production Site:** https://main.d1ce8jq8iz0ibb.amplifyapp.com
- **Admin Login:** https://main.d1ce8jq8iz0ibb.amplifyapp.com/auth/login
- **Admin Dashboard:** https://main.d1ce8jq8iz0ibb.amplifyapp.com/dashboard/admin

## 📧 Support

If issues persist, check:
1. AWS Amplify build logs
2. Browser console errors
3. Network tab for failed requests
4. RDS connectivity from AWS console

