const { statusRef } = require('../firebaseRefs')
const logger = require('..logger');

// seconds(0 - 59), minutes(0 - 59), hours(0 - 23), day of month(1 - 31), months0 - 11, day of week(0 - 6)
const customHour = 21;
const customMinute = 37;

const startTime = new CronJob(`00 ${customMinute} ${customHour} * * *`, function () {
  if (mode === 'auto') {
    statusRef.add({
      value: true,
      createdAt: new Date()
    });
    // axios.get('http://192.168.1.11/cm?cmnd=Power%20On')
    logger.debug('pompa started by cron');
  } else {
    logger.warn('cant start auto because is currently in manual mode');
  }
});

module.exports = startTime;
