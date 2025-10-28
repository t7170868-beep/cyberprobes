# MongoDB Connection String Updater
# यह script आपकी .env file में DATABASE_URL को update करेगा

Write-Host "================================" -ForegroundColor Cyan
Write-Host "MongoDB Connection String Updater" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "MongoDB Atlas से अपना connection string paste करें:" -ForegroundColor Yellow
Write-Host "Example: mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/" -ForegroundColor Gray
Write-Host ""

$connectionString = Read-Host "Connection String"

# Database name add करें अगर नहीं है
if ($connectionString -notmatch "/cyberprobes\?") {
    if ($connectionString -match "\.net/\?") {
        $connectionString = $connectionString -replace "\.net/\?", ".net/cyberprobes?"
    } elseif ($connectionString -match "\.net/$") {
        $connectionString = $connectionString -replace "\.net/$", ".net/cyberprobes?retryWrites=true&w=majority"
    } elseif ($connectionString -match "\.net$") {
        $connectionString = "$connectionString/cyberprobes?retryWrites=true&w=majority"
    }
}

Write-Host ""
Write-Host "Updated Connection String:" -ForegroundColor Green
Write-Host $connectionString -ForegroundColor White
Write-Host ""

# .env file पढ़ें
$envContent = Get-Content .env -Raw

# DATABASE_URL को update करें
$envContent = $envContent -replace 'DATABASE_URL="[^"]*"', "DATABASE_URL=`"$connectionString`""

# .env file में save करें
$envContent | Set-Content .env -NoNewline

Write-Host "✓ .env file updated successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "अब ये commands चलाएं:" -ForegroundColor Yellow
Write-Host "  1. npm run db:seed" -ForegroundColor White
Write-Host "  2. npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "फिर login करें: http://localhost:3000/auth/login" -ForegroundColor Cyan
Write-Host "  Email: admin@cyberprobes.com" -ForegroundColor White
Write-Host "  Password: admin123" -ForegroundColor White
Write-Host ""

Read-Host "Press Enter to exit"

