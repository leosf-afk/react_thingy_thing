const { Sequelize } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Odd", {
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        One:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,    
        },
        X:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,    
        },
        Two:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,    
        },
    })
}