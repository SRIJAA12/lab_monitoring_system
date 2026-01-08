# 🚀 Quick Test Guide - Lab Management System Fixes

**Date:** January 7, 2026  
**All fixes have been applied successfully!**

---

## 📋 What Was Fixed

✅ **Issue 1:** Automatic lab sessions not starting from timetable  
✅ **Issue 2:** Systems list showing incorrect/static systems  
✅ **Issue 3:** Automatic report generation verified and improved  

---

## 🎯 Quick Testing Steps

### Step 1: Restart the Server

```cmd
cd d:\screen_mirror_deployment_my_laptop\central-admin\server
node app.js
```

**Watch for these startup messages:**
```
✅ MongoDB connected successfully
✅ No stale sessions found - database is clean
📅 Timetable-based automatic session scheduler started
⏰ Scheduling report 1 for CC1 at HH:MM
Server running on port 7401
```

---

### Step 2: Test Automatic Session Starting

#### Option A: Use the Test Script (Easiest)

```cmd
cd d:\screen_mirror_deployment_my_laptop\central-admin\server
node test-timetable.js
```

This will:
- Create a test session that starts in 2 minutes
- Show you exactly what to watch for
- Give you the session details

#### Option B: Manual Upload

1. Open your browser: `http://localhost:7401/dashboard/admin-dashboard.html`
2. Login (if needed)
3. Scroll to "Timetable Management" section
4. Edit `sample_timetable.csv`:
   - Change first entry date to TODAY (2026-01-07)
   - Change start time to 2 minutes from now (e.g., if it's 10:43, set to 10:45)
5. Upload the CSV
6. Watch the server console

**Expected Output in Server Console:**
```
⏰ Timetable check at 10:45
📋 Found 1 timetable entries for today
📅 Timetable trigger: Starting session for Data Structures at 10:45
🚀 AUTO-STARTING LAB SESSION FROM TIMETABLE
   Subject: Data Structures
   Faculty: Dr. Rajesh Kumar
   Lab ID: CC1
   Time: 10:45 - 12:40
✅ Lab session auto-started: Data Structures
✅ Session auto-started successfully: Data Structures
```

**Expected in Admin Dashboard:**
- Active session appears in "Lab Session Control" section
- Shows subject, faculty, and duration
- "End Lab Session" button is visible

---

### Step 3: Test Systems List (Only Connected Systems)

#### Check Current Registry:

```cmd
cd d:\screen_mirror_deployment_my_laptop\central-admin\server
node test-system-registry.js
```

This shows all registered systems in the database.

#### Test the Dashboard:

1. Open dashboard: `http://localhost:7401/dashboard/admin-dashboard.html`
2. Scroll to "Guest Access - Quick System Unlock"
3. Select "CC1" from the lab dropdown

**If no kiosks are connected, you should see:**
```
📡 No systems connected yet for Computer Center Lab 1

Systems will appear here automatically when students 
power on and connect from kiosks.

💡 Tip: Have students log in from the kiosk desktop 
app to register their systems.
```

#### To Test System Appearing:

1. Launch the kiosk app on a test system:
   ```cmd
   cd d:\screen_mirror_deployment_my_laptop\student-kiosk\desktop-app
   npm start
   ```

2. Login as a student (use any registered student)

3. Go back to Admin Dashboard and refresh the "Guest Access" section

4. You should now see the system appear (e.g., "🔵 CC1-01" with student name)

5. When student logs out, system should show as "🟢 CC1-01" (available)

**Key Point:** Only systems that actually connect will appear - no more showing all 60 offline systems!

---

### Step 4: Test Automatic Reports

1. Open dashboard: `http://localhost:7401/dashboard/admin-dashboard.html`
2. Scroll to "Automatic Report Schedule" section
3. Set Schedule 1 to **2 minutes from now**:
   - Example: If it's 10:45 now, set to 10:47
4. Make sure "Enable" checkbox is checked
5. Click "Save Schedule"
6. Wait for the scheduled time

**Expected Output in Server Console:**
```
⏰ Scheduling report 1 for CC1 at 10:47
📊 Generating scheduled report for lab: CC1 at 1/7/2026, 10:47:00 AM
✅ Report generated: CC1-sessions-2026-01-07.csv
💾 Automatic report 1 saved: [path]
📢 Broadcasting scheduled report 1 for CC1
```

**Expected in Browser:**
- Report should automatically download
- Filename: `CC1-sessions-2026-01-07.csv`
- Contains all sessions from today

**Check Report Folder:**
```cmd
dir d:\screen_mirror_deployment_my_laptop\central-admin\server\reports\automatic
```

---

## 🔍 Verification Checklist

### Automatic Session Starting:
- [ ] Timetable monitor logs every minute: `⏰ Timetable check at HH:MM`
- [ ] Session starts at exact scheduled time
- [ ] Admin dashboard shows active session immediately
- [ ] No duplicate sessions created for same subject/time
- [ ] Session auto-ends at specified end time
- [ ] Report generated when session ends

### Systems List:
- [ ] Empty state message shows when no systems connected
- [ ] System appears after kiosk login
- [ ] System shows "logged-in" status with student name
- [ ] System shows "available" after logout (not removed)
- [ ] Lab stats are accurate (Available: X, Logged In: Y, etc.)
- [ ] Only actual connected systems appear (not all 60)

### Report Generation:
- [ ] Schedule can be saved successfully
- [ ] Report generates at scheduled time
- [ ] Browser auto-downloads the report
- [ ] Report saved in `reports/automatic/` folder
- [ ] Report contains correct data
- [ ] Both Schedule 1 and Schedule 2 work independently

---

## 📊 Monitoring & Debugging

### Real-Time Server Monitoring

Keep the server console open to see:
- Every minute: `⏰ Timetable check at HH:MM`
- Session starts: `✅ Session auto-started successfully`
- Student logins: `✅ Session created: [ID] for [Student]`
- System registry: `✅ System registry updated: CC1-01 -> Student Name`
- Report generation: `📊 Generating scheduled report for lab: CC1`

### Check Database Directly

**Timetable Entries:**
```cmd
cd d:\screen_mirror_deployment_my_laptop\central-admin\server
node test-timetable.js
```

**System Registry:**
```cmd
cd d:\screen_mirror_deployment_my_laptop\central-admin\server
node test-system-registry.js
```

**Active Sessions:**
```cmd
node check-students.js
```

### Common Issues & Solutions

**1. Session not starting automatically:**
- Check server time matches system time
- Verify timetable entry date is TODAY
- Check `isProcessed` is false in database
- Ensure server is running continuously

**2. Systems not appearing:**
- Verify kiosk app is connected to server
- Check server console for "register-kiosk" events
- Verify socket connection successful
- Check system number is correct format (CC1-01)

**3. Reports not generating:**
- Check schedule is enabled (checkbox checked)
- Verify time format is correct (HH:MM, 24-hour)
- Check server timezone (should be Asia/Kolkata)
- Look for cron errors in server console

---

## 🎯 End-to-End Test Scenario

Here's a complete workflow to test everything:

### 1. Start Fresh
```cmd
cd d:\screen_mirror_deployment_my_laptop\central-admin\server
node app.js
```

### 2. Create Test Session (Starting in 3 minutes)
```cmd
node test-timetable.js
```

### 3. Open Dashboard
Open: `http://localhost:7401/dashboard/admin-dashboard.html`

### 4. Check Systems List
- Should show "No systems connected"

### 5. Launch Kiosk and Login
```cmd
cd d:\screen_mirror_deployment_my_laptop\student-kiosk\desktop-app
npm start
```
- Login as a test student

### 6. Verify System Appears in Dashboard
- Refresh dashboard
- System should now appear as "logged-in"

### 7. Wait for Auto-Start (3 minutes)
- Watch server console
- Session should start automatically
- Dashboard should show active session

### 8. Verify Student is Tracked
- Student should appear in "Active Students" section
- Student should be in lab session records

### 9. Test Logout
- Logout from kiosk
- System should change to "available" in dashboard

### 10. Schedule Report for 2 Minutes
- Set Schedule 1 to current time + 2 minutes
- Save schedule
- Wait for auto-download

### 11. Verify Everything
- Check `reports/automatic/` folder for CSV
- Check server console logs
- Verify session auto-ended at end time

---

## ✅ Success Criteria

All three issues are FIXED if:

1. ✅ **Timetable Auto-Start**: Sessions start/end automatically at scheduled times without manual intervention
2. ✅ **Systems List**: Only connected systems appear, with accurate real-time status updates
3. ✅ **Report Generation**: Reports generate and download automatically at configured times

---

## 📞 Support

If you encounter any issues:
1. Check server console logs for error messages
2. Verify MongoDB connection is active
3. Check server-config.json has correct IP
4. Ensure no firewall blocking port 7401
5. Review FIXES_APPLIED.md for detailed technical info

---

**Testing should take approximately 10-15 minutes total.**

Good luck! 🚀
