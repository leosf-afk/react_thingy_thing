const { Sequelize } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("DetallePedido", {
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        cantidad:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        subtotal:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
    })
}
