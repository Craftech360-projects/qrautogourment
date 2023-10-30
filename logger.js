const fs = require('fs');
const path = require('path');

// Create a log directory if it doesn't exist
const logDirectory = 'logs';
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const logFile = path.join(logDirectory, 'app.log');

function log(message) {
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFile(logFile, logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}

module.exports = { log };