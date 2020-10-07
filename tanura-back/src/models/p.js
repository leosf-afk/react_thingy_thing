
const { Sequelize } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("DetallePedido", {
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
    })
}

const { Sequelize } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Pedido", {
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
    })
}

const { Sequelize } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("PedidoCliente", {
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
    })
}

const { Sequelize } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("PedidoProveedor", {
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
    })
}

const { Sequelize } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Ciclo", {
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
    })
}

const { Sequelize } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Balance", {
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
    })
}

const { Sequelize } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Cliente", {
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
    })
}
