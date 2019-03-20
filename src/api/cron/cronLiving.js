const CronJob = require('cron').CronJob;

const { livingTempRef } = require('../firebaseRefs')
const getStatusLiving = require('../getStatusLiving')

//Hourly Temp Humidity and Status
const cronLiving = new CronJob(`0 0 * * * *`, function () {
  getStatusLiving()
    .then(data => {
      livingTempRef.add({ ...data, createdAt: new Date() });
    })
});

module.exports = cronLiving;
