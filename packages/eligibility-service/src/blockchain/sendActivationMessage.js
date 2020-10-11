const {BurstValue} = require("@burstjs/util")
const {getAccountIdFromPublicKey, generateMasterKeys, convertNumericIdToAddress} = require("@burstjs/crypto")
const {AttachmentMessage} = require('@burstjs/core')
const Config = require('../config')
const {logger} = require("../logger");
const {BurstApi} = require("./burstApi")

async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

async function sendActivationMessage({recipientPublicKey, activationPassphrase, votingOptions, votingPassphrase}) {
    logger.info(`Sending Activation Message to ${recipientPublicKey}`)

    const recipientId = getAccountIdFromPublicKey(recipientPublicKey);
    const senderKeys = generateMasterKeys(activationPassphrase);

    const votingAccKeys = generateMasterKeys(votingPassphrase);
    const votingAddress = getAccountIdFromPublicKey(votingAccKeys.publicKey);

    const activationMessage = {
        vopts: votingOptions,
        vaddrs: votingAddress
    }

    const attachment = new AttachmentMessage({
        messageIsText: true,
        message: JSON.stringify(activationMessage)
    })

    try{

    await BurstApi.transaction.sendAmountToSingleRecipient({
        amountPlanck: BurstValue.fromBurst(Config.VoterFundBurst).getPlanck(),
        // TODO: take advantage of dynamic fee slot calculation
        feePlanck: BurstValue.fromBurst(0.147).getPlanck(),
        senderPublicKey: senderKeys.publicKey,
        senderPrivateKey: senderKeys.signPrivateKey,
        recipientId,
        recipientPublicKey,
        attachment,
    });

    await sleep(1000) //transactions must be unique, so transaction from same address with same timestamp dont go to same block
    }catch(e){
        console.log(e)
    }
    logger.info(`Sent successfully to ${recipientPublicKey}`)
}

module.exports = {
    sendActivationMessage,
}
