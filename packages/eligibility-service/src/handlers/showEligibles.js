const {EligibleVoter} = require("../database/model");
const Config = require('../config');

const showEligibles = async (req, res) => {
    if (!Config.IsDebugMode) res.status(404)

    const users = await EligibleVoter.findAll();
    res.end(JSON.stringify(users, null, '/t'));
}


module.exports = {
    showEligibles
}
