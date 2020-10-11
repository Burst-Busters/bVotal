const {BurstApi} = require("./burstApi");
const {sendActivationMessage} = require("./sendActivationMessage");
const {forgeBlock} = require("./forgeBlock");

module.exports = {
    forgeBlock,
    getAccountBalance: BurstApi.account.getAccountBalance,
    sendActivationMessage
}
