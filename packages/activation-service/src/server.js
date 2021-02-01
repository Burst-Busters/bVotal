const polka = require('polka')
const Boom = require('@hapi/boom')
const { middlewares } = require('./middlewares')
const { onShutdown } = require('node-graceful-shutdown')
const { logger } = require('./logger')
const { Config } = require('../config')
const { activate, status } = require('./handlers')

const handleError = (fn) => async (req, res) => {
  try {
    return await fn(req, res)
  } catch (e) {
    const error = e.isBoom ? e : Boom.boomify(e)
    error.output.payload.message = e.message
    res.statusCode = error.output.statusCode
    logger.error(error)
    res.end(JSON.stringify(error.output.payload))
  }
}

const api = url => `api/${url}`

const app = polka()
  .use(...middlewares)
  .get(api('status'), handleError(status))
  .post(api('activate'), handleError(activate))

onShutdown('service', async () => {
  try {
    logger.info('Shutting down...')
    // shut down whatever you need
  } catch (e) {
    logger.error(e)
  }
})

async function start () {
  try {
    app.listen(Config.ServicePort, err => {
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
