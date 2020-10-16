const express = require("express");
const router = express.Router();

const {
    agregarPedidoCliente,
    getAllPedidoCliente,
    agregarPedidoProveedor
} = require("../controllers/pedido");

router.route("/cliente/agregar").post(agregarPedidoCliente);
router.route("/cliente").get(getAllPedidoCliente);
router.route("/proveedor/agregar").post(agregarPedidoProveedor);
module.exports = router;
