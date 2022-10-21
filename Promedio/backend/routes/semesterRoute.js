const express = require("express");
const router = express.Router();

const SemesterController = require("../controllers/semesterController");

//router.get("/", SemesterController.getAll);
//router.get("/:id", SemesterController.getSemester);

//router.post('/', SemesterController);

//router.put('/:id', SemesterController.)

router.route('/')
    .get(SemesterController.getAll)

router.route('/:id')
    .get(SemesterController.get)

module.exports = router;
