const crypto = require('crypto')
const {BurstService} = require("@burstjs/core");
const {BurstValue} = require("@burstjs/util");
const {
    PassPhraseGenerator,
    generateMasterKeys,
    getAccountIdFromPublicKey
} = require("@burstjs/crypto");

const Config = require('../../config');
const {getAccountBalance} = require('../../blockchain')

const sleep = time => new Promise((resolve) => {
    setTimeout(resolve, time || 1000);
});

class Bootstrapper {
    constructor({campaignName, targetBalance}) {
        this._campaignName = campaignName;
        this._targetBalance = BurstValue.fromBurst(targetBalance)
    }

    async #createRandomAccount() {
        const seed = crypto.randomBytes(64)
        const generator = new PassPhraseGenerator();
        const words = await generator.generatePassPhrase(Array.from(seed));
        this._passphrase = words.join(" ")
        const keys = generateMasterKeys(this._passphrase);
        this._publicKey = keys.publicKey;
        this._accountID = getAccountIdFromPublicKey(keys.publicKey);
    }

    async #premine() {
        let currentBalance = BurstValue.fromBurst(0)
        while (currentBalance.lessOrEqual(this._targetBalance)) {
            await this.forgeBlock()
            currentBalance = await this.getBalanceBurst()
        }
    }

    static async run({campaignName, targetBalance}) {
        const instance = new Bootstrapper({campaignName, targetBalance})
        await instance.#createRandomAccount()
        // await instance.#premine({targetBalance})
        return instance;
    }

    forgeBlock = async () => {
        let burstService = new BurstService({nodeHost: Config.BurstNode});
        await burstService.send('submitNonce', {
            secretPhrase: this.passphrase,
            nonce: 0
        })

        await sleep(500)
    }

    getBalanceBurst = async () => {
        const {balanceNQT} = await getAccountBalance(this.accountId);
        return BurstValue.fromPlanck(balanceNQT);
    }

    get passphrase() {
        return this._passphrase
    }

    get campaignName() {
        return this._campaignName;
    }

    get accountId() {
        return getAccountIdFromPublicKey(this.publicKey)
    }

    get publicKey() {
        const keys = generateMasterKeys(this._passphrase);
        return keys.publicKey;
    }
}

module.exports = {
    Bootstrapper
}
