@echo off
echo ================================================
echo   STUDENT KIOSK INSTALLATION
echo ================================================
echo.
echo Admin Server IP: 10.10.46.103
echo.

REM Install to C:\StudentKiosk
echo [1/5] Creating installation directory...
if not exist "C:\StudentKiosk" mkdir "C:\StudentKiosk"

REM Copy files
echo [2/5] Copying kiosk files...
xcopy "%~dp0student-kiosk\*" "C:\StudentKiosk\" /E /I /H /Y

REM Copy server config
echo [3/5] Configuring server connection...
copy "%~dp0server-config.json" "C:\StudentKiosk\server-config.json" /Y

REM Install dependencies
echo [4/5] Installing dependencies (this may take a few minutes)...
cd /d C:\StudentKiosk
call npm install

REM Create startup batch file
echo [5/5] Setting up auto-start...
(
echo @echo off
echo cd /d C:\StudentKiosk
echo npm start
) > "C:\StudentKiosk\START_KIOSK.bat"

REM Add to Windows startup
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run" /v "StudentKiosk" /t REG_SZ /d "C:\StudentKiosk\START_KIOSK.bat" /f

REM Create desktop shortcut
echo Creating desktop shortcut...
powershell "$s=(New-Object -COM WScript.Shell).CreateShortcut('%USERPROFILE%\Desktop\Student Kiosk.lnk');$s.TargetPath='C:\StudentKiosk\START_KIOSK.bat';$s.WorkingDirectory='C:\StudentKiosk';$s.Save()"

echo.
echo ================================================
echo   INSTALLATION COMPLETE!
echo ================================================
echo.
echo Next steps:
echo 1. Set SYSTEM_NUMBER environment variable (PC-01, PC-02, etc.)
echo 2. Make sure admin server is running at 10.10.46.103:7401
echo 3. Restart the computer
echo.
echo The kiosk will auto-start after restart!
echo.
pause
