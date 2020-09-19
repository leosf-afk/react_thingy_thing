const express = require("express");
const router = express.Router();

const {
    getMatches, addMatch
} = require("../controllers/match");

router.route("/").get(getMatches);
router.route("/add").post(addMatch);

module.exports = router;