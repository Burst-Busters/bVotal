const crypto = require('crypto')
const {BurstValue} = require("@burstjs/util");
const {
    PassPhraseGenerator,
    generateMasterKeys,
    getAccountIdFromPublicKey
} = require("@burstjs/crypto");

const {VotingOptions} = require("../../config")

const {EligibleVoters} = require("./mockedEligibleVoters");
const {getAccountBalance} = require('../../blockchain')

class Bootstrapper {
    constructor({campaignName, context}) {
        this._campaignName = campaignName;
        this._context = context
    }

    static async _createRandomPassphrase() {
        const seed = crypto.randomBytes(256)
        const generator = new PassPhraseGenerator();
        const words = await generator.generatePassPhrase(Array.from(seed));
        return words.join(" ")
    }

    async _premine({passphrase, minimumElectionFund}) {
        const {Logger} = this._context
        Logger.info(`Premining campaign fund...Goal: ${minimumElectionFund}`)
        const {publicKey} = generateMasterKeys(passphrase)
        const accountId = getAccountIdFromPublicKey(publicKey);
        let currentBalance = BurstValue.fromBurst(0)
        while (currentBalance.lessOrEqual(minimumElectionFund)) {
            await this._context.Blockchain.forgeBlock({secretPhrase: passphrase})
            const {balanceNQT} = await getAccountBalance(accountId);
            currentBalance = BurstValue.fromPlanck(balanceNQT);
            Logger.debug(`minted: ${currentBalance}`)
        }
    }

    async _initializeCampaignData({activationPassphrase, votingPassphrase}) {
        const {Database, Logger} = this._context
        await Database.open()
        await Database.reset()
        Logger.info(`Creating campaign data for: '${this._campaignName}'`)
        await Database.Campaign.create({
            name: this._campaignName,
            activationPassphrase,
            votingPassphrase,
            options: JSON.stringify(VotingOptions),
            active: true
        })
        Logger.info(`Loading eligible voters...`)
        await Database.EligibleVoter.bulkCreate(EligibleVoters, {individualHooks: true})
        const numberVoters = await Database.EligibleVoter.count();
        Logger.info(`Loaded ${numberVoters} eligible voters`)
        return numberVoters
    }

    async run() {
        const {Logger, Config} = this._context
        try {
            Logger.info(`Bootstrapping...`)
            const activationPassphrase = await Bootstrapper._createRandomPassphrase()
            const votingPassphrase = await Bootstrapper._createRandomPassphrase()
            const numberVoters = await this._initializeCampaignData({activationPassphrase, votingPassphrase})
            const neededFund = numberVoters * (parseFloat(Config.VoterFundBurst) + 0.147); //TODO, it is temp soliution
            const minimumElectionFund = BurstValue.fromBurst(neededFund)
            await this._premine({passphrase: activationPassphrase, minimumElectionFund})
        } catch (e) {
            Logger.error(`Bootstrapping failed: ${e}`)
            throw e
        }
    }

    static async run({campaignName, context}) {
        const instance = new Bootstrapper({campaignName, context})
        await instance.run()
    }
}

module.exports = {
    Bootstrapper
}
