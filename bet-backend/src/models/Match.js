const { Sequelize } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Match", {
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        team1:{
            type: DataTypes.STRING,
            allowNull: false,    
        },
        team2:{
            type: DataTypes.STRING,
            allowNull: false,    
        },
        result:{
            type: DataTypes.STRING(1),
            allowNull: false,
            validate: {
                isIn: [["-", "1", "X", "2"]] 
            }      
        },
    })
}
