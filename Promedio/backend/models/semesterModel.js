const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/testDB", {useNewUrlParser: true});

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Might need to remove to allow a course in DIFFERENT semesters
    },
    description: String
    // PREREQUISITES FIELD HERE, CHECK IF ALLOWED TO HAVE SCHEMA CONTAINING SCHEMA (RECURSION!)
});
  
const Course = mongoose.model("Course", courseSchema);

const course1 = new Course({
name: "CSCA48",
description: "Abstract data types and data structures for implementing them. Linked data structures. Object Oriented Programming. Encapsulation and information-hiding. Testing. Specifications. Analyzing the efficiency of programs. Recursion."
});

const course2 = new Course({
name: "MATA22",
description: "A conceptual and rigorous approach to introductory linear algebra that focuses on mathematical proofs, the logical development of fundamental structures, and essential computational techniques. This course covers complex numbers, vectors in Euclidean n-space, systems of linear equations, matrices and matrix algebra, Gaussian reduction, structure theorems for solutions of linear systems, dependence and independence, rank equation, linear transformations of Euclidean n-space, determinants, Cramer's rule, eigenvalues and eigenvectors, characteristic polynomial, and diagonalization."
});

const course3 = new Course({
name: "MATA37",
description: "A rigorous introduction to Integral Calculus of one variable and infinite series; strong emphasis on combining theory and applications; further developing of tools for mathematical analysis. Riemann Sum, definite integral, Fundamental Theorem of Calculus, techniques of integration, improper integrals, numerical integration, sequences and series, absolute and conditional convergence of series, convergence tests for series, Taylor polynomials and series, power series and applications."
});

const defaultCourses = [course1, course2, course3];

// Please follow 3-letter conventions, i.e.
// Fall 2022 Semester --> 'f22' for name
const semesterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    courses: [courseSchema]
});

const Semester = mongoose.model("Semester", semesterSchema);

const winterSemester = new Semester({
    name: "w22",
    courses: defaultCourses
});

// winterSemester.save();

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

app.listen(process.env.PORT || 3000, function() {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
});
  