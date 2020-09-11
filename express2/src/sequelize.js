const {Sequelize, DataTypes} = require("sequelize")
const TeamModel = require("./models/Team");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
});

//(async () => await sequelize.sync({alter:true}))();

const Team = TeamModel(sequelize,DataTypes);

module.exports = {
    Team
}