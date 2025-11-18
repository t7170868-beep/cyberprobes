# 🚀 Quick Setup Guide - reCAPTCHA Fix

## ✅ Code is Ready!

All code changes are complete. Now you just need to:

1. **Get Real reCAPTCHA Keys**
2. **Set Environment Variables**
3. **Update Database**

---

## Step 1: Get reCAPTCHA Keys (5 minutes)

1. Go to: https://www.google.com/recaptcha/admin/create
2. Click **"Create"**
3. Fill in:
   - **Label:** CyberProbes Contact Form
   - **Type:** reCAPTCHA v2 → "I'm not a robot" Checkbox
   - **Domains:** 
     - `cyberprobes.in`
     - `main.d1ce8jq8iz0ibb.amplifyapp.com`
     - `localhost` (for testing)
4. Click **"Submit"**
5. **Copy both keys:**
   - Site Key (public)
   - Secret Key (private)

---

## Step 2: Set Environment Variables

### Option A: Use Setup Script (Windows)

```powershell
.\setup-recaptcha.ps1
```

### Option B: Manual Setup

**Local (.env.local):**
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

**AWS Amplify:**
1. Go to AWS Amplify Console
2. Your app → **App settings** → **Environment variables**
3. Add:
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` = your site key
   - `RECAPTCHA_SECRET_KEY` = your secret key
4. **NO QUOTES**, **NO SPACES**

---

## Step 3: Update Database

```bash
# Update database schema (adds phone & company fields)
npx prisma db push

# Regenerate Prisma client
npx prisma generate
```

---

## Step 4: Test

### Local Testing:
```bash
npm run dev
```

1. Go to http://localhost:3000/contact
2. Fill out form
3. Complete reCAPTCHA (should NOT show test warning)
4. Submit form
5. Check database - contact should be saved

### Production Testing:
1. Deploy to AWS Amplify
2. Test contact form
3. Verify no test key warning
4. Check database for submissions

---

## ✅ Verification Checklist

- [ ] Real reCAPTCHA keys obtained
- [ ] `.env.local` updated with keys
- [ ] AWS Amplify environment variables set
- [ ] Database schema updated (`npx prisma db push`)
- [ ] Prisma client regenerated (`npx prisma generate`)
- [ ] Local testing successful
- [ ] Production deployment successful

---

## 🐛 Troubleshooting

### "reCAPTCHA is for testing purposes only"
→ Real keys not set or wrong domain

### "reCAPTCHA verification failed"
→ Secret key wrong or not set in backend

### Database error
→ Run `npx prisma db push` and `npx prisma generate`

---

## 📋 What Was Fixed

✅ Backend API route with reCAPTCHA validation  
✅ Real API integration (no more setTimeout)  
✅ Service icons and descriptions  
✅ Better error handling  
✅ Database schema updated (phone, company fields)  
✅ Form status indicators  

**Status:** Code ready, just need real keys!

