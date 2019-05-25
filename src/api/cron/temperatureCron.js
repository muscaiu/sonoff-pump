const CronJob = require('cron').CronJob;
const logger = require('../logger');
const { tempRef } = require('../firebaseRefs')
const getStatusPompa = require('../getStatusPompa')

const temperatureCron = new CronJob(`30 0 * * * *`, function () {
  getStatusPompa()
    .then(data => {
      tempRef
        .add({ ...data, createdAt: new Date() })
        .then(ref => logger.debug(`added new temp record ${ref.id}`))
    })
});

module.exports = temperatureCron;
