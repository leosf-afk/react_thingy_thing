const express = require("express");
const router = express.Router();

const {
    getTickets, generateTicket
} = require("../controllers/ticket");

router.route("/").get(getTickets);
router.route("/generate").post(generateTicket);

module.exports = router;