const { Voter, sequelize } = require("./model");
const { hashes } = require("./hashesForTesting");

async function init() {
    try {
      sequelize
        .authenticate()
        .then(() => console.log("Connection has been established successfully."))
        .then(() => Voter.sync())
        .then(() => Voter.destroy({      //only for testing  
            truncate: true
          }))
        .then(() => Voter.bulkCreate(hashes));
    
     } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

exports.init = init;

