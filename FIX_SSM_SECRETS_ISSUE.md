# 🔧 Fix: SSM Secrets Setup Failed

## ❌ Problem

**Build Log Shows:**
```
---- Setting Up SSM Secrets ----
SSM params {"Path":"/amplify/d1ce8jq8iz0ibb/main/","WithDecryption":true}
!Failed to set up process.env.secrets
```

**What This Means:**
- AWS Amplify cannot read secrets from SSM Parameter Store
- Environment variables may be missing at runtime
- API routes crash with 500 errors

---

## ✅ Step-by-Step Fix

### Step 1: Check IAM Permissions

**Go to:**
- AWS Console → **IAM** → **Roles**
- Find role: `amplifyconsole-backend-role` or `amplify-d1ce8jq8iz0ibb-main-role`

**Attach/Verify Policy:**
The role needs these permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ssm:GetParameter",
        "ssm:GetParameters",
        "ssm:GetParametersByPath"
      ],
      "Resource": "*"
    }
  ]
}
```

**How to Add:**
1. Click on the role
2. Go to **"Permissions"** tab
3. Click **"Add permissions"** → **"Attach policies"**
4. Search for `AmazonSSMReadOnlyAccess` or create custom policy with above JSON
5. Click **"Attach"**

**Without these permissions, Amplify cannot decrypt and use env vars.**

---

### Step 2: Re-save Environment Variables in Amplify

**Even if variables show up, re-saving forces sync with SSM:**

1. Go to: **Amplify Console** → **App Settings** → **Environment Variables**
2. Click **"Edit"** button
3. **Without changing any values**, just click **"Save"**
4. This triggers Amplify to push them to SSM Parameter Store again

**Why This Works:**
- Forces Amplify to re-sync variables
- Updates SSM Parameter Store
- Refreshes IAM role permissions

---

### Step 3: Trigger a Fresh Build

**Option A: Via Amplify Console**
1. Go to **Deployments** tab
2. Click **"Redeploy this version"** or **"Start new build"**

**Option B: Via Git (Recommended)**
```bash
# Make a small change to trigger rebuild
git commit --allow-empty -m "trigger: force Amplify rebuild"
git push origin main
```

**Expected Result in Logs:**
```
---- Setting Up SSM Secrets ----
✔ Successfully loaded environment variables
```

**Instead of:**
```
!Failed to set up process.env.secrets
```

---

### Step 4: Verify SSM Parameter Store (Optional)

**Check if variables exist in SSM:**

1. Go to: **AWS Console** → **Systems Manager** → **Parameter Store**
2. Search for: `/amplify/d1ce8jq8iz0ibb/main/`

**You should see:**
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `JWT_SECRET`
- `NEXT_PUBLIC_BASE_URL`
- `NODE_ENV`

**If they're missing:**
- Amplify isn't syncing them to SSM
- Follow Step 2 to re-save variables
- Or manually add them to SSM (see alternative method below)

---

## 🔄 Alternative: Manual SSM Setup (If Needed)

If automatic sync doesn't work, manually add to SSM:

### Using AWS CLI:

```bash
# DATABASE_URL
aws ssm put-parameter \
  --name "/amplify/d1ce8jq8iz0ibb/main/DATABASE_URL" \
  --value "postgresql://cyber_admin:CyberProbes2025!DB%23@cyberprobes-db.cluster-czis8ka6oj05.eu-north-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require" \
  --type SecureString \
  --overwrite

# NEXTAUTH_SECRET
aws ssm put-parameter \
  --name "/amplify/d1ce8jq8iz0ibb/main/NEXTAUTH_SECRET" \
  --value "cyberprobes-secret-2024-production-key-v1" \
  --type SecureString \
  --overwrite

# NEXTAUTH_URL
aws ssm put-parameter \
  --name "/amplify/d1ce8jq8iz0ibb/main/NEXTAUTH_URL" \
  --value "https://main.d1ce8jq8iz0ibb.amplifyapp.com" \
  --type SecureString \
  --overwrite

# JWT_SECRET
aws ssm put-parameter \
  --name "/amplify/d1ce8jq8iz0ibb/main/JWT_SECRET" \
  --value "jwt-secret-key-cyberprobes-123" \
  --type SecureString \
  --overwrite

# NEXT_PUBLIC_BASE_URL
aws ssm put-parameter \
  --name "/amplify/d1ce8jq8iz0ibb/main/NEXT_PUBLIC_BASE_URL" \
  --value "https://main.d1ce8jq8iz0ibb.amplifyapp.com" \
  --type String \
  --overwrite

# NODE_ENV
aws ssm put-parameter \
  --name "/amplify/d1ce8jq8iz0ibb/main/NODE_ENV" \
  --value "production" \
  --type String \
  --overwrite
```

### Using AWS Console:

1. Go to: **Systems Manager** → **Parameter Store**
2. Click **"Create parameter"**
3. Fill in:
   - **Name:** `/amplify/d1ce8jq8iz0ibb/main/DATABASE_URL`
   - **Type:** `SecureString` (for secrets) or `String` (for public vars)
   - **Value:** Your actual value
4. Click **"Create parameter"**
5. Repeat for all variables

---

## ✅ Verification Checklist

After completing all steps:

- [ ] IAM role has `ssm:GetParameter*` permissions
- [ ] Environment variables re-saved in Amplify Console
- [ ] Fresh build triggered
- [ ] Build logs show: `✔ Successfully loaded environment variables`
- [ ] SSM Parameter Store has all variables under `/amplify/d1ce8jq8iz0ibb/main/`
- [ ] Runtime API routes work (no 500 errors)
- [ ] Login functionality works

---

## 🧪 Test After Fix

1. **Test Session Endpoint:**
   ```
   https://main.d1ce8jq8iz0ibb.amplifyapp.com/api/auth/session
   ```
   Should return `{}` (not 500)

2. **Test Login:**
   - Go to login page
   - Submit credentials
   - Should redirect (not show 500 error)

3. **Check Browser Console:**
   - F12 → Console tab
   - No `NEXTAUTH_SECRET environment variable is required` errors

---

## 📋 Summary

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Give IAM role SSM permissions | Role can read from Parameter Store |
| 2 | Re-save Amplify env variables | Variables synced to SSM |
| 3 | Rebuild Amplify app | Build logs show success |
| 4 | Verify vars in SSM | All variables visible in Parameter Store |

---

## 🚨 If Still Failing

1. **Check IAM Role Name:**
   - Look in Amplify Console → App Settings → General
   - Find the service role name
   - Verify it has SSM permissions

2. **Check SSM Path:**
   - Path should be: `/amplify/d1ce8jq8iz0ibb/main/`
   - Verify this matches your app ID and branch name

3. **Check Parameter Types:**
   - Secrets should be `SecureString`
   - Public vars can be `String`

4. **Try Manual Setup:**
   - Use AWS Console or CLI to manually add parameters
   - Then re-save in Amplify to sync

---

## 💡 Pro Tip

**Easiest Solution:**
1. Add variables directly in Amplify Console (not SSM)
2. Amplify will auto-sync to SSM
3. Ensure IAM role has read permissions
4. Rebuild

This avoids manual SSM setup and is the recommended approach.

