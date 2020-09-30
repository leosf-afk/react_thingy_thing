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

    //console.log(matches)
    if (matches.length != 0) return res.status(200).json({ success: true, matches: matches });

    return res.status(200).json({ success: true, matches: [] })
})

exports.addMatch = asyncHandler(async (req, res, next) => {
    console.log(req.body)
    if(req.body.team1 === "" || req.body.team2 === ""){
        res.status(200).json({ success: false, match: {}, msg: "error, one of the team or odds are empty"});
    }

    const match = await Match.create(req.body, {include: [ Odd ]});

    await match.save();

    res.status(200).json({ success: true, match: match });
})

exports.removeMatch = asyncHandler(async (req, res, next) => {
    //what to do with odds?
    await Match.destroy({
      where: { id: req.params.id },
    });
  
    res.status(200).json({ success: true, data: {} });
});

exports.editMatch = asyncHandler(async (req, res, next) => {
    await Match.update(req.body, {
      where: { id: req.user.id },
    });

    const match = await Match.findByPk(req.user.id, {
        attributes: [
          "id",
          "team1",
          "team2",
          "result",
          //"createdAt",
        ],
        include: [{ model: Odd, attributes: ["one", "x", "two"] }],
    });

  
    res.status(200).json({ success: true, match: match });
});

exports.editMatchResult = asyncHandler(async (req, res, next) => {
  console.log("EEEEEEEEEEEEEDITING MATCH")
  const match = await Match.findByPk(req.body.id, {
    attributes: [
      "id",
      "team1",
      "team2",
      "result",
    ],
    include: [{ model: Odd, attributes: ["one", "x", "two"] }],
  });

  match.result = req.body.result
  match.save()
  res.status(200).json({ success: true, data: match });
});
