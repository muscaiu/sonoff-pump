const axios = require('axios');
const admin = require('firebase-admin');
var CronJob = require('cron').CronJob;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3001;
const app = express();
const router = express.Router();

const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');
const logDir = 'log';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const filename = path.join(logDir, 'log.log');
// const env = process.env.NODE_ENV || 'development';
const logger = createLogger({
  // change level if in dev environment versus production
  // level: env === 'development' ? 'debug' : 'info',
  level: 'debug',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.json()
  ),
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    new transports.File({ filename })
  ]
});


//stop relay imediatelly
axios.get('http://192.168.1.11/cm?cmnd=Power%20off')

//temperature command
//http://192.168.1.11/cm?cmnd=status%2010


var serviceAccount = require('../config/serviceAccount.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
var db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

var statusRef = db.collection('status');
var tempRef = db.collection('temp');
var modeRef = db.collection('mode');

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
        logger.info(`ignoreExistingModeEntries: ${ignoreExistingModeEntries}`);
      }
    });

    ignoreExistingModeEntries = false;
  });

statusRef
  .orderBy('createdAt', 'desc')
  .limit(1)
  .onSnapshot(querySnapshot => {
    let changes = querySnapshot.docChanges();

    //get status http://192.168.1.11/ay

    changes.forEach(change => {
      const changed = change.doc.data();
      if (!ignoreExistingStateEntries) {
        if (change.type === 'added') {
          if (changed.value) {
            axios.get('http://192.168.1.11/cm?cmnd=Power%20On')
            // relay.writeSync(0); //turn relay on
            logger.debug('db event triggered: pompa started');
          } else {
            axios.get('http://192.168.1.11/cm?cmnd=Power%20off')
            // relay.writeSync(1); //turn relay off
            logger.debug('db event triggered: pompa stopped');
          }
        }
      } else {
        logger.info(`initial status: ${changed.value}`);
        const initialStatus = changed.value;
        logger.info(`initial status: ${initialStatus}`)
        if (initialStatus) {
          axios.get('http://192.168.1.11/cm?cmnd=Power%20On')
          //http://sonoff/cm?cmnd=Power%20TOGGLE
          // relay.writeSync(0); //turn relay on
        } else {
          axios.get('http://192.168.1.11/cm?cmnd=Power%20off')
          // relay.writeSync(1); //turn relay off
        }
      }
    });
    ignoreExistingStateEntries = false;
  });

// seconds(0 - 59), minutes(0 - 59), hours(0 - 23), day of month(1 - 31), months0 - 11, day of week(0 - 6)

const customHour = 19;
const customMinute = 00;
logger.info(`mode: ${mode}`)
const startTime = new CronJob(`00 ${customMinute} ${customHour} * * *`, function () {
  if (mode === 'auto') {
    statusRef.add({
      value: true,
      createdAt: new Date()
    });
    logger.debug('pompa started by cron');
    axios.get('http://192.168.1.11/cm?cmnd=Power%20On')
    // relay.writeSync(0); //turn relay on
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
    // relay.writeSync(1); //turn relay off
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

async function getStatus() {
  try {
    let res = await axios({
      url: 'http://192.168.1.11/ay',
      method: 'get',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const parseStatus = res.data.split('px\'>')
    const status = parseStatus[1].split('</div')[0]
    const parseTemperatureHumidity = res.data.split('{m}')
    const temperature = parseInt(parseTemperatureHumidity[1].split('&')[0])
    const humidity = parseInt(parseTemperatureHumidity[2].split('%')[0])
    return ({
      status,
      temperature,
      humidity
    })
  }
  catch (err) {
    logger.err(err);
  }
}

router.get('/status', function (req, res) {
  getStatus()
    .then(data => res.json(data))
});

//Hourly Temp Humidity and Status
const tempCron = new CronJob(`00 * * * * *`, function () {
  getStatus()
    .then(data => {
      tempRef.add({ ...data, createdAt: new Date() });
    })
});

tempCron.start()
logger.info('temp cron started');



app.listen(port, function () {
  logger.info(`API running on port ${port}`);
});

app.use('/api', router);

process.on('SIGINT', () => {
  //on ctrl+c
  // relay.writeSync(0); // Turn relay off
  // relay.unexport(); // Unexport relay GPIO to free resources
  axios.get('hhttp://192.168.1.11/cm?cmnd=Power%20off')
  process.exit(); //exit completely
});
