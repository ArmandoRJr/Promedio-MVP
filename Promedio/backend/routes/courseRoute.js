const express = require("express");
const router = express.Router();

const CourseController = require("../controllers/courseController");

// "/course" route is ONLY FOR TESTING (will 
// probably become /home/<semester>/<course>)
router.route("/course/:courseName")
    .get(CourseController.getCourse)
    .patch(CourseController.updateCourse)
    .delete(CourseController.removeCourse)
    // .put(CourseController.replaceCourse) // <-- Not needed + currently broken
    
// router.get("/course", )
// router.post("/course", CourseController.createCourse);

router.route("/course")
    .get(CourseController.getAllCourses)
    .post(CourseController.createCourse)
    // .delete(CourseController.deleteAllCourses) // <-- DANGEROUS... USE WITH CAUTION!

module.exports = router;