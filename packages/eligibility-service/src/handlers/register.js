const Boom = require('@hapi/boom')
const {hashText} = require("@bvotal/common");
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

    const hashedPubKey = hashText(recipientPublicKey)
    const activated = await ActivatedAccount.findOne({where: {hash: hashedPubKey}});

    if (activated !== null) {
        throw Boom.badRequest('Account activated already')
    }

    const campaigns = await Campaign.findAll()

    if(!campaigns.length){
        throw Boom.notFound('No campaign found')
    }

    const {activationPassphrase, options, votingPassphrase, active} = campaigns[0].dataValues

    if(!active){
        throw Boom.badRequest('Voting finished')
    }

    await sendActivationMessage({
        recipientPublicKey,
        activationPassphrase,
        votingOptions: JSON.parse(options),
        votingPassphrase
    })

    await ActivatedAccount.create({ hash: hashedPubKey});
    await EligibleVoter.update({active: true}, {where: {hash}});

    res.end()
}

module.exports = {
    register
};

