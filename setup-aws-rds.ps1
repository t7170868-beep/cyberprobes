# AWS RDS PostgreSQL Setup Script
# Yeh script aapko AWS RDS connection string setup karne mein help karega

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " AWS RDS PostgreSQL Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Yeh script aapki .env file mein DATABASE_URL ko AWS RDS PostgreSQL connection string se update karega." -ForegroundColor Yellow
Write-Host ""

# Step 1: RDS Endpoint
Write-Host "[Step 1/4] RDS Database Endpoint" -ForegroundColor Cyan
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
Write-Host "[Step 2/4] Database Username" -ForegroundColor Cyan
Write-Host "Master username daalo (jo aapne database create karte waqt diya):" -ForegroundColor Yellow
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
Write-Host "[Step 3/4] Database Password" -ForegroundColor Cyan
Write-Host "Master password daalo (jo aapne database create karte waqt diya):" -ForegroundColor Yellow
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
Write-Host "[Step 4/4] Database Name" -ForegroundColor Cyan
Write-Host "Database name daalo (default: cyberprobes):" -ForegroundColor Yellow
Write-Host ""
$databaseName = Read-Host "Database Name"
if ([string]::IsNullOrEmpty($databaseName)) {
    $databaseName = "cyberprobes"
}

# Port (default 5432)
$port = "5432"

# URL Encode Password (special characters handle karne ke liye)
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
Write-Host " Connection String Generated!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Connection String:" -ForegroundColor Yellow
Write-Host $connectionString -ForegroundColor White
Write-Host ""

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "[WARNING] .env file nahi mili!" -ForegroundColor Yellow
    Write-Host "Kya aap .env file banana chahte hain? (Y/N)" -ForegroundColor Yellow
    $createEnv = Read-Host
    if ($createEnv -eq "Y" -or $createEnv -eq "y") {
        # Create .env file with basic structure
        $envContent = @"
# Database
DATABASE_URL="$connectionString"

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here-min-32-chars
NEXTAUTH_URL=http://localhost:3000

# Node Environment
NODE_ENV=development

# JWT Secret (if needed)
JWT_SECRET=your-jwt-secret-here
"@
        $envContent | Set-Content ".env"
        Write-Host ""
        Write-Host "[OK] .env file create ho gayi!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "[INFO] .env file manually create karo aur connection string add karo." -ForegroundColor Yellow
        Write-Host ""
        pause
        exit 0
    }
} else {
    # Update .env file
    Write-Host "[1/2] Updating .env file..." -ForegroundColor Cyan
    $envContent = Get-Content ".env" -Raw
    
    # Replace DATABASE_URL if exists, otherwise add it
    if ($envContent -match 'DATABASE_URL\s*=\s*"[^"]*"') {
        $envContent = $envContent -replace 'DATABASE_URL\s*=\s*"[^"]*"', "DATABASE_URL=`"$connectionString`""
        Write-Host "      [OK] DATABASE_URL updated!" -ForegroundColor Green
    } else {
        # Add DATABASE_URL at the beginning
        $envContent = "DATABASE_URL=`"$connectionString`"`n`n" + $envContent
        Write-Host "      [OK] DATABASE_URL added!" -ForegroundColor Green
    }
    
    $envContent | Set-Content ".env" -NoNewline
}

Write-Host ""
Write-Host "[2/2] Generating Prisma Client..." -ForegroundColor Cyan
npm run db:generate 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "      [OK] Prisma Client generated!" -ForegroundColor Green
} else {
    Write-Host "      [WARNING] Prisma Client generation mein issue ho sakta hai." -ForegroundColor Yellow
    Write-Host "      Manually run karo: npm run db:generate" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Database migrations run karo:" -ForegroundColor White
Write-Host "   npm run db:migrate" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Database seed karo (admin user create):" -ForegroundColor White
Write-Host "   npm run db:seed" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Development server start karo:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Browser mein jao: http://localhost:3000/auth/login" -ForegroundColor Cyan
Write-Host ""
Write-Host "Login Credentials:" -ForegroundColor Yellow
Write-Host "   Email: admin@cyberprobes.com" -ForegroundColor White
Write-Host "   Password: admin123" -ForegroundColor White
Write-Host ""
pause

