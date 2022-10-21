const semester = require("../models/semester");
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
*/ 

///// Requests Targetting *** ALL *** Semesters /////
const getAllSemesters = (req, res, next) => {
  const userId = req.params.userId;

  user.findById(userId, (err, foundUser) => {
    if (err) { next(err); }
    else {
      if (foundUser){

        semester.find({userId: userId}, (err, foundSemesters) => {
          if (err) { next(err); }
          else
          {
              res.send(foundSemesters)
          }
      })

      } else {
        next({
            message: "User not found, cannot proceed with semester search.",
            status: 404,
            stack: "User not found, cannot proceed with semester search.",
        });
    }
    }
  })
}

const deleteAllCourses = (req, res, next) => {

  const userId = req.params.userId;
  user.findById(userId, (err, foundUser) => {
    if (err) { next(err); }
    else {
      if (foundUser){

        semester.deleteMany({userId: userId}, (err, eventData) => {
          if (err) { next(err); }
          else
          {
              if (eventData.deletedCount > 0)
              {
                  res.json({
                      message: `Successfully deleted (${eventData.deletedCount}) semesters.`,
                  });
              }
              else
              {
                  next({
                      message: "Semesters not deleted (no semesters were found to delete)",
                      status: 500,
                      stack: "Semesters not deleted (no semesters were found to delete)",
                  });
              }
          }
      })

      } else {
        next({
            message: "User not found, cannot proceed with semester deletion.",
            status: 404,
            stack: "User not found, cannot proceed with semester deletion.",
        });
    }
    }
  })
}

///// Requests Targetting a *** SPECIFIC *** Semester /////
const createSemester = (req, res, next) => {
  const semesterName = req.body.semesterName;
  const userId = req.params.userId;
  
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

const getSemester = (req, res, next) => {
  // Dummy code, need to ACTUALLY GET COURSE NAME!!

  const userId = req.params.userId;
  user.findById(userId, (err, foundUser) => {
    if (err) { next(err); }
    else {
      if (foundUser){

        const semesterName = req.params.semesterName;

        semester.findOne({name: semesterName, userId: userId}, (err, foundSemester) => {
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
                        message: "Semester not found",
                        status: 500,
                        stack: "Semester not found",
                    });
                }
            }
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

const updateSemester = (req, res, next) => {
  const userId = req.params.userId;
  user.findById(userId, (err, foundUser) => {
    if (err) { next(err); }
    else {
      if (foundUser){

        const semesterName = req.params.semesterName;

        // course.updateOne({name: courseName}, req.body).then().catch()
        //     // .then()

        semester.updateOne(
            {name: semesterName, userId: userId},
            { $set : {name: req.body.semesterName} },
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
                            message: "Semester not updated (no change to semester in request)",
                            status: 500,
                            stack: "Semester not updated (no change to semester in request)",
                        });
                    }
                    else
                    {
                        next({
                            message: "Semester not updated",
                            status: 500,
                            stack: "Semester not updated",
                        });
                    }
                }
            }
        );

      } else {
        next({
            message: "User not found, cannot proceed with semester update.",
            status: 404,
            stack: "User not found, cannot proceed with semester update.",
        });
    }
    }
  })
}

const removeSemester = (req, res, next) => {

  const userId = req.params.userId;
  user.findById(userId, (err, foundUser) => {
    if (err) { next(err); }
    else {
      if (foundUser){

      const semesterName = req.params.semesterName;

      semester.deleteOne({name: semesterName, userId: userId}, (err, eventData) => {
          if (err) { next(err); }
          else
          {
              if (eventData.deletedCount === 1)
              {
                  // console.log(courseName, eventData);
                  res.json({
                      message: "Semester deleted successfully.",
                      // course: {
                      // ...newCourse.toObject()
                      // },
                  });
              }
              else
              {;
                  next({
                      message: "Semester not deleted (no semester was found to delete)",
                      status: 500,
                      stack: "Semester not deleted (no semester was found to delete)",
                  });
              }
          }
      })

      } else {
        next({
            message: "User not found, cannot proceed with semester deletion.",
            status: 404,
            stack: "User not found, cannot proceed with semester deletion.",
        });
    }
    }
  })
}


module.exports = {
    getSemester,
    updateSemester,
    removeSemester, 
    getAllSemesters,
    createSemester
};