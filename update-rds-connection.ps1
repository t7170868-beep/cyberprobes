# Update RDS PostgreSQL Connection String

Write-Host ""
Write-Host "=== AWS RDS PostgreSQL Connection String Setup ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "Please provide your AWS RDS details:" -ForegroundColor Yellow
Write-Host ""

# Get RDS details from user
$endpoint = Read-Host "RDS Endpoint (e.g., cyberprobes-db.xxxxx.us-east-1.rds.amazonaws.com)"
$port = Read-Host "Port (default: 5432)" 
if ([string]::IsNullOrEmpty($port)) { $port = "5432" }

$username = Read-Host "Username (e.g., admin or postgres)"
$password = Read-Host "Password" -AsSecureString
$passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))
$database = Read-Host "Database name (e.g., cyberprobes or postgres)"

# Format connection string
$connectionString = "postgresql://${username}:${passwordPlain}@${endpoint}:${port}/${database}?sslmode=require"

Write-Host ""
Write-Host "Connection string created:" -ForegroundColor Green
Write-Host $connectionString -ForegroundColor White
Write-Host ""

# Update .env file
Write-Host "Updating .env file..." -ForegroundColor Yellow
$envContent = Get-Content .env -Raw
$envContent = $envContent -replace 'DATABASE_URL="[^"]*"', ('DATABASE_URL="' + $connectionString + '"')
$envContent | Set-Content .env -NoNewline

Write-Host "✅ .env file updated!" -ForegroundColor Green
Write-Host ""

# Next steps
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Run: npx prisma db push" -ForegroundColor White
Write-Host "2. Run: npm run db:seed" -ForegroundColor White
Write-Host "3. Update AWS Amplify environment variables" -ForegroundColor White
Write-Host "4. Redeploy Amplify app" -ForegroundColor White
Write-Host ""

pause

