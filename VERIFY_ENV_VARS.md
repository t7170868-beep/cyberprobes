# 🔐 AWS Amplify Environment Variables - Correct Format

## ✅ CORRECT Environment Variables for AWS Amplify

Copy these **EXACTLY** as shown below to AWS Amplify Console → App Settings → Environment variables:

```
DATABASE_URL=postgresql://cyber_admin:CyberProbes2025%21DB%23@cyberprobes-db.cluster-czis8ka6oj05.eu-north-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require
JWT_SECRET=jwt-secret-key-cyberprobes-123
NEXTAUTH_SECRET=cyberprobes-secret-2024-production-key-v1
NEXTAUTH_URL=https://main.d1ce8jq8iz0ibb.amplifyapp.com
NEXT_PUBLIC_BASE_URL=https://main.d1ce8jq8iz0ibb.amplifyapp.com
NODE_ENV=production
```

## ⚠️ CRITICAL FIXES

### 1. DATABASE_URL Password Encoding
**Your current:** `CyberProbes2025!DB%23`
**Correct:** `CyberProbes2025%21DB%23`

**Explanation:**
- `!` must be encoded as `%21`
- `#` must be encoded as `%23`
- Full password: `CyberProbes2025!DB#` → `CyberProbes2025%21DB%23`

### 2. NEXTAUTH_URL - INCOMPLETE!
**Your current:** `https://main.d1ce8jq8iz0ibb.am`
**Correct:** `https://main.d1ce8jq8iz0ibb.amplifyapp.com`

**⚠️ Missing `.plifyapp.com` - This will cause authentication failures!**

## 📋 Step-by-Step Setup in AWS Amplify

1. **Go to AWS Amplify Console**
   - https://console.aws.amazon.com/amplify/
   - Select your app: `cyberprobes`

2. **Navigate to Environment Variables**
   - Left sidebar → **App settings** → **Environment variables**

3. **Add/Update Each Variable:**

   | Variable Name | Value |
   |--------------|-------|
   | `DATABASE_URL` | `postgresql://cyber_admin:CyberProbes2025%21DB%23@cyberprobes-db.cluster-czis8ka6oj05.eu-north-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require` |
   | `JWT_SECRET` | `jwt-secret-key-cyberprobes-123` |
   | `NEXTAUTH_SECRET` | `cyberprobes-secret-2024-production-key-v1` |
   | `NEXTAUTH_URL` | `https://main.d1ce8jq8iz0ibb.amplifyapp.com` |
   | `NEXT_PUBLIC_BASE_URL` | `https://main.d1ce8jq8iz0ibb.amplifyapp.com` |
   | `NODE_ENV` | `production` |

4. **Save and Redeploy**
   - Click **Save**
   - Go to **Deployments** tab
   - Click **Redeploy this version** (or wait for auto-deploy)

## 🔍 Verification Checklist

After setting variables, verify:

- [ ] All 6 variables are present
- [ ] `DATABASE_URL` password is URL-encoded (`%21` for `!`, `%23` for `#`)
- [ ] `NEXTAUTH_URL` is complete (`amplifyapp.com` included)
- [ ] No extra spaces or quotes around values
- [ ] Build logs show "Connected to database" (not errors)

## 🚨 Common Mistakes to Avoid

❌ **DON'T:**
- Use unencoded special characters in password
- Add quotes around values (`"value"` - wrong!)
- Use incomplete URLs
- Mix up variable names (case-sensitive)

✅ **DO:**
- URL-encode special characters
- Use exact values as shown above
- Verify after saving
- Check build logs after redeploy

## 📝 Password Encoding Reference

| Character | URL Encoded |
|-----------|-------------|
| `!` | `%21` |
| `#` | `%23` |
| `@` | `%40` |
| `$` | `%24` |
| `%` | `%25` |
| `&` | `%26` |
| `+` | `%2B` |
| `=` | `%3D` |

## 🔗 Quick Links

- **AWS Amplify Console:** https://console.aws.amazon.com/amplify/
- **Production Site:** https://main.d1ce8jq8iz0ibb.amplifyapp.com
- **Admin Login:** https://main.d1ce8jq8iz0ibb.amplifyapp.com/auth/login

