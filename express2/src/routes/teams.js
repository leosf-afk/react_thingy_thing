const express = require("express");
const router = express.Router();

const {
    getTeams,
    addTeams
} = require("../controllers/team");

router.route("/teams").get(getTeams);

module.exports = router;