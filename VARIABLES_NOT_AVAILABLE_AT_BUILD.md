# ⚠️ Variables Set But Not Available at Build Time

## ❌ Problem

**Build logs show:**
```
WARNING - NEXTAUTH_URL is not set
WARNING - JWT_SECRET is not set
```

**But you set them in Amplify Console!**

## 🔍 Why This Happens

Variables Amplify Console mein set hain, but build time pe available nahi hain. Common reasons:

1. **Variables not saved properly**
2. **Need to re-save to trigger sync**
3. **Set for wrong branch/environment**
4. **Amplify cache issue**

---

## ✅ FIX: Re-save Variables

### Step 1: Go to Environment Variables

1. **AWS Amplify Console** → **App Settings** → **Environment Variables**

### Step 2: Verify All Variables

Check these 6 variables are present:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` ← **Check this one!**
- `JWT_SECRET` ← **Check this one!**
- `NEXT_PUBLIC_BASE_URL`
- `NODE_ENV`

### Step 3: Re-save Each Variable

**Important:** Even if values look correct, re-save them:

1. Click **"Edit"** button (top right)
2. For each variable:
   - Click on the variable row
   - **Don't change the value** - just click "Save" or move to next
3. Click **"Save"** at the bottom

**Why re-save?**
- Forces Amplify to sync variables to build environment
- Clears any cache issues
- Ensures variables are available at build time

### Step 4: Check Scope

**Make sure variables are set for correct scope:**

- **Scope:** Should be "All branches" or your specific branch name
- If set for wrong branch, they won't be available

### Step 5: Verify Values

**Double-check these 2 variables have correct values:**

**NEXTAUTH_URL:**
```
https://main.d1ce8jq8iz0ibb.amplifyapp.com
```
- ✅ No quotes
- ✅ No trailing slash `/`
- ✅ Complete URL

**JWT_SECRET:**
```
jwt-secret-key-cyberprobes-123
```
- ✅ No quotes
- ✅ No spaces
- ✅ Exact value

---

## 🔄 After Re-saving: Redeploy

1. **Deployments** tab pe jao
2. **"Redeploy this version"** click karo
3. Wait for build to complete
4. Check build logs - should show:
   ```
   SUCCESS - NEXTAUTH_URL = https://main.d1ce8jq8iz0ibb.amplifyapp.com
   SUCCESS - JWT_SECRET is set
   ```

---

## 🧪 Alternative: Set Variables via AWS CLI

If re-saving doesn't work, try AWS CLI:

```bash
aws amplify update-app --app-id d1ce8jq8iz0ibb \
  --environment-variables \
    DATABASE_URL="postgresql://..." \
    NEXTAUTH_SECRET="cyberprobes-secret-2024-production-key-v1" \
    NEXTAUTH_URL="https://main.d1ce8jq8iz0ibb.amplifyapp.com" \
    JWT_SECRET="jwt-secret-key-cyberprobes-123" \
    NEXT_PUBLIC_BASE_URL="https://main.d1ce8jq8iz0ibb.amplifyapp.com" \
    NODE_ENV="production"
```

---

## 🔍 Debug: Check Variable Availability

**After redeploy, check build logs for:**

✅ **Success:**
```
SUCCESS - NEXTAUTH_URL = https://main.d1ce8jq8iz0ibb.amplifyapp.com
SUCCESS - JWT_SECRET is set
```

❌ **Still Missing:**
```
WARNING - NEXTAUTH_URL is not set
WARNING - JWT_SECRET is not set
```

**If still missing:**
1. Check variable names (case-sensitive)
2. Check for hidden characters/spaces
3. Try deleting and re-adding variables
4. Check Amplify Console → App Settings → General → check branch name

---

## 💡 Pro Tip

**Sometimes Amplify needs a "trigger" to sync variables:**

1. **Option 1:** Re-save variables (even without changes)
2. **Option 2:** Add a space, then remove it, then save
3. **Option 3:** Delete and re-add the variable
4. **Option 4:** Make a small code change and push (forces rebuild)

---

## 📋 Checklist

- [ ] All 6 variables visible in Amplify Console
- [ ] Variables re-saved (even if unchanged)
- [ ] Scope is correct ("All branches" or your branch)
- [ ] Values have no quotes/spaces
- [ ] Redeployed after re-saving
- [ ] Build logs show SUCCESS for all variables

---

## 🚨 If Still Not Working

1. **Check CloudWatch Logs:**
   - Amplify Console → Monitoring → Logs
   - Look for variable injection errors

2. **Try Manual Trigger:**
   - Make a small code change
   - Push to GitHub
   - This forces a fresh build with latest variables

3. **Contact AWS Support:**
   - If variables are set but never available at build time
   - Might be an Amplify platform issue

---

**Most likely fix: Re-save the variables in Amplify Console, then redeploy!**

