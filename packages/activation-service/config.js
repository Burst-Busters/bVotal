const {config: loadConfig} = require("dotenv")

loadConfig()

const Config = {
    ServicePort: process.env.PORT || 3000,
    IsDebugMode: process.env.NODE_ENV === 'development',
    BurstNode: process.env.BURST_NODE,
    ActivationFundBurst: process.env.ACTIVATION_FUND_BURST,
}

module.exports = {
    Config
}
