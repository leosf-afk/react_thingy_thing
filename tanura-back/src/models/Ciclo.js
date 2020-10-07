const { Sequelize } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Ciclo", {
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        fechaInicio:{
            type:DataTypes.DATE,
            allowNull: true, 
        },
        fechaFin:{
            type:DataTypes.DATE,
            allowNull: true, 
        },
        numero:{
            type: DataTypes.STRING,
            allowNull: false,    
        },
        estaEliminado:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    })
}