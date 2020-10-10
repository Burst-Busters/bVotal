const {Voter, sequelize} = require("./model");
const {hashes} = require("../hashesForTesting");

async function initialize({reset}) {
    try {
        await sequelize.authenticate()
        await Voter.sync()

        if (reset) {
            await Voter.destroy({
                truncate: true
            })
            await Voter.bulkCreate(hashes)
        }
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

module.exports = {
    initialize
}


