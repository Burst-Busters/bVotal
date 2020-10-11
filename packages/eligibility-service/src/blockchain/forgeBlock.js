const {BurstService} = require('@burstjs/core')
const {logger} = require("../logger");
const Config = require('../config')

function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time || 1000);
    });
}

async function forgeBlock({secretPhrase}) {
    const service = new BurstService({nodeHost: Config.BurstNode});
    await service.send('submitNonce', {
        secretPhrase,
        nonce: 0
    })
    await sleep(500)
    logger.debug(`Forged a block successfully`)
}

module.exports = {
    forgeBlock
}
