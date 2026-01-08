@echo off
echo ================================================================
echo  Creating Desktop Shortcut for Lab Management System
echo ================================================================
echo.

set SCRIPT_DIR=%~dp0
set TARGET=%SCRIPT_DIR%START_ADMIN_DASHBOARD.bat
set SHORTCUT=%USERPROFILE%\Desktop\Lab Admin Dashboard.lnk

powershell -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%SHORTCUT%'); $Shortcut.TargetPath = '%TARGET%'; $Shortcut.WorkingDirectory = '%SCRIPT_DIR%'; $Shortcut.Description = 'Lab Management System - Admin Dashboard'; $Shortcut.Save()"

echo.
echo ================================================================
echo SUCCESS! Desktop shortcut created!
echo ================================================================
echo.
echo You can now:
echo 1. Double-click "Lab Admin Dashboard" icon on your desktop
echo 2. Right-click it and select "Pin to taskbar" for quick access
echo.
echo ================================================================
pause
