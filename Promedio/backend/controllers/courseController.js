const course = require("../models/course");
const semester = require("../models/semester");
const category = require("../models/academicCategoryModel");

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
            course.find({semesterId: {"$in" : semIds}}, (err, foundCourses) => {
                if (err) { next(err); }
                else
                {
                    const calculations = []
                    let counter = 0
                    const length = foundCourses.length
                    for (const foundCourse of foundCourses) {
                        category.find({courseId: foundCourse._id}, (err, foundCategories) => {
                            if (err) {  next(err); }
                            else
                            {
                                // Everything handled in decimals
                                // until the end
                                // e.g. 90% of a 30% midterm
                                // -> 0.9 * 0.3 
                                
                                const markGoal = foundCourse.markGoal * 0.01;   
                                // Sum of weights from complete
                                // [Weight]-Grade pairings
                                let courseCompletion = 0;
                                // Sum(filteredGrades[i] * filteredGradeWeights[i])
                                // divided by courseCompletion
                                let currentMark = 0;
                                // markGoal - (currentMark * courseCompletion)
                                // divided by (1-courseCompletion)
                                // UNLESS COURSE COMPLETION IS 100%, THEN ABORT
                                let remainingMark = 0;
                                // Sum of weights that aren't -1, regardless
                                // of whether they're from
                                // a Weight-Grade pairing or not
                                let summedMarks = 0;


                                // Each final category grade
                                const filteredGrades = [];
                                // Each final category weight
                                // i.e. array of (sum of all weights
                                // attached to a grade)
                                const filteredGradeWeights = [];
                                // Each final category weight to complete
                                // i.e. array of (sum of all weights,
                                // regardless of whether they're attached to a group)
                                const filteredWeights = [];
                                for (const x of foundCategories) {
                                    let categoryGrade = 0;
                                    let categoryGradeWeight = 0;
                                    let categoryWeight = 0;
                                    for (let i = 0; i < x.numAssessments; i++){
                                        if (x.weights[i] != -1 && x.weights[i] != null
                                            && x.weights[i] != undefined) {
                                            categoryWeight += x.weights[i] * 0.01;

                                            if (x.grades[i] != -1 && x.grades[i] != null
                                                && x.grades[i] != undefined) {
                                                categoryGrade += ((x.grades[i] * 0.01)
                                                * (x.weights[i] * 0.01))
                                                categoryGradeWeight += (x.weights[i] * 0.01)
                                            }
                                        }
                                    }
                                    filteredGrades.push(categoryGrade);
                                    filteredGradeWeights.push(categoryGradeWeight);
                                    filteredWeights.push(categoryWeight);
                                }

                                for (let y = 0; y < filteredGrades.length; y++) {
                                    courseCompletion += filteredGradeWeights[y];
                                    currentMark += filteredGrades[y];
                                }
                                if (courseCompletion !== 0) 
                                    currentMark = currentMark / courseCompletion;

                                if (courseCompletion >= 0 && courseCompletion < 1) {
                                    remainingMark = markGoal - (currentMark * courseCompletion)
                                    remainingMark = remainingMark / (1 - courseCompletion)
                                }

                                for (const a of filteredWeights) {
                                    summedMarks += a;
                                }

                                
                                const courseCalculations = {
                                    ...foundCourse._doc,
                                    markGoal: markGoal * 100,
                                    courseCompletion: courseCompletion * 100,
                                    currentMark: currentMark * 100,
                                    remainingMark: remainingMark * 100,
                                    summedMarks: summedMarks * 100
                                }

                                calculations.push(courseCalculations)

                                counter += 1;
                                if (counter === length) {
                                    res.send(calculations)
                                }
                            }
                        })
                    }
                    
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
                category.find({courseId: foundCourse._id}, (err, foundCategories) => {
                    if (err) {  next(err); }
                    else
                    {
                        // Everything handled in decimals
                        // until the end
                        // e.g. 90% of a 30% midterm
                        // -> 0.9 * 0.3 
                        
                        const markGoal = foundCourse.markGoal * 0.01;   
                        // Sum of weights from complete
                        // [Weight]-Grade pairings
                        let courseCompletion = 0;
                        // Sum(filteredGrades[i] * filteredGradeWeights[i])
                        // divided by courseCompletion
                        let currentMark = 0;
                        // markGoal - (currentMark * courseCompletion)
                        // divided by (1-courseCompletion)
                        // UNLESS COURSE COMPLETION IS 100%, THEN ABORT
                        let remainingMark = 0;
                        // Sum of weights that aren't -1, regardless
                        // of whether they're from
                        // a Weight-Grade pairing or not
                        let summedMarks = 0;


                        // Each final category grade
                        const filteredGrades = [];
                        // Each final category weight
                        // i.e. array of (sum of all weights
                        // attached to a grade)
                        const filteredGradeWeights = [];
                        // Each final category weight to complete
                        // i.e. array of (sum of all weights,
                        // regardless of whether they're attached to a group)
                        const filteredWeights = [];
                        for (const x of foundCategories) {
                            let categoryGrade = 0;
                            let categoryGradeWeight = 0;
                            let categoryWeight = 0;
                            for (let i = 0; i < x.numAssessments; i++){
                                if (x.weights[i] != -1 && x.weights[i] != null
                                    && x.weights[i] != undefined) {
                                    categoryWeight += x.weights[i] * 0.01;

                                    if (x.grades[i] != -1 && x.grades[i] != null
                                        && x.grades[i] != undefined) {
                                        categoryGrade += ((x.grades[i] * 0.01)
                                        * (x.weights[i] * 0.01))
                                        categoryGradeWeight += (x.weights[i] * 0.01)
                                    }
                                }
                            }
                            filteredGrades.push(categoryGrade);
                            filteredGradeWeights.push(categoryGradeWeight);
                            filteredWeights.push(categoryWeight);
                        }

                        for (let y = 0; y < filteredGrades.length; y++) {
                            courseCompletion += filteredGradeWeights[y];
                            currentMark += filteredGrades[y];
                        }
                        if (courseCompletion !== 0) 
                            currentMark = currentMark / courseCompletion;

                        if (courseCompletion >= 0 && courseCompletion < 1) {
                            remainingMark = markGoal - (currentMark * courseCompletion)
                            remainingMark = remainingMark / (1 - courseCompletion)
                        }

                        for (const a of filteredWeights) {
                            summedMarks += a;
                        }

                        
                        const course = {
                            ...foundCourse._doc,
                            markGoal: markGoal * 100,
                            courseCompletion: courseCompletion * 100,
                            currentMark: currentMark * 100,
                            remainingMark: remainingMark * 100,
                            summedMarks: summedMarks * 100
                        }

                        res.send(course);
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