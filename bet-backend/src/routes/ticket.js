const express = require("express");
const router = express.Router();

const {
    getTickets, generateTicket, payTicket
} = require("../controllers/ticket");

router.route("/").get(getTickets);
router.route("/generate").post(generateTicket);
router.route("/pay").post(payTicket);

module.exports = router;