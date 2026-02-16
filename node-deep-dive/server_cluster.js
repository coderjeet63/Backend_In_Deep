const cluster = require('cluster');
const http = require('http');
const os = require('os');

// --- STEP 1: Check hardware limit (The 'OS' Module) ---
const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
    // --- MASTER PROCESS (The Manager) ---
    console.log(`🚀 Master Process (PID: ${process.pid}) is running`);
    console.log(`💻 Detected ${totalCPUs} CPU Cores. Spawning workers...`);

    // Jitne CPU, utne servers chalu karo
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork(); // Yeh nayi copy banata hai
    }

    // Agar koi worker mar jaye (crash ho jaye), toh naya zinda karo
    cluster.on('exit', (worker, code, signal) => {
        console.log(`❌ Worker ${worker.process.pid} died. Starting a new one...`);
        cluster.fork();
    });

} else {
    // --- WORKER PROCESS (The Actual Server) ---
    // Ye code utni baar chalega jitne CPU cores hain
    
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Hello! Served by Worker Process ID: ${process.pid}\n`);
        
        // Console mein dikhega ki kaunsa worker request le raha hai
        console.log(`✅ Request handled by Worker ${process.pid}`);
    }).listen(8000);

    console.log(`🛠️ Worker Process ${process.pid} started`);
}