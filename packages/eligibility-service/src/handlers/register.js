const Boom = require('@hapi/boom')
const {sendActivationMessage} = require("../blockchain");
const {ActivatedAccount, EligibleVoter, Campaign} = require("../database");
const Config = require("../config")

const register = async (req, res) => {
    const {hash, pub : recipientPublicKey} = req.body;
    const voter = await EligibleVoter.findOne({where: {hash}});

    if (voter === null) {
        throw Boom.notFound('Not eligible')
    }

    if (voter.active) {
        throw Boom.badRequest('Registered already')
    }

    await EligibleVoter.update({active: true}, {where: {hash}});

    const campaigns = await Campaign.findAll({
        attributes: ['activationPassphrase']
    })

    if(!campaigns.length){
        throw Boom.notFound('No campaign found')
    }

    const {activationPassphrase} = campaigns[0]

    // TODO: voting options are part of campaign --> bootstrapper needs to create'em
    const votingOptions = Config.VotingOptions

    const activated = await ActivatedAccount.findOne({where: {recipientPublicKey}}); //here we need to use hashing

    if (activated !== null) {
        throw Boom.badRequest('Account activated already')
    }

    await ActivatedAccount.create({ hash: recipientPublicKey}); //here we need to use hashing

    await sendActivationMessage({
        recipientPublicKey,
        activationPassphrase,
        votingOptions,
    })
    res.end()
}

module.exports = {
    register
};

