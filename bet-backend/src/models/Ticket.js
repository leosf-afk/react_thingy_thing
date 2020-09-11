const { Sequelize } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Ticket", {
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        paid:{
            type: DataTypes.BOOLEAN,
            allowNull: false,    
        },
        amount:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
                
        },
        //Result: P, N or A
        //W Won
        //L Lose
        //N Nulled
        result:{
            type: DataTypes.STRING(1),
            allowNull: false,
            validate: {
                isUpperCase: true,
                isIn: [["W", "L", "N"]] 
            }    
        },
        //STATE: P, N or A
        //P Paid
        //N Nulled
        //E pEnding
        state:{
            type: DataTypes.STRING(1),
            allowNull: false,
            validate: {
                isUpperCase: true,
                isIn: [["P", "N", "E"]] 
            }    
        }
    })
}