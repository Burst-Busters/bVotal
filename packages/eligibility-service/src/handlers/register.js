const { Voter } = require("../model");

const register = async (req, res) => {
    const hash = req.body;
    //look for hesh, if finds sends response what bad
    const voter = await Voter.findOne({ where: hash });
    if (voter === null) {
    console.log('Not found!');
    res.end('You are not registered in this vote');
    } else {
    if(voter.active) {
        res.end('Your account is activated already');
        console.log("Voter valid, but activated already"); 
    } else {
        console.log("Voter valid and not activated"); 
        await Voter.update({ active: true }, {
            where: hash
          });
          //function to activate and send funds
        res.end('Here goes voting options and activation of acc');
        }   
    }

module.exports = {
    register
}
