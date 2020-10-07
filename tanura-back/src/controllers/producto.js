const {Op} = require('sequelize')
const {Producto} = require('../sequelize')
const asyncHandler = require("../middlewares/asyncHandler")

exports.test = (req, res, next) => 
    Promise.resolve((async (req, res, next) => {
        res.status(200).json({ success: true, data: "ok" });
    })(req,res,next).catch(next))

exports.agregarProducto = asyncHandler(async (req, res, next) => {
    console.log(req.body)

    res.status(200).json({ success: true, data:{} });
})

exports.eliminarProducto = asyncHandler(async (req, res, next) => {
    console.log(req.body)

    res.status(200).json({ success: true, data:{} });
})
