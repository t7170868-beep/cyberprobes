# Complete MongoDB Atlas Setup Script
# यह script पूरा setup automatically करेगा

param(
    [string]$ConnectionString = ""
)

function Show-Banner {
    Write-Host ""
    Write-Host "╔════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║   CyberProbes - Automatic Setup Script        ║" -ForegroundColor Cyan
    Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
}

function Show-Step {
    param([string]$Message, [int]$Step)
    Write-Host "[$Step/5] $Message" -ForegroundColor Yellow
}

Show-Banner

# Check if connection string provided
if ([string]::IsNullOrEmpty($ConnectionString)) {
    Write-Host "⚠️  MongoDB Connection String नहीं मिला!" -ForegroundColor Red
    Write-Host ""
    Write-Host "कृपया MongoDB Atlas setup करें:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Browser में जाएं: https://www.mongodb.com/cloud/atlas/register" -ForegroundColor White
    Write-Host "2. Free account बनाएं (Google से sign up करें)" -ForegroundColor White
    Write-Host "3. M0 Free Cluster बनाएं" -ForegroundColor White
    Write-Host "4. Database User बनाएं (username: admin)" -ForegroundColor White
    Write-Host "5. Network Access में '0.0.0.0/0' allow करें" -ForegroundColor White
    Write-Host "6. Connection String copy करें" -ForegroundColor White
    Write-Host ""
    Write-Host "फिर इस script को फिर से चलाएं:" -ForegroundColor Cyan
    Write-Host '  .\SETUP_COMPLETE.ps1 -ConnectionString "your-mongodb-connection-string"' -ForegroundColor Green
    Write-Host ""
    Write-Host "या MongoDB Atlas registration page खोलें? (Y/N): " -ForegroundColor Yellow -NoNewline
    $response = Read-Host
    
    if ($response -eq "Y" -or $response -eq "y") {
        Start-Process "https://www.mongodb.com/cloud/atlas/register"
        Write-Host "✓ Browser में खोल दिया!" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "Setup complete करने के बाद वापस आएं!" -ForegroundColor Cyan
    exit 0
}

# Start setup
Write-Host "🚀 Setup शुरू हो रहा है..." -ForegroundColor Green
Write-Host ""

# Step 1: Update .env file
Show-Step "Updating .env file..." 1
$envContent = Get-Content .env -Raw
$envContent = $envContent -replace 'DATABASE_URL="[^"]*"', "DATABASE_URL=`"$ConnectionString`""
$envContent | Set-Content .env -NoNewline
Write-Host "   ✓ .env file updated" -ForegroundColor Green
Write-Host ""

# Step 2: Generate Prisma Client
Show-Step "Generating Prisma Client..." 2
npm run db:generate | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✓ Prisma client generated" -ForegroundColor Green
} else {
    Write-Host "   ✗ Prisma generation failed" -ForegroundColor Red
}
Write-Host ""

# Step 3: Seed Database
Show-Step "Seeding database (creating admin user)..." 3
npm run db:seed
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✓ Database seeded successfully" -ForegroundColor Green
} else {
    Write-Host "   ✗ Database seeding failed" -ForegroundColor Red
    Write-Host "   Check if MongoDB connection string is correct" -ForegroundColor Yellow
}
Write-Host ""

# Step 4: Build (optional)
Show-Step "Building application..." 4
Write-Host "   (Skipping build for faster setup)" -ForegroundColor Gray
Write-Host ""

# Step 5: Complete
Show-Step "Setup Complete!" 5
Write-Host ""
Write-Host "╔════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║            ✓ Setup Successful!                 ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "अब development server start करें:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Login credentials:" -ForegroundColor Cyan
Write-Host "  URL: http://localhost:3000/auth/login" -ForegroundColor White
Write-Host "  Email: admin@cyberprobes.com" -ForegroundColor White
Write-Host "  Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "Server start करें? (Y/N): " -ForegroundColor Yellow -NoNewline
$startServer = Read-Host

if ($startServer -eq "Y" -or $startServer -eq "y") {
    Write-Host ""
    Write-Host "🚀 Starting development server..." -ForegroundColor Green
    Write-Host ""
    npm run dev
}

