# CyberProbes Easy Setup Script
# This script will help you setup MongoDB and get the application running

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CyberProbes - Easy Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Problem: Login nahi ho raha hai" -ForegroundColor Yellow
Write-Host "Reason: MongoDB database setup nahi hai" -ForegroundColor Yellow
Write-Host ""

# Check .env file
if (Test-Path .env) {
    Write-Host "[OK] .env file exist karti hai" -ForegroundColor Green
} else {
    Write-Host "[ERROR] .env file nahi mili" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Aapko MongoDB setup karna hoga. Options:" -ForegroundColor White
Write-Host ""
Write-Host "  [1] MongoDB Atlas Setup karo (FREE - Recommended)" -ForegroundColor Green
Write-Host "  [2] Manual steps batao" -ForegroundColor Yellow
Write-Host "  [3] Exit" -ForegroundColor Red
Write-Host ""
Write-Host "Select option (1/2/3): " -ForegroundColor Cyan -NoNewline

$choice = Read-Host

if ($choice -eq "1") {
    Write-Host ""
    Write-Host "MongoDB Atlas registration page khol raha hoon..." -ForegroundColor Yellow
    Start-Process "https://www.mongodb.com/cloud/atlas/register"
    Write-Host ""
    Write-Host "Browser mein MongoDB Atlas khul gaya!" -ForegroundColor Green
    Write-Host ""
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host "Follow these steps:" -ForegroundColor Cyan
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "STEP 1: Account banao" -ForegroundColor Yellow
    Write-Host "  -> Google se sign up karo" -ForegroundColor White
    Write-Host ""
    Write-Host "STEP 2: Free Cluster banao" -ForegroundColor Yellow
    Write-Host "  -> 'Build a Database' click karo" -ForegroundColor White
    Write-Host "  -> 'M0 FREE' option select karo" -ForegroundColor White
    Write-Host "  -> 'Create' button click karo" -ForegroundColor White
    Write-Host ""
    Write-Host "STEP 3: Database User banao" -ForegroundColor Yellow
    Write-Host "  -> Username: admin" -ForegroundColor White
    Write-Host "  -> Password: koi bhi strong password (yaad rakho!)" -ForegroundColor White
    Write-Host "  -> 'Create User' click karo" -ForegroundColor White
    Write-Host ""
    Write-Host "STEP 4: Network Access" -ForegroundColor Yellow
    Write-Host "  -> 'Add IP Address' click karo" -ForegroundColor White
    Write-Host "  -> 'Allow Access From Anywhere' select karo" -ForegroundColor White
    Write-Host "  -> 'Confirm' click karo" -ForegroundColor White
    Write-Host ""
    Write-Host "STEP 5: Connection String Copy karo" -ForegroundColor Yellow
    Write-Host "  -> 'Connect' button click karo" -ForegroundColor White
    Write-Host "  -> 'Drivers' select karo" -ForegroundColor White
    Write-Host "  -> Connection string COPY karo" -ForegroundColor White
    Write-Host ""
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Connection string copy ho gaya? (Y/N): " -ForegroundColor Green -NoNewline
    $ready = Read-Host
    
    if ($ready -eq "Y" -or $ready -eq "y") {
        Write-Host ""
        Write-Host "MongoDB connection string paste karo:" -ForegroundColor Yellow
        $connString = Read-Host
        
        if ([string]::IsNullOrEmpty($connString)) {
            Write-Host ""
            Write-Host "[ERROR] Connection string empty hai!" -ForegroundColor Red
            Write-Host ""
            Write-Host "Koi baat nahi! Manually update kar sakte ho:" -ForegroundColor Yellow
            Write-Host "  1. .env file kholo" -ForegroundColor White
            Write-Host "  2. DATABASE_URL ko update karo" -ForegroundColor White
            Write-Host "  3. npm run db:seed chalao" -ForegroundColor White
            Write-Host ""
            pause
            exit 0
        }
        
        # Add database name if not present
        if ($connString -notmatch "/cyberprobes") {
            $connString = $connString -replace "\.net/\?", ".net/cyberprobes?"
            if ($connString -match "\.net/$") {
                $connString = $connString -replace "\.net/$", ".net/cyberprobes"
            }
            if ($connString -match "\.net$") {
                $connString = "$connString/cyberprobes"
            }
        }
        
        Write-Host ""
        Write-Host "[1/3] Updating .env file..." -ForegroundColor Cyan
        $envContent = Get-Content .env -Raw
        $envContent = $envContent -replace 'DATABASE_URL="[^"]*"', ('DATABASE_URL="' + $connString + '"')
        $envContent | Set-Content .env -NoNewline
        Write-Host "  [OK] .env file updated!" -ForegroundColor Green
        Write-Host ""
        
        Write-Host "[2/3] Generating Prisma Client..." -ForegroundColor Cyan
        npm run db:generate 2>&1 | Out-Null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  [OK] Prisma Client generated!" -ForegroundColor Green
        } else {
            Write-Host "  [ERROR] Prisma generation failed" -ForegroundColor Red
        }
        Write-Host ""
        
        Write-Host "[3/3] Creating admin user in database..." -ForegroundColor Cyan
        Write-Host ""
        npm run db:seed
        Write-Host ""
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "========================================" -ForegroundColor Green
            Write-Host "     SUCCESS! Setup Complete!" -ForegroundColor Green
            Write-Host "========================================" -ForegroundColor Green
            Write-Host ""
            Write-Host "Ab server start karo:" -ForegroundColor Yellow
            Write-Host "  npm run dev" -ForegroundColor White
            Write-Host ""
            Write-Host "Phir login karo:" -ForegroundColor Yellow
            Write-Host "  URL: http://localhost:3000/auth/login" -ForegroundColor White
            Write-Host "  Email: admin@cyberprobes.com" -ForegroundColor Cyan
            Write-Host "  Password: admin123" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "Server start karoon? (Y/N): " -ForegroundColor Green -NoNewline
            $startNow = Read-Host
            
            if ($startNow -eq "Y" -or $startNow -eq "y") {
                Write-Host ""
                Write-Host "Starting development server..." -ForegroundColor Green
                Write-Host "Server running at http://localhost:3000" -ForegroundColor Green
                Write-Host "Press Ctrl+C to stop" -ForegroundColor Gray
                Write-Host ""
                npm run dev
            } else {
                Write-Host ""
                Write-Host "Jab chahiye tab chalao: npm run dev" -ForegroundColor Cyan
                Write-Host ""
            }
        } else {
            Write-Host "[ERROR] Database setup failed!" -ForegroundColor Red
            Write-Host ""
            Write-Host "Possible reasons:" -ForegroundColor Yellow
            Write-Host "  - Connection string galat hai" -ForegroundColor White
            Write-Host "  - Network access allowed nahi hai" -ForegroundColor White
            Write-Host "  - Database user password galat hai" -ForegroundColor White
            Write-Host ""
            Write-Host "MongoDB Atlas dashboard check karo aur phir koshish karo" -ForegroundColor Cyan
            Write-Host ""
        }
    } else {
        Write-Host ""
        Write-Host "Koi baat nahi! Jab ready ho tab phir se chalao:" -ForegroundColor Yellow
        Write-Host "  .\setup.ps1" -ForegroundColor White
        Write-Host ""
    }
}
elseif ($choice -eq "2") {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host "  Manual Setup Steps" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "STEP 1: MongoDB Atlas Setup" -ForegroundColor Cyan
    Write-Host "  1. Jao: https://www.mongodb.com/cloud/atlas/register" -ForegroundColor White
    Write-Host "  2. Free account banao" -ForegroundColor White
    Write-Host "  3. M0 Free Cluster create karo" -ForegroundColor White
    Write-Host "  4. Database user banao" -ForegroundColor White
    Write-Host "  5. Network access allow karo (0.0.0.0/0)" -ForegroundColor White
    Write-Host "  6. Connection string copy karo" -ForegroundColor White
    Write-Host ""
    
    Write-Host "STEP 2: Update .env file" -ForegroundColor Cyan
    Write-Host "  1. .env file kholo" -ForegroundColor White
    Write-Host "  2. DATABASE_URL ko update karo" -ForegroundColor White
    Write-Host ""
    
    Write-Host "STEP 3: Run Commands" -ForegroundColor Cyan
    Write-Host "  npm run db:generate" -ForegroundColor White
    Write-Host "  npm run db:seed" -ForegroundColor White
    Write-Host "  npm run dev" -ForegroundColor White
    Write-Host ""
    
    Write-Host "STEP 4: Login" -ForegroundColor Cyan
    Write-Host "  URL: http://localhost:3000/auth/login" -ForegroundColor White
    Write-Host "  Email: admin@cyberprobes.com" -ForegroundColor White
    Write-Host "  Password: admin123" -ForegroundColor White
    Write-Host ""
    
    Write-Host "Registration page kholoon? (Y/N): " -ForegroundColor Yellow -NoNewline
    $open = Read-Host
    if ($open -eq "Y" -or $open -eq "y") {
        Start-Process "https://www.mongodb.com/cloud/atlas/register"
        Write-Host "[OK] Browser mein khol diya!" -ForegroundColor Green
    }
    Write-Host ""
}
else {
    Write-Host ""
    Write-Host "Setup cancelled" -ForegroundColor Yellow
    Write-Host ""
    exit 0
}

Write-Host ""
pause

