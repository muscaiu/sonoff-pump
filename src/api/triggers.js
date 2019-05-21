const axios = require('axios');
const { statusRef, modeRef } = require('./firebaseRefs')
const logger = require('./logger');
const modeState = require('./modeState')

function statusTrigger() {
  // fb is not fetching the correct last dbitem so this is needed
  let ignoreFirstStatusHack = true;

  statusRef
    .orderBy('createdAt', 'desc')
    .limit(1)
    .onSnapshot(statusSnapshot => {
      let changes = statusSnapshot.docChanges();
      const lastStatus = changes[0].doc.data().value;

      logger.debug(`lastStatus: ${lastStatus}`)
      // so first time is ok
      if (ignoreFirstStatusHack) {
        if (lastStatus === true) {
          axios.get('http://192.168.1.11/cm?cmnd=Power%20On')
          logger.debug('db event triggered: pompa started');
        } else if (lastStatus === false) {
          axios.get('http://192.168.1.11/cm?cmnd=Power%20off')
          logger.debug('db event triggered: pompa stopped');
        }
        ignoreFirstStatusHack = false;
      } else { // then it's wrong so i need the hack
        if (lastStatus === false) {
          axios.get('http://192.168.1.11/cm?cmnd=Power%20On')
          logger.debug('db event triggered: pompa started');
        } else if (lastStatus === true) {
          axios.get('http://192.168.1.11/cm?cmnd=Power%20off')
          logger.debug('db event triggered: pompa stopped');
        }
      }
    });
}

function modeTrigger() {
  modeRef
    .orderBy('createdAt', 'desc')
    .limit(1)
    .onSnapshot(modeSnapshot => {
      let changes = modeSnapshot.docChanges();
      const lastMode = changes[0].doc.data().value;

      logger.debug(`lastMode: ${lastMode}`)

      modeState.setMode = lastMode;
      logger.debug(`db mode set to ${lastMode}`);

    });
}

module.exports = { statusTrigger, modeTrigger };
