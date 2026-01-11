# 🚀 Complete Deployment Guide - Remote Setup (No Server Access)

**Scenario:** You're working remotely via AnyDesk on a student laptop and don't have access to the server system.

---

## 📋 Prerequisites

- ✅ Server is already running at a known IP address
- ✅ You have AnyDesk access to student laptop
- ✅ Student laptop is on same network as server
- ✅ You know the server IP address (e.g., 192.168.1.100)

---

## PART 1: Download Latest Code from GitHub

### Step 1.1: Open PowerShell on Student System (via AnyDesk)

1. Connect to student laptop via AnyDesk
2. Press `Win + X` and select "Windows PowerShell"

### Step 1.2: Navigate to Desired Location

```powershell
# Go to D: drive (or wherever you want to install)
cd D:\

# Remove old deployment folder if it exists
Remove-Item -Path "D:\screen_mirror_deployment" -Recurse -Force -ErrorAction SilentlyContinue
```

### Step 1.3: Download Latest Code from GitHub

**Option A: If Git is installed**
```powershell
git clone https://github.com/SRIJAA12/lab_monitoring_system.git screen_mirror_deployment
cd screen_mirror_deployment
```

**Option B: If Git is NOT installed (Download ZIP)**
1. Open browser on student system
2. Go to: `https://github.com/SRIJAA12/lab_monitoring_system`
3. Click green "Code" button → "Download ZIP"
4. Extract ZIP to `D:\screen_mirror_deployment`
5. Open PowerShell in that folder

---

## PART 2: Configure Server Connection

### Step 2.1: Update server-config.json

```powershell
cd D:\screen_mirror_deployment\student_deployment_package

# Open server-config.json in notepad
notepad server-config.json
```

### Step 2.2: Edit the Server IP

Change the `serverIp` to your actual server IP:

```json
{
  "serverIp": "192.168.1.100",
  "serverPort": 7401,
  "lastUpdated": "2026-01-11T10:00:00.000Z",
  "autoDetect": false
}
```

**Save and close** the file.

---

## PART 3: Test Server Connection

### Step 3.1: Test Basic Network Connectivity

```powershell
# Replace with your actual server IP
ping 192.168.1.100
```

✅ **Expected:** You should see replies like "Reply from 192.168.1.100..."
❌ **If it fails:** Check network connection, server IP, or firewall

### Step 3.2: Test Server Web Interface

Open browser on student system and navigate to:

```
http://192.168.1.100:7401/student-management-system.html
```

✅ **Expected:** Student management page loads
❌ **If it fails:** Server might not be running on port 7401

### Step 3.3: Run Connection Test Script

```powershell
cd D:\screen_mirror_deployment\student_deployment_package
.\TEST_CONNECTION.bat
```

Enter server IP when prompted and verify connection works.

---

## PART 4: Add New Student (From Student System)

### Step 4.1: Access Student Management System

**Important:** You CAN add students remotely from the student system!

1. Open browser on student system
2. Navigate to:
   ```
   http://192.168.1.100:7401/student-management-system.html
   ```
   *(Replace 192.168.1.100 with your actual server IP)*

### Step 4.2: Add Student Details

Fill in ALL required fields:

| Field | Value | Example |
|-------|-------|---------|
| **Name** | Student's full name | Subhahrini |
| **Student ID** | Unique ID (TSI###) | TSI001 |
| **Email** | Valid email address | subhahrini@college.edu |
| **Password** | Initial password | password123 |
| **Date of Birth** | DD/MM/YYYY | 15/08/2005 |
| **Register Number** | Student reg number | 2024CSE001 |
| **Department** | Department code | CSE |
| **Year** | 1-4 | 2 |
| **Section** | A/B/C | A |
| **Lab ID** | Lab identifier | LAB1 |
| **System Number** | Computer number | 5 |
| **MAC Address** | (Optional) | Leave blank |
| **IP Address** | (Optional) | Leave blank |

### Step 4.3: Verify Student Was Added

1. Click "Add Student" button
2. You should see a success message
3. Scroll down to "Registered Students" section
4. Verify your student appears in the list

---

## PART 5: Set System Number for Kiosk

### Step 5.1: Run System Number Configuration

```powershell
cd D:\screen_mirror_deployment\student_deployment_package
.\SET_SYSTEM_NUMBER.bat
```

### Step 5.2: Enter System Number

When prompted, enter the system number that matches the student's assigned computer (e.g., 5).

This creates `system-config.json` with the system number.

---

## PART 6: Install Kiosk Application

### Step 6.1: Run Kiosk Installation

```powershell
cd D:\screen_mirror_deployment\student_deployment_package
.\INSTALL_KIOSK.bat
```

### Step 6.2: Installation Process

The script will:
1. ✅ Check if Node.js is installed
2. ✅ Navigate to student-kiosk folder
3. ✅ Install dependencies (`npm install`)
4. ✅ Create desktop shortcut
5. ✅ Configure startup settings

**Wait for installation to complete** (may take 2-5 minutes).

### Step 6.3: Verify Installation

Check that:
- ✅ Desktop shortcut "Student Lab Kiosk" was created
- ✅ No error messages appeared during installation

---

## PART 7: Test Kiosk Application

### Step 7.1: Launch Kiosk

**Option A:** Double-click "Student Lab Kiosk" on desktop

**Option B:** Run from PowerShell:
```powershell
cd D:\screen_mirror_deployment\student_deployment_package\student-kiosk
npm start
```

### Step 7.2: Verify Kiosk Loads

✅ **Expected:**
- Kiosk window opens in fullscreen
- Login screen appears
- No error messages

❌ **If it fails:**
- Check server-config.json has correct IP
- Verify server is running
- Check network connectivity

---

## PART 8: Test First-Time Sign-In

### Step 8.1: Click "First-Time Sign-In"

On the kiosk login screen, click the "First-Time Sign-In" button.

### Step 8.2: Enter Student Details

Fill in the form:

| Field | Value |
|-------|-------|
| **Student ID** | TSI001 (or whatever you created) |
| **Date of Birth** | 15/08/2005 (must match what you entered) |

Click "Verify & Set Password"

### Step 8.3: Set New Password

1. Enter a new password (e.g., "MyNewPassword123")
2. Confirm the password
3. Click "Set Password"

✅ **Expected:** Success message, redirected to login screen

---

## PART 9: Test Regular Login

### Step 9.1: Login with Credentials

On the login screen:

| Field | Value |
|-------|-------|
| **Student ID** | TSI001 |
| **Password** | MyNewPassword123 (password you just set) |

Click "Sign In"

### Step 9.2: Verify Login Success

✅ **Expected:**
- Student interface loads
- Student's name appears at top
- Dashboard shows "Welcome back, [Name]"
- System info displays correctly

❌ **If login fails:**
- Check credentials are correct
- Verify student was properly added
- Run diagnostic: `QUICK_FIX_TSI.bat`

---

## PART 10: Test Forgot Password Feature

### Step 10.1: Logout from Kiosk

If logged in, logout first.

### Step 10.2: Click "Forgot Password"

On login screen, click "Forgot Password?" link.

### Step 10.3: Enter Student ID

1. Enter Student ID: TSI001
2. Click "Continue"

### Step 10.4: Enter Email

1. System shows masked email: s***@college.edu
2. Enter the full email you registered
3. Click "Send OTP"

### Step 10.5: Retrieve OTP

**Since you don't have server access, OTP is logged to server console.**

**Workaround Options:**

**Option A: Check server logs remotely via WMIC**
```powershell
# From student laptop PowerShell
cd D:\screen_mirror_deployment
.\QUICK_FIX_TSI.bat
```

Then check the output files on server (if you can access via network share).

**Option B: Configure Email (Requires server access)**
If email is not configured on server, OTPs won't be emailed. You would need to:
1. Access server
2. Add email settings to `.env` file
3. Restart server

**Option C: Use diagnostic script**
```powershell
# This will show recent OTPs if server is accessible via WMIC
cd D:\screen_mirror_deployment
.\REMOTE_DIAGNOSE_TSI.bat
```

Enter server IP, and it will try to retrieve OTP information.

### Step 10.6: Enter OTP and Reset Password

1. Get the 6-digit OTP from server logs
2. Enter OTP in kiosk
3. Click "Verify OTP"
4. Set new password
5. Click "Reset Password"

✅ **Expected:** Password reset successful, redirected to login

### Step 10.7: Test New Password

Login with the new password to verify it works.

---

## PART 11: Verify Everything Works

### ✅ Checklist

Run through this checklist to ensure complete functionality:

- [ ] **Server Connection**
  - [ ] Can ping server from student system
  - [ ] Can access student-management-system.html via browser
  - [ ] TEST_CONNECTION.bat shows success

- [ ] **Student Management**
  - [ ] Can add students via browser from student system
  - [ ] Students appear in registered students list
  - [ ] All required fields are filled correctly

- [ ] **Kiosk Installation**
  - [ ] Kiosk installs without errors
  - [ ] Desktop shortcut created
  - [ ] Kiosk launches and shows login screen

- [ ] **First-Time Sign-In**
  - [ ] Can verify student ID + DOB
  - [ ] Can set initial password
  - [ ] Password is saved correctly

- [ ] **Regular Login**
  - [ ] Can login with student ID + password
  - [ ] Student interface loads correctly
  - [ ] Student name displays correctly
  - [ ] System info shows correct details

- [ ] **Forgot Password**
  - [ ] Can initiate forgot password process
  - [ ] Email verification works (or OTP logs to server)
  - [ ] Can enter OTP and reset password
  - [ ] New password works for login

- [ ] **Hardware Monitoring**
  - [ ] CPU usage displays
  - [ ] RAM usage displays
  - [ ] Battery status shows (if laptop)

- [ ] **Server Communication**
  - [ ] Kiosk connects to server
  - [ ] Session tracking works
  - [ ] Real-time updates work

---

## PART 12: Troubleshooting

### Problem: "Cannot connect to server"

**Solution:**
1. Verify server IP in `server-config.json`
2. Ping server: `ping 192.168.1.100`
3. Check if server is running
4. Check firewall settings

### Problem: "Student not found" during login

**Solution:**
```powershell
cd D:\screen_mirror_deployment
.\QUICK_FIX_TSI.bat
```

This will diagnose if student exists in database.

### Problem: Forgot password doesn't work

**Solution:**
1. Email might not be configured on server
2. Check server logs for OTP codes
3. Use diagnostic script:
   ```powershell
   .\REMOTE_DIAGNOSE_TSI.bat
   ```

### Problem: Kiosk won't install

**Solution:**
1. Check if Node.js is installed
2. Run as Administrator
3. Check internet connection for npm packages

---

## PART 13: Adding Multiple Students

### Option 1: Add Students One by One (GUI)

1. Open browser on student system
2. Navigate to: `http://SERVER_IP:7401/student-management-system.html`
3. Fill form for each student
4. Click "Add Student"

### Option 2: Bulk Import via CSV (If available)

1. Create CSV file with student data
2. Access admin dashboard: `http://SERVER_IP:7401/central-admin/dashboard/admin-dashboard.html`
3. Login with admin credentials
4. Use CSV import feature

---

## PART 14: Deploying to Multiple Student Systems

### For Each Additional Student System:

1. **Download deployment package**
   ```powershell
   cd D:\
   git clone https://github.com/SRIJAA12/lab_monitoring_system.git screen_mirror_deployment
   ```

2. **Configure server connection**
   ```powershell
   cd screen_mirror_deployment\student_deployment_package
   notepad server-config.json
   # Update serverIp
   ```

3. **Set system number**
   ```powershell
   .\SET_SYSTEM_NUMBER.bat
   # Enter unique system number (1-60)
   ```

4. **Install kiosk**
   ```powershell
   .\INSTALL_KIOSK.bat
   ```

5. **Add student for this system** (via browser)
   - Navigate to student-management-system.html
   - Add student with matching system number

6. **Test login**
   - Launch kiosk
   - First-time sign-in or login

---

## PART 15: Quick Reference Commands

### From Student System (PowerShell)

```powershell
# Test server connection
ping 192.168.1.100

# Test server web interface
start http://192.168.1.100:7401/student-management-system.html

# Install kiosk
cd D:\screen_mirror_deployment\student_deployment_package
.\INSTALL_KIOSK.bat

# Set system number
.\SET_SYSTEM_NUMBER.bat

# Test connection
.\TEST_CONNECTION.bat

# Launch kiosk
cd student-kiosk
npm start

# Diagnose TSI issues (remote)
cd D:\screen_mirror_deployment
.\QUICK_FIX_TSI.bat
```

### Remote Server Diagnostics (via WMIC)

```powershell
# Run diagnostic on server remotely
cd D:\screen_mirror_deployment
.\REMOTE_DIAGNOSE_TSI.bat
# Enter server IP when prompted
```

---

## PART 16: Important URLs (Access from Student System)

Replace `192.168.1.100` with your actual server IP:

| Purpose | URL |
|---------|-----|
| **Add Students** | `http://192.168.1.100:7401/student-management-system.html` |
| **Admin Dashboard** | `http://192.168.1.100:7401/central-admin/dashboard/admin-dashboard.html` |
| **Student Sign-In** | `http://192.168.1.100:7401/student-signin/` |
| **Server Config** | `http://192.168.1.100:7401/server-config.json` |

---

## PART 17: Common Mistakes to Avoid

❌ **Don't:**
- Forget to update server IP in server-config.json
- Use duplicate student IDs
- Use duplicate system numbers
- Skip setting password during first-time sign-in
- Use invalid email format

✅ **Do:**
- Always test connection before installing kiosk
- Verify student was added before testing login
- Use unique student IDs (TSI001, TSI002, etc.)
- Use unique system numbers (1-60)
- Test each feature after setup

---

## PART 18: Post-Deployment

### Enable Kiosk Mode (Optional)

To make kiosk start on boot:

1. Press `Win + R`, type `shell:startup`, press Enter
2. Copy kiosk shortcut to startup folder
3. Configure Windows to auto-login (if desired)

### Lock Down System (Optional)

Refer to: `KIOSK_LOCKDOWN_COMPLETE.md` for full kiosk lockdown procedures.

---

## Summary

**You successfully deployed when:**

✅ Kiosk installed without errors
✅ Can add students via browser from student system
✅ First-time sign-in works
✅ Regular login works
✅ Forgot password works (with OTP retrieval)
✅ Student interface displays correctly
✅ Hardware monitoring shows real data
✅ Server connection is stable

---

## Support Files

- **QUICK_FIX_TSI.bat** - Diagnose and fix TSI account issues
- **REMOTE_DIAGNOSE_TSI.bat** - Comprehensive remote diagnostics
- **TSI_TROUBLESHOOTING_GUIDE.md** - Detailed troubleshooting guide
- **TEST_CONNECTION.bat** - Test server connectivity
- **INSTALL_KIOSK.bat** - Install kiosk on student system
- **SET_SYSTEM_NUMBER.bat** - Configure system number

---

## Need Help?

1. Run `QUICK_FIX_TSI.bat` for automated diagnostics
2. Check `TSI_TROUBLESHOOTING_GUIDE.md` for detailed solutions
3. Review server logs (if accessible)
4. Verify all configuration files have correct values

---

**Last Updated:** January 11, 2026
**Repository:** https://github.com/SRIJAA12/lab_monitoring_system
