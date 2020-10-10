const { Sequelize } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Pedido", {
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        fecha:{
            type:DataTypes.DATE,
            allowNull: true,
            defaultValue: new Date()
        },
        total:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        estaEliminado:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    })
}