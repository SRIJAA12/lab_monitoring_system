@echo off
REM ========================================
REM Diagnose 500 Error - MongoDB Integration
REM ========================================
echo.
echo ========================================
echo DIAGNOSING SERVER ERROR
echo ========================================
echo.

REM Step 1: Check if server is running
echo [Step 1/5] Checking if server is running...
tasklist /FI "IMAGENAME eq node.exe" 2>nul | find /I /N "node.exe">nul
if "%ERRORLEVEL%"=="0" (
    echo ✅ Node.js server is running
) else (
    echo ❌ Node.js server is NOT running
    echo.
    echo Starting server...
    cd central-admin\server
    start "Lab Server" cmd /k "node app.js"
    timeout /t 5 >nul
    cd ..\..
)
echo.

REM Step 2: Test MongoDB connection
echo [Step 2/5] Testing MongoDB connection...
cd central-admin\server
node -e "const mongoose = require('mongoose'); mongoose.connect('mongodb+srv://srijaaanandhan12_db_user:122007@cluster0.2kzkkpe.mongodb.net/college-lab-registration', {serverSelectionTimeoutMS: 5000}).then(() => { console.log('SUCCESS: MongoDB Connected'); mongoose.connection.close(); process.exit(0); }).catch(err => { console.error('FAILED:', err.message); process.exit(1); });" 2>&1
if errorlevel 1 (
    echo ❌ MongoDB connection failed
    echo Check internet connection
    pause
    exit /b 1
) else (
    echo ✅ MongoDB connection successful
)
cd ..\..
echo.

REM Step 3: Test API with simple request
echo [Step 3/5] Testing API endpoint...
curl.exe -X GET http://localhost:7401/server-config.json 2>nul
if errorlevel 1 (
    echo ❌ Server not responding on localhost
    echo.
    echo Trying network IP...
    curl.exe -X GET http://192.168.29.212:7401/server-config.json 2>nul
    if errorlevel 1 (
        echo ❌ Server not responding on network IP either
        pause
        exit /b 1
    )
)
echo.
echo ✅ Server is responding
echo.

REM Step 4: Test add-student API with minimal data
echo [Step 4/5] Testing add-student API...
echo.
echo Testing with valid data:
curl.exe -X POST http://localhost:7401/api/add-student ^
-H "Content-Type: application/json" ^
-d "{\"studentId\":\"DIAG001\",\"name\":\"Diagnostic Test\",\"email\":\"diag@test.com\",\"dateOfBirth\":\"2000-01-01\",\"department\":\"Computer Science\",\"section\":\"A\",\"year\":1,\"labId\":\"ALL\"}" 2>&1
echo.
echo.

REM Step 5: Test with empty section
echo [Step 5/5] Testing with empty section (this might cause error):
curl.exe -X POST http://localhost:7401/api/add-student ^
-H "Content-Type: application/json" ^
-d "{\"studentId\":\"DIAG002\",\"name\":\"Test Empty Section\",\"email\":\"diag2@test.com\",\"dateOfBirth\":\"2000-01-01\",\"department\":\"Computer Science\",\"section\":\"\",\"year\":1,\"labId\":\"ALL\"}" 2>&1
echo.
echo.

echo ========================================
echo DIAGNOSIS COMPLETE
echo ========================================
echo.
echo If you see any 500 errors above, that's the issue.
echo.
echo COMMON CAUSES OF 500 ERROR:
echo 1. Empty required fields
echo 2. Invalid date format
echo 3. Missing MongoDB connection
echo 4. Duplicate student ID/email
echo.
echo SOLUTION:
echo - Make sure all form fields are filled
echo - Section defaults to 'A' if empty
echo - Lab ID defaults to 'ALL' if empty
echo - Date must be in YYYY-MM-DD format
echo.
echo Check the server terminal window for detailed error logs
echo.
pause
