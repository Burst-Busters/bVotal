const {EligibleVoter, Campaign, sequelize} = require("./model");
const {logger} = require('../logger')

async function open() {
    logger.info('Opening Database')
    await sequelize.authenticate()
    await EligibleVoter.sync()
    await Campaign.sync()
}

module.exports = {
    open
}


