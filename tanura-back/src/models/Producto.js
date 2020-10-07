const { Sequelize } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Producto", {
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        descripcion:{
            type: DataTypes.STRING,
            allowNull: false,    
        },
        codigo:{
            type: DataTypes.BIGINT,
            allowNull: true, 
        },
        puntos:{
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        cantidad:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        precio:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        estaEliminado:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    })
}
