# Environment Setup Guide / पर्यावरण सेटअप गाइड

## ✅ Step 1: .env File Created
आपकी `.env` file बन गई है! अब आपको MongoDB setup करना होगा।

## 📦 Step 2: MongoDB Setup

### Option A: Local MongoDB (अगर MongoDB locally installed है)

1. MongoDB service start करें:
```powershell
# Windows Service
net start MongoDB
```

2. या MongoDB Community Server download करें:
   - https://www.mongodb.com/try/download/community
   - Install करें और service start करें

### Option B: MongoDB Atlas (Recommended - Free Cloud Database) ⭐

1. MongoDB Atlas account बनाएं: https://www.mongodb.com/cloud/atlas/register
2. Free Cluster create करें (M0 Sandbox - Free forever)
3. Database User बनाएं (username और password)
4. Network Access में अपना IP add करें (या 0.0.0.0/0 for development)
5. Connection String copy करें:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/cyberprobes?retryWrites=true&w=majority
   ```
6. `.env` file में `DATABASE_URL` update करें

## 🔧 Step 3: Update .env File (अगर MongoDB Atlas use कर रहे हैं)

`.env` file खोलें और `DATABASE_URL` को अपने MongoDB Atlas connection string से replace करें:

```env
DATABASE_URL="mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/cyberprobes?retryWrites=true&w=majority"
```

## 🚀 Step 4: Run Database Migrations

```powershell
# Prisma client generate करें
npm run db:generate

# Database को seed करें (admin user create करने के लिए)
npm run db:seed
```

## 🎯 Step 5: Restart Development Server

```powershell
# Server को restart करें
npm run dev
```

## 🔐 Step 6: Login

अब आप login कर सकते हैं:
- Email: admin@cyberprobes.com
- Password: admin123

## ⚠️ Important Notes

1. **NEXTAUTH_SECRET**: Production में एक strong secret use करें:
   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

2. **Security**: `.env` file को कभी git में commit न करें (यह already .gitignore में है)

3. **MongoDB Connection Issues**: 
   - Check if MongoDB service is running
   - Verify connection string
   - Check network access settings (for Atlas)
   - Check username/password

## 🆘 Troubleshooting

### Error: "MongooseServerSelectionError"
- MongoDB service running नहीं है
- Connection string galat है
- Network access blocked है (Atlas में IP whitelist check करें)

### Error: "Invalid email or password"
- Database seed नहीं हुआ है - run `npm run db:seed`
- Admin user create नहीं हुआ है

### Still Having Issues?
Check logs in terminal where `npm run dev` is running.

