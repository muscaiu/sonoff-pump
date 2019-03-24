const axios = require('axios');
var CronJob = require('cron').CronJob;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3001;
const app = express();
const router = express.Router();

const getStatusPompa = require('./getStatusPompa');
// const getStatusLiving = require('./getStatusLiving');
const logger = require('./logger');
const { statusRef, modeRef } = require('./firebaseRefs')
const cronPompa = require('./cron/cronPompa');
// const cronLiving = require('./cron/cronLiving');

//stop sonof imediatelly
axios.get('http://192.168.1.11/cm?cmnd=Power%20off')
// axios.get('http://192.168.1.12/cm?cmnd=Power%20off')

//start crons
cronPompa.start()
// cronLiving.start()

let ignoreExistingStateEntries = true;
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
const customMinute = 0;

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

startTime.start();
stopTime.start();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

router.get('/statuspompa', function (req, res) {
  getStatusPompa()
    .then(data => res.json(data))
});

// router.get('/statusliving', function (req, res) {
//   getStatusLiving()
//     .then(data => res.json(data))
// });

router.get('/log', function (req, res) {
  var fs = require('fs');
  var logFile = fs.readFileSync('./log/log.json').toString().split("\n");
  res.send(logFile)
});


//TODO: temporary solution for the HA project
router.get('/toggleliving', function (req, res) {
  axios.get('http://192.168.1.12/cm?cmnd=Power%20TOGGLE');
  res.send({})
});
router.get('/statusliving', function (req, res) {
  //circularJSON to prevent err: Converting circular structure to JSON 
  const CircularJSON = require('circular-json');
  axios.get('http://192.168.1.12/cm?cmnd=Status')
    .then((response) => {
      let json = CircularJSON.stringify(response);
      res.send(json);
    }).catch((error) => {
      console.log(error);
    });
});


app.listen(port, function () {
  logger.info(`*** API running on port ${port} ***`);
});

app.use('/api', router);

process.on('SIGINT', () => {
  //on ctrl+c
  // relay.unexport(); // Unexport relay GPIO to free resources
  axios.get('hhttp://192.168.1.11/cm?cmnd=Power%20off')
  process.exit(); //exit completely
});
