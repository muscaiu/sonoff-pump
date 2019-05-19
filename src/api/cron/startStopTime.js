const CronJob = require('cron').CronJob;
const { statusRef } = require('../firebaseRefs')
const logger = require('../logger');
const modeState = require('../modeState')

function addRecord(option) {
  if (modeState.getMode === 'auto') {
    if (option === 'start') {
      statusRef.add({
        value: true,
        createdAt: new Date()
      });
      logger.debug(`pompa ${option}ed by cron`);
    } else if (option === 'stop') {
      statusRef.add({
        value: false,
        createdAt: new Date()
      });
      logger.debug(`pompa ${option}ed by cron`);
    }
  } else {
    logger.warn(`cant ${option} auto because is currently in manual mode`);
  }
}

// seconds(0 - 59), minutes(0 - 59), hours(0 - 23), day of month(1 - 31), months0 - 11, day of week(0 - 6)
const customHourStart = '19';
const customHourStop = '20';
const customMinute = '00';

const startTime = new CronJob(`0 ${customMinute} ${customHourStart} * * *`, function () {
  logger.warn(`start minute ${customMinute} hour ${customHourStart}`);
  addRecord('start');
});
const stopTime = new CronJob(`0 ${customMinute} ${customHourStop} * * *`, function () {
  logger.warn(`stop minute ${customMinute} hour ${customHourStop}`);
  addRecord('stop');
});

module.exports = { startTime, stopTime };
