// create a model that will contain the category name (e.g. Assignment) and the weight (e.g. 20%) of the category and the mark recieved on this category
// similar to rapidtables gpa calculator

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let academicCategorySchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course"
    },
    name: {
      // example: 'Quiz
      type: String,
      required: true,
    },
    numAssessments: {
      // example: 3
      type: Number,
      required: true
    },
    weights: {
      // example: [10, 10, 10]
      type: Array
    },
    grades: {
      // example: [20, 30, 40]
      type: Array,
    },
  },
  { timestamps: true }
);

const categories = mongoose.model(
  "Academic Categories",
  academicCategorySchema
);
module.exports = categories;
