# 🚀 Vercel Deployment Guide (5 Minutes!)

## ✅ क्यों Vercel?
- ✅ **100% FREE** for personal projects
- ✅ **No credit card** required
- ✅ **5 minutes** में deploy
- ✅ **Automatic HTTPS**
- ✅ **Global CDN**
- ✅ **GitHub integration** - push करो और automatic deploy!

---

## 📋 Step-by-Step Deployment

### Step 1: GitHub Account बनाएं (if needed)
1. जाएं: https://github.com/signup
2. Sign up करें (या login करें)

---

### Step 2: GitHub पर Code Upload करें

```powershell
# Terminal खोलें project folder में

# Git initialize करें
git init

# सभी files add करें
git add .

# Commit करें
git commit -m "Ready for deployment"

# GitHub पर जाएं और new repository बनाएं
# Repository name: cyberprobes-site
# Public या Private (दोनों free हैं)

# अपनी repository का URL copy करें, फिर:
git remote add origin https://github.com/YOUR_USERNAME/cyberprobes-site.git
git branch -M main
git push -u origin main
```

---

### Step 3: Vercel Account बनाएं

1. जाएं: https://vercel.com/signup
2. **"Continue with GitHub"** click करें
3. GitHub से authorize करें
4. Free plan select करें

---

### Step 4: Project Deploy करें

1. Vercel Dashboard में जाएं: https://vercel.com/dashboard
2. **"Add New Project"** click करें
3. अपनी `cyberprobes-site` repository select करें
4. **"Import"** click करें

**Configure Settings:**
- **Framework Preset:** Next.js (auto-detected)
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

**Environment Variables Add करें:**
```
NODE_ENV=production
DATABASE_URL=file:./prisma/dev.db
NEXTAUTH_SECRET=[generate करें नीचे दिए command से]
NEXTAUTH_URL=https://your-project.vercel.app
```

5. **"Deploy"** button click करें

---

### Step 5: NEXTAUTH_SECRET Generate करें

Terminal में run करें:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Output को copy करके Vercel में `NEXTAUTH_SECRET` में paste करें।

---

## 🎉 Done! आपकी Website Live है!

**URL होगी:** `https://cyberprobes-site.vercel.app`

या custom domain add करें:
1. Vercel Dashboard → Settings → Domains
2. अपना domain add करें
3. DNS settings update करें (Vercel automatically बताएगा)

---

## 🔄 Future Updates Deploy करने के लिए:

```powershell
# Code में changes करें
git add .
git commit -m "Updated website"
git push

# Automatically deploy हो जाएगा! 🚀
```

---

## 💡 Vercel vs AWS

| Feature | Vercel | AWS Amplify |
|---------|--------|-------------|
| Setup Time | 5 mins | 15 mins |
| Price (Free Tier) | Forever Free | Limited Free |
| Auto Deploy | ✅ Yes | ✅ Yes |
| HTTPS | ✅ Automatic | ✅ Automatic |
| Credit Card | ❌ Not Required | ✅ Required |
| Ease | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## 🆘 Troubleshooting

### Build Fails?
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify environment variables

### Database Issues?
```powershell
# Locally run:
npx prisma generate
npx prisma migrate deploy
```

---

## 📞 Support

**Vercel Docs:** https://vercel.com/docs
**Community:** https://github.com/vercel/next.js/discussions

---

## ✅ Checklist

- [ ] GitHub account बनाया
- [ ] Code GitHub पर push किया
- [ ] Vercel account बनाया
- [ ] Project import किया
- [ ] Environment variables add किए
- [ ] Deploy button click किया
- [ ] Website live है! 🎉

---

**Total Time:** 5-10 minutes
**Cost:** $0 (FREE!)
**URL:** https://your-project.vercel.app

🚀 **Congratulations! Your website is LIVE!**
