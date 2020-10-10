const {BurstValue} = require("@burstjs/util")
const {getAccountIdFromPublicKey, generateMasterKeys} = require("@burstjs/crypto")
const {composeApi, AttachmentMessage, ApiSettings} = require('@burstjs/core')
const Config = require('../config')
const {logger} = require("../logger");

const BurstApi = composeApi(new ApiSettings(Config.BurstNode))

async function sendActivationMessage({recipientPublicKey}) {
    logger.debug(`Sending Activation Message to ${recipientPublicKey}`)

    const recipientId = getAccountIdFromPublicKey(recipientPublicKey);
    const senderKeys = generateMasterKeys(Config.AuthorityPassphrase);

    const attachment = new AttachmentMessage({
        messageIsText: true,
        message: JSON.stringify(Config.VotingOptions)
    })

    await BurstApi.transaction.sendAmountToSingleRecipient({
        amountPlanck: BurstValue.fromBurst(Config.VoterAmountBurst).getPlanck(),
        feePlanck: BurstValue.fromBurst(Config.SendFeeBurst).getPlanck(),
        senderPublicKey: senderKeys.publicKey,
        senderPrivateKey: senderKeys.signPrivateKey,
        recipientId,
        recipientPublicKey,
        attachment,
    });
}


module.exports = {
    sendActivationMessage,
    getAccountBalance: BurstApi.account.getAccountBalance
}
