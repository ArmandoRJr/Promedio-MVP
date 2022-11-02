const semester = require("../models/semester");
const course = require("../models/course");
const user = require("../models/user");

/*
  * Wrapper for searching for userId before even doing anything.
  * Necessary for semesters given they're inherently attached
  * to an existing user, and should only be modified by said user.
  *
  * Right now, we only check if it's existing, and NOT if the user
  * that is being passed is the currently logged in user, but
  * we'll fix...eventually.

  const userId = req.body.userId;
  user.findById(userId, (err, foundUser) => {
    if (err) { next(err); }
    else {
      if (foundUser){

        // INSERT FUNCTION HERE!!!!!

      } else {
        next({
            message: "User not found, cannot proceed with semester...",
            status: 404,
            stack: "User not found, cannot proceed with semester....",
        });
    }
    }
  })

  console.log(foundSemesters.map(semester => semester._id.toString()))

*/

const verifyUser = (headers) => {
    return JSON.parse(headers.authorization)._id;
}


///// Requests Targetting *** ALL *** Semesters /////
const getAllSemesters = (req, res, next) => {
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
            res.send(foundSemesters)
        }
    })

}

const deleteAllSemesters = (req, res, next) => {

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
            course.deleteMany({semesterId: {"$in" : semIds}});
        }
    })

    semester.deleteMany({userId: userId}, (err, eventData) => {
        if (err) { next(err); }
        else
        {
            if (eventData.deletedCount > 0)
            {
                res.json({
                    message: `Successfully deleted ${eventData.deletedCount} semester(s) and all attached courses.`,
                });
            }
            else
            {
                next({
                    message: "No semesters were found to delete.",
                    status: 404,
                    stack: "No semesters were found to delete.",
                });
            }
        }
    })
}

///// Requests Targetting a *** SPECIFIC *** Semester /////
const createSemester = (req, res, next) => {
  const semesterName = req.body.semesterName;
  const userId = verifyUser(req.headers);
  if (!userId || !semesterName)
    {
        next({
            message: "Missing parameters or body functions.",
            status: 400,
            stack: "Missing parameters or body functions.",
        });
        return;
    }

  user.findById(userId, (err, foundUser) => {
    if (err) { next(err); }
    else {
      if (foundUser){
        console.log(`User found, proceeding with semester creation.`)
        let newSemester = new semester({
          name: semesterName,
          userId: userId
        });
        newSemester
          .save()
          .then(newSemester => {
              if (newSemester)
              {
                  res.json({
                      message: "Semester added successfully.",
                      semester: {
                      ...newSemester.toObject()
                      },
                  });
              }
              else
              {
                  next({
                      message: "Semester not added.",
                      status: 500,
                      stack: "Semester not added.",
                  });
              }
          })
          .catch(err => {
              next(err);
          })
      } else {
        next({
            message: "User not found, cannot proceed with semester creation.",
            status: 404,
            stack: "User not found, cannot proceed with semester creation.",
        });
    }
    }
  })
}


///// Requests Targetting a *** SPECIFIC *** Course /////

const getSingleSemester = (req, res, next) => {

  const semesterId = req.params.semesterId
  const userId = verifyUser(req.headers);
  if (!userId || !semesterId)
    {
        next({
            message: "Missing parameters or body functions.",
            status: 400,
            stack: "Missing parameters or body functions.",
        });
        return;
    }

  semester.findOne({userId: userId, _id: semesterId}, (err, foundSemester) => {
    if (err) { next(err); }
    else
    {
        if (foundSemester)
        {
          res.send(foundSemester);
        }
        else
        {
          next({
              message: "Semester not found.",
              status: 404,
              stack: "Semester not found.",
          });
        }
    }
})
}

const updateSemester = (req, res, next) => {

    const semesterId = req.params.semesterId;
    const userId = verifyUser(req.headers);
    const semesterName = req.body.name;


    if (!userId || !semesterId || !semesterName)
    {
        next({
            message: "Missing parameters or body functions.",
            status: 400,
            stack: "Missing parameters or body functions.",
        });
        return;
    }

    semester.updateOne(
        {userId: userId, _id: semesterId},
        { $set : {name: semesterName} },
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
                        message: "Semester updated successfully."
                    });
                }
                else if (eventData.matchedCount === 1)
                {
                    next({
                        message: "Semester not updated (no change to semester in request).",
                        status: 500,
                        stack: "Semester not updated (no change to semester in request).",
                    });
                }
                else
                {
                    next({
                        message: "No semester updated.",
                        status: 500,
                        stack: "No semester updated.",
                    });
                }
            }
        }
    );
}

const deleteSingleSemester = (req, res, next) => {

    const semesterId = req.params.semesterId
    const userId = verifyUser(req.headers);

    console.log(semesterId, userId);
    console.log(req.headers);
    if (!userId || !semesterId)
    {
        next({
            message: "Missing parameters or body functions.",
            status: 400,
            stack: "Missing parameters or body functions.",
        });
        return;
    }

  semester.deleteOne({_id: semesterId, userId: userId}, (err, eventData) => {
    if (err) { next(err); }
    else
    {
        if (eventData.deletedCount === 1)
        {
            res.json({
                message: "Semester deleted successfully."
            });
        }
        else
        {;
            next({
                message: "No semester was found to delete.",
                status: 404,
                stack: "No semester was found to delete.",
            });
        }
    }
})
}

///// Functions redirecting to corresponding function. /////

const getSemester = (req, res, next) => {
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

    const semesterId = req.params.semesterId;
    if (semesterId)
    {
        getSingleSemester(req, res, next);
    } else {
        getAllSemesters(req, res, next);
    }
}

const deleteSemester = (req, res, next) => {
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

    const semesterId = req.params.semesterId;
    if (semesterId)
    {
        deleteSingleSemester(req, res, next);
    } else {
        deleteAllSemesters(req, res, next);
    }
}

module.exports = {
    getSemester,
    getSingleSemester,
    getAllSemesters,
    updateSemester,
    deleteSemester,
    deleteSingleSemester,
    deleteAllSemesters,
    createSemester
};