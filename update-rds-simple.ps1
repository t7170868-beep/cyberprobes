# Simple RDS Connection String Update

Write-Host ""
Write-Host "=== AWS RDS PostgreSQL Connection String ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "Option 1: Paste full connection string" -ForegroundColor Yellow
Write-Host "Format: postgresql://username:password@endpoint:port/database?sslmode=require" -ForegroundColor Gray
Write-Host ""
Write-Host "Option 2: Provide details separately" -ForegroundColor Yellow
Write-Host ""

$choice = Read-Host "Choose option (1 or 2)"

if ($choice -eq "1") {
    Write-Host ""
    Write-Host "Paste your PostgreSQL connection string:" -ForegroundColor Cyan
    $connectionString = Read-Host
    
    if ([string]::IsNullOrEmpty($connectionString)) {
        Write-Host "❌ Connection string empty!" -ForegroundColor Red
        pause
        exit 1
    }
    
    # Ensure it starts with postgresql://
    if ($connectionString -notmatch "^postgresql://") {
        Write-Host "⚠️ Warning: Connection string should start with 'postgresql://'" -ForegroundColor Yellow
        Write-Host "Adding prefix..." -ForegroundColor Yellow
        $connectionString = "postgresql://" + $connectionString
    }
    
} else {
    Write-Host ""
    Write-Host "Enter RDS details:" -ForegroundColor Cyan
    Write-Host ""
    
    $endpoint = Read-Host "RDS Endpoint (e.g., cyberprobes-db.xxxxx.us-east-1.rds.amazonaws.com)"
    $port = Read-Host "Port (default: 5432)"
    if ([string]::IsNullOrEmpty($port)) { $port = "5432" }
    
    $username = Read-Host "Username (e.g., admin)"
    $password = Read-Host "Password" -AsSecureString
    $passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))
    $database = Read-Host "Database name (e.g., cyberprobes)"
    
    # Format connection string
    $connectionString = "postgresql://${username}:${passwordPlain}@${endpoint}:${port}/${database}?sslmode=require"
}

Write-Host ""
Write-Host "Connection string:" -ForegroundColor Green
Write-Host $connectionString -ForegroundColor White
Write-Host ""

# Update .env file
Write-Host "Updating .env file..." -ForegroundColor Yellow
$envContent = Get-Content .env -Raw
$envContent = $envContent -replace 'DATABASE_URL="[^"]*"', ('DATABASE_URL="' + $connectionString + '"')
$envContent | Set-Content .env -NoNewline

Write-Host "✅ .env file updated!" -ForegroundColor Green
Write-Host ""

# Verify
Write-Host "Updated DATABASE_URL:" -ForegroundColor Cyan
Get-Content .env | Select-String "DATABASE_URL"
Write-Host ""

Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Run: npx prisma db push" -ForegroundColor White
Write-Host "2. Run: npm run db:seed" -ForegroundColor White
Write-Host "3. Update AWS Amplify environment variables with same connection string" -ForegroundColor White
Write-Host "4. Redeploy Amplify app" -ForegroundColor White
Write-Host ""

pause

