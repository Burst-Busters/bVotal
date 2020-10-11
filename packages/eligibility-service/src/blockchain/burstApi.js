const Config = require('../config')
const {composeApi, ApiSettings} = require('@burstjs/core')

const BurstApi = composeApi(new ApiSettings(Config.BurstNode))

module.exports = {
    BurstApi
}
