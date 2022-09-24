const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }
    let newUser = new user({
      name: req.body.name,
      email: req.body.email,
      gpa: req.body.gpa,
      password: hashedPass,
    });

    newUser
      .save()
      .then((newUser) => {
        res.json({
          message: "User added successfully.",
        });
      })
      .catch((error) => {
        res.json({
          message: "An error occured!",
        });
      });
  });
};

module.exports = {
  register,
};
