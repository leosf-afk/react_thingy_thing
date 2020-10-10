const {Op,QueryTypes} = require('sequelize')
const {
    Pedido,
    Cliente,
    DetallePedido,
    PedidoCliente,
    Producto,
    PedidoProveedor,
    sequelize
} = require('../sequelize')

const asyncHandler = require("../middlewares/asyncHandler")

exports.agregarPedidoCliente = asyncHandler(async (req, res, next) => {
    console.log(req.body)

    const pedido = await PedidoCliente.create(req.body, {include: [
        {association: PedidoCliente.Cliente},
        {association: PedidoCliente.Pedido, include: [ 
            {association: Pedido.DetallePedido, 
                include: [{association: DetallePedido.Producto}]} 
        ]}
    ]});

    console.log(pedido.Pedido)

    await pedido.save();

    res.status(200).json({ success: true, data:pedido });
})

exports.agregarPedidoProveedor = asyncHandler(async (req, res, next) => {
    console.log(req.body)

    res.status(200).json({ success: true, data:{} });
})

//cancelar?
exports.eliminarPedido = asyncHandler(async (req, res, next) => {
    console.log(req.body)

    res.status(200).json({ success: true, data:{} });
})


exports.getAllPedidoCliente = asyncHandler(async (req, res, next) => {
    console.log(req.body)

    let pedidos = await PedidoCliente.findAll({
        attributes: [
            "id",
            "montoSaldado",
            "entregado",
            "pagado"
        ],
        include: [
            { model: Cliente, attributes: ["nombre"] },
            { model: Pedido, attributes: ["total"], 
                include: [{ 
                    model: DetallePedido, attributes: ["cantidad", "subtotal"],
                    include: [{model: Producto, attributes: ["descripcion", "precio"]}] 
                }] 
            }
        ],
    });

    pedidos.map(p => {
            let total_pedido = 0
            p.Pedido.DetallePedidos.map(dp => {
                dp.subtotal = dp.cantidad * dp.Producto.precio
                total_pedido += dp.subtotal
            })

            p.Pedido.total = total_pedido 
        }
    )

     
    return res.status(200).json({ success: true, data: pedidos });

})

exports.getPedidoProveedor = asyncHandler(async (req, res, next) => {
    console.log(req.body)

    res.status(200).json({ success: true, data:{} });
})
