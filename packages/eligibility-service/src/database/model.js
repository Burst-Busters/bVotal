const {Sequelize, DataTypes} = require("sequelize");
const Config = require("../config")
const {logger} = require("../logger");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: Config.DatabasePath,
    logging: sql => logger.debug(sql)
});


const EligibleVoter = sequelize.define(
    "EligibleVoter",
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
    },{
        timestamps: false
      }
);

const Campaign = sequelize.define(
    "Campaign",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        activationPassphrase: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        votingPassphrase: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }
);

const ActivatedAccount = sequelize.define(
    "ActivatedAccount",
    {
        hash: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }        
    },{
        timestamps: false
      }
);

module.exports = {
    sequelize,
    EligibleVoter,
    Campaign,
    ActivatedAccount
}
