const express = require("express");
const router = express.Router();

const {
    getMatches, addMatch
} = require("../controllers/match");

router.route("/").get(getMatches);
router.route("/add").get(addMatch);

module.exports = router;