const axios = require('axios');
var CronJob = require('cron').CronJob;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3001;
const app = express();
const router = express.Router();

const getStatus = require('./getStatus');
const logger = require('./logger');
const {
  statusRef,
  modeRef
} = require('./firebaseRefs')

//stop sonoff imediatelly
axios.get('http://192.168.1.11/cm?cmnd=Power%20off')



const tempCron = require('./cron/tempCron');
tempCron.start()
logger.info('temp cron started');


let ignoreExistingStateEntries = true;
let ignoreExistingModeEntries = true;
let mode = 'unititialized';

modeRef
  .orderBy('createdAt', 'desc')
  .limit(1)
  .onSnapshot(querySnapshot => {
    let changes = querySnapshot.docChanges();

    changes.forEach(change => {
      const changed = change.doc.data();
      if (!ignoreExistingStateEntries) {
        if (change.type === 'added') {
          if (changed.value === 'auto') {
            mode = 'auto';
            logger.debug('db mode set to auto');
          } else {
            mode = 'manual';
            logger.debug('db mode set to manual');
          }
        }
      } else {
        mode = changed.value;
        logger.info(`initial mode:  ${changed.value}`);
        // logger.info(`ignoreExistingModeEntries: ${ignoreExistingModeEntries}`);
      }
    });

    ignoreExistingModeEntries = false;
  });

statusRef
  .orderBy('createdAt', 'desc')
  .limit(1)
  .onSnapshot(querySnapshot => {
    let changes = querySnapshot.docChanges();

    changes.forEach(change => {
      const changed = change.doc.data();
      if (!ignoreExistingStateEntries) {
        if (change.type === 'added') {
          if (changed.value) {
            axios.get('http://192.168.1.11/cm?cmnd=Power%20On')
            logger.debug('db event triggered: pompa started');
          } else {
            axios.get('http://192.168.1.11/cm?cmnd=Power%20off')
            logger.debug('db event triggered: pompa stopped');
          }
        }
      } else {
        const initialStatus = changed.value;
        logger.info(`initial status: ${initialStatus}`)
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



// seconds(0 - 59), minutes(0 - 59), hours(0 - 23), day of month(1 - 31), months0 - 11, day of week(0 - 6)
const customHour = 19;
const customMinute = 00;

const startTime = new CronJob(`00 ${customMinute} ${customHour} * * *`, function () {
  if (mode === 'auto') {
    statusRef.add({
      value: true,
      createdAt: new Date()
    });
    axios.get('http://192.168.1.11/cm?cmnd=Power%20On')
    logger.debug('pompa started by cron');
  } else {
    logger.warn('cant start auto because is currently in manual mode');
  }
});
const stopTime = new CronJob(`00 ${customMinute} ${customHour + 1} * * *`, function () {
  if (mode === 'auto') {
    statusRef.add({
      value: false,
      createdAt: new Date()
    });
    axios.get('http://192.168.1.11/cm?cmnd=Power%20off')
    logger.debug('pompa stopped by cron');
  } else {
    logger.warn('cant stop auto because is currently in manual mode');
  }
});

logger.info(`mode: ${mode}`)
startTime.start();
stopTime.start();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

router.get('/status', function (req, res) {
  getStatus()
    .then(data => res.json(data))
});



app.listen(port, function () {
  logger.info(`API running on port ${port}`);
});

app.use('/api', router);

process.on('SIGINT', () => {
  //on ctrl+c
  // relay.unexport(); // Unexport relay GPIO to free resources
  axios.get('hhttp://192.168.1.11/cm?cmnd=Power%20off')
  process.exit(); //exit completely
});
