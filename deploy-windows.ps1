# CyberProbes AWS Deployment Script for Windows
# PowerShell Script

Write-Host "🚀 CyberProbes AWS Deployment Script" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if AWS CLI is installed
Write-Host "🔍 Checking prerequisites..." -ForegroundColor Yellow
try {
    $awsVersion = aws --version
    Write-Host "✅ AWS CLI installed: $awsVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ AWS CLI not found. Please install from: https://awscli.amazonaws.com/AWSCLIV2.msi" -ForegroundColor Red
    exit 1
}

# Check if Docker is installed
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker installed: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker not found. Please install Docker Desktop" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 Deployment Options:" -ForegroundColor Cyan
Write-Host "1. AWS Amplify (Recommended - Easiest)" -ForegroundColor White
Write-Host "2. AWS EC2 with Docker" -ForegroundColor White
Write-Host "3. AWS Elastic Beanstalk" -ForegroundColor White
Write-Host "4. Build Docker Image Only" -ForegroundColor White
Write-Host "5. Test Production Build Locally" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Select deployment option (1-5)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🌟 AWS Amplify Deployment" -ForegroundColor Cyan
        Write-Host "========================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Steps to deploy with Amplify:" -ForegroundColor Yellow
        Write-Host "1. Initialize Git repository (if not done):" -ForegroundColor White
        Write-Host "   git init" -ForegroundColor Gray
        Write-Host "   git add ." -ForegroundColor Gray
        Write-Host "   git commit -m 'Initial commit'" -ForegroundColor Gray
        Write-Host ""
        Write-Host "2. Create GitHub repository and push code" -ForegroundColor White
        Write-Host ""
        Write-Host "3. Go to AWS Amplify Console:" -ForegroundColor White
        Write-Host "   https://console.aws.amazon.com/amplify/" -ForegroundColor Blue
        Write-Host ""
        Write-Host "4. Click 'New app' → 'Host web app' → Connect GitHub" -ForegroundColor White
        Write-Host ""
        Write-Host "5. Your app will be live at: https://main.XXXXXX.amplifyapp.com" -ForegroundColor Green
        Write-Host ""
        
        $initGit = Read-Host "Do you want to initialize Git now? (y/n)"
        if ($initGit -eq "y") {
            git init
            git add .
            git commit -m "Prepare for AWS deployment"
            Write-Host "✅ Git repository initialized" -ForegroundColor Green
        }
    }
    
    "2" {
        Write-Host ""
        Write-Host "🐳 AWS EC2 Deployment" -ForegroundColor Cyan
        Write-Host "====================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "This requires manual steps. Please follow:" -ForegroundColor Yellow
        Write-Host "1. Create EC2 instance from AWS Console" -ForegroundColor White
        Write-Host "2. SSH into the instance" -ForegroundColor White
        Write-Host "3. Install Docker and Docker Compose" -ForegroundColor White
        Write-Host "4. Clone your repository" -ForegroundColor White
        Write-Host "5. Run: docker-compose up -d" -ForegroundColor White
        Write-Host ""
        Write-Host "See AWS_DEPLOYMENT_GUIDE.md for detailed steps" -ForegroundColor Yellow
    }
    
    "3" {
        Write-Host ""
        Write-Host "📦 AWS Elastic Beanstalk Deployment" -ForegroundColor Cyan
        Write-Host "===================================" -ForegroundColor Cyan
        Write-Host ""
        
        # Check if EB CLI is installed
        try {
            $ebVersion = eb --version
            Write-Host "✅ EB CLI installed: $ebVersion" -ForegroundColor Green
            
            $deployNow = Read-Host "Initialize and deploy now? (y/n)"
            if ($deployNow -eq "y") {
                Write-Host ""
                Write-Host "Initializing Elastic Beanstalk..." -ForegroundColor Yellow
                eb init -p docker cyberprobes-app --region us-east-1
                
                Write-Host "Creating environment and deploying..." -ForegroundColor Yellow
                eb create cyberprobes-env
                
                Write-Host "✅ Deployment complete!" -ForegroundColor Green
                eb open
            }
        } catch {
            Write-Host "❌ EB CLI not found. Install with:" -ForegroundColor Red
            Write-Host "pip install awsebcli --upgrade --user" -ForegroundColor Gray
        }
    }
    
    "4" {
        Write-Host ""
        Write-Host "🏗️ Building Docker Image" -ForegroundColor Cyan
        Write-Host "========================" -ForegroundColor Cyan
        Write-Host ""
        
        Write-Host "Building image..." -ForegroundColor Yellow
        docker build -t cyberprobes-app:latest .
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Docker image built successfully!" -ForegroundColor Green
            Write-Host ""
            Write-Host "To run locally:" -ForegroundColor Yellow
            Write-Host "docker run -p 3000:3000 cyberprobes-app:latest" -ForegroundColor Gray
        } else {
            Write-Host "❌ Build failed. Check Dockerfile and dependencies." -ForegroundColor Red
        }
    }
    
    "5" {
        Write-Host ""
        Write-Host "🧪 Testing Production Build" -ForegroundColor Cyan
        Write-Host "===========================" -ForegroundColor Cyan
        Write-Host ""
        
        Write-Host "Installing dependencies..." -ForegroundColor Yellow
        npm ci
        
        Write-Host "Generating Prisma client..." -ForegroundColor Yellow
        npx prisma generate
        
        Write-Host "Building production bundle..." -ForegroundColor Yellow
        npm run build
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Build successful!" -ForegroundColor Green
            Write-Host ""
            $runNow = Read-Host "Start production server now? (y/n)"
            if ($runNow -eq "y") {
                npm start
            }
        } else {
            Write-Host "❌ Build failed. Check errors above." -ForegroundColor Red
        }
    }
    
    default {
        Write-Host "❌ Invalid option selected" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "📖 For detailed deployment instructions, see: AWS_DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
