# 🚀 AWS RDS Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: AWS RDS Database Create Karo

1. **AWS Console** → **RDS** → **Create database**
2. **PostgreSQL** select karo
3. **Free tier** template select karo
4. Settings:
   - **DB identifier**: `cyberprobes-db`
   - **Master username**: `cyberprobes_admin`
   - **Master password**: Strong password save kar lo!
   - **Database name**: `cyberprobes`
5. **Public access**: ✅ **YES**
6. **Create database** click karo

⏰ Wait: 5-10 minutes

---

### Step 2: Security Group Configure Karo

1. Database pe click karo → **Connectivity & security**
2. Security group pe click karo
3. **Inbound rules** → **Edit inbound rules**
4. **Add rule**:
   - **Type**: PostgreSQL
   - **Port**: 5432
   - **Source**: 0.0.0.0/0
5. **Save rules**

---

### Step 3: Connection String Setup (PowerShell Script)

```powershell
.\migrate-to-rds.ps1
```

Yeh script automatically:
- ✅ Connection string generate karega
- ✅ .env file update karega
- ✅ Prisma client generate karega
- ✅ Database migrations run karega
- ✅ Admin user create karega

**Ya manually:**

```powershell
.\setup-aws-rds.ps1
```

---

### Step 4: Test Karo

```powershell
npm run dev
```

Browser: `http://localhost:3000/auth/login`

**Login:**
- Email: `admin@cyberprobes.com`
- Password: `admin123`

---

### Step 5: Production Deploy (AWS Amplify)

1. **AWS Amplify Console** → Your App
2. **Environment variables** → Add:
   - `DATABASE_URL`: (PostgreSQL connection string)
   - `NEXTAUTH_SECRET`: (Generate kar lo)
   - `NEXTAUTH_URL`: (Your app URL)
3. Code push karo: `git push origin main`

---

## 📝 Connection String Format

```
postgresql://USERNAME:PASSWORD@ENDPOINT:5432/DATABASE
```

**Example:**
```
postgresql://cyberprobes_admin:MyPass%40123!@cyberprobes-db.abc123.ap-south-1.rds.amazonaws.com:5432/cyberprobes
```

⚠️ **Important**: Password mein special characters ho to URL encode karo!

---

## 🔧 Troubleshooting

### Connection Error?
- ✅ Security group mein 0.0.0.0/0 allow karo
- ✅ Public access = YES check karo
- ✅ Database status = Available check karo

### Authentication Error?
- ✅ Password URL encoded hai check karo
- ✅ Username/password correct hai check karo

### Migration Error?
- ✅ `npm run db:generate` run karo
- ✅ `npm run db:migrate` run karo

---

## 📚 Full Guide

Complete detailed guide: **AWS_RDS_MIGRATION_COMPLETE.md**

---

## ✅ What's Changed?

✅ **Database**: MongoDB → PostgreSQL (AWS RDS)  
✅ **Code**: All MongoDB code updated to Prisma  
✅ **Scripts**: New migration scripts added  
✅ **Documentation**: Complete guides added  

---

## 🎉 Done!

Aapki website ab AWS RDS PostgreSQL pe ready hai! 🚀

