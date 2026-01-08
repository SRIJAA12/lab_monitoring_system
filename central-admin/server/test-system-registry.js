// Quick test script to check system registry
// Run this: node test-system-registry.js

const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://srijaaanandhan12_db_user:122007@cluster0.2kzkkpe.mongodb.net/college-lab-registration?retryWrites=true&w=majority';

const systemRegistrySchema = new mongoose.Schema({
  systemNumber: { type: String, required: true, unique: true },
  labId: { type: String, required: true },
  ipAddress: { type: String, required: true },
  status: { type: String, enum: ['available', 'logged-in', 'guest', 'offline'], default: 'available' },
  lastSeen: { type: Date, default: Date.now },
  currentSessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  currentStudentId: { type: String },
  currentStudentName: { type: String },
  isGuest: { type: Boolean, default: false },
  socketId: { type: String }
});

const SystemRegistry = mongoose.model('SystemRegistry', systemRegistrySchema);

async function checkSystemRegistry() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB\n');

    // Get all registered systems
    const systems = await SystemRegistry.find({}).sort({ systemNumber: 1 }).lean();

    console.log('🖥️  SYSTEM REGISTRY STATUS');
    console.log('═'.repeat(80));
    console.log(`Total Registered Systems: ${systems.length}\n`);

    if (systems.length === 0) {
      console.log('📡 No systems are currently registered in the database.');
      console.log('\nℹ️  Systems will appear here when:');
      console.log('   1. A kiosk desktop app is launched');
      console.log('   2. It connects to the server via socket');
      console.log('   3. A student logs in from the kiosk\n');
    } else {
      // Group by lab
      const labGroups = {};
      systems.forEach(sys => {
        if (!labGroups[sys.labId]) {
          labGroups[sys.labId] = [];
        }
        labGroups[sys.labId].push(sys);
      });

      // Display by lab
      Object.keys(labGroups).sort().forEach(labId => {
        const labSystems = labGroups[labId];
        console.log(`\n🏢 ${labId} - ${labSystems.length} systems registered:`);
        console.log('─'.repeat(80));

        labSystems.forEach(sys => {
          const statusIcon = {
            'available': '🟢',
            'logged-in': '🔵',
            'guest': '🟣',
            'offline': '⚫'
          }[sys.status] || '❓';

          console.log(`\n${statusIcon} ${sys.systemNumber}`);
          console.log(`   Status: ${sys.status}`);
          console.log(`   IP Address: ${sys.ipAddress}`);
          console.log(`   Last Seen: ${sys.lastSeen ? new Date(sys.lastSeen).toLocaleString('en-IN') : 'Never'}`);
          
          if (sys.currentStudentName) {
            console.log(`   Current User: ${sys.currentStudentName} (${sys.currentStudentId})`);
          }
          
          if (sys.isGuest) {
            console.log(`   Mode: GUEST ACCESS`);
          }
        });
        console.log('');
      });

      // Statistics
      const stats = {
        available: systems.filter(s => s.status === 'available').length,
        loggedIn: systems.filter(s => s.status === 'logged-in').length,
        guest: systems.filter(s => s.status === 'guest').length,
        offline: systems.filter(s => s.status === 'offline').length
      };

      console.log('\n📊 STATISTICS:');
      console.log('─'.repeat(40));
      console.log(`🟢 Available:  ${stats.available}`);
      console.log(`🔵 Logged In:  ${stats.loggedIn}`);
      console.log(`🟣 Guest Mode: ${stats.guest}`);
      console.log(`⚫ Offline:    ${stats.offline}`);
      console.log(`📍 Total:      ${systems.length}\n`);
    }

    console.log('═'.repeat(80));
    console.log('\n💡 TIP: This data should match what you see in the Admin Dashboard');
    console.log('       under "Guest Access - Quick System Unlock" section.\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB\n');
  }
}

checkSystemRegistry();
