const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const semesterSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    courses: [{type: Schema.Types.ObjectId, ref: "Courses"}]
});

const Semester = mongoose.model("Semester", semesterSchema);