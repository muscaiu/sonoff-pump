const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');
const logDir = 'log';
const filename = path.join(logDir, 'log.log');

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = createLogger({
  // change level if in dev environment versus production
  // level: env === 'development' ? 'debug' : 'info',
  level: 'debug',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.json()
  ),
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    new transports.File({ filename })
  ]
});

module.exports = logger;
