// const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const app = express();

// app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));

// mongoose.connect("mongodb://127.0.0.1:27017/testDB", {useNewUrlParser: true});

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

const winterCourses = [course1, course2, course3];

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
    courses: winterCourses
});

// winterSemester.save();

// app.get("/", function(req, res) {

//     Semester.find({}, function(err, foundItems){
//       if (err) {
//         console.log(err);
//       } else if (foundItems.length === 0) 
//       {
//         Item.insertMany(defaultItems, function(err) {
//           if (err) 
//           {
//             console.log(err);
//           } 
//           else 
//           {
//             console.log("Successfully saved default items to DB.");
//           }
//         });
  
//         res.redirect("/");
//       }
//       else
//       {
//         res.render("list", {listTitle: "Today", newListItems: foundItems});
//       }
//     });
  
  
//   });