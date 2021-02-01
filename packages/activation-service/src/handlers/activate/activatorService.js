const { Config } = require('../../../config')
const { generateMasterKeys, getAccountIdFromPublicKey } = require('@burstjs/crypto')
const { convertAddressToNumericId, isBurstAddress } = require('@burstjs/util')
const { ApiSettings, AttachmentMessage, composeApi } = require('@burstjs/core')
const { BurstValue } = require('@burstjs/util')

const WelcomeMessage = 'bVotal Campaign Account created successfully'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = Config.IsDebugMode ? '0' : '1'

class ActivatorService {
  constructor () {
    this.burstApi = composeApi(new ApiSettings(Config.BurstNode))
  }

  __ensureAccountId (account) {
    return isBurstAddress(account) ? convertAddressToNumericId(account) : account
  }

  __validateAddressKeyPair (accountId, publicKey) {
    const verifiedAccountId = getAccountIdFromPublicKey(publicKey)
    if (verifiedAccountId !== accountId) {
      throw new Error('Account Id does not match Public Key')
    }
  }

  __getSenderCredentials () {
    const keys = generateMasterKeys(Config.ActivationAccountSeed)
    return {
      id: getAccountIdFromPublicKey(keys.publicKey),
      ...keys
    }
  }

  async __validatePendingActivation (recipientId) {
    const { id: senderId } = this.__getSenderCredentials()
    const { unconfirmedTransactions } = await this.burstApi.account.getUnconfirmedAccountTransactions(
      senderId,
      false
    )
    if (unconfirmedTransactions.some(({ recipient }) => recipient === recipientId)) {
      throw new Error('Activation is pending')
    }
  }

  async __validateAccount (accountId) {
    try {
      const { publicKey } = await this.burstApi.account.getAccount(accountId)
      if (publicKey) {
        throw new Error('The account is already active')
      }
    } catch (e) {
      if (!e.data) {
        throw e
      }
      const { errorDescription } = e.data
      if (errorDescription === 'Unknown account') {
        // ok, ignore this
      } else {
        throw e
      }
    }
  }

  async __sendWelcomeMessage (accountId, publicKey) {
    const { signPrivateKey, publicKey: senderPublicKey } = this.__getSenderCredentials()
    const suggestedFees = await this.burstApi.network.getSuggestedFees()
    const sendMessageArgs = {
      message: WelcomeMessage,
      recipientId: accountId,
      recipientPublicKey: publicKey,
      feePlanck: suggestedFees.standard + '',
      senderPrivateKey: signPrivateKey,
      senderPublicKey: senderPublicKey
    }
    await this.burstApi.message.sendMessage(sendMessageArgs)
  }

  async __sendWelcomeMessageWithAmount (accountId, publicKey, amountPlanck) {
    const { signPrivateKey, publicKey: senderPublicKey } = this.__getSenderCredentials()
    const suggestedFees = await this.burstApi.network.getSuggestedFees()
    const attachment = new AttachmentMessage({
      messageIsText: true,
      message: WelcomeMessage
    })

    const args = {
      amountPlanck,
      attachment,
      feePlanck: suggestedFees.standard + '',
      recipientId: accountId,
      recipientPublicKey: publicKey,
      senderPrivateKey: signPrivateKey,
      senderPublicKey: senderPublicKey
    }
    await this.burstApi.transaction.sendAmountToSingleRecipient(args)
  }

  async activate (account, publicKey) {
    const accountId = this.__ensureAccountId(account)
    this.__validateAddressKeyPair(accountId, publicKey)
    await this.__validateAccount(accountId)
    await this.__validatePendingActivation(accountId)
    if (Config.ActivationFundBurst === '0') {
      await this.__sendWelcomeMessage(accountId, publicKey)
    } else {
      const amountPlanck = BurstValue.fromBurst(Config.ActivationFundBurst).getPlanck()
      await this.__sendWelcomeMessageWithAmount(accountId, publicKey, amountPlanck)
    }
  }
}

module.exports = {
  activatorService: new ActivatorService()
}
