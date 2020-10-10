const {VotingOptions} = require('./votingOptions')
const {config: loadConfig} = require('dotenv')

loadConfig()

module.exports = {
    ServicePort: process.env.PORT || 3000,
    IsDebugMode: process.env.NODE_ENV === 'development',
    DatabasePath: process.env.DATABASE_PATH,
    BurstNode: process.env.BURST_NODE,
    AuthorityPassphrase: process.env.AUTHORITY_PASSPHRASE,
    SendFeeBurst: process.env.SEND_FEE_BURST,
    VoterAmountBurst: process.env.VOTER_AMOUNT_BURST,
    VotingOptions,
}
