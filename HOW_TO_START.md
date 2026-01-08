# 🚀 Lab Management System - Quick Start Guide

## 📌 One-Click Launch Options

### ✅ **RECOMMENDED: START_ADMIN_DASHBOARD.bat**
**Double-click this file to start everything!**
- ✅ Starts the server
- ✅ Opens admin dashboard automatically in browser
- ✅ Shows server status in a clean window
- ✅ Keep this window open while using the system

**Location:** `d:\screen_mirror_deployment_my_laptop\START_ADMIN_DASHBOARD.bat`

---

## 🔖 Browser Bookmarks

### Option 1: Use the URL Shortcut File
1. **Double-click:** `Admin Dashboard.url`
2. It will open: `http://10.10.46.103:7401/dashboard/admin-dashboard.html`

### Option 2: Drag to Browser
1. **Drag** `Admin Dashboard.url` to your browser's bookmark bar
2. Now you can click it anytime to open the dashboard!

### Option 3: Manual Bookmark
1. Start the server: Run `START_ADMIN_DASHBOARD.bat`
2. When browser opens automatically
3. Press **Ctrl + D** to bookmark
4. Name it: "Lab Admin Dashboard"

---

## 📂 Important Files

| File | Purpose |
|------|---------|
| `START_ADMIN_DASHBOARD.bat` | **Main launcher** - Double-click to start everything |
| `Admin Dashboard.url` | **Direct link** - Opens dashboard (server must be running) |
| `START_SERVER.bat` | Alternative - Starts server only |
| `student-management-system.html` | Student login page (double-click to open) |

---

## 🎯 Quick Workflow

### **For Daily Use:**
1. **Morning:** Double-click `START_ADMIN_DASHBOARD.bat`
2. **Dashboard opens automatically** in your browser
3. **Start working** - System is ready!
4. **Evening:** Close the server window when done

### **For Testing/Checking:**
1. **If server is already running:**
   - Just double-click `Admin Dashboard.url` to open dashboard
   
2. **If you closed browser accidentally:**
   - Double-click `Admin Dashboard.url` again
   - OR manually open: `http://10.10.46.103:7401/dashboard/admin-dashboard.html`

---

## ⚡ Keyboard Shortcuts

- **Ctrl + D** - Bookmark current page (when in browser)
- **Ctrl + Shift + B** - Show/hide bookmark bar (Chrome/Edge)
- **Ctrl + C** - Stop server (in server window)

---

## 🌐 Important URLs

Copy these to bookmark or use:

```
Student Login Page (Local):
file:///D:/screen_mirror_deployment_my_laptop/student-management-system.html

Admin Dashboard (Network):
http://10.10.46.103:7401/dashboard/admin-dashboard.html

Server Status:
http://10.10.46.103:7401/

API Base:
http://10.10.46.103:7401/api/
```

---

## 🔧 Troubleshooting

### ❌ "Cannot GET /dashboard"
**Solution:** Server is not running
- Double-click `START_ADMIN_DASHBOARD.bat`

### ❌ "Connection Refused"
**Solution:** Check IP address or server status
- Open `START_ADMIN_DASHBOARD.bat` to restart server
- Check if IP is still `10.10.46.103` (run `ipconfig` in cmd)

### ❌ Browser doesn't open automatically
**Solution:** Manually open the dashboard
- Double-click `Admin Dashboard.url`
- OR open browser and go to: `http://10.10.46.103:7401/dashboard/admin-dashboard.html`

---

## 📌 Pin to Taskbar (Windows)

1. **Right-click** on `START_ADMIN_DASHBOARD.bat`
2. Select **"Send to" → "Desktop (create shortcut)"**
3. **Right-click** the desktop shortcut
4. Select **"Pin to taskbar"**
5. Now you have a **one-click launcher** in your taskbar!

---

## 🎨 Create Desktop Icon (Pretty)

1. **Right-click desktop** → "New" → "Shortcut"
2. **Location:** 
   ```
   d:\screen_mirror_deployment_my_laptop\START_ADMIN_DASHBOARD.bat
   ```
3. **Name:** "Lab Admin Dashboard"
4. **Right-click new icon** → "Properties"
5. **Click "Change Icon"**
6. **Browse to:** `C:\Windows\System32\imageres.dll`
7. **Choose a nice icon** (like a computer or gear)
8. **Click OK**

Now you have a beautiful desktop icon! 🎉

---

## 📝 Notes

- **Always keep the server window open** while using the system
- **Don't close the black window** that appears - it's running the server
- **Server auto-starts dashboard** after 1 second
- **Students can login** even if you close the admin dashboard (server keeps running)

---

## 🆘 Need Help?

- **Check logs:** Look at the server window for error messages
- **Restart:** Close server window and run `START_ADMIN_DASHBOARD.bat` again
- **Test connection:** Open `http://10.10.46.103:7401/` to see server status

---

**Last Updated:** January 2026  
**Version:** 2.0 - Auto-Launch Edition
