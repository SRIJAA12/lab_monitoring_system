// Quick test script to verify timetable auto-start functionality
// Run this while server is running: node test-timetable.js

const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://srijaaanandhan12_db_user:122007@cluster0.2kzkkpe.mongodb.net/college-lab-registration?retryWrites=true&w=majority';

// Timetable Entry Schema
const timetableEntrySchema = new mongoose.Schema({
  sessionDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  faculty: { type: String, required: true },
  subject: { type: String, required: true },
  labId: { type: String, required: true },
  year: { type: Number, required: true },
  department: { type: String, required: true },
  section: { type: String, default: 'A' },
  periods: { type: Number, required: true },
  duration: { type: Number, required: true },
  maxStudents: { type: Number, default: 60 },
  remarks: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  isProcessed: { type: Boolean, default: false },
  labSessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'LabSession' },
  uploadedAt: { type: Date, default: Date.now },
  uploadedBy: { type: String, default: 'admin' }
});

const TimetableEntry = mongoose.model('TimetableEntry', timetableEntrySchema);

async function testTimetable() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB\n');

    // Get current time + 2 minutes for test
    const now = new Date();
    const testStartTime = new Date(now.getTime() + 2 * 60000); // 2 minutes from now
    const testEndTime = new Date(testStartTime.getTime() + 100 * 60000); // 100 minutes later

    const startTimeStr = `${String(testStartTime.getHours()).padStart(2, '0')}:${String(testStartTime.getMinutes()).padStart(2, '0')}`;
    const endTimeStr = `${String(testEndTime.getHours()).padStart(2, '0')}:${String(testEndTime.getMinutes()).padStart(2, '0')}`;

    console.log('📅 Current Time:', now.toLocaleString('en-IN'));
    console.log('⏰ Test Session Start Time:', testStartTime.toLocaleString('en-IN'), `(${startTimeStr})`);
    console.log('⏰ Test Session End Time:', testEndTime.toLocaleString('en-IN'), `(${endTimeStr})\n`);

    // Check existing timetable entries for today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todayEntries = await TimetableEntry.find({
      isActive: true,
      sessionDate: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ startTime: 1 });

    console.log(`📋 Found ${todayEntries.length} timetable entries for today:\n`);
    todayEntries.forEach((entry, index) => {
      console.log(`${index + 1}. ${entry.subject}`);
      console.log(`   Faculty: ${entry.faculty}`);
      console.log(`   Time: ${entry.startTime} - ${entry.endTime}`);
      console.log(`   Lab: ${entry.labId}`);
      console.log(`   Processed: ${entry.isProcessed ? '✅ Yes' : '❌ No'}`);
      console.log('');
    });

    // Create a test entry that starts in 2 minutes
    console.log('\n🧪 Creating test timetable entry...');
    const testEntry = new TimetableEntry({
      sessionDate: new Date(),
      startTime: startTimeStr,
      endTime: endTimeStr,
      faculty: 'Test Faculty',
      subject: '🧪 AUTO-START TEST SESSION',
      labId: 'CC1',
      year: 2,
      department: 'Computer Science',
      section: 'TEST',
      periods: 2,
      duration: 100,
      maxStudents: 60,
      remarks: 'Automatic test - created by test-timetable.js',
      isActive: true,
      isProcessed: false,
      uploadedBy: 'test-script'
    });

    await testEntry.save();

    console.log('✅ Test timetable entry created successfully!');
    console.log('\n📝 Entry Details:');
    console.log(`   ID: ${testEntry._id}`);
    console.log(`   Subject: ${testEntry.subject}`);
    console.log(`   Start Time: ${testEntry.startTime}`);
    console.log(`   End Time: ${testEntry.endTime}`);
    console.log(`   Lab ID: ${testEntry.labId}`);

    console.log('\n⏱️  TESTING INSTRUCTIONS:');
    console.log('━'.repeat(60));
    console.log('1. Make sure the server is running (node app.js)');
    console.log('2. Watch the server console logs');
    console.log(`3. In approximately 2 minutes (at ${startTimeStr}), you should see:`);
    console.log('   - ⏰ Timetable check at HH:MM');
    console.log('   - 📅 Timetable trigger: Starting session for 🧪 AUTO-START TEST SESSION');
    console.log('   - ✅ Session auto-started successfully');
    console.log('4. Open Admin Dashboard to see the active session');
    console.log(`5. At ${endTimeStr}, the session should auto-end and generate a report`);
    console.log('━'.repeat(60));

    console.log('\n⚠️  If nothing happens:');
    console.log('   - Check if server is running');
    console.log('   - Check server console for errors');
    console.log('   - Verify current server time matches system time');
    console.log('   - Check MongoDB connection');

    console.log('\n🗑️  To clean up this test entry later, run:');
    console.log(`   Delete entry with ID: ${testEntry._id}`);
    console.log('   Or use: Clear All Timetable button in admin dashboard\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
  }
}

testTimetable();
