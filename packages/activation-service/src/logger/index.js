const pino = require('pino')
const {name} = require('../../package.json')
const {Config} = require('../../config')

const options = Config.IsDebugMode
    ? {
        name,
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

const logger = pino(options)

module.exports = {
    logger
}
