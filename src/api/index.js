import 'dotenv/config';
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 3001;
const app = express();
const router = express.Router();
const initialize = require('./initialize');
const getStatusPompa = require('./getStatusPompa');
const logger = require('./logger');
const modeState = require('./modeState')
const config = require('./db');
const Mode = require('./mode');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Mongoose is connecterd') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

initialize();

router.get('/statuspompa', function (req, res) {
  getStatusPompa()
    .then(data => res.json(data))
    .catch(err => logger.warn(err))
});

router.post('/setmode').post(function (req, res) {
  console.log('req:', req.body)
  const mode = new Mode(req.body);
  mode.save()
    .then(response => {
      res.json('mode added successfully');
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
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
  axios.get('http://192.168.1.11/cm?cmnd=Power%20off')
  process.exit(); //exit completely
});
