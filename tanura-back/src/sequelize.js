const {Sequelize, DataTypes} = require("sequelize")
const BalanceModel = require("./models/Balance")
const CategoriaModel = require("./models/Categoria")
const CicloModel = require("./models/Ciclo")
const ClienteModel = require("./models/Cliente")
const CuotaModel = require("./models/Cuota")
const DetallePedidoModel = require("./models/DetallePedido")
const LineaModel = require("./models/Linea")
const PedidoModel = require("./models/Pedido")
const PedidoClienteModel = require("./models/PedidoCliente")
const PedidoProveedorModel = require("./models/PedidoProveedor")
const ProductoModel = require("./models/Producto")

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
});

//(async () => await sequelize.sync({alter:true}))();

const Balance = BalanceModel(sequelize,DataTypes);
const Categoria = CategoriaModel(sequelize,DataTypes);
const Ciclo = CicloModel(sequelize,DataTypes);
const Cliente = ClienteModel(sequelize,DataTypes);
const Cuota = CuotaModel(sequelize,DataTypes);
const DetallePedido = DetallePedidoModel(sequelize,DataTypes);
const Linea = LineaModel(sequelize,DataTypes);
const Pedido = PedidoModel(sequelize,DataTypes);
const PedidoCliente = PedidoClienteModel(sequelize,DataTypes);
const PedidoProveedor = PedidoProveedorModel(sequelize,DataTypes);
const Producto =  ProductoModel(sequelize,DataTypes);

//odd tiene matchid y con match se puede traer odd
//Match.Odd = Match.hasOne(Odd);
//ticket tiene personId y con person se puede traer tickets
//Person.hasMany(Ticket)
//ticket tiene matchId y con match se puede traer tickets
//Match.hasMany(Ticket, {as: 'tickets'})

//one to many
//Categoria.hasMany(Producto)
//Producto.belongsTo(Categoria)

Pedido.hasMany(DetallePedido)
DetallePedido.belongsTo(Pedido)

PedidoCliente.hasMany(Cuota)
Cuota.belongsTo(PedidoCliente)

Cliente.hasMany(PedidoCliente)
PedidoCliente.Cliente = PedidoCliente.belongsTo(Cliente)

Ciclo.hasMany(Pedido)
Pedido.belongsTo(Ciclo)

//one to one
Ciclo.hasOne(Balance)
Balance.belongsTo(Ciclo)

Producto.hasOne(DetallePedido)
DetallePedido.belongsTo(Producto)

Pedido.hasOne(PedidoCliente)
PedidoCliente.Pedido = PedidoCliente.belongsTo(Pedido)

Pedido.hasOne(PedidoProveedor)
PedidoProveedor.belongsTo(Pedido)

module.exports = {
    Balance,
    Categoria,
    Cliente,
    Cuota,
    DetallePedido,
    Linea,
    Pedido,
    PedidoCliente,
    PedidoProveedor,
    Producto,
    sequelize,
}