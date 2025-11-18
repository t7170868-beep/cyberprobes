# 🔐 GoDaddy Domain Setup - Your Credentials

## 📝 Your GoDaddy Account Info
- **Email:** adarshsrivastavaa001@gmail.com
- **Password:** Haddi206@

---

## ⚠️ Security Note
Yeh file secure rakho. Kisi ko share mat karo.

---

## 🚀 Step-by-Step Instructions

### STEP 1: GoDaddy Login (2 minutes)

1. **GoDaddy website kholo:**
   - https://www.godaddy.com/
   - Ya directly: https://sso.godaddy.com/

2. **Login karo:**
   - Email: `adarshsrivastavaa001@gmail.com`
   - Password: `Haddi206@`
   - Click "Sign In"

3. **My Products** section mein jao
   - Top menu mein "My Products" pe click karo
   - Ya "Domains" section select karo

---

### STEP 2: Domain Select Karein (1 minute)

1. **Apna domain select karo**
   - List mein se apna domain click karo
   - (Example: cyberprobes.com, ya jo bhi domain hai)

2. **DNS Management open karo**
   - Domain ke page pe **"DNS"** tab pe click karo
   - Ya **"Manage DNS"** button pe click karo

---

### STEP 3: AWS Amplify Se DNS Records Lein (5 minutes)

**Pehle AWS Amplify se DNS records le lo:**

1. **AWS Amplify Console:**
   - https://console.aws.amazon.com/amplify/
   - Login karo (AWS credentials se)

2. **Domain Management:**
   - Left sidebar → **"Domain management"**
   - **"Add domain"** pe click karo
   - Apna GoDaddy domain enter karo
   - **"Configure domain"** pe click karo

3. **DNS Records Copy Karo:**
   AWS aapko kuch aise records dega:
   ```
   Type: CNAME
   Name: (empty ya @)
   Value: d1234567890.cloudfront.net
   
   Type: CNAME
   Name: www
   Value: d1234567890.cloudfront.net
   ```

   **⚠️ Important:** In records ko **copy karo** - yeh unique hote hain har app ke liye.

---

### STEP 4: GoDaddy DNS Records Add Karein (5 minutes)

**GoDaddy DNS page pe:**

1. **Existing Records Check Karo:**
   - Agar pehle se A records ya CNAME hain jo conflict kar rahe hain, unhe **delete** karo
   - (Optional, but recommended)

2. **New CNAME Record Add Karo (Root Domain):**
   - **"Add"** ya **"+"** button pe click karo
   - **Type:** `CNAME` select karo
   - **Name:** `@` (ya empty field - root domain ke liye)
   - **Value:** AWS se jo CloudFront URL mila (e.g., `d1234567890.cloudfront.net`)
   - **TTL:** `600` (10 minutes) select karo
   - **Save** karo

3. **New CNAME Record Add Karo (WWW Subdomain):**
   - **"Add"** button pe click karo
   - **Type:** `CNAME` select karo
   - **Name:** `www`
   - **Value:** Same CloudFront URL (AWS se jo mila)
   - **TTL:** `600`
   - **Save** karo

4. **Final Check:**
   Aapke DNS records kuch aise dikhne chahiye:
   ```
   Type    Name    Value                          TTL
   CNAME   @       d1234567890.cloudfront.net     600
   CNAME   www     d1234567890.cloudfront.net     600
   ```

---

### STEP 5: AWS Amplify Environment Variables Update (3 minutes)

1. **AWS Amplify Console:**
   - https://console.aws.amazon.com/amplify/
   - Apni app select karo

2. **Environment Variables:**
   - **App settings** → **Environment variables**

3. **Update Karein:**
   - **NEXTAUTH_URL** find karo
     - Old: `https://main.d1ce8jq8iz0ibb.amplifyapp.com`
     - New: `https://yourdomain.com` (apna actual domain)
   
   - **NEXT_PUBLIC_BASE_URL** find karo
     - Old: `https://main.d1ce8jq8iz0ibb.amplifyapp.com`
     - New: `https://yourdomain.com` (apna actual domain)

4. **Save Karo:**
   - **Save** button pe click karo
   - Automatic redeploy start hoga

---

### STEP 6: Wait & Verify (1-2 hours)

1. **DNS Propagation Check:**
   - https://www.whatsmydns.net/
   - Apna domain enter karo
   - Check karo ki DNS records globally propagate ho gaye hain
   - **Time:** 30 minutes - 2 hours

2. **SSL Certificate:**
   - AWS Amplify automatically SSL provision karega
   - **Time:** 1-2 hours
   - Status check: AWS Amplify → Domain management → SSL status

3. **Website Test:**
   - Browser mein apna domain open karo
   - `https://yourdomain.com`
   - HTTPS lock icon check karo
   - Login test karo

---

## ✅ Final Checklist

- [ ] GoDaddy mein login ho gaya
- [ ] Domain select kar liya
- [ ] DNS management page open kiya
- [ ] AWS Amplify se DNS records copy kiye
- [ ] GoDaddy mein CNAME records add kiye (@ aur www)
- [ ] AWS Amplify environment variables update kiye
- [ ] Redeploy complete ho gaya
- [ ] DNS propagation check kiya (whatsmydns.net)
- [ ] SSL certificate active hai
- [ ] Website custom domain se open ho rahi hai
- [ ] Login test successful hai

---

## 🆘 Agar Issues Aaye

### Domain Open Nahi Ho Raha?
- DNS propagation wait karo (30 min - 2 hours)
- DNS records double-check karo
- TTL 600 set karo for faster propagation

### SSL Pending?
- 1-2 hours wait karo
- AWS automatically provision karega
- DNS records verify karo

### 500 Error?
- Environment variables check karo
- Redeploy karo
- Clear browser cache

---

## 📞 Help

Agar koi step unclear hai:
1. `GODADDY_DOMAIN_SETUP.md` detailed guide dekho
2. Screenshots le kar step-by-step follow karo
3. AWS Amplify documentation check karo

**Expected Total Time:** 15-20 minutes setup + 1-2 hours wait = ~2 hours total

