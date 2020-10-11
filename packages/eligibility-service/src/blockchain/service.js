const {BurstValue} = require("@burstjs/util")
const {getAccountIdFromPublicKey, generateMasterKeys} = require("@burstjs/crypto")
const {composeApi, AttachmentMessage, ApiSettings, BurstService} = require('@burstjs/core')
const Config = require('../config')
const {logger} = require("../logger");

const Api = composeApi(new ApiSettings(Config.BurstNode))
const Service = new BurstService({nodeHost: Config.BurstNode});

function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time || 1000);
    });
}


async function sendActivationMessage({recipientPublicKey}) {
    logger.debug(`Sending Activation Message to ${recipientPublicKey}`)

    const recipientId = getAccountIdFromPublicKey(recipientPublicKey);
    const senderKeys = generateMasterKeys(Config.AuthorityPassphrase);

    const attachment = new AttachmentMessage({
        messageIsText: true,
        message: JSON.stringify(Config.VotingOptions)
    })

    await Api.transaction.sendAmountToSingleRecipient({
        amountPlanck: BurstValue.fromBurst(Config.VoterAmountBurst).getPlanck(),
        feePlanck: BurstValue.fromBurst(Config.SendFeeBurst).getPlanck(),
        senderPublicKey: senderKeys.publicKey,
        senderPrivateKey: senderKeys.signPrivateKey,
        recipientId,
        recipientPublicKey,
        attachment,
    });
}

async function forgeBlock({secretPhrase}) {
    await Service.send('submitNonce', {
        secretPhrase,
        nonce: 0
    })
    await sleep(500)
    logger.debug(`Forged a block successfully`)
}


module.exports = {
    forgeBlock,
    sendActivationMessage,
    getAccountBalance: Api.account.getAccountBalance
}
