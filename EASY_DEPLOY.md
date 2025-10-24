# 🚀 आसान Deployment Guide - 3 Steps में Deploy करें!

## 🎯 सबसे आसान तरीका: Vercel (FREE)

### Step 1️⃣: GitHub पर Code Upload करें (5 min)

```powershell
# इन commands को PowerShell में run करें:

# 1. Git initialize करें
git init

# 2. सभी files add करें
git add .

# 3. Commit करें
git commit -m "Initial deployment"
```

**अब GitHub पर जाएं:**
1. https://github.com/new पर जाएं
2. Repository name: `cyberprobes-site`
3. Create repository click करें
4. वहां दिए गए commands copy करें या ये use करें:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/cyberprobes-site.git
git branch -M main
git push -u origin main
```

---

### Step 2️⃣: Vercel पर Deploy करें (3 min)

1. **जाएं:** https://vercel.com/signup
2. **"Continue with GitHub"** click करें
3. **Sign in** करें GitHub से
4. **"New Project"** click करें
5. **`cyberprobes-site`** repository select करें
6. **"Deploy"** click करें

✅ **Done! Website live है!**

---

### Step 3️⃣: Environment Variables Set करें (2 min)

Vercel Dashboard में:
1. **Settings** → **Environment Variables**
2. ये add करें:

```
NODE_ENV = production
NEXTAUTH_SECRET = [नीचे command से generate करें]
```

**NEXTAUTH_SECRET generate करने के लिए:**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🎉 DONE! आपकी Website Live है!

**URL:** https://cyberprobes-site.vercel.app

---

## 🔄 Updates Deploy करने के लिए:

```powershell
git add .
git commit -m "Updated"
git push
```

**Automatic deploy हो जाएगा!** ✨

---

## 💰 Cost: $0 (FREE!)
## ⏱️ Time: 10 minutes
## 🌐 URL: Automatic
## 🔒 HTTPS: Automatic

---

## Alternative: Netlify (भी FREE है)

1. https://app.netlify.com/signup पर जाएं
2. GitHub से sign in करें
3. Repository select करें
4. Deploy click करें

---

## Alternative: Railway (भी FREE है)

1. https://railway.app/ पर जाएं
2. "Start a New Project" click करें
3. GitHub से connect करें
4. Deploy click करें

---

## 🆘 Help की जरूरत है?

**Vercel Guide पढ़ें:** `VERCEL_DEPLOYMENT.md`
**AWS Guide पढ़ें:** `AWS_DEPLOYMENT_GUIDE.md`

---

## ✅ Quick Checklist

- [ ] Git installed hai?
- [ ] GitHub account hai?
- [ ] Code GitHub पर push kiya?
- [ ] Vercel account banaya?
- [ ] Deploy button click kiya?
- [ ] Website live hai! 🎉

**सवाल है तो पूछें!** 💬
