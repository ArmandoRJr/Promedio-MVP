const express = require("express");
const router = express.Router();

const CalculationController = require("../controllers/calculationController");

router.route("/calculation/:courseId")
    .get(CalculationController.getCourseCalculations)

router.route("/calculation/")
    .get(CalculationController.getCalculations)

module.exports = router;