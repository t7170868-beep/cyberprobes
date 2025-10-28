# Wait and Test Production

Write-Host "Waiting for AWS deployment to complete..." -ForegroundColor Cyan
Write-Host "This may take 10-15 minutes" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key when deployment shows 'Deployed' status in AWS console..."
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')

Write-Host ""
Write-Host "Testing production API now..." -ForegroundColor Cyan
Write-Host ""

$body = @{
    email = "admin@cyberprobes.com"
    password = "admin123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://main.d1ce8jq8iz0ibb.amplifyapp.com/api/auth/validate" `
        -Method POST `
        -Body $body `
        -ContentType "application/json"
    
    Write-Host "✓ SUCCESS! Login should work now!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Open this in browser:" -ForegroundColor Yellow
    Write-Host "https://main.d1ce8jq8iz0ibb.amplifyapp.com/auth/login" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Credentials:" -ForegroundColor Yellow
    Write-Host "Email: admin@cyberprobes.com"
    Write-Host "Password: admin123"
} catch {
    Write-Host "✗ Still not working. Error:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    Write-Host ""
    Write-Host "Try waiting a bit longer or check build logs in AWS"
}

Write-Host ""
pause

