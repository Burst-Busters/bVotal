const Config = require("../../config");
const {logger} = require("../../logger");
const Blockchain = require("../../blockchain")

const isLocalHost = url => {
    const host = new URL(url).host.toLowerCase()
    return host.includes('0.0.0.0') || host.includes('localhost')
}

async function forgeBlock({secretPhrase}) {
    try {
        logger.info('Forging a block')
        if(!(Config.IsDebugMode && isLocalHost(Config.BurstNode))){
            throw new Error('Only supported in for development')
        }
        await Blockchain.forgeBlock({secretPhrase})
    } catch (e) {
        logger.error(e)
        process.exit(-1)
    }
}

module.exports = {
    forgeBlock
}
