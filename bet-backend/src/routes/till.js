const express = require("express");
const router = express.Router();

const {
    getTill, addTill, updateTill
} = require("../controllers/till");

router.route("/").get(getTill);
router.route("/add").post(addTill);
router.route("/update").put(updateTill);

module.exports = router;