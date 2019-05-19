const { startTime, stopTime } = require('./cron/startStopTime');
const temperatureCron = require('./cron/temperatureCron');
const { statusTrigger, modeTrigger } = require('./triggers');

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
