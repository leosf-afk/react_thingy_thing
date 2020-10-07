const {Op,QueryTypes} = require('sequelize')
const {Pedido,Persona,DetallePedido,PedidoCliente,PedidoProveedor,sequelize} = require('../sequelize')
const asyncHandler = require("../middlewares/asyncHandler")

exports.agregarPedidoCliente = asyncHandler(async (req, res, next) => {
    console.log(req.body)

    const pedido = await PedidoCliente.create(req.body, {include: [ DetallePedido, Pedido, Persona ]});

    await pedido.save();

    res.status(200).json({ success: true, data:{} });
})

exports.agregarPedidoProveedor = asyncHandler(async (req, res, next) => {
    console.log(req.body)

    res.status(200).json({ success: true, data:{} });
})

exports.eliminarPedido = asyncHandler(async (req, res, next) => {
    console.log(req.body)

    res.status(200).json({ success: true, data:{} });
})


exports.getPedidoCliente = asyncHandler(async (req, res, next) => {
    console.log(req.body)

    res.status(200).json({ success: true, data:{} });
})

exports.getPedidoProveedor = asyncHandler(async (req, res, next) => {
    console.log(req.body)

    res.status(200).json({ success: true, data:{} });
})
