const course = require("../models/course");
const semester = require("../models/semester");
const category = require("../models/academicCategoryModel");

const verifyUser = (headers) => {
    return JSON.parse(headers.authorization)._id;
}


///// Requests Targetting *** ALL *** Courses /////

const getCalculations = (req, res, next) => {

    const userId = verifyUser(req.headers);
    const courseIds = req.query.courseIds
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

            let findConds = {semesterId: {"$in" : semIds}}
            if (courseIds) { findConds = {_id: {"$in" : courseIds}, semesterId: {"$in" : semIds}} }

            course.find(findConds, (err, foundCourses) => {
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

module.exports = {
    getCalculations
};