const CronJob = require('cron').CronJob;
const { statusRef } = require('../firebaseRefs')
const logger = require('../logger');
const modeState = require('../modeState')

function addRecord(option) {
  const setValue = () => {
    if (option === 'start') return true
    if (option === 'stop') return false
  }
  if (modeState.getMode === 'auto') {
    try {
      statusRef
        .add({ value: setValue(), createdAt: new Date() })
      logger.debug(`pompa ${option}ed by cron`);
    }
    catch (err) {
      logger.warn(err)
    }
  } else {
    logger.warn(`cant ${option} auto because is currently in manual mode`);
  }
}

// seconds(0 - 59), minutes(0 - 59), hours(0 - 23), day of month(1 - 31), months0 - 11, day of week(0 - 6)
const hourStart = '9';
const hourStop = '9';
const minuteStart = '0';
const minuteStop = '30';

const startTime = new CronJob(`5 ${minuteStart} ${hourStart} * * *`, function () {
  logger.warn(`start minute ${minuteStart} hour ${hourStart}`);
  addRecord('start');
});
const stopTime = new CronJob(`10 ${minuteStop} ${hourStop} * * *`, function () {
  logger.warn(`stop minute ${minuteStop} hour ${hourStop}`);
  addRecord('stop');
});

module.exports = { startTime, stopTime };