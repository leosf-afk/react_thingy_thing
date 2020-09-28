const {Op,QueryTypes} = require('sequelize')
const {Match,Odd,Person,Till,Ticket,sequelize} = require('../sequelize')
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
            { 
                model: Ticket, 
                attributes: ["paid", "amount", "result", "state", "bet", "MatchId",]
            }
        ]
    })

    
   // console.log(tickets.toJSON())
        
    //tickets.forEach(async (ticket) => {
    //    ticket.Tickets.forEach(async (t) => {
    //        
    //        console.log(t.toJSON())
    //    })
    //})

    for (const ticket of tickets) {
        for (const t of ticket.Tickets) {
            
        }
    }

    //        const match = await Match.findByPk(t.MatchId, {
    //            attributes: [
    //              "id",
    //              "team1",
    //              "team2",
    //              "result",
    //              //"createdAt",
    //            ],
    //            include: [{ model: Odd, attributes: ["one", "x", "two"] }],
    //        });
    //        console.log(match.toJSON())
    //        
    //        t.setDataValue("match", match);
           

    console.log("TICKETS GET")

    const tickets_ = await sequelize.query("SELECT * FROM (tickets INNER JOIN matches ON tickets.MatchId = matches.id)", { type: QueryTypes.SELECT });
    if (tickets.length != 0) return res.status(200).json({ success: true, data: tickets_ });


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
