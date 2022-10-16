const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      next(err);
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

        let token = jwt.sign({ email: newUser.email }, "promediosecretkey", {
          expiresIn: "1h",
        });

        res.json({
          message: "User added successfully.",
          user: newUser,
          token,
        });
      })
      .catch((err) => {
        next(err);
      });
  });
};

const login = (req, res, next) => {
  var username = req.body.email;
  var password = req.body.password;

  user
    .findOne({ $or: [{ email: username }, { name: username }] })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            next(err);
          }
          if (result) {
            let token = jwt.sign({ email: user.email }, "promediosecretkey", {
              expiresIn: "1h",
            });
            res.json({
              message: "Login successful!",
              token,
              user,
            });
          } else {
            next({
              message: "Incorrect password.",
              status: 500,
              stack: "Incorrect password.",
            });
          }
        });
      } else {
        // throw error with next
        next({
          message: "User not found",
          status: 500,
          stack: "User not found",
        });
      }
    });
};

module.exports = {
  register,
  login,
};
