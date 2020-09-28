const {Sequelize, DataTypes} = require("sequelize")
const PersonModel = require("./models/Person");
const OddModel = require("./models/Odds");
const MatchModel = require("./models/Match");
const TicketModel = require("./models/Ticket");
const TillModel = require("./models/Till");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
});

//(async () => await sequelize.sync({alter:true}))();

const Person = PersonModel(sequelize,DataTypes);
const Odd = OddModel(sequelize,DataTypes);
const Match = MatchModel(sequelize,DataTypes);
const Ticket = TicketModel(sequelize,DataTypes);
const Till = TillModel(sequelize,DataTypes);

//relations
//Odds.belongsTo(Match, {foreignKey: "matchId"})
//Ticket.belongsTo(Match, {foreignKey: "matchId"})
//Person.hasMany(Ticket)
//Partido.hasMany(Ticket)

//Match.belongsTo(Odd, {foreignKey: "oddsId"})
////Match.Odd = Match.belongsTo(Odd, {foreignKey: "oddsId"})
//
//Person.hasMany(Ticket, {foreignKey: "personId"})
//Match.hasMany(Ticket, {foreignKey: "matchId"})
//Match.Odd = Match.belongsTo(Odd);
//Odd.Match = Odd.belongsTo(Match);

//Ticket.Persons = Ticket.hasOne(Person);
//Person.Tickets = 
//Person.hasMany(Ticket);
//Ticket.Person = Ticket.hasOne(Person);

//odd tiene matchid y con match se puede traer odd
Match.Odd = Match.hasOne(Odd);
//ticket tiene personId y con person se puede traer tickets
Person.hasMany(Ticket)
//ticket tiene matchId y con match se puede traer tickets
Match.hasMany(Ticket, {as: 'tickets'})
//opcion
//Ticket.Match = Ticket.hasOne(Match);


module.exports = {
    Person,
    Odd,
    Match,
    Ticket,
    Till,
    sequelize
}