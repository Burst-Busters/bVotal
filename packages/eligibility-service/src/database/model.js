const {Sequelize, DataTypes} = require("sequelize");
const Config = require("../config")

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: Config.DatabasePath,
});


const Voter = sequelize.define(
    "Voter",
    {
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
