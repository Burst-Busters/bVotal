const {sendActivationMessage} = require("../blockchain");
const {Voter} = require("../database/model");
const Boom = require('@hapi/boom')
/*
Incoming message format is

{
 hash: <hashedId>
 pub: <Accounts public key>
}

 */
const register = async (req, res) => {
    const {hash, pub} = req.body;
    const voter = await Voter.findOne({where: {hash}});

    if (voter === null) {
        throw Boom.notFound('Not eligible')
    }

    if (voter.active) {
        throw Boom.badRequest('Registered already')
    }

    await Voter.update({active: true}, {where: {hash}});
    // await sendActivationMessage({recipientPublicKey: pub})
    res.end()
}

module.exports = {
    register
};

