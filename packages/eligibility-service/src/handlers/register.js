const Boom = require('@hapi/boom')
const {sendActivationMessage} = require("../blockchain");
const {ActivatedAccount, EligibleVoter, Campaign} = require("../database");

const register = async (req, res) => {
    const {hash, pub : recipientPublicKey} = req.body;
    const voter = await EligibleVoter.findOne({where: {hash}});

    if (voter === null) {
        throw Boom.notFound('Not eligible')
    }

    if (voter.active) {
        throw Boom.badRequest('Registered already')
    }

    const activated = await ActivatedAccount.findOne({where: {hash: recipientPublicKey}}); //here we need to use hashing

    if (activated !== null) {
        throw Boom.badRequest('Account activated already')
    }

    const campaigns = await Campaign.findAll()

    if(!campaigns.length){
        throw Boom.notFound('No campaign found')
    }

    const {activationPassphrase, options, votingPassphrase} = campaigns[0].dataValues


    await sendActivationMessage({
        recipientPublicKey,
        activationPassphrase,
        votingOptions: JSON.parse(options),
        votingPassphrase
    })

    await ActivatedAccount.create({ hash: recipientPublicKey}); //here we need to use hashing
    await EligibleVoter.update({active: true}, {where: {hash}});

    res.end()
}

module.exports = {
    register
};

