const {Sequelize, DataTypes} = require("sequelize")
const PersonModel = require("./models/Person");
const OddsModel = require("./models/Odds");
const MatchModel = require("./models/Match");
const TicketModel = require("./models/Ticket");
const TillModel = require("./models/Till");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
});

//(async () => await sequelize.sync({alter:true}))();

const Person = PersonModel(sequelize,DataTypes);
const Odds = OddsModel(sequelize,DataTypes);
const Match = MatchModel(sequelize,DataTypes);
const Ticket = TicketModel(sequelize,DataTypes);
const Till = TillModel(sequelize,DataTypes);

//relations
//Odds.belongsTo(Match, {foreignKey: "matchId"})
//Ticket.belongsTo(Match, {foreignKey: "matchId"})
//Person.hasMany(Ticket)
//Partido.hasMany(Ticket)

Match.belongsTo(Odds, {foreignKey: "oddsId"})
Person.hasMany(Ticket, {foreignKey: "personId"})
Match.hasMany(Ticket, {foreignKey: "matchId"})

module.exports = {
    Person,
    Odds,
    Match,
    Ticket,
    Till,
}