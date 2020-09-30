const express = require("express");
const router = express.Router();

const {
    getMatches, addMatch, editMatchResult
} = require("../controllers/match");

router.route("/").get(getMatches);
router.route("/add").post(addMatch);
router.route("/edit").put(editMatchResult);

module.exports = router;