const { Sequelize } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Odd", {
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        one:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,    
        },
        x:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,    
        },
        two:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,    
        },
    })
}