const express = require("express");
const router = express.Router();

const {
    agregarPedidoCliente,
    getAllPedidoCliente
} = require("../controllers/pedido");

router.route("/cliente/agregar").post(agregarPedidoCliente);
router.route("/cliente").get(getAllPedidoCliente);

module.exports = router;


