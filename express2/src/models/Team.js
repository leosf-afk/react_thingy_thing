const { Sequelize } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Team", {
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,    
        },
    })
}
