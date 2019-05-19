const CronJob = require('cron').CronJob;
const logger = require('../logger');
const { tempRef } = require('../firebaseRefs')
const getStatusPompa = require('../getStatusPompa')

const temperatureCron = new CronJob(`0 0 * * * *`, function () {
  getStatusPompa()
    .then(data => {
      tempRef.add({ ...data, createdAt: new Date() });
      logger.debug(`storing temp in db ${data.temperature}`);
    })
});

module.exports = temperatureCron;
