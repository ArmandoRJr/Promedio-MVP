const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Semester = require("../models/semester");

let userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
    },
    gpa: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const user = mongoose.model("Users", userSchema);
module.exports = user;
