

const createSemester = (req, res, next) => {
    // Create a new semester
    // Add that semester to database via .save()
    // frontend should be connected to this backend to have this rendered.
}






app.get("/", function(req, res) {

    Course.find({}, function(err, foundCourses){
        if (err) {
            console.log(err);
        } else if (foundCourses.length === 0) 
        {
            Course.insertMany(defaultCourses, function(err) {
            if (err) 
            {
                console.log(err);
            } 
            else 
            {
                console.log("Successfully saved default courses to testDB.");
            }
            });

            res.redirect("/");
        }
        else
        {
            res.render("semester", {semesterTitle: "Promedio", courses: foundCourses});
            // console.log(`foundSemester.name === ${foundSemester.name}`)
        }
    });

// res.render("test", {semesterTitle: "Promedio", });

});

app.post("/", function(req, res){

    const courseName = req.body.newCourse;
    const semesterName = req.body.semester;
  
    const course = new Course({
      name: courseName
    });
  
    if (semesterName === "Promedio")
    {
      course.save();
      res.redirect("/");
    }
    else
    {
      Semester.findOne({name: semesterName}, function(err, foundSemester){
        foundSemester.courses.push(course);
        foundSemester.save();
      });
  
      res.redirect(`/${semesterName}`);
    }
});

app.post("/delete", function(req, res){
    const courseID = req.body.checkbox;
    const semesterName = req.body.semesterName;
  
    if (semesterName === "Promedio")
    {
      Course.findByIdAndRemove(courseID, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log(`Successfully deleted checked course with id: ${courseID}`);
        }
      });
  
      res.redirect("/");
    }
    else
    {
      // $pull -- deletes item from 'items' array with query: {_id: itemID}
      Course.findOneAndUpdate({name: semesterName}, {$pull: {courses: {_id: courseID}}}, function(err, results){
        if (err) {
          console.log(err);
        } else {
          res.redirect(`/${semesterName}`);
        }
      });
    }
});

app.get("/:customSemesterName", function(req, res){
    // res.render("list", {semesterTitle: "Work List", newListItems: workItems});
    const customSemesterName = _.capitalize(req.params.customSemesterName);
  
    Semester.findOne({name: customSemesterName}, function(err, foundSemester){
      if (err) { console.log(err); }
      else if (!foundSemester) // foundList === null
      {
        // Create a new semester
  
        const semester = new Semester({
          name: customSemesterName,
          courses: []
        });
  
        semester.save();
  
        res.redirect(`/${customSemesterName}`);
        // console.log("Does not exist :(");
      }
      else
      {
        // Show existing list
        
        res.render("semester", {semesterTitle: foundSemester.name, courses: foundSemester.courses});
      }
    });
  
    // const list = new List({
    //   name: customListName,
    //   items: defaultItems
    // });
  
    // list.save();
  
  });


module.exports = {
    createSemester,
    deleteSemester,
    changeName,
    addCourse,
    removeSemester,
};