const express = require("express");
const router = express.Router();

const {
    getTeams,
    addTeam
} = require("../controllers/team");

router.route("/").get(getTeams);
router.route("/add").post(addTeam);

module.exports = router;