// const user = require("../models/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// backend api controller to update a user's data based on their email
const update = (req, res, next) => {
  // user will be found using the email and the things that will be updated are the Name, Password, and GPA
  const new_gpa = req.body.gpa; // if left empty then don't update
  const email = req.body.email; // if left empty then don't update

  user.findByIdAndUpdate(
    email,
    { $set: { gpa: new_gpa } },
    { new: true },
    (err, doc) => {
      if (err) return console.log(err);
      console.log(doc);
      res.json(doc);
    }
  );
};

module.exports = {
  update,
};
