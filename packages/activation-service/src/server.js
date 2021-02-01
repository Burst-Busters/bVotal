const polka = require('polka')
const { middlewares } = require('./middlewares')
const { onShutdown } = require('node-graceful-shutdown')
const { logger } = require('./logger')
const { Config } = require('../config')
const { activate, status } = require('./handlers')

const handleError = (fn) => async (req, res) => {
  try {
    return await fn(req, res)
  } catch (e) {
    let message = e.message
    res.statusCode = 500
    if (e.isBoom) {
      const { output } = e
      message = JSON.stringify(output)
      res.statusCode = output.statusCode
    }
    logger.error(message)
    res.end(message)
  }
}

const api = url => `api/${url}`

const httpServer = polka()
  .use(...middlewares)
  .get(api('status'), handleError(status))
  .post(api('activate'), handleError(activate))

onShutdown('service', httpServer.close)

async function start () {
  try {
    httpServer.listen(Config.ServicePort, err => {
      if (err) {
        logger.error(err)
      } else {
        logger.info(`Listening to localhost: ${Config.ServicePort}`)
      }
    })
  } catch (e) {
    logger.error(`Could not start service: ${e}`)
    process.exit(-1)
  }
}

module.exports = {
  start
}
