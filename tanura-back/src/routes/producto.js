const express = require("express");
const router = express.Router();

const {
    test, 
    agregarProducto,
    getProductos,
    eliminarProducto,
} = require("../controllers/producto");

router.route("/").get(getProductos);
router.route("/agregar").post(agregarProducto);
router.route("/editar").put(test);
router.route("/eliminar").put(eliminarProducto);


module.exports = router;


