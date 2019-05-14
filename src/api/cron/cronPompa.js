const CronJob = require('cron').CronJob;

const logger = require('../logger');
const { tempRef } = require('../firebaseRefs')
const getStatusPompa = require('../getStatusPompa')

//Hourly Temp Humidity and Status
const cronPompa = new CronJob(`0 0 * * * *`, function () {
  getStatusPompa()
    .then(data => {
      tempRef.add({ ...data, createdAt: new Date() });
      logger.debug(`getStatusPompa data: ${data}`);
    })
});

module.exports = cronPompa;
