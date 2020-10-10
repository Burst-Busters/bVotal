const { Voter } = require("../model");

const showAllTEST = async (req, res) => {
   const users = await Voter.findAll();
   res.end(JSON.stringify(users));
}


module.exports = {
    showAllTEST
}