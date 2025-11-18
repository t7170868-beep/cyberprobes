# Setup reCAPTCHA for CyberProbes Contact Form
# Run this script after getting your reCAPTCHA keys from Google

Write-Host ""
Write-Host "=== CyberProbes reCAPTCHA Setup ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "This script will help you set up reCAPTCHA for the contact form." -ForegroundColor Yellow
Write-Host ""

# Check if .env.local exists
if (Test-Path ".env.local") {
    Write-Host "Found .env.local file" -ForegroundColor Green
} else {
    Write-Host "Creating .env.local file..." -ForegroundColor Yellow
    New-Item -Path ".env.local" -ItemType File | Out-Null
}

Write-Host ""
Write-Host "Please provide your reCAPTCHA keys from Google:" -ForegroundColor Yellow
Write-Host "Get them from: https://www.google.com/recaptcha/admin/create" -ForegroundColor Cyan
Write-Host ""

$siteKey = Read-Host "Enter your reCAPTCHA Site Key (public)"
$secretKey = Read-Host "Enter your reCAPTCHA Secret Key (private)" -AsSecureString
$secretKeyPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($secretKey))

Write-Host ""
Write-Host "Updating .env.local file..." -ForegroundColor Yellow

# Read existing .env.local
$envContent = ""
if (Test-Path ".env.local") {
    $envContent = Get-Content ".env.local" -Raw
}

# Update or add RECAPTCHA keys
if ($envContent -match "NEXT_PUBLIC_RECAPTCHA_SITE_KEY") {
    $envContent = $envContent -replace "NEXT_PUBLIC_RECAPTCHA_SITE_KEY=.*", "NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$siteKey"
} else {
    $envContent += "`nNEXT_PUBLIC_RECAPTCHA_SITE_KEY=$siteKey"
}

if ($envContent -match "RECAPTCHA_SECRET_KEY") {
    $envContent = $envContent -replace "RECAPTCHA_SECRET_KEY=.*", "RECAPTCHA_SECRET_KEY=$secretKeyPlain"
} else {
    $envContent += "`nRECAPTCHA_SECRET_KEY=$secretKeyPlain"
}

# Save .env.local
$envContent | Set-Content ".env.local" -NoNewline

Write-Host "✅ .env.local updated!" -ForegroundColor Green
Write-Host ""

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Update database schema: npx prisma db push" -ForegroundColor White
Write-Host "2. Regenerate Prisma client: npx prisma generate" -ForegroundColor White
Write-Host "3. Set same keys in AWS Amplify Console → Environment Variables" -ForegroundColor White
Write-Host "4. Restart dev server: npm run dev" -ForegroundColor White
Write-Host ""

pause

