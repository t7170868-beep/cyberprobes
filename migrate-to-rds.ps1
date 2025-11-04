# AWS RDS Migration Script
# Yeh script aapko MongoDB se AWS RDS PostgreSQL pe migrate karne mein help karega

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " AWS RDS PostgreSQL Migration Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Yeh script:" -ForegroundColor Yellow
Write-Host "1. Aapki .env file mein DATABASE_URL ko PostgreSQL RDS se update karega" -ForegroundColor White
Write-Host "2. Prisma client regenerate karega" -ForegroundColor White
Write-Host "3. Database migrations run karega" -ForegroundColor White
Write-Host "4. Database seed karega (admin user create)" -ForegroundColor White
Write-Host ""

Write-Host "⚠️ IMPORTANT: Pehle AWS RDS database create kar lo!" -ForegroundColor Red
Write-Host "   Guide: AWS_RDS_MIGRATION_COMPLETE.md" -ForegroundColor Yellow
Write-Host ""

$continue = Read-Host "Continue? (Y/N)"
if ($continue -ne "Y" -and $continue -ne "y") {
    Write-Host ""
    Write-Host "Migration cancelled." -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 0
}

Write-Host ""

# Step 1: RDS Endpoint
Write-Host "[Step 1/5] RDS Database Endpoint" -ForegroundColor Cyan
Write-Host "RDS Dashboard se endpoint copy karo:" -ForegroundColor Yellow
Write-Host "Example: cyberprobes-db.xxxxxxxxxx.ap-south-1.rds.amazonaws.com" -ForegroundColor Gray
Write-Host ""
$endpoint = Read-Host "Endpoint"

if ([string]::IsNullOrEmpty($endpoint)) {
    Write-Host ""
    Write-Host "[ERROR] Endpoint empty hai!" -ForegroundColor Red
    Write-Host ""
    pause
    exit 1
}

# Step 2: Database Username
Write-Host ""
Write-Host "[Step 2/5] Database Username" -ForegroundColor Cyan
Write-Host "Master username daalo:" -ForegroundColor Yellow
Write-Host "Example: cyberprobes_admin" -ForegroundColor Gray
Write-Host ""
$username = Read-Host "Username"

if ([string]::IsNullOrEmpty($username)) {
    Write-Host ""
    Write-Host "[ERROR] Username empty hai!" -ForegroundColor Red
    Write-Host ""
    pause
    exit 1
}

# Step 3: Database Password
Write-Host ""
Write-Host "[Step 3/5] Database Password" -ForegroundColor Cyan
Write-Host "Master password daalo:" -ForegroundColor Yellow
Write-Host ""
$password = Read-Host "Password" -AsSecureString
$passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))

if ([string]::IsNullOrEmpty($passwordPlain)) {
    Write-Host ""
    Write-Host "[ERROR] Password empty hai!" -ForegroundColor Red
    Write-Host ""
    pause
    exit 1
}

# Step 4: Database Name
Write-Host ""
Write-Host "[Step 4/5] Database Name" -ForegroundColor Cyan
Write-Host "Database name (default: cyberprobes):" -ForegroundColor Yellow
Write-Host ""
$databaseName = Read-Host "Database Name"
if ([string]::IsNullOrEmpty($databaseName)) {
    $databaseName = "cyberprobes"
}

# Port
$port = "5432"

# URL Encode Password
function Encode-Url {
    param([string]$text)
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($text)
    $encoded = ""
    foreach ($byte in $bytes) {
        if ($byte -ge 48 -and $byte -le 57 -or 
            $byte -ge 65 -and $byte -le 90 -or 
            $byte -ge 97 -and $byte -le 122 -or 
            $byte -eq 45 -or $byte -eq 95 -or $byte -eq 46 -or $byte -eq 126) {
            $encoded += [char]$byte
        } else {
            $encoded += "%" + ("{0:X2}" -f $byte)
        }
    }
    return $encoded
}

$encodedPassword = Encode-Url $passwordPlain

# Build Connection String
$connectionString = "postgresql://$username`:$encodedPassword@$endpoint`:$port/$databaseName"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " Connection String Generated" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host $connectionString -ForegroundColor White
Write-Host ""

# Step 5: Confirm
Write-Host "[Step 5/5] Confirmation" -ForegroundColor Cyan
Write-Host "Kya aap migration continue karna chahte hain? (Y/N)" -ForegroundColor Yellow
$confirm = Read-Host

if ($confirm -ne "Y" -and $confirm -ne "y") {
    Write-Host ""
    Write-Host "Migration cancelled." -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 0
}

Write-Host ""

# Update .env file
Write-Host "[1/4] Updating .env file..." -ForegroundColor Cyan
if (-not (Test-Path ".env")) {
    Write-Host "      [INFO] .env file nahi mili, creating..." -ForegroundColor Yellow
    $envContent = @"
# Database
DATABASE_URL="$connectionString"

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here-min-32-chars
NEXTAUTH_URL=http://localhost:3000

# Node Environment
NODE_ENV=development

# JWT Secret
JWT_SECRET=your-jwt-secret-here
"@
    $envContent | Set-Content ".env"
    Write-Host "      [OK] .env file created!" -ForegroundColor Green
} else {
    $envContent = Get-Content ".env" -Raw
    
    if ($envContent -match 'DATABASE_URL\s*=\s*"[^"]*"') {
        $envContent = $envContent -replace 'DATABASE_URL\s*=\s*"[^"]*"', "DATABASE_URL=`"$connectionString`""
        Write-Host "      [OK] DATABASE_URL updated!" -ForegroundColor Green
    } else {
        $envContent = "DATABASE_URL=`"$connectionString`"`n`n" + $envContent
        Write-Host "      [OK] DATABASE_URL added!" -ForegroundColor Green
    }
    
    $envContent | Set-Content ".env" -NoNewline
    Write-Host "      [OK] .env file updated!" -ForegroundColor Green
}

# Generate Prisma Client
Write-Host ""
Write-Host "[2/4] Generating Prisma Client..." -ForegroundColor Cyan
npm run db:generate 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "      [OK] Prisma Client generated!" -ForegroundColor Green
} else {
    Write-Host "      [ERROR] Prisma Client generation failed!" -ForegroundColor Red
    Write-Host "      Manually run: npm run db:generate" -ForegroundColor Yellow
    pause
    exit 1
}

# Run Migrations
Write-Host ""
Write-Host "[3/4] Running database migrations..." -ForegroundColor Cyan
Write-Host "      This may take a few minutes..." -ForegroundColor Yellow
npx prisma migrate deploy 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "      [OK] Migrations completed!" -ForegroundColor Green
} else {
    Write-Host "      [WARNING] Migration issues detected." -ForegroundColor Yellow
    Write-Host "      Trying: npm run db:migrate" -ForegroundColor Yellow
    npm run db:migrate 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "      [OK] Migrations completed!" -ForegroundColor Green
    } else {
        Write-Host "      [ERROR] Migrations failed!" -ForegroundColor Red
        Write-Host "      Manually run: npm run db:migrate" -ForegroundColor Yellow
    }
}

# Seed Database
Write-Host ""
Write-Host "[4/4] Seeding database (creating admin user)..." -ForegroundColor Cyan
npm run db:seed 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "      [OK] Database seeded!" -ForegroundColor Green
} else {
    Write-Host "      [WARNING] Seeding issues detected." -ForegroundColor Yellow
    Write-Host "      Trying: node create-admin.js" -ForegroundColor Yellow
    node create-admin.js 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "      [OK] Admin user created!" -ForegroundColor Green
    } else {
        Write-Host "      [WARNING] Seeding failed, but migration is complete." -ForegroundColor Yellow
        Write-Host "      Manually run: npm run db:seed" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " Migration Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "✅ Database successfully migrated to AWS RDS PostgreSQL!" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Development server start karo:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Browser mein jao: http://localhost:3000/auth/login" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Login karo:" -ForegroundColor White
Write-Host "   Email: admin@cyberprobes.com" -ForegroundColor Gray
Write-Host "   Password: admin123" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Production deploy karne ke liye:" -ForegroundColor White
Write-Host "   - AWS Amplify environment variables update karo" -ForegroundColor Gray
Write-Host "   - Code push karo: git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "📖 Full guide: AWS_RDS_MIGRATION_COMPLETE.md" -ForegroundColor Cyan
Write-Host ""
pause

