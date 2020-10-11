const {BurstValue} = require("@burstjs/util")
const {getAccountIdFromPublicKey, generateMasterKeys} = require("@burstjs/crypto")
const {AttachmentMessage} = require('@burstjs/core')
const Config = require('../config')
const {logger} = require("../logger");
const {BurstApi} = require("./burstApi")

async function sendActivationMessage({recipientPublicKey, activationPassphrase, votingOptions}) {
    logger.info(`Sending Activation Message to ${recipientPublicKey}`)

    const recipientId = getAccountIdFromPublicKey(recipientPublicKey);
    const senderKeys = generateMasterKeys(activationPassphrase);

    const attachment = new AttachmentMessage({
        messageIsText: true,
        message: JSON.stringify(votingOptions)
    })

    await BurstApi.transaction.sendAmountToSingleRecipient({
        amountPlanck: BurstValue.fromBurst(Config.VoterFundBurst).getPlanck(),
        // TODO: take advantage of dynamic fee slot calculation
        feePlanck: BurstValue.fromBurst(0.01).getPlanck(),
        senderPublicKey: senderKeys.publicKey,
        senderPrivateKey: senderKeys.signPrivateKey,
        recipientId,
        recipientPublicKey,
        attachment,
    });
    logger.info(`Sent successfully to ${recipientPublicKey}`)
}

module.exports = {
    sendActivationMessage,
}
