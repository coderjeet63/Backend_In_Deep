const os = require('os');
const fs = require('fs');


const logFile = function()
 {
    
    const checkFreeMemory = os.freemem();
    console.log(`${checkFreeMemory} bytes of free memory available.`);

    const totalMemory = os.totalmem();
    console.log(`${totalMemory} bytes of total memory available.`);

    const usagePercent = ((totalMemory - checkFreeMemory) / totalMemory) * 100;

    const logMessage = `[${new Date().toLocaleString()}] RAM Usage: ${usagePercent.toFixed(2)}% | Free: ${(checkFreeMemory / 1024 / 1024).toFixed(2)} MB\n`;

    console.log(logMessage);

    fs.appendFile('system_logs.txt' , logMessage, (err) => {
       if (err) throw err;
    });
     
}

setInterval(logFile, 5000);