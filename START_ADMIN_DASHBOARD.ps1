# Lab Management System Launcher
# This will start the server and open the admin dashboard

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "     LAB MANAGEMENT SYSTEM - STARTING SERVER...     " -ForegroundColor Yellow
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

# Get script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$serverPath = Join-Path $scriptPath "central-admin\server"

# Change to server directory
Set-Location $serverPath

Write-Host " [1/2] Starting Node.js server..." -ForegroundColor Green
Write-Host ""

# Show info
Write-Host " Server Location: " -NoNewline -ForegroundColor Gray
Write-Host "$serverPath" -ForegroundColor White
Write-Host " Admin Dashboard: " -NoNewline -ForegroundColor Gray
Write-Host "http://10.10.46.103:7401/dashboard/admin-dashboard.html" -ForegroundColor White
Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host " [2/2] Browser will open automatically in 1 second..." -ForegroundColor Green
Write-Host ""
Write-Host " TIP: Keep this window open while using the system!" -ForegroundColor Yellow
Write-Host "      Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

# Start the server (which will auto-open browser)
node app.js
