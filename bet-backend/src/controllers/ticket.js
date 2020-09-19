const {Op} = require('sequelize')
const {Match,Odd,Person,Till,Ticket} = require('../sequelize')
const asyncHandler = require("../middlewares/asyncHandler")

exports.getTickets = asyncHandler(async (req, res, next) => {
    //const tickets = await Ticket.findAll({
    //    attributes: [
    //        "id",
    //        "paid",
    //        "amount",
    //        "result",
    //        "state",
    //        "bet"
    //    ],
    //    include: [
    //        { model: Person, attributes: ["id", "name", "dni"] },
    //    //    { model: Match, attributes: ["team1", "team2", "result"] }
    //    ],
    //});

    const tickets = await Person.findAll({
        attributes: [
            "name",
            "dni",
        ],
        include: [
            { model: Ticket, attributes: ["paid", "amount", "result", "state", "bet"] }
        ],
    })

    console.log("TICKETS GET")

    console.log(tickets)
    if (tickets.length != 0) return res.status(200).json({ success: true, data: tickets });

    return res.status(200).json({ success: true, data: [] })
})

exports.generateTicket = asyncHandler(async (req, res, next) => {
    console.log(req.body)
    
    //const person = await Person.findOne({ where: req.body.dni });
    const person = await Person.findOne({ where: { dni: req.body.dni },
        include: [
            { model: Ticket, attributes: ["paid", "amount", "result", "state", "bet"] }
        ] });

    if (!person) {
        const ticket = await Person.create(req.body, 
        {
            include: [Ticket]
        });
    
        await ticket.save();
        //ticket={}
        return res.status(200).json({ success: true, data: ticket });    
    }

    const ticket = await Ticket.create(req.body.Tickets[0]);
    ticket.PersonId = person.id;
    //console.log(ticket.toJSON());
    ticket.save();

    return res.status(200).json({ success: true, data: person });    
})
