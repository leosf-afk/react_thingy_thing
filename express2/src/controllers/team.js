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
    console.log(req.body)
    console.log(req.params)
    
    if(!req.body){
        return next({
            message: "Error: no body",
            statusCode: 404,
          });
    }
    const team = await Team.create({
        name: req.body.name
    })

    await team.save()

    res.status(200).json({success:true})
})

