# 🔒 reCAPTCHA Fix Guide - Complete Solution

## ✅ Issues Fixed

1. ✅ **Backend API Route Created** - `/api/contact` with proper reCAPTCHA validation
2. ✅ **Real API Integration** - Contact form now calls real API instead of setTimeout
3. ✅ **Service Icons & Descriptions** - Added icons and helpful descriptions
4. ✅ **Better Error Handling** - Improved error messages and status indicators
5. ✅ **Database Schema Updated** - Added phone and company fields to Contact model

---

## 🚨 Current Problem: Test Keys Being Used

**You're seeing:** "This reCAPTCHA is for testing purposes only"

**Reason:** The code is using Google's test key as fallback:
```typescript
sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
```

---

## 🔧 Step-by-Step Fix

### Step 1: Get Real reCAPTCHA Keys from Google

1. **Go to Google reCAPTCHA Admin Console:**
   - https://www.google.com/recaptcha/admin/create

2. **Create New Site:**
   - **Label:** "CyberProbes Contact Form"
   - **Type:** reCAPTCHA v2 → "I'm not a robot" Checkbox
   - **Domains:** 
     - `cyberprobes.in`
     - `main.d1ce8jq8iz0ibb.amplifyapp.com` (your Amplify domain)
     - `localhost` (for local development)

3. **Copy Your Keys:**
   - **Site Key** (public) - Use in frontend
   - **Secret Key** (private) - Use in backend only

---

### Step 2: Update Environment Variables

#### Local Development (.env.local):
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

#### AWS Amplify Console:
1. Go to **App settings** → **Environment variables**
2. Add these variables:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

**⚠️ Important:**
- **NO QUOTES** around values
- **NO SPACES** before/after
- Site Key is public (safe in frontend)
- Secret Key is private (backend only)

---

### Step 3: Verify Backend Validation

The API route (`src/app/api/contact/route.ts`) now:
- ✅ Validates reCAPTCHA token with Google
- ✅ Saves contact form to database
- ✅ Returns proper error messages
- ✅ Handles database errors gracefully

**How it works:**
```typescript
// Frontend sends token
const response = await fetch('/api/contact', {
  method: 'POST',
  body: JSON.stringify({
    ...formData,
    recaptchaToken, // Token from reCAPTCHA
  }),
});

// Backend validates with Google
const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
```

---

### Step 4: Update Database Schema

**Run migration:**
```bash
npx prisma db push
```

Or if using migrations:
```bash
npx prisma migrate dev --name add_contact_phone_company
```

**New Contact model fields:**
- `phone` (optional)
- `company` (optional)

---

## 🎨 UI/UX Improvements Made

### ✅ 1. Service Dropdown with Icons
```typescript
<option value="Penetration Testing">🔒 Penetration Testing - Identify vulnerabilities before attackers do</option>
<option value="Security Assessment">🛡️ Security Assessment - Comprehensive security evaluation</option>
```

### ✅ 2. Service Descriptions
When user selects a service, shows helpful description below dropdown.

### ✅ 3. Better Error Messages
- Clear error messages for each field
- reCAPTCHA error handling
- API error messages displayed to user

### ✅ 4. Form Status Indicators
- Loading spinner during submission
- Success message with green checkmark
- Error messages in red boxes
- Disabled button during submission

---

## 🔍 Testing Checklist

### Before Testing:
- [ ] Real reCAPTCHA keys obtained from Google
- [ ] Environment variables set in `.env.local` (local) and Amplify (production)
- [ ] Database schema updated (`npx prisma db push`)
- [ ] Prisma client regenerated (`npx prisma generate`)

### Test Locally:
1. Start dev server: `npm run dev`
2. Go to `/contact`
3. Fill out form
4. Complete reCAPTCHA
5. Submit form
6. Check:
   - ✅ Form submits successfully
   - ✅ Success message appears
   - ✅ Data saved in database
   - ✅ No test key warning

### Test in Production:
1. Deploy to AWS Amplify
2. Verify environment variables are set
3. Test contact form
4. Check:
   - ✅ reCAPTCHA works (no test warning)
   - ✅ Form submits successfully
   - ✅ Data saved in database

---

## 🐛 Troubleshooting

### Issue: "reCAPTCHA is for testing purposes only"
**Solution:**
- Verify `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set
- Check it's not the test key: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
- Ensure domain is added in Google reCAPTCHA console

### Issue: "reCAPTCHA verification failed"
**Solution:**
- Check `RECAPTCHA_SECRET_KEY` is set in backend
- Verify secret key matches site key in Google console
- Check backend logs for detailed error

### Issue: Form submits but shows error
**Solution:**
- Check browser console for errors
- Check network tab for API response
- Verify database connection
- Check Prisma schema is updated

### Issue: Database error on submit
**Solution:**
- Run `npx prisma db push` to update schema
- Run `npx prisma generate` to regenerate client
- Verify DATABASE_URL is correct

---

## 📋 Files Modified

1. ✅ **src/app/api/contact/route.ts** - Created (backend API with reCAPTCHA validation)
2. ✅ **src/app/contact/page.tsx** - Updated (real API integration, service icons, better errors)
3. ✅ **prisma/schema.prisma** - Updated (added phone and company fields)

---

## 🚀 Next Steps (Optional Improvements)

### 1. Switch to Invisible reCAPTCHA
For even cleaner UI, you can switch to invisible reCAPTCHA:

```typescript
<ReCAPTCHA
  ref={recaptchaRef}
  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
  size="invisible"
  onChange={(token) => setRecaptchaToken(token)}
/>

// Execute on form submit
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!recaptchaToken) {
    recaptchaRef.current?.execute();
    return;
  }
  // ... rest of submit logic
};
```

### 2. Add Geo-IP Autofill
You can add country detection using a service like:
- ipapi.co (free tier available)
- ip-api.com (free tier available)

### 3. Email Notifications
Add email notification when contact form is submitted:
- SendGrid
- AWS SES
- Nodemailer

---

## ✅ Summary

**What was fixed:**
- ✅ Backend API route with reCAPTCHA validation
- ✅ Real API integration (no more setTimeout)
- ✅ Service icons and descriptions
- ✅ Better error handling
- ✅ Database schema updated

**What you need to do:**
1. Get real reCAPTCHA keys from Google
2. Set environment variables (local + Amplify)
3. Update database schema
4. Test and deploy

**Status:** ✅ Code is ready, just need real keys!

---

**Last Updated:** $(date)
**Priority:** HIGH - Fix reCAPTCHA keys to remove test warning

