const express = require("express");
const router = express.Router();

const CourseController = require("../controllers/courseController");

router.route("/course")
    .get(CourseController.getAllCourses)
    .post(CourseController.createCourse)
    .delete(CourseController.deleteAllCourses)

router.route("/course/:courseId")
    .get(CourseController.getSingleCourse)
    .patch(CourseController.updateCourse)
    .delete(CourseController.deleteSingleCourse)

module.exports = router;