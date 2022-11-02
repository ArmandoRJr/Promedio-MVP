const course = require("../models/course");
const semester = require("../models/semester");

const verifyUser = (headers) => {
    return JSON.parse(headers.authorization)._id;
}


///// Requests Targetting *** ALL *** Courses /////

const getAllCourses = (req, res, next) => {

    const userId = verifyUser(req.headers);
    if (!userId)
    {
        next({
            message: "Missing parameters.",
            status: 400,
            stack: "Missing parameters.",
        });
        return;
    }

    semester.find({userId: userId}, (err, foundSemesters) => {
        if (err) { next(err); }
        else
        {
            const semIds = foundSemesters.map(semester => semester._id.toString());
            course.find({semesterId: {"$in" : semIds}}, (err, foundSemesters) => {
                if (err) { next(err); }
                else
                {
                    res.send(foundSemesters)
                }
            })
        }
    })
}

const deleteAllCourses = (req, res, next) => {

    const userId = verifyUser(req.headers);
    if (!userId)
    {
        next({
            message: "Missing parameters.",
            status: 400,
            stack: "Missing parameters.",
        });
        return;
    }

    semester.find({userId: userId}, (err, foundSemesters) => {
        if (err) { next(err); }
        else
        {
            const semIds = foundSemesters.map(semester => semester._id.toString());
            course.deleteMany({semesterId: {"$in" : semIds}}, (err, eventData) => {
                if (err) { next(err); }
                else
                {
                    if (eventData.deletedCount > 0)
                    {
                        res.json({
                            message: `Successfully deleted ${eventData.deletedCount} course(s).`,
                        });
                    }
                    else
                    {
                        next({
                            message: "No courses were found to delete.",
                            status: 500,
                            stack: "No courses were found to delete.",
                        });
                    }
                }
            })
        }
    })
}

///// Requests Targetting a *** SPECIFIC *** Course /////

const getSingleCourse = (req, res, next) => {

    const userId = verifyUser(req.headers);
    const courseId = req.params.courseId;
    if (!userId || !courseId)
    {
        next({
            message: "Missing parameters.",
            status: 400,
            stack: "Missing parameters.",
        });
        return;
    }

    course.findOne({userId: userId, _id: courseId}, (err, foundCourse) => {
        if (err) { next(err); }
        else
        {
            if (foundCourse)
            {
                res.send(foundCourse);
            }
            else
            {
                next({
                    message: "Course not found.",
                    status: 404,
                    stack: "Course not found.",
                });
            }
        }
    }
    )
}

const createCourse = (req, res, next) => {
    const userId = verifyUser(req.headers);
    const semesterId = req.body.semester;
    const courseName = req.body.name;
    const description = req.body.description;
    const markGoal = req.body.markGoal;
    if (!userId || !semesterId || !courseName)
    {
        next({
            message: "Missing parameters.",
            status: 400,
            stack: "Missing parameters." + userId + semesterId + courseName,
        });
        return;
    }

    semester.findOne({userId: userId, _id: semesterId},
        (err, foundSemester) => {
            if (err) { next(err); }
            else {
                if (foundSemester) {
                    let newCourse = new course({
                        name: courseName,
                        semesterId: foundSemester._id,
                        ...(description && {description: description}),
                        ...(markGoal && {markGoal: markGoal}),
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
                } else {
                    next({
                        message: "Semester not found",
                        status: 500,
                        stack: "Semester not found",
                    });
                }
            }
        })

}

const updateCourse = (req, res, next) => {

    const userId = verifyUser(req.headers);
    const courseName = req.body.name;
    const courseId = req.params.courseId;
    const description = req.body.description;
    const markGoal = req.body.markGoal;
    if (!userId || !courseName || !courseId)
    {
        next({
            message: "Missing parameters.",
            status: 400,
            stack: "Missing parameters.",
        });
        return;
    }

    course.findOne({_id: courseId}, (err, foundCourse) => {
        if (err) { next(err); }
        else
        {
            if (foundCourse)
            {
                const semesterId = foundCourse.semesterId
                semester.findOne({userId: userId, _id: semesterId},
                    (err, foundSemester) => {
                        if (err) { next(err); }
                        else {
                            if (foundSemester) {

                                if (foundSemester.userId != userId){
                                    next({
                                        message: "Course does not belong to the user.",
                                        status: 401,
                                        stack: "Course does not belong to the user.",
                                    });
                                }

                                course.updateOne(
                                    {_id: courseId},
                                    { $set : {
                                        name: courseName,
                                        description: description,
                                        markGoal: markGoal,
                                    } },
                                    (err, eventData) => {
                                        if (err)
                                        {
                                            next(err);
                                        }
                                        else
                                        {
                                            if (eventData.modifiedCount === 1)
                                            {
                                                res.json({
                                                    message: "Course updated successfully.",
                                                });
                                            }
                                            else if (eventData.matchedCount === 1)
                                            {
                                                next({
                                                    message: "No change to course in request.",
                                                    status: 500,
                                                    stack: "No change to course in request.",
                                                });
                                            }
                                            else
                                            {
                                                next({
                                                    message: "Course not updated.",
                                                    status: 500,
                                                    stack: "Course not updated.",
                                                });
                                            }
                                        }
                                    }
                                );

                            } else {
                                next({
                                    message: "Semester attached to course not found.",
                                    status: 404,
                                    stack: "Semester attached to course not found.",
                                });
                            }
                        }
                    })
            }
            else
            {
                next({
                    message: "Course not found.",
                    status: 404,
                    stack: "Course not found.",
                });
            }
        }
    })

}

const deleteSingleCourse = (req, res, next) => {

    const userId = verifyUser(req.headers);
    const courseId = req.params.courseId;
    if (!userId || !courseId)
    {
        next({
            message: "Missing parameters.",
            status: 400,
            stack: "Missing parameters.",
        });
        return;
    }

    course.findOne({_id: courseId}, (err, foundCourse) => {
        if (err) { next(err); }
        else
        {
            if (foundCourse)
            {
                const semesterId = foundCourse.semesterId
                semester.findOne({userId: userId, _id: semesterId},
                    (err, foundSemester) => {
                        if (err) { next(err); }
                        else {
                            if (foundSemester) {

                                if (foundSemester.userId != userId){
                                    next({
                                        message: "Course does not belong to the user.",
                                        status: 401,
                                        stack: "Course does not belong to the user.",
                                    });
                                }

                                course.deleteOne({_id: courseId}, (err, eventData) => {
                                    if (err) { next(err); }
                                    else
                                    {
                                        if (eventData.deletedCount === 1)
                                        {
                                            res.json({
                                                message: "Course deleted successfully."
                                            });
                                        }
                                        else
                                        {;
                                            next({
                                                message: "No course was found to delete.",
                                                status: 404,
                                                stack: "No course was found to delete.",
                                            });
                                        }
                                    }
                                })

                            } else {
                                next({
                                    message: "Semester attached to course not found.",
                                    status: 404,
                                    stack: "Semester attached to course not found.",
                                });
                            }
                        }
                    })
            }
            else
            {
                next({
                    message: "Course not found.",
                    status: 404,
                    stack: "Course not found.",
                });
            }
        }
    })

}

///// Functions redirecting to corresponding function. /////
const getCourse = (req, res, next) => {
    const userId = verifyUser(req.headers);
    if (!userId)
    {
        next({
            message: "Missing parameters.",
            status: 400,
            stack: "Missing parameters.",
        });
        return;
    }

    const courseId = req.query.courseId;
    if (courseId)
    {
        getSingleCourse(req, res, next);
    } else {
        getAllCourses(req, res, next);
    }
}

const deleteCourse = (req, res, next) => {
    const userId = verifyUser(req.headers);
    if (!userId)
    {
        next({
            message: "Missing parameters.",
            status: 400,
            stack: "Missing parameters.",
        });
        return;
    }

    const courseId = req.query.courseId;
    if (courseId)
    {
        deleteSingleCourse(req, res, next);
    } else {
        deleteAllCourses(req, res, next);
    }
}

module.exports = {
    getCourse,
    getSingleCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    deleteSingleCourse,
    deleteAllCourses,
    createCourse
};