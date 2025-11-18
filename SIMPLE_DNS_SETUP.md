# 🎯 Simple DNS Setup Guide - Step by Step

## ✅ Current Status
- Domain: `cyberprobes.in` 
- AWS Amplify mein domain add ho chuka hai
- Ab DNS records GoDaddy mein add karne hain

---

## 📍 Step 1: AWS Amplify Mein DNS Records Find Karo

### Option A: Domain List Mein Check Karo
1. **AWS Amplify Console** mein
2. Left sidebar mein **"Custom domains"** pe click karo
3. Agar domain list dikhe, `cyberprobes.in` pe click karo
4. Domain details page pe DNS records dikhenge

### Option B: Domain Management Page Pe
1. Current page pe **scroll down** karo
2. **"DNS records"** section dhundho
3. Ya **"Domain verification"** section check karo
4. Wahan DNS records dikhenge

### Option C: Domain Name Pe Click Karo
1. Agar page pe domain name dikhe (cyberprobes.in)
2. Uspe **click karo**
3. Details page pe DNS records milenge

---

## 📋 Expected DNS Records

AWS aapko kuch aise records dega:

```
Type: CNAME
Name: @
Value: d1ce8jq8iz0ibb.cloudfront.net

Type: CNAME  
Name: www
Value: d1ce8jq8iz0ibb.cloudfront.net
```

**⚠️ Important:** 
- CloudFront URL unique hota hai
- Aapka URL different hoga
- Example: `d1ce8jq8iz0ibb.cloudfront.net` (aapka different hoga)

---

## 🌐 Step 2: GoDaddy Mein DNS Records Add Karo

### 2.1 GoDaddy Login
1. **GoDaddy.com** open karo
2. Login karo:
   - Email: `adarshsrivastavaa001@gmail.com`
   - Password: `Haddi206@`

### 2.2 Domain Select Karo
1. **My Products** section mein jao
2. **cyberprobes.in** domain select karo
3. **DNS** button pe click karo

### 2.3 DNS Records Add Karo

**Record 1: Root Domain (@)**
1. **"Add"** ya **"+"** button pe click karo
2. **Type:** `CNAME` select karo
3. **Name:** `@` enter karo (ya field empty chhod do)
4. **Value:** AWS se jo CloudFront URL mila, woh paste karo
   - Example: `d1ce8jq8iz0ibb.cloudfront.net`
5. **TTL:** `600` select karo
6. **Save** karo

**Record 2: WWW Subdomain**
1. Phir se **"Add"** button pe click karo
2. **Type:** `CNAME` select karo
3. **Name:** `www` enter karo
4. **Value:** Same CloudFront URL (AWS se jo mila)
5. **TTL:** `600` select karo
6. **Save** karo

---

## ⏳ Step 3: Wait for DNS Propagation

1. **DNS Propagation Time:** 30 minutes - 2 hours
2. **Check Karo:** https://www.whatsmydns.net/
3. Domain enter karo: `cyberprobes.in`
4. Check karo ki DNS records globally propagate ho gaye hain

---

## 🔧 Step 4: Environment Variables Update

### AWS Amplify Console Mein:
1. **App settings** → **Environment variables**
2. **Update Karein:**
   - `NEXTAUTH_URL` = `https://cyberprobes.in`
   - `NEXT_PUBLIC_BASE_URL` = `https://cyberprobes.in`
3. **Save** karo
4. **Redeploy** automatically start hoga

---

## ✅ Final Checklist

- [ ] AWS Amplify se DNS records copy kiye
- [ ] GoDaddy mein login ho gaya
- [ ] DNS management page open kiya
- [ ] CNAME record add kiya for @ (root domain)
- [ ] CNAME record add kiya for www
- [ ] Records save kiye
- [ ] Environment variables update kiye
- [ ] DNS propagation wait kiya (30 min - 2 hours)
- [ ] Website test kiya

---

## 🆘 Agar DNS Records Nahi Dikh Rahe

1. **AWS Amplify Console** refresh karo (F5)
2. **Domain status** check karo - "Pending verification" ho sakta hai
3. **Domain name** pe click karo - details page pe records dikhenge
4. **Support** contact karo agar issue persist kare

---

## 📞 Next Steps

1. **Abhi:** AWS Amplify mein DNS records find karo
2. **Phir:** GoDaddy mein records add karo
3. **Phir:** Environment variables update karo
4. **Phir:** Wait karo (1-2 hours)
5. **Phir:** Website test karo

**Total Time:** 15-20 minutes setup + 1-2 hours wait

