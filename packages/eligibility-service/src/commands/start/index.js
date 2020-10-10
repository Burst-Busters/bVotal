const polka = require('polka')
const {middlewares} = require('../../middlewares')
const {register, showEligibles} = require('../../handlers')
const Database = require("../../database");
const Config = require("../../config");
const {logger} = require("../../logger");

const api = url => `api/${url}`;

const handleError = (fn) => async (req, res) => {
    try {
        return await fn(req, res)
    } catch (e) {
        const {output} = e
        res.end(JSON.stringify(output))
    }
}

async function start() {
    await Database.initialize({reset: Config.IsDebugMode})
    polka()
        .use(...middlewares)
        .post(api('register'), handleError(register))
        .get(api('showEligibles'), handleError(showEligibles))
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
