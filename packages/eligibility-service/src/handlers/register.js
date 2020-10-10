const {sendActivationMessage} = require("../blockchain");
const {Voter} = require("../database/model");

/*
Incoming message format is

{
 hash: <hashedId>
 pub: <Accounts public key>
}

 */
const register = async (req, res) => {
    const {hash, pub} = req.body;
    const voter = await Voter.findOne({where: hash});

    if (voter === null) {
        console.log('Not found!');
        res.end('You are not registered in this vote');
        return
    }

    if (!voter.active) {
        console.log("Voter valid and not activated");
        await Voter.update({active: true}, {
            where: hash
        });
        await sendActivationMessage({recipientPublicKey: pub})
        res.end('Here goes voting options and activation of acc');
        return
    }

    res.end('Your account is activated already');
    console.log("Voter valid, but activated already");
}

module.exports = {
    register
};

