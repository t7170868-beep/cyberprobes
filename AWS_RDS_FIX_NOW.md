# 🚀 AWS RDS Error Fix - IMMEDIATE ACTION REQUIRED

## ⚠️ CURRENT PROBLEM
- **Localhost**: Working ✅ (SQLite database)
- **AWS Amplify**: Error ❌ ("Something went wrong!")

## 🔍 ROOT CAUSE
Prisma schema AWS RDS PostgreSQL ke liye configured nahi tha. Ab fix ho gaya hai.

---

## ✅ SOLUTION - Follow These Steps EXACTLY

### STEP 1: AWS RDS Connection String Verify Karo

Apne AWS RDS dashboard mein jao aur ye details collect karo:

1. **RDS Console**: https://console.aws.amazon.com/rds/
2. Apna database select karo: `cyberprobes-db` (ya jo bhi naam hai)
3. **Connectivity & security** tab mein:
   - **Endpoint** copy karo
   - **Port** note karo (5432)

**Connection String Format:**
```
postgresql://USERNAME:PASSWORD@ENDPOINT:5432/DATABASE_NAME
```

**Example:**
```
postgresql://cyberprobes_admin:Admin123!@#@cyberprobes-db.abc123xyz.ap-south-1.rds.amazonaws.com:5432/cyberprobes
```

⚠️ **IMPORTANT**: Agar password mein special characters hain, toh URL encode karo:
- `@` → `%40`
- `!` → `%21`
- `#` → `%23`
- `$` → `%24`
- `&` → `%26`

**Encoded Example:**
```
postgresql://cyberprobes_admin:Admin123%21%40%23@cyberprobes-db.abc123xyz.ap-south-1.rds.amazonaws.com:5432/cyberprobes
```

---

### STEP 2: AWS Amplify Environment Variables Check Karo

1. **AWS Amplify Console**: https://console.aws.amazon.com/amplify/
2. Apni app select karo
3. Left sidebar → **Environment variables**
4. Ye variables hone chahiye:

#### ✅ Required Variables:

| Variable Name | Example Value | Status |
|--------------|---------------|--------|
| `DATABASE_URL` | `postgresql://cyberprobes_admin:...` | ⚠️ CHECK THIS |
| `NEXTAUTH_SECRET` | `cyberprobes-secret-key-...` (32+ chars) | ✅ |
| `NEXTAUTH_URL` | `https://main.d1ce8jq8iz0ibb.amplifyapp.com` | ⚠️ YOUR ACTUAL URL |
| `NODE_ENV` | `production` | ✅ |
| `JWT_SECRET` | `jwt-secret-key-...` (32+ chars) | ✅ |
| `NEXT_PUBLIC_BASE_URL` | `https://main.d1ce8jq8iz0ibb.amplifyapp.com` | ⚠️ YOUR ACTUAL URL |

#### ⚠️ CRITICAL: DATABASE_URL Must Be Correct!

**Wrong (SQLite - Local only):**
```
DATABASE_URL=file:./prisma/dev.db
```

**Correct (PostgreSQL - AWS RDS):**
```
DATABASE_URL=postgresql://cyberprobes_admin:YOUR_PASSWORD@YOUR_ENDPOINT:5432/cyberprobes
```

---

### STEP 3: Update Environment Variables (If Needed)

Agar `DATABASE_URL` galat hai ya missing hai:

1. AWS Amplify Console → Environment variables
2. **Edit** button click karo
3. `DATABASE_URL` update karo with your actual RDS connection string
4. **Save** button click karo

---

### STEP 4: Verify RDS Security Group

1. **RDS Console** → Your database → **Connectivity & security**
2. Security group pe click karo
3. **Inbound rules** tab check karo:
   - **Type**: PostgreSQL
   - **Port**: 5432
   - **Source**: 0.0.0.0/0 (Anywhere)

Agar nahi hai toh:
1. **Edit inbound rules** click karo
2. **Add rule**:
   - Type: PostgreSQL
   - Source: Anywhere-IPv4 (0.0.0.0/0)
3. **Save rules**

---

### STEP 5: Create Admin User in AWS RDS

Option A: **Using Setup API (Recommended)**

1. Wait for deployment to complete
2. Browser mein jao:
```
https://YOUR-APP-URL.amplifyapp.com/api/setup-admin
```
3. Success message aayega: `{"message": "Admin user created successfully"}`

Option B: **Using Database Tool**

Agar API se nahi bana toh directly database mein:

```sql
-- Connect to your RDS database using pgAdmin or psql
-- Then run this:

INSERT INTO "User" (id, name, email, password, role, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'Admin User',
  'admin@cyberprobes.com',
  '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u', -- password: admin123
  'ADMIN',
  NOW(),
  NOW()
);
```

---

### STEP 6: Redeploy AWS Amplify

#### Option A: Automatic (Git Push)

```powershell
# In your project folder
git add .
git commit -m "Fixed Prisma schema for PostgreSQL AWS RDS"
git push origin main
```

AWS Amplify automatically deploy kar dega!

#### Option B: Manual Redeploy

1. AWS Amplify Console → **Deployments** tab
2. **Redeploy this version** button click karo
3. Wait for deployment (5-10 minutes)

---

### STEP 7: Monitor Deployment

1. AWS Amplify Console → **Deployments** tab
2. Latest deployment pe click karo
3. Build logs check karo:

**Look for these SUCCESS messages:**
```
✓ Provision
✓ Build
  - preBuild: npx prisma generate ✓
  - build: npm run build ✓
✓ Deploy
✓ Verify
```

**If you see ERRORS:**
- Check `DATABASE_URL` is correct
- Check RDS security group allows 0.0.0.0/0
- Check RDS database status is "Available"

---

### STEP 8: Test Production Website

#### 8.1 Homepage Test
```
https://YOUR-APP-URL.amplifyapp.com
```
- Should load without "Something went wrong!" error

#### 8.2 Login Test
```
https://YOUR-APP-URL.amplifyapp.com/auth/login
```
- Email: `admin@cyberprobes.com`
- Password: `admin123`

#### 8.3 Dashboard Test
```
https://YOUR-APP-URL.amplifyapp.com/dashboard/admin
```
- Should show admin dashboard

---

## 🔧 Troubleshooting

### Error: "Something went wrong!" (Still showing)

**Check 1: Build Logs**
```
AWS Amplify → Deployments → Latest → View logs
Look for: "Error", "Failed", "Cannot connect"
```

**Check 2: Environment Variables**
```
AWS Amplify → Environment variables
Verify DATABASE_URL is PostgreSQL connection string (not SQLite)
```

**Check 3: RDS Status**
```
RDS Console → Your database
Status should be: "Available" (green)
```

### Error: "PrismaClientInitializationError"

**Cause**: Cannot connect to database

**Solution**:
1. Check `DATABASE_URL` format is correct
2. Check password is URL encoded (special characters)
3. Check RDS security group allows 0.0.0.0/0
4. Check RDS "Public access" is YES

### Error: "P2021: Table does not exist"

**Cause**: Database tables not created

**Solution**:
1. AWS Amplify build logs check karo
2. Look for: `npx prisma migrate deploy` or `npx prisma db push`
3. Agar nahi hai toh build settings update karo

### Error: "Invalid email or password"

**Cause**: Admin user not created in RDS database

**Solution**:
1. Go to: `https://YOUR-APP-URL.amplifyapp.com/api/setup-admin`
2. Or manually insert user (see Step 5, Option B)

---

## 📋 Quick Checklist

Before asking for help, verify:

- [ ] AWS RDS database status is "Available"
- [ ] Security group allows PostgreSQL (5432) from 0.0.0.0/0
- [ ] `DATABASE_URL` in AWS Amplify is PostgreSQL connection string
- [ ] `NEXTAUTH_URL` matches your actual Amplify URL
- [ ] Password in `DATABASE_URL` is URL encoded (if special chars)
- [ ] Latest deployment completed successfully
- [ ] Build logs show no errors
- [ ] Admin user created (via `/api/setup-admin`)

---

## 🎯 Expected Timeline

- **Step 1-3**: 5 minutes (verification)
- **Step 4**: 2 minutes (security group)
- **Step 5-6**: 10 minutes (deployment)
- **Step 7-8**: 5 minutes (testing)

**Total**: ~20-25 minutes

---

## 📞 Still Not Working?

### Collect This Information:

1. **AWS Amplify URL**: `https://...`
2. **RDS Endpoint**: `cyberprobes-db.xxxxx.rds.amazonaws.com`
3. **Build Logs**: Copy last 50 lines from failed build
4. **Browser Console**: F12 → Console → Copy errors
5. **Environment Variables**: Screenshot (hide passwords!)

### Common Final Issues:

1. **Wrong DATABASE_URL**: Most common! Double-check format
2. **Password encoding**: Special characters must be URL encoded
3. **Security group**: Must allow 0.0.0.0/0 on port 5432
4. **Database name**: Must match what you created in RDS
5. **NEXTAUTH_URL**: Must be exact Amplify URL (no trailing slash)

---

## ✅ Success Indicators

Website is working when:

1. ✅ Homepage loads without error
2. ✅ Login page works
3. ✅ Can login with admin@cyberprobes.com
4. ✅ Dashboard loads
5. ✅ No console errors (F12)

---

**Last Updated**: November 5, 2025  
**Priority**: 🔴 HIGH - Fix Immediately  
**Estimated Fix Time**: 20-25 minutes

