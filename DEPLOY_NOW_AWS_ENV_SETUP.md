# 🚀 CyberProbes - AWS Amplify Deployment Final Steps

## ✅ CODE PUSHED TO GITHUB!

Ab sirf **AWS Environment Variables** set karne hain. Follow these exact steps:

---

## 📋 STEP 1: AWS Amplify Console Open Karo

1. Browser mein jao: **https://console.aws.amazon.com/amplify/**
2. Login with: **tsinghtshar@gmail.com**
3. Apni app select karo: **cyberprobes-site** (main branch)

---

## 📋 STEP 2: Environment Variables Section Kholo

1. Left sidebar mein → **App settings** → **Environment variables**
2. Ya top tabs mein **"Environment variables"** click karo

---

## 📋 STEP 3: YE 7 ENVIRONMENT VARIABLES ADD KARO

### **Variable 1: DATABASE_URL** ✅
```
Key: DATABASE_URL
Value: postgresql://cyber_admin:CyberProbes2025!DB%23@cyberprobes-db.cluster-czis8ka6oj05.eu-north-1.rds.amazonaws.com:5432/cyberprobes
```

### **Variable 2: NEXTAUTH_SECRET** ✅
```
Key: NEXTAUTH_SECRET
Value: cyberprobes-secret-key-production-2025-do-not-share-this-secret-key-with-anyone-ever
```

### **Variable 3: NEXTAUTH_URL** ✅
```
Key: NEXTAUTH_URL
Value: https://main.d1ce8jq8iz0ibb.amplifyapp.com
```

### **Variable 4: NODE_ENV** ✅
```
Key: NODE_ENV
Value: production
```

### **Variable 5: JWT_SECRET** ✅
```
Key: JWT_SECRET
Value: jwt-secret-key-cyberprobes-production-2025-keep-this-secret-never-share
```

### **Variable 6: NEXT_PUBLIC_RAZORPAY_KEY_ID** (Optional - for payment later) ⏳
```
Key: NEXT_PUBLIC_RAZORPAY_KEY_ID
Value: YOUR_RAZORPAY_KEY_ID_HERE
```

### **Variable 7: RAZORPAY_KEY_SECRET** (Optional - for payment later) ⏳
```
Key: RAZORPAY_KEY_SECRET
Value: YOUR_RAZORPAY_KEY_SECRET_HERE
```

---

## 📋 STEP 4: SAVE KARO

1. **"Save"** button click karo (Orange button right side)
2. Confirmation popup aayegi → **"Save"** click karo

---

## 📋 STEP 5: WAIT FOR AUTOMATIC REDEPLOY

AWS Amplify automatically redeploy start kar dega:

1. **"Deployments"** tab pe jao
2. Deployment status dekho:
   - ✅ **Provision** → 1-2 min
   - ✅ **Build** → 3-5 min
   - ✅ **Deploy** → 2-3 min
   - ✅ **Verify** → 1 min

**Total Time: 7-11 minutes** ⏱️

---

## 📋 STEP 6: TEST YOUR WEBSITE

### After deployment completes, test these pages:

✅ **Homepage:**
```
https://main.d1ce8jq8iz0ibb.amplifyapp.com/
```

✅ **Courses Page:**
```
https://main.d1ce8jq8iz0ibb.amplifyapp.com/courses
```

✅ **Registration Page:**
```
https://main.d1ce8jq8iz0ibb.amplifyapp.com/auth/register
```

✅ **Login Page:**
```
https://main.d1ce8jq8iz0ibb.amplifyapp.com/auth/login
```

---

## 🔐 DEFAULT LOGIN CREDENTIALS

```
Email: admin@cyberprobes.com
Password: admin123
```

---

## 🎯 FINAL CHECKLIST

Before testing, make sure:

✅ All 5 required environment variables added (DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, NODE_ENV, JWT_SECRET)
✅ Saved environment variables
✅ Deployment status shows "Deployed" (green checkmark)
✅ No red errors in build logs

---

## 🐛 IF DEPLOYMENT FAILS

### Check Build Logs:
1. Go to **Deployments** tab
2. Click on the failed deployment
3. Expand **"Build"** section
4. Look for errors (usually red text)

### Common Issues:

**Issue 1: Prisma Migration Error**
```
Error: P1001: Can't reach database
```
**Fix:** Check DATABASE_URL is correct with proper password encoding

**Issue 2: Build Error**
```
Error: Module not found
```
**Fix:** Usually auto-fixes on redeploy. Click "Redeploy this version"

**Issue 3: Environment Variables Not Loading**
```
Error: Invalid DATABASE_URL
```
**Fix:** 
1. Go to Environment variables
2. Click "Edit" on DATABASE_URL
3. Make sure there are NO extra spaces or quotes
4. Save again

---

## 📊 DEPLOYMENT STATUS TRACKING

### Current Status:
- ✅ Code pushed to GitHub: **DONE**
- ⏳ Environment variables set: **PENDING** (You need to do Step 3)
- ⏳ AWS Amplify redeploy: **PENDING** (Auto after Step 4)
- ⏳ Website live: **PENDING** (After 7-11 min)

---

## 🎉 AFTER DEPLOYMENT SUCCESS

### What Works:
✅ **Homepage** - Hero section, services, footer
✅ **Courses Page** - Course cards with filters
✅ **Course Detail Page** - Full course info, enrollment button
✅ **Registration** - With real-time name validation (no numbers!)
✅ **Login** - Admin and user login
✅ **Dashboard** - User profile and enrolled courses

### What's Pending (Future Tasks):
⏳ Razorpay payment integration (webhook + email)
⏳ Forgot password flow
⏳ Course video player page
⏳ Admin panel
⏳ Email automation
⏳ Certificates

---

## 📞 SUPPORT

If you face any issues:
1. Check deployment logs in AWS Amplify console
2. Verify environment variables are exact (no typos)
3. Make sure RDS database is publicly accessible (we configured this earlier)
4. Test database connection from local first

---

## 🚀 READY TO DEPLOY?

**Current Time:** Just pushed code!
**Next Step:** Go to AWS Amplify Console and add environment variables (Step 2-3 above)
**ETA to Live:** 10-15 minutes after you complete Step 3!

---

**Good luck! 🎯**


