const {Op,QueryTypes} = require('sequelize')
const {Match,Odd,Person,Till,Ticket,sequelize} = require('../sequelize')
const asyncHandler = require("../middlewares/asyncHandler")

exports.getTickets = asyncHandler(async (req, res, next) => {
    console.log("TICKETS GET")

    const tickets_ = await sequelize.query(
        `SELECT Tickets.id, name, dni, bet, paid, state, 
        Tickets.result as ticket_result, 
        Matches.result as match_result,
        amount, team1, team2, Tickets.MatchId as matchId
        FROM 
        ((tickets INNER JOIN matches ON tickets.MatchId = matches.id)
        INNER JOIN people ON tickets.PersonId = People.id)`, { type: QueryTypes.SELECT });
    
    

    if (tickets_.length != 0) return res.status(200).json({ success: true, tickets: tickets_ });

    return res.status(200).json({ success: true, tickets: [] })
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
