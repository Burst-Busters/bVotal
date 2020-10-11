const polka = require('polka')
const {onShutdown} = require('node-graceful-shutdown')
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
        let message = e.message
        res.statusCode = 500
        if(e.isBoom){
            const {output} = e
            message = JSON.stringify(output)
            res.statusCode = output.statusCode
        }
        logger.error(message)
        res.end(message)
    }
}

const httpServer = polka()
    .use(...middlewares)
    .post(api('register'), handleError(register))
    .get(api('showEligibles'), handleError(showEligibles))

onShutdown("service", async function () {
    await httpServer.close()
    await Database.close()
});

async function start() {
    try {
        await Database.open()
        httpServer.listen(Config.ServicePort, err => {
            if (err) {
                logger.error(err)
            } else {
                logger.info(`Listening to localhost: ${Config.ServicePort}`)
            }
        })
    } catch (e) {
        logger.error(`Could not start service: ${e}`)
        process.exit(-1)
    }
}

module.exports = {
    start
}
