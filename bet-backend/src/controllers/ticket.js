const {Op,QueryTypes} = require('sequelize')
const {Match,Odd,Person,Till,Ticket,sequelize} = require('../sequelize')
const asyncHandler = require("../middlewares/asyncHandler")

exports.getTickets = asyncHandler(async (req, res, next) => {
    //console.log("TICKETS GET")

    const tickets_ = await sequelize.query(
        `SELECT Tickets.id, name, dni, bet, paid, state, 
        Tickets.result as ticket_result, 
        Matches.result as match_result,
        amount, team1, team2, Tickets.MatchId as matchId, one, x, two
        FROM (((tickets 
        	INNER JOIN matches ON tickets.MatchId = matches.id 
        	INNER JOIN people ON tickets.PersonId = People.id 
        	INNER JOIN odds ON tickets.MatchId = odds.MatchId
        )))`, { type: QueryTypes.SELECT });
    
    

    if (tickets_.length != 0) return res.status(200).json({ success: true, tickets: tickets_ });

    return res.status(200).json({ success: true, tickets: [] })
})

exports.generateTicket = asyncHandler(async (req, res, next) => {
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

        const till = await Till.findAll({
            attributes: [
              "id",
              "amount",
            ]
        });
        const ntill = till[0];
        ntill.amount += parseFloat(req.body.Tickets[0].amount)
        await ntill.save();
    
    
        await ticket.save();
        return res.status(200).json({ success: true, data: ticket });    
    }

    const ticket = await Ticket.create(req.body.Tickets[0]);
    ticket.PersonId = person.id;
  
    await ticket.save();

    const till = await Till.findAll({
        attributes: [
          "id",
          "amount",
        ]
    });
    const ntill = till[0]
    ntill.amount += parseFloat(req.body.Tickets[0].amount)
    await ntill.save();
    

    return res.status(200).json({ success: true, data: person });    
})
