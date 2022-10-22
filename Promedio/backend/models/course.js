const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: String,
    semesterId: {
        type: Schema.Types.ObjectId,
        ref: "Semester"
    }
    // PREREQUISITES FIELD HERE, CHECK IF ALLOWED TO HAVE SCHEMA CONTAINING SCHEMA (RECURSION!)
});

const course = mongoose.model("Course", courseSchema);
module.exports = course;
