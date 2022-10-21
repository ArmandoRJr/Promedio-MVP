const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true // Might need to remove to allow a course in DIFFERENT semesters
    },
    description: String
    // PREREQUISITES FIELD HERE, CHECK IF ALLOWED TO HAVE SCHEMA CONTAINING SCHEMA (RECURSION!)
});

const course = mongoose.model("Course", courseSchema);
module.exports = course;
