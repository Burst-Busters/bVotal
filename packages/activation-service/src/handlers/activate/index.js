const Boom = require('@hapi/boom')
const { activatorService } = require('./activatorService')
const { logger } = require('../../logger')

const index = async (req, res) => {
  const { account, publicKey } = req.body

  if (!account || !publicKey) {
    throw Boom.badRequest("'account' and 'publicKey' are required arguments")
  }

  logger.info(`Activating account [${account}]`)
  await activatorService.activate(account, publicKey)
}

module.exports = {
  activate: index
}
