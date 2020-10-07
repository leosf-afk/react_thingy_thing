const express = require("express");
const router = express.Router();

const {
    test, 
    agregarProducto,
    getProductos
} = require("../controllers/producto");

router.route("/").get(getProductos);
router.route("/agregar").post(agregarProducto);
router.route("/editar").put(test);
router.route("/eliminar").put(test);


module.exports = router;


