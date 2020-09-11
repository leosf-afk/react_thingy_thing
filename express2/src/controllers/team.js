const {Op} = require('sequelize')
const {Team} = require('../sequelize')
const asyncHandler = require("../middlewares/asyncHandler")

//const team = await Team.findByPk(req.params.id)

//exports.getTeams = await Team.findAll({
//    attributes: ['id','name'],
//    where: {
//        id: {[Op.in]: teamIds}
//    }<
//})

exports.getTeams = asyncHandler(async (req, res, next) => {
    const teams = await Team.findAll({
        attributes: ["id", "name"]
    })

    console.log(teams)
    res.status(200).json({success:true,data:teams})
})

//exports.editTeam = await asyncHandler(User.findByPk())

exports.addTeam = asyncHandler(async (req,res,next) => {
    const team = await Team.create(req.body)

    await team.save()

    res.status(200).json({success:true})
})

