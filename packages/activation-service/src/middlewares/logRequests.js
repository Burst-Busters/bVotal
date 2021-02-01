const { logger } = require('../logger')

const logRequests = () => (req, res, next) => {
  logger.debug(`Requested: ${req.method} on ${req.url}`)
  next()
}

module.exports = {
  logRequests
}
