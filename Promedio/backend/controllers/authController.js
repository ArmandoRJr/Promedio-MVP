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

const login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  user.findOne({ $or: [{ email: username }, { name: username }] }).then(
    (user) => {
      if (user) {
        bcrypt.compare(password, user.password, function(err, result) {
          if (err) {
            res.json({
              error: err,
            });
          }
          if (result) {
            let token = jwt.sign({ email: user.email }, "verySecretValue", {
              expiresIn: "1h",
            });
            res.json({
              message: "Login successful!",
              token,
            });
          } else {
            res.json({
              message: "Password does not match!",
            });
          }
        });
      } else {
        res.json({
          message: "No user found!",
        });
      }
    }
  );
};

module.exports = {
  register, login
};
