const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const semesterSchema = new Schema({
    name: String,
    user: Schema.Types.ObjectId
});

const semester = mongoose.model("Semester", semesterSchema);
module.exports = semester;