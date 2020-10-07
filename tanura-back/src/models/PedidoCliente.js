const { Sequelize } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("PedidoCliente", {
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        montoSaldado:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        entregado:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        pagado:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    })
}
