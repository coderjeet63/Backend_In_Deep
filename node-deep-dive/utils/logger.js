const winston = require('winston');

// Logger ka setup
const logger = winston.createLogger({
  level: 'info', // 'info' se upar ke sab level record honge (info, warn, error)
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // Server logs JSON mein acche lagte hain
  ),
  transports: [
    // 1. Errors ko alag file mein rakho
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // 2. Sab kuch (Info + Error) alag file mein
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Agar hum Localhost pe hain, toh Console mein bhi dikhao (Rangeen colors ke sath)
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger;