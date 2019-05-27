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
    statusRef
      .add({ value: setValue(), createdAt: new Date() })
      .then(ref => logger.debug(`added new status record ${ref.id}`))
  } else {
    logger.warn(`cant ${option} auto because is currently in manual mode`);
  }
}

// seconds(0 - 59), minutes(0 - 59), hours(0 - 23), day of month(1 - 31), months0 - 11, day of week(0 - 6)
const hourStart = '15';
const hourStop = '16';
const minuteStart = '35';
const minuteStop = '35';

const startTime = new CronJob(`0 ${minuteStart} ${hourStart} * * *`, function () {
  addRecord('start');
});
const stopTime = new CronJob(`0 ${minuteStop} ${hourStop} * * *`, function () {
  addRecord('stop');
});

module.exports = { startTime, stopTime };
