# Test Production API

Write-Host "Testing Production API..." -ForegroundColor Cyan
Write-Host ""

# Test validate endpoint
$body = @{
    email = "admin@cyberprobes.com"
    password = "admin123"
} | ConvertTo-Json

try {
    Write-Host "Calling validate API..." -ForegroundColor Yellow
    $response = Invoke-RestMethod -Uri "https://main.d1ce8jq8iz0ibb.amplifyapp.com/api/auth/validate" `
        -Method POST `
        -Body $body `
        -ContentType "application/json" `
        -ErrorAction Stop
    
    Write-Host ""
    Write-Host "SUCCESS! Response:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host ""
    Write-Host "ERROR! Details:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    Write-Host ""
    Write-Host "Status Code:" -ForegroundColor Yellow
    Write-Host $_.Exception.Response.StatusCode.value__
}

Write-Host ""
pause

