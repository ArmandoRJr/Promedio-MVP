const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const semesterSchema = new Schema({
    name: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const semester = mongoose.model("Semester", semesterSchema);
module.exports = semester;