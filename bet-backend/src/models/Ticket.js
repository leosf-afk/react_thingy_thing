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
            defaultValue: false,
        },
        amount:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        //Result: P, W, N or A
        //W Won
        //L Lose
        //N Nulled
        //P pending
        result:{
            type: DataTypes.STRING(1),
            allowNull: false,
            defaultValue: "P",
            validate: {
                isIn: [["P", "W", "L", "N"]] 
            }    
        },
        //STATE: P, N or A
        //P Paid
        //N Nulled
        //E pEnding
        //L Losed
        state:{
            type: DataTypes.STRING(1),
            allowNull: false,
            defaultValue: "P",
            validate: {
                isIn: [["P", "N", "E", "L"]] 
            }    
        },
        bet:{
            type: DataTypes.STRING(1),
            allowNull: false,
            validate: {
                isIn: [["one", "x", "two"]]  
            }      
        }
    })
}