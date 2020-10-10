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
            allowNull: false,
            unique: true
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

const Event = sequelize.define(
    "Event",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        activatePass: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        votingPass: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }
);

module.exports = {
    sequelize,
    Voter,
    Event
}
