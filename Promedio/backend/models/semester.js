const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const semesterSchema = new Schema({
    name: String,
    courses: [
        {
            type: Schema.Types.ObjectId, 
            ref: "Courses"
        }
    ]
});

const semester = mongoose.model("Semester", semesterSchema);
module.exports = semester;