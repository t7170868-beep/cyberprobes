# 🌐 GoDaddy Domain Setup Guide - AWS Amplify

## 📋 Overview
Yeh guide aapko GoDaddy domain ko AWS Amplify website se connect karne mein help karega.

---

## ✅ Step 1: AWS Amplify Mein Custom Domain Add Karein

### 1.1 AWS Amplify Console Mein Jao
1. **AWS Amplify Console** kholo:
   - https://console.aws.amazon.com/amplify/
   - Apni app select karo (cyberprobes-site)

### 1.2 Domain Management
1. Left sidebar mein **"Domain management"** pe click karo
2. **"Add domain"** button pe click karo
3. Apna **GoDaddy domain** enter karo (example: `cyberprobes.com` ya `www.cyberprobes.com`)
4. **"Configure domain"** pe click karo

### 1.3 Domain Configuration
AWS Amplify aapko **2 options** dega:

#### Option A: Root Domain (cyberprobes.com)
- Root domain select karo
- AWS automatically SSL certificate provision karega

#### Option B: Subdomain (www.cyberprobes.com)
- Subdomain select karo
- Ya dono add kar sakte ho (root + www)

**Recommendation:** Dono add karo:
- `cyberprobes.com` (root domain)
- `www.cyberprobes.com` (www subdomain)

### 1.4 DNS Records Get Karein
AWS Amplify aapko **DNS records** dikhayega. Inhe copy karo:

**Example DNS Records:**
```
Type: CNAME
Name: (empty ya @)
Value: d1234567890.cloudfront.net

Type: CNAME  
Name: www
Value: d1234567890.cloudfront.net
```

Ya phir:

```
Type: A
Name: @
Value: 192.0.2.1 (IP address)

Type: CNAME
Name: www
Value: d1234567890.cloudfront.net
```

**⚠️ Important:** AWS Amplify jo records dega, wahi use karo. Har app ke liye different hote hain.

---

## ✅ Step 2: GoDaddy DNS Configuration

### 2.1 GoDaddy Account Mein Login Karein
1. **GoDaddy.com** pe login karo
2. **My Products** section mein jao
3. Apna domain select karo

### 2.2 DNS Management
1. Domain ke **"DNS"** tab pe click karo
2. Ya **"Manage DNS"** button pe click karo

### 2.3 Existing Records Delete Karein (Agar Zarurat Ho)
Agar pehle se koi A records ya CNAME records hain jo conflict kar rahe hain, unhe delete karo:
- **A records** (Type: A)
- **CNAME records** (Type: CNAME) jo root domain ke liye hain

### 2.4 New DNS Records Add Karein

AWS Amplify se jo records mile, unhe GoDaddy mein add karo:

#### Agar AWS ne CNAME diya hai:
1. **"Add"** button pe click karo
2. **Type:** `CNAME` select karo
3. **Name:** AWS ne jo diya (usually empty ya `@`)
4. **Value:** AWS ne jo CloudFront URL diya
5. **TTL:** `600` (10 minutes) ya default
6. **Save** karo

#### Agar AWS ne A record diya hai:
1. **"Add"** button pe click karo
2. **Type:** `A` select karo
3. **Name:** `@` (root domain ke liye)
4. **Value:** AWS ne jo IP address diya
5. **TTL:** `600`
6. **Save** karo

#### WWW Subdomain ke liye:
1. **"Add"** button pe click karo
2. **Type:** `CNAME` select karo
3. **Name:** `www`
4. **Value:** AWS ne jo CloudFront URL diya (same as root domain)
5. **TTL:** `600`
6. **Save** karo

### 2.5 Final DNS Records Check
GoDaddy mein aapke records kuch aise dikhne chahiye:

```
Type    Name    Value                          TTL
CNAME   @       d1234567890.cloudfront.net     600
CNAME   www     d1234567890.cloudfront.net     600
```

Ya:

```
Type    Name    Value                          TTL
A       @       192.0.2.1                     600
CNAME   www     d1234567890.cloudfront.net     600
```

---

## ✅ Step 3: AWS Amplify Environment Variables Update

### 3.1 Environment Variables Update Karein
1. **AWS Amplify Console** → **App settings** → **Environment variables**
2. Ye variables **UPDATE** karo:

#### Old Values (Amplify URL):
```
NEXTAUTH_URL=https://main.d1ce8jq8iz0ibb.amplifyapp.com
NEXT_PUBLIC_BASE_URL=https://main.d1ce8jq8iz0ibb.amplifyapp.com
```

#### New Values (Custom Domain):
```
NEXTAUTH_URL=https://cyberprobes.com
NEXT_PUBLIC_BASE_URL=https://cyberprobes.com
```

Ya agar www use kar rahe ho:
```
NEXTAUTH_URL=https://www.cyberprobes.com
NEXT_PUBLIC_BASE_URL=https://www.cyberprobes.com
```

**⚠️ Important:**
- **NO trailing slash** (`/`) at the end
- **NO quotes** around values
- **HTTPS** use karo (not HTTP)
- **Complete domain** with protocol

### 3.2 Save Karein
1. **Save** button pe click karo
2. **Redeploy** trigger hoga automatically (ya manually redeploy karo)

---

## ✅ Step 4: Wait for DNS Propagation

### 4.1 DNS Propagation Time
- **Minimum:** 5-10 minutes
- **Maximum:** 24-48 hours (usually 1-2 hours)
- **Average:** 30-60 minutes

### 4.2 Check DNS Propagation
Online tools use karo:
- https://www.whatsmydns.net/
- https://dnschecker.org/

Apna domain enter karo aur check karo ki DNS records globally propagate ho gaye hain.

---

## ✅ Step 5: SSL Certificate Verification

### 5.1 AWS Amplify SSL Status
1. **AWS Amplify Console** → **Domain management**
2. Apne domain ke status ko check karo
3. **SSL certificate** automatically provision hoga (usually 1-2 hours mein)

**Status:**
- ⏳ **Pending validation** - Wait karo
- ✅ **Available** - SSL ready hai
- ❌ **Failed** - DNS records check karo

### 5.2 SSL Certificate Types
AWS Amplify automatically **2 types** provide karta hai:
- **Root domain SSL** (cyberprobes.com)
- **WWW subdomain SSL** (www.cyberprobes.com)

---

## ✅ Step 6: Final Verification

### 6.1 Website Access Test
1. Browser mein apna domain open karo:
   - `https://cyberprobes.com`
   - `https://www.cyberprobes.com`

2. **HTTPS** check karo:
   - Browser mein **lock icon** dikhna chahiye
   - URL mein **https://** hona chahiye

### 6.2 Environment Variables Verify
1. Visit: `https://cyberprobes.com/api/debug/env`
2. Check karo:
   ```json
   {
     "status": "OK",
     "criticalVariables": {
       "NEXTAUTH_URL": "SET",
       "NEXT_PUBLIC_BASE_URL": "SET"
     }
   }
   ```

### 6.3 Login Test
1. `https://cyberprobes.com/auth/login` pe jao
2. Login try karo
3. 500 error nahi aani chahiye
4. Successfully login hona chahiye

---

## 🚨 Common Issues & Fixes

### Issue 1: DNS Not Propagating
**Symptoms:**
- Domain open nahi ho raha
- "Site can't be reached" error

**Fix:**
1. GoDaddy DNS records double-check karo
2. TTL 600 (10 minutes) set karo for faster propagation
3. 24-48 hours wait karo
4. DNS checker tools use karo

---

### Issue 2: SSL Certificate Pending
**Symptoms:**
- Domain open ho raha hai but SSL pending
- Browser shows "Not Secure"

**Fix:**
1. AWS Amplify Console → Domain management → SSL status check karo
2. DNS records verify karo (sahi hain ya nahi)
3. 1-2 hours wait karo (SSL provisioning time)
4. Agar 24 hours baad bhi pending hai, AWS support contact karo

---

### Issue 3: Mixed Content Warnings
**Symptoms:**
- HTTPS site but some resources HTTP se load ho rahe hain
- Browser security warnings

**Fix:**
1. Environment variables check karo:
   - `NEXTAUTH_URL` = `https://cyberprobes.com` (not HTTP)
   - `NEXT_PUBLIC_BASE_URL` = `https://cyberprobes.com` (not HTTP)
2. Code mein hardcoded HTTP URLs check karo
3. Redeploy karo after fixing

---

### Issue 4: 500 Error After Domain Change
**Symptoms:**
- Domain se site open ho rahi hai
- But login pe 500 error

**Fix:**
1. Environment variables update karo:
   ```
   NEXTAUTH_URL=https://cyberprobes.com
   NEXT_PUBLIC_BASE_URL=https://cyberprobes.com
   ```
2. **Redeploy** karo
3. Wait for deployment to complete
4. Clear browser cache
5. Try again

---

### Issue 5: WWW vs Non-WWW Redirect
**Symptoms:**
- `cyberprobes.com` aur `www.cyberprobes.com` dono alag pages dikha rahe hain

**Fix:**
AWS Amplify automatically redirect handle karta hai. Agar manually karna ho:

1. **AWS Amplify Console** → **Domain management**
2. **Redirects** section mein jao
3. Root domain ko www pe redirect karo (ya vice versa)
4. Ya dono ko same app se serve karo

---

## 📝 Quick Checklist

### Before Starting:
- [ ] GoDaddy domain ready hai
- [ ] AWS Amplify app deployed hai
- [ ] Environment variables current Amplify URL ke saath set hain

### During Setup:
- [ ] AWS Amplify mein custom domain add kiya
- [ ] DNS records copy kiye
- [ ] GoDaddy mein DNS records add kiye
- [ ] Environment variables update kiye (custom domain ke saath)
- [ ] Redeploy trigger kiya

### After Setup:
- [ ] DNS propagation check kiya (24-48 hours wait)
- [ ] SSL certificate status check kiya
- [ ] Website custom domain se open hui
- [ ] HTTPS working hai
- [ ] Login functionality test kiya
- [ ] `/api/debug/env` endpoint check kiya

---

## 🎯 Final Configuration Example

### GoDaddy DNS Records:
```
Type    Name    Value                          TTL
CNAME   @       d1234567890.cloudfront.net     600
CNAME   www     d1234567890.cloudfront.net     600
```

### AWS Amplify Environment Variables:
```
DATABASE_URL=postgresql://cyber_admin:CyberProbes2025%21DB%23@cyberprobes-db.cluster-czis8ka6oj05.eu-north-1.rds.amazonaws.com:5432/cyberprobes?sslmode=require
NEXTAUTH_SECRET=cyberprobes-secret-2024-production-key-v1
NEXTAUTH_URL=https://cyberprobes.com
NEXT_PUBLIC_BASE_URL=https://cyberprobes.com
JWT_SECRET=jwt-secret-key-cyberprobes-123
NODE_ENV=production
```

### Expected Result:
- ✅ `https://cyberprobes.com` - Working
- ✅ `https://www.cyberprobes.com` - Working (redirected)
- ✅ SSL Certificate - Active
- ✅ Login - Working
- ✅ All features - Working

---

## 📞 Support

Agar issues aaye:
1. **AWS Amplify Console** → **Monitoring** → **Logs** check karo
2. **GoDaddy DNS** records verify karo
3. **DNS propagation** check karo (whatsmydns.net)
4. **Environment variables** double-check karo
5. **Redeploy** karo after any changes

**Expected Timeline:**
- DNS Setup: 5-10 minutes
- DNS Propagation: 30 minutes - 2 hours
- SSL Certificate: 1-2 hours
- **Total:** 2-4 hours (usually)

---

## ✅ Success Indicators

Agar sab kuch sahi hai, to:
1. ✅ Custom domain se website open hogi
2. ✅ HTTPS lock icon dikhega
3. ✅ Login functionality work karegi
4. ✅ No 500 errors
5. ✅ All pages load honge
6. ✅ Environment variables sahi values dikhayenge

**Congratulations! 🎉 Apka custom domain successfully connected hai!**

