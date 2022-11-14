const express = require("express");
const router = express.Router();

const CalculationController = require("../controllers/calculationController");

router.route("/calculations/")
    .get(CalculationController.getCalculations)

module.exports = router;