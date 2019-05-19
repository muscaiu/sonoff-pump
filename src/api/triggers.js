const axios = require('axios');
const { statusRef, modeRef } = require('./firebaseRefs')
const logger = require('./logger');
const modeState = require('./modeState')

function statusTrigger() {
  statusRef
    .orderBy('createdAt', 'desc')
    .limit(1)
    .onSnapshot(querySnapshot => {
      let changes = querySnapshot.docChanges();

      changes.forEach(change => {
        const changed = change.doc.data();
        if (changed.value) {
          axios.get('http://192.168.1.11/cm?cmnd=Power%20On')
          logger.debug('db event triggered: pompa started');
        } else {
          axios.get('http://192.168.1.11/cm?cmnd=Power%20off')
          logger.debug('db event triggered: pompa stopped');
        }
      });
    });
}

function modeTrigger() {
  modeRef
    .orderBy('createdAt', 'desc')
    .limit(1)
    .onSnapshot(querySnapshot => {
      let changes = querySnapshot.docChanges();

      changes.forEach(change => {
        const changed = change.doc.data();
        if (changed.value === 'auto') {
          modeState.setMode = 'auto';
          logger.debug('db mode set to auto');
        } else {
          modeState.setMode = 'manual';
          logger.debug('db mode set to manual');
        }
      });
    });
}

module.exports = { statusTrigger, modeTrigger };
