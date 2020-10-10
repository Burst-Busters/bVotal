const pino = require('pino')
const {IsDebugMode} = require('../config')

const options = IsDebugMode
    ? {
        prettyPrint: {
            colorize: true,
            translateTime: true
        },
        level: 'debug',
    }
    : {
        prettyPrint: false,
        level: 'error'
    }

const
    logger = pino(options)

module.exports = {
    logger
}
