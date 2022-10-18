// const user = require("../models/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const update = (req, res, next) => {
//   bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
//     if (err) {
//       next(err);
//     }
//     let newUser = new user({
//       name: req.body.name,
//       email: req.body.email,
//       gpa: req.body.gpa,
//       password: hashedPass,
//     });

//     newUser
//       .save()
//       .then((newUser) => {
//         res.json({
//           message: "User updated successfully.",
//           user: newUser,
//         });
//       })
//       .catch((err) => {
//         next(err);
//       });
//   });
// };

// module.exports = {
//   update,
// };
