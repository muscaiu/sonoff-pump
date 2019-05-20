const { startTime, stopTime } = require('./cron/startStopCron');
const { statusTrigger, modeTrigger } = require('./triggers');
const temperatureCron = require('./cron/temperatureCron');

function initialize() {
  //start timers
  startTime.start();
  stopTime.start();
  temperatureCron.start();

  //start triggers
  statusTrigger();
  modeTrigger();
}

module.exports = initialize;
