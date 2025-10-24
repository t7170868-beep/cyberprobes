# 🚀 AWS Amplify Deployment Guide - CyberProbes Website

## ✅ Prerequisites (Already Done!)
- ✅ Code pushed to GitHub: `https://github.com/t7170868-beep/cyberprobes`
- ✅ AWS Account: `tsinghtshar@gmail.com`
- ✅ Build configuration file created: `amplify.yml`

---

## 📋 Step-by-Step Deployment Instructions

### Step 1: Open AWS Amplify Console
🌐 **URL:** https://console.aws.amazon.com/amplify/

🔐 **Login:**
- Email: `tsinghtshar@gmail.com`
- Password: `Tuhar11@@`

---

### Step 2: Create New App

1. Click **"Create new app"** button
2. Select **"Host web app"**
3. Choose **"GitHub"** as source
4. Click **"Continue"**

---

### Step 3: Authorize GitHub

1. Click **"Authorize AWS Amplify"**
2. Login to GitHub if needed (account: `t7170868-beep`)
3. Grant permissions to AWS Amplify

---

### Step 4: Select Repository & Branch

1. **Repository:** Select `t7170868-beep/cyberprobes`
2. **Branch:** Select `main`
3. Click **"Next"**

---

### Step 5: Configure Build Settings

The `amplify.yml` file in your repository will be automatically detected!

✅ **Auto-detected configuration:**
- Framework: Next.js
- Build command: `npm run build`
- Output directory: `.next`

Click **"Next"**

---

### Step 6: Add Environment Variables (IMPORTANT!)

Click **"Advanced settings"** and add these environment variables:

| Variable Name | Value |
|--------------|-------|
| `NODE_ENV` | `production` |
| `NEXTAUTH_SECRET` | `cyberprobes-secret-2024-please-change-this` |
| `DATABASE_URL` | `file:./prisma/dev.db` |

**Note:** You'll need to update `NEXTAUTH_URL` and `NEXT_PUBLIC_BASE_URL` after deployment with your actual Amplify URL.

Click **"Next"**

---

### Step 7: Review & Deploy

1. Review all settings
2. Click **"Save and deploy"**
3. ⏳ Wait 5-10 minutes for deployment

---

### Step 8: Monitor Deployment

You'll see 4 stages:
1. ✅ Provision (30 seconds)
2. ✅ Build (5-7 minutes)
3. ✅ Deploy (1 minute)
4. ✅ Verify (30 seconds)

---

### Step 9: Get Your Live URL

After successful deployment, you'll get a URL like:
```
https://main.d1a2b3c4d5e6f.amplifyapp.com
```

🎉 **Your website is now LIVE!**

---

### Step 10: Update Environment Variables (Post-Deployment)

1. Go to **App settings → Environment variables**
2. Update these variables with your actual URL:

```
NEXTAUTH_URL=https://main.d[YOUR-APP-ID].amplifyapp.com
NEXT_PUBLIC_BASE_URL=https://main.d[YOUR-APP-ID].amplifyapp.com
```

3. Click **"Save"**
4. Redeploy the app

---

## 🔄 Automatic Deployments

From now on, whenever you push code to GitHub:
```bash
git add .
git commit -m "Update website"
git push origin main
```

AWS Amplify will **automatically deploy** your changes! 🚀

---

## 🌐 Connect Custom Domain (GoDaddy)

If you want to use your GoDaddy domain:

1. In Amplify Console, go to **Domain management**
2. Click **"Add domain"**
3. Enter your domain name
4. Follow DNS configuration steps
5. Add CNAME records in GoDaddy dashboard

---

## 🐛 Troubleshooting

### Build Failed?
- Check build logs in Amplify console
- Ensure all dependencies are in `package.json`
- Verify `amplify.yml` configuration

### Database Issues?
- SQLite may not work on Amplify (serverless)
- Consider using PostgreSQL or MySQL
- Update `DATABASE_URL` accordingly

### Authentication Issues?
- Verify `NEXTAUTH_SECRET` is set
- Update `NEXTAUTH_URL` with actual domain
- Check NextAuth configuration

---

## 📞 Need Help?

If you see any errors during deployment:
1. Screenshot the error
2. Check the build logs
3. Share the error message

---

## ✅ Success Checklist

- [ ] Logged into AWS Amplify Console
- [ ] Connected GitHub repository
- [ ] Selected correct repository & branch
- [ ] Added environment variables
- [ ] Deployment started
- [ ] Build completed successfully
- [ ] Website is live
- [ ] Updated NEXTAUTH_URL
- [ ] Tested login functionality

---

**🎯 Deployment should take 5-10 minutes total!**

Good luck! 🚀

