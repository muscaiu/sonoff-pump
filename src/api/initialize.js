const logger = require('./logger');
const { startTime, stopTime } = require('./cron/startStopCron');
const { statusTrigger, modeTrigger } = require('./triggers');
const temperatureCron = require('./cron/temperatureCron');

function initialize() {
  //start timers
  startTime.start();
  stopTime.start();
  // logger.warn('without start stop cron')
  temperatureCron.start();
  //start triggers
  statusTrigger();
  modeTrigger();
}

module.exports = initialize;
