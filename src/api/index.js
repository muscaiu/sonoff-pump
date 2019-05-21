const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3001;
const app = express();
const router = express.Router();
const initialize = require('./initialize');
const getStatusPompa = require('./getStatusPompa');
const logger = require('./logger');

initialize();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

router.get('/statuspompa', function (req, res) {
  getStatusPompa()
    .then(data => res.json(data))
    .catch(err => logger.warn(err))
});

// router.get('/log', function (req, res) {
//   var fs = require('fs');
//   var logFile = fs.readFileSync('./log/log.json').toString().split("\n");
//   res.send(logFile)
// });

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
