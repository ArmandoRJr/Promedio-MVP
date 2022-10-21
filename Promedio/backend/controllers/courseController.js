const course = require("../models/course");
const jwt = require("jsonwebtoken");

///// Requests Targetting *** ALL *** Courses /////

const getAllCourses = (req, res, next) => {
    course.find({}, (err, foundCourses) => {
        if (err) { next(err); }
        else
        {
            res.send(foundCourses)
        }
    })
}

const createCourse = (req, res, next) => {
    // Dummy code, need to ACTUALLY GET COURSE NAME && COURSE DESCRIPTION!!
    const courseName = req.body.courseName;
    // const courseDescription = req.body.courseDescription;

    let newCourse = new course({
        name: courseName,
    });

    newCourse
        .save()
        .then(newCourse => {
            if (newCourse)
            {
                res.json({
                    message: "Course added successfully.",
                    course: {
                    ...newCourse.toObject()
                    },
                });
            }
            else
            {
                next({
                    message: "Course not added.",
                    status: 500,
                    stack: "Course not added.",
                });
            }
        })
        .catch(err => {
            next(err);
        })

    // newCourse.save(err, (newCourse) => {
    //     if (err) { next(err); }
    //     else
    //     {
    //         if (newCourse) 
    //         {
    //             res.json({
    //                 message: "Course added successfully.",
    //                 course: {
    //                 ...newCourse.toObject()
    //                 },
    //             });
    //         } 
    //         else 
    //         {
    //             next({
    //                 message: "Course not added.",
    //                 status: 500,
    //                 stack: "Course not added.",
    //             });
    //         }
    //     }
    // })
}

const deleteAllCourses = (req, res, next) => {
    course.deleteMany({}, (err, eventData) => {
        if (err) { next(err); }
        else
        {
            // console.log(eventData);
            if (eventData.deletedCount > 0)
            {
                res.json({
                    message: `Successfully deleted (${eventData.deletedCount}) courses.`,
                    // course: {
                    // ...newCourse.toObject()
                    // },
                });
            }
            else
            {
                next({
                    message: "Courses not deleted (no courses were found to delete)",
                    status: 500,
                    stack: "Courses not deleted (no courses were found to delete)",
                });
            }
        }
    })
}

///// Requests Targetting a *** SPECIFIC *** Course /////

const getCourse = (req, res, next) => {
    // Dummy code, need to ACTUALLY GET COURSE NAME!!
    const courseName = req.params.courseName;

    course.findOne({name: courseName}, (err, foundCourse) => {
        if (err) { next(err); }
        else
        {
            if (foundCourse)
            {
                res.send(foundCourse);
            }
            else
            {
                // console.log(courseName, foundCourse);
                next({
                    message: "Course not found",
                    status: 500,
                    stack: "Course not found",
                });
            }
        }
    })
}

const replaceCourse = (req, res, next) => {
    // Dummy code, need to ACTUALLY GET COURSE NAME!!
    const courseName = req.params.courseName;

    // course.updateOne({name: courseName}, req.body).then().catch()
    //     // .then()

    course.replaceOne(
        {name: courseName},
        req.body,
        (err) => {
            if (err) 
            {
                next(err);
                // next({
                //     message: "Course not updated.",
                //     status: 500,
                //     stack: "Course not updated.",
                // });
            }
            else
            {
                console.log(courseName, req.body.courseName, err);
                res.json({
                    message: "Course updated successfully.",
                    // course: {
                    // ...newCourse.toObject()
                    // },
                });
            }
        }
    );
}

const updateCourse = (req, res, next) => {
    // Dummy code, need to ACTUALLY GET COURSE NAME!!
    const courseName = req.params.courseName;

    // course.updateOne({name: courseName}, req.body).then().catch()
    //     // .then()

    course.updateOne(
        {name: courseName},
        { $set : {name: req.body.courseName} },
        (err, eventData) => {
            if (err) 
            {
                next(err);
                // next({
                //     message: "Course not updated.",
                //     status: 500,
                //     stack: "Course not updated.",
                // });
            }
            else
            {
                if (eventData.modifiedCount === 1)
                {
                    // console.log(courseName, req.body.courseName, err, eventData);
                    res.json({
                        message: "Course updated successfully.",
                        // course: {
                        // ...newCourse.toObject()
                        // },
                    });
                }
                else if (eventData.matchedCount === 1)
                {
                    // console.log(courseName, req.body.courseName, err, eventData);
                    next({
                        message: "Course not updated (no change to course in request)",
                        status: 500,
                        stack: "Course not updated (no change to course in request)",
                    });
                }
                else
                {
                    // console.log(courseName, req.body.courseName, err, eventData);
                    next({
                        message: "Course not updated",
                        status: 500,
                        stack: "Course not updated",
                    });
                }
            }
        }
    );
}

const removeCourse = (req, res, next) => {
    // Dummy code, need to ACTUALLY GET COURSE NAME!!
    const courseName = req.params.courseName;

    course.deleteOne({name: courseName}, (err, eventData) => {
        if (err) { next(err); }
        else
        {
            if (eventData.deletedCount === 1)
            {
                // console.log(courseName, eventData);
                res.json({
                    message: "Course deleted successfully.",
                    // course: {
                    // ...newCourse.toObject()
                    // },
                });
            }
            else
            {
                // console.log(courseName, eventData);
                next({
                    message: "Course not deleted (no course was found to delete)",
                    status: 500,
                    stack: "Course not deleted (no course was found to delete)",
                });
            }
        }
    })
}



module.exports = {
    getCourse,
    updateCourse,
    replaceCourse,
    removeCourse,
    getAllCourses,
    createCourse,
    deleteAllCourses,
};