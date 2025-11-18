# 🚀 GoDaddy Domain Setup - Quick Steps

## ⚡ Fast Track Guide (15-20 minutes setup, 1-2 hours wait)

### Step 1: AWS Amplify (5 minutes)
1. AWS Amplify Console → Domain management → Add domain
2. Apna GoDaddy domain enter karo (e.g., `cyberprobes.com`)
3. **DNS records copy karo** (CNAME ya A records)

### Step 2: GoDaddy DNS (5 minutes)
1. GoDaddy.com → My Products → Domain → DNS
2. AWS se jo records mile, unhe add karo:
   - Type: CNAME, Name: @, Value: (AWS CloudFront URL)
   - Type: CNAME, Name: www, Value: (same CloudFront URL)
3. Save karo

### Step 3: Environment Variables (2 minutes)
1. AWS Amplify → App settings → Environment variables
2. Update karo:
   ```
   NEXTAUTH_URL=https://cyberprobes.com
   NEXT_PUBLIC_BASE_URL=https://cyberprobes.com
   ```
3. Save → Auto redeploy hoga

### Step 4: Wait (1-2 hours)
- DNS propagation: 30 min - 2 hours
- SSL certificate: 1-2 hours
- Total: ~2 hours

### Step 5: Test
1. `https://cyberprobes.com` open karo
2. HTTPS lock icon check karo
3. Login test karo

---

## 📋 DNS Records Example

**AWS Amplify se milega:**
```
CNAME  @  →  d1234567890.cloudfront.net
CNAME  www  →  d1234567890.cloudfront.net
```

**GoDaddy mein add karo:**
- Type: CNAME
- Name: @ (root domain)
- Value: d1234567890.cloudfront.net
- TTL: 600

---

## ⚠️ Important Notes

1. **NO trailing slash** in URLs:
   - ✅ `https://cyberprobes.com`
   - ❌ `https://cyberprobes.com/`

2. **HTTPS use karo** (not HTTP):
   - ✅ `https://cyberprobes.com`
   - ❌ `http://cyberprobes.com`

3. **NO quotes** in environment variables:
   - ✅ `NEXTAUTH_URL=https://cyberprobes.com`
   - ❌ `NEXTAUTH_URL="https://cyberprobes.com"`

---

## 🎯 After Setup Checklist

- [ ] DNS records GoDaddy mein add ho gaye
- [ ] Environment variables update ho gaye
- [ ] Redeploy complete ho gaya
- [ ] DNS propagation ho gaya (check: whatsmydns.net)
- [ ] SSL certificate active hai
- [ ] Website custom domain se open ho rahi hai
- [ ] HTTPS working hai
- [ ] Login test successful hai

---

## 🆘 Quick Troubleshooting

**Domain open nahi ho raha?**
→ DNS propagation wait karo (30 min - 2 hours)

**SSL pending?**
→ 1-2 hours wait karo, AWS automatically provision karega

**500 error?**
→ Environment variables check karo, redeploy karo

**Detailed guide:** `GODADDY_DOMAIN_SETUP.md` dekho

