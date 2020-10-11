const Boom = require("@hapi/boom");
const {EligibleVoter} = require("../database/model");
const Config = require('../config');

const showEligibles = async (req, res) => {
    try {
        if (!Config.IsDebugMode) {
            throw Boom.unauthorized('Must run in local dev mode')
        }
        const users = await EligibleVoter.findAll();
        res.end(JSON.stringify(users, null, '/t'));
    } catch (e) {
        if(e.isBoom){
            throw e
        }
        throw Boom.internal(e)
    }
}


module.exports = {
    showEligibles
}
