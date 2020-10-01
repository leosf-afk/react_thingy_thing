SELECT Orders.OrderID, Customers.CustomerName, Shippers.ShipperName
FROM ((Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID)
INNER JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID);

SELECT * FROM (tickets INNER JOIN matches ON tickets.MatchId = matches.id)


SELECT * FROM (tickets INNER JOIN matches ON tickets.MatchId = matches.id)


SELECT * FROM 
((tickets INNER JOIN matches ON tickets.MatchId = matches.id)
INNER JOIN matches ON tickets.PersonId = person.id)



SELECT name, dni, bet, paid, state, 
Tickets.result as ticket_result, 
Matches.result as match_result,
amount, team1, team2
FROM 
((tickets INNER JOIN matches ON tickets.MatchId = matches.id)
INNER JOIN people ON tickets.PersonId = People.id)

paid amount result state bet

SELECT name, dni, bet, paid, state, 
Tickets.result as ticket_result, 
Matches.result as match_result,
amount, team1, team2, (SELECT one FROM Odds WHERE MatchId=1) as bet_odd
FROM 
((tickets INNER JOIN matches ON tickets.MatchId = matches.id)
INNER JOIN people ON tickets.PersonId = People.id)


SELECT name, dni, bet, paid, state, 
Tickets.result as ticket_result, 
Matches.result as match_result,
amount, team1, team2, Matches.Odds as bet_odds
FROM
((tickets INNER JOIN matches ON tickets.MatchId = matches.id)
INNER JOIN people ON tickets.PersonId = People.id)


SELECT *
FROM 
(((tickets INNER JOIN matches ON tickets.MatchId = matches.id INNER JOIN Odds ON Odds.MatchID = Matches.Id)
	INNER JOIN people ON tickets.PersonId = People.id)

SELECT Tickets.id, name, dni, bet, paid, state, 
        Tickets.result as ticket_result, 
        Matches.result as match_result,
        amount, team1, team2, Tickets.MatchId as matchId, one, x, two
FROM (((tickets 
	INNER JOIN matches ON tickets.MatchId = matches.id 
	INNER JOIN people ON tickets.PersonId = People.id 
	INNER JOIN odds ON tickets.MatchId = odds.MatchId
)))
