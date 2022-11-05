const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: String,
    semesterId: {
        type: Schema.Types.ObjectId,
        ref: "Semester",
        required: true
    },
    description: String, 
    markGoal: Number
});

const course = mongoose.model("Course", courseSchema);
module.exports = course;
