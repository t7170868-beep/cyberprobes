# 🔍 Debug Runtime 500 Error

## ❌ Problem
Login pe abhi bhi 500 error aa rahi hai.

## 🧪 Step-by-Step Debugging

### Step 1: Check Runtime Variables

**Visit this URL:**
```
https://main.d1ce8jq8iz0ibb.amplifyapp.com/api/debug/env
```

**Expected Response:**
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

**If any show "MISSING":**
- Variables build time pe available nahi the
- Re-save variables in Amplify Console
- Redeploy

---

### Step 2: Check Browser Console

1. Website open karo
2. **F12** press karo (DevTools)
3. **Console** tab check karo
4. Login try karo
5. Error messages copy karo

**Common errors:**
- `NEXTAUTH_SECRET environment variable is required`
- `Cannot read property 'session' of undefined`
- `500 Internal Server Error`

---

### Step 3: Check Network Tab

1. **F12** → **Network** tab
2. Login try karo
3. Failed requests dhundho (red color)
4. `/api/auth/*` requests check karo
5. **Response** tab mein error message dekho

**Look for:**
- `/api/auth/session` → 500?
- `/api/auth/callback/credentials` → 500?
- `/api/auth/error` → 500?

---

### Step 4: Check CloudWatch Logs

1. **AWS Amplify Console** → **Monitoring** → **Logs**
2. **CloudWatch Logs** open karo
3. Search for:
   - `[NextAuth]`
   - `[auth]`
   - `ERROR`
   - `500`

**Common log messages:**
```
[NextAuth] Initialization error: ...
[auth] Secret resolution failed in production
PrismaClientInitializationError
```

---

### Step 5: Test Individual Endpoints

**Test these URLs directly:**

1. **Session endpoint:**
   ```
   https://main.d1ce8jq8iz0ibb.amplifyapp.com/api/auth/session
   ```
   - Should return `{}` (empty object)
   - Not 500 error

2. **Debug endpoint:**
   ```
   https://main.d1ce8jq8iz0ibb.amplifyapp.com/api/debug/env
   ```
   - Should show all variables SET

3. **Health endpoint (if exists):**
   ```
   https://main.d1ce8jq8iz0ibb.amplifyapp.com/api/health
   ```

---

## 🔧 Common Fixes

### Fix 1: Variables Not Available at Runtime

**Symptoms:**
- `/api/debug/env` shows variables as MISSING
- Build logs showed WARNING

**Solution:**
1. Re-save variables in Amplify Console
2. Redeploy
3. Check `/api/debug/env` again

---

### Fix 2: NEXTAUTH_URL Missing

**Symptoms:**
- `NEXTAUTH_URL` shows MISSING in `/api/debug/env`
- Login redirects fail

**Solution:**
- Code updated to use `NEXT_PUBLIC_BASE_URL` as fallback
- But still add `NEXTAUTH_URL` in Amplify Console for best results

---

### Fix 3: Database Connection Failed

**Symptoms:**
- CloudWatch logs show `PrismaClientInitializationError`
- Database connection timeout

**Solution:**
1. Check `DATABASE_URL` format
2. Verify RDS is accessible
3. Check security groups allow connections

---

### Fix 4: NEXTAUTH_SECRET Missing

**Symptoms:**
- Error: `NEXTAUTH_SECRET environment variable is required`
- Login fails immediately

**Solution:**
1. Verify `NEXTAUTH_SECRET` in Amplify Console
2. Re-save the variable
3. Redeploy

---

## 📋 Quick Checklist

- [ ] `/api/debug/env` shows all variables SET
- [ ] Browser console mein koi error nahi
- [ ] Network tab mein `/api/auth/*` requests successful
- [ ] CloudWatch logs check kiye
- [ ] Variables re-saved in Amplify Console
- [ ] Redeployed after variable changes

---

## 🚨 Still Not Working?

**Share these details:**

1. **`/api/debug/env` response** (copy the JSON)
2. **Browser console errors** (screenshot or copy)
3. **Network tab** - failed request details
4. **CloudWatch logs** - last 10-20 lines with errors

**With these details, I can pinpoint the exact issue!**

---

## 💡 Latest Code Update

I just updated the code to:
- Use `NEXT_PUBLIC_BASE_URL` as fallback for `NEXTAUTH_URL`
- This should help even if `NEXTAUTH_URL` is missing at runtime

**After this code deploys, test again!**

