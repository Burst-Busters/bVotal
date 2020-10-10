const polka = require('polka')
const {middlewares} = require('../../middlewares')
const {register, showEligibles} = require('../../handlers')
const Database = require("../../database");
const Config = require("../../config");
const {logger} = require("../../logger");

const api = url => `api/${url}`;

async function start() {
    await Database.initialize({reset: Config.IsDebugMode})
    polka()
        .use(...middlewares)
        .post(api('register'), register)
        .get(api('showEligibles'), showEligibles)
        .listen(Config.ServicePort, err => {
            if (err) {
                logger.error(err)
            } else {
                logger.info(`Listening to localhost: ${Config.ServicePort}`)
            }
        })
}

module.exports = {
    start
}
