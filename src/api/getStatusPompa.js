const axios = require('axios');

const logger = require('./logger');

async function getStatusPompa() {
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
    logger.debug(status);
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

module.exports = getStatusPompa;
