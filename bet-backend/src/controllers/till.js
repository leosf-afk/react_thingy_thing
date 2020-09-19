const {Op} = require('sequelize')
const {Till} = require('../sequelize')
const asyncHandler = require("../middlewares/asyncHandler")

exports.getTill = asyncHandler(async (req, res, next) => {
    const till = await Till.findAll({
        attributes: [
          "id",
          "amount",
        ]
    });

    console.log("TILL GET")

    console.log(till[0].toJSON())
    if (till.length != 0) return res.status(200).json({ success: true, data: till[0] });

    return res.status(404).json({ success: false, msg: "Till not created" })
})

exports.addTill = asyncHandler(async (req, res, next) => {
    console.log(req.body)
    const till = await Till.findAll({
        attributes: [
          "id",
          "amount",
        ]
    });

    if (till.length == 0){
        const till = await Till.create(req.body);
    
        await till.save();
        return res.status(200).json({ success: true, data: till });
    } else {
        return res.status(404).json({ success: false, msg: "till already exists" });
    }

})

exports.updateTill = asyncHandler(async (req, res, next) => {
    const till = await Till.findAll({
        attributes: [
          "id",
          "amount",
        ]
    });

    console.log("TILL GET")
    if (till.length == 0){
        const till = await Till.create(req.body);
    
        await till.save();
        return res.status(200).json({ success: true, data: till });
    }

    console.log(till[0].toJSON())
    const ntill = till[0];
    ntill.amount = req.body.amount
    await ntill.save();
    res.status(200).json({ success: true, data: ntill });
  
})
