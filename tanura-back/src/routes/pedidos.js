const express = require("express");
const router = express.Router();

const {
    agregarPedidoCliente
} = require("../controllers/pedido");

router.route("/cliente/agregar").post(agregarPedidoCliente);

module.exports = router;


