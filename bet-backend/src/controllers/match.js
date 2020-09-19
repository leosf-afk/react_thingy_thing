const {Op} = require('sequelize')
const {Match,Odd} = require('../sequelize')
const asyncHandler = require("../middlewares/asyncHandler")

exports.getMatches = asyncHandler(async (req, res, next) => {
    const matches = await Match.findAll({
        attributes: [
          "id",
          "team1",
          "team2",
          "result",
          //"createdAt",
        ],
        include: [{ model: Odd, attributes: ["one", "x", "two"] }],
    });

    console.log("MATCHES GET")

    console.log(matches)
    if (matches.length != 0) return res.status(200).json({ success: true, data: matches });

    return res.status(200).json({ success: true, data: [] })
})

exports.addMatch = asyncHandler(async (req, res, next) => {
    console.log(req.body)
    const match = await Match.create(req.body, {include: [ Odd ]});
    
    await match.save();

    res.status(200).json({ success: true, data: match });
})