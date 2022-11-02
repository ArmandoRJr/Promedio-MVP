const express = require("express");
const router = express.Router();

const SemesterController = require("../controllers/semesterController");

router.route("/semester")
    .get(SemesterController.getAllSemesters)
    .post(SemesterController.createSemester)
    .delete(SemesterController.deleteAllSemesters)

router.route("/semester/:semesterId")
    .get(SemesterController.getSingleSemester)
    .patch(SemesterController.updateSemester)
    .delete(SemesterController.deleteSingleSemester)

module.exports = router;