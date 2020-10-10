const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db/voters.db",
});

// https://sequelize.org

const Voter = sequelize.define(
  "Voter",
  {
    // Model attributes are defined here. String max 255
    hash: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = {
    sequelize,
    Voter
}
