const {BurstValue} = require("@burstjs/util")
const {getAccountIdFromPublicKey, generateMasterKeys, convertNumericIdToAddress} = require("@burstjs/crypto")
const {AttachmentMessage} = require('@burstjs/core')
const Config = require('../config')
const {logger} = require("../logger");
const {BurstApi} = require("./burstApi")

async function sendActivationMessage({recipientPublicKey, activationPassphrase, votingOptions, votingPassphrase}) {
    logger.info(`Sending Activation Message to ${recipientPublicKey}`)

    const recipientId = getAccountIdFromPublicKey(recipientPublicKey);
    const senderKeys = generateMasterKeys(activationPassphrase);

    const votingAccKeys = generateMasterKeys(votingPassphrase);
    const votingAddress = convertNumericIdToAddress(getAccountIdFromPublicKey(votingAccKeys.publicKey));

    const attachment = new AttachmentMessage({
        messageIsText: true,
        message: JSON.stringify(votingOptions.push({ votingAddress: votingAddress })) //I am not sure about this
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
