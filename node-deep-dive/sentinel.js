const os = require('os');
const path = require('path');
const fs = require('fs');

// --- STEP 1: Setting up Secure Path (The 'Path' Module) ---
// Hum chahte hain ki saare logs ek 'project_logs' folder mein jayen
const logDir = path.join(__dirname, 'project_logs');
console.log(__dirname)
// Agar folder nahi hai, toh bana do (The 'FS' Module)
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
    console.log("📁 Folder 'project_logs' created successfully!");
}

// Log file ka full address (Cross-platform compatible)
const logFilePath = path.join(logDir, 'health_report.log');

// --- STEP 2: Creating a Stream (The 'FS' Deep Feature) ---
// appendFile ki jagah WriteStream use kar rahe hain high performance ke liye
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

if(path.extname(logFilePath) !== '.log') {
    console.error("❌ Error: Log file must have a .log extension.");
    process.exit(1);
}



const getSystemStats = () => {
    // Hardware Info (The 'OS' Module)
    const stats = {
        time: new Date().toISOString(),
        cpuCount: os.cpus().length, // Kitne cores hain (Scaling ke liye)
        uptime: (os.uptime() / 3600).toFixed(2) + " hours", // Kitni der se server chalu hai
        memoryUsage: ((1 - os.freemem() / os.totalmem()) * 100).toFixed(2) + "%",
        userInfo: os.userInfo().username
    };

    const logEntry = JSON.stringify(stats) + "\n";
    
    // UI par dikhao
    console.log("📊 Reporting Health to File...");
    console.table(stats); // Console mein table format (Sundar dikhne ke liye)

    // File mein stream karo (Bina RAM block kiye)
    logStream.write(logEntry);
};

// Har 10 second mein report generate karo
setInterval(getSystemStats, 10000);

// Cleanup: Agar hum Ctrl+C dabayein toh stream band ho jaye
process.on('SIGINT', () => {
    logStream.end();
    console.log("\n👋 Sentinel shutting down. Logs saved safely.");
    process.exit();
});