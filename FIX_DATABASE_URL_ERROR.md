# 🚨 CRITICAL FIX: Prisma DATABASE_URL Error

## ❌ Error Message
```
Error validating datasource `db`: the URL must start with the protocol `postgresql://` or `postgres://`.
--> prisma/schema.prisma:7
```

## 🔍 Root Cause
**Amplify environment variables mein `DATABASE_URL` missing hai ya incorrectly formatted hai.**

Ye error tab aata hai jab:
- `DATABASE_URL` Amplify console mein set nahi hai
- Extra spaces, quotes, ya hidden newlines hain
- Password special characters properly URL-encoded nahi hain

---

## ✅ STEP-BY-STEP FIX

### 🩵 Step 1: AWS Amplify Console Mein DATABASE_URL Set Karo

1. **AWS Amplify Console** kholo:
   - https://console.aws.amazon.com/amplify/
   - Apni app select karo
   - **App settings** → **Environment variables**

2. **Old DATABASE_URL delete karo** (agar hai to)

3. **New DATABASE_URL add karo** (EXACT format):

   **Key:** `DATABASE_URL`
   
   **Value:** 
   ```
   postgresql://cyber_admin:CyberProbes2025%21DB%23@cyberprobes-db.cluster-czis8ka6oj05.eu-north-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require
   ```

   ⚠️ **CRITICAL NOTES:**
   - **NO quotes** around the value
   - **NO spaces** before or after
   - **NO trailing newline**
   - Password `CyberProbes2025!DB#` ko URL-encoded karo: `CyberProbes2025%21DB%23`
     - `!` = `%21`
     - `#` = `%23`

4. **Alternative (Simpler Password):**
   Agar password change kar sakte ho RDS mein, to simpler password use karo:
   ```
   postgresql://cyber_admin:CyberProbes2025DB123@cyberprobes-db.cluster-czis8ka6oj05.eu-north-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require
   ```

### 🧠 Step 2: Verify schema.prisma

✅ **Already correct!** File check karo:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Confirm:**
- ✅ `provider = "postgresql"` (not "mongodb" or "sqlite")
- ✅ `url = env("DATABASE_URL")` (no quotes around env())
- ✅ No extra whitespace

### ⚙️ Step 3: Verify amplify.yml

✅ **Already correct!** File check karo:
```yaml
preBuild:
  commands:
    - npx prisma generate --schema=./prisma/schema.prisma
    - npx prisma db push --accept-data-loss --skip-generate
```

**Debug echo added** to check if DATABASE_URL is loaded:
```yaml
- echo "DB URL starts with: ${DATABASE_URL:0:30}"
```

### 🧾 Step 4: All Required Environment Variables

Ensure ye **6 variables** sab set hain:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `postgresql://cyber_admin:CyberProbes2025%21DB%23@cyberprobes-db.cluster-czis8ka6oj05.eu-north-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require` |
| `JWT_SECRET` | `jwt-secret-key-cyberprobes-123` |
| `NEXTAUTH_SECRET` | `cyberprobes-secret-2024-production-key-v1` |
| `NEXTAUTH_URL` | `https://main.d1ce8jq8iz0ibb.amplifyapp.com` |
| `NEXT_PUBLIC_BASE_URL` | `https://main.d1ce8jq8iz0ibb.amplifyapp.com` |
| `NODE_ENV` | `production` |

### 🧪 Step 5: Redeploy

1. **Save** environment variables in Amplify console
2. **Git push** (agar code changes kiye hain):
   ```bash
   git add .
   git commit -m "fix: add DATABASE_URL debug logging"
   git push
   ```
3. **Redeploy** in Amplify:
   - **Deployments** tab → **Redeploy this version**
   - Wait 10-15 minutes

### 🔍 Step 6: Check Build Logs

After redeploy, check build logs:

1. **AWS Amplify** → **Deployments** → **Latest build** → **View logs**

2. **Look for these lines:**
   ```
   🔍 Debug: Checking DATABASE_URL...
   DB URL starts with: postgresql://cyber_admin:Cyber
   🔍 Debug: DATABASE_URL length: 150
   ```

3. **If you see:**
   - ✅ `DB URL starts with: postgresql://` → **GOOD!** DATABASE_URL loaded
   - ❌ `⚠️ DATABASE_URL is empty or not set!` → **BAD!** Go back to Step 1

4. **Success indicators:**
   ```
   ✔ Generated Prisma Client
   ✔ Prisma db push successful
   ✓ Compiled successfully
   ```

---

## 🎯 Quick Checklist

Before redeploy, verify:

- [ ] `DATABASE_URL` set in Amplify environment variables
- [ ] No quotes around DATABASE_URL value
- [ ] No extra spaces or newlines
- [ ] Password is URL-encoded (`%21` for `!`, `%23` for `#`)
- [ ] All 6 environment variables are set
- [ ] `schema.prisma` has `provider = "postgresql"`
- [ ] `amplify.yml` has Prisma commands in preBuild

---

## 🆘 Still Not Working?

### Check 1: Build Logs
```
AWS Amplify → Deployments → View logs
```
Look for:
- `DB URL starts with:` line
- If empty → DATABASE_URL not loaded

### Check 2: RDS Password
If password has special characters, ensure they're URL-encoded:
- `!` → `%21`
- `#` → `%23`
- `@` → `%40`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `=` → `%3D`

### Check 3: Test Connection String Locally
```bash
# Test if connection string works
npx prisma db push
```

If this works locally but fails on Amplify → Environment variable issue

---

## ✅ Expected Result

After fix:
- ✅ Build completes successfully
- ✅ `✔ Generated Prisma Client` in logs
- ✅ `✔ Prisma db push successful` in logs
- ✅ Website loads without blank page
- ✅ Database connection works

---

**Main fix kar diya hai! Ab Amplify console mein DATABASE_URL set karo aur redeploy karo.** 🚀

