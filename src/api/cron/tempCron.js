const CronJob = require('cron').CronJob;

const { tempRef } = require('../firebaseRefs')
const getStatus = require('../getStatus')

//Hourly Temp Humidity and Status
const tempCron = new CronJob(`00 00 * * * *`, function () {
  getStatus()
    .then(data => {
      tempRef.add({ ...data, createdAt: new Date() });
    })
});

module.exports = tempCron;
