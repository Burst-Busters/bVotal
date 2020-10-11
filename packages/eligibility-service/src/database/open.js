const {ActivatedAccount, EligibleVoter, Campaign, sequelize} = require("./model");
const {logger} = require('../logger')

async function open() {
    logger.info('Opening Database')
    await sequelize.authenticate()
    await EligibleVoter.sync()
    await Campaign.sync()
    await ActivatedAccount.sync()
}

module.exports = {
    open
}


