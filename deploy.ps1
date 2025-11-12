# CyberProbes Deployment Script
# Run this script to deploy your website

Write-Host "🚀 CyberProbes Deployment Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if git is initialized
Write-Host "📋 Step 1: Checking Git status..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Git not initialized. Initializing..." -ForegroundColor Red
    git init
    git branch -M main
}

# Step 2: Show current changes
Write-Host ""
Write-Host "📝 Current changes:" -ForegroundColor Yellow
git status --short

# Step 3: Ask to commit changes
Write-Host ""
$commit = Read-Host "Do you want to commit all changes? (y/n)"
if ($commit -eq "y" -or $commit -eq "Y") {
    Write-Host "📦 Committing changes..." -ForegroundColor Yellow
    git add .
    $commitMessage = Read-Host "Enter commit message (or press Enter for default)"
    if ([string]::IsNullOrWhiteSpace($commitMessage)) {
        $commitMessage = "Deploy: Add logo implementation and error handling"
    }
    git commit -m $commitMessage
    Write-Host "✅ Changes committed!" -ForegroundColor Green
} else {
    Write-Host "⏭️ Skipping commit..." -ForegroundColor Yellow
}

# Step 4: Build check
Write-Host ""
Write-Host "🔨 Step 2: Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Build failed! Please fix errors before deploying." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green

# Step 5: Choose deployment platform
Write-Host ""
Write-Host "☁️ Step 3: Choose deployment platform:" -ForegroundColor Yellow
Write-Host "1. Vercel (Recommended - Easiest)"
Write-Host "2. AWS Amplify"
Write-Host "3. Manual (Just build)"
Write-Host ""
$choice = Read-Host "Enter choice (1/2/3)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Cyan
        
        # Check if Vercel CLI is installed
        $vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
        if (-not $vercelInstalled) {
            Write-Host "📦 Installing Vercel CLI..." -ForegroundColor Yellow
            npm install -g vercel
        }
        
        Write-Host ""
        Write-Host "⚠️ Make sure you're logged in to Vercel:" -ForegroundColor Yellow
        Write-Host "   Run: vercel login" -ForegroundColor White
        Write-Host ""
        $deploy = Read-Host "Ready to deploy? (y/n)"
        
        if ($deploy -eq "y" -or $deploy -eq "Y") {
            vercel --prod
        } else {
            Write-Host "⏭️ Deployment cancelled." -ForegroundColor Yellow
        }
    }
    "2" {
        Write-Host ""
        Write-Host "☁️ AWS Amplify Deployment:" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "1. Push code to GitHub:" -ForegroundColor Yellow
        Write-Host "   git push origin main" -ForegroundColor White
        Write-Host ""
        Write-Host "2. Go to AWS Amplify Console:" -ForegroundColor Yellow
        Write-Host "   https://console.aws.amazon.com/amplify/" -ForegroundColor White
        Write-Host ""
        Write-Host "3. Connect your GitHub repository" -ForegroundColor Yellow
        Write-Host ""
        
        $push = Read-Host "Do you want to push to GitHub now? (y/n)"
        if ($push -eq "y" -or $push -eq "Y") {
            Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
            git push origin main
            Write-Host "✅ Pushed! Now connect to AWS Amplify." -ForegroundColor Green
        }
    }
    "3" {
        Write-Host ""
        Write-Host "✅ Build complete! Files ready in .next folder" -ForegroundColor Green
        Write-Host "   You can now manually deploy the .next folder" -ForegroundColor Yellow
    }
    default {
        Write-Host "❌ Invalid choice!" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "✨ Deployment process complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Set environment variables in your hosting platform" -ForegroundColor White
Write-Host "   2. Verify database connection" -ForegroundColor White
Write-Host "   3. Test all features after deployment" -ForegroundColor White
Write-Host ""

