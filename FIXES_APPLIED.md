# Lab Management System - Fixes Applied

**Date:** January 7, 2026  
**Issues Fixed:** 3 critical issues

---

## ✅ Issue 1: Automatic Lab Session Not Starting

### Problem:
- When uploading a timetable, sessions were not starting automatically at the specified time
- No proper checking to prevent duplicate session starts
- Missing lab-specific session filtering

### Solution Applied:
1. **Enhanced Timetable Monitor (`app.js` line ~4250)**:
   - Added detailed logging: `⏰ Timetable check at HH:MM`
   - Added `console.log` for number of entries found for today
   - Properly sorts timetable entries by start time
   - Added result checking for success/failure of auto-start

2. **Improved Auto-Start Logic (`autoStartLabSession()` function)**:
   - Now checks for existing sessions **per lab** (not globally)
   - Prevents duplicate starts of the same session
   - If the same session is already running, marks as processed without duplicating
   - If different session exists, properly ends old one before starting new one
   - Added `labId` to the new lab session creation
   - Better socket notifications with `labId` included

### How It Works Now:
```
1. Cron job runs every minute (⏰ Timetable check at 10:43)
2. Finds today's timetable entries
3. Checks if current time matches start time
4. Verifies no duplicate session for that lab
5. Auto-starts session and marks entry as processed
6. Notifies admins via socket
7. At end time, auto-ends session and generates report
```

### Test Instructions:
1. Upload `sample_timetable.csv` via Timetable Management
2. Edit a session to start in 2-3 minutes from now
3. Wait and watch server console logs
4. You should see: `📅 Timetable trigger: Starting session for [Subject]`
5. Then: `✅ Session auto-started successfully: [Subject]`
6. Admin dashboard should show the active session

---

## ✅ Issue 2: Incorrect Systems List in Dashboard

### Problem:
- Dashboard showed ALL 60 systems (CC1-01 to CC1-60) even if not connected
- Systems appeared as "offline" when they were never connected
- No clear indication that systems appear only when students log in

### Solution Applied:
1. **Modified `/api/systems/:labId` endpoint (`app.js` line ~2430)**:
   - Changed from showing full system range (60 systems)
   - Now shows **ONLY connected/registered systems** from `SystemRegistry`
   - Systems appear in the list only after they connect from kiosk
   - Cleaner statistics with accurate counts

2. **Enhanced Student Login (`/api/student-login`)**:
   - Now updates `SystemRegistry` on every student login
   - Registers system with: `systemNumber`, `labId`, `status`, `studentName`, `studentId`
   - Marks system as `logged-in` or `guest`

3. **Enhanced Student Logout (`/api/student-logout`)**:
   - Properly updates `SystemRegistry` to mark system as `available`
   - Clears student information from system record
   - System remains in registry (doesn't disappear) but shows as available

4. **Improved Dashboard Display (`admin-dashboard.html`)**:
   - Shows helpful message when no systems are connected:
     ```
     📡 No systems connected yet for Computer Center Lab 1
     Systems will appear here automatically when students power on and connect from kiosks.
     💡 Tip: Have students log in from the kiosk desktop app to register their systems.
     ```
   - Clear visual feedback about system registration process

### How It Works Now:
```
BEFORE:
- Dashboard loads → Shows CC1-01 to CC1-60 (all offline)
- Student logs in → System changes from offline to logged-in
- Confusing and cluttered display

AFTER:
- Dashboard loads → Shows "No systems connected" message
- Student powers on kiosk → Kiosk registers via socket
- System appears in dashboard as "available"
- Student logs in → System changes to "logged-in" with student name
- Student logs out → System shows as "available" (not removed)
- Clean, accurate representation of actual lab state
```

### Test Instructions:
1. Open Admin Dashboard → Guest Access section
2. Initially you should see "No systems connected" message
3. Launch kiosk app on a system and login as a student
4. Refresh dashboard → System should now appear as "logged-in"
5. Logout from kiosk → System shows as "available" (green)
6. Only actual connected systems appear, not all 60

---

## ✅ Issue 3: Automatic Report Generation

### Current Status:
The automatic report generation system was already properly implemented. Here's what's working:

### Features:
1. **Dual Schedule Support**:
   - Schedule 1: Morning/Afternoon report (e.g., 1:00 PM)
   - Schedule 2: Evening report (e.g., 6:00 PM)
   - Each schedule can be enabled/disabled independently

2. **Cron-Based Scheduling**:
   - Uses `node-cron` with IST timezone
   - Runs at specified times daily
   - Auto-generates CSV reports

3. **Report Storage**:
   - Automatic reports saved to: `reports/automatic/`
   - Manual reports saved to: `reports/manual/`
   - Session CSVs saved to: `session-csvs/`

4. **Browser Download**:
   - Socket event `scheduled-report-ready` triggered at scheduled time
   - Admin dashboard listens for this event
   - Automatically downloads report to browser

### Verification Steps:
1. Go to Admin Dashboard → Automatic Report Schedule section
2. Set Schedule 1 to a time 2 minutes from now
3. Enable Schedule 1
4. Click "Save Schedule"
5. Wait for scheduled time
6. Server console should show: `📢 Broadcasting scheduled report 1 for CC1`
7. Report should auto-download in browser

### If Reports Not Generating:
Check server console for:
- `⏰ Scheduling report 1 for CC1 at HH:MM`
- `📊 Generating scheduled report for lab: CC1`
- `💾 Automatic report saved: [filename]`

---

## 🔧 Additional Improvements Made

### 1. Better Lab Session Tracking
- Lab sessions now properly track `labId`
- Prevents session overlap within same lab
- Multiple labs can have simultaneous sessions

### 2. System Registry Enhancements
- Real-time system status updates
- Accurate tracking of student assignments
- Proper cleanup on logout

### 3. Improved Logging
- Detailed console logs for debugging
- Clear success/failure messages
- Timestamps and context in logs

### 4. Socket Notification Updates
- Added `labId` to all relevant socket events
- Better real-time dashboard updates
- More accurate system status broadcasts

---

## 📋 Testing Checklist

### Timetable Auto-Start:
- [ ] Upload timetable CSV
- [ ] Set session to start in 2 minutes
- [ ] Verify session starts automatically
- [ ] Check admin dashboard shows active session
- [ ] Verify session ends automatically at end time
- [ ] Confirm report is generated

### Systems List:
- [ ] Open dashboard with no kiosks connected
- [ ] Verify "No systems connected" message shows
- [ ] Login from kiosk
- [ ] Verify system appears in dashboard
- [ ] Check status shows "logged-in" with student name
- [ ] Logout from kiosk
- [ ] Verify system shows as "available"

### Report Generation:
- [ ] Configure Schedule 1 for 2 minutes from now
- [ ] Save schedule
- [ ] Wait for scheduled time
- [ ] Verify report auto-downloads
- [ ] Check `reports/automatic/` folder for saved file
- [ ] Test Schedule 2 similarly

---

## 🚀 Server Restart Required

After these changes, restart the server:

```bash
cd central-admin\server
node app.js
```

Watch for these startup messages:
- `✅ MongoDB connected successfully`
- `📅 Timetable-based automatic session scheduler started`
- `⏰ Scheduling report 1 for CC1 at HH:MM`
- `Server running on port 7401`

---

## 📝 Files Modified

1. `central-admin/server/app.js`
   - Timetable monitoring logic (~line 4250)
   - `autoStartLabSession()` function (~line 4180)
   - `/api/systems/:labId` endpoint (~line 2430)
   - `/api/student-login` endpoint (~line 2207)
   - `/api/student-logout` endpoint (~line 2285)

2. `central-admin/dashboard/admin-dashboard.html`
   - `renderSystemButtons()` function (~line 2065)
   - Improved empty state messaging

---

## ⚠️ Important Notes

1. **Timetable Format**: Ensure CSV has correct date format (YYYY-MM-DD) and time format (HH:MM in 24-hour)
2. **Lab IDs**: Sessions are now lab-specific - CC1, CC2, etc. can run simultaneously
3. **System Registration**: Systems only appear after first connection from kiosk
4. **Timezone**: All schedules use IST (Asia/Kolkata)

---

## 🎯 Next Steps

1. Restart the server
2. Test automatic session starting with a near-future time
3. Test system registration by logging in from kiosk
4. Test automatic reports with a near-future schedule
5. Monitor server console logs for any errors

---

**All fixes have been applied successfully!** 🎉
