const axios = require('axios');

const logger = require('./logger');

async function getLivingStatus() {
  try {
    let res = await axios({
      url: 'http://192.168.1.12/ay',
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
    return ({
      status,
      temperature
    })
  }
  catch (err) {
    logger.err(err);
  }
}

module.exports = getLivingStatus;
