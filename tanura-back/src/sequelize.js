const {Sequelize, DataTypes} = require("sequelize")
const ProductoModel = require("./models/Producto")
const CategoriaModel = require("./models/Categoria")
const LineaModel = require("./models/Linea")
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
});

(async () => await sequelize.sync({alter:true}))();

const Producto =  ProductoModel(sequelize,DataTypes);
const Categoria = CategoriaModel(sequelize,DataTypes);
const Linea =     LineaModel(sequelize,DataTypes);


//odd tiene matchid y con match se puede traer odd
//Match.Odd = Match.hasOne(Odd);
//ticket tiene personId y con person se puede traer tickets
//Person.hasMany(Ticket)
//ticket tiene matchId y con match se puede traer tickets
//Match.hasMany(Ticket, {as: 'tickets'})

module.exports = {
    //Model,
    sequelize,
}