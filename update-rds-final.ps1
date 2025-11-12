# Final RDS Connection String Update

Write-Host ""
Write-Host "=== AWS RDS PostgreSQL Connection String Setup ===" -ForegroundColor Cyan
Write-Host ""

# Pre-filled credentials
$username = "cyber_admin"
$password = "CyberProbes2025!DB#"

Write-Host "Using credentials:" -ForegroundColor Green
Write-Host "Username: $username" -ForegroundColor White
Write-Host "Password: ********" -ForegroundColor White
Write-Host ""

Write-Host "Now I need:" -ForegroundColor Yellow
Write-Host "1. RDS Endpoint (from AWS Console)" -ForegroundColor White
Write-Host "2. Database name (usually 'cyberprobes' or 'postgres')" -ForegroundColor White
Write-Host ""

# Get remaining details
$endpoint = Read-Host "RDS Endpoint (e.g., cyberprobes-db.xxxxx.us-east-1.rds.amazonaws.com)"
$port = Read-Host "Port (default: 5432, press Enter for default)"
if ([string]::IsNullOrEmpty($port)) { $port = "5432" }

$database = Read-Host "Database name (default: cyberprobes, press Enter for default)"
if ([string]::IsNullOrEmpty($database)) { $database = "cyberprobes" }

# Format connection string
$connectionString = "postgresql://${username}:${password}@${endpoint}:${port}/${database}?sslmode=require"

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

# Verify
Write-Host "Updated DATABASE_URL:" -ForegroundColor Cyan
Get-Content .env | Select-String "DATABASE_URL"
Write-Host ""

Write-Host "=== Next Steps ===" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Push schema to database:" -ForegroundColor White
Write-Host "   npx prisma db push" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Seed database:" -ForegroundColor White
Write-Host "   npm run db:seed" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Update AWS Amplify environment variables:" -ForegroundColor White
Write-Host "   - Go to AWS Amplify Console" -ForegroundColor Gray
Write-Host "   - App settings → Environment variables" -ForegroundColor Gray
Write-Host "   - Update DATABASE_URL with same connection string" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Redeploy Amplify app" -ForegroundColor White
Write-Host ""

Write-Host "Press any key to continue..." -ForegroundColor Gray
pause

