const axios = require('axios');
const { statusRef } = require('./firebaseRefs')
const logger = require('./logger');

statusRef
  .orderBy('createdAt', 'desc')
  .limit(1)
  .onSnapshot(querySnapshot => {
    let changes = querySnapshot.docChanges();

    console.log('changes:', changes)

    changes.forEach(change => {
      const changed = change.doc.data();
      const initialStatus = changed.value;
      if (!ignoreExistingStateEntries) {
        if (change.type === 'added') {
          if (initialStatus) {
            axios.get('http://192.168.1.11/cm?cmnd=Power%20On')
            logger.debug('db event triggered: pompa started');
          } else {
            axios.get('http://192.168.1.11/cm?cmnd=Power%20off')
            logger.debug('db event triggered: pompa stopped');
          }
        }
      } else {
        const initialStatus = changed.value;
        logger.debug(`initialStatus: ${initialStatus}`);
        if (initialStatus) {
          axios.get('http://192.168.1.11/cm?cmnd=Power%20On')
          //http://sonoff/cm?cmnd=Power%20TOGGLE
        } else {
          axios.get('http://192.168.1.11/cm?cmnd=Power%20off')
        }
      }
    });
    ignoreExistingStateEntries = false;
  });