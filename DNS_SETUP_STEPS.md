# 🌐 DNS Setup Steps - cyberprobes.in

## 📍 Current Status
✅ GoDaddy dashboard open hai
✅ Domain: **cyberprobes.in** visible hai
✅ DNS button ready hai

---

## 🚀 Step 1: GoDaddy DNS Page Open Karein

### Abhi Kya Karna Hai:
1. **"DNS"** button pe click karo (cyberprobes.in ke right side mein)
2. DNS management page open hoga
3. Wahan pe existing DNS records dikhenge

---

## 🚀 Step 2: AWS Amplify Se DNS Records Lein

### AWS Amplify Console Mein:
1. **AWS Amplify Console** kholo:
   - https://console.aws.amazon.com/amplify/
   - Login karo (AWS credentials se)

2. **Apni app select karo:**
   - cyberprobes-site app select karo

3. **Domain Management:**
   - Left sidebar mein **"Domain management"** pe click karo
   - Ya **App settings** → **Domain management**

4. **Add Domain:**
   - **"Add domain"** button pe click karo
   - Domain enter karo: `cyberprobes.in`
   - **"Configure domain"** pe click karo

5. **DNS Records Copy Karo:**
   AWS aapko kuch aise records dega:
   
   **Option 1: CNAME Records (Most Common)**
   ```
   Type: CNAME
   Name: (empty ya @)
   Value: d1234567890.cloudfront.net
   
   Type: CNAME
   Name: www
   Value: d1234567890.cloudfront.net
   ```
   
   **Option 2: A Records (Sometimes)**
   ```
   Type: A
   Name: @
   Value: 192.0.2.1 (IP address)
   
   Type: CNAME
   Name: www
   Value: d1234567890.cloudfront.net
   ```

   **⚠️ Important:** 
   - In records ko **copy karo** ya **screenshot le lo**
   - CloudFront URL unique hota hai har app ke liye
   - Example: `d1ce8jq8iz0ibb.cloudfront.net` (aapka different hoga)

---

## 🚀 Step 3: GoDaddy DNS Records Add Karein

### GoDaddy DNS Page Pe:

1. **Existing Records Check Karo:**
   - Agar pehle se A records ya CNAME hain jo conflict kar rahe hain
   - Unhe **delete** karo (optional, but recommended)
   - Default GoDaddy records delete kar sakte ho

2. **New CNAME Record Add Karo (Root Domain):**
   - **"Add"** ya **"+"** button pe click karo
   - **Type:** Dropdown se `CNAME` select karo
   - **Name:** `@` enter karo (ya field empty chhod do - root domain ke liye)
   - **Value:** AWS se jo CloudFront URL mila, woh paste karo
     - Example: `d1ce8jq8iz0ibb.cloudfront.net`
   - **TTL:** `600` (10 minutes) select karo
   - **Save** karo

3. **New CNAME Record Add Karo (WWW Subdomain):**
   - Phir se **"Add"** button pe click karo
   - **Type:** `CNAME` select karo
   - **Name:** `www` enter karo
   - **Value:** Same CloudFront URL (AWS se jo mila)
   - **TTL:** `600`
   - **Save** karo

4. **Final Check:**
   Aapke DNS records kuch aise dikhne chahiye:
   ```
   Type    Name    Value                          TTL
   CNAME   @       d1ce8jq8iz0ibb.cloudfront.net 600
   CNAME   www     d1ce8jq8iz0ibb.cloudfront.net 600
   ```

---

## 🚀 Step 4: AWS Amplify Environment Variables Update

### AWS Amplify Console Mein:

1. **Environment Variables:**
   - **App settings** → **Environment variables**

2. **Update Karein:**
   - **NEXTAUTH_URL** find karo
     - **Old:** `https://main.d1ce8jq8iz0ibb.amplifyapp.com`
     - **New:** `https://cyberprobes.in`
   
   - **NEXT_PUBLIC_BASE_URL** find karo
     - **Old:** `https://main.d1ce8jq8iz0ibb.amplifyapp.com`
     - **New:** `https://cyberprobes.in`

3. **Important:**
   - ✅ NO trailing slash (`/`) at the end
   - ✅ HTTPS use karo (not HTTP)
   - ✅ NO quotes around values
   - ✅ Complete domain with protocol

4. **Save Karo:**
   - **Save** button pe click karo
   - Automatic redeploy start hoga

---

## ⏳ Step 5: Wait & Verify

### DNS Propagation (30 min - 2 hours):
1. **DNS Checker use karo:**
   - https://www.whatsmydns.net/
   - Domain enter karo: `cyberprobes.in`
   - Check karo ki DNS records globally propagate ho gaye hain

### SSL Certificate (1-2 hours):
1. **AWS Amplify Console:**
   - Domain management → SSL status check karo
   - Status: **Available** ✅ (1-2 hours mein)

### Website Test:
1. Browser mein open karo:
   - `https://cyberprobes.in`
   - `https://www.cyberprobes.in`
2. **HTTPS lock icon** check karo
3. **Login test** karo

---

## ✅ Final Checklist

- [ ] GoDaddy DNS page open kiya
- [ ] AWS Amplify se DNS records copy kiye
- [ ] GoDaddy mein CNAME records add kiye (@ aur www)
- [ ] AWS Amplify environment variables update kiye
- [ ] Redeploy complete ho gaya
- [ ] DNS propagation check kiya (whatsmydns.net)
- [ ] SSL certificate active hai
- [ ] Website custom domain se open ho rahi hai
- [ ] Login test successful hai

---

## 🆘 Common Issues

### DNS Records Add Nahi Ho Rahe?
- GoDaddy page refresh karo
- Browser cache clear karo
- Incognito mode mein try karo

### AWS Amplify Domain Add Nahi Ho Raha?
- Domain already connected hai check karo
- Different AWS region check karo
- AWS support contact karo

### SSL Certificate Pending?
- 1-2 hours wait karo
- DNS records verify karo
- AWS automatically provision karega

---

## 📞 Next Steps

1. **Abhi:** GoDaddy DNS button pe click karo
2. **Phir:** AWS Amplify se DNS records lein
3. **Phir:** GoDaddy mein records add karo
4. **Phir:** Environment variables update karo
5. **Phir:** Wait karo (1-2 hours)

**Total Time:** 15-20 minutes setup + 1-2 hours wait

