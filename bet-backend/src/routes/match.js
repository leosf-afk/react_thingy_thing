const express = require("express");
const router = express.Router();

const {
    getMatches
} = require("../controllers/match");

router.route("/").get(getMatches);

module.exports = router;