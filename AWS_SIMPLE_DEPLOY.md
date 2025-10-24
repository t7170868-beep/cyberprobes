# 🚀 AWS पर Deploy करें - आसान तरीका

## 📋 Prerequisites

### 1. AWS Account बनाएं (अगर नहीं है तो)
- जाएं: https://aws.amazon.com/
- "Create an AWS Account" click करें
- Email: tsinghtshar@gmail.com
- Password: Tuhar11@@
- Credit card add करना होगा (verification के लिए)

---

## 🎯 Method 1: AWS Amplify (सबसे आसान)

### Step 1: Code को GitHub पर Push करें

```powershell
# Terminal में run करें:

# Git initialize करें
git init

# सभी files add करें
git add .

# Commit करें
git commit -m "AWS deployment ready"

# GitHub पर new repository बनाएं
# URL: https://github.com/new
# Name: cyberprobes-site
# Public रखें

# Code push करें (अपना username डालें)
git remote add origin https://github.com/YOUR_USERNAME/cyberprobes-site.git
git branch -M main
git push -u origin main
```

---

### Step 2: AWS Console में Login करें

1. जाएं: https://console.aws.amazon.com/
2. Email: **tsinghtshar@gmail.com**
3. Password: **Tuhar11@@**

---

### Step 3: AWS Amplify खोलें

1. AWS Console में search box में type करें: **"Amplify"**
2. **"AWS Amplify"** click करें
3. या direct जाएं: https://console.aws.amazon.com/amplify/

---

### Step 4: New App बनाएं

1. **"Create new app"** या **"New app"** button click करें
2. **"Host web app"** select करें
3. **"GitHub"** select करें (या जो भी आपने use किया)
4. **"Continue"** click करें

---

### Step 5: GitHub Connect करें

1. **"Connect to GitHub"** click करें
2. GitHub login करें (अगर already login नहीं हैं)
3. AWS Amplify को access दें
4. अपनी **`cyberprobes-site`** repository select करें
5. **`main`** branch select करें
6. **"Next"** click करें

---

### Step 6: Build Settings Configure करें

Build settings automatically detect हो जाएंगी। बस verify करें:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
        - npx prisma generate
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

**"Next"** click करें

---

### Step 7: Environment Variables Add करें

**Important! ये variables जरूर add करें:**

```
NODE_ENV = production
DATABASE_URL = file:./prisma/dev.db
NEXTAUTH_SECRET = [नीचे command से generate करें]
NEXTAUTH_URL = https://main.XXXXXX.amplifyapp.com
```

**NEXTAUTH_SECRET generate करने के लिए:**

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Output को copy करके paste करें।

> **Note:** `NEXTAUTH_URL` को अभी छोड़ सकते हैं, deployment के बाद update करेंगे।

---

### Step 8: Deploy करें!

1. सभी settings review करें
2. **"Save and deploy"** button click करें
3. Wait करें (5-10 minutes लगेंगे)
4. ✅ **Deployment successful!**

---

### Step 9: NEXTAUTH_URL Update करें

1. Deployment complete होने के बाद, आपको URL मिलेगा:
   ```
   https://main.d1234567890.amplifyapp.com
   ```

2. AWS Amplify Dashboard में जाएं
3. **"Environment variables"** section में जाएं
4. **NEXTAUTH_URL** add या update करें:
   ```
   NEXTAUTH_URL = https://main.d1234567890.amplifyapp.com
   ```

5. **"Save"** करें
6. Automatically redeploy होगा

---

## 🎉 Done! आपकी Website Live है!

**URL:** https://main.XXXXXX.amplifyapp.com

---

## 🌐 Custom Domain Add करें (Optional)

### Step 1: Domain खरीदें
- GoDaddy, Namecheap, या AWS Route 53 से

### Step 2: Amplify में Add करें
1. Amplify Dashboard → **"Domain management"**
2. **"Add domain"** click करें
3. अपना domain enter करें
4. **"Configure domain"** click करें
5. DNS settings update करें (Amplify बताएगा कैसे)
6. Wait करें (15-30 minutes)
7. ✅ Custom domain ready!

---

## 🔄 Future Updates Deploy करने के लिए

बस GitHub पर code push करें:

```powershell
git add .
git commit -m "Updated website"
git push
```

**Automatically deploy हो जाएगा!** ✨

---

## 💰 AWS Amplify Cost

### Free Tier (12 months):
- 1000 build minutes/month
- 15 GB data transfer/month
- 5 GB storage

### After Free Tier:
- Build: ~$0.01 per minute
- Hosting: ~$0.15 per GB
- **Expected Cost:** $10-30/month (traffic के according)

---

## 🆘 Troubleshooting

### Build Failed?
1. Check build logs में error
2. Ensure `package.json` में सभी dependencies हैं
3. Check environment variables

### Database Error?
```powershell
# Locally test करें:
npx prisma generate
npx prisma migrate deploy
npm run build
```

### Website not loading?
- Wait करें 5-10 minutes
- Clear browser cache
- Check Amplify console में deployment status

---

## 📞 Support

**AWS Amplify Docs:** https://docs.aws.amazon.com/amplify/
**AWS Support:** https://console.aws.amazon.com/support/

---

## ✅ Deployment Checklist

- [ ] Git installed
- [ ] Code GitHub पर push किया
- [ ] AWS account बनाया (credit card added)
- [ ] AWS Amplify console खोला
- [ ] GitHub repository connected
- [ ] Environment variables added
- [ ] NEXTAUTH_SECRET generated
- [ ] Deployment triggered
- [ ] Website URL मिल गया
- [ ] NEXTAUTH_URL updated
- [ ] Website test किया
- [ ] ✅ Website LIVE है!

---

**Total Time:** 20-30 minutes
**Cost:** Free tier में FREE, बाद में ~$10-30/month
**URL:** Automatic (https://main.XXXXXX.amplifyapp.com)

🎉 **Congratulations! Your website is LIVE on AWS!**
