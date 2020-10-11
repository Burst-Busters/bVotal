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

    static async #createRandomPassphrase() {
        const seed = crypto.randomBytes(256)
        const generator = new PassPhraseGenerator();
        const words = await generator.generatePassPhrase(Array.from(seed));
        return words.join(" ")
    }

    async #premine({passphrase, minimumElectionFund}) {
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

    async #initializeCampaignData({activationPassphrase, votingPassphrase}) {
        const {Database, Logger} = this._context
        await Database.open()
        await Database.reset()
        Logger.info(`Creating campaign data for: '${this._campaignName}'`)
        await Database.Campaign.create({
            name: this._campaignName,
            activationPassphrase,
            votingPassphrase,
            options: VotingOptions
        })
        Logger.info(`Loading eligible voters...`)
        await Database.EligibleVoter.bulkCreate(EligibleVoters, {individualHooks: true})
        const numberVoters = await Database.EligibleVoter.count();
        Logger.info(`Loaded ${numberVoters} eligible voters`)
        return numberVoters
    }

    async run() {
        const {Logger, Config} = this._context
        Logger.info(`Bootstrapping...`)
        const activationPassphrase = await Bootstrapper.#createRandomPassphrase()
        const votingPassphrase = await Bootstrapper.#createRandomPassphrase()
        const numberVoters = this.#initializeCampaignData({activationPassphrase, votingPassphrase})
        const minimumElectionFund = BurstValue.fromBurst(numberVoters * Config.VoterFundBurst);
        await this.#premine({passphrase: activationPassphrase, minimumElectionFund})
    }

    static async run({campaignName, context}) {
        const instance = new Bootstrapper({campaignName, context})
        await instance.run()
    }
}

module.exports = {
    Bootstrapper
}
