const {Voter, Event, sequelize} = require("./model");
const {hashes} = require("../hashesForTesting");

async function initialize({reset}) {
    try {
        await sequelize.authenticate()
        await Voter.sync()
        await Event.sync()
        //here we need to check connetion with blockchain and init Event
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


