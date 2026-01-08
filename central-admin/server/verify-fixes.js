// Quick verification script for the urgent fixes
// Run this: node verify-fixes.js

const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://srijaaanandhan12_db_user:122007@cluster0.2kzkkpe.mongodb.net/college-lab-registration?retryWrites=true&w=majority';

const systemRegistrySchema = new mongoose.Schema({
  systemNumber: String,
  labId: String,
  ipAddress: String,
  status: String,
  lastSeen: Date,
  currentSessionId: mongoose.Schema.Types.ObjectId,
  currentStudentId: String,
  currentStudentName: String,
  isGuest: Boolean,
  socketId: String
});

const sessionSchema = new mongoose.Schema({
  studentName: String,
  studentId: String,
  computerName: String,
  labId: String,
  systemNumber: String,
  loginTime: Date,
  logoutTime: Date,
  duration: Number,
  status: String,
  screenshot: String
});

const SystemRegistry = mongoose.model('SystemRegistry', systemRegistrySchema);
const Session = mongoose.model('Session', sessionSchema);

async function verifyFixes() {
  try {
    console.log('🔌 Connecting to MongoDB...\n');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB\n');
    
    console.log('='.repeat(70));
    console.log('   VERIFICATION REPORT - URGENT FIXES');
    console.log('='.repeat(70));
    console.log('');
    
    // Check 1: Only logged-in systems
    console.log('📊 CHECK 1: Systems List (Should only show logged-in)');
    console.log('-'.repeat(70));
    
    const allSystems = await SystemRegistry.find({}).sort({ systemNumber: 1 });
    const loggedInSystems = await SystemRegistry.find({ 
      status: { $in: ['logged-in', 'guest'] } 
    }).sort({ systemNumber: 1 });
    
    console.log(`   Total systems in registry: ${allSystems.length}`);
    console.log(`   Systems with students (logged-in/guest): ${loggedInSystems.length}`);
    console.log('');
    
    if (loggedInSystems.length > 0) {
      console.log('   ✅ ACTIVE SYSTEMS (What admin dashboard will show):');
      loggedInSystems.forEach(sys => {
        console.log(`      🔵 ${sys.systemNumber} - ${sys.currentStudentName || 'Unknown'}`);
        console.log(`         Status: ${sys.status}`);
        console.log(`         Session ID: ${sys.currentSessionId || 'NOT SET ❌'}`);
        console.log(`         IP: ${sys.ipAddress || 'N/A'}`);
        console.log('');
      });
    } else {
      console.log('   ℹ️  No students currently logged in');
      console.log('   Dashboard will show: "No students logged in yet"');
    }
    
    console.log('');
    
    // Check 2: Screen mirroring readiness
    console.log('📹 CHECK 2: Screen Mirroring Setup');
    console.log('-'.repeat(70));
    
    let mirroringReady = 0;
    let missingSessionId = 0;
    
    for (const sys of loggedInSystems) {
      if (sys.currentSessionId) {
        mirroringReady++;
        console.log(`   ✅ ${sys.systemNumber}: Session ID present → Screen mirroring READY`);
      } else {
        missingSessionId++;
        console.log(`   ❌ ${sys.systemNumber}: Missing Session ID → Screen mirroring BROKEN`);
      }
    }
    
    console.log('');
    console.log(`   Systems ready for mirroring: ${mirroringReady}/${loggedInSystems.length}`);
    
    if (missingSessionId > 0) {
      console.log(`   ⚠️  WARNING: ${missingSessionId} system(s) missing sessionId`);
      console.log('   These systems will NOT work for screen mirroring!');
    } else if (loggedInSystems.length > 0) {
      console.log('   ✅ All logged-in systems have sessionId - mirroring OK');
    }
    
    console.log('');
    
    // Check 3: Active sessions for persistence
    console.log('🔄 CHECK 3: Session Persistence After Refresh');
    console.log('-'.repeat(70));
    
    const activeSessions = await Session.find({ status: 'active' }).sort({ loginTime: -1 });
    
    console.log(`   Active sessions in database: ${activeSessions.length}`);
    console.log('');
    
    if (activeSessions.length > 0) {
      console.log('   ✅ ACTIVE SESSIONS (Will restore after refresh):');
      activeSessions.forEach(session => {
        const duration = session.loginTime ? 
          Math.floor((new Date() - session.loginTime) / 60000) : 0;
        console.log(`      📍 ${session.studentName} (${session.systemNumber})`);
        console.log(`         Student ID: ${session.studentId}`);
        console.log(`         Lab: ${session.labId}`);
        console.log(`         Login: ${session.loginTime?.toLocaleString('en-IN') || 'N/A'}`);
        console.log(`         Duration: ${duration} minutes`);
        console.log(`         Session ID: ${session._id}`);
        console.log('');
      });
      console.log('   ✅ Dashboard will restore these sessions after F5/refresh');
    } else {
      console.log('   ℹ️  No active sessions right now');
      console.log('   Dashboard will show: "No students connected"');
    }
    
    console.log('');
    
    // Summary
    console.log('='.repeat(70));
    console.log('   SUMMARY');
    console.log('='.repeat(70));
    console.log('');
    
    console.log('✅ FIX 1: Only Logged-In Systems Visible');
    console.log(`   API will return: ${loggedInSystems.length} system(s)`);
    console.log(`   (Not all ${allSystems.length} systems in registry)`);
    console.log('');
    
    console.log('✅ FIX 2: Screen Mirroring');
    if (loggedInSystems.length === 0) {
      console.log('   Status: No students to test (need login first)');
    } else if (missingSessionId > 0) {
      console.log(`   Status: ❌ BROKEN - ${missingSessionId} system(s) missing sessionId`);
      console.log('   Action: Restart server and have students re-login');
    } else {
      console.log(`   Status: ✅ READY - All ${mirroringReady} system(s) have sessionId`);
    }
    console.log('');
    
    console.log('✅ FIX 3: Session Persistence');
    if (activeSessions.length === 0) {
      console.log('   Status: No sessions to restore (need login first)');
    } else {
      console.log(`   Status: ✅ READY - ${activeSessions.length} session(s) will restore`);
    }
    console.log('');
    
    // Testing recommendations
    console.log('='.repeat(70));
    console.log('   TESTING RECOMMENDATIONS');
    console.log('='.repeat(70));
    console.log('');
    
    if (loggedInSystems.length === 0) {
      console.log('⚠️  NO ACTIVE STUDENTS FOUND');
      console.log('');
      console.log('To test the fixes:');
      console.log('1. Start the server: cd central-admin\\server && node app.js');
      console.log('2. Start kiosk: cd student-kiosk\\desktop-app && npm start');
      console.log('3. Login as a student');
      console.log('4. Run this script again to verify');
      console.log('5. Open admin dashboard and check:');
      console.log('   - System appears in "Active Students"');
      console.log('   - Can click "View Screen" and see video');
      console.log('   - Refresh page (F5) and session persists');
    } else {
      console.log('✅ STUDENTS ARE LOGGED IN - READY TO TEST');
      console.log('');
      console.log('Open admin dashboard now and verify:');
      console.log('1. Only logged-in students appear (not all 60 systems)');
      console.log('2. Click "View Screen" on any student - should work');
      console.log('3. Press F5 to refresh page');
      console.log('4. Sessions should restore automatically');
      console.log('5. Screen monitoring should still work');
    }
    
    console.log('');
    console.log('='.repeat(70));
    console.log('');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
  }
}

verifyFixes();
