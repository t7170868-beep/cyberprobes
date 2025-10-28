# Simple MongoDB Connection String Updater

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host " MongoDB Connection Updater" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "MongoDB Atlas se connection string copy kar liya?" -ForegroundColor Yellow
Write-Host ""
Write-Host "Connection string paste karo:" -ForegroundColor Cyan
Write-Host "(Example: mongodb+srv://admin:password@cluster0.abc.mongodb.net/)" -ForegroundColor Gray
Write-Host ""
$connectionString = Read-Host "Connection String"

if ([string]::IsNullOrEmpty($connectionString)) {
    Write-Host ""
    Write-Host "[ERROR] Connection string empty hai!" -ForegroundColor Red
    Write-Host ""
    pause
    exit 1
}

# Add database name if missing
if ($connectionString -notmatch "/cyberprobes") {
    if ($connectionString -match "\.net/\?") {
        $connectionString = $connectionString -replace "\.net/\?", ".net/cyberprobes?"
    } elseif ($connectionString -match "\.net/$") {
        $connectionString = $connectionString -replace "\.net/$", ".net/cyberprobes"
    } elseif ($connectionString -match "\.net$") {
        $connectionString = "$connectionString/cyberprobes"
    }
}

Write-Host ""
Write-Host "[INFO] Updated connection string:" -ForegroundColor Yellow
Write-Host $connectionString -ForegroundColor White
Write-Host ""

# Update .env file
Write-Host "[1/4] Updating .env file..." -ForegroundColor Cyan
$envContent = Get-Content .env -Raw
$envContent = $envContent -replace 'DATABASE_URL="[^"]*"', ('DATABASE_URL="' + $connectionString + '"')
$envContent | Set-Content .env -NoNewline
Write-Host "      [OK] .env updated!" -ForegroundColor Green
Write-Host ""

# Generate Prisma Client
Write-Host "[2/4] Generating Prisma Client..." -ForegroundColor Cyan
npm run db:generate 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "      [OK] Prisma Client generated!" -ForegroundColor Green
} else {
    Write-Host "      [ERROR] Prisma generation failed!" -ForegroundColor Red
}
Write-Host ""

# Seed database
Write-Host "[3/4] Creating admin user..." -ForegroundColor Cyan
Write-Host ""
npm run db:seed
Write-Host ""

if ($LASTEXITCODE -eq 0) {
    Write-Host "      [OK] Admin user created!" -ForegroundColor Green
} else {
    Write-Host "      [ERROR] Seeding failed! Check connection string!" -ForegroundColor Red
    Write-Host ""
    pause
    exit 1
}
Write-Host ""

# Success
Write-Host "[4/4] Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "     SUCCESS!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "Ab server start karo:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Phir login karo:" -ForegroundColor Yellow
Write-Host "  URL: http://localhost:3000/auth/login" -ForegroundColor White
Write-Host "  Email: admin@cyberprobes.com" -ForegroundColor Cyan
Write-Host "  Password: admin123" -ForegroundColor Cyan
Write-Host ""

Write-Host "Server start karoon abhi? (Y/N): " -ForegroundColor Green -NoNewline
$start = Read-Host

if ($start -eq "Y" -or $start -eq "y") {
    Write-Host ""
    Write-Host "Starting server at http://localhost:3000 ..." -ForegroundColor Green
    Write-Host "Press Ctrl+C to stop" -ForegroundColor Gray
    Write-Host ""
    npm run dev
} else {
    Write-Host ""
    Write-Host "Jab ready ho tab chalao: npm run dev" -ForegroundColor Cyan
    Write-Host ""
}

pause

