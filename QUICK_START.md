# 🚀 Quick Start Guide - CyberProbes

## ⚠️ आपकी Current Problem
Login नहीं हो रहा क्योंकि MongoDB setup नहीं है।

## ✅ Solution (5 Minutes में Fix करें)

### Option 1: MongoDB Atlas (Free & Cloud) - RECOMMENDED ⭐

1. **Account बनाएं**: https://www.mongodb.com/cloud/atlas/register
   - Google या Email से signup करें

2. **Free Cluster बनाएं**:
   - "Build a Database" पर click करें
   - **M0 (Free)** को select करें
   - Cluster Name: `cyberprobes` (या कोई भी)
   - Click "Create"

3. **Database User बनाएं**:
   - Security → Database Access → Add New Database User
   - Username: `admin`
   - Password: कोई strong password (याद रखें!)
   - Role: "Atlas Admin" select करें
   - Click "Add User"

4. **Network Access Allow करें**:
   - Security → Network Access → Add IP Address
   - Click "Allow Access From Anywhere" (0.0.0.0/0)
   - या अपना current IP add करें
   - Click "Confirm"

5. **Connection String Copy करें**:
   - Database → Connect
   - "Drivers" select करें
   - Connection string copy करें (कुछ ऐसा होगा):
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

6. **`.env` File Update करें**:
   - Project folder में `.env` file खोलें
   - `DATABASE_URL` को update करें:
   ```env
   DATABASE_URL="mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/cyberprobes?retryWrites=true&w=majority"
   ```
   - `<password>` को अपने actual password से replace करें
   - Database name add करें (URL के end में `/cyberprobes`)

7. **Database को Seed करें** (Terminal में):
   ```powershell
   npm run db:seed
   ```

8. **Development Server Restart करें**:
   ```powershell
   npm run dev
   ```

9. **Login करें**: http://localhost:3000/auth/login
   - Email: `admin@cyberprobes.com`
   - Password: `admin123`

---

### Option 2: Local MongoDB (अगर already installed है)

1. **MongoDB Service Start करें**:
   ```powershell
   net start MongoDB
   ```

2. **Database को Seed करें**:
   ```powershell
   npm run db:seed
   ```

3. **Server Restart करें**:
   ```powershell
   npm run dev
   ```

---

## 🎯 Login Credentials (Seed के बाद)

### Admin User
- Email: `admin@cyberprobes.com`
- Password: `admin123`

### Test User
- Email: `user@cyberprobes.com`
- Password: `user123`

---

## ❌ Common Errors & Solutions

### Error: "MongoServerSelectionTimeoutError"
**Problem**: MongoDB से connect नहीं हो रहा
**Solution**:
- Atlas: Network Access में IP whitelist check करें
- Local: MongoDB service running है check करें: `net start MongoDB`

### Error: "Authentication failed"
**Problem**: Username/password galat है
**Solution**:
- Connection string में password check करें
- Special characters को URL encode करें (जैसे @ को %40)

### Error: "Invalid email or password" (Login page पर)
**Problem**: Database seed नहीं हुआ है
**Solution**:
```powershell
npm run db:seed
```

### Error: "PrismaClientInitializationError"
**Problem**: Prisma client generate नहीं हुआ
**Solution**:
```powershell
npm run db:generate
```

---

## 🔧 Commands Reference

```powershell
# Prisma client generate
npm run db:generate

# Database seed (admin user create)
npm run db:seed

# Development server
npm run dev

# Database studio (GUI)
npm run db:studio
```

---

## 📝 Next Steps (Login के बाद)

1. **Dashboard access करें**: http://localhost:3000/dashboard
2. **Admin Panel**: http://localhost:3000/dashboard/admin
3. **Create content**: Blogs, Courses, Videos
4. **Manage users**: Add/remove users

---

## 🆘 Still Having Issues?

1. Check terminal output जहां `npm run dev` चल रहा है
2. Browser console check करें (F12)
3. `.env` file में सारे variables set हैं check करें
4. MongoDB Atlas dashboard में cluster status check करें (green होना चाहिए)

---

## 🔐 Security Tips

1. **Production के लिए**:
   - Strong `NEXTAUTH_SECRET` use करें
   - Admin password change करें
   - Network Access को specific IPs तक limit करें

2. **`.env` file को कभी git में commit न करें** (already in .gitignore)

3. **Regular backups लें** MongoDB Atlas में automatic backups available हैं

