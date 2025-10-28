# ═══════════════════════════════════════════════════════════
# CyberProbes - Super Easy Setup Script
# यह script आपको step-by-step guide करेगा
# ═══════════════════════════════════════════════════════════

$ErrorActionPreference = "SilentlyContinue"

function Show-Header {
    Clear-Host
    Write-Host ""
    Write-Host "  ╔═══════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "  ║                                               ║" -ForegroundColor Cyan
    Write-Host "  ║        CyberProbes Easy Setup                 ║" -ForegroundColor Cyan
    Write-Host "  ║        बस 2 मिनट में setup complete!         ║" -ForegroundColor Cyan
    Write-Host "  ║                                               ║" -ForegroundColor Cyan
    Write-Host "  ╚═══════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
}

function Show-Success {
    param([string]$Message)
    Write-Host "  ✓ $Message" -ForegroundColor Green
}

function Show-Error {
    param([string]$Message)
    Write-Host "  ✗ $Message" -ForegroundColor Red
}

function Show-Info {
    param([string]$Message)
    Write-Host "  ℹ $Message" -ForegroundColor Yellow
}

function Show-Action {
    param([string]$Message)
    Write-Host "  → $Message" -ForegroundColor Cyan
}

# Main Script
Show-Header

Write-Host "  आपकी problem: Login नहीं हो रहा है" -ForegroundColor Yellow
Write-Host "  Reason: MongoDB database setup नहीं है" -ForegroundColor Yellow
Write-Host ""
Write-Host "  ────────────────────────────────────────────────" -ForegroundColor Gray
Write-Host ""

# Check .env file
if (Test-Path .env) {
    Show-Success ".env file मौजूद है"
} else {
    Show-Error ".env file नहीं मिली"
    exit 1
}

Write-Host ""
Write-Host "  अब हमें MongoDB की जरूरत है। आपके पास 2 options हैं:" -ForegroundColor White
Write-Host ""
Write-Host "  ┌─────────────────────────────────────────────────┐" -ForegroundColor Gray
Write-Host "  │  Option 1: MongoDB Atlas (Cloud - FREE) ⭐     │" -ForegroundColor White
Write-Host "  │  - बिल्कुल Free forever                        │" -ForegroundColor Gray
Write-Host "  │  - कोई installation नहीं चाहिए                │" -ForegroundColor Gray
Write-Host "  │  - Setup time: 2 minutes                       │" -ForegroundColor Gray
Write-Host "  │                                                 │" -ForegroundColor Gray
Write-Host "  │  Option 2: Test Mode (Temporary)               │" -ForegroundColor White
Write-Host "  │  - Quick test के लिए                          │" -ForegroundColor Gray
Write-Host "  │  - Data save नहीं होगा                        │" -ForegroundColor Gray
Write-Host "  └─────────────────────────────────────────────────┘" -ForegroundColor Gray
Write-Host ""

Write-Host "  आप क्या करना चाहेंगे?" -ForegroundColor Cyan
Write-Host "  [1] MongoDB Atlas Setup (Recommended)" -ForegroundColor Green
Write-Host "  [2] मुझे manual steps बताओ" -ForegroundColor Yellow
Write-Host "  [3] Exit" -ForegroundColor Red
Write-Host ""
Write-Host "  अपनी choice enter करें (1/2/3): " -ForegroundColor White -NoNewline

$choice = Read-Host

Switch ($choice) {
    "1" {
        Show-Header
        Write-Host "  ╔═══════════════════════════════════════════════╗" -ForegroundColor Green
        Write-Host "  ║   MongoDB Atlas Setup - Step by Step         ║" -ForegroundColor Green
        Write-Host "  ╚═══════════════════════════════════════════════╝" -ForegroundColor Green
        Write-Host ""
        
        Write-Host "  मैं आपके लिए registration page खोल रहा हूं..." -ForegroundColor Yellow
        Start-Sleep -Seconds 1
        Start-Process "https://www.mongodb.com/cloud/atlas/register"
        Show-Success "Browser में MongoDB Atlas खुल गया!"
        Write-Host ""
        Write-Host "  ────────────────────────────────────────────────" -ForegroundColor Gray
        Write-Host ""
        Write-Host "  अब ये steps follow करें:" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "  STEP 1: Account बनाएं" -ForegroundColor Yellow
        Write-Host "    → Google या Email से sign up करें" -ForegroundColor White
        Write-Host ""
        Write-Host "  STEP 2: Free Cluster बनाएं" -ForegroundColor Yellow
        Write-Host "    → 'Build a Database' click करें" -ForegroundColor White
        Write-Host "    → 'M0 FREE' option select करें" -ForegroundColor White
        Write-Host "    → 'Create' button click करें" -ForegroundColor White
        Write-Host ""
        Write-Host "  STEP 3: Database User बनाएं" -ForegroundColor Yellow
        Write-Host "    → Username: admin" -ForegroundColor White
        Write-Host "    → Password: कोई भी (याद रखें!)" -ForegroundColor White
        Write-Host "    → 'Create User' click करें" -ForegroundColor White
        Write-Host ""
        Write-Host "  STEP 4: Network Access" -ForegroundColor Yellow
        Write-Host "    → 'Add IP Address' click करें" -ForegroundColor White
        Write-Host "    → 'Allow Access From Anywhere' select करें" -ForegroundColor White
        Write-Host "    → 'Confirm' click करें" -ForegroundColor White
        Write-Host ""
        Write-Host "  STEP 5: Connection String Copy करें" -ForegroundColor Yellow
        Write-Host "    → 'Connect' button click करें" -ForegroundColor White
        Write-Host "    → 'Drivers' select करें" -ForegroundColor White
        Write-Host "    → Connection string COPY करें" -ForegroundColor White
        Write-Host "      (Example: mongodb+srv://admin:pass@cluster0.abc.mongodb.net/)" -ForegroundColor Gray
        Write-Host ""
        Write-Host "  ────────────────────────────────────────────────" -ForegroundColor Gray
        Write-Host ""
        Write-Host "  Connection string copy हो गया? (Y/N): " -ForegroundColor Cyan -NoNewline
        $ready = Read-Host
        
        if ($ready -eq "Y" -or $ready -eq "y") {
            Write-Host ""
            Write-Host "  अपना MongoDB connection string paste करें:" -ForegroundColor Yellow
            Write-Host "  " -NoNewline
            $connString = Read-Host
            
            if ([string]::IsNullOrEmpty($connString)) {
                Show-Error "Connection string empty है!"
                Write-Host ""
                Write-Host "  कोई बात नहीं! बाद में manually update कर सकते हैं:" -ForegroundColor Yellow
                Write-Host "  1. .env file खोलें" -ForegroundColor White
                Write-Host "  2. DATABASE_URL को update करें" -ForegroundColor White
                Write-Host "  3. npm run db:seed चलाएं" -ForegroundColor White
                Write-Host ""
                pause
                exit 0
            }
            
            # Add database name if not present
            if ($connString -notmatch "/cyberprobes") {
                $connString = $connString -replace "\.net/", ".net/cyberprobes"
                $connString = $connString -replace "\.net\?", ".net/cyberprobes?"
                if ($connString -match "\.net$") {
                    $connString = "$connString/cyberprobes?retryWrites=true&w=majority"
                }
            }
            
            # Update .env
            Show-Header
            Show-Action "Updating .env file..."
            $envContent = Get-Content .env -Raw
            $envContent = $envContent -replace 'DATABASE_URL="[^"]*"', "DATABASE_URL=`"$connString`""
            $envContent | Set-Content .env -NoNewline
            Show-Success ".env file updated!"
            Write-Host ""
            
            # Generate Prisma
            Show-Action "Generating Prisma Client..."
            npm run db:generate 2>&1 | Out-Null
            if ($LASTEXITCODE -eq 0) {
                Show-Success "Prisma Client generated!"
            } else {
                Show-Error "Prisma generation failed"
            }
            Write-Host ""
            
            # Seed database
            Show-Action "Creating admin user in database..."
            Write-Host ""
            npm run db:seed
            Write-Host ""
            
            if ($LASTEXITCODE -eq 0) {
                Show-Success "Database setup complete!"
                Write-Host ""
                Write-Host "  ╔═══════════════════════════════════════════════╗" -ForegroundColor Green
                Write-Host "  ║                                               ║" -ForegroundColor Green
                Write-Host "  ║            ✓✓✓ SUCCESS! ✓✓✓                  ║" -ForegroundColor Green
                Write-Host "  ║          Setup Complete हो गया!              ║" -ForegroundColor Green
                Write-Host "  ║                                               ║" -ForegroundColor Green
                Write-Host "  ╚═══════════════════════════════════════════════╝" -ForegroundColor Green
                Write-Host ""
                Write-Host "  अब server start करें:" -ForegroundColor Yellow
                Write-Host "    npm run dev" -ForegroundColor White
                Write-Host ""
                Write-Host "  फिर login करें:" -ForegroundColor Yellow
                Write-Host "    URL: http://localhost:3000/auth/login" -ForegroundColor White
                Write-Host "    Email: admin@cyberprobes.com" -ForegroundColor Cyan
                Write-Host "    Password: admin123" -ForegroundColor Cyan
                Write-Host ""
                Write-Host "  क्या मैं server start कर दूं? (Y/N): " -ForegroundColor Green -NoNewline
                $startNow = Read-Host
                
                if ($startNow -eq "Y" -or $startNow -eq "y") {
                    Write-Host ""
                    Show-Action "Starting development server..."
                    Write-Host ""
                    Write-Host "  Server http://localhost:3000 पर चल रहा है" -ForegroundColor Green
                    Write-Host "  Press Ctrl+C to stop" -ForegroundColor Gray
                    Write-Host ""
                    npm run dev
                } else {
                    Write-Host ""
                    Write-Host "  जब चाहें तब चलाएं: npm run dev" -ForegroundColor Cyan
                    Write-Host ""
                }
            } else {
                Show-Error "Database setup failed!"
                Write-Host ""
                Write-Host "  Possible reasons:" -ForegroundColor Yellow
                Write-Host "    - Connection string गलत है" -ForegroundColor White
                Write-Host "    - Network access allowed नहीं है" -ForegroundColor White
                Write-Host "    - Database user password गलत है" -ForegroundColor White
                Write-Host ""
                Write-Host "  MongoDB Atlas dashboard check करें और फिर कोशिश करें" -ForegroundColor Cyan
                Write-Host ""
            }
        } else {
            Write-Host ""
            Show-Info "कोई बात नहीं! जब तैयार हों तो फिर से चलाएं:"
            Write-Host "    .\EASY_SETUP.ps1" -ForegroundColor White
            Write-Host ""
        }
    }
    
    "2" {
        Show-Header
        Write-Host "  ╔═══════════════════════════════════════════════╗" -ForegroundColor Yellow
        Write-Host "  ║          Manual Setup Steps                   ║" -ForegroundColor Yellow
        Write-Host "  ╚═══════════════════════════════════════════════╝" -ForegroundColor Yellow
        Write-Host ""
        
        Write-Host "  STEP 1: MongoDB Atlas Setup" -ForegroundColor Cyan
        Write-Host "    1. जाएं: https://www.mongodb.com/cloud/atlas/register" -ForegroundColor White
        Write-Host "    2. Free account बनाएं" -ForegroundColor White
        Write-Host "    3. M0 Free Cluster create करें" -ForegroundColor White
        Write-Host "    4. Database user बनाएं" -ForegroundColor White
        Write-Host "    5. Network access allow करें (0.0.0.0/0)" -ForegroundColor White
        Write-Host "    6. Connection string copy करें" -ForegroundColor White
        Write-Host ""
        
        Write-Host "  STEP 2: Update .env file" -ForegroundColor Cyan
        Write-Host "    1. .env file खोलें" -ForegroundColor White
        Write-Host "    2. DATABASE_URL को अपने connection string से replace करें" -ForegroundColor White
        Write-Host "    Example:" -ForegroundColor Gray
        Write-Host '    DATABASE_URL="mongodb+srv://admin:pass@cluster0.abc.mongodb.net/cyberprobes"' -ForegroundColor Gray
        Write-Host ""
        
        Write-Host "  STEP 3: Run Commands" -ForegroundColor Cyan
        Write-Host "    npm run db:generate" -ForegroundColor White
        Write-Host "    npm run db:seed" -ForegroundColor White
        Write-Host "    npm run dev" -ForegroundColor White
        Write-Host ""
        
        Write-Host "  STEP 4: Login" -ForegroundColor Cyan
        Write-Host "    URL: http://localhost:3000/auth/login" -ForegroundColor White
        Write-Host "    Email: admin@cyberprobes.com" -ForegroundColor White
        Write-Host "    Password: admin123" -ForegroundColor White
        Write-Host ""
        
        Write-Host "  Registration page खोलें? (Y/N): " -ForegroundColor Yellow -NoNewline
        $open = Read-Host
        if ($open -eq "Y" -or $open -eq "y") {
            Start-Process "https://www.mongodb.com/cloud/atlas/register"
            Show-Success "Browser में खोल दिया!"
        }
        Write-Host ""
    }
    
    default {
        Write-Host ""
        Show-Info "Setup cancelled"
        Write-Host ""
        exit 0
    }
}

Write-Host ""
Write-Host "  Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

