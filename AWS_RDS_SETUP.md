# 🚀 AWS RDS PostgreSQL Setup Guide

## Step 1: Create RDS Database

1. **AWS Console** mein jao: https://console.aws.amazon.com/
2. Search karo: **"RDS"**
3. **Create database** button pe click karo

### Database Settings:

#### Engine Options:
- **Engine type**: PostgreSQL
- **Engine Version**: PostgreSQL 15.x (latest)

#### Templates:
- **Template**: Free tier (agar available hai, otherwise Dev/Test)

#### Settings:
- **DB instance identifier**: `cyberprobes-db`
- **Master username**: `cyberprobes_admin`
- **Master password**: `Admin123!@#` (ya apna strong password)
- ✅ **Confirm password**

#### Instance Configuration:
- **DB instance class**: db.t3.micro (Free tier eligible)

#### Storage:
- **Storage type**: General Purpose SSD (gp2)
- **Allocated storage**: 20 GB
- ✅ **Enable storage autoscaling** (optional)

#### Connectivity:
- **Compute resource**: Don't connect to an EC2 compute resource
- **VPC**: Default VPC
- **Public access**: ✅ **YES** (Important!)
- **VPC security group**: Create new
- **Security group name**: `cyberprobes-db-sg`
- **Availability Zone**: No preference

#### Database Authentication:
- **Database authentication**: Password authentication

#### Additional Configuration:
- **Initial database name**: `cyberprobes`
- ✅ **Enable automated backups** (optional)
- **Backup retention period**: 7 days (optional)

5. **Create database** pe click karo

⏰ **Wait**: Database create hone mein **5-10 minutes** lagenge

---

## Step 2: Configure Security Group

1. Database create hone ke baad, **RDS Dashboard** mein jao
2. Apne database (`cyberprobes-db`) pe click karo
3. **Connectivity & security** tab mein jao
4. **VPC security groups** section mein security group pe click karo

### Edit Inbound Rules:

1. **Inbound rules** tab pe jao
2. **Edit inbound rules** button pe click karo
3. **Add rule** pe click karo:
   - **Type**: PostgreSQL
   - **Protocol**: TCP
   - **Port range**: 5432
   - **Source**: Anywhere-IPv4 (0.0.0.0/0)
   - **Description**: Allow PostgreSQL from anywhere
4. **Save rules** pe click karo

---

## Step 3: Get Database Connection Details

1. **RDS Dashboard** mein apne database pe click karo
2. **Connectivity & security** tab mein:
   - **Endpoint** copy karo (Example: `cyberprobes-db.xxxxxxxxxx.ap-south-1.rds.amazonaws.com`)
   - **Port** note karo (5432)

### Connection String Format:

```
postgresql://USERNAME:PASSWORD@ENDPOINT:PORT/DATABASE
```

### Your Connection String:

```
postgresql://cyberprobes_admin:Admin123!@#@cyberprobes-db.xxxxxxxxxx.ap-south-1.rds.amazonaws.com:5432/cyberprobes
```

**Replace**:
- `cyberprobes-db.xxxxxxxxxx.ap-south-1.rds.amazonaws.com` with your actual endpoint
- `Admin123!@#` with your actual password

---

## Step 4: Update AWS Amplify Environment Variables

1. **AWS Amplify Console** mein jao
2. Apni app (`cyberprobes`) select karo
3. Left sidebar mein **Environment variables** pe click karo
4. **Manage variables** pe click karo

### Add/Update These Variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `postgresql://cyberprobes_admin:YOUR_PASSWORD@YOUR_ENDPOINT:5432/cyberprobes` |
| `NEXTAUTH_SECRET` | `your-super-secret-key-min-32-chars-long` |
| `NEXTAUTH_URL` | `https://main.d1ce8jq8iz0ibb.amplifyapp.com` |

5. **Save** pe click karo

---

## Step 5: Deploy to AWS Amplify

### Push Code to GitHub:

```bash
git add .
git commit -m "Switched to PostgreSQL with AWS RDS"
git push origin main
```

AWS Amplify automatically deploy kar dega!

---

## Step 6: Create Admin User

Deployment complete hone ke baad:

1. Browser mein jao: `https://main.d1ce8jq8iz0ibb.amplifyapp.com/api/setup-admin`
2. Ye admin user create kar dega:
   - **Email**: `admin@cyberprobes.com`
   - **Password**: `admin123`

---

## Step 7: Test Login

1. Jao: `https://main.d1ce8jq8iz0ibb.amplifyapp.com/auth/login`
2. Login karo:
   - **Email**: `admin@cyberprobes.com`
   - **Password**: `admin123`

✅ **Done!** Aapki website ab AWS RDS PostgreSQL use kar rahi hai!

---

## 🔧 Troubleshooting

### Error: "Can't reach database server"

**Solution**: Security group mein 0.0.0.0/0 allow karo (Step 2)

### Error: "Connection timeout"

**Solution**: 
1. Check karo **Public access** = YES
2. Security group inbound rules check karo
3. Database status = "Available" hona chahiye

### Error: "Authentication failed"

**Solution**: 
1. Username/password check karo
2. Connection string mein special characters encode karo:
   - `@` → `%40`
   - `!` → `%21`
   - `#` → `%23`

---

## 💰 Cost Estimation

- **Free Tier**: First 750 hours/month free for 12 months
- **After Free Tier**: ~$15-20/month for db.t3.micro
- **Storage**: ~$0.10/GB/month

---

## 🎯 Benefits of AWS RDS vs MongoDB Atlas

✅ **Better AWS Integration**: Same region, faster connection  
✅ **More Reliable**: Managed by AWS, automatic backups  
✅ **Cost Effective**: Free tier available  
✅ **Better Performance**: Direct connection from Amplify  
✅ **No External Dependencies**: Everything in AWS ecosystem  

---

## 📞 Need Help?

Agar koi problem ho to:
1. RDS Dashboard mein logs check karo
2. Amplify build logs check karo
3. CloudWatch logs check karo

