const CronJob = require('cron').CronJob;
const logger = require('../logger');
const { tempRef } = require('../firebaseRefs')
const getStatusPompa = require('../getStatusPompa')

const temperatureCron = new CronJob(`30 0 * * * *`, function () {
  getStatusPompa()
    .then(data => {
      try {
        tempRef
          .add({ ...data, createdAt: new Date() })
        logger.debug(`storing temp in db ${data.temperature}`);
      }
      catch (err) {
        logger.warn(err)
      }
    })
});

module.exports = temperatureCron;
