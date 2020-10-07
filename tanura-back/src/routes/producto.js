const express = require("express");
const router = express.Router();

const {test} = require("../controllers/producto");

router.route("/").get(test);
router.route("/add").post(test);
router.route("/edit").put(test);
router.route("/delete").put(test);


module.exports = router;


