const { Sequelize } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Categoria", {
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
        estaEliminado:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    })
}
