# 🚀 AWS RDS PostgreSQL Migration Guide - Complete Setup

## 📋 Overview

Yeh guide aapko MongoDB se AWS RDS PostgreSQL pe migrate karne mein help karega. Aapki website already PostgreSQL ke liye configure hai (Prisma schema mein), toh bas RDS database setup karna hai.

---

## ✅ Step 1: AWS RDS Database Create Karo

### 1.1 AWS Console Mein Jao

1. **AWS Console** kholo: https://console.aws.amazon.com/
2. Search bar mein **"RDS"** type karo
3. **RDS** service pe click karo

### 1.2 Database Create Karo

1. **"Create database"** button pe click karo

### 1.3 Database Configuration

#### **Engine Options:**
- ✅ **Engine type**: `PostgreSQL`
- ✅ **Version**: `PostgreSQL 15.x` (ya latest available)

#### **Templates:**
- ✅ **Template**: `Free tier` (agar available hai)
  - Agar free tier nahi hai, toh `Production` ya `Dev/Test` select karo

#### **Settings:**
- **DB instance identifier**: `cyberprobes-db` (ya apna naam)
- **Master username**: `cyberprobes_admin` (ya apna username)
- **Master password**: Strong password daalo (save kar lo!)
  - Example: `CyberProbes@2024!Secure`
- ✅ **Confirm password**

#### **Instance Configuration:**
- **DB instance class**: `db.t3.micro` (Free tier eligible)
  - Agar free tier nahi hai, toh `db.t3.small` bhi use kar sakte ho

#### **Storage:**
- **Storage type**: `General Purpose SSD (gp2)`
- **Allocated storage**: `20 GB` (minimum)
- ✅ **Enable storage autoscaling** (optional, recommended)

#### **Connectivity:**
- **Compute resource**: `Don't connect to an EC2 compute resource`
- **VPC**: Default VPC select karo
- ✅ **Public access**: **YES** (Important! Website se connect karne ke liye)
- **VPC security group**: `Create new`
  - **Security group name**: `cyberprobes-db-sg`
- **Availability Zone**: `No preference`

#### **Database Authentication:**
- ✅ **Password authentication**

#### **Additional Configuration:**
- **Initial database name**: `cyberprobes`
- ✅ **Enable automated backups** (recommended)
- **Backup retention period**: `7 days`
- **Backup window**: `No preference` (ya apna time)

### 1.4 Create Database

1. **"Create database"** button pe click karo
2. ⏰ **Wait**: Database create hone mein **5-10 minutes** lagenge
3. Status **"Available"** hone tak wait karo

---

## 🔒 Step 2: Security Group Configure Karo

### 2.1 Security Group Mein Jao

1. Database create hone ke baad, **RDS Dashboard** mein jao
2. Apne database (`cyberprobes-db`) pe click karo
3. **"Connectivity & security"** tab pe jao
4. **"VPC security groups"** section mein security group pe click karo

### 2.2 Inbound Rules Add Karo

1. **"Inbound rules"** tab pe jao
2. **"Edit inbound rules"** button pe click karo
3. **"Add rule"** pe click karo:
   - **Type**: `PostgreSQL`
   - **Protocol**: `TCP`
   - **Port range**: `5432`
   - **Source**: `Anywhere-IPv4` (0.0.0.0/0)
     - ⚠️ Production mein specific IP use karo, but development ke liye 0.0.0.0/0 theek hai
   - **Description**: `Allow PostgreSQL from anywhere`
4. **"Save rules"** pe click karo

---

## 🔗 Step 3: Connection Details Get Karo

### 3.1 Database Endpoint Copy Karo

1. **RDS Dashboard** mein apne database pe click karo
2. **"Connectivity & security"** tab pe:
   - **Endpoint** copy karo
     - Example: `cyberprobes-db.xxxxxxxxxx.ap-south-1.rds.amazonaws.com`
   - **Port** note karo: `5432`

### 3.2 Connection String Format

```
postgresql://USERNAME:PASSWORD@ENDPOINT:PORT/DATABASE
```

### 3.3 Example Connection String

```
postgresql://cyberprobes_admin:CyberProbes@2024!Secure@cyberprobes-db.xxxxxxxxxx.ap-south-1.rds.amazonaws.com:5432/cyberprobes
```

**Important Notes:**
- `USERNAME`: Aapne jo master username diya (Step 1.3 mein)
- `PASSWORD`: Aapne jo password diya (agar special characters hain to URL encode karo)
- `ENDPOINT`: RDS endpoint (Step 3.1 se)
- `PORT`: `5432` (default PostgreSQL port)
- `DATABASE`: `cyberprobes` (initial database name)

### 3.4 Password Special Characters Encode Karo

Agar password mein special characters hain, toh URL encode karo:

| Character | Encoded |
|-----------|---------|
| `@` | `%40` |
| `!` | `%21` |
| `#` | `%23` |
| `$` | `%24` |
| `%` | `%25` |
| `&` | `%26` |
| `*` | `%2A` |
| `+` | `%2B` |
| `=` | `%3D` |

**Example:**
- Password: `Admin@123!`
- Encoded: `Admin%40123%21`
- Connection String: `postgresql://username:Admin%40123%21@endpoint:5432/cyberprobes`

---

## 💻 Step 4: Local Setup (Development)

### 4.1 .env File Update Karo

Project folder mein `.env` file kholo aur `DATABASE_URL` update karo:

```env
DATABASE_URL="postgresql://cyberprobes_admin:YOUR_PASSWORD@cyberprobes-db.xxxxxxxxxx.ap-south-1.rds.amazonaws.com:5432/cyberprobes"
```

**Replace:**
- `YOUR_PASSWORD` → Apna actual password (URL encoded)
- `cyberprobes-db.xxxxxxxxxx.ap-south-1.rds.amazonaws.com` → Apna actual endpoint

### 4.2 Prisma Client Generate Karo

```powershell
npm run db:generate
```

### 4.3 Database Migrations Run Karo

```powershell
npm run db:migrate
```

Ya agar pehle se migrations hain:

```powershell
npx prisma migrate deploy
```

### 4.4 Database Seed Karo (Admin User Create)

```powershell
npm run db:seed
```

Ya manually:

```powershell
node create-admin.js
```

### 4.5 Test Karo

```powershell
npm run dev
```

Browser mein jao: `http://localhost:3000/auth/login`

**Login Credentials:**
- Email: `admin@cyberprobes.com`
- Password: `admin123`

---

## ☁️ Step 5: AWS Amplify Setup (Production)

### 5.1 AWS Amplify Console Mein Jao

1. **AWS Amplify Console**: https://console.aws.amazon.com/amplify/
2. Apni app select karo (ya nayi app create karo)

### 5.2 Environment Variables Add Karo

1. Left sidebar mein **"Environment variables"** pe click karo
2. **"Manage variables"** pe click karo
3. Neeche diye variables add karo:

#### **Variable 1: DATABASE_URL**
```
Key: DATABASE_URL
Value: postgresql://cyberprobes_admin:YOUR_PASSWORD@YOUR_ENDPOINT:5432/cyberprobes
```

#### **Variable 2: NEXTAUTH_SECRET**
```
Key: NEXTAUTH_SECRET
Value: [Generate karo - minimum 32 characters]
```

**Generate karne ke liye:**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### **Variable 3: NEXTAUTH_URL**
```
Key: NEXTAUTH_URL
Value: https://main.d1ce8jq8iz0ibb.amplifyapp.com
```
(Ya apni actual Amplify app URL)

#### **Variable 4: NODE_ENV**
```
Key: NODE_ENV
Value: production
```

#### **Variable 5: JWT_SECRET** (agar needed hai)
```
Key: JWT_SECRET
Value: [Generate karo - minimum 32 characters]
```

### 5.3 Save Karo

1. Sab variables add karne ke baad **"Save"** pe click karo
2. ⏰ **Wait**: Redeployment automatically start hogi (5-10 minutes)

---

## 🔄 Step 6: Code Push Karo

### 6.1 Git Commit Karo

```powershell
git add .
git commit -m "Migrated to AWS RDS PostgreSQL"
git push origin main
```

AWS Amplify automatically deploy kar dega!

---

## 👤 Step 7: Admin User Create Karo (Production)

Deployment complete hone ke baad:

1. Browser mein jao: `https://your-app-url.amplifyapp.com/api/setup-admin`
2. Ye admin user create kar dega:
   - **Email**: `admin@cyberprobes.com`
   - **Password**: `admin123`

---

## ✅ Step 8: Test Karo

1. Browser mein jao: `https://your-app-url.amplifyapp.com/auth/login`
2. Login karo:
   - **Email**: `admin@cyberprobes.com`
   - **Password**: `admin123`

✅ **Success!** Aapki website ab AWS RDS PostgreSQL use kar rahi hai!

---

## 🔧 Troubleshooting

### Error: "Can't reach database server"

**Solutions:**
1. ✅ Security group mein `0.0.0.0/0` allow karo (Step 2)
2. ✅ **Public access** = `YES` check karo (Step 1.3)
3. ✅ Database status = `Available` check karo

### Error: "Connection timeout"

**Solutions:**
1. ✅ Security group inbound rules check karo (Step 2)
2. ✅ Database endpoint correct hai check karo
3. ✅ Internet connection check karo

### Error: "Authentication failed"

**Solutions:**
1. ✅ Username/password correct hai check karo
2. ✅ Connection string mein special characters URL encode karo (Step 3.4)
3. ✅ Password mein spaces nahi hain check karo

### Error: "Database does not exist"

**Solutions:**
1. ✅ Initial database name `cyberprobes` correct hai check karo
2. ✅ Connection string mein database name correct hai check karo

### Error: "Prisma migration failed"

**Solutions:**
1. ✅ Database connection string correct hai check karo
2. ✅ Prisma client generate karo: `npm run db:generate`
3. ✅ Migrations run karo: `npx prisma migrate deploy`

---

## 💰 Cost Estimation

### AWS RDS PostgreSQL (db.t3.micro)

- **Free Tier**: First 750 hours/month free for 12 months
- **After Free Tier**: ~$15-20/month
- **Storage**: ~$0.10/GB/month (20 GB = ~$2/month)
- **Total (after free tier)**: ~$17-22/month

### Cost Optimization Tips

1. ✅ **Free Tier Use Karo**: Pehle 12 months free
2. ✅ **Stop Database**: Development ke liye agar use nahi ho raha, toh stop kar do
3. ✅ **Reserved Instances**: Long-term use ke liye reserved instances le lo (upto 40% discount)

---

## 🎯 Benefits of AWS RDS vs MongoDB Atlas

✅ **Better AWS Integration**: Same AWS ecosystem, faster connection  
✅ **More Reliable**: Managed by AWS, automatic backups  
✅ **Cost Effective**: Free tier available, competitive pricing  
✅ **Better Performance**: Direct connection from Amplify, low latency  
✅ **No External Dependencies**: Everything in AWS ecosystem  
✅ **Automatic Backups**: Daily backups, point-in-time recovery  
✅ **Scalability**: Easy to scale up/down as needed  

---

## 📞 Need Help?

Agar koi problem ho to:

1. **RDS Dashboard** mein logs check karo
2. **Amplify build logs** check karo
3. **CloudWatch logs** check karo
4. **Database status** check karo (Available hona chahiye)

---

## ✅ Checklist

- [ ] AWS RDS database create kar diya
- [ ] Security group configure kar diya (0.0.0.0/0 allow)
- [ ] Connection string copy kar liya
- [ ] Local `.env` file update kar diya
- [ ] Prisma client generate kar diya
- [ ] Database migrations run kar diye
- [ ] Local test successful hai
- [ ] AWS Amplify environment variables add kar diye
- [ ] Code push kar diya
- [ ] Production deployment successful hai
- [ ] Admin user create kar diya
- [ ] Production login test successful hai

---

## 🎉 Success!

Aapki website ab AWS RDS PostgreSQL pe successfully migrate ho chuki hai! 🚀

**Next Steps:**
- Regular backups enable karo
- Monitoring setup karo (CloudWatch)
- Cost optimization karo
- Security best practices follow karo

---

**Created**: 2024  
**Version**: 1.0  
**Status**: ✅ Complete

