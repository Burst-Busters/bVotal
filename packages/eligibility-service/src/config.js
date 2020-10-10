const {config: loadConfig} = require('dotenv')

loadConfig()

module.exports = {
    ServicePort: process.env.PORT || 3000,
    IsDebugMode: process.env.NODE_ENV === 'development',
    BurstNode: process.env.BURST_NODE,
    DatabasePath: process.env.DATABASE_PATH,
}
