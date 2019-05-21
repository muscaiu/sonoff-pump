const { startTime, stopTime } = require('./cron/startStopCron');
const { statusTrigger, modeTrigger } = require('./triggers');
const temperatureCron = require('./cron/temperatureCron');

function initialize() {
  //start timers
  startTime.start();
  stopTime.start();
  temperatureCron.start();

  //start triggers
  // setTimeout(() => {
    statusTrigger();
  // }, 50000);
  modeTrigger();
}

module.exports = initialize;
