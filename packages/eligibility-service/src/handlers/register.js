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

    const options = await Campaign.findAll({
        attributes: ['options']
    })

    if(!options.length){
        throw Boom.notFound('No voting options found')
    }

    const votingPassphrase = await Campaign.findAll({
        attributes: ['votingPassphrase']
    })

    if(!votingPassphrase.length){
        throw Boom.notFound('No voting account found')
    }

    const {votingPassphrase} = votingPassphrase[0]

    const activated = await ActivatedAccount.findOne({where: {recipientPublicKey}}); //here we need to use hashing

    if (activated !== null) {
        throw Boom.badRequest('Account activated already')
    }

    await ActivatedAccount.create({ hash: recipientPublicKey}); //here we need to use hashing

    await sendActivationMessage({
        recipientPublicKey,
        activationPassphrase,
        votingOptions,
        votingPassphrase
    })
    res.end()
}

module.exports = {
    register
};

