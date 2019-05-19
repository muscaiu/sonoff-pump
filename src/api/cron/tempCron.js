const CronJob = require('cron').CronJob;

const logger = require('../logger');
const { tempRef } = require('../firebaseRefs')
const getStatusPompa = require('../getStatusPompa')

//Hourly Temp Humidity and Status
// const cronPompa = new CronJob(`0 01 * * * *`, function () {
const cronPompa = new CronJob(`* * * * *`, function () {
  getStatusPompa()
    .then(data => {
      tempRef.add({ ...data, createdAt: new Date() });
      logger.debug(`storing temp in db ${data.temperature}`);
    })
});

module.exports = cronPompa;
