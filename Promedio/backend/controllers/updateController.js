const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const update = (req, res, next) => {
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
            res.json({
            message: "User updated successfully.",
            user: newUser,
            });
        })
        .catch((err) => {
            next(err);
        });
    });
    }

//update a user's gpa
const updateGPA = (req, res, next) => {
    user.findOne({email: req.body.email})
    .then((user) => {
        if (user) {
            user.gpa = req.body.gpa;
            user.save()
            .then((user) => {
                res.json({
                    message: "User updated successfully.",
                    user: user,
                });
            })
            .catch((err) => {
                next(err);
            });
        } else {
            next({
                message: "User not found.",
                status: 500,
                stack: "User not found.",
            });
        }
    })
    .catch((err) => {
        next(err);
    });
};
module.exports = {
    update
}
