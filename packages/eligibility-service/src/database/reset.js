const {EligibleVoter, Campaign, sequelize} = require("./model");
const {logger} = require('../logger')

async function reset() {
    logger.info('Removing entries')
    await Campaign.destroy({truncate: true})
    await EligibleVoter.destroy({truncate: true})
}

module.exports = {
    reset
}


