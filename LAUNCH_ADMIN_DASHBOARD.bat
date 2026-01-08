@echo off
REM ============================================================
REM Lab Management System - One-Click Launcher
REM This will start the server and open admin dashboard
REM ============================================================

echo.
echo ============================================================
echo    LAB MANAGEMENT SYSTEM - ONE-CLICK LAUNCHER
echo ============================================================
echo.
echo [1/2] Starting server...
echo.

REM Change to server directory
cd /d "%~dp0central-admin\server"

REM Start the server in a new window (stays open)
start "Lab Management Server" cmd /k "node app.js"

echo.
echo [2/2] Server starting... Admin dashboard will open automatically
echo.
echo ============================================================
echo.
echo INSTRUCTIONS:
echo - Server window will open separately
echo - Admin dashboard will open in your browser automatically
echo - Keep the server window open while using the system
echo - Close this window anytime
echo.
echo ============================================================
echo.

REM Wait 3 seconds for server to fully start
timeout /t 3 /nobreak >nul

echo Server is ready! This window can be closed safely.
echo.
pause
