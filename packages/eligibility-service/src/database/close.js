const {sequelize} = require("./model");
const {logger} = require('../logger')

async function close() {
    logger.info('Closing Database')
    await sequelize.close()
}

module.exports = {
    close
}


