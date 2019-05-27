const axios = require('axios');
const { statusRef, modeRef } = require('./firebaseRefs')
const logger = require('./logger');
const modeState = require('./modeState')

function statusTrigger() {
  statusRef
    .orderBy('createdAt', 'desc')
    .limit(1)
    .onSnapshot(statusSnapshot => {
      let changes = statusSnapshot.docChanges();

      changes.forEach(change => {
        const lastStatus = change.doc.data().value;
        if (lastStatus === true) {
          axios.get('http://192.168.1.11/cm?cmnd=Power%20On')
          logger.debug('db event triggered: pompa started');
        } else if (lastStatus === false) {
          axios.get('http://192.168.1.11/cm?cmnd=Power%20off')
          logger.debug('db event triggered: pompa stopped');
        }
      });
    }, error => {
      logger.warn(error);
    })
}

function modeTrigger() {
  modeRef
    .orderBy('createdAt', 'desc')
    .limit(1)
    .onSnapshot(statusSnapshot => {
      let changes = statusSnapshot.docChanges();

      changes.forEach(change => {
        const lastMode = change.doc.data().value;
        modeState.setMode = lastMode;
        logger.debug(`db mode set to ${lastMode}`);
      });
    }, error => {
      logger.warn(error);
    })
}

module.exports = { statusTrigger, modeTrigger };
