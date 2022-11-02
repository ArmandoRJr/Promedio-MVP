// create a model that will contain the category name (e.g. Assignment) and the weight (e.g. 20%) of the category and the mark recieved on this category
// similar to rapidtables gpa calculator

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let academicCategorySchema = new Schema(
  {
    userId: {
      // example: 6361be943cfe582be04b8168
      type: String,
      required: true,
    },
    courseId: {
      // example: "CSC309"
      type: String,
      required: true,
    },
    categories: {
      // example: ['assignment 1', 'assignment 2']
      type: Array,
      required: true,
    },
    weight: {
      // example: [20, 30, 30, 40]
      type: Array,
      required: true,
    },
    mark: {
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
