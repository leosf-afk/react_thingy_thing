const {Op} = require('sequelize')
const {Match} = require('../sequelize')
const asyncHandler = require("../middlewares/asyncHandler")

exports.getMatches = asyncHandler(async (req, res, next) => {
    res.status(200).json({success:true,data:{}})
})
