const {BurstValue} = require("@burstjs/util")
const {getAccountIdFromPublicKey, generateMasterKeys} = require("@burstjs/crypto")
const {composeApi, AttachmentMessage} = require('@burstjs/core')
const Config = require('../config')

const BurstApi = composeApi({
    nodeHost: Config.BurstNode
});

async function sendActivationMessage({recipientPublicKey}) {
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
    sendActivationMessage
}
