# 🔴 URGENT: AWS Environment Variables Check

## ⚠️ PROBLEM
Website pe "Something went wrong!" error aa rahi hai.

## 🔍 ROOT CAUSE
**99% chance:** AWS Amplify environment variables missing ya galat hain!

---

## ✅ IMMEDIATE FIX - AWS Environment Variables

### Step 1: AWS Amplify Console Kholo
```
https://console.aws.amazon.com/amplify/
```

### Step 2: Environment Variables Check Karo

1. Apni app select karo: **cyberprobes**
2. Left sidebar → **Environment variables**
3. Ye variables **MUST** be set:

---

## 📋 REQUIRED ENVIRONMENT VARIABLES

### Variable 1: DATABASE_URL
```
Key: DATABASE_URL
Value: postgresql://cyberprobes_admin:Admin123%21@cyberprobes-db.cluster-czis8ka6oj05.eu-north-1.rds.amazonaws.com:5432/cyberprobes
```

⚠️ **CRITICAL**: 
- Password mein `!` hai toh `%21` use karo (URL encoded)
- Endpoint exactly match hona chahiye

### Variable 2: NEXTAUTH_SECRET
```
Key: NEXTAUTH_SECRET
Value: cyberprobes-secret-key-production-2025-keep-this-secret-safe-do-not-share
```

⚠️ **Must be 32+ characters**

### Variable 3: NEXTAUTH_URL
```
Key: NEXTAUTH_URL
Value: https://main.d1ce8jq8iz0ibb.amplifyapp.com
```

⚠️ **CRITICAL**: 
- Apna actual Amplify URL use karo
- NO trailing slash (/)
- Must be HTTPS

### Variable 4: NODE_ENV
```
Key: NODE_ENV
Value: production
```

### Variable 5: JWT_SECRET
```
Key: JWT_SECRET
Value: jwt-secret-key-cyberprobes-production-2025-keep-this-secret-safe
```

⚠️ **Must be 32+ characters**

### Variable 6: NEXT_PUBLIC_BASE_URL
```
Key: NEXT_PUBLIC_BASE_URL
Value: https://main.d1ce8jq8iz0ibb.amplifyapp.com
```

⚠️ **Same as NEXTAUTH_URL**

---

## 🚨 MOST COMMON ISSUES

### Issue 1: NEXTAUTH_URL Missing or Wrong
**Symptom**: "Something went wrong!" on homepage
**Fix**: Set to exact Amplify URL (no trailing slash)

### Issue 2: DATABASE_URL Wrong Format
**Symptom**: Build succeeds but runtime error
**Fix**: Check password is URL encoded

### Issue 3: NEXTAUTH_SECRET Too Short
**Symptom**: Auth errors
**Fix**: Must be minimum 32 characters

---

## 🔧 HOW TO FIX

### Step 1: Check Current Variables
AWS Amplify → Environment variables → See what's set

### Step 2: Add/Update Missing Variables
1. Click "Manage variables"
2. For each missing variable:
   - Click "Add variable"
   - Enter Key
   - Enter Value
   - Click "Add"
3. Click "Save"

### Step 3: Redeploy
After saving variables:
1. Go to "Deployments" tab
2. Click "Redeploy this version"
3. Wait 5-10 minutes

---

## 📊 Quick Check Table

| Variable | Status | Action |
|----------|--------|--------|
| DATABASE_URL | ❓ | Check & Update |
| NEXTAUTH_SECRET | ❓ | Check & Update |
| NEXTAUTH_URL | ❓ | **MOST IMPORTANT** |
| NODE_ENV | ❓ | Should be "production" |
| JWT_SECRET | ❓ | Check & Update |
| NEXT_PUBLIC_BASE_URL | ❓ | Same as NEXTAUTH_URL |

---

## 🎯 EXPECTED RESULT

After fixing environment variables:
- ✅ Homepage loads without error
- ✅ Can navigate to all pages
- ✅ Can login
- ✅ Database connects properly

---

## ⏰ Timeline

1. Check variables: 2 minutes
2. Update variables: 3 minutes
3. Redeploy: 5-10 minutes
4. Test: 1 minute

**Total**: ~15 minutes

---

## 🆘 Still Not Working?

If error persists after setting all variables:

1. **Check Build Logs**:
   - AWS Amplify → Deployments → Latest → View logs
   - Look for: "Environment variables loaded"

2. **Check Browser Console**:
   - F12 → Console tab
   - Look for specific error messages

3. **Verify RDS Connection**:
   - RDS Console → Database status should be "Available"
   - Security group should allow 0.0.0.0/0 on port 5432

---

## 💡 Pro Tip

**Test if variables are loaded:**

Create a test API endpoint to check:
```
https://your-url.amplifyapp.com/api/debug
```

Should show if DATABASE_URL and other vars are set.

---

**MOST LIKELY FIX**: Set `NEXTAUTH_URL` to your actual Amplify URL!

This is the #1 cause of "Something went wrong!" error.

